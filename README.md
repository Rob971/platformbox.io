# PlatformBox.io

Premium landing page for the 14-Day Enterprise Internal Developer Platform.

## Live URLs

| URL | Notes |
| --- | --- |
| **https://www.platformbox.io** | Custom domain (after DNS — see below) |
| https://rob971.github.io/platformbox.io/ | GitHub Pages fallback |

### Enable Pages (one-time)

1. Open [Settings → Pages](https://github.com/Rob971/platformbox.io/settings/pages)
2. **Source:** Deploy from a branch → `gh-pages` → `/ (root)` → **Save**
3. **Custom domain:** `www.platformbox.io` → **Save** → later enable **Enforce HTTPS**

### Connect your domain

Full guide: **[docs/CUSTOM-DOMAIN.md](docs/CUSTOM-DOMAIN.md)**

Quick DNS (replace Framer records):

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `www` | `rob971.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

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

## Quality gate

```bash
npm run check   # lint + enforce agent rules + build
```

Agent instructions: `AGENTS.md` and `.cursor/rules/`.
