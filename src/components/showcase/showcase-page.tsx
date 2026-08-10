"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Boxes, Code2, GitBranch, Layers, Eye } from "lucide-react";
import type { ReactNode } from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import { TimelineStepper } from "./timeline-stepper";
import { SectionNav } from "./section-nav";
import { DeliverableCard } from "./deliverable-card";
import { PipelineVisualizer } from "./pipeline-visualizer";
import { EnvDashboard } from "./env-dashboard";
import { K8sArchitecture } from "./k8s-architecture";

const BOOKING_URL = "https://www.cal.eu/roberto-platformbox";

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

const k8sManifest = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway
  labels:
    app: api-gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-gateway
  template:
    metadata:
      labels:
        app: api-gateway
    spec:
      serviceAccountName: api-gateway
      containers:
        - name: api-gateway
          image: \${ECR_REPO}:\${IMAGE_TAG}
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: 250m
              memory: 256Mi
            limits:
              cpu: 500m
              memory: 512Mi
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 10
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-gateway
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70`;

const beforeAfter = [
  { before: "3 weeks to ship a new service", after: "1 click — under 5 minutes" },
  { before: "€120K+ for a Platform Engineer hire", after: "€20K fixed, delivered in 14 days" },
  { before: "Idle staging environments burning cloud budget", after: "Auto-destroy on merge — €0 waste" },
];

export function ShowcasePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 grid-glow" aria-hidden />

      <SectionNav />

      <Header showHomeLink />

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

        <section id="timeline" className="mx-auto max-w-5xl px-6 pb-20">
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
            <DeliverableCard icon={Boxes} title="Production Kubernetes" text="Highly available EKS clusters managed for you with HPA, ingress, and monitoring." code={k8sManifest} codeLanguage="Kubernetes"><K8sArchitecture /></DeliverableCard>
          </div>
        </section>

        <section id="pipeline" className="mx-auto max-w-5xl px-6 pb-20">
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

        <section id="roi" className="mx-auto max-w-5xl px-6 pb-24">
          <FadeIn className="mb-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Before PlatformBox → After</h2>
            <p className="mt-3 text-sm text-zinc-400">What changes when you stop doing platform engineering yourself.</p>
          </FadeIn>
          <div className="grid gap-4 lg:grid-cols-2">
            {beforeAfter.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex items-stretch gap-0 rounded-xl border border-white/10 overflow-hidden">
                  <div className="flex-1 bg-red-950/20 p-5 sm:p-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-red-400 mb-2">Before</p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.before}</p>
                  </div>
                  <div className="w-px bg-white/10 shrink-0" />
                  <div className="flex-1 bg-green-950/15 p-5 sm:p-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-green-400 mb-2">After</p>
                    <p className="text-sm text-zinc-200 leading-relaxed font-medium">{item.after}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="mt-6 flex justify-center">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200">
                Book an Architecture Audit
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  );
}
