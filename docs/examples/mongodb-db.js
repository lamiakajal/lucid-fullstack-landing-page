/**
 * Drop-in MongoDB replacement for src/lib/db.js (see docs/MONGODB.md).
 *
 * It exports exactly the same functions as the JSON-file store, so no API route
 * has to change:  insert, list, count, findOne, insertUnique.
 *
 * Setup:
 *   1. npm install mongodb
 *   2. Set MONGODB_URI (and optionally MONGODB_DB) in .env.local / Vercel
 *   3. Replace the contents of src/lib/db.js with this file
 *   4. Create a unique index so duplicate subscribers are impossible even
 *      when two requests arrive at the same millisecond:
 *        db.subscribers.createIndex({ email: 1 }, { unique: true })
 */
import { randomUUID } from "node:crypto";
import { MongoClient } from "mongodb";

const DB_NAME = process.env.MONGODB_DB || "lucid";

// Hide MongoDB's internal _id: the API only works with our own `id` field
const WITHOUT_ID = { projection: { _id: 0 } };

/**
 * The connection promise is cached on globalThis, so hot reloads in development
 * and warm serverless invocations reuse one connection instead of opening many.
 */
function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  globalThis._lucidMongoClient ??= new MongoClient(uri).connect();
  return globalThis._lucidMongoClient.then((client) => client.db(DB_NAME));
}

async function collectionOf(name) {
  return (await getDb()).collection(name);
}

/** Insert a document; adds `id` and `createdAt`. Returns the stored document. */
export async function insert(collection, doc) {
  const stored = { id: randomUUID(), createdAt: new Date().toISOString(), ...doc };
  // insertOne adds _id to the object it receives, so give it a copy
  await (await collectionOf(collection)).insertOne({ ...stored });
  return stored;
}

/** List documents, newest first, with simple pagination. */
export async function list(collection, { limit = 20, offset = 0 } = {}) {
  return (await collectionOf(collection))
    .find({}, WITHOUT_ID)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .toArray();
}

/** Number of documents in a collection. */
export async function count(collection) {
  return (await collectionOf(collection)).countDocuments();
}

/** Find the first document matching a filter object such as { email }. */
export async function findOne(collection, filter) {
  return (await collectionOf(collection)).findOne(filter, WITHOUT_ID);
}

/**
 * Insert only when no document matches `filter`, using one atomic upsert.
 * Returns { doc, created }.
 */
export async function insertUnique(collection, filter, doc) {
  const stored = { id: randomUUID(), createdAt: new Date().toISOString(), ...doc };

  // Fields of the filter are written by the upsert itself, so leave them out of $setOnInsert
  const onInsert = { ...stored };
  for (const key of Object.keys(filter)) delete onInsert[key];

  const target = await collectionOf(collection);
  const result = await target.updateOne(filter, { $setOnInsert: onInsert }, { upsert: true });

  if (result.upsertedCount === 1) return { doc: stored, created: true };
  return { doc: await target.findOne(filter, WITHOUT_ID), created: false };
}
