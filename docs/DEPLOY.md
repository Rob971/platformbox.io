# Deploy & git

## Hosting

The site is a **Next.js static export** published to **GitHub Pages**.

| Item | Value |
| --- | --- |
| Canonical domain | `https://www.platformbox.io` |
| Pages fallback | `https://rob971.github.io/platformbox.io/` |
| Publish branch | `gh-pages` (classic Pages source) |
| Custom domain file | `public/CNAME` → `www.platformbox.io` |

Workflows on every push to `main`:

| Workflow | Role |
| --- | --- |
| `.github/workflows/ci.yml` | `enforce` + `lint` + `build` |
| `.github/workflows/publish-gh-pages.yml` | Builds `out/` and force-publishes `gh-pages` |
| `.github/workflows/deploy-pages.yml` | Actions-based Pages deploy (needs Pages → GitHub Actions enabled) |

Domain DNS steps: [CUSTOM-DOMAIN.md](./CUSTOM-DOMAIN.md).

## Local commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # lint + enforce + build
npm run build        # writes static site to out/
```

Preview the static build:

```bash
npx serve out
```

## Push to GitHub (auth)

GitHub does **not** accept account passwords for `git push` over HTTPS.

### Preferred (this environment / Cursor Cloud)

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
2. Commit on a `cursor/...-b73d` branch (or directly on `main` if intentional)
3. `git push` (with working auth)
4. Confirm Actions: CI green + `Publish gh-pages branch` success
5. Spot-check https://www.platformbox.io (or the github.io fallback)
6. Confirm booking CTAs still open https://www.planfy.com/booking-widget/platformbox-io
