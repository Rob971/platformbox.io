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

const BOOKING_URL = "https://www.planfy.com/booking-widget/platformbox-io";

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

function PlatformBoxLogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <defs>
        <linearGradient id="pb-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#pb-gradient)" strokeWidth="6">
        <polygon points="60 12 96 30 96 72 60 90 24 72 24 30" />
        <polyline points="37 48 60 34 83 48" />
        <polyline points="60 34 60 76" />
        <path d="M60 76l19-11" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function ModularIaCIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <rect x="18" y="24" width="28" height="28" rx="6" fill="none" stroke="#38bdf8" strokeWidth="6" />
      <rect x="48" y="24" width="28" height="28" rx="6" fill="none" stroke="#38bdf8" strokeWidth="6" />
      <rect x="33" y="54" width="28" height="28" rx="6" fill="none" stroke="#38bdf8" strokeWidth="6" />
      <rect x="63" y="54" width="28" height="28" rx="6" fill="none" stroke="#38bdf8" strokeWidth="6" />
      <path d="M72 28v-8l16 12-16 12v-8" stroke="#7dd3fc" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function CICDVelocityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <path d="M30 36c10-6 22-8 34-4 10 3 18 10 22 20" fill="none" stroke="#facc15" strokeWidth="7" strokeLinecap="round" />
      <path d="M93 31 105 38 93 45" fill="none" stroke="#facc15" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M90 84c-10 6-22 8-34 4-10-3-18-10-22-20" fill="none" stroke="#facc15" strokeWidth="7" strokeLinecap="round" />
      <path d="M27 79 15 72 27 65" fill="none" stroke="#facc15" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SecurityComplianceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <path d="M60 24l30 14v25c0 20-22 28-30 36-8-8-30-16-30-36V38l30-14z" fill="none" stroke="#22c55e" strokeWidth="6" />
      <rect x="50" y="48" width="20" height="18" rx="4" fill="none" stroke="#22c55e" strokeWidth="5" />
      <path d="M60 60v6" fill="none" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
      <circle cx="27" cy="27" r="5" fill="#22c55e" />
      <circle cx="93" cy="30" r="5" fill="#22c55e" />
      <circle cx="60" cy="96" r="5" fill="#22c55e" />
      <path d="M32 30 48 45" stroke="#22c55e" strokeWidth="3" fill="none" />
      <path d="M92 34 78 45" stroke="#22c55e" strokeWidth="3" fill="none" />
      <path d="M60 87 60 66" stroke="#22c55e" strokeWidth="3" fill="none" />
    </svg>
  );
}

function FractionalCTOIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <circle cx="60" cy="60" r="26" fill="none" stroke="#a855f7" strokeWidth="6" />
      <path d="M60 26 70 58 96 58" fill="none" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" />
      <path d="M28 42 62 52 82 22" fill="none" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" />
      <path d="M60 86v22" fill="none" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" />
      <path d="M79 54 95 70" fill="none" stroke="#a855f7" strokeWidth="4" />
      <path d="M35 74 21 86" fill="none" stroke="#a855f7" strokeWidth="4" />
      <rect x="74" y="72" width="8" height="12" rx="2" fill="#a855f7" />
      <rect x="30" y="34" width="8" height="12" rx="2" fill="#a855f7" />
    </svg>
  );
}

function FinOpsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <path d="M30 88h18v-28h-18zM54 88h18v-16H54zM78 88h18v-40H78z" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
      <path d="M90 72 108 60 90 48" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="34" r="10" fill="none" stroke="#f97316" strokeWidth="5" />
      <circle cx="46" cy="42" r="6" fill="#f97316" />
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

export function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 grid-glow" aria-hidden />

      <header className="relative z-20 border-b border-white/10 bg-zinc-950/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-white"
          >
            PlatformBox<span className="text-accent">.io</span>
          </Link>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:inline"
          >
            Book an Architecture Audit
          </a>
        </div>
      </header>

      <main className="relative z-10 flex-1">
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
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
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

        <section className="relative mx-auto mb-16 max-w-5xl px-6">
          <div className="mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_-50px_rgba(15,23,42,0.75)]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-white/0" />

            <div className="relative grid gap-3 md:hidden">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-zinc-950/90 p-4 text-center shadow-lg shadow-black/20">
                  <div className="mx-auto inline-flex h-18 w-18 items-center justify-center rounded-3xl bg-zinc-900 p-3">
                    <ModularIaCIcon className="h-full w-full" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">Modular IaC</p>
                  <p className="mt-1 text-xs leading-snug text-zinc-400">Scalable infrastructure blocks</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-zinc-950/90 p-4 text-center shadow-lg shadow-black/20">
                  <div className="mx-auto inline-flex h-18 w-18 items-center justify-center rounded-3xl bg-zinc-900 p-3">
                    <SecurityComplianceIcon className="h-full w-full" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">Security & Compliance</p>
                  <p className="mt-1 text-xs leading-snug text-zinc-400">Locked networks and governance</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-zinc-950/90 p-4 text-center shadow-lg shadow-black/20">
                  <div className="mx-auto inline-flex h-18 w-18 items-center justify-center rounded-3xl bg-zinc-900 p-3">
                    <CICDVelocityIcon className="h-full w-full" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">CI/CD & Velocity</p>
                  <p className="mt-1 text-xs leading-snug text-zinc-400">Rapid feedback loops</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-zinc-950/90 p-4 text-center shadow-lg shadow-black/20">
                  <div className="mx-auto inline-flex h-18 w-18 items-center justify-center rounded-3xl bg-zinc-900 p-3">
                    <FractionalCTOIcon className="h-full w-full" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">Fractional CTO Strategy</p>
                  <p className="mt-1 text-xs leading-snug text-zinc-400">Guided technical direction</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-zinc-950/90 p-4 text-center shadow-lg shadow-black/20 sm:col-span-2">
                  <div className="mx-auto inline-flex h-18 w-18 items-center justify-center rounded-3xl bg-zinc-900 p-3">
                    <FinOpsIcon className="h-full w-full" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">FinOps Optimization</p>
                  <p className="mt-1 text-xs leading-snug text-zinc-400">Cost reduction that scales</p>
                </div>
              </div>

              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-accent/40 bg-zinc-950/80 p-3 shadow-[0_20px_80px_-30px_rgba(56,189,248,0.5)] sm:h-40 sm:w-40 sm:p-4">
                <PlatformBoxLogoIcon className="h-full w-full" />
              </div>
            </div>

            <div className="relative hidden h-[360px] md:block">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-white/0" />
              <div className="pointer-events-none absolute left-6 top-8 w-32 text-xs uppercase tracking-[0.3em] text-zinc-400">
                <div className="mb-3 font-semibold">Modular IaC</div>
                <div className="text-sm leading-relaxed text-zinc-300">Scalable infrastructure blocks</div>
              </div>
              <div className="pointer-events-none absolute right-6 top-8 w-32 text-xs uppercase tracking-[0.3em] text-zinc-400 text-right">
                <div className="mb-3 font-semibold">Security & Compliance</div>
                <div className="text-sm leading-relaxed text-zinc-300">Locked networks and governance</div>
              </div>
              <div className="pointer-events-none absolute left-6 top-[50%] w-32 -translate-y-1/2 text-xs uppercase tracking-[0.3em] text-zinc-400">
                <div className="mb-3 font-semibold">CI/CD & Velocity</div>
                <div className="text-sm leading-relaxed text-zinc-300">Rapid feedback loops</div>
              </div>
              <div className="pointer-events-none absolute right-6 top-[50%] w-32 -translate-y-1/2 text-xs uppercase tracking-[0.3em] text-zinc-400 text-right">
                <div className="mb-3 font-semibold">Fractional CTO Strategy</div>
                <div className="text-sm leading-relaxed text-zinc-300">Guided technical direction</div>
              </div>
              <div className="pointer-events-none absolute left-6 bottom-8 w-32 text-xs uppercase tracking-[0.3em] text-zinc-400">
                <div className="mb-3 font-semibold">FinOps Optimization</div>
                <div className="text-sm leading-relaxed text-zinc-300">Cost reduction that scales</div>
              </div>

              <div className="absolute left-[5%] top-[20%] h-24 w-24 rounded-3xl border border-white/10 bg-zinc-950/90 p-4 shadow-lg shadow-black/20">
                <ModularIaCIcon className="h-full w-full" />
              </div>
              <div className="absolute right-[5%] top-[16%] h-20 w-20 rounded-3xl border border-white/10 bg-zinc-950/90 p-3 shadow-lg shadow-black/20">
                <SecurityComplianceIcon className="h-full w-full" />
              </div>
              <div className="absolute left-[5%] top-[54%] h-20 w-20 rounded-3xl border border-white/10 bg-zinc-950/90 p-3 shadow-lg shadow-black/20">
                <CICDVelocityIcon className="h-full w-full" />
              </div>
              <div className="absolute right-[5%] top-[54%] h-20 w-20 rounded-3xl border border-white/10 bg-zinc-950/90 p-3 shadow-lg shadow-black/20">
                <FractionalCTOIcon className="h-full w-full" />
              </div>
              <div className="absolute left-[18%] bottom-[10%] h-20 w-20 rounded-3xl border border-white/10 bg-zinc-950/90 p-3 shadow-lg shadow-black/20">
                <FinOpsIcon className="h-full w-full" />
              </div>
              <div className="absolute inset-x-1/2 top-[29%] -translate-x-1/2 h-36 w-36 rounded-full border border-accent/40 bg-zinc-950/80 p-3 shadow-[0_20px_80px_-30px_rgba(56,189,248,0.5)]">
                <PlatformBoxLogoIcon className="h-full w-full" />
              </div>
            </div>
          </div>
        </section>

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
                      €20,000
                      <span className="ml-2 text-lg font-medium text-zinc-400">
                        EUR
                      </span>
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                      The Investment: €20,000 EUR (Fixed Project Fee) |
                      Timeline: 14 Days.
                    </p>
                  </div>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
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

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-zinc-500">PlatformBox.io © 2026</p>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              build {process.env.NEXT_PUBLIC_COMMIT_SHA?.slice(0, 7) ?? "dev"}
            </p>
          </div>
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
