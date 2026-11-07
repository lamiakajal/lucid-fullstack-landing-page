import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { POST as contactPost } from "../src/app/api/contact/route.js";
import { POST as newsletterPost } from "../src/app/api/newsletter/route.js";
import { GET as messagesGet } from "../src/app/api/admin/messages/route.js";
import { GET as statsGet } from "../src/app/api/admin/stats/route.js";
import { GET as healthGet } from "../src/app/api/health/route.js";
import { GET as plansGet } from "../src/app/api/plans/route.js";
import { GET as testimonialsGet } from "../src/app/api/testimonials/route.js";
import { resetWriteLimiter } from "../src/lib/limiters.js";

let dir;
const good = { name: "Lamia", email: "l@example.com", subject: "Hi", message: "A perfectly fine message body." };

function post(url, body, headers = {}) {
  return new Request(`http://localhost${url}`, {
    method: "POST",
    headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": "1.2.3.4", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
const admin = (url, key = "secret") => new Request(`http://localhost${url}`, { headers: { "x-api-key": key } });

before(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "lucid-api-"));
  process.env.DATA_DIR = dir;
  process.env.ADMIN_API_KEY = "secret";
});
after(async () => {
  delete process.env.DATA_DIR;
  delete process.env.ADMIN_API_KEY;
  delete process.env.RATE_LIMIT_MAX;
  await rm(dir, { recursive: true, force: true });
});
beforeEach(() => resetWriteLimiter());

test("health, plans and testimonials return data", async () => {
  assert.equal((await (await healthGet()).json()).status, "healthy");
  assert.equal((await (await plansGet()).json()).plans.length, 4);
  assert.equal((await (await testimonialsGet()).json()).testimonials.length, 8);
});
