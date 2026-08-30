"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DiagramMarkers, Edge, DiagramNode, NodeLabel, DiagramFigure, type NodeTone } from "@/components/architecture/svg-kit";

interface ArchNode {
  id: string;
  label: string;
  sub?: string;
  description: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: NodeTone;
}

const nodes: ArchNode[] = [
  { id: "internet", label: "Internet", description: "Clients reach the platform over HTTPS through the public subnet.", x: 14, y: 24, w: 76, h: 36, tone: "plain" },
  { id: "alb", label: "ALB Ingress", description: "AWS Load Balancer Controller routes internet traffic to the right service — the only publicly exposed entry point.", x: 150, y: 24, w: 110, h: 36, tone: "accent" },
  { id: "control", label: "EKS Control Plane", description: "Managed Kubernetes control plane. It schedules workloads and manages the worker nodes.", x: 30, y: 112, w: 150, h: 44, tone: "plain" },
  { id: "workers", label: "Worker Nodes", sub: "Fargate", description: "Fargate workers run the pods. Apply-up/destroy-down — the cluster costs nothing when idle.", x: 30, y: 180, w: 150, h: 52, tone: "plain" },
  { id: "service", label: "Service", description: "A stable cluster-internal endpoint. It load-balances across the healthy pods behind it.", x: 216, y: 112, w: 116, h: 40, tone: "success" },
  { id: "pods", label: "Pods", sub: "3 replicas", description: "The application containers, with requests/limits and a horizontal autoscaler.", x: 216, y: 180, w: 116, h: 52, tone: "success" },
];

export function K8sArchitecture() {
  const prefix = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const shown = pinnedId ?? activeId;
  const active = nodes.find((n) => n.id === shown);

  const textEquivalent =
    "VPC contains an EKS control plane and Fargate worker nodes. " +
    "Internet traffic enters through the ALB ingress in the public subnet, " +
    "is routed to a cluster-internal Service, which distributes it across pods. " +
    "The control plane manages the worker nodes, which schedule the pods.";

  return (
    <div className="w-full">
      <DiagramFigure
        title="EKS architecture"
        description="Topology of the reference EKS deployment: ingress, service, and workload flow."
        textEquivalent={textEquivalent}
      >
        <svg viewBox="0 0 360 260" className="w-full h-auto" aria-hidden="false">
          <DiagramMarkers prefix={prefix} />

          {/* VPC container */}
          <rect
            x="14" y="84" width="332" height="164" rx="12"
            fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="6 4"
          />
          <text x="26" y="100" fontSize="10" fontWeight={600} fill="var(--accent)" stroke="none">
            VPC
          </text>

          {/* Typed edges with direction + flow */}
          <Edge prefix={prefix} d="M90 42 L150 42" tone="accent" label="HTTPS" labelX={120} labelY={34} flow flowDur={2.2} />
          <Edge prefix={prefix} d="M205 60 C 250 60, 274 70, 274 112" tone="accent" label="routes" labelX={252} labelY={74} flow flowDur={2.6} flowDelay={0.3} />
          <Edge prefix={prefix} d="M274 152 L274 180" tone="green" label="round-robin" labelX={300} labelY={168} flow flowDur={1.8} flowDelay={0.6} />
          <Edge prefix={prefix} d="M105 156 L105 180" tone="muted" dashed label="manages" labelX={78} labelY={170} />
          <Edge prefix={prefix} d="M180 206 L216 206" tone="muted" dashed label="schedules" labelX={198} labelY={222} />

          {nodes.map((n) => (
            <DiagramNode
              key={n.id}
              id={n.id}
              label={n.label}
              detail={n.description}
              x={n.x} y={n.y} w={n.w} h={n.h}
              tone={n.tone}
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
        </svg>
      </DiagramFigure>

      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16 }}
            className="mt-3 rounded-lg border border-border bg-card p-3"
          >
            <p className="text-xs font-semibold text-foreground">{active.label}</p>
            <p className="mt-1 text-xs text-foreground-tertiary">{active.description}</p>
          </motion.div>
        ) : (
          <p className="mt-3 text-center text-xs text-muted">
            Hover or focus a node to inspect it · press Enter to pin.
          </p>
        )}
      </AnimatePresence>
    </div>
  );
}

