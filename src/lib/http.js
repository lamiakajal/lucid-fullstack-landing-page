import { MAX_BODY_BYTES } from "./config.js";

/** Error that carries an HTTP status code and optional field errors. */
export class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.details = details;
  }
}

/** Build a JSON response with sensible security defaults. */
export function json(data, init = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", headers.get("Cache-Control") ?? "no-store");
  headers.set("X-Content-Type-Options", "nosniff");
  return Response.json(data, { ...init, headers });
}

/** Build a consistent JSON error response. */
export function errorResponse(status, message, details, headers) {
  const body = { ok: false, error: message };
  if (details) body.details = details;
  return json(body, { status, headers });
}

