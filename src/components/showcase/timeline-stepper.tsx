import { delivery } from "@/lib/content";

export function TimelineStepper() {
  return (
    <div className="space-y-10">
      {delivery.weeks.map((week) => (
        <div key={week.label}>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {week.label}
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {week.phases.map((phase) => (
              <div
                key={phase.day}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-accent">
                  {phase.day}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">{phase.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

