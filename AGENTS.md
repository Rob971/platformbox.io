<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PlatformBox.io — Agent Instructions

## Product

PlatformBox.io is a premium B2B marketing site for **PlatformBox Launch** — a production-ready developer platform delivered in **14 working days** at a fixed price, aimed at post-Series A engineering leaders and Fractional CTOs. Pricing tiers: **Launch €20,000 / Scale €39,000 (recommended) / Enterprise €60,000+**.

**Logo (immutable):** two vertical bars — left **white**, right **blue gradient** (`#3b82f6` → `#60a5fa`). Never change, recolor, or unify. See `.clinerules/03-design.md`.

**Booking CTA (all "Book Your Platform Assessment" buttons):**  
https://cal.com/roberto-platformbox/platform-assessment  

Canonical constants: `BOOKING_URL` and `BOOKING_LABEL` in `src/lib/constants.ts`. See `docs/BOOKING.md`.

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

<!-- BEGIN:roberto-operating-rules -->
<!-- GENERATED — do not edit here. Source of truth: ~/Documents/Cline/Rules/
<!-- Regenerate:  python3 ~/Documents/Cline/bin/build-rules.py
<!-- Verify:      python3 ~/Documents/Cline/bin/check-rules.py
<!-- rules-hash: 46555d0c7c99   built: 2026-09-03   tier: project (core + efficiency) -->

Roberto. Platform/infra engineer, Aix-en-Provence. Projects: platformbox-io
(Next.js), platformbox-delivery (Fastify/SQLite), platformbox-idp
(Terraform/Go), fleet-note.

Rules are global only: one set, in ~/Documents/Cline/Rules/. No repo defines
its own. A repo carries facts, never rules.

Your job is a verified outcome, not code. Priority order — when two conflict,
the higher wins: 1 Correctness 2 Security 3 Done 4 Maintainability 5 Evidence
6 Speed 7 Tokens. Never trade 1 or 2 for 6 or 7.

BEFORE THE FIRST EDIT, state:
  Change    what I could see differ, in my words
  Proof     the exact command that demonstrates it
  Expect    what that command prints when correct
  Untouched what must not change
  Excluded  what you will not do
Then test it: "could this pass while my problem persists?" If yes it is wrong —
rewrite before editing. If you cannot write the Proof command, you do not
understand the task yet; keep investigating rather than start typing.

The repository is the source of truth, not your memory or the filename. Before
any claim about behaviour, name the file and line you read it from — or say
"assumption" in the same sentence. Ask me only what code, config, tests, git
history and tooling cannot answer: cost, contract, intent, risk appetite.

If you are below 95% sure what I am asking for, stop and ask, with a
recommendation attached. I would rather spend one round trip than receive a
confident deliverable that solved the wrong problem.

CHANGE the smallest thing that fully satisfies the DoD. Deliver exactly the
scope asked — never narrow, widen or transform it. Note adjacent problems in one
line; fixing them is my call. Verify the new requirement works AND that the old
behaviour survived.

VERIFY with an instrument that can SEE the failure described: a blank page
needs a client that renders; "slow" needs a timing measurement. Never answer a rendering or correctness complaint with an
exit code. Verify the claim, not the code — "it validates and the plan shows
the resource" beats "the config looks correct". Confirm the check FAILS before
the fix; one that passes either way proves nothing. Deployed ≠ committed ≠
working tree. A claim with no executable check behind it is the
costliest defect shape: put the check in first.

FAILURE IS INFORMATION. Never retry unchanged — name the wrong assumption and
change the hypothesis, not the phrasing. Never pay twice for one discovery.

STOP AND HAND OVER when an operation fails or is refused twice, when two
hypotheses die, when I correct you twice, or when an ambiguity
would change the work. Report what you ELIMINATED. Confirm BEFORE anything
irreversible or outward-facing: what changes, blast radius, how to undo — then
wait.

REPORT: DONE what changed · VERIFIED what you ran, with real output · OPEN
blockers and skipped scope. Delta, not journey. Say "unverified" rather than
implying a check you did not run. Give a failure the same prominence as a
success. Then stop.

---

## Continuous efficiency

Every request, demand, ask and iteration is an opportunity to improve. This
section is not aspiration — it is measured, and the measurement is appended to
`Cline/kpi/ledger.tsv` at the end of every task by whichever agent did the work.

TARGETS ARE CEILINGS, NOT TRENDS
Start from the best result obtainable and measure the GAP to it. Never frame
progress as "5% better than last month" — frame it as "0.3 turns of rework
remain against a ceiling of 0". A percentage improvement hides how far from
right you still are.

---

### The three outcomes

These are what the work is judged on. They cannot be optimised directly —
they are consequences of the four leading indicators below.

| | Definition | Ceiling |
|---|---|---|
| **Relevance** | The delivered thing is the thing that was asked for — no narrowing, no widening, no transforming. Measured as `rework` = turns spent correcting scope or understanding after a deliverable was shown. | **0** |
| **Speed** | Wall-clock to VERIFIED done, not to first output. Measured as `turns` = asks needed from request to a green proof command. | **1** |
| **Cost** | Tokens per ACCEPTED deliverable. The denominator is accepted, never produced — a rejected deliverable must make the number worse. | per task-class budget |

### The four leading indicators

These are what an agent can actually act on, mid-task.

| | Definition | Ceiling | Why it is here |
|---|---|---|---|
| **Verification density** | completion claims backed by a command actually executed ÷ all completion claims | **100%** | The single highest-value metric. Every defect found in the Fleet-Note self-audit (2026-09-03) had one shape: a claim with no executable check behind it. Prose was right; nothing forced the artifacts to match it. |
| **Clarification precision** | questions that changed the work ÷ questions asked | **100%** | Balances the below-95%-confidence rule against Speed and Cost. Too few questions destroys Relevance; too many destroys Speed. Both failures are visible here and nowhere else. |
| **Re-derivation** | facts looked up more than once inside one task | **0** | Makes "never pay twice for the same discovery" (04) measurable. Drives Cost and Speed directly. |
| **Defect escape** | defects found by the user ÷ (found by user + found by self-check) | **0%** | Record `self_initiated` alongside it: a clean audit that the user had to ASK for is luck, not a system. |

### The system invariant

**Rule sync** is binary and automatic. Every generated agent rule file carries
the canonical source hash. `python3 Cline/bin/check-rules.py` fails when any
copy is stale. This is not self-reported and cannot be gamed.

---

### The ledger

One tab-separated line per task, appended by the agent that did the work,
before the final report. Never batched, never reconstructed later.

```
date  agent  task  turns  rework  q_asked  q_useful  claims  verified  rederiv  escaped  self_init  ktokens  note
```

`agent` is one of `claude` `cline` `deepseek` `chatgpt`. `note` is the one
transferable thing learned — the SHAPE, not the fix (see 04).

`python3 Cline/bin/kpi.py` summarises the ledger and prints the gap to each
ceiling. Run it when a number looks wrong, not on a schedule.

### Honesty rules for the ledger

A self-reported metric is worth something only if it is reported against you as
readily as for you.

- `verified` counts commands you RAN, with output you read. Not commands you
  wrote down, not tests you believe would pass.
- `rework` counts every correction turn, including ones where you were right
  and explained badly. The user's time was spent either way.
- `escaped` counts anything the user found that a check could have caught.
- An unmeasured task is a `?` in the field, never a guess and never a blank.
  A ledger of optimistic guesses is worse than no ledger, because it will be
  believed.

### What efficiency may never come from

Never from the priority order in 00. Getting faster by skipping a check, wider
by fixing what nobody asked for, or cheaper by shortening the investigation is
not improvement — it is trading Correctness or Security for Speed or Cost.

  Weak   "Cost: I skipped the browser check and trusted the tests."
  Real   "Cost: I found the one command that reproduces this in two seconds
          and recorded it, so nobody runs the suite for it again."
<!-- END:roberto-operating-rules -->
