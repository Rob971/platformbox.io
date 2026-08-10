"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "timeline", label: "Timeline" },
  { id: "deliverables", label: "Deliverables" },
  { id: "pipeline", label: "Pipeline" },
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
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3" aria-label="Page sections">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          className="group flex items-center gap-2"
          aria-label={`Scroll to ${label}`}
        >
          <span className="text-xs text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
  );
}
