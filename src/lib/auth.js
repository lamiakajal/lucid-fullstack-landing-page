import { createHash, timingSafeEqual } from "node:crypto";
import { getAdminApiKey } from "./config.js";
import { HttpError } from "./http.js";

function digest(value) {
  return createHash("sha256").update(value).digest();
}

/**
 * Require a valid admin API key in the `x-api-key` header.
 * Comparison is constant-time to avoid leaking the key through timing.
 */
export function requireAdmin(request) {
  const expected = getAdminApiKey();
  if (!expected) {
    throw new HttpError(503, "Admin API is disabled. Set ADMIN_API_KEY to enable it.");
  }
  const provided = request.headers.get("x-api-key") ?? "";
  const ok = timingSafeEqual(digest(provided), digest(expected));
  if (!ok) throw new HttpError(401, "Invalid or missing API key");
}
