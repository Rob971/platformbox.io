import type { Metadata } from "next";
import { AssessmentPage } from "@/components/assessment/assessment-page";

export const metadata: Metadata = {
  title: "Platform Readiness Assessment — PlatformBox.io",
  description:
    "A €2,500 decision-grade assessment of platform risk, economics, delivery friction, strategy, and PlatformBox fit.",
  alternates: {
    canonical: "/assessment",
  },
  openGraph: {
    title: "Platform Readiness Assessment — PlatformBox.io",
    description:
      "A €2,500 decision-grade assessment of platform risk, economics, delivery friction, strategy, and PlatformBox fit.",
    url: "https://www.platformbox.io/assessment",
    siteName: "PlatformBox.io",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PlatformBox — Your developer platform. Live in 14 working days.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Readiness Assessment — PlatformBox.io",
    description:
      "A €2,500 decision-grade assessment of platform risk, economics, delivery friction, strategy, and PlatformBox fit.",
    images: ["/og-image.png"],
  },
};

export default function Assessment() {
  return <AssessmentPage />;
}
