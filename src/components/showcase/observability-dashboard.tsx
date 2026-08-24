"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, BarChart3, List, Server } from "lucide-react";

interface ObsNode {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  w: number;
  h: number;
  icon: typeof Activity;
}

const nodes: ObsNode[] = [
  { id: "apps", label: "Applications", description: "Services auto-instrumented with OpenTelemetry SDKs — traces, metrics, and logs captured at the source.", x: 15, y: 10, w: 85, h: 55, icon: Server },
  { id: "collector", label: "OTel Collector", description: "Sidecar collector receives, processes, and exports telemetry data — no code changes needed after initial wiring.", x: 120, y: 10, w: 85, h: 55, icon: Activity },
  { id: "prometheus", label: "Prometheus", description: "Time-series metrics database with pre-built alerting rules for SLOs, error rates, and latency.", x: 35, y: 100, w: 85, h: 50, icon: BarChart3 },
  { id: "grafana", label: "Grafana", description: "Pre-built dashboards for every service: RED metrics, logs, and traces in a single pane of glass.", x: 175, y: 100, w: 85, h: 50, icon: BarChart3 },
  { id: "loki", label: "Loki", description: "Centralized log aggregation — every service log is shipped, indexed, and queryable from Grafana.", x: 105, y: 110, w: 55, h: 30, icon: List },
];

export function ObservabilityDashboard() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const svgW = 280;
  const svgH = 175;

  return (
    <div className="w-full max-w-sm mx-auto">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto" role="img" aria-label="Observability Architecture">
        {/* Connection lines */}
        <path d="M100 37 L120 37" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arrowObs)" />
        <path d="M162 65 L162 95 L77 95 L77 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 2" />
        <path d="M162 65 L217 95 L217 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 2" />
        <path d="M162 65 L132 105 L132 110" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />

        <defs>
          <marker id="arrowObs" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.15)" />
          </marker>
        </defs>

        {nodes.map((node) => {
          const isHovered = hoveredId === node.id;
          const Icon = node.icon;
          return (
            <g key={node.id}>
              <rect
                x={node.x} y={node.y} width={node.w} height={node.h}
                rx="6" fill={isHovered ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.03)"}
                stroke={isHovered ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.12)"}
                strokeWidth={isHovered ? 1.5 : 1}
                className="transition-all duration-200 cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label={`${node.label} — ${node.description}`}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(node.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => setHoveredId(hoveredId === node.id ? null : node.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setHoveredId(hoveredId === node.id ? null : node.id);
                  }
                }}
              />
              <foreignObject x={node.x + 6} y={node.y + 6} width={14} height={14}>
                <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
              </foreignObject>
              <text
                x={node.x + 24} y={node.y + (node.h < 45 ? 16 : 18)}
                fill={isHovered ? "#93c5fd" : "#d4d4d8"}
                fontSize="9" fontFamily="var(--font-geist-sans), sans-serif" fontWeight="500"
                className="pointer-events-none"
              >
                {node.label}
              </text>
              {node.h >= 45 && (
                <text
                  x={node.x + 8} y={node.y + 36}
                  fill="#71717a" fontSize="7.5"
                  fontFamily="var(--font-geist-sans), sans-serif"
                  className="pointer-events-none"
                >
                  {node.id === "apps" ? "auto-instrumented" : node.id === "collector" ? "receivers → exporters" : node.id === "prometheus" ? "metrics + alerts" : node.id === "grafana" ? "dashboards" : "log aggregation"}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {hoveredId && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-foreground-secondary">{nodes.find((n) => n.id === hoveredId)?.description}</p>
        </motion.div>
      )}

      {!hoveredId && (
        <p className="mt-3 text-center text-xs text-muted">Hover over the diagram to explore each component.</p>
      )}
    </div>
  );
}
