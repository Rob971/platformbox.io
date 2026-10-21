import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About — PlatformBox.io",
  description:
    "Roberto Cornano, founder of PlatformBox: 16 years across backend engineering, distributed systems, cloud infrastructure, DevOps and software architecture — and why he started building PlatformBox.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — PlatformBox.io",
    description:
      "Roberto Cornano, founder of PlatformBox: 16 years across backend engineering, distributed systems, cloud infrastructure, DevOps and software architecture — and why he started building PlatformBox.",
    url: "https://www.platformbox.io/about",
    siteName: "PlatformBox.io",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About — PlatformBox.io",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — PlatformBox.io",
    description:
      "Roberto Cornano, founder of PlatformBox: 16 years across backend engineering, distributed systems, cloud infrastructure, DevOps and software architecture — and why he started building PlatformBox.",
    images: ["/og-image.png"],
  },
};

export default function About() {
  return <AboutPage />;
}
