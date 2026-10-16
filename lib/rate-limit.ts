/**
 * Small in-memory request limiters for /api/cart. Kept free of imports so
 * tests/rate-limit.test.mjs can drive them with a fake clock.
 *
 * In memory means per server process: on a single Node server that is the
 * whole site; on serverless hosting each instance counts separately, so the
 * host's own firewall/rate limiting should back this up.
 */

/** Fixed-window counter per key: at most `limit` hits per `windowMs`. */
export function createLimiter({ limit, windowMs, maxKeys = 10_000 }: { limit: number; windowMs: number; maxKeys?: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function take(key: string, now = Date.now()): { ok: true } | { ok: false; retryAfterSeconds: number } {
    let entry = hits.get(key);
    if (!entry || now >= entry.resetAt) {
      // Drop expired keys before adding, so a flood of new addresses can't grow the map without bound.
      if (!entry && hits.size >= maxKeys) {
        for (const [k, e] of hits) if (now >= e.resetAt) hits.delete(k);
        if (hits.size >= maxKeys) return { ok: false, retryAfterSeconds: Math.ceil(windowMs / 1000) };
      }
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }
    if (entry.count >= limit) return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
    entry.count++;
    return { ok: true };
  };
}

/**
 * The visitor's address as the nearest proxy saw it: x-real-ip, else the last
 * x-forwarded-for entry (the one our own proxy appended; earlier entries can
 * be typed in by the client). Without a proxy every request shares one key,
 * which still keeps the overall limit working.
 */
export function clientKey(headers: Headers): string {
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real;
  const forwarded = headers.get("x-forwarded-for")?.split(",").map((s) => s.trim()).filter(Boolean);
  return forwarded?.at(-1) ?? "unknown";
}
