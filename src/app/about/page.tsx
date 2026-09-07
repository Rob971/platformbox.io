import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About — PlatformBox.io",
  description:
    "Roberto Cornano, founder of PlatformBox: 16 years across backend engineering, distributed systems, cloud infrastructure, DevOps and software architecture — and why he started building PlatformBox.",
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  return <AboutPage />;
}
