"use client";

import { Minus } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { notIncluded } from "@/lib/content";

export function NotIncludedSection() {
  return (
    <section id="not-included" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {notIncluded.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {notIncluded.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {notIncluded.sub}
          </p>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-3">
          {notIncluded.groups.map((group, i) => (
            <FadeIn key={group.title} delay={i * 0.05}>
              <div className="h-full rounded-xl border border-border bg-card p-6">
                <p className="text-sm font-semibold text-foreground">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Minus
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-foreground-tertiary"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-foreground-tertiary">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
