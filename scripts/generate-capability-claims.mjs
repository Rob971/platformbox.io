#!/usr/bin/env node
/**
 * Generate `src/lib/capability-claims.json` from the published IDP artifact
 * instead of hand-copying it.
 *
 * WHY: the projection is the one hand-vendored coupling that drifts silently.
 * The delivery repo already names this fragility as its P1 (see
 * check-reference-drift.ts there). This script removes the drift by deriving
 * the projection from the machine-published source and FAILING when that
 * source is unavailable — never skipping.
 *
 * INPUTS (both machine-published):
 *   1. The IDP capability-registry (`platformbox.capability-registry/v1`) —
 *      authoritative for id/name/status/website_claim_allowed and the
 *      evidence file paths. Published at
 *      https://gitlab.com/platform-box-group/platformbox-idp/-/raw/main/capability-registry.json
 *   2. The delivery capability catalogue (`platformbox.capability-catalogue/v2`)
 *      — authoritative for category, deliveryStatus and packages.
 *      `config/capabilities/platformbox-capabilities.json` in
 *      platformbox-delivery.
 *
 * The two are joined on the stable `id` (`pbx.<category>.<name>`). A
 * capability present in one and absent from the other is a FAILURE — the
 * projection must not be silently partial.
 *
 * OUTPUT: `src/lib/capability-claims.json` with EXACTLY
 * id/name/category/referenceStatus/deliveryStatus/packages/websiteClaimAllowed.
 * `delivery.proven_with` is never projected: it holds engagement ids and is
 * customer information.
 *
 * FAIL-CLOSED: no `--registry` / `PBX_REGISTRY` or no `--catalogue` /
 * `PBX_CATALOGUE` is a non-zero exit, matching the delivery repo's contract
 * that a guard which skips when unconfigured is a comment, not a guard.
 *
 * Usage:
 *   node scripts/generate-capability-claims.mjs \
 *     --registry <path|url> --catalogue <path|url>
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function argValue(name) {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === name && args[i + 1]) return args[i + 1];
  }
  return null;
}

async function readInput(spec, envVar, label) {
  const value = spec ?? process.env[envVar] ?? null;
  if (!value) {
    console.error(`generate-capability-claims: no ${label} supplied (--${label.toLowerCase()} or ${envVar}) — FAILING.`);
    process.exit(1);
  }
  if (value.startsWith("http://") || value.startsWith("https://")) {
    const resp = await fetch(value);
    if (!resp.ok) {
      console.error(`generate-capability-claims: failed to fetch ${label} from ${value}: HTTP ${resp.status}`);
      process.exit(1);
    }
    return await resp.text();
  }
  return fs.readFileSync(path.resolve(root, value), "utf8");
}

async function main() {
  const registryRaw = await readInput(argValue("--registry"), "PBX_REGISTRY", "registry");
  const catalogueRaw = await readInput(argValue("--catalogue"), "PBX_CATALOGUE", "catalogue");

  const registry = JSON.parse(registryRaw);
  const catalogue = JSON.parse(catalogueRaw);

  const regCaps = Array.isArray(registry.capabilities) ? registry.capabilities : [];
  const catCaps = Array.isArray(catalogue.capabilities) ? catalogue.capabilities : [];

  const catById = new Map(catCaps.map((c) => [c.id, c]));
  const regById = new Map(regCaps.map((c) => [c.id, c]));

  const allIds = new Set([...catById.keys(), ...regById.keys()]);
  if (allIds.size === 0) {
    console.error("generate-capability-claims: both inputs contained no capabilities — refusing to write an empty projection.");
    process.exit(1);
  }

  const projection = [];
  let failures = 0;
  for (const id of [...allIds].sort()) {
    const reg = regById.get(id);
    const cat = catById.get(id);
    if (!reg) {
      console.error(`generate-capability-claims: "${id}" in catalogue but missing from registry — FAILING (partial projection is not allowed).`);
      failures++;
      continue;
    }
    if (!cat) {
      console.error(`generate-capability-claims: "${id}" in registry but missing from catalogue — FAILING (partial projection is not allowed).`);
      failures++;
      continue;
    }
    projection.push({
      id,
      name: cat.name ?? reg.label ?? reg.capability ?? id,
      category: cat.category ?? "uncategorised",
      referenceStatus: reg.status,
      deliveryStatus: cat.delivery?.status,
      packages: Array.isArray(cat.commercial?.packages) ? cat.commercial.packages : [],
      websiteClaimAllowed: cat.commercial?.website_claim_allowed ?? reg.website_claim_allowed ?? false,
    });
  }

  if (failures > 0) process.exit(1);

  const outPath = path.join(root, "src/lib/capability-claims.json");
  fs.writeFileSync(outPath, JSON.stringify(projection, null, 2) + "\n");
  console.log(
    `generate-capability-claims: wrote ${projection.length} capabilities to src/lib/capability-claims.json ` +
      `(proven_with never projected).`,
  );
}

main().catch((err) => {
  console.error("generate-capability-claims: failed:", err?.message ?? err);
  process.exit(1);
});
