"use client";

import { motion } from "framer-motion";
import { CheckCircle, Circle, Loader2, ExternalLink, Phone, Mail, Calendar } from "lucide-react";
import type { Engagement } from "@/lib/projects";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function getPhaseDays(phase: { startedAt?: string; completedAt?: string }): string | null {
  if (!phase.startedAt) return null;
  const start = new Date(phase.startedAt);
  if (phase.completedAt) {
    const end = new Date(phase.completedAt);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff === 1 ? "1 working day" : `${diff} working days`;
  }
  const now = new Date();
  const diff = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return `Day ${diff}`;
}

interface EngagementDashboardProps {
  engagement: Engagement;
}

export function EngagementDashboard({ engagement }: EngagementDashboardProps) {
  const totalPhases = engagement.phases.length;
  const completedPhases = engagement.phases.filter((p) => p.status === "completed").length;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {engagement.company}
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Your engagement
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Started {formatDate(engagement.startedAt)} · Phase {completedPhases} of {totalPhases} complete
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-1">
          {engagement.phases.map((phase, i) => {
            const isCompleted = phase.status === "completed";
            const isActive = phase.status === "in_progress";
            const isLast = i === engagement.phases.length - 1;
            const phaseDays = getPhaseDays(phase);

            return (
              <div key={phase.title} className="relative flex gap-4">
                {!isLast && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px bg-white/10" aria-hidden="true" />
                )}

                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
                  {isCompleted ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15">
                      <CheckCircle className="h-4 w-4 text-accent" />
                    </div>
                  ) : isActive ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent/40 bg-accent/10">
                      <Loader2 className="h-4 w-4 animate-spin text-accent" />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-zinc-950">
                      <Circle className="h-3 w-3 text-zinc-600" />
                    </div>
                  )}
                </div>

                <div className={`flex-1 pb-8 ${!isLast ? "" : "pb-0"}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500">
                      Days {phase.days}
                    </span>
                    {phaseDays && (
                      <span className="text-[11px] text-accent">· {phaseDays}</span>
                    )}
                  </div>

                  <h3
                    className={`mt-1 text-sm font-semibold ${
                      isCompleted ? "text-white" : isActive ? "text-white" : "text-zinc-500"
                    }`}
                  >
                    {phase.title}
                  </h3>

                  {phase.startedAt && (
                    <p className="mt-0.5 text-xs text-zinc-600">
                      {isCompleted
                        ? `Completed ${formatDate(phase.completedAt!)}`
                        : `Started ${formatDate(phase.startedAt)}`}
                    </p>
                  )}

                  {isActive && phase.notes && (
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">{phase.notes}</p>
                  )}

                  {isCompleted && phase.notes && (
                    <p className="mt-2 text-xs leading-relaxed text-zinc-500">{phase.notes}</p>
                  )}

                  {phase.artifacts && phase.artifacts.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {phase.artifacts.map((a) => (
                        <a
                          key={a.label}
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                        >
                          {a.label}
                          <ExternalLink className="h-3 w-3 text-zinc-600" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Engagement Manager Card */}
        <div className="mt-16 rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
            Your engagement manager
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {engagement.engagementManager.name}
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={`mailto:${engagement.engagementManager.email}`}
              className="inline-flex items-center gap-2 text-xs text-zinc-400 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5" />
              {engagement.engagementManager.email}
            </a>
            <a
              href={`tel:${engagement.engagementManager.phone}`}
              className="inline-flex items-center gap-2 text-xs text-zinc-400 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" />
              {engagement.engagementManager.phone}
            </a>
          </div>
          <div className="mt-5 flex gap-3">
            <a
              href="#"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20"
            >
              <Calendar className="h-3.5 w-3.5" />
              Schedule a call
            </a>
            <a
              href={`mailto:${engagement.engagementManager.email}?subject=${encodeURIComponent(engagement.reference + " — Question")}`}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20"
            >
              <Mail className="h-3.5 w-3.5" />
              Send a message
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-[11px] text-zinc-700">
          {engagement.company} · {engagement.reference}
        </p>
      </motion.div>
    </div>
  );
}
