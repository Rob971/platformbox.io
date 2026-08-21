"use client";

import { IDP_REPO_URL } from "@/lib/constants";
import { InteractiveDiagram } from "./interactive-diagram";

interface DiagramSpec {
  src: string;
  svgWidth: number;
  svgHeight: number;
  label: string;
}

const DIAGRAMS: DiagramSpec[] = [
  {
    src: "/diagrams/golden-path.svg",
    svgWidth: 3109,
    svgHeight: 588,
    label: "Golden Path — Developer Flow",
  },
  {
    src: "/diagrams/platform-infra.svg",
    svgWidth: 6179,
    svgHeight: 1868,
    label: "Platform Infrastructure",
  },
  {
    src: "/diagrams/security-auth.svg",
    svgWidth: 1267,
    svgHeight: 954,
    label: "Security & Auth Flow",
  },
];

const LEGEND_ITEMS = [
  { color: "bg-green-500", label: "Built & verified" },
  { color: "bg-blue-500", label: "On-demand / verified" },
  { color: "bg-zinc-500", label: "Planned" },
];

export function LiveArchitectureDiagrams() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-3">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-sm ${item.color}`}
              aria-hidden
            />
            <span className="text-xs text-zinc-400">{item.label}</span>
          </div>
        ))}
      </div>

      {DIAGRAMS.map((d, i) => (
        <InteractiveDiagram
          key={d.src}
          src={d.src}
          title={d.label}
          figureNumber={i + 1}
          width={d.svgWidth}
          height={d.svgHeight}
        />
      ))}

      <p className="text-center text-xs text-zinc-500">
        Source:{" "}
        <a
          href={`${IDP_REPO_URL}/-/blob/main/docs/architecture/architecture.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover"
        >
          architecture.md
        </a>{" "}
        — pre-rendered from the reference implementation. To refresh, run{" "}
        <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-zinc-400">
          npm run generate-diagrams
        </code>
        .
      </p>
    </div>
  );
}
