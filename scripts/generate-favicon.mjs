import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function icoHeader(count) {
  const buf = Buffer.alloc(6);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(count, 4);
  return buf;
}

function icoEntry(width, height, offset, size) {
  const buf = Buffer.alloc(16);
  buf.writeUInt8(width === 256 ? 0 : width, 0);
  buf.writeUInt8(height === 256 ? 0 : height, 1);
  buf.writeUInt8(0, 2);
  buf.writeUInt8(0, 3);
  buf.writeUInt16LE(1, 4);
  buf.writeUInt16LE(32, 6);
  buf.writeUInt32LE(size, 8);
  buf.writeUInt32LE(offset, 12);
  return buf;
}

async function buildIco(source, bg) {
  const sizes = [16, 32, 48];
  const pngBuffers = [];
  let offset = 6 + sizes.length * 16;

  for (const size of sizes) {
    // Composite the source (transparent logo) onto a solid background
    // so the favicon always has the correct background for its theme.
    const bgLayer = await sharp({
      create: { width: size, height: size, channels: 4, background: bg },
    })
      .png()
      .toBuffer();
    const logo = await sharp(source).resize(size, size).png().toBuffer();
    const buf = await sharp(bgLayer)
      .composite([{ input: logo }])
      .png()
      .toBuffer();
    pngBuffers.push({ size, buf, offset });
    offset += buf.length;
    console.log(`  ${size}x${size} (${buf.length} bytes)`);
  }

  const entries = pngBuffers.map((p) =>
    icoEntry(p.size, p.size, p.offset, p.buf.length),
  );
  return Buffer.concat([
    icoHeader(sizes.length),
    ...entries,
    ...pngBuffers.map((p) => p.buf),
  ]);
}

export async function main() {
  const source = readFileSync(path.join(root, "public/brand-logo.png"));

  // Dark-mode favicon (default) — composited on #09090b
  console.log("favicon.ico (dark background #09090b):");
  const darkIco = await buildIco(source, "#09090b");
  writeFileSync(path.join(root, "public/favicon.ico"), darkIco);
  console.log(`  → ${darkIco.length} bytes`);

  // Light-mode favicon — same dark-background mark for now.
  // TODO: design a light-mode variant of the logo mark where the
  // left bar uses a darker stroke so it reads on white. When ready,
  // change the background below to #ffffff or #f1f5f9 and update
  // the source SVG in scripts/logo-source.svg accordingly.
  console.log("favicon-light.ico (same as dark for now):");
  const lightIco = await buildIco(source, "#09090b");
  writeFileSync(path.join(root, "public/favicon-light.ico"), lightIco);
  console.log(`  → ${lightIco.length} bytes`);

  // Apple touch icon — 180×180, dark background (same as the favicon default)
  const appleBuf = await sharp(source)
    .resize(180, 180)
    .png()
    .toBuffer();
  writeFileSync(path.join(root, "public/apple-touch-icon.png"), appleBuf);
  console.log(
    `apple-touch-icon.png (180x180, ${appleBuf.length} bytes)`,
  );
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});