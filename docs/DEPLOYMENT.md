# Deployment Notes

## Vercel

1. Import the GitHub repository in Vercel (framework preset: Next.js).
2. Add the environment variables from `.env.example` (at least `ADMIN_API_KEY` and `NEXT_PUBLIC_SITE_URL`; optionally `GOOGLE_SITE_VERIFICATION`).
3. Deploy. Every push to `main` redeploys automatically.

## About data storage

The API stores messages and subscribers in JSON files through `src/lib/db.js`.

- **Local development / your own server (VPS, Docker with a volume):** files are kept in `./.data` and survive restarts.
- **Vercel and other serverless platforms:** the filesystem is temporary. The store falls back to `/tmp/lucid-data`, which is wiped when the function instance is recycled. This is fine for a demo, but **use a real database in production**.

### Switching to a real database

`src/lib/db.js` exports a small adapter interface: `insert`, `list`, `count`, `findOne` and `insertUnique`.
A ready-made MongoDB version is included: follow [MONGODB.md](MONGODB.md).
For any other database, re-implement these five functions with the same signatures.
No API route or component needs to change.

## Rate limiting on serverless

The limiter in `src/lib/rateLimit.js` keeps counters in memory, so each serverless instance has its own counters.
For strict global limits, replace it with a shared store such as Upstash Redis.
