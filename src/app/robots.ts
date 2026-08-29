import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The same-origin control plane lives at /admin and is
        // customer-confidential — never index it (or the legacy /workspace
        // redirect which lands there). ADR-008.
        disallow: ["/admin", "/workspace"],
      },
    ],
    sitemap: "https://www.platformbox.io/sitemap.xml",
  };
}