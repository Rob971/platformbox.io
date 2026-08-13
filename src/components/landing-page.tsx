"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Boxes, Check, ArrowRight, Blocks, Repeat, ShieldCheck, Compass, TrendingDown } from "lucide-react";
import { PlatformBoxLogoIcon, InfrastructureIcon, PipelineIcon, EphemeralIcon, ROIIcon } from "./icons";
import { Header } from "./header";
import { Footer } from "./footer";
import { BOOKING_URL } from "@/lib/constants";
import { fadeUp, stagger, FadeIn } from "@/lib/motion";
import { RoiCalculator } from "./roi-calculator";

const deliverables = [
  {
    icon: InfrastructureIcon,
    title: "Infrastructure as Code",
    text: "Fully modular Terraform templates for self-serve provisioning.",
  },
  {
    icon: PipelineIcon,
    title: "DevSecOps CI/CD",
    text: "Standardized GitLab pipelines with automated testing.",
  },
  {
    icon: EphemeralIcon,
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
  "Avoided Headcount: Bypass the €120,000 annual salary plus a 3-month hiring cycle of a dedicated Platform Engineer.",
  "Reclaimed Payroll: Stop losing €200,000/year in engineering value to manual deployment friction.",
  "Cloud Savings: Ephemeral environments destroy themselves upon merge, eliminating idle AWS waste.",
  "You Own Everything: Complete documentation, ADRs, and runbooks stay yours. Optional ongoing platform advisory keeps it evolving after Day 14.",
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
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent-strong px-6 text-sm font-medium text-white transition-colors hover:bg-accent sm:w-auto"
              >
                Book an Architecture Audit
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                href="/#solution"
                className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-white/20 px-6 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 sm:w-auto"
              >
                See the Deliverables
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pt-20">
          <FadeIn className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
              00 / Why PlatformBox
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Why PlatformBox
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              A connected platform suite delivered in 14 days — no hiring, no tooling sprawl, no guesswork.
            </p>
          </FadeIn>
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              { icon: Blocks, title: "Production-Grade IaC", desc: "Scalable infrastructure blocks" },
              { icon: ShieldCheck, title: "Security & Compliance", desc: "Locked networks and governance" },
              { icon: Repeat, title: "Automated Workflows", desc: "Rapid feedback loops" },
              { icon: Compass, title: "Platform Strategy", desc: "Guided technical direction" },
              { icon: TrendingDown, title: "FinOps Optimization", desc: "Cost reduction that scales" },
              { icon: PlatformBoxLogoIcon, title: "PlatformBox Core", desc: "A connected platform suite", isLogo: true },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.isLogo ? "bg-zinc-900" : "bg-accent/10"} mb-4`}>
                    <Icon className={item.isLogo ? "h-6 w-6" : "h-5 w-5 text-accent"} />
                  </div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        <section className="border-y border-white/10 bg-zinc-950/80">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:gap-16 md:py-28">
            <FadeIn>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                01 / The Bottleneck
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Scaling breaks deployments.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
                Scaling your engineering team post-Series A usually breaks
                deployments. Senior developers can spend up to 30% of their time managing
                AWS and CI/CD pipelines instead of shipping features, and new
                hires take weeks to safely deploy code.
              </p>
            </FadeIn>
          </div>
        </section>

        <section id="solution" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <FadeIn className="mb-12 max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
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
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
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
                    <div className="mb-3 flex items-center gap-2">
                      <ROIIcon className="h-5 w-5 text-accent" />
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                        Fixed Project Fee
                      </p>
                    </div>
                    <p className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                      €20,000
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                      Fixed project fee, delivered in 14 working days.
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                      You own everything at handover — optional ongoing advisory available.
                    </p>
                  </div>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
                  >
                    Book an Architecture Audit
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </FadeIn>
            </div>

            <div className="mt-10">
              <RoiCalculator />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
