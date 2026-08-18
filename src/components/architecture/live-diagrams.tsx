"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fetches the single source of truth for these diagrams (platformbox-idp's
 * architecture.md) and renders them client-side with Mermaid. No local copy
 * of the diagram content exists in this repo - edit the source, push, and
 * the next page load here reflects it. No rebuild/redeploy needed on this
 * side.
 *
 * Uses the GitLab API's raw-file endpoint (not the plain /-/raw/ blob URL):
 * only the API endpoint sends Access-Control-Allow-Origin, which a
 * cross-origin browser fetch requires. Confirmed by direct testing.
 */
const SOURCE_URL =
  "https://gitlab.com/api/v4/projects/platform-box-group%2Fplatformbox-idp/repository/files/docs%2Farchitecture%2Farchitecture.md/raw?ref=main";

const SOURCE_HUMAN_URL =
  "https://gitlab.com/platform-box-group/platformbox-idp/-/blob/main/docs/architecture/architecture.md";

// Fixed order matching the source document's ### 3.1 / 3.2 / 3.3 headings.
// Only the diagram *content* is fetched live - these labels are local UI
// chrome, not a second copy of the diagrams themselves.
const DIAGRAM_TITLES = ["Golden Path — Developer Flow", "Platform Infrastructure", "Security & Auth Flow"];

function extractMermaidBlocks(markdown: string): string[] {
  const blocks: string[] = [];
  const regex = /```mermaid\n([\s\S]*?)\n```/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(markdown)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}

export function LiveArchitectureDiagrams() {
  const [blocks, setBlocks] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(SOURCE_URL, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.text();
      })
      .then((text) => {
        const found = extractMermaidBlocks(text);
        if (found.length === 0) throw new Error("no diagrams found in source");
        if (!cancelled) setBlocks(found);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "failed to load");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm text-zinc-400">
        Couldn&apos;t load the live diagrams right now. View them directly on{" "}
        <a
          href={SOURCE_HUMAN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover"
        >
          GitLab
        </a>
        .
      </div>
    );
  }

  if (!blocks) {
    return (
      <div className="space-y-8">
        {DIAGRAM_TITLES.map((title) => (
          <div key={title} className="h-64 animate-pulse rounded-xl border border-white/10 bg-white/[0.03]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {blocks.map((code, i) => (
        <DiagramCard key={i} title={DIAGRAM_TITLES[i] ?? `Diagram ${i + 1}`} code={code} />
      ))}
    </div>
  );
}

function DiagramCard({ title, code }: { title: string; code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    import("mermaid").then(async ({ default: mermaid }) => {
      try {
        mermaid.initialize({ startOnLoad: false, theme: "dark", securityLevel: "strict" });
        const id = `arch-diagram-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, code);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled) setRenderError(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code]);

  return (
    <div className="rounded-xl border border-white/10 p-2 sm:p-4">
      <p className="mb-2 px-2 text-sm font-semibold text-white sm:px-3">{title}</p>
      {renderError ? (
        <p className="px-2 py-8 text-center text-sm text-zinc-500 sm:px-3">Couldn&apos;t render this diagram.</p>
      ) : (
        <div ref={containerRef} className="[&_svg]:h-auto [&_svg]:w-full" />
      )}
    </div>
  );
}
