"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "timeline", label: "Timeline" },
  { id: "deliverables", label: "Deliverables" },
  { id: "pipeline", label: "Pipeline" },
  { id: "platform", label: "Platform" },
  { id: "roi", label: "Results" },
];

export function SectionNav() {
  const [active, setActive] = useState<string>("timeline");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3" aria-label="Page sections">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          className="group relative flex h-2.5 w-2.5 items-center justify-center"
          aria-label={`Scroll to ${label}`}
        >
          <span className="absolute right-full top-1/2 mr-2 -translate-y-1/2 text-xs text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {label}
          </span>
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            {active === id && (
              <motion.span
                layoutId="activeSection"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span
              className={`h-2 w-2 rounded-full transition-colors ${
                active === id ? "bg-accent" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          </span>
        </button>
      ))}
    </nav>

    {/* Mobile: horizontal scrollable pill bar */}
    <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 rounded-full border border-white/15 bg-zinc-950/90 px-2 py-2 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)]" aria-label="Page sections">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors whitespace-nowrap ${
            active === id ? "bg-accent-strong text-white" : "text-zinc-400 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
    </>
  );
}
