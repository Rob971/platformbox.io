"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { founder } from "@/lib/content";

export function FounderSection() {
  return (
    <section id="founder" className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <FadeIn className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          {/* TODO: swap for next/image once a real headshot is supplied. */}
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-border bg-card text-2xl font-semibold text-foreground-tertiary"
            aria-hidden
          >
            RC
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
              {founder.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {founder.headline}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-tertiary sm:text-base">
              {founder.body}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium text-foreground">
                {founder.name} <span className="text-foreground-tertiary">· {founder.role}</span>
              </p>
              <Link
                href={founder.linkHref}
                prefetch={false}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                {founder.linkLabel}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
