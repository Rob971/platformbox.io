"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export interface PageNavSection {
  id: string;
  label: string;
}

interface PageNavProps {
  sections: PageNavSection[];
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

function scrollToSection(id: string) {
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
  document.getElementById(id)?.scrollIntoView({ behavior });
}

function scrollToTop() {
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
  window.scrollTo({ top: 0, behavior });
}

export function PageNav({ sections }: PageNavProps) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      {/* Desktop: fixed right dot rail with back-to-top */}
      <nav
        className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
        aria-label="Page sections"
      >
        <button
          onClick={scrollToTop}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background/60 text-muted transition-colors hover:border-border-strong hover:text-foreground"
          aria-label="Scroll to top"
          title="Back to top"
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
        <span className="h-6 w-px bg-card-hover" aria-hidden />
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative flex h-2.5 w-2.5 items-center justify-center"
            aria-label={`Scroll to ${label}`}
          >
            <span className="absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">
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
                  active === id ? "bg-accent" : "bg-card-hover hover:bg-card"
                }`}
              />
            </span>
          </button>
        ))}
      </nav>

      {/* Mobile: bottom pill bar with back-to-top */}
      <nav
        className="fixed bottom-6 left-1/2 z-30 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-background/90 px-2 py-2 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden"
        aria-label="Page sections"
      >
        <button
          onClick={scrollToTop}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-hover text-foreground-secondary transition-colors hover:bg-card-hover hover:text-foreground"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
        <span className="mx-0.5 h-4 w-px shrink-0 bg-card-hover" aria-hidden />
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
              active === id
                ? "bg-accent-strong text-white"
                : "text-foreground-tertiary hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}
