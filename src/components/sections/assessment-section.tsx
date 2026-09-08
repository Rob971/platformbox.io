"use client";

import Link from "next/link";
import { ArrowRight, Check, Scale, ShieldCheck, Target, TrendingUp } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { BookingCta } from "@/components/booking-cta";
import { assessmentProduct } from "@/lib/assessment-content";

const icons = [ShieldCheck, TrendingUp, Target, Scale];

export function AssessmentSection() {
  return (
    <section id="assessment" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">09 / Decision Intelligence</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Decision-grade intelligence about your platform.</h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">Before committing significant engineering capacity to a platform change, establish the risk, economics, delivery friction, strategic options, and whether PlatformBox is actually the right fit.</p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <div className="flex h-full flex-col rounded-xl border border-accent/30 bg-accent/[0.04] p-6 sm:p-8">
              <p className="text-3xl font-semibold tracking-tight text-foreground">{assessmentProduct.price}</p>
              <p className="mt-2 text-base font-medium text-foreground">A decision product, not a sales ritual.</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-tertiary">You receive an executive decision brief, prioritized risks and opportunities, strategy comparison, an explicit fit decision, target state, and an executable 90-day plan.</p>
              <p className="mt-6 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-semibold leading-relaxed text-accent-hover">{assessmentProduct.independence}</p>
              <div className="mt-auto border-t border-border pt-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <BookingCta className="w-full sm:w-auto" />
                  <Link href="/assessment" prefetch={false} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border-strong px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover">Learn more <ArrowRight className="h-4 w-4" aria-hidden /></Link>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 sm:p-8">
              <div className="mb-5">
                <p className="text-sm font-semibold text-foreground">Five questions the Assessment answers</p>
                <p className="mt-1 text-sm text-foreground-tertiary">The decision surface stays focused on what matters to leadership and engineering.</p>
              </div>
              <ul className="space-y-4">
                {assessmentProduct.questions.slice(0, 4).map((question, i) => {
                  const Icon = icons[i];
                  return <li key={question.title} className="flex gap-3"><Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} /><span><strong className="font-semibold text-foreground">{question.title}.</strong> <span className="text-sm text-foreground-tertiary">{question.text}</span></span></li>;
                })}
                <li className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} /><span><strong className="font-semibold text-foreground">Fit.</strong> <span className="text-sm text-foreground-tertiary">Is PlatformBox actually the right answer?</span></span></li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
