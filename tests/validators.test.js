import { test } from "node:test";
import assert from "node:assert/strict";
import { cleanText, isValidEmail, parsePagination, validateContact, validateSubscribe } from "../src/lib/validators.js";

const valid = { name: "Lamia", email: "Lamia@Example.com", subject: "Hello", message: "This is a long enough message." };

test("cleanText trims and strips control characters", () => {
  assert.equal(cleanText("  hi\u0000 there  "), "hi there");
  assert.equal(cleanText(42), "");
});

test("isValidEmail accepts and rejects expected values", () => {
  assert.equal(isValidEmail("a@b.co"), true);
  assert.equal(isValidEmail("not-an-email"), false);
  assert.equal(isValidEmail("a@b"), false);
});

test("validateContact accepts a good payload and lowercases the email", () => {
  const result = validateContact(valid);
  assert.equal(result.valid, true);
  assert.equal(result.data.email, "lamia@example.com");
});

test("validateContact reports every missing field", () => {
  const result = validateContact({});
  assert.equal(result.valid, false);
  assert.deepEqual(Object.keys(result.errors).sort(), ["email", "message", "name", "subject"]);
});

test("validateContact rejects too-short and too-long messages", () => {
  assert.ok(validateContact({ ...valid, message: "short" }).errors.message);
  assert.ok(validateContact({ ...valid, message: "x".repeat(2001) }).errors.message);
});

test("validateContact checks the optional plan against known ids", () => {
  assert.equal(validateContact({ ...valid, plan: "business" }, { planIds: ["business"] }).valid, true);
  assert.ok(validateContact({ ...valid, plan: "nope" }, { planIds: ["business"] }).errors.plan);
});

test("validateContact flags honeypot submissions as spam", () => {
  assert.equal(validateContact({ ...valid, website: "http://spam" }).spam, true);
});

test("validateContact rejects non-object bodies", () => {
  assert.equal(validateContact(null).valid, false);
  assert.equal(validateContact([]).valid, false);
});

test("validateSubscribe validates the email", () => {
  assert.equal(validateSubscribe({ email: "x@y.com" }).valid, true);
  assert.equal(validateSubscribe({ email: "bad" }).valid, false);
});

test("parsePagination clamps and defaults values", () => {
  const params = new URLSearchParams("limit=9999&offset=-4");
  assert.deepEqual(parsePagination(params), { limit: 100, offset: 0 });
  assert.deepEqual(parsePagination(new URLSearchParams("")), { limit: 20, offset: 0 });
});
