"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleHelp,
  FileCheck2,
  Scale,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookingCta } from "@/components/booking-cta";
import { FadeIn } from "@/lib/motion";
import { assessmentProduct } from "@/lib/assessment-content";

const questionIcons = [ShieldCheck, TrendingUp, Target, Scale, FileCheck2];

export function AssessmentPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 grid-glow" aria-hidden />
      <Header showHomeLink />

      <main className="relative z-10 flex-1" id="main-content">
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 text-center sm:pt-24 md:pt-28">
          <FadeIn>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {assessmentProduct.hero.eyebrow}
            </p>
            <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.08]">
              {assessmentProduct.hero.headline}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground-tertiary sm:text-lg">
              {assessmentProduct.hero.sub}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <BookingCta />
              <Link
                href="/#assessment"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-border-strong px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
              >
                Back to overview
              </Link>
            </div>
            <p className="mt-5 text-sm font-medium text-foreground-secondary">
              {assessmentProduct.price} · {assessmentProduct.duration}
            </p>
          </FadeIn>
        </section>

        <section className="border-y border-accent/20 bg-accent/[0.04]">
          <div className="mx-auto max-w-4xl px-6 py-12 text-center md:py-16">
            <FadeIn>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Independence is part of the product</p>
              <p className="mx-auto mt-4 max-w-3xl text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
                {assessmentProduct.independence}
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <FadeIn className="mb-10 max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">The decision surface</p>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Five questions worth €2,500.</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
                The Assessment turns a broad platform conversation into five explicit decisions.
              </p>
            </FadeIn>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {assessmentProduct.questions.map((question, i) => {
                const Icon = questionIcons[i];
                return (
                  <FadeIn key={question.title} delay={i * 0.04}>
                    <div className="h-full rounded-xl border border-border bg-card p-5">
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-accent">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <p className="text-sm font-semibold text-foreground">{question.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground-tertiary">{question.text}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <FadeIn className="mb-10 max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">What you receive</p>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">A decision package your team can use.</h2>
            </FadeIn>
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {assessmentProduct.deliverables.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-border bg-card p-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                  <span className="text-sm leading-relaxed text-foreground-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
            <FadeIn>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">Value without a sale</p>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">The work still has value if PlatformBox gets a “no.”</h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
                You leave with a clearer constraint, prioritized risks and opportunities, a defensible strategy choice, and an executable next step. The Assessment is not contingent on buying the implementation.
              </p>
              <ul className="mt-7 space-y-3">
                {assessmentProduct.noSale.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">Why €2,500</p>
                <p className="text-xl font-semibold leading-relaxed text-foreground">
                  The price is for reducing uncertainty before you commit materially more engineering capacity.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary">
                  A wrong platform decision can create months of engineering work, migration cost, operational risk, or a platform nobody adopts. The Assessment is designed to make that decision explicit before those costs become sunk costs.
                </p>
                <p className="mt-5 border-t border-border pt-5 text-sm font-medium text-accent-hover">
                  We do not promise savings before seeing the evidence. Where the data supports economics, the analysis distinguishes measured, estimated, assumed, and unknown inputs.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <FadeIn className="mb-10 max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">Evidence examined</p>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Decisions grounded in the environment you actually run.</h2>
            </FadeIn>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {assessmentProduct.evidence.map((item) => (
                <div key={item} className="rounded-xl border border-border bg-card p-5 text-sm text-foreground-secondary">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
            <FadeIn className="mb-10 text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">The process</p>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Discovery → Evidence → Analysis → Recommendation → Decision Brief</h2>
            </FadeIn>
            <div className="grid gap-4 md:grid-cols-5">
              {assessmentProduct.process.map((step, i) => (
                <FadeIn key={step.title} delay={i * 0.04}>
                  <div className="h-full rounded-xl border border-border bg-card p-5">
                    <p className="text-xs font-medium text-accent">0{i + 1}</p>
                    <p className="mt-3 text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-tertiary">{step.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
            <FadeIn className="mb-10 text-center">
              <CircleHelp className="mx-auto h-7 w-7 text-accent" strokeWidth={1.75} />
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Questions before you buy it.</h2>
            </FadeIn>
            <div className="space-y-3">
              {assessmentProduct.faqs.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-border bg-card p-5">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-foreground marker:hidden">{faq.q}</summary>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground-tertiary">{faq.a}</p>
                </details>
              ))}
            </div>
          </FadeIn>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-24 text-center">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Start with the decision</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Find out whether a platform investment is justified before you make it.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground-tertiary sm:text-base">{assessmentProduct.price} · {assessmentProduct.duration} · €2,500 credited toward PlatformBox Launch if you proceed.</p>
            <div className="mt-8">
              <BookingCta />
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  );
}
