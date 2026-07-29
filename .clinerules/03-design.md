# 03 — Design and product guidance

## Brand direction

- Follow an ultra-premium B2B visual language inspired by Linear and Vercel.
- Keep the experience strictly dark-mode oriented.
- Preserve the existing design tokens in src/app/globals.css.

## Required design tokens

- --background
- --foreground
- --muted
- --accent
- --accent-hover
- @import "tailwindcss"
- @theme inline

## Landing page composition

Keep the approved marketing structure:

1. Hero: brand, one H1, one supporting sentence, CTA pair
2. Problem: one clear job
3. Deliverables: 2x2 glass bento layout
4. Economics: ROI section with distinct $20,000 USD / 14 Days card
5. Footer: copyright, email, LinkedIn

## UX rules

- Primary CTA should link to the Planfy booking widget: https://www.planfy.com/booking-widget/platformbox-io
- Secondary CTA should be outline or glass, used for navigation to the deliverables or blueprint section.
- Use cards for deliverables and ROI; do not use hero cards.
- Keep motion calm and subtle rather than playful or bouncy.
- Do not leave booking CTAs as placeholder anchors.
