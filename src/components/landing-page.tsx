"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Boxes, Check, Code2, GitBranch, Layers, ArrowRight } from "lucide-react";
import {
  PlatformBoxLogoIcon,
  ModularIaCIcon,
  CICDVelocityIcon,
  SecurityComplianceIcon,
  FractionalCTOIcon,
  FinOpsIcon,
} from "./icons";
import { Header } from "./header";
import { Footer } from "./footer";
import { BOOKING_URL } from "@/lib/constants";
import { fadeUp, stagger, FadeIn } from "@/lib/motion";

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

      <Header />

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
              <Link
                href="/#solution"
                className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.06] sm:w-auto"
              >
                View the 14-Day Blueprint
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section className="relative mx-auto mb-16 max-w-5xl px-6">
          <div className="relative mx-auto grid gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_-50px_rgba(15,23,42,0.75)] sm:grid-cols-2">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-white/0" />

            <div className="relative rounded-3xl border border-white/10 bg-zinc-950/90 p-5 text-center shadow-lg shadow-black/20">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-zinc-900 p-3">
                <ModularIaCIcon className="h-full w-full" />
              </div>
              <p className="mt-4 text-sm font-semibold text-white">Modular IaC</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">Scalable infrastructure blocks</p>
            </div>

            <div className="relative rounded-3xl border border-white/10 bg-zinc-950/90 p-5 text-center shadow-lg shadow-black/20">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-zinc-900 p-3">
                <SecurityComplianceIcon className="h-full w-full" />
              </div>
              <p className="mt-4 text-sm font-semibold text-white">Security & Compliance</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">Locked networks and governance</p>
            </div>

            <div className="relative rounded-3xl border border-white/10 bg-zinc-950/90 p-5 text-center shadow-lg shadow-black/20">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-zinc-900 p-3">
                <CICDVelocityIcon className="h-full w-full" />
              </div>
              <p className="mt-4 text-sm font-semibold text-white">CI/CD & Velocity</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">Rapid feedback loops</p>
            </div>

            <div className="relative rounded-3xl border border-white/10 bg-zinc-950/90 p-5 text-center shadow-lg shadow-black/20">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-zinc-900 p-3">
                <FractionalCTOIcon className="h-full w-full" />
              </div>
              <p className="mt-4 text-sm font-semibold text-white">Fractional CTO Strategy</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">Guided technical direction</p>
            </div>

            <div className="relative rounded-3xl border border-white/10 bg-zinc-950/90 p-5 text-center shadow-lg shadow-black/20">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-zinc-900 p-3">
                <FinOpsIcon className="h-full w-full" />
              </div>
              <p className="mt-4 text-sm font-semibold text-white">FinOps Optimization</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">Cost reduction that scales with every release.</p>
            </div>

            <div className="relative rounded-3xl border border-white/10 bg-zinc-950/90 p-5 text-center shadow-lg shadow-black/20">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-zinc-900 p-3">
                <PlatformBoxLogoIcon className="h-full w-full" />
              </div>
              <p className="mt-4 text-sm font-semibold text-white">PlatformBox Core</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">A connected platform suite for modern engineering teams.</p>
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
          <div className="mt-12 flex justify-center">
            <Link
              href="/showcase"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/20 px-5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              View the 14-Day Blueprint
              <ArrowRight className="h-4 w-4" />
            </Link>
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

      <Footer />
    </div>
  );
}
