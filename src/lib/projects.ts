/**
 * Customer engagement registry.
 *
 * Add a new entry when a customer pays the 30% upfront.
 * The email must match the one they use to sign in (Google or magic link).
 */
export interface Phase {
  title: string;
  status: "completed" | "in_progress" | "pending";
  days: string;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
  artifacts?: { label: string; url: string }[];
}

export interface Engagement {
  company: string;
  reference: string;
  startedAt: string;
  engagementManager: {
    name: string;
    email: string;
    phone: string;
  };
  phases: Phase[];
}

const engagements: Record<string, Engagement> = {
  "roberto@platformbox.io": {
    company: "PlatformBox",
    reference: "PBX-2026-08",
    startedAt: "2026-08-18",
    engagementManager: {
      name: "Roberto Cornano",
      email: "roberto@platformbox.io",
      phone: "+33 6 00 00 00 00",
    },
    phases: [
      {
        title: "Architecture Discovery",
        status: "completed",
        days: "1–2",
        startedAt: "2026-08-18",
        completedAt: "2026-08-19",
        notes: "Mapped existing AWS estate, GitLab CI pipelines, and 3 engineering team workflows. Architecture Decision Record published.",
        artifacts: [
          { label: "View ADR", url: "#" },
          { label: "Clone repository", url: "#" },
        ],
      },
      {
        title: "Infrastructure as Code",
        status: "in_progress",
        days: "3–5",
        startedAt: "2026-08-20",
        notes: "VPC + EKS modules provisioned in eu-west-1. RDS module under review — expected completion Aug 22.",
        artifacts: [
          { label: "View Terraform modules", url: "#" },
        ],
      },
      {
        title: "DevSecOps CI/CD",
        status: "pending",
        days: "6–8",
      },
      {
        title: "Production Kubernetes",
        status: "pending",
        days: "9–11",
      },
      {
        title: "Ephemeral Environments",
        status: "pending",
        days: "12–13",
      },
      {
        title: "Handover & Documentation",
        status: "pending",
        days: "14",
      },
    ],
  },
};

export function getEngagement(email: string): Engagement | null {
  return engagements[email] ?? null;
}

export function isWhitelisted(email: string): boolean {
  return email in engagements;
}