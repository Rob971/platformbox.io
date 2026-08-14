"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { BookingCta } from "@/components/booking-cta";
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
          className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.08]"
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
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
            className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-white/20 px-6 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 sm:w-auto"
          >
            See what gets delivered
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
