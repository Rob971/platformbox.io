"use client";

import { CheckCircle, AlertTriangle } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { fit } from "@/lib/content";

export function FitSection() {
  return (
    <section id="fit" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {fit.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {fit.headline}
          </h2>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-xl border border-green-500/20 bg-green-950/10 p-6 sm:p-8">
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.15em] text-green-400">
                PlatformBox is a strong fit if
              </p>
              <ul className="space-y-3">
                {fit.strong.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground-secondary">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-400" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="h-full rounded-xl border border-border bg-card p-6 sm:p-8">
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground-tertiary">
                Probably not a fit if
              </p>
              <ul className="space-y-3">
                {fit.not.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground-tertiary">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500/60" strokeWidth={2} />
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
