"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Clock, TrendingUp } from "lucide-react";

export function RoiCalculator() {
  const [engineers, setEngineers] = useState(8);
  const [hoursPerWeek, setHoursPerWeek] = useState(6);
  const [hourlyCost, setHourlyCost] = useState(90);
  const [monthlyWaste, setMonthlyWaste] = useState(1500);

  const annualEngineeringCost = engineers * hoursPerWeek * hourlyCost * 48;
  const annualWaste = monthlyWaste * 12;
  const totalAnnual = annualEngineeringCost + annualWaste;

  const launch = 20000;
  const scale = 39000;
  const launchPct = annualEngineeringCost > 0 ? Math.round((launch / annualEngineeringCost) * 100) : null;
  const scalePct = annualEngineeringCost > 0 ? Math.round((scale / annualEngineeringCost) * 100) : null;

  const rangeThumb =
    "w-full h-1.5 rounded-full appearance-none cursor-pointer bg-card-hover accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer";

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
          Estimate your current platform cost
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="roi-engineers" className="text-xs font-medium text-foreground-tertiary">
                Engineers doing platform/infra work
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
              <label htmlFor="roi-hours" className="text-xs font-medium text-foreground-tertiary">
                Hours/week per engineer
              </label>
              <span className="text-sm font-semibold text-foreground tabular-nums">
                {hoursPerWeek}
              </span>
            </div>
            <input
              id="roi-hours"
              type="range"
              min={1}
              max={20}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className={rangeThumb}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="roi-cost" className="text-xs font-medium text-foreground-tertiary">
                Loaded hourly cost
              </label>
              <div className="flex items-center gap-1">
                <span className="text-muted">€</span>
                <input
                  id="roi-cost"
                  type="number"
                  min={20}
                  max={300}
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Math.max(20, Number(e.target.value) || 20))}
                  className="w-20 rounded-md border border-border bg-card/60 px-2 py-1 text-sm font-semibold text-foreground tabular-nums outline-none focus:border-accent/50"
                />
              </div>
            </div>
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
        </div>

        <div className="space-y-3 rounded-lg border border-border bg-background/50 p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-foreground-tertiary">
              <Clock className="h-3 w-3" />
              Engineering cost absorbed
            </span>
            <span className="text-sm font-medium text-foreground tabular-nums">
              €{annualEngineeringCost.toLocaleString()}/yr
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-foreground-tertiary">
              <TrendingUp className="h-3 w-3" />
              Cloud waste
            </span>
            <span className="text-sm font-medium text-foreground tabular-nums">
              €{annualWaste.toLocaleString()}/yr
            </span>
          </div>

          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-foreground-tertiary">
                Estimated annual cost
              </span>
              <span className="text-sm font-semibold text-foreground tabular-nums">
                €{totalAnnual.toLocaleString()}
              </span>
            </div>
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
                {launchPct}% of your annual engineering estimate
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
                {scalePct}% of your annual engineering estimate
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}