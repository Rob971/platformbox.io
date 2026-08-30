# 04 — Quality gates and workflow

## Required checks

Run the full quality gate before claiming completion:

```bash
npm run check
```

This runs four stages, in order:

1. `lint` — eslint
2. `enforce` — `scripts/enforce-agent-rules.mjs`
3. `check:claims` — `scripts/check-capability-claims.mjs`
4. `build` — `next build`

### check:claims is load-bearing

Stage 3 is the guard that stops the marketing site claiming a capability
PlatformBox cannot deliver. It fails the build when an annotated claim in
`src/lib/content.ts` rests on a capability that is absent from
`src/lib/capability-claims.json`, is marked `websiteClaimAllowed: false`, has a
`deliveryStatus` of `NOT_READY` / `NOT_OFFERED`, or a `referenceStatus` of
`NOT_SUPPORTED` — the last meaning the IDP itself says it is not built.

Claims are identified by an explicit `claims: ["pbx...."]` annotation on the
content object, never guessed from prose. A claim resting on no capability is
marked `"__process__"` or `"__pricing__"` and skipped knowingly.

Never silence this check to get a green build. A failure here means the site is
about to promise something the platform does not do, which is a credibility
problem rather than a build problem.

Note: `src/lib/capability-claims.json` is a projection vendored BY HAND from the
IDP's `platformbox-capabilities.json`. It deliberately excludes `proven_with`,
which holds engagement ids and is therefore customer information. Because it is
hand-maintained it can drift silently — when you touch it, re-check it against
the IDP artifact.

## Enforcement expectations

- Keep AGENTS.md aligned with the repository guidance.
- Preserve the Next.js BEGIN/END markers in AGENTS.md if present.
- Do not delete or weaken CI, the enforcement script, or the capability-claims check without explicit user request.

## Git and repository hygiene

- Do not commit secrets, .env* files, credentials, or build artifacts.
- Avoid committing .next/ or node_modules/.
- Prefer descriptive commits and small, intentional changes.

## Self-check before finishing

- Are Server Components preserved where appropriate?
- Are client boundaries minimal and intentional?
- Are internal routes using next/link?
- Are design tokens and approved copy preserved?
- Did the quality gate pass, including `check:claims`?
