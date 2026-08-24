"use client";

import { Check } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { BookingCta } from "@/components/booking-cta";
import { offers, assessment, care, pricingNote, pricing, whichPackage } from "@/lib/content";

export function PricingSection() {
  return (
    <section id="pricing" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
            {pricing.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {pricing.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {pricingNote}
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          {offers.map((offer) => (
            <FadeIn key={offer.id}>
              <div
                className={`relative flex h-full flex-col rounded-xl border p-6 sm:p-8 ${
                  offer.recommended
                    ? "border-accent/50 bg-accent/[0.06]"
                    : "border-border bg-card"
                }`}
              >
                {offer.recommended && (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
                    Recommended
                  </span>
                )}
                <h3 className="text-lg font-semibold text-foreground">{offer.name}</h3>
                <p className="mt-1 text-xs text-muted">{offer.delivery}</p>
                <p className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
                  {offer.price}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground-tertiary">{offer.blurb}</p>
                <ul className="mt-6 space-y-2.5">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm text-foreground-secondary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-border pt-6">
                  <BookingCta
                    variant={offer.recommended ? "primary" : "outline"}
                    className="w-full"
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <FadeIn>
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-foreground">{assessment.name}</h3>
                <p className="text-xs text-muted">{assessment.duration}</p>
              </div>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                {assessment.price}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-tertiary">{assessment.blurb}</p>
              <p className="mt-4 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-xs leading-relaxed text-accent-hover">
                {assessment.note}
              </p>
              <ul className="mt-6 space-y-2.5">
                {assessment.deliverables.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-foreground-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-border pt-6">
                <BookingCta className="w-full" />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-foreground">{care.name}</h3>
                <p className="text-right text-xs text-muted">{care.price}</p>
              </div>
              <p className="mt-4 text-sm font-medium text-accent-hover">{care.position}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground-tertiary">{care.blurb}</p>
              <ul className="mt-6 space-y-2.5">
                {care.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-foreground-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-border pt-6">
                <BookingCta variant="outline" className="w-full" />
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-12 border-t border-border pt-10">
          <FadeIn className="mb-6">
            <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {whichPackage.headline}
            </h3>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whichPackage.items.map((item) => (
              <FadeIn key={item.title}>
                <div className="h-full rounded-xl border border-border bg-card p-5">
                  <p className="text-sm font-semibold text-accent-hover">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-tertiary">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
