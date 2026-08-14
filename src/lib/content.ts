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
  before: ["Developer", "DevOps ticket", "Infrastructure changes", "Deployment", "Troubleshooting"],
  after: ["Developer", "Golden path", "Preview", "Security", "Production"],
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
  eyebrow: "05 / Technology",
  headline: "Integrates with the infrastructure and tools you already have.",
  sub: "Optimized for AWS and EKS. Designed to work with your existing engineering stack.",
  items: ["AWS", "EKS", "Kubernetes", "Terraform", "GitHub", "GitLab", "CI/CD", "Security", "Observability"],
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
    blurb: "The standard 14-day platform: a production-ready golden path from Git to production.",
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
    blurb: "Everything in Launch, plus multiple golden paths, environments, observability, and FinOps.",
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
    blurb: "For complex AWS organizations with multiple accounts, compliance, and multi-team platform architecture.",
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
  note: "€2,500 is credited toward PlatformBox Launch if you proceed.",
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
  blurb: "Ongoing platform engineering after launch — maintenance, upgrades, and evolution.",
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
  eyebrow: "08 / Is It a Fit?",
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

export const caseStudy = {
  eyebrow: "09 / Proof",
  headline: "A 14-day transformation, in their words.",
  sub: "We're documenting our first customer stories now. The first launches are available at a reduced rate in exchange for a detailed, permissioned case study.",
  placeholder: "Your company's 14-day story goes here.",
} as const;

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What exactly is delivered in 14 days?",
    a: "A working developer path to production: an AWS/EKS foundation, Terraform modules, CI/CD, one production-ready golden path, preview environments, baseline security, documentation, and a live handover. On day 14, a developer can create a service from the standard template, deploy it to a preview environment, pass automated security checks, and promote it to production.",
  },
  {
    q: "Does PlatformBox replace Terraform, GitHub, GitLab, or Kubernetes?",
    a: "No. PlatformBox integrates the tools you already use and makes them work together. It owns the golden path, not the infrastructure beneath it.",
  },
  {
    q: "Can we use GitHub instead of GitLab?",
    a: "Yes. Our reference implementation currently targets GitLab CI, but PlatformBox is designed to work with GitHub Actions too. We scope the exact toolchain during the Platform Assessment.",
  },
  {
    q: "Who owns the infrastructure after implementation?",
    a: "You do. Everything lives in your AWS account, in your repositories, under your governance. You keep the documentation, runbooks, and architecture.",
  },
  {
    q: "What access is required?",
    a: "Temporary, scoped access to your AWS account and source repositories for the 14 working days. We agree the exact scope and permissions up front.",
  },
  {
    q: "What happens after day 14?",
    a: "You run the platform with your team. Launch includes handover and training, and PlatformBox Care is available for ongoing maintenance and evolution.",
  },
  {
    q: "What is included and excluded?",
    a: "Each package has a fixed scope. Launch covers one primary AWS environment and one golden path; Scale adds multiple golden paths and environments. Anything outside scope is agreed during the Platform Assessment, before work begins.",
  },
  {
    q: "How are security concerns handled?",
    a: "Baseline security is part of every engagement: least-privilege IAM, encrypted storage and secrets, and automated security checks in the pipeline. Advanced governance is available in Scale and Enterprise.",
  },
  {
    q: "What happens if our architecture is more complex?",
    a: "That's what the Platform Assessment is for. If your environment doesn't fit the 14-day scope, we'll tell you before you commit — and propose a scoped Enterprise engagement instead.",
  },
];

export const finalCta = {
  headline: "Book your Platform Assessment.",
  sub: "30 minutes to determine whether your environment is a fit for the 14-day PlatformBox Launch.",
} as const;

export const pricing = {
  eyebrow: "06 / Pricing",
  headline: "Fixed-price. Live in 14 working days.",
} as const;

export const roi = {
  eyebrow: "07 / The ROI",
  headline: "What does your current platform actually cost?",
  sub: "Adjust the numbers to your team. Transparent, editable, and yours to keep.",
} as const;

export const faqSection = {
  eyebrow: "10 / FAQ",
  headline: "Answers before you book.",
} as const;