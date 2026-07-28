# PlatformBox.io

Premium landing page for the 14-Day Enterprise Internal Developer Platform.

## Live site (GitHub Pages)

**https://rob971.github.io/platformbox.io/**

### One-time enable (required)

GitHub blocks bots from turning Pages on. Do this once as the repo owner:

1. Open [Settings → Pages](https://github.com/Rob971/platformbox.io/settings/pages)
2. Under **Build and deployment → Source**, choose either:
   - **Deploy from a branch** → Branch: `gh-pages` → folder: `/ (root)` → **Save**
   - or **GitHub Actions**, then re-run the *Deploy GitHub Pages* workflow
3. Wait ~1 minute, then open the URL above

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
