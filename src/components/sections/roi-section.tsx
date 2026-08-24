"use client";

import { FadeIn } from "@/lib/motion";
import { RoiCalculator } from "@/components/roi-calculator";
import { roi } from "@/lib/content";

export function RoiSection() {
  return (
    <section id="roi" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {roi.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {roi.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">{roi.sub}</p>
        </FadeIn>

        <FadeIn>
          <RoiCalculator />
        </FadeIn>
      </div>
    </section>
  );
}
