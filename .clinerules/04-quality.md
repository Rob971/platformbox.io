# 04 — Quality gates and workflow

## Required checks

Run the full quality gate before claiming completion:

```bash
npm run check
```

This runs lint, enforce, and build.

## Enforcement expectations

- Keep AGENTS.md aligned with the repository guidance.
- Preserve the Next.js BEGIN/END markers in AGENTS.md if present.
- Do not delete or weaken CI or the enforcement script without explicit user request.

## Git and repository hygiene

- Do not commit secrets, .env* files, credentials, or build artifacts.
- Avoid committing .next/ or node_modules/.
- Prefer descriptive commits and small, intentional changes.

## Self-check before finishing

- Are Server Components preserved where appropriate?
- Are client boundaries minimal and intentional?
- Are internal routes using next/link?
- Are design tokens and approved copy preserved?
- Did the quality gate pass?
