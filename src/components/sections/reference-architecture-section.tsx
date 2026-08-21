"use client";

import Link from "next/link";
import { ArrowRight, User, GitBranch, Workflow, Server, Cloud, Rocket } from "lucide-react";
import { FadeIn } from "@/lib/motion";
import { architecture } from "@/lib/content";

const stageIcons = [User, GitBranch, Workflow, Server, Cloud, Rocket];

export function ReferenceArchitectureSection() {
  return (
    <section id="reference-architecture" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {architecture.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {architecture.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {architecture.sub}
          </p>
        </FadeIn>

        {/* Simplified golden path flow */}
        <FadeIn>
          <div className="overflow-x-auto pb-4">
            <div className="mx-auto flex min-w-fit items-start justify-center gap-0">
              {architecture.flow.map((step, i) => {
                const Icon = stageIcons[i];
                const isAccent = i === 1; // "PlatformBox Golden Path"
                return (
                  <div key={step} className="flex items-start">
                    {/* Connector arrow between stages */}
                    {i > 0 && (
                      <div className="flex shrink-0 items-center pt-12">
                        <div className="h-px w-6 bg-white/15 sm:w-10" />
                        <div className="-ml-1 h-0 w-0 border-b-[5px] border-l-[7px] border-t-[5px] border-b-transparent border-l-white/20 border-t-transparent" />
                      </div>
                    )}

                    {/* Stage card */}
                    <div
                      className={
                        "flex w-28 shrink-0 flex-col items-center gap-3 rounded-xl border p-4 text-center sm:w-36 sm:p-5 " +
                        (isAccent
                          ? "border-accent/50 bg-accent/[0.08]"
                          : "border-white/10 bg-white/[0.03]")
                      }
                    >
                      <div
                        className={
                          "flex h-12 w-12 items-center justify-center rounded-xl border " +
                          (isAccent
                            ? "border-accent/40 bg-accent/10 text-accent"
                            : "border-white/10 bg-zinc-950 text-zinc-400")
                        }
                      >
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p
                          className={
                            "text-sm font-semibold leading-tight " +
                            (isAccent ? "text-accent-hover" : "text-white")
                          }
                        >
                          {step}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Caption row */}
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-sm leading-relaxed text-zinc-400">
              PlatformBox sits between your developers and your stack — it owns
              the golden path and the developer experience, while your tools and
              infrastructure stay exactly where they are.
            </p>
            <Link
              href={architecture.ctaHref}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-white/20 px-6 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30"
            >
              {architecture.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
