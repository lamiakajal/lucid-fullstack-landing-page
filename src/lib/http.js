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

/**
 * Best-effort client IP detection behind proxies (Vercel, Nginx, ...).
 * Only used as a rate-limit key, never as a security boundary.
 */
export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Basic CSRF protection: when the browser sends an Origin header it must
 * match the host the request was sent to.
 */
export function assertSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return; // non-browser clients (curl, server-to-server)
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  let originHost;
  try {
    originHost = new URL(origin).host;
  } catch {
    throw new HttpError(403, "Invalid origin");
  }
  if (host && originHost !== host) {
    throw new HttpError(403, "Cross-origin requests are not allowed");
  }
}

/** Read and parse a JSON body while enforcing a size limit. */
export async function readJson(request) {
  const type = request.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) {
    throw new HttpError(415, "Content-Type must be application/json");
  }
  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
    throw new HttpError(413, "Request body is too large");
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new HttpError(400, "Request body is not valid JSON");
  }
}

/**
 * Wrap a route handler so thrown HttpErrors become JSON responses
 * and unexpected errors never leak internals to the client.
 */
export function withErrorHandling(handler) {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (error) {
      if (error instanceof HttpError) {
        return errorResponse(error.status, error.message, error.details, error.headers);
      }
      console.error("[api] unexpected error:", error);
      return errorResponse(500, "Something went wrong. Please try again later.");
    }
  };
}
