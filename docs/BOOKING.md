# Entry via a call

Every engagement starts with a conversation with Roberto, then the €2,500 Platform Readiness Assessment if it is the right next step.

Primary: **Talk to Roberto** → the Cal.com call below.

**Self-serve Assessment signup and payment is paused from 2026-10-15** (decision by Roberto: legal work is on hold until genuine customer interest). It is gated by `SELF_SERVE_ASSESSMENT_OPEN` in `src/lib/constants.ts`, currently `false`:

- `AssessmentCta` renders nothing and the "Start Assessment — €2,500" label is shown nowhere.
- `/assessment/start`, `/start` and `/admin/public/assessment` return a 307 to `/assessment` (`cache-control: no-store`).
- `/assessment/activate`, `/assessment/resend-activation`, `/assessment/complete` and `/assessment/cancelled` stay proxied, so existing accounts keep working.

To reopen, set the flag to `true` in a reviewed pull request, and review the "how does this start" copy (FAQ, How it works, final CTA, assessment page) at the same time. It is a constant, not an environment variable, so a misconfigured deploy cannot reopen it.

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
const ASSESSMENT_URL = "/assessment/start"; // only shown while SELF_SERVE_ASSESSMENT_OPEN is true
const ASSESSMENT_LABEL = "Start Assessment — €2,500"; // only shown while SELF_SERVE_ASSESSMENT_OPEN is true
```

Call links open in a new tab (`target="_blank"` + `rel="noopener noreferrer"`). Purchase links (only while the checkout is open) use a full document navigation in the same tab because Delivery serves HTML rather than Next.js React responses.

## Cal.com event configuration

The booking flow should feel like part of the product. Configure the Cal.com event as follows.

### Event title

**Talk to Roberto**

### Description

> A conversation with Roberto about the Platform Readiness Assessment. Every PlatformBox engagement starts with a conversation; the €2,500 Assessment follows if it is the right next step.

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
- `/assessment/complete`, `/assessment/cancelled`, `/assessment/activate`, and `/assessment/resend-activation` proxy to the existing Delivery public handlers.
- `/assessment/start` proxies to the Delivery checkout only while `SELF_SERVE_ASSESSMENT_OPEN` is `true`. While it is `false`, `/assessment/start`, `/start` and `/admin/public/assessment` redirect with 307 to `/assessment`.
- `/start/complete`, `/start/cancelled` and the other legacy `/admin/public/...` links redirect with 307 to their canonical routes, preserving methods, bodies and queries.
- Delivery generates clean public form actions, absolute Stripe return URLs and activation links when `BASE_PATH=/admin`. Authenticated workspace and administration routes retain their existing mappings and access controls.
- Checkout keeps Delivery's CSP; the marketing policy must not be added to these responses.

Local proof: `npm run check`, `node --test tests/assessment-proxy.test.mjs`, then `node tests/funnel-browser.mjs`. The browser check requires the sibling Delivery checkout (override with `PBX_DELIVERY_REPO`), uses an in-memory database and simulated Stripe API/SDK, and sends no real payment or email.

Release both repositories together: publish the site aliases first, then Delivery's generated URLs. Roll back Delivery first, then the site. The external Cal.com configuration above is desired copy, not a claim that it has been updated.
