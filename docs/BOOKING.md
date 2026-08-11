# Booking CTA (Cal.com)

Primary conversion action on the landing page: **Book an Architecture Audit**.

## URL

```text
https://cal.eu/roberto-platformbox/architecture-audit
```

## Where it is used

| Location | File |
| --- | --- |
| Nav link | `src/components/header.tsx` |
| Hero primary button | `src/components/landing-page.tsx` |
| Pricing card button | `src/components/landing-page.tsx` |
| Showcase CTA | `src/components/showcase/showcase-page.tsx` |

Source of truth in code:

```ts
const BOOKING_URL = "https://cal.eu/roberto-platformbox/architecture-audit";
```

Links open in a new tab (`target="_blank"` + `rel="noopener noreferrer"`).

## Changing the booking link

1. Update `BOOKING_URL` in `src/lib/constants.ts`
2. Update this doc and the README booking section
3. Run `npm run check`
4. Push to `main` (see [DEPLOY.md](./DEPLOY.md) if auth fails)
5. Confirm GitHub Actions published `gh-pages`

Do not leave booking CTAs as `#` placeholders.
