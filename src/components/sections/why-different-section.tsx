"use client";

import { Check, X } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { whyDifferent } from "@/lib/content";

export function WhyDifferentSection() {
  return (
    <section id="why-not-build" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {whyDifferent.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {whyDifferent.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {whyDifferent.sub}
          </p>
        </FadeIn>

        <FadeIn>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <div className="grid grid-cols-2 border-b border-white/10 bg-white/[0.03]">
              <div className="px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-zinc-400 sm:px-6 sm:py-4">
                Build internally
              </div>
              <div className="border-l border-white/10 px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-accent sm:px-6 sm:py-4">
                PlatformBox
              </div>
            </div>
            {whyDifferent.rows.map((row) => (
              <div
                key={row.internal}
                className="grid grid-cols-2 border-b border-white/10 last:border-b-0"
              >
                <div className="flex items-center gap-2.5 px-4 py-3.5 sm:px-6 sm:py-4">
                  <X className="h-4 w-4 shrink-0 text-red-400/70" strokeWidth={2.5} />
                  <span className="text-sm text-zinc-400">{row.internal}</span>
                </div>
                <div className="flex items-center gap-2.5 border-l border-white/10 px-4 py-3.5 sm:px-6 sm:py-4">
                  <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                  <span className="text-sm font-medium text-white">{row.platformbox}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm text-zinc-300 sm:text-base">
            {whyDifferent.message}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
