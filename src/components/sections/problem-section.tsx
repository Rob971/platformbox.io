"use client";

import { motion } from "framer-motion";
import { FadeIn, fadeUp, stagger } from "@/lib/motion";
import { problem } from "@/lib/content";

export function ProblemSection() {
  return (
    <section id="problem" className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-20">
      <FadeIn className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
          {problem.eyebrow}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {problem.headline}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
          {problem.sub}
        </p>
      </FadeIn>

      <motion.ul
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {problem.painPoints.map((point) => (
          <motion.li
            key={point}
            variants={fadeUp}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-5"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span className="text-sm leading-relaxed text-foreground-secondary">{point}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
