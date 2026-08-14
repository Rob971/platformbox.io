"use client";

import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { faqs, faqSection } from "@/lib/content";

export function FaqSection() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {faqSection.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {faqSection.headline}
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left">
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
