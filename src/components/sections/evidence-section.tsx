"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, GitBranch, ShieldCheck, FileText, Boxes, Layers } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { landingEvidence, operatingModel } from "@/lib/content";

const cardIcons = [GitBranch, FileText, ShieldCheck, Boxes, Layers] as const;

export function EvidenceSection() {
  return (
    <section id="evidence" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {landingEvidence.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {landingEvidence.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
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
                  className="group flex flex-col gap-2.5 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/40 hover:bg-card-hover"
                >
                  <div className="flex items-start justify-between">
                    {Icon && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-accent">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </div>
                    )}
                    <ArrowUpRight
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted transition-colors group-hover:text-accent"
                      aria-hidden
                    />
                  </div>
                  <p className="text-sm font-semibold text-foreground" role="heading" aria-level={3}>{card.label}</p>
                  <p className="text-sm leading-relaxed text-foreground-tertiary">{card.description}</p>
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
                className="group rounded-xl border border-border bg-surface px-5 py-4 text-center transition-colors hover:border-accent/30 hover:bg-card"
              >
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-tight text-muted group-hover:text-foreground-tertiary">
                  {stat.label}
                </p>
              </a>
            ))}
          </div>
        </FadeIn>

        {/* Operating model */}
        <FadeIn delay={0.1}>
          <div className="mt-10 border-t border-border pt-10">
            <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {operatingModel.eyebrow}
            </p>
            <h3 className="mt-3 text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {operatingModel.headline}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm font-medium text-foreground-secondary">
              {operatingModel.philosophy}
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm leading-relaxed text-foreground-tertiary">
              {operatingModel.sub}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {operatingModel.groups.map((group) => (
                <a
                  key={group.title}
                  href={group.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40 hover:bg-surface-hover"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{group.title}</p>
                    <ArrowUpRight
                      className="h-4 w-4 text-muted transition-colors group-hover:text-accent"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium tracking-tight text-accent-hover">
                    {group.items.join("  →  ")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-tertiary">{group.note}</p>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA bridge */}
        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <Link
              href={landingEvidence.ctaHref}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-border-strong px-6 text-sm font-medium text-foreground-secondary transition-colors hover:border-border-strong"
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