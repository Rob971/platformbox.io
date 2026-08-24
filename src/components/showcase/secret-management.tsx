"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Shield, RefreshCw, Package } from "lucide-react";

interface SecretNode {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const secretNodes: SecretNode[] = [
  { id: "vault", label: "Vault / AWS Secrets Manager", description: "Central secret store with versioned secrets, automatic rotation policies, and fine-grained access control.", x: 25, y: 8, w: 230, h: 38 },
  { id: "csi", label: "CSI Driver", description: "Kubernetes Secrets Store CSI driver syncs secrets from the external provider into pod volumes — no hardcoded credentials in manifests.", x: 25, y: 60, w: 230, h: 38 },
  { id: "pod", label: "Application Pods", description: "Secrets mounted as a tmpfs volume. Application reads from file — credentials never touch etcd or environment variables.", x: 65, y: 112, w: 150, h: 38 },
  { id: "rotation", label: "Auto-Rotation", description: "Rotation policies trigger secret renewal. CSI driver hot-reloads without pod restart — zero downtime credential refresh.", x: 40, y: 85, w: 70, h: 22 },
];

export function SecretManagement() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const svgW = 280;
  const svgH = 170;

  return (
    <div className="w-full max-w-sm mx-auto">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto" role="img" aria-label="Secret Management Architecture">
        {/* Connection lines */}
        <line x1="140" y1="46" x2="140" y2="58" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <path d="M140 60 L140 98 L75 98 L75 110" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 2" />
        <path d="M140 60 L140 95" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5 3" />
        <path d="M75 107 L65 107" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1" markerEnd="url(#arrowSec)" />

        <defs>
          <marker id="arrowSec" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(59,130,246,0.5)" />
          </marker>
        </defs>

        {/* Vault lock icon */}
        <foreignObject x="205" y="14" width="16" height="16">
          <Lock className="h-4 w-4 text-accent" strokeWidth={1.5} />
        </foreignObject>
        {/* Shield icon on CSI */}
        <foreignObject x="205" y="68" width="16" height="16">
          <Shield className="h-4 w-4 text-accent/70" strokeWidth={1.5} />
        </foreignObject>
        {/* Container icon on Pod */}
        <foreignObject x="205" y="120" width="16" height="16">
          <Package className="h-4 w-4 text-accent/70" strokeWidth={1.5} />
        </foreignObject>
        {/* Rotation icon */}
        <foreignObject x="115" y="88" width="12" height="12">
          <RefreshCw className="h-3 w-3 text-amber-400" strokeWidth={2} />
        </foreignObject>

        {secretNodes.map((node) => {
          const isHovered = hoveredId === node.id;
          return (
            <g key={node.id}>
              <rect
                x={node.x} y={node.y} width={node.w} height={node.h}
                rx="5" fill={isHovered ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.02)"}
                stroke={isHovered ? "rgba(59,130,246,0.45)" : "rgba(255,255,255,0.1)"}
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
              <text
                x={node.x + 44} y={node.y + 16}
                fill={isHovered ? "#93c5fd" : "#d4d4d8"}
                fontSize="9" fontFamily="var(--font-geist-sans), sans-serif" fontWeight="500"
                className="pointer-events-none"
              >
                {node.label}
              </text>
              <text
                x={node.x + 44} y={node.y + 30}
                fill="#71717a" fontSize="7"
                fontFamily="var(--font-geist-sans), sans-serif"
                className="pointer-events-none"
              >
                {node.id === "vault" ? "versioned storage • rotation policies" : node.id === "csi" ? "syncs to tmpfs • never in etcd" : node.id === "pod" ? "file-based mount • zero code changes" : "hot-reload • zero downtime"}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredId && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-foreground-secondary">{secretNodes.find((n) => n.id === hoveredId)?.description}</p>
        </motion.div>
      )}

      {!hoveredId && (
        <p className="mt-3 text-center text-xs text-muted">Hover over the diagram to explore each layer.</p>
      )}
    </div>
  );
}
