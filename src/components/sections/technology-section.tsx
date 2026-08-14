"use client";

import { FadeIn } from "@/lib/motion";
import { technology } from "@/lib/content";

export function TechnologySection() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {technology.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {technology.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {technology.sub}
          </p>
        </FadeIn>

        <FadeIn>
          <ul className="flex flex-wrap gap-3">
            {technology.items.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
