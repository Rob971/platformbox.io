"use client";

import { FadeIn } from "@/lib/motion";
import { delivery } from "@/lib/content";
import { TimelineStepper } from "@/components/showcase/timeline-stepper";

export function DeliverySection() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {delivery.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {delivery.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {delivery.sub}
          </p>
        </FadeIn>

        <FadeIn>
          <TimelineStepper />
        </FadeIn>
      </div>
    </section>
  );
}
