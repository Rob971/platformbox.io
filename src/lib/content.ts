// Single source of truth for marketing copy, offers, and the 14-day delivery.
// Provider names and pricing live here only, so the site stays provider-neutral
// (AWS/EKS are the reference implementation, not the only option).

export const hero = {
  eyebrow: "PlatformBox Launch · 14 working days",
  headline: "Your developer platform. Live in 14 days.",
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
    { label: "Developer", note: "Pushes code" },
    { label: "Golden Path", note: "Standard template" },
    { label: "Preview", note: "Ephemeral environment" },
    { label: "Security", note: "Automated checks" },
    { label: "Production", note: "Promoted via pipeline" },
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
  sub: "Day 14 means a working developer path to production — not a consulting kickoff.",
  weeks: [
    {
      label: "Week 1",
      phases: [
        { day: "Days 1–2", title: "Architecture & foundation", description: "Current-state review, target architecture, and the AWS/EKS foundation." },
        { day: "Days 3–4", title: "Infrastructure & IAM", description: "Terraform modules, networking, RBAC, secrets, and environments." },
        { day: "Days 5–7", title: "CI/CD & environments", description: "Standard pipelines, preview environments, and the production deployment workflow." },
      ],
    },
    {
      label: "Week 2",
      phases: [
        { day: "Days 8–10", title: "Golden paths & preview", description: "Service template, repository bootstrap, and preview environments." },
        { day: "Days 11–12", title: "Security & observability", description: "Security controls, an observability baseline, and cost controls." },
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
    { name: "Terraform", role: "Infrastructure lifecycle", accent: false },
    { name: "Kubernetes / EKS", role: "Application runtime", accent: false },
    { name: "GitHub / GitLab", role: "Source and workflow", accent: false },
    { name: "GitOps / CI/CD", role: "Application delivery", accent: false },
    { name: "PlatformBox", role: "Golden paths, orchestration and developer experience", accent: true },
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
};

export const offers: Offer[] = [
  {
    id: "launch",
    name: "PlatformBox Launch",
    price: "€20,000",
    delivery: "14 working days",
    blurb: "One production-ready golden path — your first standardized, self-service route from Git to production.",
    features: [
      "AWS/EKS foundation",
      "Terraform modules",
      "CI/CD (GitHub or GitLab)",
      "One production-ready golden path",
      "Preview environments",
      "Production deployment workflow",
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
    "14-day implementation plan",
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
    "Can't commit to a clearly defined 14-day scope",
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
} as const;

export const whyDifferent = {
  eyebrow: "06 / Why Not DIY",
  headline: "Why not build it internally?",
  sub: "The biggest alternative to PlatformBox is building it yourself. Here is what changes when you don't.",
  rows: [
    { internal: "Months of platform engineering", platformbox: "14 working days" },
    { internal: "Internal engineers diverted", platformbox: "Fixed scope and price" },
    { internal: "Architecture decisions still unresolved", platformbox: "Reference architecture" },
    { internal: "Tool integration work", platformbox: "Integrated golden path" },
    { internal: "Long time before developer adoption", platformbox: "Working developer path at handover" },
    { internal: "Ongoing ownership burden begins immediately", platformbox: "Optional PlatformBox Care" },
  ],
  message: "PlatformBox compresses the work required to reach a usable first platform.",
} as const;

export const assessmentSection = {
  eyebrow: "08 / Risk Reduction",
  headline: "Before we promise 14 days, we assess your environment.",
  sub: "PlatformBox does not start with a blind fixed-price promise. We first assess your architecture, delivery workflow, and platform constraints so the 14-day scope is realistic.",
  outputs: [
    "Current-state map",
    "Bottleneck analysis",
    "Platform maturity assessment",
    "Target architecture",
    "Risks and dependencies",
    "14-day implementation scope",
    "Fixed-price recommendation",
  ],
  credit: "€2,500 — fully credited toward PlatformBox Launch if you proceed.",
} as const;

export const scopeAssumptions = {
  eyebrow: "09 / Scope & Assumptions",
  headline: "What makes the 14-day promise credible.",
  sub: "The 14-day delivery assumes a defined reference architecture and customer readiness. These assumptions are agreed during the Platform Assessment, before work begins.",
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
    { title: "Start with Assessment if", text: "You are unsure whether your environment can realistically fit the 14-day model." },
  ],
} as const;

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Why not build this ourselves?",
    a: "You can — and some teams should. PlatformBox is for teams that would otherwise spend months redirecting senior engineers into platform work. We deliver a working developer path to production in 14 working days using a proven reference architecture, then hand it to your team to own and operate. You get the result without the months of internal engineering, the unresolved architecture decisions, and the adoption delay.",
  },
  {
    q: "What exactly is delivered in 14 days?",
    a: "A working developer path to production: an AWS/EKS foundation, Terraform modules, CI/CD, one production-ready golden path, preview environments, baseline security, documentation, and a live handover. On day 14, a developer can create a service from the standard template, deploy it to a preview environment, pass automated security checks, and promote it to production.",
  },
  {
    q: "Do you replace Terraform, GitHub, GitLab, or Kubernetes?",
    a: "No. PlatformBox integrates the tools you already use and makes them work together. It owns the golden path, not the infrastructure beneath it.",
  },
  {
    q: "Do you support GitHub?",
    a: "Yes. Our reference implementation currently targets GitLab CI, but PlatformBox is designed to work with GitHub Actions too. We scope the exact toolchain during the Platform Assessment.",
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
    a: "That's what the Platform Assessment is for. If your environment doesn't fit the 14-day scope, we'll tell you before you commit — and propose a scoped Enterprise engagement instead.",
  },
  {
    q: "What if the 14-day scope turns out not to be realistic?",
    a: "The Platform Assessment exists precisely to prevent this. We only commit to a fixed-price 14-day scope after mapping your current state. If the assessment shows the scope isn't realistic, we tell you before any implementation begins — and agree a realistic scope or a different package.",
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
    a: "Baseline security is part of every engagement: least-privilege IAM, encrypted storage and secrets, and automated security checks in the pipeline. Advanced governance is available in Scale and Enterprise.",
  },
];

export const blueprint = {
  eyebrow: "The 14-Day Blueprint",
  headline: "How the 14 days work.",
  sub: "Nine phases, one fixed-price engagement — from discovery to a handed-over platform.",
  phases: [
    { title: "Discovery and architecture", text: "Map the current state, agree the target architecture, and lock the 14-day scope." },
    { title: "Infrastructure foundation", text: "Stand up the AWS/EKS foundation, networking, and baseline IAM." },
    { title: "CI/CD", text: "Standard pipelines, registries, and the commit-to-production workflow." },
    { title: "Environments", text: "Preview and production environments with automated provisioning." },
    { title: "Golden path", text: "The standard service template and repository bootstrap developers follow." },
    { title: "Security", text: "Least-privilege access, encrypted secrets, and automated checks in the pipeline." },
    { title: "Observability", text: "Metrics, logs, and traces with a baseline dashboard and alerting." },
    { title: "Production validation", text: "End-to-end validation of the golden path against a real workload." },
    { title: "Handover", text: "Documentation, runbooks, training, and the phase-2 backlog." },
  ],
  disclaimer:
    "This is the standard PlatformBox delivery model. Individual environments may require scope adjustments identified during the Platform Assessment.",
} as const;

export const technicalReference = {
  eyebrow: "Technical reference",
  headline: "The PlatformBox reference architecture.",
  sub: "A standardized, provider-neutral path from Git to production — built on your existing AWS and Kubernetes stack.",
  sections: [
    { name: "Terraform", role: "Infrastructure lifecycle", text: "All infrastructure is defined as versioned Terraform modules, reviewed and applied through CI. Changes are auditable and reversible." },
    { name: "Kubernetes / EKS", role: "Application runtime", text: "Workloads run on EKS with least-privilege RBAC, per-team namespaces, autoscaling, and a monitoring baseline." },
    { name: "GitHub / GitLab", role: "Source and workflow", text: "Repositories, merge requests, and approvals stay where your teams already work. PlatformBox wires them into the golden path." },
    { name: "CI/CD", role: "Application delivery", text: "A standard pipeline builds, tests, scans, and promotes each service from commit to production — no per-team pipeline maintenance." },
    { name: "GitOps", role: "Declared desired state", text: "The cluster reconciles to the state declared in Git. Deployments are pull-based, reviewable, and auditable." },
    { name: "IAM", role: "Least-privilege access", text: "Scoped roles for humans and workloads, short-lived credentials, and environment separation by default." },
    { name: "Security", role: "Built into the path", text: "Automated scanning, encrypted secrets and storage, and policy checks run on every change." },
    { name: "Observability", role: "See what's running", text: "Metrics, logs, and traces with a baseline dashboard and alerting for every service." },
    { name: "Platform ownership", role: "You own it all", text: "Everything lives in your accounts and repositories. No proprietary runtime, no lock-in." },
  ],
} as const;

export const finalCta = {
  headline: "Book your Platform Assessment.",
  sub: "30 minutes to determine whether your environment is a fit for the 14-day PlatformBox Launch.",
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