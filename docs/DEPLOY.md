# Deploy & git

## Hosting

The site runs on **Vercel** (real Next.js server, not a static export) —
confirmed 2026-08-18 via live DNS (`www.platformbox.io` CNAMEs to
`cname.vercel-dns.com`) and this repo's `.vercel/project.json` link file.
Vercel auto-deploys on every push to `main` via its own GitHub integration;
no GitHub Actions workflow is involved in deployment.

| Item | Value |
| --- | --- |
| Canonical domain | `https://www.platformbox.io` |
| Host | Vercel (auto-deploy from `main`) |

`next.config.ts`'s `headers()` block (CSP, HSTS, etc.) only works because
the site runs on Vercel's server runtime — do not add `output: "export"`,
it would silently disable every security header in production.

## Local commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # lint + enforce + build
npm run build        # standard Next.js server build (.next/) - not a static export
```

Preview the production build locally:

```bash
npm run start
```

## Push to GitHub (auth)

GitHub does **not** accept account passwords for `git push` over HTTPS.

### Preferred (this environment)

```bash
git remote set-url origin https://github.com/Rob971/platformbox.io.git
gh auth setup-git
git push origin main
```

`gh auth setup-git` wires the Git credential helper to your `gh` login so pushes use a valid token.

### Personal machine

Option A — GitHub CLI:

```bash
gh auth login
gh auth setup-git
git push origin main
```

Option B — SSH:

```bash
git remote set-url origin git@github.com:Rob971/platformbox.io.git
git push origin main
```

Option C — HTTPS + Personal Access Token (PAT): use the PAT as the password when prompted (classic PAT needs `repo` scope).

### Common error

```text
remote: Invalid username or token. Password authentication is not supported for Git operations.
fatal: Authentication failed for 'https://github.com/Rob971/platformbox.io/'
```

Cause: expired/embedded token on the remote, or password auth. Fix with `gh auth setup-git` (or SSH/PAT) as above. Do not put long-lived tokens in the remote URL in committed config.

## Release checklist

1. `npm run check`
2. Commit on a feature branch (or directly on `main` if intentional)
3. `git push` (with working auth)
4. Confirm `ci.yml` is green, and check the Vercel deployment (dashboard
   or the PR/commit status check) succeeds
5. Spot-check https://www.platformbox.io
6. Confirm booking CTAs still open https://cal.com/roberto-platformbox/platform-assessment
