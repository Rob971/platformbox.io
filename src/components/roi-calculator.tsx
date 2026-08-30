"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Clock, TrendingUp, Scale } from "lucide-react";

// Loaded annual cost per engineer, in €. Midpoint of each selectable range.
const COST_RANGES = [
  { label: "€40k–€60k", value: 50000 },
  { label: "€60k–€80k", value: 70000 },
  { label: "€80k–€100k", value: 90000 },
  { label: "€100k–€120k", value: 110000 },
  { label: "€120k–€140k", value: 130000 },
  { label: "€140k–€160k", value: 150000 },
  { label: "€160k+", value: 170000 },
] as const;

// Transparent benchmark assumption used when the buyer is not sure.
const BENCHMARK_LOADED_COST = 110000;

// Predefined recurring platform/support share — deliberately approximate.
const CAPACITY_PCTS = [
  { label: "5%", value: 5 },
  { label: "10%", value: 10 },
  { label: "15%", value: 15 },
  { label: "20%", value: 20 },
  { label: "25%", value: 25 },
  { label: "30%", value: 30 },
  { label: "40%", value: 40 },
  { label: "50%+", value: 50 },
] as const;

const FREQUENCIES = [
  { label: "<5 / month", mid: 3 },
  { label: "5–10 / month", mid: 8 },
  { label: "10–20 / month", mid: 15 },
  { label: "20–40 / month", mid: 30 },
  { label: "40+ / month", mid: 50 },
] as const;

const EFFORTS = [
  { label: "<1 hour", hours: 0.5 },
  { label: "1–2 hours", hours: 1.5 },
  { label: "2–4 hours", hours: 3 },
  { label: "0.5 day", hours: 4 },
  { label: "1 day", hours: 8 },
  { label: ">1 day", hours: 12 },
] as const;

/** Rounded € for an annual figure — no fake precision. */
function fmtEuro(v: number): string {
  if (v === 0) return "€0";
  const rounded = Math.round(v / 1000);
  return `≈ €${rounded.toLocaleString()}k`;
}

export function RoiCalculator() {
  const [engineers, setEngineers] = useState(8);
  const [capacityPct, setCapacityPct] = useState(25);
  const [cost, setCost] = useState(110000);
  const [notSure, setNotSure] = useState(false);
  const [monthlyWaste, setMonthlyWaste] = useState(1500);
  const [showSanity, setShowSanity] = useState(false);
  const [frequency, setFrequency] = useState(15);
  const [effortHours, setEffortHours] = useState(3);

  // Method A — capacity model.
  const engineeringCapacity = engineers * (capacityPct / 100) * cost;

  // Cloud waste, kept separate.
  const annualWaste = monthlyWaste * 12;

  // Estimated annual platform tax (NOT claimed savings).
  const platformTax = engineeringCapacity + annualWaste;

  // Method B — workload sanity check (validation, not a second answer).
  const annualInterventions = frequency * 12;
  const workloadHours = annualInterventions * effortHours;
  const impliedHourly = cost / (48 * 40);
  const workloadEstimate = workloadHours * impliedHourly;
  const sanityRatio =
    engineeringCapacity > 0 && workloadEstimate > 0
      ? Math.max(engineeringCapacity, workloadEstimate) /
        Math.min(engineeringCapacity, workloadEstimate)
      : 1;
  const materialDiscrepancy = sanityRatio >= 2;

  const launch = 20000;
  const scale = 39000;
  const launchPct =
    platformTax > 0 ? Math.round((launch / platformTax) * 100) : null;
  const scalePct =
    platformTax > 0 ? Math.round((scale / platformTax) * 100) : null;

  const rangeThumb =
    "w-full h-1.5 rounded-full appearance-none cursor-pointer bg-card-hover accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer";

  const selectClass =
    "rounded-md border border-border bg-card/60 px-2 py-1 text-sm font-medium text-foreground tabular-nums outline-none focus:border-accent/50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="mb-6 flex items-center gap-2">
        <Calculator className="h-4 w-4 text-accent" />
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
          Estimate your annual platform tax
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="roi-engineers" className="text-xs font-medium text-foreground-tertiary">
                Engineers regularly involved in platform / infrastructure / delivery
              </label>
              <input
                id="roi-engineers"
                type="number"
                min={1}
                max={500}
                value={engineers}
                onChange={(e) => setEngineers(Math.max(1, Number(e.target.value) || 1))}
                className="w-20 rounded-md border border-border bg-card/60 px-2 py-1 text-sm font-semibold text-foreground tabular-nums outline-none focus:border-accent/50"
              />
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={engineers}
              onChange={(e) => setEngineers(Number(e.target.value))}
              className={rangeThumb}
              aria-label="Engineers involved in platform and infrastructure work"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="roi-capacity" className="text-xs font-medium text-foreground-tertiary">
                % of their time on recurring platform/support work
              </label>
              <select
                id="roi-capacity"
                value={capacityPct}
                onChange={(e) => setCapacityPct(Number(e.target.value))}
                className={selectClass}
              >
                {CAPACITY_PCTS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="roi-cost" className="text-xs font-medium text-foreground-tertiary">
                Approximate loaded annual cost per engineer
              </label>
              <select
                id="roi-cost"
                value={notSure ? -1 : cost}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v === -1) {
                    setNotSure(true);
                    setCost(BENCHMARK_LOADED_COST);
                  } else {
                    setNotSure(false);
                    setCost(v);
                  }
                }}
                className={selectClass}
              >
                {COST_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
                <option value={-1}>Not sure</option>
              </select>
            </div>
            {notSure && (
              <p className="text-[11px] text-muted">
                Benchmark estimate; replace with your actual loaded cost for greater
                accuracy.
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="roi-waste" className="text-xs font-medium text-foreground-tertiary">
                Monthly cloud waste <span className="text-muted">(optional)</span>
              </label>
              <span className="text-sm font-semibold text-foreground tabular-nums">
                €{monthlyWaste.toLocaleString()}
              </span>
            </div>
            <input
              id="roi-waste"
              type="range"
              min={0}
              max={5000}
              step={100}
              value={monthlyWaste}
              onChange={(e) => setMonthlyWaste(Number(e.target.value))}
              className={rangeThumb}
            />
          </div>

          {/* Method B — workload sanity check */}
          <div className="rounded-lg border border-border bg-background/50 p-3">
            <button
              type="button"
              onClick={() => setShowSanity((s) => !s)}
              aria-expanded={showSanity}
              className="flex w-full items-center justify-between gap-2 text-left"
            >
              <span className="flex items-center gap-1.5 text-xs font-medium text-foreground-tertiary">
                <Scale className="h-3.5 w-3.5 text-accent" />
                Sanity-check against your actual workload
              </span>
              <span className="text-xs text-accent">{showSanity ? "Hide" : "Show"}</span>
            </button>

            {showSanity && (
              <div className="mt-3 grid gap-3">
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="roi-freq" className="text-xs text-foreground-tertiary">
                    Platform/deployment requests per month
                  </label>
                  <select
                    id="roi-freq"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className={selectClass}
                  >
                    {FREQUENCIES.map((f) => (
                      <option key={f.mid} value={f.mid}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="roi-effort" className="text-xs text-foreground-tertiary">
                    Effort per request
                  </label>
                  <select
                    id="roi-effort"
                    value={effortHours}
                    onChange={(e) => setEffortHours(Number(e.target.value))}
                    className={selectClass}
                  >
                    {EFFORTS.map((e) => (
                      <option key={e.hours} value={e.hours}>
                        {e.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] text-muted">
                  Workload estimate: {fmtEuro(workloadEstimate)}/yr
                  {materialDiscrepancy
                    ? " — differs materially from the capacity estimate. A signal to validate during the assessment."
                    : "."}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-border bg-background/50 p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-foreground-tertiary">
              <Clock className="h-3 w-3" />
              Engineering capacity consumed
            </span>
            <span className="text-sm font-medium text-foreground tabular-nums">
              {fmtEuro(engineeringCapacity)}/yr
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-foreground-tertiary">
              <TrendingUp className="h-3 w-3" />
              Estimated cloud waste
            </span>
            <span className="text-sm font-medium text-foreground tabular-nums">
              {fmtEuro(annualWaste)}/yr
            </span>
          </div>

          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-foreground-tertiary">
                Estimated annual platform tax
              </span>
              <span className="text-sm font-semibold text-foreground tabular-nums">
                {fmtEuro(platformTax)}/yr
              </span>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
              This does not mean the whole amount becomes cash savings — it is the
              economic value of capacity and recurring cost currently tied up in the
              platform problem.
            </p>
          </div>

          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground-tertiary">
                PlatformBox Launch (one-time)
              </span>
              <span className="text-xs text-foreground-secondary tabular-nums">€20,000</span>
            </div>
            {launchPct !== null && (
              <p className="mt-1 text-[11px] text-muted">
                ≈ {launchPct}% of the estimated annual platform tax.
              </p>
            )}
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-foreground-tertiary">
                PlatformBox Scale (one-time)
              </span>
              <span className="text-xs text-foreground-secondary tabular-nums">€39,000</span>
            </div>
            {scalePct !== null && (
              <p className="mt-1 text-[11px] text-muted">
                ≈ {scalePct}% of the estimated annual platform tax.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
