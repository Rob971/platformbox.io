<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PlatformBox.io — Agent Instructions

## Product

PlatformBox.io is a premium B2B marketing site for a fixed-price **$20,000 / 14-day** Enterprise Internal Developer Platform engagement aimed at Fractional CTOs and post-Series A engineering leaders.

## Stack (locked)

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 App Router (`src/app`) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline`) |
| Motion | Framer Motion |
| Icons | Lucide React |
| Fonts | `next/font` (Geist) |

Do not introduce competing frameworks (Pages Router, CSS-in-JS, styled-components, Material UI, etc.) unless explicitly requested.

## Mandatory workflow

1. Read `.cursor/rules/agents-mandatory.mdc` and any glob-matched rules under `.cursor/rules/`.
2. Before Next.js / React Router / caching / proxy work, open the matching doc under `node_modules/next/dist/docs/` for **this installed version**.
3. Prefer Server Components by default. Add `"use client"` only at the smallest interactive leaf (motion, handlers, hooks, browser APIs).
4. Keep marketing copy exact unless the user asks to change it.
5. After substantive UI changes: `npm run lint` and `npm run build`.
6. Do not commit secrets, `.env*`, `.next/`, or `node_modules/`.

## Docs map (start here)

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
- Request interception uses `proxy.ts`, not deprecated `middleware.ts`.
- Design tokens live in `src/app/globals.css` via CSS variables + `@theme inline`.
