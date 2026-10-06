<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PlatformBox.io — Agent Instructions

## Product

PlatformBox.io is a premium B2B marketing site for **PlatformBox Launch** — a production-ready developer platform delivered in **14 working days** at a fixed price, aimed at post-Series A engineering leaders and Fractional CTOs. Pricing tiers: **Launch €20,000 / Scale €39,000 (recommended) / Enterprise €60,000+**.

**Logo (immutable):** two vertical bars — left **white**, right **blue gradient** (`#3b82f6` → `#60a5fa`). Never change, recolor, or unify. See `.clinerules/03-design.md`.

**Booking CTA (all "Book Your Platform Assessment" buttons):**  
https://cal.com/roberto-platformbox/platform-assessment  

Canonical constants: `BOOKING_URL` and `BOOKING_LABEL` in `src/lib/constants.ts`. See `docs/BOOKING.md`.

## Stack (locked)

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 App Router (`src/app`) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline`) |
| Motion | Framer Motion |
| Icons | Lucide React + custom SVG icons (`src/components/icons.tsx`) |
| Fonts | `next/font` (Geist) |

Do not introduce competing frameworks (Pages Router, CSS-in-JS, styled-components, Material UI, etc.) unless explicitly requested.

## Enforcement (do not bypass)

| Layer | What it does |
| --- | --- |
| `.clinerules/` | Provides the repository’s modular agent instructions |
| `npm run enforce` | Fails on missing rules, `middleware.ts`, Pages Router, client `page`/`layout`, missing design tokens, banned deps |
| ESLint `no-restricted-imports` | Blocks styled-components / Emotion / MUI |
| GitHub Actions `.github/workflows/ci.yml` | Runs `enforce` + `lint` + `build` on PRs and pushes |

**Completion gate:** `npm run check` (`lint` → `enforce` → `build`).

## Mandatory workflow

1. Read the relevant files in `.clinerules/` before making changes.
2. Before Next.js / React Router / caching / proxy work, open the matching doc under `node_modules/next/dist/docs/` for **this installed version**.
3. Prefer Server Components by default. `page.tsx` / `layout.tsx` must stay server; add `"use client"` only in `src/components/` leaves (motion, handlers, hooks, browser APIs).
4. Keep marketing copy exact unless the user asks to change it.
5. After substantive UI changes: `npm run check`.
6. Do not commit secrets, `.env*`, `.next/`, or `node_modules/`.
7. Do not delete or weaken CI / `scripts/enforce-agent-rules.mjs` without an explicit user request.

## Docs map (start here)

### Project docs

| Topic | Doc |
| --- | --- |
| Booking CTA (Cal.com) | `docs/BOOKING.md` |
| Custom domain / DNS | `docs/CUSTOM-DOMAIN.md` |
| Deploy + git auth | `docs/DEPLOY.md` |
| Docs index | `docs/README.md` |

### Next.js bundled docs (`node_modules/next/dist/docs/`)

| Task | Bundled doc |
| --- | --- |
| RSC vs client | `01-app/01-getting-started/05-server-and-client-components.md` |
| Routing / layouts | `01-app/01-getting-started/03-layouts-and-pages.md` |
| CSS / Tailwind | `01-app/01-getting-started/11-css.md` |
| Fonts | `01-app/01-getting-started/13-fonts.md` |
| Metadata / OG | `01-app/01-getting-started/14-metadata-and-og-images.md` |
| Images | `01-app/01-getting-started/12-images.md` |
| Proxy (not middleware) | `01-app/01-getting-started/16-proxy.md` |
| Production | `01-app/02-guides/production-checklist.md` |
| AI agents setup | `01-app/02-guides/ai-agents.md` |
| Upgrade notes | `01-app/02-guides/upgrading/version-16.md` |

## Architecture preferences

- `src/app` for routes; colocate UI in `src/components` or `src/app/_components`.
- Import alias: `@/*`.
- Use `next/link`, `next/image`, and `next/font` — never raw `<img>` for local/remote optimized assets or `<a>` for internal routes.
- `params` and `searchParams` are **async** (`Promise<...>`) — always `await` them.
- Request interception (when needed) uses `proxy.ts`, not deprecated `middleware.ts`.
- Design tokens live in `src/app/globals.css` via CSS variables + `@theme inline`.

<!-- BEGIN:roberto-project-facts -->
===============================================================
platformbox-io — public marketing site
===============================================================
Next.js on Vercel, deployed from `main` (GitHub).

PROOF:  npm run check

THIS REPO OWNS ITS OWN FACTS — the stack, the component conventions, the
brand rules, the motion language, the quality gate. They live in its
`.clinerules/` today for historical reasons and are still authoritative as
FACTS about that codebase; they are not rules and must never restate one.
Read them before working there. Move them to the repo's own docs when you
next touch that area.

Its .clinerules/06-proxy.md carries the /admin proxy invariants — the
highest-risk code in that repo. Read it before touching src/proxy.ts.

COUPLING — this repo consumes capability claims from platformbox-idp via
platformbox-delivery. A capability renamed upstream is designed to break
this repo, not a bug to route around (see Rules/00, "capability renamed").

PRODUCT STAGES — three distinct, non-overlapping stages (decided
2026-09-28). None contains any part of another; each has its own name,
duration, start and end.
1. Pre-assessment — 10–20 minutes of customer time (signup, payment,
   activation, setup questions), then PlatformBox's readiness review,
   committed within 1 working day. No clock. Ends when the Start Gate is
   confirmed.
2. Assessment — its own €2,500 product, 3–5 working days, from the confirmed
   Start Gate to the delivered Fit Decision. Its counter reads
   "Day N · up to 5".
3. Launch — a separate €20k purchase, 14 working days, with its own
   readiness preconditions before its clock. It takes the Assessment's Fit
   Decision as input (€2,500 credited within 90 days).
A shared phase, clock or vocabulary between two stages is a defect. Launch's
own Readiness pre-clock check belongs to Launch and is not overlap.
Known contradictions here (verified 2026-09-28):
- The start FAQ says "a short setup … about 10 minutes" and never names the
  pre-assessment (src/lib/content.ts:375).
<!-- END:roberto-project-facts -->

<!-- BEGIN:roberto-operating-rules -->
Operating rules are loaded globally from ~/.codex/AGENTS.md (Codex) and ~/.claude/CLAUDE.md (Claude Code).
<!-- END:roberto-operating-rules -->
