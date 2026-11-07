# Contributing

Thanks for your interest in improving Lucid!

## Workflow

1. Fork the repository and create a branch from `main`:
   `feat/short-name`, `fix/short-name`, `docs/short-name`, `chore/short-name`, `test/short-name`.
2. Make your change and keep the commits small and focused.
3. Make sure everything passes locally:

   ```bash
   npm run lint
   npm test
   npm run build
   ```

4. Open a pull request using the template. Describe **what** changed and **why**.

## Commit messages

This project follows [Conventional Commits](https://www.conventionalcommits.org):

```text
type(scope): short summary in the imperative mood
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`.
Example: `feat(api): add rate limiting to the contact endpoint`.

## Code style

- Comments are written in English and explain **why**, not what.
- Animations must only change `transform` and `opacity`, and must respect `prefers-reduced-motion`.
- New API routes need validation and tests in `tests/`.
- Run the formatter settings from `.editorconfig` (2 spaces, LF line endings).
