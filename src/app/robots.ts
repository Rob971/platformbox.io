import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The same-origin proxies to the delivery control plane are
        // customer-confidential — never index the workspace or the admin
        // console (ADR-008).
        disallow: ["/workspace", "/admin/delivery"],
      },
    ],
    sitemap: "https://www.platformbox.io/sitemap.xml",
  };
}