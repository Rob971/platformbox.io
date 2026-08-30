# Public proof surface

Every capability claim on the marketing site links to the evidence that
proves it. This document explains the data model, the generation contract, and
the fail-closed guards.

## The two halves of the claim guard

The site has always had one half: `scripts/check-capability-claims.mjs` fails
the build when a claim rests on a capability the IDP does not support. That
half validates the claim against a projection.

The missing half was proof: a visitor could read a claim but could never see
the artifact behind it. The proof surface closes that gap.

## Files

| File | Role |
| --- | --- |
| `src/lib/evidence-keys.json` | The 19 evidence keys named in the delivery standard (v1.2.0): key, artifact type, provenance (DERIVED/ATTESTED), phase, working day, description, and the public reference file(s) that demonstrate it. |
| `src/lib/capability-evidence.json` | Maps each *claimed* capability id to the evidence key(s) that prove it and the concrete public files. |
| `src/lib/evidence.ts` | Typed accessors over the two JSON projections. |
| `src/components/proof/evidence-links.tsx` | Inline proof chips rendered under every capability card on `/showcase` and `/architecture`. |
| `src/components/sections/proof-surface-section.tsx` | The full 19-key ledger, grouped by delivery week, with provenance and the audit-chain explanation. |
| `scripts/check-capability-claims.mjs` | The extended guard — validates claims **and** proof links, fail-closed. |
| `scripts/generate-capability-claims.mjs` | Regenerates `capability-claims.json` from the published IDP artifacts instead of hand-copying. |

## Generation contract (why the projection is no longer hand-copied)

`src/lib/capability-claims.json` is a projection of the IDP's
`platformbox-capabilities.json`. Hand-vendoring it is the same P1 fragility the
delivery repo already names: it drifts silently because nothing re-checks it.

`scripts/generate-capability-claims.mjs` removes the hand-copy:

1. Reads the **IDP capability-registry** (`platformbox.capability-registry/v1`)
   for `id` / `name` / `status` / `website_claim_allowed`.
2. Reads the **delivery capability catalogue** (`platformbox.capability-catalogue/v2`)
   for `category` / `deliveryStatus` / `packages`.
3. Joins on the stable `id` (`pbx.<category>.<name>`). A capability missing
   from either side is a **failure**, not a warning — the projection must never
   be silently partial.
4. Writes exactly `id/name/category/referenceStatus/deliveryStatus/packages/
   websiteClaimAllowed`.

`delivery.proven_with` is **never projected**. It holds engagement ids and is
customer information; it must not appear in a public site, even transitively.

Run it from CI or locally:

```bash
node scripts/generate-capability-claims.mjs \
  --registry https://gitlab.com/platform-box-group/platformbox-idp/-/raw/main/capability-registry.json \
  --catalogue /path/to/platformbox-delivery/config/capabilities/platformbox-capabilities.json
```

Missing input fails closed (exit 1) — mirroring the delivery repo's
`check-reference-drift.ts` contract that "a guard that skips when unconfigured
is a comment, not a guard".

## Public-safe by construction

- Everything public points at the reference implementation's `docs/` tree.
  Real customer evidence is tenant-scoped in the control plane (`/admin`) and
  never appears in these files.
- `scripts/check-capability-claims.mjs` rejects any proof path outside `docs/`
  or any path that looks customer-scoped (`proven_with` / `engagement`).
- PlatformBox is deliberately its own Customer Zero: the inspectable evidence
  is the reference engagement, so the proof is real without exposing a customer.
