import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  const svg = readFileSync(path.join(root, "scripts/logo-source.svg"), "utf8");

  // Full logo — 400×400 with dark background (for LinkedIn)
  await sharp(Buffer.from(svg), { density: 72 })
    .resize(400, 400)
    .png()
    .toFile(path.join(root, "public/brand-logo.png"));

  // Icon version — 400×400 transparent (for partner sites, favicon)
  const svgTransparent = readFileSync(path.join(root, "scripts/logo-icon.svg"), "utf8");
  await sharp(Buffer.from(svgTransparent), { density: 72 })
    .resize(400, 400)
    .png()
    .toFile(path.join(root, "public/brand-logo-icon.png"));

  console.log("✅ Generated public/brand-logo.png (400×400, dark bg)");
  console.log("✅ Generated public/brand-logo-icon.png (400×400, transparent)");
}

main().catch((err) => {
  console.error("Failed to generate logo:", err);
  process.exit(1);
});