import type { NextConfig } from "next";

/**
 * Static marketing site for GitHub Pages + custom domain (platformbox.io).
 * No basePath: custom domains serve from `/`. Using `/platformbox.io` would
 * break assets on www.platformbox.io.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
