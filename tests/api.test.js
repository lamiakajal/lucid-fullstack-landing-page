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

test("contact: stores a valid message", async () => {
  const res = await contactPost(post("/api/contact", good));
  assert.equal(res.status, 201);
  assert.ok((await res.json()).id);
});

test("contact: rejects invalid input with field errors", async () => {
  const res = await contactPost(post("/api/contact", { ...good, email: "nope" }));
  assert.equal(res.status, 422);
  assert.ok((await res.json()).details.email);
});

test("contact: rejects bad JSON, wrong content type and cross-origin posts", async () => {
  assert.equal((await contactPost(post("/api/contact", "{oops"))).status, 400);
  assert.equal((await contactPost(post("/api/contact", good, { "content-type": "text/plain" }))).status, 415);
  assert.equal((await contactPost(post("/api/contact", good, { origin: "https://evil.example" }))).status, 403);
});

test("contact: honeypot pretends success without storing", async () => {
  const before = (await (await statsGet(admin("/api/admin/stats"))).json()).stats.messages;
  const res = await contactPost(post("/api/contact", { ...good, website: "spam" }));
  assert.equal(res.status, 201);
  const after = (await (await statsGet(admin("/api/admin/stats"))).json()).stats.messages;
  assert.equal(after, before);
});

test("contact: rate limits repeated requests", async () => {
  process.env.RATE_LIMIT_MAX = "2";
  resetWriteLimiter();
  await contactPost(post("/api/contact", good));
  await contactPost(post("/api/contact", good));
  const res = await contactPost(post("/api/contact", good));
  assert.equal(res.status, 429);
  assert.ok(res.headers.get("retry-after"));
  delete process.env.RATE_LIMIT_MAX;
});

test("newsletter: subscribes once and reports duplicates", async () => {
  const first = await newsletterPost(post("/api/newsletter", { email: "n@example.com" }));
  assert.equal(first.status, 201);
  const second = await newsletterPost(post("/api/newsletter", { email: "N@example.com" }));
  assert.equal(second.status, 200);
  assert.equal((await second.json()).alreadySubscribed, true);
});

test("admin: requires the API key", async () => {
  assert.equal((await messagesGet(admin("/api/admin/messages", "wrong"))).status, 401);
  const ok = await messagesGet(admin("/api/admin/messages"));
  assert.equal(ok.status, 200);
  assert.ok((await ok.json()).total >= 1);
});

test("admin: is disabled when no key is configured", async () => {
  delete process.env.ADMIN_API_KEY;
  assert.equal((await messagesGet(admin("/api/admin/messages"))).status, 503);
  process.env.ADMIN_API_KEY = "secret";
});
