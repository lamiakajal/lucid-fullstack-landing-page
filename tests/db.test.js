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
