import type { NextConfig } from "next";

/**
 * PlatformBox.io marketing site — deployed on Vercel with custom domain
 * (www.platformbox.io). No basePath: custom domains serve from `/`.
 */
const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_COMMIT_SHA ?? "dev",
  },

  async headers() {
    return [
      {
        // Exclude /admin and /admin/* — proxy.ts (G0) owns the /admin header
        // policy: it forwards the delivery application's own CSP and sets
        // baseline edge headers. The marketing-site CSP must never be
        // combined with the delivery CSP on /admin.
        source: "/((?!admin).*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://gitlab.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
