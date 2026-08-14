"use client";

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
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <p
        className={`mb-5 text-[10px] font-medium uppercase tracking-[0.15em] ${
          isBefore ? "text-red-400" : "text-green-400"
        }`}
      >
        {title}
      </p>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                isBefore
                  ? "bg-red-950/40 text-red-400"
                  : "bg-green-950/40 text-green-400"
              }`}
            >
              {i + 1}
            </span>
            <span className={`text-sm ${isBefore ? "text-zinc-400" : "font-medium text-zinc-200"}`}>
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BeforeAfterSection() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {beforeAfter.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {beforeAfter.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {beforeAfter.sub}
          </p>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn>
            <PathList title="Before" steps={beforeAfter.before} tone="before" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <PathList title="After" steps={beforeAfter.after} tone="after" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
