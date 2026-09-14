"use client";

import { FadeIn } from "@/lib/motion";
import { Search, Hammer, ShieldCheck, TrendingUp } from "lucide-react";
import { howItWorks } from "@/lib/content";

const icons = [Search, Hammer, ShieldCheck, TrendingUp];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {howItWorks.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {howItWorks.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {howItWorks.sub}
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-4">
          {howItWorks.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={step.title}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-accent" aria-hidden />
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
                      {step.label}
                    </p>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-tertiary">
                    {step.text}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {step.outcomes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-foreground-secondary">
                        <span className="mt-0.5 text-accent">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn className="mt-10 rounded-xl border border-accent/30 bg-accent/[0.04] p-6 text-center">
          <p className="text-sm leading-relaxed text-foreground-tertiary">
            {howItWorks.outro}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}