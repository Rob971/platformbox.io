# PlatformBox.io

Premium landing page for **PlatformBox Launch** — a production-ready developer platform delivered in **14 working days** at a fixed price.

## Live URLs

| URL | Notes |
| --- | --- |
| **https://www.platformbox.io** | Custom domain (after DNS) |
| https://rob971.github.io/platformbox.io/ | GitHub Pages fallback |

## Booking CTA

All **Book Your Platform Assessment** buttons open the Cal.com call:

**https://cal.com/roberto-platformbox/platform-assessment**

Defined once in `src/lib/constants.ts` as `BOOKING_URL` and `BOOKING_LABEL` (nav, hero, pricing, assessment, final CTA, showcase, and architecture CTAs).

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
src/app/                   # App Router pages (all Server Components)
src/app/showcase/          # Blueprint / portfolio page
src/app/architecture/      # Technical reference architecture page
src/components/            # Header, footer, icons, booking CTA, page nav
src/components/sections/   # Homepage sections (hero, problem, pricing, FAQ, ...)
src/components/showcase/   # Showcase page subcomponents (cards, diagrams)
src/components/architecture/ # Architecture page content
src/lib/                   # Constants, motion utilities, marketing content
public/                    # Static assets (CNAME, favicon)
docs/                      # Human-readable docs (booking, domain, deploy)
.clinerules/               # Modular project instructions for agents
.github/workflows/         # CI + Pages publish
scripts/                   # Enforcement script
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
| [docs/BOOKING.md](docs/BOOKING.md) | Cal.com booking CTA |
| [docs/CUSTOM-DOMAIN.md](docs/CUSTOM-DOMAIN.md) | Connect `platformbox.io` to GitHub Pages |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Build, Pages deploy, git auth |
| [AGENTS.md](AGENTS.md) | Agent / contributor instructions |
| [.clinerules/](.clinerules/) | Modular repository instructions for agents |

## Contact

- Email: [roberto@platformbox.io](mailto:roberto@platformbox.io)
- LinkedIn: [robertocornano](https://www.linkedin.com/in/robertocornano/)
