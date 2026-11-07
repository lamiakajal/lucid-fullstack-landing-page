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
