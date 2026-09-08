import type { Metadata } from "next";
import { AssessmentPage } from "@/components/assessment/assessment-page";

export const metadata: Metadata = {
  title: "Platform Readiness Assessment — PlatformBox.io",
  description:
    "A €2,500 decision-grade assessment of platform risk, economics, delivery friction, strategy, and PlatformBox fit.",
  alternates: {
    canonical: "/assessment",
  },
};

export default function Assessment() {
  return <AssessmentPage />;
}
