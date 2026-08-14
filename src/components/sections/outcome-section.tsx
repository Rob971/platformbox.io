"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { User, GitBranch, Eye, ShieldCheck, Rocket, ArrowRight } from "lucide-react";
import { FadeIn, fadeUp, stagger } from "@/lib/motion";
import { outcome } from "@/lib/content";

const icons = [User, GitBranch, Eye, ShieldCheck, Rocket];

export function OutcomeSection() {
  return (
    <section id="outcome" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {outcome.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {outcome.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {outcome.sub}
          </p>
        </FadeIn>

        <motion.ol
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {outcome.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <Fragment key={step.label}>
                {i > 0 && (
                  <motion.li
                    variants={fadeUp}
                    className="hidden text-zinc-600 sm:block"
                    aria-hidden
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.li>
                )}
                <motion.li
                  variants={fadeUp}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{step.label}</p>
                    <p className="text-xs text-zinc-500">{step.note}</p>
                  </div>
                </motion.li>
              </Fragment>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
