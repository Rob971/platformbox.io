"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, GitBranch, ShieldCheck, FileText, Boxes, Layers } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { landingEvidence } from "@/lib/content";

const cardIcons = [GitBranch, FileText, ShieldCheck, Boxes, Layers] as const;

export function EvidenceSection() {
  return (
    <section id="evidence" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {landingEvidence.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {landingEvidence.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {landingEvidence.sub}
          </p>
        </FadeIn>

        {/* Evidence cards */}
        <FadeIn>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {landingEvidence.cards.map((card, i) => {
              const Icon = cardIcons[i];
              return (
                <a
                  key={card.label}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent/40 hover:bg-white/[0.06]"
                >
                  <div className="flex items-start justify-between">
                    {Icon && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-accent">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </div>
                    )}
                    <ArrowUpRight
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-600 transition-colors group-hover:text-accent"
                      aria-hidden
                    />
                  </div>
                  <p className="text-sm font-semibold text-white">{card.label}</p>
                  <p className="text-sm leading-relaxed text-zinc-400">{card.description}</p>
                </a>
              );
            })}
          </div>
        </FadeIn>

        {/* Stats strip */}
        <FadeIn delay={0.15}>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {landingEvidence.stats.map((stat) => (
              <a
                key={stat.label}
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-center transition-colors hover:border-accent/30 hover:bg-white/[0.04]"
              >
                <p className="text-2xl font-semibold tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-tight text-zinc-500 group-hover:text-zinc-400">
                  {stat.label}
                </p>
              </a>
            ))}
          </div>
        </FadeIn>

        {/* CTA bridge */}
        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <Link
              href={landingEvidence.ctaHref}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/20 px-6 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30"
            >
              {landingEvidence.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}