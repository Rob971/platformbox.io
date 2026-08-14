"use client";

import { Fragment } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { architecture } from "@/lib/content";

export function ReferenceArchitectureSection() {
  return (
    <section id="reference-architecture" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {architecture.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {architecture.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {architecture.sub}
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <FadeIn>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <ol className="space-y-1">
                {architecture.flow.map((step, i) => (
                  <Fragment key={step}>
                    {i > 0 && (
                      <li aria-hidden className="flex justify-center py-1 text-zinc-600">
                        <ArrowDown className="h-4 w-4" />
                      </li>
                    )}
                    <li
                      className={`rounded-lg border px-4 py-3 text-sm font-medium ${
                        i === 1
                          ? "border-accent/40 bg-accent/10 text-accent-hover"
                          : "border-white/10 bg-zinc-950/40 text-white"
                      }`}
                    >
                      {step}
                    </li>
                  </Fragment>
                ))}
              </ol>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col justify-center rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                PlatformBox sits between your developers and your stack: it owns the golden path and
                the developer experience, while your tools and infrastructure stay exactly where they
                are.
              </p>
              <div className="mt-6">
                <Link
                  href={architecture.ctaHref}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/20 px-6 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30"
                >
                  {architecture.ctaLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
