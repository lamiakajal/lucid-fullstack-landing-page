import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { count, findOne, insert, insertUnique, list } from "../src/lib/db.js";

let dir;
before(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "lucid-db-"));
  process.env.DATA_DIR = dir;
});
after(async () => {
  delete process.env.DATA_DIR;
  await rm(dir, { recursive: true, force: true });
});

test("insert stores documents with id and createdAt", async () => {
  const doc = await insert("things", { a: 1 });
  assert.ok(doc.id);
  assert.ok(doc.createdAt);
  assert.equal(await count("things"), 1);
});

test("list returns newest first and paginates", async () => {
  await insert("ordered", { n: 1 });
  await insert("ordered", { n: 2 });
  await insert("ordered", { n: 3 });
  const page = await list("ordered", { limit: 2, offset: 0 });
  assert.deepEqual(page.map((d) => d.n), [3, 2]);
});

test("concurrent inserts are not lost", async () => {
  await Promise.all(Array.from({ length: 25 }, (_, n) => insert("concurrent", { n })));
  assert.equal(await count("concurrent"), 25);
});

test("insertUnique prevents duplicates even when called concurrently", async () => {
  const results = await Promise.all(
    Array.from({ length: 5 }, () => insertUnique("subs", { email: "a@b.co" }, { email: "a@b.co" }))
  );
  assert.equal(results.filter((r) => r.created).length, 1);
  assert.equal(await count("subs"), 1);
});

test("findOne matches documents by filter object", async () => {
  await insert("lookup", { email: "x@y.co", role: "admin" });
  assert.equal((await findOne("lookup", { email: "x@y.co" })).role, "admin");
  assert.equal(await findOne("lookup", { email: "nobody@y.co" }), null);
});

test("invalid collection names are rejected", async () => {
  await assert.rejects(() => insert("../evil", {}), /Invalid collection name/);
});
