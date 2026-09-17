"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { AssessmentCta, BookingCta } from "@/components/booking-cta";
import { BOOKING_NOTE } from "@/lib/constants";
import { hero } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-20 text-center sm:pt-28 md:pb-32 md:pt-36">
      <motion.div
        initial={false}
        animate="visible"
        variants={stagger}
        className="flex flex-col items-center"
      >
        <motion.p
          variants={fadeUp}
          className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent"
        >
          {hero.eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="max-w-3xl whitespace-pre-line text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.08]"
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-tertiary sm:text-lg"
        >
          {hero.sub}
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-6 inline-flex rounded-full border border-accent/30 bg-accent/[0.06] px-4 py-1.5 text-sm font-semibold text-accent-hover"
        >
          {hero.proofLine}
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <AssessmentCta className="w-full sm:w-auto" />
          <BookingCta className="w-full sm:w-auto" />
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-md text-sm text-muted"
        >
          {BOOKING_NOTE}
        </motion.p>
      </motion.div>
    </section>
  );
}
