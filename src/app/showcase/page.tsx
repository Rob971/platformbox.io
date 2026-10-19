import type { Metadata } from "next";
import { ShowcasePage } from "@/components/showcase/showcase-page";

export const metadata: Metadata = {
  title: "The 14-Day Blueprint — PlatformBox.io",
  description:
    "See exactly what your team receives: the deliverables and platform capabilities that ship in a fixed-price, 14-working-day engagement.",
  alternates: {
    canonical: "/showcase",
  },
  openGraph: {
    title: "The 14-Day Blueprint — PlatformBox.io",
    description:
      "See exactly what your team receives: the deliverables and platform capabilities that ship in a fixed-price, 14-working-day engagement.",
    url: "https://www.platformbox.io/showcase",
    siteName: "PlatformBox.io",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The 14-Day Blueprint — PlatformBox.io",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The 14-Day Blueprint — PlatformBox.io",
    description:
      "See exactly what your team receives: the deliverables and platform capabilities that ship in a fixed-price, 14-working-day engagement.",
    images: ["/og-image.png"],
  },
};

export default function Showcase() {
  return <ShowcasePage />;
}
