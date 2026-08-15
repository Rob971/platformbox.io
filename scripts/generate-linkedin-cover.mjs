import { readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  const svg = readFileSync(path.join(root, "scripts/linkedin-cover.svg"), "utf8");

  const outputPath = path.join(root, "public/linkedin-cover.png");

  await sharp(Buffer.from(svg), { density: 72 })
    .resize(4200, 700)
    .png()
    .toFile(outputPath);

  // Validate against LinkedIn specs
  const meta = await sharp(outputPath).metadata();
  const fileSize = statSync(outputPath).size;
  const sizeMB = (fileSize / (1024 * 1024)).toFixed(2);

  if (meta.width !== 4200 || meta.height !== 700) {
    console.error(`❌ LinkedIn cover dimensions must be 4200×700, got ${meta.width}×${meta.height}`);
    process.exit(1);
  }
  if (fileSize > 3 * 1024 * 1024) {
    console.error(`❌ LinkedIn cover must be under 3MB, got ${sizeMB}MB`);
    process.exit(1);
  }

  console.log(`✅ Generated public/linkedin-cover.png (${meta.width}×${meta.height}, ${sizeMB}MB)`);
}

main().catch((err) => {
  console.error("Failed to generate LinkedIn cover:", err);
  process.exit(1);
});
