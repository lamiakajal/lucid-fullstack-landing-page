import { count, list } from "../../../../lib/db.js";
import { requireAdmin } from "../../../../lib/auth.js";
import { json, withErrorHandling } from "../../../../lib/http.js";
import { parsePagination } from "../../../../lib/validators.js";

export const dynamic = "force-dynamic";

/** GET /api/admin/messages?limit=&offset= - contact messages, newest first. */
export const GET = withErrorHandling(async (request) => {
  requireAdmin(request);
  const { limit, offset } = parsePagination(new URL(request.url).searchParams);
  const [items, total] = await Promise.all([list("messages", { limit, offset }), count("messages")]);
  return json({ ok: true, total, limit, offset, items });
});
