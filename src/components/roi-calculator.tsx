"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Calculator } from "lucide-react";

export function RoiCalculator() {
  const [engineers, setEngineers] = useState(5);
  const [awsWaste, setAwsWaste] = useState(1500);

  const engTimeSaved = engineers * 36000; // 30% of €120k per engineer
  const cloudSaved = awsWaste * 12;
  const totalSaved = engTimeSaved + cloudSaved;
  const netYear1 = totalSaved - 20000;
  const paybackMonths = totalSaved > 0 ? Math.ceil((20000 / totalSaved) * 12) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="h-4 w-4 text-accent" />
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
          Estimate Your Savings
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Sliders */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-zinc-400">
                Senior Engineers
              </label>
              <span className="text-sm font-semibold text-white tabular-nums">
                {engineers}
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={15}
              value={engineers}
              onChange={(e) => setEngineers(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-zinc-400">
                Monthly AWS Waste
              </label>
              <span className="text-sm font-semibold text-white tabular-nums">
                €{awsWaste.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={5000}
              step={100}
              value={awsWaste}
              onChange={(e) => setAwsWaste(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3 rounded-lg border border-white/10 bg-zinc-950/50 p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Clock className="h-3 w-3" />
              Engineering time reclaimed
            </span>
            <span className="text-sm font-medium text-white tabular-nums">
              €{engTimeSaved.toLocaleString()}/yr
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-zinc-400">
              <TrendingUp className="h-3 w-3" />
              Cloud waste eliminated
            </span>
            <span className="text-sm font-medium text-white tabular-nums">
              €{cloudSaved.toLocaleString()}/yr
            </span>
          </div>

          <div className="border-t border-white/10 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">
                Total annual savings
              </span>
              <span className="text-sm font-semibold text-green-400 tabular-nums">
                €{totalSaved.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              PlatformBox (one-time)
            </span>
            <span className="text-xs text-zinc-500 tabular-nums">
              −€20,000
            </span>
          </div>

          <div className="border-t border-white/10 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">
                Net Year 1 benefit
              </span>
              <span className={`text-sm font-bold tabular-nums ${netYear1 >= 0 ? "text-green-400" : "text-zinc-400"}`}>
                €{netYear1.toLocaleString()}
              </span>
            </div>
            {paybackMonths && (
              <p className="mt-1 text-[11px] text-zinc-500">
                Pays for itself in {paybackMonths} {paybackMonths === 1 ? "month" : "months"}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}