"use client";

import { FadeIn } from "@/lib/motion";
import { caseStudy } from "@/lib/content";

export function CaseStudySection() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {caseStudy.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {caseStudy.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {caseStudy.sub}
          </p>
        </FadeIn>

        <FadeIn>
          <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
            <p className="text-sm text-zinc-500">{caseStudy.placeholder}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
