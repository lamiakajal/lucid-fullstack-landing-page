import { json } from "../../../lib/http.js";

export const dynamic = "force-dynamic";

/** GET /api/health - liveness probe for uptime monitors and deploy checks. */
export async function GET() {
  return json({
    ok: true,
    status: "healthy",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}
