# Connect platformbox.io to GitHub Pages

Your site is published from this repo. Point DNS away from Framer (current host) to GitHub Pages, then attach the domain in repo settings.

**Primary URL after setup:** https://www.platformbox.io  
**Fallback URL:** https://rob971.github.io/platformbox.io/

---

## 1. Enable GitHub Pages (if not done)

1. Open [Settings → Pages](https://github.com/Rob971/platformbox.io/settings/pages)
2. **Source:** Deploy from a branch → `gh-pages` → `/ (root)` → Save  
   (or **GitHub Actions** if you prefer that workflow)

---

## 2. Add the custom domain in GitHub

1. Same page: [Settings → Pages](https://github.com/Rob971/platformbox.io/settings/pages)
2. **Custom domain:** enter `www.platformbox.io`
3. **Save**
4. Wait for DNS check (can take a few minutes after step 3)
5. When available, enable **Enforce HTTPS**

GitHub will keep a `CNAME` file on the Pages branch. This repo also ships `public/CNAME` so deploys preserve `www.platformbox.io`.

---

## 3. Update DNS at your registrar

Log into wherever `platformbox.io` DNS is managed (Namecheap, Cloudflare, Google Domains, Route 53, GoDaddy, etc.).

### Remove Framer records first

Delete any Framer-related `A` / `CNAME` / `ALIAS` records for `@` and `www` so they don’t conflict.

### Recommended setup (www + apex)

| Type | Name / Host | Value | TTL |
| --- | --- | --- | --- |
| **CNAME** | `www` | `rob971.github.io` | Auto / 300 |
| **A** | `@` | `185.199.108.153` | Auto / 300 |
| **A** | `@` | `185.199.109.153` | Auto / 300 |
| **A** | `@` | `185.199.110.153` | Auto / 300 |
| **A** | `@` | `185.199.111.153` | Auto / 300 |
| **AAAA** | `@` | `2606:50c0:8000::153` | Auto / 300 |
| **AAAA** | `@` | `2606:50c0:8001::153` | Auto / 300 |
| **AAAA** | `@` | `2606:50c0:8002::153` | Auto / 300 |
| **AAAA** | `@` | `2606:50c0:8003::153` | Auto / 300 |

Notes:

- Some UIs want the CNAME value as `rob971.github.io.` (trailing dot).
- On Cloudflare: set the `www` CNAME to **DNS only** (grey cloud) until HTTPS works, or follow Cloudflare’s GitHub Pages guide; orange-cloud proxy can break GitHub’s cert issuance.
- If your DNS supports **ALIAS/ANAME** for `@` → `rob971.github.io`, you can use that instead of the four A/AAAA records.

With both apex and `www` configured, GitHub redirects `platformbox.io` ↔ `www.platformbox.io` automatically (direction depends on which you set as the canonical custom domain). Using **`www.platformbox.io`** as the custom domain is the recommended canonical.

---

## 4. Verify

```bash
# www should CNAME to GitHub
dig +short CNAME www.platformbox.io
# expect: rob971.github.io.

# apex should hit GitHub A records
dig +short A platformbox.io
# expect one or more of: 185.199.108.153 … 185.199.111.153
```

Then open:

- https://www.platformbox.io
- https://platformbox.io (should redirect)

Propagation is often minutes; worst case up to 24–48 hours.

---

## 5. Checklist

- [ ] Pages enabled (`gh-pages` or GitHub Actions)
- [ ] Custom domain set to `www.platformbox.io` in Pages settings
- [ ] Framer DNS records removed
- [ ] `www` CNAME → `rob971.github.io`
- [ ] Apex A (+ optional AAAA) → GitHub IPs
- [ ] DNS check green in Pages settings
- [ ] **Enforce HTTPS** turned on
- [ ] Site loads on https://www.platformbox.io

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| DNS check fails | Wait; confirm records with `dig`; remove old Framer CNAMEs |
| Enforce HTTPS greyed out | Wait for DNS + cert; remove/re-add custom domain to retry |
| Site shows old Framer page | DNS still pointing at Framer; flush/check with `dig` |
| Assets 404 on custom domain | Ensure latest deploy has **no** `basePath` (current `main` is correct) |
| `CNAME` missing after deploy | `public/CNAME` + peaceiris `cname:` keep it; redeploy from `main` |

Official docs: [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
