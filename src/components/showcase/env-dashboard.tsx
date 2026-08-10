"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Trash2, ExternalLink, CheckCircle, Loader2 } from "lucide-react";

interface Environment {
  id: string;
  pr: string;
  branch: string;
  status: "ready" | "building" | "destroying" | "destroyed";
  createdAt: string;
  url: string;
}

const initialEnvs: Environment[] = [
  { id: "1", pr: "#142", branch: "feat/payment-integration", status: "ready", createdAt: "2 min ago", url: "https://pr-142.preview.platformbox.io" },
  { id: "2", pr: "#141", branch: "fix/auth-token-refresh", status: "building", createdAt: "just now", url: "https://pr-141.preview.platformbox.io" },
  { id: "3", pr: "#140", branch: "feat/dark-mode", status: "ready", createdAt: "15 min ago", url: "https://pr-140.preview.platformbox.io" },
];

const statusConfig = {
  ready: { icon: CheckCircle, color: "text-green-400", label: "Ready" },
  building: { icon: Loader2, color: "text-amber-400", label: "Building" },
  destroying: { icon: Loader2, color: "text-red-400", label: "Destroying" },
  destroyed: { icon: Trash2, color: "text-zinc-500", label: "Destroyed" },
} as const;

export function EnvDashboard() {
  const [envs, setEnvs] = useState<Environment[]>(initialEnvs);
  const [destroyingId, setDestroyingId] = useState<string | null>(null);

  const handleDestroy = (id: string) => {
    setDestroyingId(id);
    setEnvs((prev) => prev.map((env) => (env.id === id ? { ...env, status: "destroying" as const } : env)));
    setTimeout(() => {
      setEnvs((prev) => prev.filter((env) => env.id !== id));
      setDestroyingId(null);
    }, 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 text-xs text-zinc-400 mb-4">
        <span><span className="text-white font-medium">{envs.length}</span> active environments</span>
        <span className="text-zinc-600">&bull;</span>
        <span className="text-green-400">Auto-destroy on merge enabled</span>
      </div>
      <AnimatePresence>
        {envs.map((env) => {
          const config = statusConfig[env.status];
          const StatusIcon = config.icon;
          const isAnimating = env.status === "building" || env.status === "destroying";
          return (
            <motion.div key={env.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0, marginBottom: 0 }} transition={{ duration: 0.25 }} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <GitBranch className="h-4 w-4 shrink-0 text-zinc-500" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{env.pr}</span>
                    <span className="text-xs text-zinc-500 truncate">{env.branch}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StatusIcon className={`h-3 w-3 ${config.color} ${isAnimating ? "animate-spin" : ""}`} />
                    <span className={`text-[11px] ${config.color}`}>{config.label}</span>
                    <span className="text-[11px] text-zinc-600">&bull; {env.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {env.status === "ready" && (
                  <>
                    <a href={env.url} target="_blank" rel="noopener noreferrer" className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/10 hover:text-white" aria-label={`Open ${env.pr} preview`}>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button onClick={() => handleDestroy(env.id)} className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400" aria-label={`Destroy ${env.pr} environment`}>
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
          <p className="text-sm text-zinc-500">All environments destroyed. Cost saved: €0.</p>
          <p className="text-xs text-zinc-600 mt-1">New PRs will auto-create preview environments.</p>
        </motion.div>
      )}
    </div>
  );
}
