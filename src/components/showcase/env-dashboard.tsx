"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Trash2, ExternalLink, CheckCircle, Loader2, RotateCcw } from "lucide-react";

interface Environment {
  id: string;
  pr: string;
  branch: string;
  status: "ready" | "building" | "destroying" | "destroyed";
  createdAt: string;
  url: string;
}

const initialEnvs: Environment[] = [
  { id: "1", pr: "#142", branch: "feat/payment-integration", status: "ready", createdAt: "2m ago", url: "https://pr-142.preview.platformbox.io" },
  { id: "2", pr: "#141", branch: "fix/auth-token-refresh", status: "building", createdAt: "8m ago", url: "https://pr-141.preview.platformbox.io" },
  { id: "3", pr: "#140", branch: "feat/dark-mode", status: "ready", createdAt: "15m ago", url: "https://pr-140.preview.platformbox.io" },
];

const statusConfig = {
  ready: { icon: CheckCircle, color: "text-green-400", label: "Ready" },
  building: { icon: Loader2, color: "text-amber-400", label: "Building" },
  destroying: { icon: Loader2, color: "text-red-400", label: "Destroying" },
  destroyed: { icon: Trash2, color: "text-muted", label: "Destroyed" },
} as const;

export function EnvDashboard() {
  const [envs, setEnvs] = useState<Environment[]>(initialEnvs);

  const handleDestroy = (id: string) => {
    setEnvs((prev) => prev.map((env) => (env.id === id ? { ...env, status: "destroying" as const } : env)));
    setTimeout(() => {
      setEnvs((prev) => prev.filter((env) => env.id !== id));
    }, 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 text-xs text-foreground-tertiary mb-4">
        <span><span className="text-foreground font-medium">{envs.length}</span> active environments</span>
        <span className="text-muted">&bull;</span>
        <span className="text-green-400">Auto-destroy on merge enabled</span>
      </div>
      <AnimatePresence>
        {envs.map((env) => {
          const config = statusConfig[env.status];
          const StatusIcon = config.icon;
          const isAnimating = env.status === "building" || env.status === "destroying";
          return (
            <motion.div key={env.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0, marginBottom: 0 }} transition={{ duration: 0.25 }} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <GitBranch className="h-4 w-4 shrink-0 text-muted" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{env.pr}</span>
                    <span className="text-xs text-muted truncate">{env.branch}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StatusIcon className={`h-3 w-3 ${config.color} ${isAnimating ? "animate-spin" : ""}`} />
                    <span className={`text-[11px] ${config.color}`}>{config.label}</span>
                    <span className="text-[11px] text-muted">&bull; {env.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {env.status === "ready" && (
                  <>
                    <a href={env.url} target="_blank" rel="noopener noreferrer" className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-tertiary transition-colors hover:bg-card-hover hover:text-foreground" aria-label={`Open ${env.pr} preview`}>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button onClick={() => handleDestroy(env.id)} className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-red-500/10 hover:text-red-400" aria-label={`Destroy ${env.pr} environment`}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      {envs.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border border-dashed border-border bg-surface p-8 text-center">
          <p className="text-sm text-muted">All environments destroyed — idle costs eliminated.</p>
          <p className="text-xs text-muted mt-1">New PRs will auto-create preview environments.</p>
          <button
            onClick={() => setEnvs(initialEnvs)}
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset demo
          </button>
        </motion.div>
      )}
    </div>
  );
}
