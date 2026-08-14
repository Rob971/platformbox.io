"use client";

import { CheckCircle } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { scopeAssumptions } from "@/lib/content";

export function ScopeAssumptionsSection() {
  return (
    <section id="scope" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {scopeAssumptions.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {scopeAssumptions.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {scopeAssumptions.sub}
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <FadeIn>
            <ul className="space-y-3">
              {scopeAssumptions.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex h-full items-center rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                {scopeAssumptions.note}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
