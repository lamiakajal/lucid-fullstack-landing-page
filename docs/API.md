# API Reference

All endpoints live under `/api`, return JSON and use the same envelope:

```json
{ "ok": true, "...": "payload" }
```

Errors look like this (`details` is only present for validation errors):

```json
{ "ok": false, "error": "Please fix the highlighted fields.", "details": { "email": "Please enter a valid email address" } }
```

| Status | Meaning |
| ------ | ------- |
| 200 / 201 | Success |
| 400 | Body is not valid JSON |
| 401 | Missing or wrong admin API key |
| 403 | Cross-origin browser request |
| 413 | Body larger than 10 KB |
| 415 | `Content-Type` is not `application/json` |
| 422 | Validation failed (see `details`) |
| 429 | Rate limit exceeded (see `Retry-After` header) |
| 503 | Admin API disabled (no `ADMIN_API_KEY` configured) |

## Public endpoints

### `GET /api/health`
Liveness probe. Returns `{ ok, status, uptimeSeconds, timestamp }`.

### `GET /api/plans`
Returns all pricing plans: `{ ok, plans: [{ id, name, price, period, desc, popular }] }`.

### `GET /api/testimonials`
Returns client testimonials: `{ ok, testimonials: [{ id, quote, name, role, avatar }] }`.

### `POST /api/contact`
Stores a contact message.

| Field | Required | Rules |
| ----- | -------- | ----- |
| `name` | yes | 1-100 characters |
| `email` | yes | valid email, max 254 characters |
| `subject` | yes | 1-150 characters |
| `message` | yes | 10-2000 characters |
| `plan` | no | one of `free`, `personal`, `business`, `unlimited` |
| `website` | no | honeypot, must stay empty |

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Lamia","email":"lamia@example.com","subject":"Hello","message":"I would like to know more."}'
```

### `POST /api/newsletter`
Subscribes an email address. Subscribing twice is safe: the second call returns `200` with `alreadySubscribed: true`.

```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"lamia@example.com"}'
```

## Admin endpoints

Send the secret from `ADMIN_API_KEY` in the `x-api-key` header.

| Endpoint | Description |
| -------- | ----------- |
| `GET /api/admin/messages?limit=20&offset=0` | Contact messages, newest first (`limit` max 100) |
| `GET /api/admin/subscribers?limit=20&offset=0` | Newsletter subscribers, newest first |
| `GET /api/admin/stats` | `{ stats: { messages, subscribers } }` |

```bash
curl http://localhost:3000/api/admin/messages -H "x-api-key: $ADMIN_API_KEY"
```

## Protections built in

- **Validation and sanitising** of every field (trimmed, control characters removed, length limits).
- **Honeypot field** (`website`): bots that fill it get a fake success response and nothing is stored.
- **Rate limiting**: 5 write requests per minute per IP by default (`RATE_LIMIT_MAX`).
- **Same-origin check**: browser requests from other sites are rejected.
- **Body size limit** of 10 KB and strict `Content-Type` check.
- **Constant-time API key comparison** for admin routes.
