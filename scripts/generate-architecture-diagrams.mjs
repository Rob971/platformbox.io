import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, renameSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";

/**
 * Pre-renders the Mermaid diagrams from docs/architecture/architecture-diagram.md
 * into static SVGs for the /architecture page. That source file uses a
 * verified/ephemeral/planned convention with claims traceable to ADRs in the
 * sibling platformbox-idp repo - see its own "Source of truth" section.
 * Static export (next.config.ts -> out/) has no server, so this runs
 * locally/manually - same pattern as the other scripts/generate-* assets
 * (favicon, OG image, LinkedIn cover). Not wired into `build`/`check`:
 * re-run manually (`npm run generate:diagrams`) whenever the source markdown
 * changes, and commit the regenerated SVGs.
 *
 * Uses `npx --yes @mermaid-js/mermaid-cli` rather than a devDependency -
 * mermaid-cli bundles Puppeteer/Chromium (~300MB), too heavy to keep
 * permanently installed for an occasional local generation step.
 */

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "docs", "architecture", "architecture-diagram.md");
const outDir = path.join(root, "public", "architecture");

// Order matches the headings in architecture-diagram.md - mermaid-cli names
// output files <base>-1.svg, <base>-2.svg, ... in document order.
const names = ["golden-path", "platform-infrastructure", "security-auth-flow"];

// Dark theme (site is permanently dark-mode - .clinerules/03-design.md) with
// a background matching the site's --card token, so the diagram reads as an
// inset panel rather than a mismatched light rectangle. The verified/
// ephemeral/planned classDef colors in the source are pill-style saturated
// colors that hold up against dark backgrounds unchanged - only the parts
// Mermaid's own theme controls (subgraph borders, default text, edge lines)
// need the dark theme applied.
const mermaidConfig = {
  theme: "dark",
};

function main() {
  if (!existsSync(source)) {
    console.error(`\nCannot find diagram source at:\n  ${source}\n`);
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });
  const workDir = mkdtempSync(path.join(tmpdir(), "platformbox-diagrams-"));
  const configPath = path.join(workDir, "mermaid-config.json");
  const outputMd = path.join(workDir, "rendered.md");

  execFileSync("node", ["-e", `require("fs").writeFileSync(${JSON.stringify(configPath)}, ${JSON.stringify(JSON.stringify(mermaidConfig))})`]);

  console.log("Rendering diagrams from", path.relative(root, source));
  execFileSync(
    "npx",
    [
      "--yes",
      "@mermaid-js/mermaid-cli@latest",
      "-i",
      source,
      "-o",
      outputMd,
      "--configFile",
      configPath,
      "--backgroundColor",
      "#0f0f12",
    ],
    { stdio: "inherit" },
  );

  const rendered = readdirSync(workDir)
    .filter((f) => f.endsWith(".svg"))
    .sort((a, b) => {
      const numA = parseInt(a.match(/-(\d+)\.svg$/)?.[1] ?? "0", 10);
      const numB = parseInt(b.match(/-(\d+)\.svg$/)?.[1] ?? "0", 10);
      return numA - numB;
    });

  if (rendered.length !== names.length) {
    throw new Error(`Expected ${names.length} diagrams, mermaid-cli produced ${rendered.length}`);
  }

  rendered.forEach((file, i) => {
    const dest = path.join(outDir, `${names[i]}.svg`);
    renameSync(path.join(workDir, file), dest);
    console.log(`Wrote public/architecture/${names[i]}.svg`);
  });

  rmSync(workDir, { recursive: true, force: true });
  console.log(`Generated ${names.length} diagrams into public/architecture/`);
}

main();
