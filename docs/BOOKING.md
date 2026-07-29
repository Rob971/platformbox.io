# Booking CTA (Planfy)

Primary conversion action on the landing page: **Book an Architecture Audit**.

## URL

```text
https://www.planfy.com/booking-widget/platformbox-io
```

## Where it is used

| Location | File |
| --- | --- |
| Nav link | `src/components/landing-page.tsx` |
| Hero primary button | `src/components/landing-page.tsx` |
| Pricing card button | `src/components/landing-page.tsx` |

Source of truth in code:

```ts
const BOOKING_URL = "https://www.planfy.com/booking-widget/platformbox-io";
```

Links open in a new tab (`target="_blank"` + `rel="noopener noreferrer"`).

## Changing the booking link

1. Update `BOOKING_URL` in `src/components/landing-page.tsx`
2. Update this doc and the README booking section
3. Run `npm run check`
4. Push to `main` (see [DEPLOY.md](./DEPLOY.md) if auth fails)
5. Confirm GitHub Actions published `gh-pages`

Do not leave booking CTAs as `#` placeholders.
