"use client";

import { Check, Lock } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { ownership, lockIn } from "@/lib/content";

export function OwnershipSection() {
  return (
    <section id="ownership" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {ownership.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {ownership.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {ownership.sub}
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 sm:p-8">
              <p className="mb-5 text-sm font-semibold text-foreground">Everything lives in your accounts</p>
              <ul className="space-y-3">
                {ownership.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-foreground-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-lg border border-border bg-background/40 px-4 py-3 text-sm leading-relaxed text-foreground-tertiary">
                {ownership.noDependency}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Lock className="h-4 w-4 text-accent" aria-hidden />
                <p className="text-sm font-semibold text-foreground">{lockIn.title}</p>
              </div>
              <p className="text-sm leading-relaxed text-foreground-tertiary">{lockIn.message}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {lockIn.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-background/40 px-3 py-1.5 text-xs font-medium text-foreground-secondary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-lg border border-border bg-background/40 px-4 py-3 text-sm leading-relaxed text-foreground-tertiary">
                {ownership.careNote}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
