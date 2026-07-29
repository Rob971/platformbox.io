# 01 — Coding standards

## General expectations

- Use TypeScript for app code.
- Prefer small, focused diffs and avoid unrelated refactors.
- Keep marketing copy exact unless the user explicitly requests new wording.
- Do not invent product copy when approved copy already exists.

## React and TypeScript

- Prefer functional components and named exports for reusable UI.
- Default export is acceptable for route entry points such as page.tsx and layout.tsx.
- Colocate types next to components and export props types when reused.
- Avoid any; use unknown plus narrowing when necessary.
- Prefer modern React 19 patterns when they fit, including progressive enhancement and Server/Client boundaries.

## Component boundaries

- Keep src/app/page.tsx and src/app/layout.tsx as Server Components.
- Add "use client" only in leaf components under src/components for motion, handlers, hooks, or browser APIs.
- Keep client boundaries thin; everything imported into a client file becomes part of the client graph.
- Pass serializable props from Server to Client components.

## Styling and UI conventions

- Use the @/ alias for imports.
- Use next/link for internal navigation and next/image for optimized images.
- Use next/font for fonts and expose CSS variables for Tailwind.
- Prefer semantic landmarks such as header, main, section, and footer.
- Ensure buttons and links have clear names and preserve visible focus styling.

## Tooling and dependencies

- Prefer the existing stack rather than introducing new dependencies.
- Avoid styled-components, Emotion, MUI, and Pages Router patterns unless explicitly requested.
- Use named icon imports from lucide-react rather than importing large icon bundles.
