import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/inquiries/route';
import { resetRateLimits } from '@/lib/inquiry/rate-limit';
import { makeReference } from '@/lib/inquiry/delivery';

const valid = () => ({
  type: 'contact', fullName: 'Ada Obi', email: 'ada@example.com', subject: 'General Inquiry', message: 'Hello, please contact me.', consent: true, startedAt: Date.now() - 10_000,
});

const req = (body: unknown, headers: Record<string, string> = {}) =>
  new NextRequest('http://localhost/api/inquiries', {
    method: 'POST',
    headers: { 'content-type': 'application/json', host: 'localhost', 'x-forwarded-for': `10.0.0.${Math.floor(Math.random() * 250)}`, ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

const ENV_KEYS = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'RESEND_API_KEY', 'CONTACT_EMAIL', 'FROM_EMAIL', 'INQUIRY_DEV_FILE_STORE'];

describe('POST /api/inquiries', () => {
  let cwd: string;
  let tmp: string;
  beforeEach(() => {
    resetRateLimits();
    ENV_KEYS.forEach((k) => delete process.env[k]);
    cwd = process.cwd();
    tmp = mkdtempSync(path.join(tmpdir(), 'lamza-'));
    vi.spyOn(process, 'cwd').mockReturnValue(tmp);
  });
  afterEach(() => {
    vi.restoreAllMocks();
    rmSync(tmp, { recursive: true, force: true });
    void cwd;
  });

  it('reports honestly when no delivery channel is configured (no fake success)', async () => {
    const res = await POST(req(valid()));
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.ok).toBeUndefined();
    expect(data.error).toBe('not_configured');
  });

  it('stores the inquiry and returns a reference when a channel is configured', async () => {
    process.env.INQUIRY_DEV_FILE_STORE = 'true';
    const res = await POST(req(valid()));
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.reference).toMatch(/^LMZ-\d{6}-[0-9A-F]{6}$/);
    const stored = readFileSync(path.join(tmp, '.data/inquiries.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
    expect(stored).toHaveLength(1);
    expect(stored[0].reference).toBe(data.reference);
    expect(stored[0].data.email).toBe('ada@example.com');
    expect(stored[0].data.startedAt).toBeUndefined();
  });

  it('returns field errors for invalid input', async () => {
    const res = await POST(req({ ...valid(), email: 'nope' }));
    expect(res.status).toBe(422);
    expect((await res.json()).fields.email).toBeDefined();
  });

  it('rejects honeypot, too-fast, cross-site, non-JSON and oversized submissions', async () => {
    expect((await POST(req({ ...valid(), company_website: 'x' }))).status).toBe(400);
    expect((await POST(req({ ...valid(), startedAt: Date.now() }))).status).toBe(400);
    expect((await POST(req(valid(), { origin: 'https://evil.example' }))).status).toBe(403);
    expect((await POST(req(valid(), { 'content-type': 'text/plain' }))).status).toBe(415);
    expect((await POST(req(JSON.stringify({ ...valid(), message: 'x'.repeat(40_000) })))).status).toBe(413);
  });

  it('rate limits repeated submissions from one address', async () => {
    const h = { 'x-forwarded-for': '203.0.113.9' };
    for (let i = 0; i < 5; i++) await POST(req(valid(), h));
    const res = await POST(req(valid(), h));
    expect(res.status).toBe(429);
    expect(res.headers.get('Retry-After')).toBeTruthy();
  });

  it('reports a delivery failure when every channel fails', async () => {
    process.env.RESEND_API_KEY = 'test';
    process.env.CONTACT_EMAIL = 'sales@example.com';
    process.env.FROM_EMAIL = 'web@example.com';
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('fail', { status: 500 }));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = await POST(req(valid()));
    expect(res.status).toBe(502);
  });
});

describe('makeReference', () => {
  it('formats references as LMZ-YYMMDD-XXXXXX', () => {
    expect(makeReference(new Date('2026-03-05T10:00:00Z'))).toMatch(/^LMZ-260305-[0-9A-F]{6}$/);
  });
});
