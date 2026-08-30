"use client";

import { ArrowUpRight, GitBranch, Layers, Lock, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { IDP_REPO_URL } from "@/lib/constants";
import {
  evidenceKeys,
  evidenceHref,
  capabilitiesForEvidenceKey,
  capabilityNameById,
  phaseLabel,
  weekOf,
} from "@/lib/evidence";

const weekTitles = ["Week 1 — Foundation", "Week 2 — Delivery", "Week 3 — Production & handover"] as const;

export function ProofSurfaceSection() {
  return (
    <section id="proof" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            The proof surface
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Every claim links to the evidence behind it.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            The 19 evidence keys below are the delivery standard&apos;s proof
            contract — named in the standard, produced on a fixed working day,
            and each resolved to a public file in the reference implementation.
            Click any key to read the actual artifact, not a summary of it.
          </p>
        </FadeIn>

        {/* The audit chain */}
        <FadeIn delay={0.05}>
          <div className="mb-10 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-accent">
                <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <p className="text-sm font-semibold text-foreground">Hash-linked &amp; verifiable</p>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground-tertiary">
                Every attestation is chained by hash to the one before it, in the
                control plane at <span className="font-mono text-[11px]">/admin</span>. A
                tampered record breaks the chain and is detectable, not silent.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-accent">
                <Lock className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <p className="text-sm font-semibold text-foreground">Public-safe</p>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground-tertiary">
                Real customer evidence is tenant-scoped and never exposed. The
                files below come from the reference engagement only — no
                engagement ids, no <span className="font-mono text-[11px]">proven_with</span> data.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-accent">
                <Layers className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <p className="text-sm font-semibold text-foreground">Customer Zero</p>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground-tertiary">
                PlatformBox is deliberately its own first customer. The proof you
                can read is our own reference implementation, built and verified
                in public.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Provenance legend */}
        <FadeIn delay={0.1}>
          <div className="mb-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface px-4 py-3">
              <p className="text-xs font-semibold text-foreground">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
                Derived
              </p>
              <p className="mt-1 text-xs leading-relaxed text-foreground-tertiary">
                Generated from tool output — a terraform plan, a CI log, a scan
                report. Anyone can re-run the command and see the same result.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface px-4 py-3">
              <p className="text-xs font-semibold text-foreground">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500" aria-hidden />
                Attested
              </p>
              <p className="mt-1 text-xs leading-relaxed text-foreground-tertiary">
                Recorded in the audit chain — a human-signed fact about the
                engagement, linked by hash to what came before it.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* The 19 evidence keys, grouped by week */}
        <div className="space-y-8">
          {[1, 2, 3].map((week) => {
            const weekKeys = evidenceKeys.filter((k) => weekOf(k.workingDay) === week);
            if (weekKeys.length === 0) return null;
            return (
              <FadeIn key={week} delay={week * 0.05}>
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                      {weekTitles[week - 1]}
                    </p>
                    <div className="h-px flex-1 bg-border" aria-hidden />
                  </div>
                  <div className="grid gap-2">
                    {weekKeys.map((k) => {
                      const caps = capabilitiesForEvidenceKey(k.key)
                        .map((id) => capabilityNameById.get(id))
                        .filter(Boolean);
                      return (
                        <div
                          key={k.key}
                          className="group flex flex-col gap-2 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent/30 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                        >
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <code className="font-mono text-xs font-semibold text-foreground">{k.key}</code>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                                  k.provenance === "ATTESTED"
                                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                    : "bg-accent/10 text-accent-hover"
                                }`}
                              >
                                {k.provenance.toLowerCase()}
                              </span>
                              <span className="text-[10px] uppercase tracking-wide text-muted">
                                {k.artifactType}
                              </span>
                            </div>
                            <p className="mt-1.5 text-sm font-medium text-foreground-secondary">{k.title}</p>
                            <p className="mt-1 text-xs leading-relaxed text-foreground-tertiary">{k.description}</p>
                            {caps.length > 0 && (
                              <p className="mt-1.5 text-[11px] text-muted">
                                Proves: <span className="text-foreground-tertiary">{caps.join(", ")}</span>
                              </p>
                            )}
                          </div>
                          <div className="flex shrink-0 flex-row items-center gap-2 sm:flex-col sm:items-end">
                            <span className="text-[11px] tabular-nums text-muted">{phaseLabel(k.phase, k.workingDay)}</span>
                            {k.publicEvidence?.[0] ? (
                              <a
                                href={evidenceHref(IDP_REPO_URL, k.publicEvidence[0])}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-foreground-secondary transition-colors hover:border-accent/40 hover:text-accent"
                              >
                                Read evidence
                                <ArrowUpRight className="h-3 w-3" aria-hidden />
                              </a>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-md border border-dashed border-border px-2 py-1 text-[11px] text-muted">
                                Customer-scoped
                                <Lock className="h-3 w-3" aria-hidden />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.2}>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-muted">
            <GitBranch className="h-3.5 w-3.5" aria-hidden />
            Browse the full evidence tree in the reference implementation:
            <a
              href={`${IDP_REPO_URL}/-/tree/main/docs/evidence`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:text-accent-hover"
            >
              docs/evidence <ArrowUpRight className="h-3 w-3" aria-hidden />
            </a>
            <Layers className="ml-2 h-3.5 w-3.5" aria-hidden />
            Delivery standard v1.2.0 — 19 keys across 14 working days.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
