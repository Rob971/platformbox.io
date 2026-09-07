"use client";

import { FadeIn } from "@/lib/motion";
import { whatWeBuild } from "@/lib/content";

export function WhatWeBuildSection() {
  return (
    <section id="what-we-build" className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <FadeIn className="max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {whatWeBuild.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {whatWeBuild.headline}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {whatWeBuild.components.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mt-8 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {whatWeBuild.note}
          </p>
          <p className="mt-2 text-base font-semibold text-foreground sm:text-lg">
            {whatWeBuild.ownershipNote}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
