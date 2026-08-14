# Booking CTA (Cal.com)

Primary conversion action on the landing page: **Book Your Platform Assessment**.

## URL

```text
https://cal.com/roberto-platformbox/platform-assessment
```

## Where it is used

| Location | File |
| --- | --- |
| Nav link | `src/components/header.tsx` |
| Hero primary button | `src/components/sections/hero-section.tsx` |
| Pricing cards | `src/components/sections/pricing-section.tsx` |
| Final CTA | `src/components/sections/final-cta-section.tsx` |
| Showcase CTA | `src/components/showcase/showcase-page.tsx` |

Source of truth in code:

```ts
const BOOKING_URL = "https://cal.com/roberto-platformbox/platform-assessment";
const BOOKING_LABEL = "Book Your Platform Assessment";
```

Links open in a new tab (`target="_blank"` + `rel="noopener noreferrer"`).

## Changing the booking link

1. Update `BOOKING_URL` in `src/lib/constants.ts`
2. Update this doc and the README booking section
3. Run `npm run check`
4. Push to `main` (see [DEPLOY.md](./DEPLOY.md) if auth fails)
5. Confirm GitHub Actions published `gh-pages`

Do not leave booking CTAs as `#` placeholders.
