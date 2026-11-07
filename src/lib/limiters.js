import { createRateLimiter } from "./rateLimit.js";
import { getRateLimitMax } from "./config.js";
import { HttpError, getClientIp } from "./http.js";

// One shared limiter instance per server process
let writeLimiter;

/** Throw a 429 error when the caller exceeds the write-request budget. */
export function enforceWriteLimit(request, scope) {
  writeLimiter ??= createRateLimiter({ limit: getRateLimitMax(), windowMs: 60_000 });
  const result = writeLimiter.check(`${scope}:${getClientIp(request)}`);
  if (!result.allowed) {
    const error = new HttpError(429, "Too many requests. Please slow down and try again shortly.");
    error.headers = { "Retry-After": String(result.retryAfter) };
    throw error;
  }
}

/** Reset limiter state (used by tests). */
export function resetWriteLimiter() {
  writeLimiter = undefined;
}
