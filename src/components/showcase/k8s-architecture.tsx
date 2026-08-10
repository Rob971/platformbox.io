"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ArchLayer {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  borderColor: string;
}

const layers: ArchLayer[] = [
  { id: "vpc", label: "VPC", description: "Isolated virtual network with public and private subnets across 3 AZs.", x: 20, y: 10, w: 260, h: 190, color: "rgba(59,130,246,0.05)", borderColor: "rgba(59,130,246,0.3)" },
  { id: "public", label: "Public Subnets", description: "Hosts the internet-facing ALB/NLB load balancers.", x: 40, y: 30, w: 220, h: 45, color: "rgba(59,130,246,0.08)", borderColor: "rgba(59,130,246,0.2)" },
  { id: "private", label: "Private Subnets", description: "Worker nodes and pods run here; no direct internet access.", x: 40, y: 85, w: 220, h: 100, color: "rgba(168,85,247,0.06)", borderColor: "rgba(168,85,247,0.25)" },
  { id: "eks", label: "EKS Cluster", description: "Managed Kubernetes control plane with managed node groups.", x: 60, y: 100, w: 180, h: 65, color: "rgba(59,130,246,0.1)", borderColor: "rgba(59,130,246,0.4)" },
  { id: "nodes", label: "Worker Nodes", description: "EC2 instances across AZs with cluster autoscaler.", x: 75, y: 110, w: 65, h: 22, color: "rgba(250,204,21,0.1)", borderColor: "rgba(250,204,21,0.3)" },
  { id: "pods", label: "Pods", description: "Application containers with requests/limits, HPA enabled.", x: 145, y: 110, w: 80, h: 22, color: "rgba(34,197,94,0.1)", borderColor: "rgba(34,197,94,0.3)" },
  { id: "ingress", label: "ALB Ingress", description: "AWS Load Balancer Controller routes traffic to services.", x: 60, y: 50, w: 180, h: 22, color: "rgba(249,115,22,0.08)", borderColor: "rgba(249,115,22,0.25)" },
];

export function K8sArchitecture() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const svgW = 300;
  const svgH = 220;

  return (
    <div className="w-full max-w-sm mx-auto">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto" role="img" aria-label="EKS Architecture Diagram">
        {layers.map((layer) => {
          const isHovered = hoveredId === layer.id;
          return (
            <g key={layer.id}>
              <rect
                x={layer.x} y={layer.y} width={layer.w} height={layer.h}
                rx="6" fill={layer.color}
                stroke={isHovered ? "#60a5fa" : layer.borderColor}
                strokeWidth={isHovered ? 2 : 1}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredId(layer.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
              <text
                x={layer.x + 6} y={layer.y + 14}
                fill={isHovered ? "#93c5fd" : "#a1a1aa"}
                fontSize="9" fontFamily="var(--font-geist-sans), sans-serif" fontWeight="500"
                className="pointer-events-none"
              >
                {layer.label}
              </text>
            </g>
          );
        })}
        <line x1="150" y1="75" x2="150" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 2" />
        <path d="M140 132 L110 132 L110 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <path d="M185 132 L220 132" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 2" />
      </svg>

      {hoveredId && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="text-xs text-zinc-300">{layers.find((l) => l.id === hoveredId)?.description}</p>
        </motion.div>
      )}

      {!hoveredId && (
        <p className="mt-3 text-center text-xs text-zinc-600">Hover over the diagram to explore each layer.</p>
      )}
    </div>
  );
}
