import { insert } from "../../../lib/db.js";
import { assertSameOrigin, errorResponse, json, readJson, withErrorHandling } from "../../../lib/http.js";
import { enforceWriteLimit } from "../../../lib/limiters.js";
import { validateContact } from "../../../lib/validators.js";
import { planIds } from "../../../data/plans.js";

export const dynamic = "force-dynamic";

/** POST /api/contact - store a message sent through the contact form. */
export const POST = withErrorHandling(async (request) => {
  assertSameOrigin(request);
  enforceWriteLimit(request, "contact");

  const body = await readJson(request);
  const { valid, errors, data, spam } = validateContact(body, { planIds });

  // Honeypot triggered: pretend everything worked so bots learn nothing
  if (spam) return json({ ok: true, message: "Thank you! Your message has been sent." }, { status: 201 });

  if (!valid) return errorResponse(422, "Please fix the highlighted fields.", errors);

  const stored = await insert("messages", {
    ...data,
    userAgent: request.headers.get("user-agent")?.slice(0, 200) ?? "",
  });

  return json(
    { ok: true, id: stored.id, message: "Thank you! Your message has been sent." },
    { status: 201 }
  );
});
