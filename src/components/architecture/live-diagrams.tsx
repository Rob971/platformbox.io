"use client";

import { IDP_REPO_URL } from "@/lib/constants";
import { InteractiveDiagram } from "./interactive-diagram";

interface DiagramSpec {
  src: string;
  label: string;
  description: string;
  /** Start zoomed to fit width (true) or at 100% for step-by-step reading. */
  initialFit?: boolean;
}

const DIAGRAMS: DiagramSpec[] = [
  {
    src: "/diagrams/golden-path.svg",
    label: "Golden Path — Developer Flow",
    description:
      "The full developer path: infrastructure changes flow from git push through CI validation into AWS. Application changes (demo-service) build, scan (Trivy), push to the container registry, and deploy to EKS Fargate via a self-hosted CI runner (ADR-011). Feature branches deploy to preview environments (ADR-015). GitOps reconciliation via ArgoCD is cluster-level proven (ADR-016).",
  },
  {
    src: "/diagrams/platform-infra.svg",
    label: "Platform Infrastructure",
    description:
      "Six platform layers deployed on AWS: network (VPC, NAT), compute (EKS Fargate, apply-up/destroy-down), delivery (CI/CD, self-hosted runner, GitLab registry), security (GuardDuty, KMS, OIDC), observability (planned), and the Terraform modules that provision it all. Both dev and prod Terraform environments exist (ADR-013).",
  },
  {
    src: "/diagrams/security-auth.svg",
    label: "Security & Auth Flow",
    description:
      "Human access via IAM Identity Center SSO. Keyless CI-to-AWS auth via OIDC federation (ADR-010), with separate IAM roles for dev, qa/uat, and preview (ADR-014, ADR-015). KMS encryption for EKS secrets and CloudWatch logs. ArgoCD is cluster-level proven (ADR-016); Pod Identity for workload-to-AWS access is still planned.",
  },
  {
    src: "/diagrams/promotion-sequence.svg",
    label: "Promotion Sequence — Dev Push to Release",
    description:
      "Full artifact promotion pipeline: feature-branch push deploys to preview (ADR-015, auto-torn down on merge/close), merge to main builds once and promotes the same digest through dev, qa, and uat namespaces — with a human approver gating uat via AWS-STS-enforced IAM role. Production infrastructure exists (ADR-013) but has no CI deploy job yet.",
    initialFit: false,
  },
];

const LEGEND_ITEMS = [
  { color: "bg-green-500", label: "Built & verified" },
  { color: "bg-blue-500", label: "On-demand / verified" },
  { color: "bg-zinc-500", label: "Planned" },
];

export function LiveArchitectureDiagrams() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-lg border border-border bg-surface px-5 py-3">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-sm ${item.color}`}
              aria-hidden
            />
            <span className="text-xs text-foreground-tertiary">{item.label}</span>
          </div>
        ))}
      </div>

      {DIAGRAMS.map((d, i) => (
        <InteractiveDiagram
          key={d.src}
          src={d.src}
          title={d.label}
          figureNumber={i + 1}
          description={d.description}
          initialFit={d.initialFit}
        />
      ))}

      <p className="text-center text-xs text-muted">
        Source:{" "}
        <a
          href={`${IDP_REPO_URL}/-/blob/main/docs/architecture/architecture.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover"
        >
          architecture.md
        </a>{" "}
        — pre-rendered from the reference implementation. To refresh, run{" "}
        <code className="rounded bg-card-hover px-1.5 py-0.5 font-mono text-[11px] text-foreground-tertiary">
          npm run generate-diagrams
        </code>
        .
      </p>
    </div>
  );
}

