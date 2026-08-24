"use client";

import { FadeIn } from "@/lib/motion";
import { BookingCta } from "@/components/booking-cta";
import { finalCta } from "@/lib/content";

export function FinalCtaSection() {
  return (
    <section id="book" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <FadeIn>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {finalCta.headline}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {finalCta.sub}
          </p>
          <div className="mt-8">
            <BookingCta />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
