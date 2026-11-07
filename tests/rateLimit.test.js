import { test } from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter } from "../src/lib/rateLimit.js";

test("allows requests up to the limit then blocks", () => {
  const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });
  assert.equal(limiter.check("ip", 0).allowed, true);
  assert.equal(limiter.check("ip", 10).allowed, true);
  const blocked = limiter.check("ip", 20);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfter >= 1);
});

test("allows requests again once the window has passed", () => {
  const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
  assert.equal(limiter.check("ip", 0).allowed, true);
  assert.equal(limiter.check("ip", 500).allowed, false);
  assert.equal(limiter.check("ip", 1500).allowed, true);
});

test("tracks different keys independently", () => {
  const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
  assert.equal(limiter.check("a", 0).allowed, true);
  assert.equal(limiter.check("b", 0).allowed, true);
});
