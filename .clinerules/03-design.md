# 03 — Design and product guidance

## Brand direction

- Follow an ultra-premium B2B visual language inspired by Linear and Vercel.
- Support both light and dark mode — default to dark but let users toggle via the header button. All colors use semantic CSS custom properties (--background, --foreground, --border, etc.) that switch automatically.
- Preserve the existing design tokens in src/app/globals.css.

## Brand identity (immutable)

The PlatformBox logo mark is **two vertical bars**:

- **Left (opening) bar: white** (`#ffffff`)
- **Right (closing) bar: blue** (`#3b82f6` — the site accent, same as `--accent` / `text-accent`)

This is permanent and must never change. Do not recolor, reorder, or unify the two bars. Any asset (PNG, SVG, ICO, HTML) that shows the logo with a different color scheme or a missing bar must be deleted and regenerated correctly.

The source of truth is `PlatformBoxLogoIcon` in `src/components/icons.tsx`, mirrored in `public/brand-logo.html` and `public/brand-cover.html`.

**Important for SVG→PNG rendering:** the `sharp`/`librsvg` pipeline used by the generator scripts **cannot render gradient strokes** (`stroke="url(#gradient)") — they render black or invisible. Always use a solid `stroke="#3b82f6"` for the right bar in any SVG intended for sharp-based PNG generation. Browser-rendered assets (`.html` mirrors) may use the gradient, but sharp-rendered SVGs (in `scripts/`) must use the solid accent.

The LinkedIn company banner (4200×700) is generated from `scripts/linkedin-cover.svg` → `public/linkedin-cover.png` via `scripts/generate-linkedin-cover.mjs`. Keep the single-message layout: bold headline, one supporting differentiation line, and the small logo mark.

## LinkedIn image specifications

When generating any image for LinkedIn, follow LinkedIn's official specs
(https://www.linkedin.com/help/linkedin/answer/a563309):

### Global
- Format: **PNG or JPEG** only.
- Maximum file size: **3MB**.

### Page images
| Image | Minimum | Recommended |
| --- | --- | --- |
| Page Cover | 4200×700 | 4200×700 |
| Page Logo | 268×268 | 400×400 |
| Life Main (Career Pages) | 1128×376 | 1128×376 |
| Life Custom modules | 502×282 | 502×282 |
| Life Company photos | 264×176 | 900×600 |
| Post link preview | 1.91:1 (1200×627), min 200px wide | — |

### Display safety
- Center important content — the cover may be trimmed horizontally or vertically on other screens.
- Keep key details away from the edges, especially the lower corners (the page logo/avatar overlays the banner).
- Use limited text on the cover; prefer high-resolution JPEG for photos (PNG is fine for flat/graphic designs).
- The logo must display correctly on both light and dark backgrounds.

### Brand constraints (must hold for every LinkedIn asset)
- Two-bar logo: left bar white `#ffffff`, right bar blue `#3b82f6`.
- sharp-rendered SVGs must use solid `stroke="#3b82f6"` — gradient strokes render broken.
- Cover = single-message layout (headline + one supporting differentiation line + small logo).

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

1. Hero: brand, one H1 ("Your developer platform. Live in 14 working days."), one supporting sentence, CTA pair (Book Your Platform Assessment + See the 14-Day Blueprint), plus a 30-minute qualification note.
2. Problem: "Your engineering team is becoming your platform team."
3. Outcome: golden path flow (Developer → Preview → Security → Production)
4. Before/After: the shorter path contrast (outcome-oriented)
5. 14-Day Delivery: week-by-week breakdown (Week 1 / Week 2 / Week 3)
6. Day 14: "What is actually working on Day 14?" — journey + concrete capabilities
7. Why not build it internally: build-internally vs PlatformBox comparison table
8. Pricing: Launch €20k / Scale €39k (Recommended) / Enterprise €60k+ / Assessment €2.5k / Care €2–4k/mo, plus a "Which package is right for me?" guide
9. Assessment: standalone risk-reduction section ("Before we promise 14 working days…")
10. Scope & assumptions: honest prerequisites for the 14-working-day promise
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
