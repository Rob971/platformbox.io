"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Boxes,
  Check,
  Code2,
  GitBranch,
  Layers,
  Mail,
  ArrowRight,
} from "lucide-react";
import type { ReactNode } from "react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

const deliverables = [
  {
    icon: Code2,
    title: "Infrastructure as Code",
    text: "Fully modular Terraform templates for self-serve provisioning.",
  },
  {
    icon: GitBranch,
    title: "DevSecOps CI/CD",
    text: "Standardized GitLab pipelines with automated testing.",
  },
  {
    icon: Layers,
    title: "Ephemeral Environments",
    text: "Auto-generated preview environments for every Pull Request to eliminate staging bottlenecks.",
  },
  {
    icon: Boxes,
    title: "Production Kubernetes",
    text: "Highly available EKS clusters managed for you.",
  },
] as const;

const economics = [
  "Avoided Headcount: Bypass the €120k+ salary and 3-month hiring cycle of a dedicated Platform Engineer.",
  "Reclaimed Payroll: Stop losing $200k/year in engineering value to manual deployment friction.",
  "Cloud Savings: Ephemeral environments destroy themselves upon merge, eliminating idle AWS waste.",
] as const;

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 grid-glow" aria-hidden />

      {/* Nav */}
      <header className="relative z-20 border-b border-white/10 bg-zinc-950/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-white"
          >
            PlatformBox<span className="text-accent">.io</span>
          </Link>
          <a
            href="#audit"
            className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:inline"
          >
            Book an Architecture Audit
          </a>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        {/* Hero */}
        <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-20 text-center sm:pt-28 md:pb-32 md:pt-36">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center"
          >
            <motion.p
              variants={fadeUp}
              className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent"
            >
              Platform Delivery / 14 Days
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.08]"
            >
              The 14-Day Enterprise Internal Developer Platform
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
            >
              We give your engineers a self-serve &lsquo;Golden Path&rsquo; to
              deploy code instantly without needing to hire a full-time Platform
              Engineering team.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            >
              <a
                id="audit"
                href="#"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:w-auto"
              >
                Book an Architecture Audit
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#solution"
                className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.06] sm:w-auto"
              >
                View the 14-Day Blueprint
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Problem */}
        <section className="border-y border-white/10 bg-zinc-950/80">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:gap-16 md:py-28">
            <FadeIn>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                01 / The Bottleneck
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Scaling breaks deployments.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
                Scaling your engineering team post-Series A usually breaks
                deployments. Senior developers spend 30% of their time managing
                AWS and CI/CD pipelines instead of shipping features, and new
                hires take weeks to safely deploy code.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Deliverables */}
        <section id="solution" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <FadeIn className="mb-12 max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                02 / The 14-Day Solution
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                The Deliverables
              </h2>
            </FadeIn>

            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {deliverables.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    variants={fadeUp}
                    className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.05] sm:p-8"
                  >
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-accent transition-colors group-hover:border-accent/40">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-medium tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-base">
                      {item.text}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ROI / Pricing */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <FadeIn className="mb-12 max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                03 / The Financial ROI
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                The Economics of Velocity
              </h2>
            </FadeIn>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <FadeIn>
                <ul className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  {economics.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                      <span className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-accent/40 bg-gradient-to-br from-accent/20 via-zinc-950 to-zinc-950 p-6 sm:p-8">
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
                    aria-hidden
                  />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                      Fixed Project Fee
                    </p>
                    <p className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                      $20,000
                      <span className="ml-2 text-lg font-medium text-zinc-400">
                        USD
                      </span>
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                      The Investment: $20,000 USD (Fixed Project Fee) |
                      Timeline: 14 Days.
                    </p>
                  </div>
                  <a
                    href="#"
                    className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
                  >
                    Book an Architecture Audit
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
          <p className="text-sm text-zinc-500">PlatformBox.io © 2026</p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="mailto:roberto@platformbox.io"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" aria-hidden />
              roberto@platformbox.io
            </a>
            <a
              href="https://www.linkedin.com/in/robertocornano/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
              aria-label="PlatformBox on LinkedIn"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
