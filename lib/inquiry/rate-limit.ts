/**
 * Fixed-window rate limiter kept in memory.
 * On serverless hosts each instance keeps its own window, so this is a first line of
 * defence. For stricter limits put the API behind a shared store (e.g. Upstash Redis)
 * or the host's firewall rules.
 */
type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Entry>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000, now = Date.now()) {
  const entry = buckets.get(key);
  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
    }
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }
  if (entry.count >= limit) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true, remaining: limit - entry.count, retryAfter: 0 };
}

export function resetRateLimits() {
  buckets.clear();
}
