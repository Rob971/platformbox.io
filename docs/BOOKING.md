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
| Assessment section | `src/components/sections/assessment-section.tsx` |
| Final CTA | `src/components/sections/final-cta-section.tsx` |
| Showcase CTA | `src/components/showcase/showcase-page.tsx` |
| Architecture page CTA | `src/components/architecture/architecture-page.tsx` |

Source of truth in code:

```ts
const BOOKING_URL = "https://cal.com/roberto-platformbox/platform-assessment";
const BOOKING_LABEL = "Book Your Platform Assessment";
```

Links open in a new tab (`target="_blank"` + `rel="noopener noreferrer"`).

## Cal.com event configuration

The booking flow should feel like part of the product. Configure the Cal.com event as follows.

### Event title

**PlatformBox Platform Assessment**

### Description

> A 30-minute technical discovery call to understand your current platform, identify the biggest developer/DevOps bottlenecks, and determine whether PlatformBox can deliver a production-ready developer platform in 14 working days.

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
