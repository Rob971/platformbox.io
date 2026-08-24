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
      "Flowchart of the golden path: a developer pushes code through CI validation and Terraform apply into AWS; application changes are built and scanned, pushed to the container registry, and deployed to EKS Fargate.",
  },
  {
    src: "/diagrams/platform-infra.svg",
    label: "Platform Infrastructure",
    description:
      "Flowchart of the six platform layers as deployed on AWS: network, compute, delivery, security, observability, and the Terraform that provisions them.",
  },
  {
    src: "/diagrams/security-auth.svg",
    label: "Security & Auth Flow",
    description:
      "Flowchart of the security and authentication flow: human access via IAM Identity Center SSO, keyless CI access via OIDC federation, and KMS plus S3 encryption, with ArgoCD and Pod Identity shown as planned.",
  },
  {
    src: "/diagrams/promotion-sequence.svg",
    label: "Promotion Sequence — Dev Push to Release",
    description:
      "Sequence diagram of artifact promotion: a push builds the image once, then the same digest is promoted through the dev, qa, and uat namespaces, with a human approver gating uat; production is shown as planned but not yet wired.",
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
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-3">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-sm ${item.color}`}
              aria-hidden
            />
            <span className="text-xs text-zinc-400">{item.label}</span>
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

      <p className="text-center text-xs text-zinc-500">
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
        <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-zinc-400">
          npm run generate-diagrams
        </code>
        .
      </p>
    </div>
  );
}

