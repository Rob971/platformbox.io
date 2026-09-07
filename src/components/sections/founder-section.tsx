"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { founder } from "@/lib/content";

export function FounderSection() {
  return (
    <section id="founder" className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <FadeIn>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {founder.eyebrow}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {founder.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {founder.body}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm font-medium text-foreground">
              {founder.name} <span className="text-foreground-tertiary font-normal">— {founder.role}</span>
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
        </FadeIn>
      </div>
    </section>
  );
}
