# 03 — Design and product guidance

## Brand direction

- Follow an ultra-premium B2B visual language inspired by Linear and Vercel.
- Keep the experience strictly dark-mode oriented.
- Preserve the existing design tokens in src/app/globals.css.

## Brand identity (immutable)

The PlatformBox logo mark is **two vertical bars**:

- **Left bar: white** (`#ffffff`)
- **Right bar: blue accent gradient** (`#3b82f6` → `#60a5fa`)

This is permanent and must never change. Do not recolor, reorder, or unify the two bars. The source of truth is `PlatformBoxLogoIcon` in `src/components/icons.tsx`, mirrored in `public/brand-logo.html` and `public/brand-cover.html`.

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
2. Why PlatformBox: 6-feature glass bento grid with custom icons
3. Problem: "01 / The Bottleneck" — one clear job
4. Deliverables: "02 / The 14-Day Solution" — 2×2 glass bento layout
5. Economics: "03 / The Financial ROI" section with distinct €20,000 EUR / 14 Days card
6. Footer: copyright, email, LinkedIn

## UX rules

- Primary CTA should link to the Cal.com booking: https://cal.eu/roberto-platformbox/architecture-audit
- Secondary CTA should be outline or glass, used for navigation to the deliverables or blueprint section.
- Use cards for deliverables and ROI; do not use hero cards.
- Keep motion calm and subtle rather than playful or bouncy.
- Do not leave booking CTAs as placeholder anchors.
- All icons use a unified color system: Lucide icons via `text-accent`, custom SVG icons via `currentColor` + consistent sizing.
