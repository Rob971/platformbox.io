"use client";

import { motion } from "framer-motion";
import { ArrowRight, Boxes, Eye, Gauge, LayoutDashboard, Database, KeyRound } from "lucide-react";
import { Header } from "../header";
import { Footer } from "../footer";
import { TimelineStepper } from "./timeline-stepper";
import { PageNav } from "../page-nav";
import { DeliverableCard } from "./deliverable-card";
import { PipelineVisualizer } from "./pipeline-visualizer";
import { EnvDashboard } from "./env-dashboard";
import { K8sArchitecture } from "./k8s-architecture";
import { ObservabilityDashboard } from "./observability-dashboard";
import { BackstagePortal } from "./backstage-portal";
import { DatabaseProvisioning } from "./database-provisioning";
import { SecretManagement } from "./secret-management";
import { BOOKING_URL, BOOKING_LABEL } from "@/lib/constants";
import { fadeUp, stagger, FadeIn } from "@/lib/motion";
import { blueprint } from "@/lib/content";
import { EvidenceLinks } from "@/components/proof/evidence-links";
import { ProofSurfaceSection } from "@/components/sections/proof-surface-section";
import { InfrastructureIcon, PipelineIcon, EphemeralIcon } from "../icons";

// VERBATIM from the frozen reference implementation:
// terraform/modules/network/main.tf. Note the NAT *instance* — a
// deliberate cost decision (ADR-002): ~$3.36/mo against ~$32/mo for a
// managed NAT Gateway. IMDSv2 enforced (ADR-006).
const terraformModule = `resource "aws_instance" "nat" {
  count = var.enable_nat_instance ? 1 : 0

  ami                    = data.aws_ami.al2023_arm64[0].id
  instance_type          = var.nat_instance_type   # t4g.nano
  subnet_id              = aws_subnet.public[0].id
  vpc_security_group_ids = [aws_security_group.nat[0].id]
  iam_instance_profile   = aws_iam_instance_profile.nat[0].name
  source_dest_check      = false

  metadata_options {
    http_tokens   = "required"   # IMDSv2 only
    http_endpoint = "enabled"
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
          image: \${CI_REGISTRY_IMAGE}/\${SERVICE}@\${IMAGE_DIGEST}
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


const prometheusScrapeConfig = `# ADR-018 — plain Prometheus over the Prometheus Operator.
# One scrape job covers both services across all three tiers.
scrape_configs:
  - job_name: platformbox-services
    kubernetes_sd_configs:
      - role: endpoints
        namespaces:
          names:
            - demo-service
            - qa
            - uat
    relabel_configs:
      # Only the two application services — never ArgoCD or kube-system.
      - source_labels: [__meta_kubernetes_service_label_app_kubernetes_io_name]
        regex: (demo-service|orders-service)
        action: keep
      - source_labels: [__meta_kubernetes_endpoint_port_name]
        regex: http
        action: keep`;

const beforeAfter = [
  { before: "3 weeks to ship a new service", after: "1 click — under 5 minutes" },
  { before: "Every deployment needs DevOps help", after: "A self-service golden path" },
  { before: "Idle staging environments burning cloud budget", after: "Auto-destroy on merge — €0 waste" },
];

const pageSections = [
  { id: "blueprint", label: "Blueprint" },
  { id: "timeline", label: "Timeline" },
  { id: "deliverables", label: "Deliverables" },
  { id: "pipeline", label: "Pipeline" },
  { id: "platform", label: "Platform" },
  { id: "roi", label: "Results" },
];

export function ShowcasePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 grid-glow" aria-hidden />

      <PageNav sections={pageSections} />

      <Header showHomeLink />

      <main className="relative z-10 flex-1" id="main-content">
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 text-center sm:pt-24 md:pt-28">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center">
            <motion.p variants={fadeUp} className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">The 14-Day Blueprint</motion.p>
            <motion.h1 variants={fadeUp} className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.08]">See exactly what your team receives</motion.h1>
            <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base text-foreground-tertiary leading-relaxed sm:text-lg">A visual walkthrough of the platform that ships in 14 working days — from modular Terraform to production Kubernetes.</motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#deliverables" className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent-strong px-5 text-sm font-medium text-white transition-colors hover:bg-accent"><Eye className="h-4 w-4" />Explore Deliverables</a>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-lg border border-border-strong px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover">{BOOKING_LABEL}<ArrowRight className="h-4 w-4" /></a>
            </motion.div>
          </motion.div>
        </section>

        <section id="blueprint" className="mx-auto max-w-5xl px-6 pb-20 pt-20">
          <FadeIn className="mb-10 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">{blueprint.eyebrow}</p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{blueprint.headline}</h2>
            <p className="mt-3 text-sm text-foreground-tertiary">{blueprint.sub}</p>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blueprint.phases.map((phase, i) => (
              <FadeIn key={phase.title} delay={i * 0.03}>
                <div className="h-full rounded-xl border border-border bg-card p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-accent">
                    Phase {i + 1}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-foreground">{phase.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-foreground-tertiary">{phase.text}</p>
                  <EvidenceLinks claims={phase.claims} />
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <p className="mt-6 rounded-lg border border-border bg-card px-4 py-3 text-center text-xs leading-relaxed text-foreground-tertiary sm:text-sm">
              {blueprint.disclaimer}
            </p>
          </FadeIn>
        </section>

        <section id="timeline" className="mx-auto max-w-5xl px-6 pb-20">
          <FadeIn className="mb-8 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">01 / The Timeline</p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Your 14-Day Journey</h2>
            <p className="mt-3 text-sm text-foreground-tertiary">Two weeks, one fixed-price engagement — from foundation to a working path to production.</p>
          </FadeIn>
          <FadeIn>
            <TimelineStepper />
          </FadeIn>
        </section>

        <section id="deliverables" className="border-t border-border mx-auto max-w-5xl px-6 pb-20 pt-20">
          <FadeIn className="mb-10 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">02 / The Four Deliverables</p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">What Your Team Receives</h2>
            <p className="mt-3 text-sm text-foreground-tertiary">Click any card to view sample code, config, or interactive demos.</p>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            <DeliverableCard icon={InfrastructureIcon} title="Infrastructure as Code" text="Fully modular Terraform templates for self-serve provisioning." code={terraformModule} codeLanguage="Terraform" />
            <DeliverableCard icon={PipelineIcon} title="DevSecOps CI/CD" text="Standardized CI/CD pipelines (GitHub or GitLab) with automated testing and security scanning." code={gitlabCI} codeLanguage="GitLab CI (sample — GitHub Actions available)" />
            <DeliverableCard icon={EphemeralIcon} title="Ephemeral Environments" text="Auto-generated preview environments for every Pull Request to eliminate staging bottlenecks."><EnvDashboard /></DeliverableCard>
            <DeliverableCard icon={Boxes} title="Production Kubernetes" text="EKS clusters with HPA, ingress, and monitoring — built on your account and handed to you to own." code={k8sManifest} codeLanguage="Kubernetes"><K8sArchitecture /></DeliverableCard>
          </div>
        </section>

        <section id="pipeline" className="border-t border-border mx-auto max-w-5xl px-6 pb-20 pt-20">
          <FadeIn className="mb-8 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">03 / The CI/CD Pipeline</p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">From Commit to Production</h2>
            <p className="mt-3 text-sm text-foreground-tertiary">Six automated stages — click any stage for details.</p>
          </FadeIn>
          <FadeIn>
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <PipelineVisualizer />
            </div>
          </FadeIn>
        </section>

        <section id="platform" className="border-t border-border mx-auto max-w-5xl px-6 pb-20 pt-20">
          <FadeIn className="mb-10 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">04 / Platform Capabilities</p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Proven now. Delivered later.</h2>
            <p className="mt-3 text-sm text-foreground-tertiary">What the reference implementation proves today, and what ships as an optional Scale or Enterprise extension.</p>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            <DeliverableCard icon={Gauge} title="Observability — proven" text="Prometheus + Grafana, live-proven (ADR-018): 12/12 scrape targets across both services and all three tiers. Ephemeral by design — cost-aware, not an always-on stack." code={prometheusScrapeConfig} codeLanguage="Prometheus"><ObservabilityDashboard /></DeliverableCard>
            <DeliverableCard icon={LayoutDashboard} title="Developer Portal — optional" text="A Backstage-style service catalog and software scaffolder, delivered as a Scale or Enterprise extension. Not part of the reference implementation."><BackstagePortal /></DeliverableCard>
            <DeliverableCard icon={Database} title="Self-Service Databases — optional" text="Self-service, encrypted RDS provisioning declared from service config, delivered as a Scale or Enterprise extension."><DatabaseProvisioning /></DeliverableCard>
            <DeliverableCard icon={KeyRound} title="Secret Management — optional" text="Vault or AWS Secrets Manager productization with the CSI driver, delivered as a Scale or Enterprise extension. KMS-encrypted secrets and least-privilege IAM are already in the baseline."><SecretManagement /></DeliverableCard>
          </div>
        </section>


        <section id="roi" className="border-t border-border mx-auto max-w-5xl px-6 pb-24 pt-20">
          <FadeIn className="mb-8 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">05 / Before → After</p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">The Transformation</h2>
            <p className="mt-3 text-sm text-foreground-tertiary">What changes when you stop doing platform engineering yourself.</p>
          </FadeIn>
          <div className="grid gap-4 lg:grid-cols-2">
            {beforeAfter.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex items-stretch gap-0 rounded-xl border border-border overflow-hidden">
                  <div className="flex-1 bg-red-950/20 p-5 sm:p-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-red-400 mb-2">Before</p>
                    <p className="text-sm text-foreground-tertiary leading-relaxed">{item.before}</p>
                  </div>
                  <div className="w-px bg-card-hover shrink-0" />
                  <div className="flex-1 bg-green-950/15 p-5 sm:p-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-green-400 mb-2">After</p>
                    <p className="text-sm text-foreground-secondary leading-relaxed font-medium">{item.after}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="mt-6 flex justify-center">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent-strong px-6 text-sm font-medium text-white transition-colors hover:bg-accent">
                {BOOKING_LABEL}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </FadeIn>
        </section>

        <ProofSurfaceSection />
      </main>

      <Footer />
    </div>
  );
}
