# PlatformBox.io

Premium landing page for the 14-Day Enterprise Internal Developer Platform.

## Live site (GitHub Pages)

**https://rob971.github.io/platformbox.io/**

## Stack

- Next.js (App Router) — static export
- React
- Tailwind CSS
- Framer Motion
- Lucide React

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality gate (enforced in CI)

```bash
npm run check   # lint + enforce agent rules + build
```

## Deploy

Pushes to `main` deploy automatically via `.github/workflows/deploy-pages.yml`.

Local static build (same as Pages):

```bash
npm run build:pages
npx serve out
```

Agent instructions: `AGENTS.md` and `.cursor/rules/`.
