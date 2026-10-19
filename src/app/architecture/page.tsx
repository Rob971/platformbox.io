import type { Metadata } from "next";
import { ArchitecturePage } from "@/components/architecture/architecture-page";

export const metadata: Metadata = {
  title: "Technical Reference Architecture — PlatformBox.io",
  description:
    "The PlatformBox reference architecture: Terraform, Kubernetes/EKS, GitHub/GitLab, CI/CD, GitOps, IAM, security, and observability — built on your stack and owned by you.",
  alternates: {
    canonical: "/architecture",
  },
  openGraph: {
    title: "Technical Reference Architecture — PlatformBox.io",
    description:
      "The PlatformBox reference architecture: Terraform, Kubernetes/EKS, GitHub/GitLab, CI/CD, GitOps, IAM, security, and observability — built on your stack and owned by you.",
    url: "https://www.platformbox.io/architecture",
    siteName: "PlatformBox.io",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Technical Reference Architecture — PlatformBox.io",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Reference Architecture — PlatformBox.io",
    description:
      "The PlatformBox reference architecture: Terraform, Kubernetes/EKS, GitHub/GitLab, CI/CD, GitOps, IAM, security, and observability — built on your stack and owned by you.",
    images: ["/og-image.png"],
  },
};

export default function Architecture() {
  return <ArchitecturePage />;
}
