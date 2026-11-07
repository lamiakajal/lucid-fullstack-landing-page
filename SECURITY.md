# Security Policy

## Supported versions

Only the latest version on the `main` branch receives security fixes.

## Reporting a vulnerability

Please **do not** open a public issue for security problems.
Report them privately through GitHub: **Security → Report a vulnerability** in this repository.

Include what you found, the steps to reproduce it and, if possible, a suggested fix.
You can expect a first answer within a few days.

## Built-in protections

Input validation and sanitising, honeypot spam trap, rate limiting, same-origin checks, request size limits,
constant-time admin key comparison and security response headers. Details are in [docs/API.md](docs/API.md).
