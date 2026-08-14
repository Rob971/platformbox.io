"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, Hammer, FlaskConical, Rocket, Shield, Eye, type LucideIcon } from "lucide-react";

interface Stage {
  name: string;
  icon: LucideIcon;
  status: "success" | "running" | "pending";
  description: string;
}

const defaultStages: Stage[] = [
  { name: "Commit", icon: GitCommit, status: "success", description: "Push to your repo (GitHub or GitLab) triggers the pipeline automatically." },
  { name: "SAST Scan", icon: Shield, status: "success", description: "Static Application Security Testing scans for vulnerabilities." },
  { name: "Build", icon: Hammer, status: "success", description: "Container images are built and pushed to ECR." },
  { name: "Test", icon: FlaskConical, status: "running", description: "Unit, integration, and image scan tests execute." },
  { name: "Deploy Preview", icon: Eye, status: "pending", description: "Ephemeral environment spins up for the PR." },
  { name: "Deploy Prod", icon: Rocket, status: "pending", description: "After merge & approval, deploy to production EKS." },
];

const statusColors = {
  success: { dot: "bg-green-500", ring: "ring-green-500/30", text: "text-green-400" },
  running: { dot: "bg-amber-400", ring: "ring-amber-400/30", text: "text-amber-400" },
  pending: { dot: "bg-zinc-600", ring: "ring-zinc-600/30", text: "text-zinc-500" },
};

export function PipelineVisualizer() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Desktop: horizontal flow */}
      <div className="hidden sm:flex items-start min-w-[640px] py-4 px-2">
        {defaultStages.map((stage, i) => {
          const isLast = i === defaultStages.length - 1;
          const isSelected = selected === i;
          const colors = statusColors[stage.status];

          return (
            <div key={stage.name} className="flex items-start flex-1 min-w-0">
              <button onClick={() => setSelected(isSelected ? null : i)} className="flex flex-col items-center gap-2 min-w-0 flex-1 group">
                <motion.div whileHover={{ scale: 1.1 }} className={`relative flex h-10 w-10 items-center justify-center rounded-full ring-2 transition-all ${colors.ring} ${isSelected ? "bg-white/10" : "bg-zinc-900"}`}>
                  <stage.icon className={`h-4 w-4 ${colors.text}`} />
                  {stage.status === "running" && <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className={`absolute inset-0 rounded-full ${colors.dot} opacity-20`} />}
                </motion.div>
                <div className="text-center">
                  <p className="text-xs font-medium text-white leading-tight">{stage.name}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                    <span className="text-[10px] uppercase tracking-[0.1em] text-zinc-500">{stage.status}</span>
                  </div>
                </div>
              </button>
              {!isLast && (
                <div className="flex items-center pt-5 -mx-1 z-0">
                  <svg width="24" height="12" viewBox="0 0 24 12" className="text-zinc-600">
                    <path d="M0 6h20M16 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical stack */}
      <div className="sm:hidden flex flex-col gap-0 py-2">
        {defaultStages.map((stage, i) => {
          const isLast = i === defaultStages.length - 1;
          const isSelected = selected === i;
          const colors = statusColors[stage.status];

          return (
            <div key={stage.name} className="flex items-start">
              <div className="flex flex-col items-center shrink-0 w-8">
                <button onClick={() => setSelected(isSelected ? null : i)} aria-label={`${stage.name}: ${stage.status}`} className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ring-2 transition-all ${colors.ring} ${isSelected ? "bg-white/10" : "bg-zinc-900"}`}>
                  <stage.icon className={`h-3.5 w-3.5 ${colors.text}`} />
                  {stage.status === "running" && <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className={`absolute inset-0 rounded-full ${colors.dot} opacity-20`} />}
                </button>
                {!isLast && <div className="w-px h-5 bg-white/10 my-1" />}
              </div>
              <button onClick={() => setSelected(isSelected ? null : i)} className="flex-1 text-left pl-3 pb-3">
                <p className="text-xs font-medium text-white">{stage.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                  <span className="text-[10px] uppercase tracking-[0.1em] text-zinc-500">{stage.status}</span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-zinc-300">{defaultStages[selected].description}</p>
        </motion.div>
      )}
    </div>
  );
}
