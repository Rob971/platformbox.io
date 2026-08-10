import type { NextConfig } from "next";

/**
 * Static marketing site for GitHub Pages + custom domain (platformbox.io).
 * No basePath: custom domains serve from `/`. Using `/platformbox.io` would
 * break assets on www.platformbox.io.
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_COMMIT_SHA ?? "dev",
  },
};

export default nextConfig;
