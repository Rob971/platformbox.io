#!/usr/bin/env node
/**
 * Mechanical enforcement for PlatformBox agent / architecture rules.
 * Exit 0 on success; non-zero with actionable errors on failure.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function walk(dir, filter, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(full, filter, out);
    } else if (filter(entry.name, full)) {
      out.push(full);
    }
  }
  return out;
}

// --- Required agent rule files ---
const requiredRules = [
  "01-coding.md",
  "02-architecture.md",
  "03-design.md",
  "04-quality.md",
  "05-motion.md",
];

for (const file of requiredRules) {
  const rel = `.clinerules/${file}`;
  assert(exists(rel), `Missing required Clinerules file: ${rel}`);
}

// --- AGENTS.md ---
assert(exists("AGENTS.md"), "Missing AGENTS.md");
if (exists("AGENTS.md")) {
  const agents = read("AGENTS.md");
  assert(
    agents.includes("BEGIN:nextjs-agent-rules"),
    "AGENTS.md must keep Next.js BEGIN:nextjs-agent-rules marker",
  );
  assert(
    agents.includes("node_modules/next/dist/docs"),
    "AGENTS.md must point agents at bundled Next.js docs",
  );
}

// --- Banned framework / routing patterns ---
assert(!exists("middleware.ts"), "Forbidden: middleware.ts (use proxy.ts per Next.js 16)");
assert(!exists("middleware.js"), "Forbidden: middleware.js (use proxy.ts per Next.js 16)");
assert(!exists("src/middleware.ts"), "Forbidden: src/middleware.ts (use proxy.ts)");
assert(!exists("src/middleware.js"), "Forbidden: src/middleware.js (use proxy.ts)");
assert(!exists("pages"), "Forbidden: pages/ directory (App Router only)");
assert(!exists("src/pages"), "Forbidden: src/pages/ directory (App Router only)");

// --- Server Component entrypoints ---
for (const rel of ["src/app/page.tsx", "src/app/layout.tsx"]) {
  assert(exists(rel), `Missing ${rel}`);
  if (!exists(rel)) continue;
  const src = read(rel);
  assert(
    !/^\s*["']use client["']\s*;/m.test(src),
    `${rel} must remain a Server Component (no top-level "use client")`,
  );
}

// --- Design tokens ---
assert(exists("src/app/globals.css"), "Missing src/app/globals.css");
if (exists("src/app/globals.css")) {
  const css = read("src/app/globals.css");
  for (const token of [
    '@import "tailwindcss"',
    "@theme inline",
    "--background",
    "--foreground",
    "--accent",
    "--accent-hover",
    "--font-geist-sans",
  ]) {
    assert(css.includes(token), `globals.css missing required token/setup: ${token}`);
  }
}

// --- package.json stack lock ---
assert(exists("package.json"), "Missing package.json");
if (exists("package.json")) {
  const pkg = JSON.parse(read("package.json"));
  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  const required = ["next", "react", "react-dom", "framer-motion", "lucide-react", "tailwindcss"];
  for (const name of required) {
    assert(allDeps[name], `package.json missing required dependency: ${name}`);
  }

  const banned = [
    "styled-components",
    "@emotion/react",
    "@emotion/styled",
    "@mui/material",
    "pages",
  ];
  for (const name of banned) {
    assert(!allDeps[name], `Banned dependency present: ${name}`);
  }

  assert(pkg.scripts?.enforce, 'package.json scripts.enforce is required');
  assert(pkg.scripts?.check, 'package.json scripts.check is required');
  assert(pkg.scripts?.lint, 'package.json scripts.lint is required');
  assert(pkg.scripts?.build, 'package.json scripts.build is required');
}

// --- No "use client" leaked into route files beyond page/layout already checked ---
const routeFiles = walk(path.join(root, "src/app"), (name) =>
  /^(page|layout|template|default|route)\.(t|j)sx?$/.test(name),
);
for (const full of routeFiles) {
  const rel = path.relative(root, full);
  const src = read(rel);
  // error.tsx / global-error must be client — allow those filenames only
  if (/error\.(t|j)sx?$/.test(rel)) continue;
  assert(
    !/^\s*["']use client["']\s*;/m.test(src),
    `${rel} should not be a Client Component (keep client islands in src/components)`,
  );
}

// --- Report ---
if (errors.length) {
  console.error("\nAgent rule enforcement failed:\n");
  for (const err of errors) console.error(`  ✖ ${err}`);
  console.error(`\n${errors.length} violation(s). Fix these or update scripts/enforce-agent-rules.mjs intentionally.\n`);
  process.exit(1);
}

console.log("Agent rule enforcement passed.");
