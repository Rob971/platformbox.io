"use client";

import { IDP_REPO_URL } from "@/lib/constants";
import { InteractiveDiagram, type DiagramNodeSpec, type DiagramEdgeSpec, type DiagramContainerSpec } from "./interactive-diagram";

interface DiagramSpec {
  title: string;
  description: string;
  textEquivalent: string;
  viewBox: string;
  nodes: DiagramNodeSpec[];
  edges: DiagramEdgeSpec[];
  containers?: DiagramContainerSpec[];
}

// --- 1. Golden path -------------------------------------------------------

const goldenPath: DiagramSpec = {
  title: "Golden Path — Developer Flow",
  description:
    "A developer's commit flows through the pipeline and the security gate to preview and the dev, QA and UAT tiers — and a bad build is blocked at the gate, never promoted.",
  textEquivalent:
    "A commit enters the pipeline and is built and scanned. A passing build goes through the security gate to preview, dev, QA and UAT, each with a human approval, and reaches production as the same image digest. A failing build is rejected at the security gate and blocked.",
  viewBox: "0 0 760 420",
  nodes: [
    { id: "commit", label: "Commit", sub: "git push", detail: "A developer pushes code. The pipeline is triggered automatically — no manual step.", x: 20, y: 60, w: 110, h: 52 },
    { id: "pipeline", label: "Pipeline", sub: "build · scan", detail: "Lint, unit tests, dependency, image and infrastructure scanning all run here.", x: 170, y: 60, w: 120, h: 52, tone: "accent" },
    { id: "gate", label: "Security gate", sub: "Trivy", detail: "A failing scan blocks the build here — the gate enforces, it does not warn.", x: 330, y: 60, w: 120, h: 52, tone: "gate" },
    { id: "preview", label: "Preview", sub: "ephemeral", detail: "A feature-branch environment, torn down automatically when the branch merges or closes.", x: 490, y: 60, w: 120, h: 52, tone: "accent" },
    { id: "dev", label: "Dev", detail: "First deployed tier — the service is live and reachable in the cluster.", x: 650, y: 60, w: 90, h: 52 },
    { id: "qa", label: "QA", detail: "Automated verification tier before human approval.", x: 650, y: 180, w: 90, h: 52 },
    { id: "uat", label: "UAT", sub: "approve", detail: "A human approver gates promotion to UAT — enforced by AWS IAM, not a CI setting.", x: 490, y: 180, w: 120, h: 52, tone: "gate" },
    { id: "prod", label: "Production", sub: "same digest", detail: "Promoted without rebuild — the identical image digest that passed QA and UAT.", x: 330, y: 180, w: 120, h: 52, tone: "success" },
    { id: "observe", label: "Observe", sub: "Prometheus", detail: "Metrics and dashboards for the running service across all tiers.", x: 170, y: 180, w: 120, h: 52 },
    { id: "blocked", label: "Blocked", sub: "bad build", detail: "The rejected build never reaches any environment. The pipeline stops.", x: 20, y: 340, w: 120, h: 52, tone: "danger" },
  ],
  edges: [
    { d: "M130 86 L170 86", tone: "accent", flow: true },
    { d: "M290 86 L330 86", tone: "accent", flow: true },
    { d: "M450 86 L490 86", tone: "accent", flow: true, label: "passed", labelX: 470, labelY: 78 },
    { d: "M610 86 L650 86", tone: "accent", flow: true },
    { d: "M695 112 L695 180", tone: "accent", flow: true },
    { d: "M650 206 L610 206", tone: "accent", flow: true },
    { d: "M490 206 L450 206", tone: "accent", flow: true, label: "approved", labelX: 470, labelY: 198 },
    { d: "M330 206 L290 206", tone: "accent", flow: true },
    { d: "M390 112 C 390 160, 80 160, 80 340", tone: "red", dashed: true, flow: true, flowColour: "#ef4444", label: "rejected", labelX: 200, labelY: 150 },
  ],
};

// --- 2. Platform infrastructure ------------------------------------------

const platformInfra: DiagramSpec = {
  title: "Platform Infrastructure",
  description:
    "Six platform layers on AWS, all declared as Terraform modules and composed by per-environment stacks.",
  textEquivalent:
    "Network provides VPC, subnets and a NAT instance. Compute provides EKS on Fargate with apply-up and destroy-down. Delivery provides CI/CD, a self-hosted runner and a container registry. Security provides GuardDuty, KMS and OIDC. Observability is planned. All six layers are declared in Terraform modules.",
  viewBox: "0 0 680 560",
  nodes: [
    { id: "network", label: "Network", sub: "VPC · subnets · NAT", detail: "Private and public subnets across availability zones, with a NAT instance instead of a NAT Gateway (ADR-002).", x: 60, y: 40, w: 560, h: 56 },
    { id: "compute", label: "Compute", sub: "EKS Fargate · apply-up/destroy-down", detail: "The cluster is created on demand and destroyed when idle — near-zero idle cost.", x: 60, y: 124, w: 560, h: 56, tone: "accent" },
    { id: "delivery", label: "Delivery", sub: "CI/CD · self-hosted runner · registry", detail: "GitLab CI with a self-hosted runner (ADR-011) and the GitLab container registry.", x: 60, y: 208, w: 560, h: 56, tone: "accent" },
    { id: "security", label: "Security", sub: "GuardDuty · KMS · OIDC", detail: "Threat detection, keyless CI-to-AWS auth and encryption of EKS secrets and logs.", x: 60, y: 292, w: 560, h: 56, tone: "accent" },
    { id: "observability", label: "Observability", sub: "planned", detail: "Target state in the reference build — metrics arrive later as a proven extension.", x: 60, y: 376, w: 560, h: 56 },
    { id: "terraform", label: "Terraform modules", sub: "provisions everything", detail: "Six composable modules (network, eks, iam, security, ci-runner, bootstrap) composed per environment.", x: 60, y: 460, w: 560, h: 56, tone: "accent" },
  ],
  edges: [
    { d: "M340 96 L340 124", tone: "muted", dashed: true, label: "runs on", labelX: 390, labelY: 112 },
    { d: "M340 180 L340 208", tone: "muted", dashed: true },
    { d: "M340 264 L340 292", tone: "muted", dashed: true },
    { d: "M340 348 L340 376", tone: "muted", dashed: true },
    { d: "M340 432 L340 460", tone: "accent", flow: true, label: "declared in", labelX: 420, labelY: 448 },
  ],
};

// --- 3. Security & auth ---------------------------------------------------

const securityAuth: DiagramSpec = {
  title: "Security & Auth Flow",
  description:
    "Humans sign in through IAM Identity Center; CI reaches AWS keyless through OIDC, assuming scoped per-environment roles — no static credentials.",
  textEquivalent:
    "Engineers sign in to the AWS account through IAM Identity Center with single sign-on and multi-factor authentication. The CI pipeline authenticates through OIDC federation and assumes scoped IAM roles for dev, QA, UAT and preview, with no stored credential.",
  viewBox: "0 0 760 360",
  nodes: [
    { id: "humans", label: "Human access", sub: "engineers", detail: "People who operate the platform — SSO into the AWS account.", x: 40, y: 60, w: 150, h: 56 },
    { id: "sso", label: "IAM Identity Center", sub: "SSO · MFA", detail: "Single sign-on with multi-factor authentication for human access.", x: 260, y: 60, w: 170, h: 56, tone: "accent" },
    { id: "ci", label: "CI pipeline", sub: "GitLab", detail: "The pipeline authenticates keyless — it never holds a static cloud credential.", x: 40, y: 270, w: 150, h: 56 },
    { id: "oidc", label: "OIDC federation", sub: "keyless", detail: "GitLab's OIDC trust lets CI assume a role with no stored key (ADR-010).", x: 260, y: 270, w: 170, h: 56, tone: "accent" },
    { id: "dev-role", label: "Dev", detail: "Scoped role for the dev tier.", x: 520, y: 130, w: 90, h: 44 },
    { id: "qa-role", label: "QA", detail: "Scoped role for the QA tier.", x: 520, y: 190, w: 90, h: 44 },
    { id: "uat-role", label: "UAT", detail: "Scoped role for the UAT tier — the human-approval gate.", x: 520, y: 250, w: 90, h: 44 },
    { id: "preview-role", label: "Preview", detail: "Scoped role for ephemeral preview environments.", x: 630, y: 130, w: 90, h: 44 },
  ],
  containers: [
    { label: "IAM roles — per environment", x: 500, y: 90, w: 240, h: 230 },
  ],
  edges: [
    { d: "M190 88 L260 88", tone: "accent", flow: true, label: "SSO", labelX: 225, labelY: 80 },
    { d: "M190 298 L260 298", tone: "accent", flow: true, label: "OIDC trust", labelX: 225, labelY: 290 },
    { d: "M430 88 C 500 88, 550 90, 620 90", tone: "accent", flow: true },
    { d: "M430 298 C 500 298, 550 315, 620 320", tone: "accent", flow: true, label: "no static creds", labelX: 560, labelY: 336 },
  ],
};

// --- 4. Promotion sequence ------------------------------------------------

const promotionSequence: DiagramSpec = {
  title: "Promotion Sequence — Dev Push to Release",
  description:
    "A feature branch deploys to preview; merging to main builds once and promotes the same digest through dev, QA and UAT — with a human approver gating UAT.",
  textEquivalent:
    "A feature-branch push deploys to a preview environment that is torn down on merge. Merging to main builds the image once and promotes the same digest through dev, QA and UAT. A human approver gates UAT; without approval the promotion is blocked. Production receives the same approved digest.",
  viewBox: "0 0 760 560",
  nodes: [
    { id: "push", label: "Feature branch push", sub: "MR", detail: "A merge request deploys to preview automatically.", x: 60, y: 40, w: 190, h: 56 },
    { id: "preview", label: "Preview", sub: "auto-teardown", detail: "Ephemeral environment, destroyed when the branch merges or closes.", x: 360, y: 40, w: 170, h: 56, tone: "accent" },
    { id: "merge", label: "Merge to main", sub: "build once", detail: "The image is built exactly once — every tier promotes that digest.", x: 60, y: 180, w: 190, h: 56, tone: "accent" },
    { id: "digest", label: "One digest", sub: "promoted, not rebuilt", detail: "The same immutable image digest moves tier to tier (ADR-012).", x: 360, y: 180, w: 170, h: 56, tone: "accent" },
    { id: "dev", label: "Dev", detail: "First deployed tier after merge.", x: 60, y: 340, w: 130, h: 52 },
    { id: "qa", label: "QA", detail: "Automated verification tier.", x: 220, y: 340, w: 130, h: 52 },
    { id: "uat", label: "UAT", sub: "human approve", detail: "A named approver gates UAT via an AWS-STS-enforced IAM role.", x: 380, y: 340, w: 130, h: 52, tone: "gate" },
    { id: "prod", label: "Production", sub: "same digest", detail: "Receives the approved digest with no rebuild.", x: 550, y: 340, w: 160, h: 52, tone: "success" },
    { id: "blocked", label: "Blocked", sub: "no approver", detail: "An unapproved promotion is refused — the gate enforces, it does not warn.", x: 380, y: 470, w: 130, h: 52, tone: "danger" },
  ],
  edges: [
    { d: "M250 68 L360 68", tone: "accent", flow: true, label: "deploy", labelX: 305, labelY: 60 },
    { d: "M250 208 L360 208", tone: "accent", flow: true, label: "build once", labelX: 305, labelY: 200 },
    { d: "M360 208 C 250 208, 125 250, 125 340", tone: "accent", flow: true, label: "promote", labelX: 180, labelY: 280 },
    { d: "M190 366 L220 366", tone: "accent", flow: true },
    { d: "M350 366 L380 366", tone: "accent", flow: true },
    { d: "M510 366 L550 366", tone: "accent", flow: true, label: "approved", labelX: 530, labelY: 358 },
    { d: "M445 392 L445 470", tone: "red", dashed: true, flow: true, flowColour: "#ef4444", label: "no approver", labelX: 500, labelY: 430 },
  ],
};

const DIAGRAMS: DiagramSpec[] = [goldenPath, platformInfra, securityAuth, promotionSequence];

const LEGEND_ITEMS = [
  { color: "bg-accent", label: "Golden path — automated flow" },
  { color: "bg-green-500", label: "Production-proven" },
  { color: "bg-red-500", label: "A gate blocking a bad build" },
  { color: "bg-zinc-500", label: "Provisioning / control" },
];

export function LiveArchitectureDiagrams() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-lg border border-border bg-surface px-5 py-3">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`inline-block h-2.5 w-2.5 rounded-sm ${item.color}`} aria-hidden />
            <span className="text-xs text-foreground-tertiary">{item.label}</span>
          </div>
        ))}
      </div>

      {DIAGRAMS.map((d, i) => (
        <InteractiveDiagram
          key={d.title}
          title={d.title}
          figureNumber={i + 1}
          description={d.description}
          textEquivalent={d.textEquivalent}
          viewBox={d.viewBox}
          nodes={d.nodes}
          edges={d.edges}
          containers={d.containers}
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
        — drawn inline from the reference implementation, not a pre-rendered snapshot.
      </p>
    </div>
  );
}

