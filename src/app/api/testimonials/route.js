import { json } from "../../../lib/http.js";
import { testimonials } from "../../../data/testimonials.js";

/** GET /api/testimonials - public client testimonials (cached for 5 minutes). */
export async function GET() {
  return json(
    { ok: true, testimonials },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
  );
}
