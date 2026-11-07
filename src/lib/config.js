/**
 * Central place for reading runtime configuration.
 * Values are read lazily (inside functions) so tests can change process.env.
 */

/** Directory where the JSON data store keeps its files. */
export function getDataDir() {
  if (process.env.DATA_DIR) return process.env.DATA_DIR;
  // Vercel's filesystem is read-only except for /tmp (data there is ephemeral).
  if (process.env.VERCEL) return "/tmp/lucid-data";
  return `${process.cwd()}/.data`;
}

/** Maximum number of write requests allowed per IP per minute. */
export function getRateLimitMax() {
  const value = Number.parseInt(process.env.RATE_LIMIT_MAX ?? "", 10);
  return Number.isFinite(value) && value > 0 ? value : 5;
}

/** Secret that protects the admin endpoints (empty string = disabled). */
export function getAdminApiKey() {
  return process.env.ADMIN_API_KEY ?? "";
}

/** Maximum accepted size of a JSON request body, in bytes. */
export const MAX_BODY_BYTES = 10 * 1024;
