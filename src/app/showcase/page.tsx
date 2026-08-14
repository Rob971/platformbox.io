import type { Metadata } from "next";
import { ShowcasePage } from "@/components/showcase/showcase-page";

export const metadata: Metadata = {
  title: "The 14-Day Blueprint — PlatformBox.io",
  description:
    "See exactly what your team receives: the deliverables and platform capabilities that ship in a fixed-price, 14-working-day engagement.",
  alternates: {
    canonical: "/showcase",
  },
};

export default function Showcase() {
  return <ShowcasePage />;
}
