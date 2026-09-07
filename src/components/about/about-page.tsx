"use client";

import { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Code2,
  Boxes,
  Settings2,
  GitBranch,
  Layers,
  KeyRound,
  Network,
  ShieldCheck,
  Eye,
  Rocket,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookingCta } from "@/components/booking-cta";
import { FadeIn, fadeUp, stagger } from "@/lib/motion";
import {
  aboutHero,
  aboutStory,
  aboutProblem,
  aboutBuilding,
  aboutReference,
  aboutPrinciples,
  aboutExperience,
  aboutFinalCta,
} from "@/lib/content";

const problemIcons = [Code2, Boxes, Settings2, GitBranch, Layers, KeyRound, Network, ShieldCheck, Eye, Rocket];

export function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 grid-glow" aria-hidden />

      <Header showHomeLink />

      <main className="relative z-10 flex-1" id="main-content">
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-6 pb-16 pt-16 sm:pt-24">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {aboutHero.eyebrow}
          </p>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-border bg-card text-xl font-semibold text-foreground-tertiary"
              aria-hidden
            >
              RC
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {aboutHero.name}
              </h1>
              <p className="mt-1 text-sm text-foreground-tertiary">{aboutHero.role}</p>
            </div>
          </div>
          <p className="mt-8 text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {aboutHero.intro}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
            {aboutHero.oneLiner}
          </p>
        </section>

        {/* Story */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
            <h2 className="mb-8 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {aboutStory.eyebrow}
            </h2>
            <div className="space-y-5">
              {aboutStory.paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
                  {p}
                </p>
              ))}
            </div>
            <blockquote className="my-8 border-l-2 border-accent pl-4 text-base font-medium leading-relaxed text-foreground sm:text-lg">
              {aboutStory.quote}
            </blockquote>
            <div className="space-y-5">
              {aboutStory.closing.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* The problem */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
            <h2 className="mb-8 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {aboutProblem.eyebrow}
            </h2>
            <motion.ol
              className="flex flex-wrap items-center gap-x-2 gap-y-3"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {aboutProblem.steps.map((step, i) => {
                const Icon = problemIcons[i];
                return (
                  <Fragment key={step}>
                    {i > 0 && (
                      <motion.li variants={fadeUp} className="text-muted" aria-hidden>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </motion.li>
                    )}
                    <motion.li
                      variants={fadeUp}
                      className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground-secondary"
                    >
                      <Icon className="h-3.5 w-3.5 text-foreground-tertiary" strokeWidth={1.75} aria-hidden />
                      {step}
                    </motion.li>
                  </Fragment>
                );
              })}
            </motion.ol>

            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-10 text-sm font-semibold text-foreground sm:text-base">
              {aboutProblem.resolved.map((step, i) => (
                <Fragment key={step}>
                  {i > 0 && <ArrowRight className="h-4 w-4 text-accent" aria-hidden />}
                  <span className={step === "Golden Path" ? "text-accent" : ""}>{step}</span>
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* What I'm building now */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
            <h2 className="mb-8 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {aboutBuilding.eyebrow}
            </h2>
            <div className="space-y-5">
              {aboutBuilding.paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {aboutBuilding.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground-secondary"
                >
                  {cap}
                </span>
              ))}
            </div>
            <p className="mt-8 text-base font-semibold leading-relaxed text-foreground sm:text-lg">
              {aboutBuilding.philosophy}
            </p>
          </div>
        </section>

        {/* Reference platform */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {aboutReference.headline}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
              {aboutReference.body}
            </p>
            <Link
              href={aboutReference.linkHref}
              prefetch={false}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              {aboutReference.linkLabel}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </section>

        {/* Principles */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
            <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {aboutPrinciples.eyebrow}
            </h2>
            <ul className="space-y-3">
              {aboutPrinciples.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground-secondary sm:text-base">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Experience */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
              {aboutExperience.stats.map((stat) => (
                <div key={stat.value}>
                  <p className="text-base font-semibold text-foreground sm:text-lg">{stat.value}</p>
                  <p className="mt-1 text-xs leading-snug text-foreground-tertiary">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 border-t border-border pt-8 text-sm text-foreground-tertiary">
              {aboutExperience.companies.join(" · ")}
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-24">
            <FadeIn>
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {aboutFinalCta.headline}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
                {aboutFinalCta.sub}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <BookingCta label={aboutFinalCta.primaryLabel} />
                <Link
                  href={aboutFinalCta.secondaryHref}
                  prefetch={false}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-border-strong px-6 text-sm font-medium text-foreground-secondary transition-colors hover:border-border-strong"
                >
                  {aboutFinalCta.secondaryLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
