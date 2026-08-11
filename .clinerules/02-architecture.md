# 02 — Architecture and project structure

## Project context

PlatformBox.io is a premium B2B marketing site for a fixed-price €20,000 / 14-day Enterprise Internal Developer Platform engagement for Fractional CTOs and post-Series A engineering leaders.

## Stack

- Framework: Next.js 16 App Router in src/app
- UI: React 19 + TypeScript
- Styling: Tailwind CSS v4 via @import "tailwindcss" and @theme inline
- Motion: Framer Motion
- Icons: Lucide React
- Fonts: next/font (Geist)

## App structure

- Keep routes under src/app.
- Keep shared UI in src/components or src/app/_components.
- Preserve the route-only structure in src/app; do not add a Pages Router directory.
- Use private folders such as _components and _lib for implementation details that should not become routable.

## Next.js conventions

- Use the App Router only.
- Keep page.tsx and layout.tsx as Server Components by default.
- Treat params and searchParams as async promises and await them.
- Use proxy.ts (or a root proxy.ts) for request interception instead of middleware.ts.
- Use Route Handlers for HTTP endpoints when needed and prefer Server Actions for mutations/forms when introduced.
- For unfamiliar Next.js APIs, consult the bundled docs in node_modules/next/dist/docs/ before relying on memory.

## Performance and data flow

- Fetch data in Server Components close to the data source.
- Avoid unnecessary client boundaries and keep the client graph small.
- Use loading.tsx and Suspense boundaries for streaming where appropriate.
- Prefer static generation and build-time patterns for this marketing site.
