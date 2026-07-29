# 05 — Motion guidance

## When to use motion

Use Framer Motion for presence and hierarchy rather than decoration:

- Section entrance fades with a slight y translate
- Staggered animations for grids and lists
- Hover states that CSS cannot express cleanly

## Motion rules

- Prefer calm easing and subtle transitions rather than springy or bouncy motion.
- Keep animation focused on transform and opacity to avoid layout thrash.
- Prefer motion components over animating large layout reflows.
- Match the existing landing-page motion language before introducing new patterns.

## Client boundary

- Server page components can compose sections.
- Keep animated behavior in a dedicated client component when possible.
- Avoid wrapping the entire app tree in motion unless absolutely necessary.

## Accessibility

- Respect reduced-motion preferences when adding substantial motion.
- Avoid motion that distracts from the core product message.
