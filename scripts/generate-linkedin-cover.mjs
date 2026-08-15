import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  const svg = readFileSync(path.join(root, "scripts/linkedin-cover.svg"), "utf8");

  await sharp(Buffer.from(svg), { density: 72 })
    .resize(4200, 700)
    .png()
    .toFile(path.join(root, "public/linkedin-cover.png"));

  console.log("✅ Generated public/linkedin-cover.png (4200×700)");
}

main().catch((err) => {
  console.error("Failed to generate LinkedIn cover:", err);
  process.exit(1);
});
