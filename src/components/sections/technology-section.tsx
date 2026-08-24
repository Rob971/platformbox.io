"use client";

import { FadeIn } from "@/lib/motion";
import { technology } from "@/lib/content";

export function TechnologySection() {
  return (
    <section id="technology" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {technology.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {technology.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {technology.sub}
          </p>
        </FadeIn>

        <FadeIn>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {technology.roles.map((item) => (
              <li
                key={item.name}
                className={`flex flex-col gap-1 rounded-xl border p-5 ${
                  item.accent
                    ? "border-accent/40 bg-accent/[0.06]"
                    : "border-border bg-card"
                }`}
              >
                <span className={`text-sm font-semibold ${item.accent ? "text-accent-hover" : "text-foreground"}`}>
                  {item.name}
                </span>
                <span className="text-sm leading-relaxed text-foreground-tertiary">{item.role}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

