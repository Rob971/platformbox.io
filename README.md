# PlatformBox.io

Premium landing page for the **14-Day Enterprise Internal Developer Platform** — a fixed-price **€20,000 EUR** engineering engagement for Fractional CTOs and post-Series A teams.

## Live URLs

| URL | Notes |
| --- | --- |
| **https://www.platformbox.io** | Custom domain (after DNS) |
| https://rob971.github.io/platformbox.io/ | GitHub Pages fallback |

## Booking CTA

All **Book an Architecture Audit** buttons open the Planfy widget:

**https://www.planfy.com/booking-widget/platformbox-io**

Defined once in `src/components/landing-page.tsx` as `BOOKING_URL` (nav, hero, and pricing card).

See **[docs/BOOKING.md](docs/BOOKING.md)**.

## Custom domain

Full DNS guide: **[docs/CUSTOM-DOMAIN.md](docs/CUSTOM-DOMAIN.md)**

### Enable Pages (one-time)

1. Open [Settings → Pages](https://github.com/Rob971/platformbox.io/settings/pages)
2. **Source:** Deploy from a branch → `gh-pages` → `/ (root)` → **Save**
3. **Custom domain:** `www.platformbox.io` → **Save** → later enable **Enforce HTTPS**

### Quick DNS (replace Framer records)

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `www` | `rob971.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

## Stack

- Next.js 16 (App Router) — static export for GitHub Pages
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Project layout

```text
src/app/                 # App Router (Server Components: page, layout)
src/components/          # Client islands (landing page + motion)
public/CNAME             # www.platformbox.io for GitHub Pages
docs/                    # Human docs (booking, domain, deploy)
.clinerules/             # Modular project instructions for agents
.github/workflows/       # CI + Pages publish
scripts/enforce-agent-rules.mjs
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy & git push

Pushes to `main` rebuild and publish GitHub Pages automatically.

```bash
npm run check
git push origin main
```

If you see `Invalid username or token` / password auth failed:

```bash
git remote set-url origin https://github.com/Rob971/platformbox.io.git
gh auth setup-git
git push origin main
```

Full guide: **[docs/DEPLOY.md](docs/DEPLOY.md)**.

## Quality gate

```bash
npm run check   # lint + enforce agent rules + build
```

## Docs

| Doc | Purpose |
| --- | --- |
| [docs/README.md](docs/README.md) | Docs index |
| [docs/BOOKING.md](docs/BOOKING.md) | Planfy booking CTA |
| [docs/CUSTOM-DOMAIN.md](docs/CUSTOM-DOMAIN.md) | Connect `platformbox.io` to GitHub Pages |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Build, Pages deploy, git auth |
| [AGENTS.md](AGENTS.md) | Agent / contributor instructions |
| [.clinerules/](.clinerules/) | Modular repository instructions for agents |

## Contact

- Email: [roberto@platformbox.io](mailto:roberto@platformbox.io)
- LinkedIn: [robertocornano](https://www.linkedin.com/in/robertocornano/)
