// Single source of truth for marketing copy, offers, and the 14-working-day delivery.
// Provider names and pricing live here only, so the site stays provider-neutral
// (AWS/EKS are the reference implementation, not the only option).

import { IDP_REPO_URL } from "@/lib/constants";

export const hero = {
  eyebrow: "PlatformBox Launch · 14 working days",
  headline: "Your developer platform. Live in 14 working days.",
  sub: "Give your engineering teams a standardized, self-service path from Git to production — without spending months building an internal platform.",
} as const;

export const problem = {
  eyebrow: "01 / The Problem",
  headline: "Your engineering team is becoming your platform team.",
  sub: "As services multiply, infrastructure work quietly absorbs your most senior people. PlatformBox turns those repeated tasks into standardized, self-service workflows.",
  painPoints: [
    "Every deployment needs DevOps help",
    "Infrastructure provisioning is slow",
    "Teams solve the same problems repeatedly",
    "Kubernetes and CI/CD complexity keeps growing",
    "Senior engineers lose time on infrastructure",
  ],
} as const;

export const outcome = {
  eyebrow: "02 / The Outcome",
  headline: "From Git push to production, on a standardized golden path.",
  sub: "The product isn't Terraform or Kubernetes. The product is the shorter path — one self-service workflow every team follows.",
  steps: [
    { label: "Code", note: "Developer pushes code" },
    { label: "Golden Path", note: "Standard template" },
    { label: "Preview", note: "Ephemeral environment" },
    { label: "DEV", note: "Deploy & verify" },
    { label: "QA", note: "Automated gate" },
    { label: "UAT", note: "Manual approval" },
    { label: "PROD", note: "Promoted to production" },
    { label: "Observe", note: "Prometheus + Grafana" },
    { label: "Repeat", note: "Same path, every service" },
  ],
} as const;

export const beforeAfter = {
  eyebrow: "03 / Before → After",
  headline: "The shorter path to production.",
  sub: "You don't buy Terraform, Kubernetes, or a pipeline. You buy the path between them.",
  before: [
    "Developer opens a DevOps ticket",
    "Manual infrastructure work",
    "Different deployment patterns per team",
    "Environment provisioning delays",
    "Platform knowledge concentrated in a few engineers",
    "Repeated operational work",
  ],
  after: [
    "Developer uses a golden path",
    "Infrastructure is standardized",
    "Preview environments are automated",
    "Deployment follows a repeatable workflow",
    "Security controls are built into the path",
    "Platform knowledge is encoded in the system",
  ],
} as const;

export const delivery = {
  eyebrow: "04 / The 14-Day Delivery",
  headline: "Exactly what gets delivered.",
  sub: "Fourteen working days — about three calendar weeks — from kickoff to a working developer path to production.",
  mechanism:
    "Why 14 days is credible: PlatformBox does not build your platform from scratch. It adapts a pre-engineered reference architecture — reusable Terraform modules, a standard golden path, security controls, CI/CD, and validation — proven end-to-end in the public reference implementation.",
  weeks: [
    {
      label: "Week 1 — Foundation (Days 1–5)",
      phases: [
        { day: "Days 1–2", title: "Architecture & foundation", description: "Current-state review, target architecture, and the AWS/EKS foundation." },
        { day: "Days 3–5", title: "Infrastructure & IAM", description: "Terraform modules, networking, RBAC, secrets, and environments." },
      ],
    },
    {
      label: "Week 2 — Delivery path (Days 6–10)",
      phases: [
        { day: "Days 6–7", title: "CI/CD & environments", description: "Standard pipelines, preview environments, DEV → QA → UAT promotion gates, GitOps reconciliation, and the production deployment workflow." },
        { day: "Days 8–10", title: "Golden paths & preview", description: "Service template, repository bootstrap, and preview environments." },
      ],
    },
    {
      label: "Week 3 — Production readiness (Days 11–14)",
      phases: [
        { day: "Days 11–12", title: "Security & observability", description: "Security controls, live-proven application observability (Prometheus + Grafana), and cost controls." },
        { day: "Days 13–14", title: "Validation & handover", description: "End-to-end validation, documentation, training, and a phase-2 backlog." },
      ],
    },
  ],
} as const;

export const technology = {
  eyebrow: "11 / Technology",
  headline: "Integrates with the tools you already have.",
  sub: "PlatformBox is not a replacement for your stack — it is the layer that makes it self-service. Each tool keeps its job; PlatformBox owns the path between them.",
  roles: [
    { name: "Terraform", role: "Infrastructure lifecycle", accent: false, claims: ["pbx.foundation.iac-terraform"] },
    { name: "Kubernetes / EKS", role: "Application runtime", accent: false, claims: ["pbx.platform.kubernetes-eks"] },
    { name: "GitHub / GitLab", role: "Source and workflow", accent: false, claims: ["__process__"] },
    { name: "GitOps / CI/CD", role: "Application delivery", accent: false, claims: ["pbx.delivery.gitops", "pbx.delivery.ci-cd"] },
    { name: "PlatformBox", role: "Golden paths and orchestration", accent: true, claims: ["pbx.golden-path.service-scaffold", "pbx.golden-path.build-to-production"] },
  ],
} as const;

export type Offer = {
  id: "launch" | "scale" | "enterprise";
  name: string;
  price: string;
  delivery: string;
  blurb: string;
  recommended?: boolean;
  features: string[];
  /** Capability ids this offer asserts. Empty / omitted = no capability claims. */
  claims?: string[];
};

export const offers: Offer[] = [
  {
    id: "launch",
    name: "PlatformBox Launch",
    price: "€20,000",
    delivery: "14 working days",
    blurb: "One golden path proven to production — your first standardized, self-service route from Git to production.",
    claims: [
      "pbx.foundation.aws",
      "pbx.platform.kubernetes-eks",
      "pbx.foundation.iac-terraform",
      "pbx.delivery.ci-cd",
      "pbx.golden-path.build-to-production",
      "pbx.environments.preview",
      "pbx.delivery.production-promotion",
      "pbx.security.scanning",
      "pbx.delivery.handover",
    ],
    features: [
      "AWS/EKS foundation",
      "Terraform modules",
      "CI/CD (GitHub or GitLab)",
      "One golden path proven to production",
      "Preview environments",
      "Production deployment workflow",
      "Up to 2 initial services onboarded",
      "Baseline security",
      "Documentation & runbooks",
      "Handover & training",
    ],
  },
  {
    id: "scale",
    name: "PlatformBox Scale",
    price: "€39,000",
    delivery: "14–21 days",
    recommended: true,
    blurb: "A reusable platform for multiple engineering teams — golden paths, environments, observability, and governance.",
    features: [
      "Everything in Launch",
      "2–4 golden paths",
      "Multiple environments",
      "Advanced IAM/RBAC",
      "Observability",
      "FinOps",
      "Additional security & governance",
      "Team onboarding",
      "60 days post-launch support",
    ],
  },
  {
    id: "enterprise",
    name: "PlatformBox Enterprise",
    price: "€60,000+",
    delivery: "Scoped",
    blurb: "Complex environments and organizational/platform requirements — multi-account AWS, compliance, and multi-team architecture.",
    features: [
      "Everything in Scale",
      "Multiple AWS accounts & clusters",
      "Complex networking",
      "Advanced IAM/SSO",
      "Compliance requirements",
      "Multi-team platform architecture",
      "Custom integrations",
      "90 days post-launch support",
    ],
  },
];

export const assessment = {
  name: "Platform Readiness Assessment",
  price: "€2,500",
  duration: "3–5 days",
  blurb: "A technical deep-dive that maps your current state, bottlenecks, and target architecture before you commit.",
  note: "€2,500 is fully credited toward PlatformBox Launch if you proceed.",
  deliverables: [
    "Current-state assessment",
    "Platform maturity & bottleneck analysis",
    "Target architecture",
    "Technical risks",
    "14-working-day implementation plan",
    "Fixed-price proposal",
  ],
} as const;

export const care = {
  name: "PlatformBox Care",
  price: "€2,000–€4,000/month",
  position: "Your platform engineering team, without hiring one.",
  blurb: "Ongoing platform engineering expertise — maintenance, upgrades, and evolution.",
  items: [
    "Platform maintenance",
    "Terraform & module updates",
    "Kubernetes upgrades",
    "Security updates",
    "New golden paths",
    "Architecture support",
    "FinOps reviews",
    "Platform health reviews",
  ],
} as const;

export const pricingNote =
  "A fixed-price implementation that is live in 14 working days. No hourly rates." as const;

export const fit = {
  eyebrow: "14 / Is It a Fit?",
  headline: "Who PlatformBox is for — and who it isn't.",
  strong: [
    "100–500 engineers",
    "AWS / EKS, or an imminent Kubernetes migration",
    "Multiple engineering teams",
    "Growing infrastructure complexity",
    "A small or overloaded platform/DevOps team",
    "You need results quickly",
  ],
  not: [
    "Fewer than ~50 engineers",
    "Already have a mature, large platform team",
    "Require a fully bespoke multi-cloud architecture",
    "Can't commit to a clearly defined 14-working-day scope",
  ],
} as const;

export const day14 = {
  eyebrow: "05 / Day 14",
  headline: "What is actually working on Day 14?",
  sub: "Not a demo or a proof of concept — a working developer path to production, live in your environment.",
  steps: [
    "Create service",
    "Use golden path",
    "Infrastructure provisioned",
    "Preview environment created",
    "Automated security checks",
    "Production deployment",
  ],
  claim: "Day 14 = a working developer path to production.",
  capabilities: [
    "Create a new service from the standard template",
    "Provision its required infrastructure",
    "Create a preview environment",
    "Run CI/CD automatically",
    "Pass security checks",
    "Deploy to production",
    "See the service documented and registered",
    "Hand the platform over to the internal team",
  ],
  // The capability each day-14 capability rests on — the check refuses claims
  // the vendored catalogue does not authorise.
  claims: [
    "pbx.golden-path.service-scaffold",
    "pbx.foundation.iac-terraform",
    "pbx.environments.preview",
    "pbx.delivery.ci-cd",
    "pbx.security.scanning",
    "pbx.delivery.production-promotion",
    "pbx.delivery.handover",
    "pbx.delivery.handover",
  ],
  distinction:
    "The reference implementation proves this path end-to-end, through to production — both services promoted from UAT's approved build with no rebuild, ArgoCD reconciled to healthy, and a real production rollback demonstrated (ADR-019, ADR-020). Your engagement delivers the same path on your stack.",
} as const;

export const whyDifferent = {
  eyebrow: "06 / Why PlatformBox",
  headline: "Why PlatformBox over building it yourself or adopting an IDP product?",
  sub: "Building internally gives control but costs months of senior engineering. Adopting an IDP product gives tooling, not a finished platform. PlatformBox delivers the implemented platform — pre-engineered, standardized, and handed to your team.",
  rows: [
    { internal: "Months of platform engineering", product: "Tooling, but the platform work remains", platformbox: "14 working days, fixed scope" },
    { internal: "Build and wire every tool yourself", product: "Still must integrate with your stack", platformbox: "Integrated golden path" },
    { internal: "Architecture decisions still unresolved", product: "Opinionated product — your fit varies", platformbox: "Proven reference architecture" },
    { internal: "Long time before developer adoption", product: "Workflows still need engineering", platformbox: "Working developer path at handover" },
    { internal: "Ongoing ownership burden from day one", product: "Product plus your platform team", platformbox: "You own it — we hand it back" },
  ],
  message: "Build internally for control. Adopt a product for tooling. Choose PlatformBox for the implemented platform — delivered as a defined service, evidence-backed.",
} as const;

export const assessmentSection = {
  eyebrow: "08 / Risk Reduction",
  headline: "Before we promise 14 working days, we assess your environment.",
  sub: "PlatformBox does not start with a blind fixed-price promise. We first assess your architecture, delivery workflow, and platform constraints so the 14-working-day scope is realistic.",
  outputs: [
    "Current-state map",
    "Bottleneck analysis",
    "Platform maturity assessment",
    "Target architecture",
    "Risks and dependencies",
    "14-working-day implementation scope",
    "Fixed-price recommendation",
  ],
  credit: "€2,500 — fully credited toward PlatformBox Launch if you proceed.",
} as const;

export const scopeAssumptions = {
  eyebrow: "09 / Scope & Assumptions",
  headline: "What makes the 14-working-day promise credible.",
  sub: "The 14-working-day delivery assumes a defined reference architecture and customer readiness. These assumptions are agreed during the Platform Assessment, before work begins.",
  items: [
    "AWS access is available",
    "Required repositories and accounts are accessible",
    "Required stakeholders are available for decisions",
    "Network and IAM prerequisites are known",
    "Implementation scope is agreed during the Assessment",
  ],
  note: "If your environment doesn't fit these assumptions, the Platform Assessment tells you before you commit.",
} as const;

export const ownership = {
  eyebrow: "10 / Ownership",
  headline: "You own the platform.",
  sub: "PlatformBox builds on your stack and hands it back. Nothing is trapped inside a proprietary runtime.",
  items: [
    "You own your AWS resources",
    "You own your repositories",
    "You own your Terraform",
    "You own your deployment configuration",
    "You own the resulting platform",
  ],
  noDependency:
    "PlatformBox does not create dependency by locking infrastructure into a proprietary runtime.",
  careNote:
    "PlatformBox Care is optional ongoing expertise — not a requirement to keep the platform running.",
} as const;

export const lockIn = {
  title: "Built on your stack. Owned by you.",
  message:
    "PlatformBox integrates the tools and infrastructure you already use. The goal is to give your team a repeatable developer platform — not trap you inside a proprietary infrastructure layer.",
  stack: ["AWS", "Kubernetes", "Terraform", "GitHub", "GitLab"],
} as const;

export const architecture = {
  eyebrow: "12 / Reference Architecture",
  headline: "A clean path from developer to production.",
  sub: "One golden path, on your stack — no proprietary runtime, no black box.",
  flow: [
    "Developer",
    "PlatformBox Golden Path",
    "Source / CI/CD",
    "Infrastructure + Policy",
    "AWS / Kubernetes",
    "Production",
  ],
  ctaLabel: "View the technical reference architecture",
  ctaHref: "/architecture",
} as const;

export const whichPackage = {
  eyebrow: "Quick guide",
  headline: "Which package is right for me?",
  items: [
    { title: "Choose Launch if", text: "You need your first standardized developer path." },
    { title: "Choose Scale if", text: "Multiple teams need standardized workflows and platform governance." },
    { title: "Choose Enterprise if", text: "You have complex AWS, networking, compliance, or multi-account requirements." },
    { title: "Start with Assessment if", text: "You are unsure whether your environment can realistically fit the 14-working-day model." },
  ],
} as const;

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Why not build this ourselves?",
    a: "You can — and some teams should. PlatformBox is for teams that would otherwise spend months redirecting senior engineers into platform work. We deliver a working developer path to production in 14 working days using a proven reference architecture, then hand it to your team to own and operate. You get the result without the months of internal engineering, the unresolved architecture decisions, and the adoption delay.",
  },
  {
    q: "What exactly is delivered in 14 working days?",
    a: "A working developer path to production: an AWS/EKS foundation, Terraform modules, CI/CD, one golden path proven to production, preview environments, baseline security, documentation, and a live handover. On day 14, a developer can create a service from the standard template, deploy it to a preview environment, pass automated security checks, and promote it to production.",
  },
  {
    q: "Do you replace Terraform, GitHub, GitLab, or Kubernetes?",
    a: "No. PlatformBox integrates the tools you already use and makes them work together. It owns the golden path, not the infrastructure beneath it.",
  },
  {
    q: "Do you support GitHub?",
    a: "PlatformBox is source-control and CI-provider agnostic. The public reference implementation is GitLab-first because it demonstrates the complete DevSecOps golden path in one place. GitHub Actions support can be delivered where that is the customer’s stack.",
  },
  {
    q: "Who owns everything?",
    a: "You do. Everything lives in your AWS account, your repositories, and your Terraform, under your governance. You keep the documentation, runbooks, and architecture. There is no proprietary runtime creating lock-in.",
  },
  {
    q: "What access do you need?",
    a: "Temporary, scoped access to your AWS account and source repositories for the 14 working days. We agree the exact scope and permissions up front.",
  },
  {
    q: "What exactly happens after day 14?",
    a: "You run the platform with your team. Launch includes handover and training, and PlatformBox Care is available for ongoing maintenance and evolution.",
  },
  {
    q: "What if our environment is more complex than your standard architecture?",
    a: "That's what the Platform Assessment is for. If your environment doesn't fit the 14-working-day scope, we'll tell you before you commit — and propose a scoped Enterprise engagement instead.",
  },
  {
    q: "What if the 14-working-day scope turns out not to be realistic?",
    a: "The Platform Assessment exists precisely to prevent this. We only commit to a fixed-price 14-working-day scope after mapping your current state. If the assessment shows the scope isn't realistic, we tell you before any implementation begins — and agree a realistic scope or a different package.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. PlatformBox Care provides ongoing platform engineering — maintenance, upgrades, security updates, and new golden paths — for €2,000–€4,000/month. It's optional; the platform keeps running without it.",
  },
  {
    q: "What is included and excluded?",
    a: "Each package has a fixed scope. Launch covers one primary AWS environment and one golden path; Scale adds multiple golden paths and environments. Anything outside scope is agreed during the Platform Assessment, before work begins.",
  },
  {
    q: "How are security concerns handled?",
    a: "Baseline security is part of every engagement: least-privilege IAM, encrypted storage and state, application secrets held in AWS Secrets Manager and delivered to pods by the External Secrets Operator over federated identity — scoped per environment, so one environment cannot read another\u2019s — and automated security checks in the pipeline. Advanced governance is available in Scale and Enterprise.",
  },
  {
    q: "What does \"production-ready\" mean here?",
    a: "Two distinct things, and we keep them apart. THE PROMISE: a golden path proven to production, plus the implementation approach behind it, delivered in 14 working days — subject to the agreed assessment and scope. THE REFERENCE IMPLEMENTATION: a production-shaped, cost-optimised, publicly inspectable build that proves the pattern end to end. Three services now run it; the third was created by the platform\u2019s own generator and reached production on 27 August 2026, promoted from UAT\u2019s approved image with no rebuild, reconciled by ArgoCD, and health-checked from inside the production cluster (ADR-019, ADR-020, ADR-023). What it does NOT mean: we do not claim enterprise-readiness, alerting, log aggregation or secrets management \u2014 see what PlatformBox does not do.",
  },
  {
    q: "Why not just adopt Backstage, Port, or another IDP product?",
    a: "An IDP product is a tool, not a finished platform. The product still needs to be implemented: integrated with your cloud and CI/CD, wired to your repositories, given golden paths, and governed. That is exactly the engineering work PlatformBox delivers. You can adopt an IDP product and have PlatformBox implement and configure it — or use our reference architecture without one.",
  },
  {
    q: "Who owns the platform — and who owns our applications?",
    a: "PlatformBox owns the platform engineering: infrastructure, delivery pipelines, golden paths, security controls, and observability. You own your application logic, product requirements, and application-level operations. PlatformBox is a defined platform scope, not unlimited outsourced DevOps.",
  },
  {
    q: "Do you onboard our existing services?",
    a: "Launch includes onboarding up to two initial services to prove the golden path with real workloads — the reference implementation demonstrates two services with independent lifecycles. Additional application onboarding is a defined expansion, not per-service billing.",
  },
  {
    q: "What can we add after Launch?",
    a: "Platform expansion modules: additional golden paths, environments, teams, a developer portal, self-service databases, advanced security or observability, and Enterprise compliance. Each is a fixed-scope engagement agreed during the Platform Assessment.",
  },
];

export const blueprint = {
  eyebrow: "The 14-Day Blueprint",
  headline: "How the 14 working days work.",
  sub: "Nine phases, one fixed-price engagement — from discovery to a handed-over platform.",
  phases: [
    { title: "Discovery and architecture", text: "Map the current state, agree the target architecture, and lock the 14-working-day scope.", claims: ["__process__"] },
    { title: "Infrastructure foundation", text: "Stand up the AWS/EKS foundation, networking, and baseline IAM.", claims: ["pbx.foundation.aws", "pbx.platform.kubernetes-eks", "pbx.platform.networking", "pbx.security.iam-least-privilege"] },
    { title: "CI/CD", text: "Standard pipelines, registries, and the commit-to-production workflow.", claims: ["pbx.delivery.ci-cd", "pbx.platform.container-registry"] },
    { title: "Environments", text: "Preview and production environments with automated provisioning.", claims: ["pbx.environments.preview"] },
    { title: "Golden path", text: "The standard service template and repository bootstrap developers follow.", claims: ["pbx.golden-path.service-scaffold", "pbx.golden-path.build-to-production"] },
    { title: "Security", text: "Least-privilege access, encrypted storage and state, and automated checks in the pipeline.", claims: ["pbx.security.scanning", "pbx.security.iam-least-privilege"] },
    { title: "Observability", text: "Prometheus + Grafana — metrics and dashboards, live-proven across both services (ADR-018).", claims: ["pbx.observability.metrics"] },
    { title: "Production validation", text: "End-to-end validation of the golden path against a real workload.", claims: ["pbx.delivery.production-promotion"] },
    { title: "Handover", text: "Documentation, runbooks, training, and the phase-2 backlog.", claims: ["pbx.delivery.handover"] },
  ],
  disclaimer:
    "This is the standard PlatformBox delivery model. Individual environments may require scope adjustments identified during the Platform Assessment.",
} as const;

export const technicalReference = {
  eyebrow: "Technical reference",
  headline: "The PlatformBox reference architecture.",
  sub: "A standardized path from Git to production — built on your existing AWS and Kubernetes stack.",
  sections: [
    { name: "Terraform", role: "Infrastructure lifecycle", claims: ["pbx.foundation.iac-terraform"], text: "All infrastructure is defined as versioned Terraform modules, reviewed and applied through CI. Changes are auditable and reversible." },
    { name: "Kubernetes / EKS", role: "Application runtime", claims: ["pbx.platform.kubernetes-eks"], text: "Workloads run on EKS with least-privilege RBAC, per-team namespaces, autoscaling, and a monitoring baseline." },
    { name: "GitHub / GitLab", role: "Source and workflow", claims: ["__process__"], text: "Repositories, merge requests, and approvals stay where your teams already work. PlatformBox wires them into the golden path." },
    { name: "CI/CD", role: "Application delivery", claims: ["pbx.delivery.ci-cd"], text: "A standard pipeline builds, scans (Trivy), and promotes each service from commit to production — no per-team pipeline maintenance." },
    { name: "GitOps", role: "Declared desired state", claims: ["pbx.delivery.gitops"], text: "The cluster reconciles to the state declared in Git (ArgoCD, cluster-level proven per ADR-016). Deployments are pull-based, reviewable, and auditable." },
    { name: "IAM", role: "Least-privilege access", claims: ["pbx.security.iam-least-privilege"], text: "Scoped roles for humans and workloads. Keyless CI-to-AWS auth via OIDC — no static credentials. Separate IAM roles per environment tier (dev, qa/uat, preview, prod) — environment separation by default, enforced by AWS STS." },
    { name: "Security", role: "Built into the path", claims: ["pbx.security.scanning"], text: "Trivy scanning in CI, GuardDuty threat detection, encrypted storage and state, and automated checks run on every change." },
    { name: "Observability", role: "See what's running", claims: ["pbx.observability.metrics"], text: "Prometheus + Grafana — metrics and dashboards, live-proven across both services and all three tiers (ADR-018)." },
    { name: "Platform ownership", role: "You own it all", claims: ["__process__"], text: "Everything lives in your accounts and repositories. No proprietary runtime, no lock-in." },
  ],
} as const;

export const evidence = {
  eyebrow: "Proof, not promises",
  headline: "Verify it yourself.",
  sub: "Everything below links to the actual reference implementation — Terraform modules, decision records, and live evidence — not a marketing snapshot. The diagrams above are pre-rendered from that repository.",
  links: [
    {
      label: "The repository",
      description: "The full reference implementation — Terraform, CI/CD, and documentation. Public and inspectable.",
      href: IDP_REPO_URL,
    },
    {
      label: "Live evidence",
      description: "Real Terraform plan output, GuardDuty findings, cost breakdown, and dated end-to-end proof files for the golden path, preview, promotion, GitOps, observability, production, and rollback.",
      href: `${IDP_REPO_URL}/-/tree/main/docs/evidence`,
    },
    {
      label: "Decision records",
      description: "26 ADRs explaining each architecture choice — and what was rejected.",
      href: `${IDP_REPO_URL}/-/tree/main/docs/decisions`,
    },
    {
      label: "Architecture source",
      description: "The single source of truth for the diagrams above — pre-rendered from this file.",
      href: `${IDP_REPO_URL}/-/blob/main/docs/architecture/architecture.md`,
    },
    {
      label: "Terraform modules",
      description: "Network, security, EKS, IAM, and CI runner — versioned, reviewed, and reproducible.",
      href: `${IDP_REPO_URL}/-/tree/main/terraform`,
    },
    {
      label: "Demo runbook",
      description: "The full lifecycle as a repeatable runbook — local → preview → dev → qa → uat → prod → rollback. Every step individually proven; not yet rehearsed end-to-end.",
      href: `${IDP_REPO_URL}/-/blob/main/docs/operations/demo-runbook.md`,
    },
  ],
} as const;

export const landingEvidence = {
  eyebrow: "Verified, not claimed",
  headline: "Every claim links to real, live evidence.",
  sub: "The reference implementation is public and inspectable. The decision records are published. The Terraform state output is real — not a marketing snapshot. The full path to production is live-proven end-to-end, including a real production rollback.",
  cards: [
    {
      label: "The repository",
      description: "Full reference implementation — Terraform, CI/CD, and documentation. Public and inspectable.",
      href: IDP_REPO_URL,
    },
    {
      label: "Decision records",
      description: "Every architecture choice explained — and what was rejected — in published ADRs.",
      href: `${IDP_REPO_URL}/-/tree/main/docs/decisions`,
    },
    {
      label: "Live evidence",
      description: "Real Terraform plan output, GuardDuty findings, cost breakdown, and dated end-to-end proof files for the golden path, preview, promotion, GitOps, observability, production, and rollback.",
      href: `${IDP_REPO_URL}/-/tree/main/docs/evidence`,
    },
    {
      label: "Terraform modules",
      description: "Network, security, EKS, IAM, and CI runner — versioned, reviewed, and reproducible.",
      href: `${IDP_REPO_URL}/-/tree/main/terraform`,
    },
    {
      label: "Architecture source",
      description: "Single source of truth for the diagrams — pre-rendered from this file.",
      href: `${IDP_REPO_URL}/-/blob/main/docs/architecture/architecture.md`,
    },
    {
      label: "Demo runbook",
      description: "The full lifecycle as a repeatable runbook — local → preview → dev → qa → uat → prod → rollback. Every step individually proven; not yet rehearsed end-to-end.",
      href: `${IDP_REPO_URL}/-/blob/main/docs/operations/demo-runbook.md`,
    },
  ],
  stats: [
    { value: "29", label: "Architecture Decision Records", href: `${IDP_REPO_URL}/-/tree/main/docs/decisions` },
    { value: "7", label: "Terraform modules", href: `${IDP_REPO_URL}/-/tree/main/terraform` },
    { value: "6", label: "Environment tiers proven end-to-end", href: `${IDP_REPO_URL}/-/tree/main/docs/evidence` },
    { value: "1", label: "Public reference implementation", href: IDP_REPO_URL },
  ],
  ctaLabel: "View the full reference architecture",
  ctaHref: "/architecture",
} as const;

export const operatingModel = {
  eyebrow: "The operating model",
  headline: "From architecture proposal to inspectable operating model.",
  philosophy: "We make software delivery predictable, repeatable — and boring, in the best possible way.",
  sub: "The reference implementation isn't a diagram. Every item below links to the decision record and live evidence that proves it.",
  groups: [
    {
      title: "Delivery lifecycle",
      items: ["LOCAL", "PREVIEW", "DEV", "QA", "UAT", "PROD"],
      note: "Six tiers proven end-to-end — LOCAL through PROD, including production promotion (ADR-019) and rollback (ADR-020).",
      href: `${IDP_REPO_URL}/-/blob/main/docs/architecture/target-operating-model.md`,
    },
    {
      title: "Release engineering",
      items: ["BUILD ONCE", "IMMUTABLE DIGEST", "PROMOTE", "ROLLBACK"],
      note: "Digest-pinned promotion with no rebuild, live-proven (ADR-012).",
      href: `${IDP_REPO_URL}/-/blob/main/docs/decisions/ADR-012-version-promotion-model.md`,
    },
    {
      title: "Platform operation",
      items: ["GITOPS", "SECURITY", "OBSERVABILITY", "FINOPS"],
      note: "ArgoCD reconciliation, least-privilege IAM, Prometheus + Grafana, cost-aware ephemeral infrastructure.",
      href: `${IDP_REPO_URL}/-/tree/main/docs/decisions`,
    },
    {
      title: "Multi-service behaviour",
      items: ["demo-service", "orders-service", "payments-service"],
      note: "Three services, independent lifecycles on the same golden path. The third was created by the platform's own generator and reached production (ADR-017, ADR-023).",
      href: `${IDP_REPO_URL}/-/blob/main/docs/decisions/ADR-017-second-service.md`,
    },
  ],
} as const;

// The strongest single fact the platform can offer, and the one a
// competitor cannot copy without doing the work. Verbatim-checkable
// against docs/evidence/2026-08-27/generated-service-to-production.md
export const proofMoment = {
  eyebrow: "27 August 2026",
  headline: "One command. Six environments. Production.",
  sub: "A developer ran a single command. The service it generated went to production through six environments and two human approval gates — carrying the same immutable image digest at every tier, verified by a health check answering from inside a private production cluster that a laptop cannot reach.",
  steps: [
    { label: "make new-service", text: "35 files: Go service with tests, Dockerfile, Helm chart, four environment definitions, full CI/CD pipeline. No platform configuration written by hand." },
    { label: "Preview → Dev → QA", text: "Lint, unit tests, dependency, image and infrastructure scanning, then deploy and verify. Failed checks stop the deployment — they do not warn about it." },
    { label: "UAT → Production", text: "Two human approval gates, enforced by AWS IAM rather than by a setting in the CI interface. The audit record is committed only after the deployment answers a health check." },
  ],
  caveat: "Production onboarding of a new service still requires a platform engineer to make two Terraform edits — the generator prints exactly which. We do not call that automated.",
  linkLabel: "Read the evidence for this run",
  linkHref: `${IDP_REPO_URL}/-/blob/main/docs/evidence/2026-08-27/generated-service-to-production.md`,
} as const;

// Publishing limitations is not a disclaimer. It is the reason the other
// claims are believable, and it disqualifies bad-fit buyers before a call.
export const notIncluded = {
  eyebrow: "Before you talk to us",
  headline: "What PlatformBox does not do.",
  sub: "Every item below is a real boundary of the reference implementation, not a roadmap. If one of these is essential to you, say so on the first call — some are quotable as additional scope, and some are simply not what we do.",
  groups: [
    {
      title: "Not built, quotable as extra scope",
      items: [
        "Ingress, TLS and DNS — services are cluster-internal in the reference build",
        "Pod-to-pod network segmentation — the cluster runs on Fargate, where Kubernetes NetworkPolicy cannot be enforced. Traffic in and out is controlled; traffic between pods is not",
          "Log aggregation — services emit structured JSON; nothing ships or indexes it centrally",
        "Alerting and on-call routing — metrics and dashboards exist, nothing pages anyone",
        "Databases, queues and caches — no module provisions a stateful dependency",
        "Runtimes other than Go, and CI providers other than GitLab",
      ],
    },
    {
      title: "Built, with limits worth stating",
      items: [
        "Secret rotation is manual — rotation propagates to running workloads, but nothing schedules it",
        "Secrets are proven in a development tier; production has not yet taken the module",
      ],
    },
    {
      title: "Deliberately not our model",
      items: [
        "A developer portal or web UI — the front door is a command-line tool in your platform repository",
        "Policy-as-code admission control — governance is IAM, Kubernetes RBAC and ArgoCD project restrictions",
        "Service mesh, multi-region and multi-cloud",
        "Application development, staff augmentation, or ad-hoc cloud troubleshooting",
        "AI-assisted anything",
      ],
    },
    {
      title: "Honest limits of the evidence",
      items: [
        "The reference implementation has been rebuilt from an empty AWS account twice — by the same engineer. It has not been independently reproduced.",
        "Production rollback is demonstrated for one service, not for every service.",
        "Cost figures are modelled from published AWS pricing. They are not a reconciled bill, and we do not extrapolate them into savings claims.",
      ],
    },
  ],
} as const;

export const finalCta = {
  headline: "Book your Platform Assessment.",
  sub: "30 minutes to determine whether your environment is a fit for the 14-working-day PlatformBox Launch.",
} as const;

export const pricing = {
  eyebrow: "07 / Pricing",
  headline: "Fixed-price. Live in 14 working days.",
} as const;

export const roi = {
  eyebrow: "13 / The ROI",
  headline: "What does your current platform actually cost?",
  sub: "Adjust the numbers to your team. Transparent, editable, and yours to keep.",
} as const;

export const faqSection = {
  eyebrow: "15 / FAQ",
  headline: "Answers before you book.",
} as const;