import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  const svg = readFileSync(path.join(root, "scripts/og-image.svg"), "utf8");

  await sharp(Buffer.from(svg), { density: 72 })
    .resize(1200, 630)
    .png()
    .toFile(path.join(root, "public/og-image.png"));

  console.log("✅ Generated public/og-image.png (1200×630)");
}

main().catch((err) => {
  console.error("Failed to generate OG image:", err);
  process.exit(1);
});