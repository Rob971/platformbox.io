"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, Hammer, KeyRound, Network } from "lucide-react";

interface Step {
  id: number;
  label: string;
  detail: string;
}

const steps: Step[] = [
  { id: 1, label: "Declare", detail: "Developer adds a database resource block to the service config. No ticket, no manual request." },
  { id: 2, label: "Provision", detail: "Pipeline runs Terraform — RDS/Aurora instance created in private subnets with encryption at rest." },
  { id: 3, label: "Inject", detail: "Connection string and credentials auto-injected as Kubernetes secrets via CSI driver." },
  { id: 4, label: "Connect", detail: "Service starts with DB_URL already populated. Health check confirms connectivity before traffic routes." },
];

const stepIcons = [GitCommit, Hammer, KeyRound, Network];

export function DatabaseProvisioning() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Desktop: horizontal flow */}
      <div className="hidden sm:flex items-start py-4 px-2">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const isActive = activeStep === step.id;
          const Icon = stepIcons[i];
          return (
            <div key={step.id} className="flex items-start flex-1 min-w-0">
              <button
                onClick={() => setActiveStep(isActive ? null : step.id)}
                className="flex flex-col items-center gap-2 min-w-0 flex-1 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`relative flex h-10 w-10 items-center justify-center rounded-full ring-2 transition-all ${
                    isActive ? "ring-accent/50 bg-accent/10" : "ring-white/10 bg-zinc-900"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-accent" : "text-zinc-400"}`} />
                </motion.div>
                <div className="text-center">
                  <p className={`text-xs font-medium leading-tight ${isActive ? "text-accent" : "text-white"}`}>{step.label}</p>
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
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const isActive = activeStep === step.id;
          const Icon = stepIcons[i];
          return (
            <div key={step.id} className="flex items-start">
              <div className="flex flex-col items-center shrink-0 w-8">
                <button
                  onClick={() => setActiveStep(isActive ? null : step.id)}
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ring-2 transition-all ${
                    isActive ? "ring-accent/50 bg-accent/10" : "ring-white/10 bg-zinc-900"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-accent" : "text-zinc-400"}`} />
                </button>
                {!isLast && <div className="w-px h-5 bg-white/10 my-1" />}
              </div>
              <button onClick={() => setActiveStep(isActive ? null : step.id)} className="flex-1 text-left pl-3 pb-3">
                <p className={`text-xs font-medium ${isActive ? "text-accent" : "text-white"}`}>{step.label}</p>
              </button>
            </div>
          );
        })}
      </div>

      {activeStep !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-zinc-300">{steps.find((s) => s.id === activeStep)?.detail}</p>
        </motion.div>
      )}

      {activeStep === null && (
        <p className="mt-3 text-center text-xs text-zinc-600">Click any step to see how self-serve database provisioning works.</p>
      )}
    </div>
  );
}
