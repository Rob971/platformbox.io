"use client";

import { Check, X } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { beforeAfter } from "@/lib/content";

interface PathListProps {
  title: string;
  steps: readonly string[];
  tone: "before" | "after";
}

function PathList({ title, steps, tone }: PathListProps) {
  const isBefore = tone === "before";
  return (
    <div className="h-full rounded-xl border border-border bg-card p-6 sm:p-8">
      <p
        className={`mb-5 text-[10px] font-medium uppercase tracking-[0.15em] ${
          isBefore ? "text-red-400" : "text-green-400"
        }`}
      >
        {title}
      </p>
      <ul className="space-y-3">
        {steps.map((step) => (
          <li key={step} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                isBefore ? "bg-red-950/40 text-red-400" : "bg-green-950/40 text-green-400"
              }`}
            >
              {isBefore ? (
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
              ) : (
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              )}
            </span>
            <span className={`text-sm leading-relaxed ${isBefore ? "text-foreground-tertiary" : "font-medium text-foreground-secondary"}`}>
              {step}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BeforeAfterSection() {
  return (
    <section id="before-after" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {beforeAfter.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {beforeAfter.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {beforeAfter.sub}
          </p>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn>
            <PathList title="Before PlatformBox" steps={beforeAfter.before} tone="before" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <PathList title="After PlatformBox" steps={beforeAfter.after} tone="after" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

