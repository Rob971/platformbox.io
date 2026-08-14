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
    "w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
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
              <label htmlFor="roi-engineers" className="text-xs font-medium text-zinc-400">
                Engineers doing platform/infra work
              </label>
              <input
                id="roi-engineers"
                type="number"
                min={1}
                max={500}
                value={engineers}
                onChange={(e) => setEngineers(Math.max(1, Number(e.target.value) || 1))}
                className="w-20 rounded-md border border-white/10 bg-zinc-900/60 px-2 py-1 text-sm font-semibold text-white tabular-nums outline-none focus:border-accent/50"
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
              <label htmlFor="roi-hours" className="text-xs font-medium text-zinc-400">
                Hours/week per engineer
              </label>
              <span className="text-sm font-semibold text-white tabular-nums">
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
              <label htmlFor="roi-cost" className="text-xs font-medium text-zinc-400">
                Loaded hourly cost
              </label>
              <div className="flex items-center gap-1">
                <span className="text-zinc-500">€</span>
                <input
                  id="roi-cost"
                  type="number"
                  min={20}
                  max={300}
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Math.max(20, Number(e.target.value) || 20))}
                  className="w-20 rounded-md border border-white/10 bg-zinc-900/60 px-2 py-1 text-sm font-semibold text-white tabular-nums outline-none focus:border-accent/50"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="roi-waste" className="text-xs font-medium text-zinc-400">
                Monthly cloud waste <span className="text-zinc-600">(optional)</span>
              </label>
              <span className="text-sm font-semibold text-white tabular-nums">
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

        <div className="space-y-3 rounded-lg border border-white/10 bg-zinc-950/50 p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Clock className="h-3 w-3" />
              Engineering cost absorbed
            </span>
            <span className="text-sm font-medium text-white tabular-nums">
              €{annualEngineeringCost.toLocaleString()}/yr
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-zinc-400">
              <TrendingUp className="h-3 w-3" />
              Cloud waste
            </span>
            <span className="text-sm font-medium text-white tabular-nums">
              €{annualWaste.toLocaleString()}/yr
            </span>
          </div>

          <div className="border-t border-white/10 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">
                Estimated annual cost
              </span>
              <span className="text-sm font-semibold text-white tabular-nums">
                €{totalAnnual.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                PlatformBox Launch (one-time)
              </span>
              <span className="text-xs text-zinc-300 tabular-nums">€20,000</span>
            </div>
            {launchPct !== null && (
              <p className="mt-1 text-[11px] text-zinc-500">
                {launchPct}% of your annual engineering estimate
              </p>
            )}
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                PlatformBox Scale (one-time)
              </span>
              <span className="text-xs text-zinc-300 tabular-nums">€39,000</span>
            </div>
            {scalePct !== null && (
              <p className="mt-1 text-[11px] text-zinc-500">
                {scalePct}% of your annual engineering estimate
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}