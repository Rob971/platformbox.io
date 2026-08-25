"use client";

import { Fragment } from "react";
import Link from "next/link";
import { FilePlus2, GitBranch, Boxes, Eye, ShieldCheck, Rocket, Check, ArrowDown, ArrowRight } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { day14 } from "@/lib/content";

const stepIcons = [FilePlus2, GitBranch, Boxes, Eye, ShieldCheck, Rocket];

export function Day14Section() {
  return (
    <section id="day-14" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {day14.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {day14.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {day14.sub}
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 sm:p-8">
              <ol className="space-y-1">
                {day14.steps.map((step, i) => {
                  const Icon = stepIcons[i];
                  return (
                    <Fragment key={step}>
                      {i > 0 && (
                        <li aria-hidden className="flex justify-center py-1 text-muted">
                          <ArrowDown className="h-4 w-4" />
                        </li>
                      )}
                      <li className="flex items-center gap-3 rounded-lg border border-border bg-background/40 px-4 py-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-accent">
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </div>
                        <span className="text-sm font-medium text-foreground">{step}</span>
                      </li>
                    </Fragment>
                  );
                })}
              </ol>
              <p className="mt-6 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-center text-sm font-semibold text-accent-hover">
                {day14.claim}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 sm:p-8">
              <p className="mb-5 text-sm font-semibold text-foreground" role="heading" aria-level={3}>On Day 14, your team can:</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {day14.capabilities.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-lg border border-border bg-surface px-4 py-3 text-xs leading-relaxed text-foreground-tertiary">
                {day14.distinction}
              </p>
              <div className="mt-8 border-t border-border pt-6">
                <Link
                  href="/showcase"
                  prefetch={false}
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-hover transition-colors hover:text-foreground"
                >
                  See the full 14-Day Blueprint
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
