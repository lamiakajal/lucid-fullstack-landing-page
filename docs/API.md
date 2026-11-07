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

