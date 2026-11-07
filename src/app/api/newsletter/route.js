import { insertUnique } from "../../../lib/db.js";
import { assertSameOrigin, errorResponse, json, readJson, withErrorHandling } from "../../../lib/http.js";
import { enforceWriteLimit } from "../../../lib/limiters.js";
import { validateSubscribe } from "../../../lib/validators.js";

export const dynamic = "force-dynamic";

/** POST /api/newsletter - subscribe an email address (idempotent). */
export const POST = withErrorHandling(async (request) => {
  assertSameOrigin(request);
  enforceWriteLimit(request, "newsletter");

  const body = await readJson(request);
  const { valid, errors, data, spam } = validateSubscribe(body);

  if (spam) return json({ ok: true, message: "You are subscribed. Thank you!" }, { status: 201 });
  if (!valid) return errorResponse(422, "Please enter a valid email address.", errors);

  const { created } = await insertUnique("subscribers", { email: data.email }, { email: data.email });

  return json(
    {
      ok: true,
      alreadySubscribed: !created,
      message: created ? "You are subscribed. Thank you!" : "You are already subscribed.",
    },
    { status: created ? 201 : 200 }
  );
});
