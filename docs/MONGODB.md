# Using MongoDB (optional)

The project runs without any database: messages and subscribers are stored in JSON files.
That is perfect for local development, but on **Vercel the file system is temporary**, so for a real
production site you should store data in a database. MongoDB Atlas has a free tier that is enough for this project.

## 1. Create the database

1. Create a free account and a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. **Database Access:** create a database user (username + password).
3. **Network Access:** allow access from anywhere (`0.0.0.0/0`). Vercel uses changing IP addresses.
4. Click **Connect → Drivers** and copy the connection string, for example
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/`.
   Replace `<password>` with your real password (URL-encode special characters).

## 2. Connect the project

```bash
npm install mongodb
```

Add to `.env.local` (and to the Vercel project's Environment Variables):

```bash
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/
MONGODB_DB=lucid
```

Replace the contents of `src/lib/db.js` with [`docs/examples/mongodb-db.js`](examples/mongodb-db.js).
It exports the same five functions (`insert`, `list`, `count`, `findOne`, `insertUnique`), so no API route changes.

## 3. Prevent duplicate subscribers

In Atlas open **Browse Collections → subscribers → Indexes** and create a unique index on `email`,
or run in the Mongo shell:

```js
db.subscribers.createIndex({ email: 1 }, { unique: true })
```

## 4. Test it

```bash
npm run dev
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

The document should appear in Atlas. The unit tests in `tests/db.test.js` target the JSON store, so run them
**before** swapping `db.js`, or keep a copy of the original file.

> The example was verified against an in-memory fake of the driver, not a live Atlas cluster.
> Please test it once with your own cluster before relying on it.
