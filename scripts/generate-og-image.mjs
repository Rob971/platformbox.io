import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// One social preview per product: the site-wide card sells Launch, the
// Assessment card sells the Assessment only (no Launch vocabulary).
const IMAGES = [
  { svg: "scripts/og-image.svg", png: "public/og-image.png" },
  { svg: "scripts/og-image-assessment.svg", png: "public/og-image-assessment.png" },
];

async function main() {
  for (const { svg: svgPath, png } of IMAGES) {
    const svg = readFileSync(path.join(root, svgPath), "utf8");

    await sharp(Buffer.from(svg), { density: 72 })
      .resize(1200, 630)
      .png()
      .toFile(path.join(root, png));

    console.log(`✅ Generated ${png} (1200×630)`);
  }
}

main().catch((err) => {
  console.error("Failed to generate OG image:", err);
  process.exit(1);
});
