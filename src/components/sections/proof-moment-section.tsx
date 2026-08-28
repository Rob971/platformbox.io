"use client";

import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { proofMoment } from "@/lib/content";

export function ProofMomentSection() {
  return (
    <section id="proof-moment" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {proofMoment.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {proofMoment.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {proofMoment.sub}
          </p>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-3">
          {proofMoment.steps.map((step, i) => (
            <FadeIn key={step.label} delay={i * 0.05}>
              <div className="h-full rounded-xl border border-border bg-card p-6">
                <p className="font-mono text-xs text-foreground-tertiary">
                  0{i + 1}
                </p>
                <p className="mt-3 text-sm font-semibold text-foreground">
                  {step.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground-tertiary">
                  {step.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-8 rounded-xl border border-border bg-background p-6">
            <p className="text-sm leading-relaxed text-foreground-tertiary">
              <span className="font-semibold text-foreground">
                What we do not claim.{" "}
              </span>
              {proofMoment.caveat}
            </p>
            <a
              href={proofMoment.linkHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {proofMoment.linkLabel}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
