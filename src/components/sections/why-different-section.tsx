"use client";

import { Check, X, Minus } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { whyDifferent } from "@/lib/content";

export function WhyDifferentSection() {
  return (
    <section id="why-not-build" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {whyDifferent.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {whyDifferent.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {whyDifferent.sub}
          </p>
        </FadeIn>

        <FadeIn>
          <div className="overflow-x-auto">
            <div className="min-w-[760px] overflow-hidden rounded-xl border border-border">
              <div className="grid grid-cols-3 border-b border-border bg-card">
                <div className="px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground-tertiary sm:px-6 sm:py-4">
                  Build internally
                </div>
                <div className="border-l border-border px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground-tertiary sm:px-6 sm:py-4">
                  Adopt an IDP product
                </div>
                <div className="border-l border-border px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-accent sm:px-6 sm:py-4">
                  PlatformBox
                </div>
              </div>
              {whyDifferent.rows.map((row) => (
                <div
                  key={row.internal}
                  className="grid grid-cols-3 border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-2.5 px-4 py-3.5 sm:px-6 sm:py-4">
                    <X className="h-4 w-4 shrink-0 text-red-400/70" strokeWidth={2.5} />
                    <span className="text-sm text-foreground-tertiary">{row.internal}</span>
                  </div>
                  <div className="flex items-center gap-2.5 border-l border-border px-4 py-3.5 sm:px-6 sm:py-4">
                    <Minus className="h-4 w-4 shrink-0 text-muted" strokeWidth={2} />
                    <span className="text-sm text-foreground-tertiary">{row.product}</span>
                  </div>
                  <div className="flex items-center gap-2.5 border-l border-border px-4 py-3.5 sm:px-6 sm:py-4">
                    <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    <span className="text-sm font-medium text-foreground">{row.platformbox}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 rounded-lg border border-border bg-card px-4 py-3 text-center text-sm text-foreground-secondary sm:text-base">
            {whyDifferent.message}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
