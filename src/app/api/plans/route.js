import { json } from "../../../lib/http.js";
import { plans } from "../../../data/plans.js";

/** GET /api/plans - public pricing plans (cached at the edge for 5 minutes). */
export async function GET() {
  return json(
    { ok: true, plans },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
  );
}
