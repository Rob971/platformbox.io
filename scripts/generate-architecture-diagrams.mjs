import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SOURCE_URL =
  "https://gitlab.com/api/v4/projects/platform-box-group%2Fplatformbox-idp/repository/files/docs%2Farchitecture%2Farchitecture.md/raw?ref=main";

const DIAGRAM_TITLES = [
  { file: "golden-path", label: "Golden Path — Developer Flow" },
  { file: "platform-infra", label: "Platform Infrastructure" },
  { file: "security-auth", label: "Security & Auth Flow" },
];

function extractMermaidBlocks(markdown) {
  const blocks = [];
  const regex = /```mermaid\n([\s\S]*?)\n```/g;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}



async function main() {
  console.log("Step 1/3: Fetching architecture.md...");
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error("GitLab API returned " + res.status);
  const markdown = await res.text();

  const blocks = extractMermaidBlocks(markdown);
  if (blocks.length === 0) throw new Error("No mermaid blocks found in source");
  console.log("  Found " + blocks.length + " block(s)");

  console.log("Step 2/3: Rendering diagrams (headless browser)...");
  const { launch } = await import("puppeteer");
  const browser = await launch({ headless: true });
  const page = await browser.newPage();

  const mermaidPath = path.join(root, "node_modules", "mermaid", "dist", "mermaid.min.js");
  const mermaidSrc = readFileSync(mermaidPath, "utf8");

  // Load mermaid once via addScriptTag, then set the diagram content separately.
  await page.setContent("<html><body></body></html>");
  await page.addScriptTag({ content: mermaidSrc });
  await page.evaluate(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      themeVariables: {
        fontFamily: '"Geist", "Geist Fallback", sans-serif',
        primaryColor: "rgba(59,130,246,0.12)",
        primaryTextColor: "#93c5fd",
        primaryBorderColor: "rgba(59,130,246,0.4)",
        secondaryColor: "rgba(255,255,255,0.04)",
        secondaryTextColor: "#a1a1aa",
        secondaryBorderColor: "rgba(255,255,255,0.1)",
        tertiaryColor: "rgba(34,197,94,0.1)",
        tertiaryTextColor: "#86efac",
        tertiaryBorderColor: "rgba(34,197,94,0.3)",
        lineColor: "rgba(255,255,255,0.15)",
        background: "#09090b",
        mainBkg: "#09090b",
        nodeBorder: "rgba(255,255,255,0.12)",
        clusterBkg: "rgba(255,255,255,0.03)",
        clusterBorder: "rgba(255,255,255,0.08)",
        titleColor: "#f5f5f5",
        edgeLabelBackground: "transparent",
      },
      themeCSS: [
        ".node .nodeLabel { font-family: Geist, 'Geist Fallback', sans-serif !important; }",
        ".label text, .nodeLabel text, text.label { font-family: Geist, 'Geist Fallback', sans-serif !important; }",
        ".edgeLabel, .edgeLabel p, .edgeLabel span { font-family: Geist, 'Geist Fallback', sans-serif !important; color: #a1a1aa !important; font-size: 13px !important; }",
        ".edgeLabel foreignObject { overflow: visible !important; }",
      ].join("\n"),
    });
  });

  const outDir = path.join(root, "public", "diagrams");
  mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < blocks.length; i++) {
    const code = blocks[i];
    const title = DIAGRAM_TITLES[i];
    if (!title) continue;

    const svg = await page.evaluate((code) => {
      const container = document.createElement("div");
      container.id = "diagram-" + Math.random().toString(36).slice(2);
      container.textContent = code;
      document.body.appendChild(container);
      return mermaid.run({ nodes: [container] }).then(() => {
        const svgEl = container.querySelector("svg");
        return svgEl ? svgEl.outerHTML : null;
      }).finally(() => {
        container.remove();
      });
    }, code);

    if (!svg) throw new Error("No SVG produced for " + title.file);

    // Replace width="100%" with explicit px dimensions from the viewBox.
    const vbMatch = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    const w = vbMatch ? vbMatch[1] : "3108";
    const h = vbMatch ? vbMatch[2] : "587";
    const outSvg = svg.replace('width="100%"', 'width="' + w + '" height="' + h + '"');

    const outPath = path.join(outDir, title.file + ".svg");
    writeFileSync(outPath, outSvg, "utf8");
    const sizeKB = (Buffer.byteLength(outSvg, "utf8") / 1024).toFixed(1);
    console.log("  " + title.file + ".svg (" + sizeKB + " KB)");

    // Render to PNG by loading the SVG in the page, taking a
    // full-page screenshot, then optimizing with sharp.
    const svgHtml =
      "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><style>body{margin:0;background:#09090b;}</style></head><body style=\"width:max-content;min-width:100%\">" +
      outSvg +
      "</body></html>";
    await page.setContent(svgHtml, { waitUntil: "load", timeout: 30000 });
    await page.waitForSelector("svg", { timeout: 10000 });

    const dims = await page.$eval("svg", (el) => ({
      width: Math.ceil(el.getBoundingClientRect().width),
      height: Math.ceil(el.getBoundingClientRect().height),
    }));
    await page.setViewport({ width: Math.min(dims.width, 2800), height: dims.height + 20 });

    const rawPng = await page.screenshot({ type: "png", fullPage: true });

    // Optimize with sharp — resize to display width (~1400px).
    const sharp = (await import("sharp")).default;
    const pngOut = await sharp(rawPng)
      .resize({ width: 1400, withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toBuffer();

    const pngPath = path.join(outDir, title.file + ".png");
    writeFileSync(pngPath, pngOut);
    const pngKB = (pngOut.length / 1024).toFixed(1);
    console.log("  " + title.file + ".png (" + pngKB + " KB) — " + title.label);
  }

  await browser.close();
  console.log("\nStep 3/3: Done — " + blocks.length + " diagram(s) in public/diagrams/");
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});