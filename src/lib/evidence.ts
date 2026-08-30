// Public proof surface data model.
//
// Two vendored projections drive the "every claim links to proof" guarantee:
//
//   evidence-keys.json      — the 19 evidence keys named in the delivery
//                             standard (platformbox-launch-1.2.0.json in the
//                             delivery repo). Immutable taxonomy: key, artifact
//                             type, provenance (DERIVED vs ATTESTED), the phase
//                             and working day that produces it.
//
//   capability-evidence.json — maps each *claimable* capability id to the
//                             evidence key(s) that prove it and the concrete
//                             public files in the reference implementation.
//
// Both are validated by scripts/check-capability-claims.mjs at build time:
// a proof link resting on an unknown evidence key, or on a capability the
// projection does not authorise, fails the build.
//
// Public-safe by construction: everything here points at the public IDP repo
// (docs/evidence/*). Real customer evidence is tenant-scoped in the control
// plane and never appears in these files.

export type EvidenceProvenance = "DERIVED" | "ATTESTED";

export interface EvidenceKey {
  key: string;
  title: string;
  artifactType: string;
  provenance: EvidenceProvenance;
  phase: string;
  workingDay: number;
  description: string;
  /** Public reference-implementation files that demonstrate this evidence. */
  publicEvidence?: string[];
}

export interface CapabilityEvidence {
  capabilityId: string;
  phase: string;
  workingDay: number;
  evidenceKeys: string[];
  evidence: string[];
}

import evidenceKeysJson from "@/lib/evidence-keys.json";
import capabilityEvidenceJson from "@/lib/capability-evidence.json";
import capabilityClaimsJson from "@/lib/capability-claims.json";

export const evidenceKeys = evidenceKeysJson as EvidenceKey[];
export const capabilityEvidence = capabilityEvidenceJson as CapabilityEvidence[];

export const evidenceKeyById = new Map(evidenceKeys.map((k) => [k.key, k]));
export const capabilityEvidenceById = new Map(
  capabilityEvidence.map((c) => [c.capabilityId, c]),
);

interface CapabilityClaim {
  id: string;
  name: string;
  category: string;
  referenceStatus: string;
  deliveryStatus: string;
  packages: string[];
  websiteClaimAllowed: boolean;
}

export const capabilityClaims = capabilityClaimsJson as CapabilityClaim[];
export const capabilityNameById = new Map(capabilityClaims.map((c) => [c.id, c.name]));

/** Capability ids whose evidence includes the given evidence key. */
export function capabilitiesForEvidenceKey(key: string): string[] {
  return capabilityEvidence
    .filter((entry) => entry.evidenceKeys.includes(key))
    .map((entry) => entry.capabilityId);
}

/** Absolute public URL of an evidence file in the reference implementation. */
export function evidenceHref(repoUrl: string, path: string): string {
  return `${repoUrl}/-/blob/main/${path}`;
}

/** Human-readable phase label (e.g. "05-foundation" → "Week 2 · Day 5"). */
export function phaseLabel(phase: string, workingDay: number): string {
  const week = workingDay <= 5 ? "Week 1" : workingDay <= 10 ? "Week 2" : "Week 3";
  return `${week} · Day ${workingDay}`;
}

/** Week bucket for the three delivery weeks, from a working day (1..14). */
export function weekOf(workingDay: number): 1 | 2 | 3 {
  return workingDay <= 5 ? 1 : workingDay <= 10 ? 2 : 3;
}
