<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PlatformBox.io — Agent Instructions

## Product

PlatformBox.io is a premium B2B marketing site for a fixed-price **€20,000 / 14-day** Enterprise Internal Developer Platform engagement aimed at Fractional CTOs and post-Series A engineering leaders.

**Logo (immutable):** two vertical bars — left **white**, right **blue gradient** (`#3b82f6` → `#60a5fa`). Never change, recolor, or unify. See `.clinerules/03-design.md`.

**Booking CTA (all Architecture Audit buttons):**  
https://cal.eu/roberto-platformbox/architecture-audit  

Canonical constant: `BOOKING_URL` in `src/lib/constants.ts`. See `docs/BOOKING.md`.

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
