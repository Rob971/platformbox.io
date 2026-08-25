"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, BookOpen, X } from "lucide-react";

export interface PageNavSection {
  id: string;
  label: string;
  description?: string;
  number?: string;
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
  const [tocOpen, setTocOpen] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tocOpen) return;
    function onPointer(e: MouseEvent) {
      if (tocRef.current && !tocRef.current.contains(e.target as Node)) setTocOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setTocOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onEscape);
    };
  }, [tocOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const nav = (id: string) => { scrollToSection(id); setTocOpen(false); setMobileTocOpen(false); };

  return (
    <>
      {/* Desktop: fixed right dot rail + TOC */}
      <nav
        ref={tocRef}
        className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
        aria-label="Page sections"
      >
        <button onClick={scrollToTop} className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background/60 text-muted transition-colors hover:border-border-strong hover:text-foreground" aria-label="Scroll to top" title="Back to top">
          <ArrowUp className="h-3.5 w-3.5" />
        </button>

        <span className="h-6 w-px bg-card-hover" aria-hidden />

        {/* TOC toggle */}
        <button onClick={() => setTocOpen(!tocOpen)} className="relative flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background/60 text-muted transition-colors hover:border-border-strong hover:text-foreground" aria-label={tocOpen ? "Close table of contents" : "Open table of contents"} aria-expanded={tocOpen} title="Table of contents">
          {tocOpen ? <X className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
        </button>

        {/* TOC panel */}
        <AnimatePresence>
          {tocOpen && (
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.15, ease: "easeOut" }} className="absolute right-full top-0 mr-3 w-64 rounded-xl border border-border-strong bg-background/95 p-4 shadow-2xl backdrop-blur-md">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted">On this page</p>
                <button onClick={() => setTocOpen(false)} className="flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors hover:bg-card-hover hover:text-foreground" aria-label="Close table of contents"><X className="h-3 w-3" /></button>
              </div>
              <ul className="space-y-0.5">
                {sections.map(({ id, label, description, number }) => (
                  <li key={id}>
                    <button onClick={() => nav(id)} className={`group flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors ${active === id ? "bg-accent/10 text-accent" : "text-foreground-tertiary hover:bg-card-hover hover:text-foreground"}`} aria-current={active === id ? "true" : undefined}>
                      {number && <span className={`mt-0.5 shrink-0 text-[10px] font-mono tabular-nums ${active === id ? "text-accent" : "text-muted"}`}>{number}</span>}
                      <div className="min-w-0">
                        <p className={`text-xs font-semibold leading-tight ${active === id ? "text-accent" : "text-foreground"}`}>{label}</p>
                        {description && <p className="mt-0.5 text-[11px] leading-snug text-foreground-tertiary group-hover:text-foreground-secondary">{description}</p>}
                      </div>
                      {active === id && <span className="mt-1.5 h-5 w-0.5 shrink-0 rounded-full bg-accent" />}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <span className="h-6 w-px bg-card-hover" aria-hidden />

        {/* Dot rail */}
        {sections.map(({ id, label }) => (
          <button key={id} onClick={() => nav(id)} className="group relative flex h-2.5 w-2.5 items-center justify-center" aria-label={`Scroll to ${label}`} aria-current={active === id ? "true" : undefined}>
            <span className="absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">{label}</span>
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              {active === id && <motion.span layoutId="activeSection" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
              <span className={`h-2 w-2 rounded-full transition-colors ${active === id ? "bg-accent" : "bg-card-hover hover:bg-card"}`} />
            </span>
          </button>
        ))}
      </nav>

      {/* Mobile: bottom pill bar + TOC button */}
      <nav className="fixed bottom-6 left-1/2 z-30 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-background/90 px-2 py-2 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden" aria-label="Page sections">
        <button onClick={scrollToTop} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-hover text-foreground-secondary transition-colors hover:bg-card-hover hover:text-foreground" aria-label="Scroll to top"><ArrowUp className="h-3.5 w-3.5" /></button>
        <span className="mx-0.5 h-4 w-px shrink-0 bg-card-hover" aria-hidden />
        <button onClick={() => setMobileTocOpen(!mobileTocOpen)} className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${mobileTocOpen ? "bg-accent-strong text-white" : "bg-surface-hover text-foreground-secondary hover:bg-card-hover hover:text-foreground"}`} aria-label={mobileTocOpen ? "Close table of contents" : "Open table of contents"} aria-expanded={mobileTocOpen}><BookOpen className="h-3.5 w-3.5" /></button>
        <span className="mx-0.5 h-4 w-px shrink-0 bg-card-hover" aria-hidden />
        {sections.map(({ id, label }) => (
          <button key={id} onClick={() => nav(id)} className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${active === id ? "bg-accent-strong text-white" : "text-foreground-tertiary hover:text-foreground"}`} aria-current={active === id ? "true" : undefined}>{label}</button>
        ))}
      </nav>

      {/* Mobile TOC bottom sheet */}
      <AnimatePresence>
        {mobileTocOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileTocOpen(false)} aria-hidden />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-border bg-background p-6 pb-10 shadow-2xl lg:hidden">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">On this page</p>
                <button onClick={() => setMobileTocOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-card-hover hover:text-foreground" aria-label="Close table of contents"><X className="h-4 w-4" /></button>
              </div>
              <ul className="space-y-1">
                {sections.map(({ id, label, description, number }) => (
                  <li key={id}>
                    <button onClick={() => nav(id)} className={`group flex w-full items-start gap-3 rounded-xl px-4 py-3 text-left transition-colors ${active === id ? "bg-accent/10" : "hover:bg-card-hover"}`} aria-current={active === id ? "true" : undefined}>
                      {number && <span className={`mt-0.5 shrink-0 text-sm font-mono tabular-nums ${active === id ? "text-accent" : "text-muted"}`}>{number}</span>}
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold ${active === id ? "text-accent" : "text-foreground"}`}>{label}</p>
                        {description && <p className="mt-0.5 text-xs leading-relaxed text-foreground-tertiary">{description}</p>}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
