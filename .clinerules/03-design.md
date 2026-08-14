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

1. Hero: brand, one H1 ("Your developer platform. Live in 14 days."), one supporting sentence, CTA pair (Book Your Platform Assessment + See the 14-Day Blueprint), plus a 30-minute qualification note.
2. Problem: "Your engineering team is becoming your platform team."
3. Outcome: golden path flow (Developer → Preview → Security → Production)
4. Before/After: the shorter path contrast (outcome-oriented)
5. 14-Day Delivery: week-by-week breakdown (Week 1 / Week 2)
6. Day 14: "What is actually working on Day 14?" — journey + concrete capabilities
7. Why not build it internally: build-internally vs PlatformBox comparison table
8. Pricing: Launch €20k / Scale €39k (Recommended) / Enterprise €60k+ / Assessment €2.5k / Care €2–4k/mo, plus a "Which package is right for me?" guide
9. Assessment: standalone risk-reduction section ("Before we promise 14 days…")
10. Scope & assumptions: honest prerequisites for the 14-day promise
11. Ownership: "You own the platform." + no platform lock-in
12. Technology: role-based stack (Terraform, Kubernetes/EKS, GitHub/GitLab, GitOps/CI-CD, PlatformBox)
13. Reference architecture: simple diagram + link to /architecture
14. ROI: transparent, editable calculator (no unsupported savings claims)
15. Fit: strong fit / probably not a fit
16. FAQ + footer: copyright, email, LinkedIn

## UX rules

- Primary CTA ("Book Your Platform Assessment") should link to the Cal.com booking: https://cal.com/roberto-platformbox/platform-assessment
- Secondary CTA should be outline or glass, used for navigation to the deliverables or blueprint (/showcase) section.
- Use cards for deliverables and ROI; do not use hero cards.
- Keep motion calm and subtle rather than playful or bouncy.
- Do not leave booking CTAs as placeholder anchors.
- All icons use a unified color system: Lucide icons via `text-accent`, custom SVG icons via `currentColor` + consistent sizing.
