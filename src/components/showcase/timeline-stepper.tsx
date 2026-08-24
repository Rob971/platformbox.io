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
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-border-strong"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-accent">
                  {phase.day}
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">{phase.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground-tertiary">
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

