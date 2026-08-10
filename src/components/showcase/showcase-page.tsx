"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Boxes, Code2, GitBranch, Layers, Check, Eye } from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";
import { TimelineStepper } from "./timeline-stepper";
import { DeliverableCard } from "./deliverable-card";
import { PipelineVisualizer } from "./pipeline-visualizer";
import { EnvDashboard } from "./env-dashboard";
import { K8sArchitecture } from "./k8s-architecture";

const BOOKING_URL = "https://www.planfy.com/booking-widget/platformbox-io";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function FadeIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ delay }}>
      {children}
    </motion.div>
  );
}

const terraformModule = `module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.5.1"

  name = "platformbox-\${var.environment}"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = false
  enable_vpn_gateway = false

  tags = {
    Environment = var.environment
    ManagedBy   = "platformbox"
  }
}`;

const gitlabCI = `stages:
  - test
  - build
  - deploy-preview
  - deploy-prod

sast:
  stage: test
  image: registry.gitlab.com/security-products/sast:latest
  script: /analyzer run
  artifacts:
    reports:
      sast: gl-sast-report.json

build:
  stage: build
  script:
    - docker build -t \${CI_REGISTRY_IMAGE}:\${CI_COMMIT_SHA} .
    - docker push \${CI_REGISTRY_IMAGE}:\${CI_COMMIT_SHA}

deploy-preview:
  stage: deploy-preview
  script:
    - terraform apply -auto-approve environments/preview/
  environment:
    name: preview/pr-\${CI_MERGE_REQUEST_IID}
    on_stop: destroy-preview
  rules:
    - if: \$CI_PIPELINE_SOURCE == "merge_request_event"

deploy-prod:
  stage: deploy-prod
  script:
    - terraform apply -auto-approve environments/prod/
  environment: production
  rules:
    - if: \$CI_COMMIT_BRANCH == "main"
  when: manual`;

const economics = [
  "Avoided Headcount: Bypass the 120k+ salary and 3-month hiring cycle of a dedicated Platform Engineer.",
  "Reclaimed Payroll: Stop losing $200k/year in engineering value to manual deployment friction.",
  "Cloud Savings: Ephemeral environments destroy themselves upon merge, eliminating idle AWS waste.",
];

export function ShowcasePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 grid-glow" aria-hidden />

      <header className="relative z-20 border-b border-white/10 bg-zinc-950/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-sm font-semibold tracking-tight text-white">
            PlatformBox<span className="text-accent">.io</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:inline">Home</Link>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:inline">Book an Architecture Audit</a>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 text-center sm:pt-24 md:pt-28">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center">
            <motion.p variants={fadeUp} className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">The 14-Day Blueprint</motion.p>
            <motion.h1 variants={fadeUp} className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.1]">See exactly what your team receives</motion.h1>
            <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base text-zinc-400 leading-relaxed sm:text-lg">A visual walkthrough of the four deliverables that ship in 14 days — from modular Terraform to production Kubernetes.</motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#deliverables" className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"><Eye className="h-4 w-4" />Explore Deliverables</a>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/20 px-5 text-sm font-medium text-white transition-colors hover:bg-white/5">Book an Architecture Audit<ArrowRight className="h-4 w-4" /></a>
            </motion.div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20">
          <FadeIn>
            <h2 className="mb-8 text-center text-sm font-medium uppercase tracking-[0.15em] text-zinc-500">14-Day Delivery Timeline</h2>
            <TimelineStepper />
          </FadeIn>
        </section>

        <section id="deliverables" className="mx-auto max-w-5xl px-6 pb-20">
          <FadeIn className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">The Four Deliverables</h2>
            <p className="mt-3 text-sm text-zinc-400">Click any card to view sample code, config, or interactive demos.</p>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            <DeliverableCard icon={Code2} title="Infrastructure as Code" text="Fully modular Terraform templates for self-serve provisioning." code={terraformModule} codeLanguage="Terraform" />
            <DeliverableCard icon={GitBranch} title="DevSecOps CI/CD" text="Standardized GitLab pipelines with automated testing and security scanning." code={gitlabCI} codeLanguage=".gitlab-ci.yml" />
            <DeliverableCard icon={Layers} title="Ephemeral Environments" text="Auto-generated preview environments for every Pull Request to eliminate staging bottlenecks."><EnvDashboard /></DeliverableCard>
            <DeliverableCard icon={Boxes} title="Production Kubernetes" text="Highly available EKS clusters managed for you with HPA, ingress, and monitoring."><K8sArchitecture /></DeliverableCard>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20">
          <FadeIn className="mb-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">The CI/CD Pipeline</h2>
            <p className="mt-3 text-sm text-zinc-400">From commit to production — click any stage for details.</p>
          </FadeIn>
          <FadeIn>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <PipelineVisualizer />
            </div>
          </FadeIn>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-24">
          <FadeIn className="mb-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">The Economics of Velocity</h2>
            <p className="mt-3 text-sm text-zinc-400">What you save when you stop doing platform engineering yourself.</p>
          </FadeIn>
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <FadeIn>
              <ul className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                {economics.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm leading-relaxed text-zinc-300 sm:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-accent/40 bg-gradient-to-br from-accent/20 via-zinc-950 to-zinc-950 p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/20 blur-3xl" aria-hidden />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Fixed Project Fee</p>
                  <p className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">20,000<span className="ml-2 text-lg font-medium text-zinc-400">EUR</span></p>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">The Investment: 20,000 EUR (Fixed Project Fee) | Timeline: 14 Days.</p>
                </div>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200">Book an Architecture Audit<ArrowRight className="h-4 w-4" aria-hidden /></a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-zinc-500">PlatformBox.io &copy; 2026</p>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">build {process.env.NEXT_PUBLIC_COMMIT_SHA?.slice(0, 7) ?? "dev"}</p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="mailto:roberto@platformbox.io" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              roberto@platformbox.io
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
