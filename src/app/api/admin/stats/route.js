import { count } from "../../../../lib/db.js";
import { requireAdmin } from "../../../../lib/auth.js";
import { json, withErrorHandling } from "../../../../lib/http.js";

export const dynamic = "force-dynamic";

/** GET /api/admin/stats - quick totals for a dashboard. */
export const GET = withErrorHandling(async (request) => {
  requireAdmin(request);
  const [messages, subscribers] = await Promise.all([count("messages"), count("subscribers")]);
  return json({ ok: true, stats: { messages, subscribers } });
});
