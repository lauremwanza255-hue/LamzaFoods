import { NextResponse, type NextRequest } from 'next/server';
import { fieldErrors, inquirySchema } from '@/lib/inquiry/schema';
import { deliverInquiry } from '@/lib/inquiry/delivery';
import { rateLimit } from '@/lib/inquiry/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 32 * 1024;
const MIN_FILL_MS = 2500;

function clientKey(req: NextRequest) {
  const fwd = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return fwd || req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: NextRequest) {
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: 'unsupported_media_type', message: 'Send the form as JSON.' }, { status: 415 });
  }

  // Same-origin check: browsers send Origin on cross-site POSTs.
  const origin = req.headers.get('origin');
  if (origin && new URL(origin).host !== req.headers.get('host')) {
    return NextResponse.json({ error: 'forbidden', message: 'Cross-site submissions are not accepted.' }, { status: 403 });
  }

  const limit = rateLimit(clientKey(req));
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `Too many submissions from your connection. Please wait ${Math.ceil(limit.retryAfter / 60)} minutes and try again.`,
      },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  const text = await req.text();
  if (text.length > MAX_BYTES) {
    return NextResponse.json({ error: 'too_large', message: 'The form is too large to send.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'invalid_json', message: 'The form could not be read.' }, { status: 400 });
  }

  // Spam traps: honeypot field and implausibly fast submissions.
  const raw = body as { company_website?: unknown; startedAt?: unknown };
  if (raw && typeof raw === 'object') {
    if (typeof raw.company_website === 'string' && raw.company_website.length > 0) {
      return NextResponse.json({ error: 'rejected', message: 'This submission was rejected.' }, { status: 400 });
    }
    if (typeof raw.startedAt === 'number' && Date.now() - raw.startedAt < MIN_FILL_MS) {
      return NextResponse.json(
        { error: 'too_fast', message: 'That was very fast. Check your entries and send the form again.' },
        { status: 400 },
      );
    }
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation', message: 'Some fields need your attention.', fields: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const result = await deliverInquiry(parsed.data);
  if (!result.ok) {
    if (result.reason === 'not_configured') {
      return NextResponse.json(
        {
          error: 'not_configured',
          message:
            'Online inquiries are not connected yet, so your message was not sent. Please contact Lamza Foods by email or phone instead.',
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: 'delivery_failed', message: 'We could not send your inquiry just now. Please try again in a few minutes.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, reference: result.reference }, { status: 201 });
}

export function GET() {
  return NextResponse.json({ error: 'method_not_allowed' }, { status: 405, headers: { Allow: 'POST' } });
}
