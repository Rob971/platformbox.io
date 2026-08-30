"use client";

import { useId, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DiagramMarkers, Edge, DiagramNode, NodeLabel, DiagramFigure, type EdgeTone, type NodeTone } from "./svg-kit";

export interface DiagramNodeSpec {
  id: string;
  label: string;
  sub?: string;
  detail: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: NodeTone;
}

export interface DiagramEdgeSpec {
  d: string;
  tone?: EdgeTone;
  dashed?: boolean;
  label?: string;
  labelX?: number;
  labelY?: number;
  flow?: boolean;
  flowDur?: number;
  flowDelay?: number;
  /** Colour of the travelling dot (defaults to the edge tone). */
  flowColour?: string;
}

export interface DiagramContainerSpec {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface InteractiveDiagramProps {
  title: string;
  figureNumber: number;
  description: string;
  textEquivalent: string;
  viewBox: string;
  nodes: DiagramNodeSpec[];
  edges?: DiagramEdgeSpec[];
  containers?: DiagramContainerSpec[];
  /** Extra SVG content (e.g. a legend key inside the canvas). */
  children?: ReactNode;
}

/**
 * A real inline-SVG topology diagram. Replaces the old "fetch a pre-rendered
 * mermaid SVG and zoom it" viewer: nodes are keyboard-reachable, edges are
 * typed paths with arrowheads and flow animation, and detail surfaces on
 * hover/focus rather than being dumped onto the canvas.
 */
export function InteractiveDiagram({
  title,
  figureNumber,
  description,
  textEquivalent,
  viewBox,
  nodes,
  edges = [],
  containers = [],
  children,
}: InteractiveDiagramProps) {
  const prefix = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const shown = pinnedId ?? activeId;
  const active = nodes.find((n) => n.id === shown);

  return (
    <figure className="m-0">
      <figcaption className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-sm font-medium text-foreground">
          <span className="mr-2 font-mono text-xs text-muted">Fig. {figureNumber}</span>
          {title}
        </span>
        <span className="text-[11px] text-muted">Hover or focus a node · Enter to pin</span>
      </figcaption>

      <DiagramFigure title={title} description={description} textEquivalent={textEquivalent}>
        <div className="overflow-auto rounded-xl border border-border bg-card p-4" style={{ maxHeight: "78vh" }}>
          <svg viewBox={viewBox} className="h-auto" style={{ minWidth: 560 }}>
            <DiagramMarkers prefix={prefix} />

            {containers.map((c) => (
              <g key={c.label}>
                <rect
                  x={c.x} y={c.y} width={c.w} height={c.h} rx={12}
                  fill="var(--surface)" stroke="var(--border-strong)" strokeWidth={1} strokeDasharray="6 4"
                />
                <text x={c.x + 12} y={c.y + 18} fontSize="11" fontWeight={600} fill="var(--accent)" stroke="none">
                  {c.label}
                </text>
              </g>
            ))}

            {edges.map((e, i) => (
              <Edge
                key={i}
                prefix={prefix}
                d={e.d}
                tone={e.tone ?? "muted"}
                dashed={e.dashed}
                label={e.label}
                labelX={e.labelX}
                labelY={e.labelY}
                flow={e.flow}
                flowDur={e.flowDur}
                flowDelay={e.flowDelay}
                flowColour={e.flowColour}
              />
            ))}

            {nodes.map((n) => (
              <DiagramNode
                key={n.id}
                id={n.id}
                label={n.label}
                detail={n.detail}
                x={n.x} y={n.y} w={n.w} h={n.h}
                tone={n.tone ?? "plain"}
                active={shown === n.id}
                onMouseEnter={() => setActiveId(n.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(n.id)}
                onBlur={() => setActiveId(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPinnedId((p) => (p === n.id ? null : n.id));
                  }
                }}
              >
                <NodeLabel x={n.x} y={n.y} width={n.w} text={n.label} sub={n.sub} />
              </DiagramNode>
            ))}

            {children}
          </svg>
        </div>
      </DiagramFigure>

      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.16 }}
            className="overflow-hidden"
          >
            <p className="mt-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground-tertiary">
              <span className="font-semibold text-foreground">{active.label} — </span>
              {active.detail}
            </p>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-[11px] text-muted"
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>
    </figure>
  );
}
