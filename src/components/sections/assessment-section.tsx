"use client";

import { Check, ClipboardList, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { BookingCta } from "@/components/booking-cta";
import { assessmentSection } from "@/lib/content";

export function AssessmentSection() {
  return (
    <section id="assessment" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {assessmentSection.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {assessmentSection.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {assessmentSection.sub}
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <div className="flex h-full flex-col rounded-xl border border-accent/30 bg-accent/[0.04] p-6 sm:p-8">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-accent">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="text-base font-medium text-white">
                A fixed-price promise only after we&apos;ve seen your environment.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                The Assessment is a risk-control step, not a sales ritual. It tells you — before you
                commit — whether the 14-day model fits your environment, and what a realistic scope
                looks like.
              </p>
              <p className="mt-6 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent-hover">
                {assessmentSection.credit}
              </p>
              <div className="mt-8 border-t border-white/10 pt-6">
                <BookingCta className="w-full sm:w-auto" />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="mb-5 flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-accent" aria-hidden />
                <p className="text-sm font-semibold text-white">The assessment output</p>
              </div>
              <ul className="space-y-3">
                {assessmentSection.outputs.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-zinc-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
