"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { BookingCta } from "@/components/booking-cta";
import { BOOKING_NOTE } from "@/lib/constants";
import { hero } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-20 text-center sm:pt-28 md:pb-32 md:pt-36">
      <motion.div
        initial="hidden"
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
          className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.08]"
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-tertiary sm:text-lg"
        >
          {hero.sub}
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <BookingCta className="w-full sm:w-auto" />
          <Link
            href="/showcase"
            prefetch={false}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-border-strong px-6 text-sm font-medium text-foreground-secondary transition-colors hover:border-border-strong sm:w-auto"
          >
            See the 14-Day Blueprint
          </Link>
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
