"use client";

import { FadeIn } from "@/lib/motion";
import { RoiCalculator } from "@/components/roi-calculator";
import { roi } from "@/lib/content";

export function RoiSection() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {roi.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {roi.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">{roi.sub}</p>
        </FadeIn>

        <FadeIn>
          <RoiCalculator />
        </FadeIn>
      </div>
    </section>
  );
}
