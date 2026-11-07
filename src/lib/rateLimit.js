/**
 * Tiny in-memory sliding-window rate limiter.
 *
 * Good enough for a single server instance. On serverless platforms each
 * instance keeps its own counters, so swap this for Redis/Upstash if you
 * need strict global limits.
 */
export function createRateLimiter({ limit, windowMs }) {
  /** @type {Map<string, number[]>} key -> timestamps of recent hits */
  const hits = new Map();

  function prune(now) {
    for (const [key, stamps] of hits) {
      const fresh = stamps.filter((t) => now - t < windowMs);
      if (fresh.length === 0) hits.delete(key);
      else hits.set(key, fresh);
    }
  }

  return {
    /** Register a hit for `key` and report whether it is allowed. */
    check(key, now = Date.now()) {
      // Keep memory bounded: clean up occasionally
      if (hits.size > 1000) prune(now);

      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        const retryAfter = Math.ceil((recent[0] + windowMs - now) / 1000);
        return { allowed: false, remaining: 0, retryAfter };
      }
      recent.push(now);
      hits.set(key, recent);
      return { allowed: true, remaining: limit - recent.length, retryAfter: 0 };
    },
    /** Forget everything (used by tests). */
    reset() {
      hits.clear();
    },
  };
}
