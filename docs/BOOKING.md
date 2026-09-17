# Assessment funnel and optional call

Every engagement starts with the €2,500 Platform Readiness Assessment.

Primary: **Start Assessment — €2,500** → `/assessment/start`.
Secondary: **Talk to Roberto** → the optional Cal.com call below. A call is never a prerequisite.

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
| Assessment page | `src/components/assessment/assessment-page.tsx` |
| Final CTA | `src/components/sections/final-cta-section.tsx` |
| Showcase CTA | `src/components/showcase/showcase-page.tsx` |
| Architecture page CTA | `src/components/architecture/architecture-page.tsx` |

Source of truth in code:

```ts
const BOOKING_URL = "https://cal.com/roberto-platformbox/platform-assessment";
const BOOKING_LABEL = "Talk to Roberto";
const ASSESSMENT_URL = "/assessment/start";
const ASSESSMENT_LABEL = "Start Assessment — €2,500";
```

Call links open in a new tab (`target="_blank"` + `rel="noopener noreferrer"`). Purchase links use a full document navigation in the same tab because Delivery serves HTML rather than Next.js React responses.

## Cal.com event configuration

The booking flow should feel like part of the product. Configure the Cal.com event as follows.

### Event title

**Talk to Roberto**

### Description

> An optional free 30-minute conversation about the Platform Readiness Assessment. Ask questions before buying; every PlatformBox delivery engagement starts with the €2,500 Assessment.

### Booking questions (keep lightweight)

- Name
- Email
- Engineering organization size
- What would you most like to improve?
- Tell us briefly about your current platform
- Optional additional guests

Do not add a long qualification questionnaire.

## Changing the booking link

1. Update `BOOKING_URL` in `src/lib/constants.ts`
2. Update this doc and the README booking section
3. Run `npm run check`
4. Push to `main` (see [DEPLOY.md](./DEPLOY.md) if auth fails)
5. Confirm Vercel deployment succeeded

Do not leave booking CTAs as `#` placeholders.


## Public routing contract

- `/assessment` is the marketing product page.
- `/assessment/start`, `/assessment/complete`, `/assessment/cancelled`, `/assessment/activate`, and `/assessment/resend-activation` proxy to the existing Delivery public handlers.
- `/start` and legacy `/admin/public/...` onboarding links redirect with 307, preserving methods, bodies and queries.
- Delivery generates clean public form actions, absolute Stripe return URLs and activation links when `BASE_PATH=/admin`. Authenticated workspace and administration routes retain their existing mappings and access controls.
- Checkout keeps Delivery's CSP; the marketing policy must not be added to these responses.

Local proof: `npm run check`, `node --test tests/assessment-proxy.test.mjs`, then `node tests/funnel-browser.mjs`. The browser check requires the sibling Delivery checkout (override with `PBX_DELIVERY_REPO`), uses an in-memory database and simulated Stripe API/SDK, and sends no real payment or email.

Release both repositories together: publish the site aliases first, then Delivery's generated URLs. Roll back Delivery first, then the site. The external Cal.com configuration above is desired copy, not a claim that it has been updated.
