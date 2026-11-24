import 'server-only';
import { randomBytes } from 'node:crypto';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { InquiryInput } from './schema';

export type StoredInquiry = {
  reference: string;
  type: InquiryInput['type'];
  submittedAt: string;
  status: 'new';
  consentAt: string;
  data: Omit<InquiryInput, 'company_website' | 'startedAt'>;
};

export function makeReference(now = new Date()) {
  const d = now.toISOString().slice(2, 10).replace(/-/g, '');
  const r = randomBytes(3).toString('hex').toUpperCase();
  return `LMZ-${d}-${r}`;
}

export function configuredChannels() {
  return {
    supabase: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    email: Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL && process.env.FROM_EMAIL),
    file: process.env.INQUIRY_DEV_FILE_STORE === 'true' && process.env.NODE_ENV !== 'production',
  };
}

async function storeSupabase(row: StoredInquiry) {
  const url = `${process.env.SUPABASE_URL!.replace(/\/$/, '')}/rest/v1/inquiries`;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const d = row.data as Record<string, unknown>;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      reference: row.reference,
      inquiry_type: row.type,
      customer_name: d.fullName,
      company_name: d.company ?? null,
      email: d.email,
      phone: d.phone ?? null,
      country: d.country ?? null,
      products_of_interest:
        (d.productsOfInterest as string[] | undefined) ??
        (d.items as { product: string }[] | undefined)?.map((i) => i.product) ??
        (d.product ? [d.product as string] : null),
      message: (d.message ?? d.requirements ?? null) as string | null,
      payload: row.data,
      status: row.status,
      consent_at: row.consentAt,
      submitted_at: row.submittedAt,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Supabase insert failed with ${res.status}`);
}

async function storeFile(row: StoredInquiry) {
  const dir = path.join(process.cwd(), '.data');
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, 'inquiries.jsonl'), JSON.stringify(row) + '\n', 'utf8');
}

const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const labels: Record<string, string> = {
  fullName: 'Name',
  company: 'Company',
  email: 'Email',
  phone: 'Telephone',
  country: 'Country',
  city: 'City',
  website: 'Website',
  businessType: 'Business type',
  productsOfInterest: 'Products of interest',
  orderVolume: 'Estimated order volume',
  contactMethod: 'Preferred contact',
  subject: 'Subject',
  product: 'Product',
  message: 'Message',
  destination: 'Delivery destination',
  requirements: 'Additional requirements',
};

const typeLabel = { contact: 'Contact inquiry', partnership: 'Partnership inquiry', quote: 'Quote request' } as const;

function rows(data: Record<string, unknown>) {
  const out: string[] = [];
  for (const [k, v] of Object.entries(data)) {
    if (k === 'type' || k === 'consent' || v === undefined || v === '') continue;
    if (k === 'items' && Array.isArray(v)) {
      const list = v
        .map((i: { product: string; quantity: string; packaging?: string }) =>
          `<li>${esc(i.product)}: ${esc(i.quantity)}${i.packaging ? `, ${esc(i.packaging)}` : ''}</li>`,
        )
        .join('');
      out.push(`<tr><th align="left" valign="top">Products</th><td><ul>${list}</ul></td></tr>`);
      continue;
    }
    const value = Array.isArray(v) ? v.join(', ') : v;
    out.push(`<tr><th align="left" valign="top">${esc(labels[k] ?? k)}</th><td>${esc(value).replace(/\n/g, '<br>')}</td></tr>`);
  }
  return out.join('');
}

async function sendEmail(payload: { to: string; subject: string; html: string; replyTo?: string }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Resend failed with ${res.status}`);
}

async function notify(row: StoredInquiry) {
  const d = row.data as Record<string, unknown>;
  await sendEmail({
    to: process.env.CONTACT_EMAIL!,
    replyTo: String(d.email),
    subject: `${typeLabel[row.type]} ${row.reference} from ${String(d.fullName)}`,
    html: `<h2>${typeLabel[row.type]} ${esc(row.reference)}</h2><table cellpadding="6">${rows(d)}</table><p>Submitted ${esc(row.submittedAt)}</p>`,
  });
}

async function confirm(row: StoredInquiry) {
  const d = row.data as Record<string, unknown>;
  await sendEmail({
    to: String(d.email),
    subject: `We received your ${typeLabel[row.type].toLowerCase()} (${row.reference})`,
    html: `<p>Hello ${esc(d.fullName)},</p><p>Thank you for contacting Lamza Foods. We received your ${esc(
      typeLabel[row.type].toLowerCase(),
    )} and will reply as soon as we can.</p><p>Your reference is <strong>${esc(row.reference)}</strong>.</p><p>Lamza Foods</p>`,
  });
}

export type DeliveryResult =
  | { ok: true; reference: string; channels: string[] }
  | { ok: false; reason: 'not_configured' | 'delivery_failed' };

/**
 * Delivers an inquiry to every configured channel. Success is reported only when at
 * least one durable channel (database, file store or the business notification email)
 * confirmed receipt.
 */
export async function deliverInquiry(input: InquiryInput): Promise<DeliveryResult> {
  const channels = configuredChannels();
  if (!channels.supabase && !channels.email && !channels.file) return { ok: false, reason: 'not_configured' };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { company_website, startedAt, ...data } = input;
  const now = new Date();
  const row: StoredInquiry = {
    reference: makeReference(now),
    type: input.type,
    submittedAt: now.toISOString(),
    status: 'new',
    consentAt: now.toISOString(),
    data,
  };

  const received: string[] = [];
  const tasks: [string, () => Promise<void>][] = [];
  if (channels.supabase) tasks.push(['database', () => storeSupabase(row)]);
  if (channels.file) tasks.push(['file', () => storeFile(row)]);
  if (channels.email) tasks.push(['email', () => notify(row)]);

  const results = await Promise.allSettled(tasks.map(([, fn]) => fn()));
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') received.push(tasks[i][0]);
    else console.error(`[inquiry] ${tasks[i][0]} delivery failed for ${row.reference}:`, r.reason);
  });

  if (!received.length) return { ok: false, reason: 'delivery_failed' };

  if (channels.email) {
    confirm(row).catch((e) => console.error(`[inquiry] confirmation email failed for ${row.reference}:`, e));
  }
  return { ok: true, reference: row.reference, channels: received };
}
