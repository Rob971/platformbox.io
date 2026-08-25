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
import { InfrastructureIcon, PipelineIcon, EphemeralIcon } from "../icons";

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


const otelCollectorConfig = `receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
    timeout: 5s
    send_batch_size: 512
  memory_limiter:
    limit_mib: 512
    spike_limit_mib: 128

exporters:
  prometheus:
    endpoint: "0.0.0.0:9464"
  loki:
    endpoint: "http://loki:3100/loki/api/v1/push"
  otlp/tempo:
    endpoint: "http://tempo:4317"
    tls:
      insecure: true

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [otlp/tempo]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [prometheus]
    logs:
      receivers: [otlp]
      processors: [batch]
      exporters: [loki]`;

const backstageCatalog = `apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: api-gateway
  description: Edge API gateway for all services
  annotations:
    github.com/project-slug: acme/api-gateway
    backstage.io/techdocs-ref: dir:.
  tags:
    - golang
    - grpc
    - platform
  links:
    - url: https://grafana.acme.dev/d/api-gateway
      title: Dashboard
      icon: dashboard
spec:
  type: service
  lifecycle: production
  owner: platform-team
  system: api-platform
  providesApis:
    - api-gateway-grpc`;

const terraformRDS = `module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "6.5.0"

  identifier = "\${var.service}-\${var.environment}"

  engine               = "postgres"
  engine_version       = "16.3"
  instance_class       = "db.t4g.medium"
  allocated_storage    = 100
  storage_encrypted    = true

  db_name  = var.service
  username = var.service
  manage_master_user_password = true

  vpc_security_group_ids = [module.sg.id]
  db_subnet_group_name   = module.vpc.db_subnet_group
  publicly_accessible    = false

  backup_retention_period = 14
  deletion_protection     = true
  skip_final_snapshot     = false

  tags = {
    Service     = var.service
    Environment = var.environment
    ManagedBy   = "platformbox"
  }
}`;

const externalSecrets = `apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: api-gateway-secrets
spec:
  refreshInterval: "1h"
  secretStoreRef:
    name: aws-secrets-manager
    kind: ClusterSecretStore
  target:
    name: api-gateway-secrets
    creationPolicy: Owner
  data:
    - secretKey: DB_PASSWORD
      remoteRef:
        key: prod/api-gateway/db-password
        property: password
    - secretKey: API_KEY
      remoteRef:
        key: prod/api-gateway/api-key
---
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: api-gateway-secrets
spec:
  provider: aws
  parameters:
    objects: |
      - objectName: "prod/api-gateway/db-password"
        objectType: "secretsmanager"
      - objectName: "prod/api-gateway/api-key"
        objectType: "secretsmanager"
  secretObjects:
    - secretName: db-credentials
      type: Opaque
      data:
        - key: password
          objectName: db-password`;

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
            <DeliverableCard icon={Boxes} title="Production Kubernetes" text="Highly available EKS clusters managed for you with HPA, ingress, and monitoring." code={k8sManifest} codeLanguage="Kubernetes"><K8sArchitecture /></DeliverableCard>
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
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Built In From Day One</h2>
            <p className="mt-3 text-sm text-foreground-tertiary">Included in the 14-working-day engagement — observability, developer portal, data, and security built in from day one.</p>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            <DeliverableCard icon={Gauge} title="Observability Stack" text="OpenTelemetry auto-instrumentation with Prometheus, Grafana, and Loki — every service ships with dashboards and alerts." code={otelCollectorConfig} codeLanguage="OpenTelemetry"><ObservabilityDashboard /></DeliverableCard>
            <DeliverableCard icon={LayoutDashboard} title="Developer Portal" text="Optional developer portal — a Backstage-ready service catalog and software scaffolder so teams discover, create, and own services autonomously." code={backstageCatalog} codeLanguage="catalog-info.yaml"><BackstagePortal /></DeliverableCard>
            <DeliverableCard icon={Database} title="Self-Service Databases" text="Declare a database in your service config and get a production-ready, encrypted RDS instance with automated backups — no ticket required." code={terraformRDS} codeLanguage="Terraform"><DatabaseProvisioning /></DeliverableCard>
            <DeliverableCard icon={KeyRound} title="Secret Management" text="Vault or AWS Secrets Manager integrated with CSI driver — credentials auto-rotate, never touch etcd, and mount as files without code changes." code={externalSecrets} codeLanguage="Kubernetes"><SecretManagement /></DeliverableCard>
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
      </main>

      <Footer />
    </div>
  );
}
