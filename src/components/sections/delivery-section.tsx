"use client";

import { FadeIn } from "@/lib/motion";
import { delivery } from "@/lib/content";
import { TimelineStepper } from "@/components/showcase/timeline-stepper";

export function DeliverySection() {
  return (
    <section id="delivery" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {delivery.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {delivery.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {delivery.sub}
          </p>
        </FadeIn>

        <FadeIn>
          <TimelineStepper />
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-10 max-w-3xl rounded-xl border border-accent/30 bg-accent/10 px-6 py-5 text-center text-sm leading-relaxed text-foreground-secondary sm:text-base">
            {delivery.mechanism}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
