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

async function main() {
  const source = readFileSync(path.join(root, "public/brand-logo.png"));
  const sizes = [16, 32, 48];
  const pngBuffers = [];
  let offset = 6 + sizes.length * 16;

  for (const size of sizes) {
    const buf = await sharp(source).resize(size, size).png().toBuffer();
    pngBuffers.push({ size, buf, offset });
    offset += buf.length;
    console.log("  " + size + "x" + size + " PNG (" + buf.length + " bytes)");
  }

  const entries = pngBuffers.map(function(p) {
    return icoEntry(p.size, p.size, p.offset, p.buf.length);
  });

  const ico = Buffer.concat([icoHeader(sizes.length), ...entries, ...pngBuffers.map(function(p) { return p.buf; })]);
  writeFileSync(path.join(root, "public/favicon.ico"), ico);
  console.log("favicon.ico (" + ico.length + " bytes, " + sizes.length + " sizes)");

  const appleBuf = await sharp(source).resize(180, 180).png().toBuffer();
  writeFileSync(path.join(root, "public/apple-touch-icon.png"), appleBuf);
  console.log("apple-touch-icon.png (180x180, " + appleBuf.length + " bytes)");
}

main().catch(function(err) {
  console.error("Failed:", err);
  process.exit(1);
});