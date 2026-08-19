# PlatformBox.io

Premium landing page for **PlatformBox Launch** — a production-ready developer platform delivered in **14 working days** at a fixed price.

## Live URL

**https://www.platformbox.io**

## Booking CTA

All **Book Your Platform Assessment** buttons open the Cal.com call:

**https://cal.com/roberto-platformbox/platform-assessment**

Defined once in `src/lib/constants.ts` as `BOOKING_URL` and `BOOKING_LABEL` (nav, hero, pricing, assessment, final CTA, showcase, and architecture CTAs).

See **[docs/BOOKING.md](docs/BOOKING.md)**.

## Stack

- Next.js 16 (App Router) — deployed on Vercel
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
public/                    # Static assets (favicon, brand logo, og-image)
docs/                      # Human-readable docs (booking, domain, deploy)
.clinerules/               # Modular project instructions for agents
.github/workflows/         # CI
scripts/                   # Enforcement script
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy & git push

Pushes to `main` trigger a Vercel deployment automatically.

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
| [docs/DEPLOY.md](docs/DEPLOY.md) | Build, Vercel deploy, git auth |
| [AGENTS.md](AGENTS.md) | Agent / contributor instructions |
| [.clinerules/](.clinerules/) | Modular repository instructions for agents |

## Contact

- Email: [roberto@platformbox.io](mailto:roberto@platformbox.io)
- LinkedIn: [robertocornano](https://www.linkedin.com/in/robertocornano/)
