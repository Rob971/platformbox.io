import type { Metadata } from "next";
import { ArchitecturePage } from "@/components/architecture/architecture-page";

export const metadata: Metadata = {
  title: "Technical Reference Architecture — PlatformBox.io",
  description:
    "The PlatformBox reference architecture: Terraform, Kubernetes/EKS, GitHub/GitLab, CI/CD, GitOps, IAM, security, and observability — built on your stack and owned by you.",
  alternates: {
    canonical: "/architecture",
  },
};

export default function Architecture() {
  return <ArchitecturePage />;
}
