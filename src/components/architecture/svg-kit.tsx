"use client";

// Shared, accessible SVG building blocks for the architecture diagrams.
//
// These replace the old "fetch a pre-rendered mermaid SVG" approach with real
// inline vector work: typed edges with arrowheads, keyboard-reachable nodes,
// flow animation along paths (honouring prefers-reduced-motion), and a text
// equivalent for assistive tech.

import { useId, type ReactNode, type KeyboardEvent } from "react";
import { useReducedMotion } from "framer-motion";

export type EdgeTone = "accent" | "muted" | "green" | "red" | "orange";

const edgeStroke: Record<EdgeTone, string> = {
  accent: "var(--accent)",
  muted: "var(--muted)",
  green: "#22c55e",
  red: "#ef4444",
  orange: "#f97316",
};

/** Arrowhead markers keyed by tone, registered once per SVG via a unique prefix. */
export function DiagramMarkers({ prefix }: { prefix: string }) {
  return (
    <defs>
      {(Object.keys(edgeStroke) as EdgeTone[]).map((tone) => (
        <marker
          key={tone}
          id={`${prefix}-${tone}`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={edgeStroke[tone]} />
        </marker>
      ))}
    </defs>
  );
}

interface EdgeProps {
  prefix: string;
  d: string;
  tone?: EdgeTone;
  dashed?: boolean;
  width?: number;
  label?: string;
  labelX?: number;
  labelY?: number;
  /** Animate a dot travelling along this edge. */
  flow?: boolean;
  flowDur?: number;
  flowDelay?: number;
  flowColour?: string;
}

/** A directed edge — real vector path with an arrowhead and optional flow. */
export function Edge({
  prefix,
  d,
  tone = "muted",
  dashed = false,
  width = 1.5,
  label,
  labelX = 0,
  labelY = -6,
  flow = false,
  flowDur = 2.4,
  flowDelay = 0,
  flowColour,
}: EdgeProps) {
  const reduce = useReducedMotion();
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={edgeStroke[tone]}
        strokeWidth={width}
        strokeDasharray={dashed ? "5 4" : undefined}
        markerEnd={`url(#${prefix}-${tone})`}
      />
      {label && (
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          fontSize="10"
          fill="var(--muted)"
          stroke="none"
        >
          {label}
        </text>
      )}
      {flow && !reduce && (
        <circle r="3" fill={flowColour ?? edgeStroke[tone]}>
          <animateMotion
            dur={`${flowDur}s`}
            begin={`${flowDelay}s`}
            repeatCount="indefinite"
            path={d}
          />
        </circle>
      )}
    </g>
  );
}

/** Centred node label plus an optional second line, sized to fit the node. */
export function NodeLabel({
  x,
  y,
  text,
  sub,
  width,
}: {
  x: number;
  y: number;
  text: string;
  sub?: string;
  width: number;
}) {
  return (
    <g pointerEvents="none">
      <text
        x={x + width / 2}
        y={sub ? y : y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="11.5"
        fontWeight={600}
        fill="var(--foreground)"
      >
        {text}
      </text>
      {sub && (
        <text
          x={x + width / 2}
          y={y + 13}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="9"
          fill="var(--muted)"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

export type NodeTone = "plain" | "accent" | "gate" | "success" | "danger";

const nodeStroke: Record<NodeTone, string> = {
  plain: "var(--border-strong)",
  accent: "var(--accent)",
  gate: "var(--accent)",
  success: "#22c55e",
  danger: "#ef4444",
};

interface DiagramNodeProps {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: NodeTone;
  active?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onKeyDown?: (e: KeyboardEvent<SVGGElement>) => void;
  children?: ReactNode;
}

/**
 * A keyboard-reachable, focus-visible node. Silhouette is the label; the full
 * detail surfaces in the legend on hover/focus, so the canvas is never a wall
 * of text.
 */
export function DiagramNode({
  label,
  detail,
  x,
  y,
  w,
  h,
  tone = "plain",
  active = false,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  children,
}: DiagramNodeProps) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${label}. ${detail}`}
      data-active={active || undefined}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      className="cursor-pointer outline-none"
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill="var(--card)"
        stroke={active ? nodeStroke[tone] : "var(--border-strong)"}
        strokeWidth={active ? 2 : 1}
        style={{ transition: "stroke 160ms ease" }}
      />
      {children ?? <NodeLabel x={x} y={y} text={label} width={w} />}
    </g>
  );
}

interface DiagramFigureProps {
  title: string;
  description: string;
  /** The structure as plain text — a full equivalent for assistive tech. */
  textEquivalent: string;
  children: ReactNode;
}

/** The accessible wrapper: figure, caption, and a screen-reader-only structure. */
export function DiagramFigure({ title, description, textEquivalent, children }: DiagramFigureProps) {
  const titleId = useId();
  const descId = useId();
  return (
    <figure
      role="figure"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="m-0"
    >
      <figcaption id={titleId} className="sr-only">
        {title}
      </figcaption>
      <p id={descId} className="sr-only">
        {description}
      </p>
      <div className="sr-only">{textEquivalent}</div>
      {children}
    </figure>
  );
}
