// Inline proof links for a set of claimed capabilities.
//
// Rendered under every capability card on /showcase and /architecture so a
// visitor can go straight from a claim to the evidence that proves it:
// which evidence key, what artifact type, and when in the 14 days it is
// produced. Public-safe by construction — every link resolves into the
// reference implementation's docs/evidence tree, never the /admin control
// plane.

import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { IDP_REPO_URL } from "@/lib/constants";
import {
  capabilityEvidenceById,
  evidenceHref,
  evidenceKeyById,
} from "@/lib/evidence";

interface EvidenceLinksProps {
  /** `claims` array from a content object (may include "__process__"). */
  claims?: readonly string[];
  className?: string;
}

export function EvidenceLinks({ claims, className = "" }: EvidenceLinksProps) {
  if (!claims) return null;

  // Deduplicate evidence keys across the claimed capabilities, preserving order.
  const seen = new Set<string>();
  const keys: string[] = [];
  for (const id of claims) {
    if (id.startsWith("__")) continue;
    const entry = capabilityEvidenceById.get(id);
    if (!entry) continue;
    for (const key of entry.evidenceKeys) {
      if (!seen.has(key)) {
        seen.add(key);
        keys.push(key);
      }
    }
  }
  if (keys.length === 0) return null;

  return (
    <div className={`mt-3 flex flex-wrap items-center gap-1.5 ${className}`}>
      <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
        <ShieldCheck className="h-3 w-3" aria-hidden /> Proof
      </span>
      {keys.map((key) => {
        const meta = evidenceKeyById.get(key);
        const href = meta?.publicEvidence?.[0]
          ? evidenceHref(IDP_REPO_URL, meta.publicEvidence[0])
          : `${IDP_REPO_URL}/-/tree/main/docs/evidence`;
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={
              meta
                ? `${meta.title} · ${meta.artifactType} · ${meta.provenance.toLowerCase()} · working day ${meta.workingDay}`
                : key
            }
            className="group inline-flex items-center gap-1 rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-foreground-secondary transition-colors hover:border-accent/40 hover:text-accent"
          >
            {key}
            <ArrowUpRight
              className="h-2.5 w-2.5 text-muted transition-colors group-hover:text-accent"
              aria-hidden
            />
          </a>
        );
      })}
    </div>
  );
}
