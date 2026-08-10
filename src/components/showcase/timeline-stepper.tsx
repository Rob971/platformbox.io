"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, CheckCircle, Clock, type LucideIcon } from "lucide-react";

interface Phase {
  day: string;
  title: string;
  description: string;
  icon: LucideIcon;
  detail: string;
}

const phases: Phase[] = [
  { day: "Day 1–2", title: "Architecture Discovery", description: "We map your stack, teams, and deployment pain points.", icon: Calendar, detail: "We start with a deep-dive architecture audit to understand your current infrastructure, CI/CD pipelines, team workflows, and security requirements." },
  { day: "Day 3–5", title: "Infrastructure as Code", description: "Modular Terraform blocks for VPC, EKS, RDS, and security.", icon: CheckCircle, detail: "We deliver production-grade, modular Terraform templates covering networking, compute, data stores, and security. Every module is documented and versioned." },
  { day: "Day 6–8", title: "DevSecOps CI/CD", description: "Standardized GitLab pipelines with SAST, tests, and deploy.", icon: Clock, detail: "Complete GitLab CI/CD pipeline with static analysis, unit/integration tests, image scanning, automated deployments, and manual approval gates for production." },
  { day: "Day 9–11", title: "Production Kubernetes", description: "Highly available EKS with ingress, HPA, and monitoring.", icon: CheckCircle, detail: "Production-grade EKS clusters with managed node groups, cluster autoscaler, AWS Load Balancer Controller, HPA, Prometheus + Grafana monitoring, and centralized logging." },
  { day: "Day 12–13", title: "Ephemeral Environments", description: "Auto-generated preview environments for every Pull Request.", icon: Clock, detail: "Ephemeral environments that spin up automatically for each PR, let teams test in production-like conditions, then auto-destroy on merge." },
  { day: "Day 14", title: "Handover & Documentation", description: "Full knowledge transfer, runbooks, and Fractional CTO support.", icon: CheckCircle, detail: "Comprehensive documentation, ADRs, operational runbooks, and a live handover session. Optional ongoing Fractional CTO support." },
];

export function TimelineStepper() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute left-4 top-8 bottom-8 w-px bg-white/10 hidden sm:block" aria-hidden />
        <div className="absolute left-4 right-4 top-8 h-px bg-white/10 sm:hidden" aria-hidden />

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-0">
          {phases.map((phase, i) => (
            <div key={phase.day} className="relative flex-1 min-w-0">
              <div className="flex sm:flex-col items-start sm:items-center gap-4 sm:gap-2 pb-4 sm:pb-0">
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    expanded === i ? "border-accent bg-accent text-white" : "border-white/20 bg-zinc-900 text-zinc-400 hover:border-white/40"
                  }`}
                  aria-expanded={expanded === i}
                  aria-label={`${phase.day}: ${phase.title}`}
                >
                  <phase.icon className="h-3.5 w-3.5" />
                </button>

                <div
                  className="flex-1 cursor-pointer sm:text-center"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(expanded === i ? null : i); }
                  }}
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-accent">{phase.day}</p>
                  <p className="mt-1 text-sm font-medium text-white leading-tight">{phase.title}</p>
                  <p className="mt-0.5 text-xs text-zinc-400 leading-relaxed hidden sm:block">{phase.description}</p>
                </div>

                <ChevronDown className={`hidden sm:block h-4 w-4 text-zinc-500 transition-transform mt-2 ${expanded === i ? "rotate-180" : ""}`} />
              </div>

              <AnimatePresence mode="wait">
                {expanded === i && (
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mt-3 ml-12 sm:ml-0 sm:mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs text-zinc-300 leading-relaxed">{phase.detail}</p>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              <div className="h-1 sm:hidden" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
