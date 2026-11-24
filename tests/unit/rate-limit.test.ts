import { beforeEach, describe, expect, it } from 'vitest';
import { rateLimit, resetRateLimits } from '@/lib/inquiry/rate-limit';

describe('rateLimit', () => {
  beforeEach(() => resetRateLimits());
  it('allows up to the limit then blocks until the window resets', () => {
    const t = 1_000_000;
    for (let i = 0; i < 3; i++) expect(rateLimit('ip', 3, 1000, t).ok).toBe(true);
    const blocked = rateLimit('ip', 3, 1000, t + 10);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
    expect(rateLimit('ip', 3, 1000, t + 1001).ok).toBe(true);
  });
  it('tracks keys separately', () => {
    expect(rateLimit('a', 1, 1000, 0).ok).toBe(true);
    expect(rateLimit('b', 1, 1000, 0).ok).toBe(true);
    expect(rateLimit('a', 1, 1000, 1).ok).toBe(false);
  });
});
