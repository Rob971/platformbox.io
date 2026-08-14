"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, BookOpen, Rocket, User, CheckCircle, AlertTriangle } from "lucide-react";

interface Service {
  name: string;
  owner: string;
  type: "backend" | "frontend" | "data";
  health: "healthy" | "warning";
}

const services: Service[] = [
  { name: "api-gateway", owner: "platform-team", type: "backend", health: "healthy" },
  { name: "user-service", owner: "identity-team", type: "backend", health: "healthy" },
  { name: "payment-worker", owner: "payments-team", type: "backend", health: "warning" },
  { name: "web-dashboard", owner: "frontend-team", type: "frontend", health: "healthy" },
  { name: "analytics-pipeline", owner: "data-team", type: "data", health: "healthy" },
];

const typeBadge: Record<Service["type"], string> = {
  backend: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  frontend: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  data: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export function BackstagePortal() {
  const [activeTab, setActiveTab] = useState<"catalog" | "scaffolder">("catalog");

  return (
    <div className="space-y-4">
      <div className="flex rounded-lg border border-white/10 bg-white/[0.02] p-0.5">
        {(["catalog", "scaffolder"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-all ${
              activeTab === tab ? "bg-accent/15 text-accent" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab === "catalog" ? "Service Catalog" : "Scaffolder"}
          </button>
        ))}
      </div>


      <AnimatePresence mode="wait">
        {activeTab === "catalog" ? (
          <motion.div key="catalog" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="space-y-2">
            <div className="flex items-center gap-3 text-xs text-zinc-400 px-1">
              <span className="text-white font-medium">{services.length}</span> services
              <span className="text-zinc-600">•</span>
              <span className="text-green-400">4 healthy</span>
              <span className="text-zinc-600">•</span>
              <span className="text-amber-400">1 warning</span>
            </div>
            <div className="space-y-1.5">
              {services.map((svc) => (
                <div key={svc.name} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/20">
                  <div className="flex items-center gap-3 min-w-0">
                    <Box className="h-4 w-4 shrink-0 text-zinc-500" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white truncate">{svc.name}</span>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${typeBadge[svc.type]}`}>{svc.type}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <User className="h-3 w-3 text-zinc-600" />
                        <span className="text-[11px] text-zinc-500">{svc.owner}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {svc.health === "healthy" ? <CheckCircle className="h-3.5 w-3.5 text-green-400" /> : <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />}
                    <BookOpen className="h-3.5 w-3.5 text-zinc-600" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="scaffolder" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="space-y-3">
            <p className="text-xs text-zinc-400 px-1">Choose a template to scaffold a new service — infrastructure, CI/CD, and docs generated automatically.</p>
            {[
              { name: "Backend Service (Go)", desc: "REST API with gRPC, Terraform module, and CI/CD" },
              { name: "Frontend App (Next.js)", desc: "SSR app with Vercel-style deployment pipeline" },
              { name: "Data Pipeline", desc: "Kafka consumer with schema registry and dead-letter queue" },
            ].map((tpl) => (
              <div key={tpl.name} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-accent/30 cursor-pointer group">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white group-hover:text-accent transition-colors">{tpl.name}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{tpl.desc}</p>
                </div>
                <Rocket className="h-4 w-4 shrink-0 text-zinc-600 group-hover:text-accent transition-colors" />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
