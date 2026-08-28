import type { NextConfig } from "next";

/**
 * PlatformBox.io marketing site — deployed on Vercel with custom domain
 * (www.platformbox.io). No basePath: custom domains serve from `/`.
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_COMMIT_SHA ?? "dev",
  },

  async redirects() {
    // The branded path to the delivery workspace. ADR-008 (revised): the app
    // lives directly on app.platformbox.io; /workspace is a TEMPORARY redirect
    // so the destination can change without a marketing redeploy. permanent:
    // false is deliberate — 308s are cached indefinitely by browsers and
    // painful to walk back. Promote to permanent only once a real customer has
    // shipped.
    return [
      { source: "/workspace", destination: "https://app.platformbox.io", permanent: false },
      // trailingSlash: true normalises /workspace to /workspace/ before
      // matching, so the slash form must be explicit to avoid a second hop.
      { source: "/workspace/", destination: "https://app.platformbox.io/", permanent: false },
      { source: "/workspace/:path*", destination: "https://app.platformbox.io/:path*", permanent: false },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
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
