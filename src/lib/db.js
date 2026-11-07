import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getDataDir } from "./config.js";

/**
 * Minimal JSON-file data store.
 *
 * - One file per collection (e.g. messages.json)
 * - Writes are serialised per collection and are atomic (temp file + rename)
 * - The exported functions form a small adapter interface, so this module can
 *   be replaced by MongoDB/Postgres later without touching the API routes.
 */

const COLLECTION_NAME = /^[a-z][a-z0-9_-]{0,31}$/;

/** @type {Map<string, Promise<unknown>>} promise chain per collection */
const locks = new Map();

function filePath(collection) {
  if (!COLLECTION_NAME.test(collection)) {
    throw new Error(`Invalid collection name: ${collection}`);
  }
  return path.join(getDataDir(), `${collection}.json`);
}

/** Run `task` after every earlier task on the same collection finished. */
function withLock(collection, task) {
  const previous = locks.get(collection) ?? Promise.resolve();
  const next = previous.then(task, task);
  // Store a promise that never rejects so one failure does not block the queue
  locks.set(collection, next.catch(() => {}));
  return next;
}

async function readAll(collection) {
  try {
    const raw = await fs.readFile(filePath(collection), "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function writeAll(collection, docs) {
  const target = filePath(collection);
  await fs.mkdir(path.dirname(target), { recursive: true });
  const temp = `${target}.${process.pid}.${randomUUID()}.tmp`;
  await fs.writeFile(temp, JSON.stringify(docs, null, 2), "utf8");
  await fs.rename(temp, target);
}

/** Insert a document; adds `id` and `createdAt`. Returns the stored document. */
export function insert(collection, doc) {
  return withLock(collection, async () => {
    const docs = await readAll(collection);
    const stored = { id: randomUUID(), createdAt: new Date().toISOString(), ...doc };
    docs.push(stored);
    await writeAll(collection, docs);
    return stored;
  });
}

/** List documents, newest first, with simple pagination. */
export function list(collection, { limit = 20, offset = 0 } = {}) {
  return withLock(collection, async () => {
    const docs = await readAll(collection);
    return docs.slice().reverse().slice(offset, offset + limit);
  });
}

/** Number of documents in a collection. */
export function count(collection) {
  return withLock(collection, async () => (await readAll(collection)).length);
}

/** True when every key in `filter` equals the same key in `doc`. */
function matches(doc, filter) {
  return Object.entries(filter).every(([key, value]) => doc[key] === value);
}

/**
 * Find the first document matching a filter object such as { email: "a@b.co" }
 * (or null). Plain objects keep the interface compatible with MongoDB.
 */
export function findOne(collection, filter) {
  return withLock(collection, async () => {
    const docs = await readAll(collection);
    return docs.find((doc) => matches(doc, filter)) ?? null;
  });
}

/**
 * Insert only when no existing document matches `filter` (e.g. { email }).
 * Runs inside a single lock, so concurrent calls cannot create duplicates.
 * Returns { doc, created }.
 */
export function insertUnique(collection, filter, doc) {
  return withLock(collection, async () => {
    const docs = await readAll(collection);
    const existing = docs.find((item) => matches(item, filter));
    if (existing) return { doc: existing, created: false };
    const stored = { id: randomUUID(), createdAt: new Date().toISOString(), ...doc };
    docs.push(stored);
    await writeAll(collection, docs);
    return { doc: stored, created: true };
  });
}
