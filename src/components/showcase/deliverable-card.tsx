"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ChevronDown, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { CodeBlock } from "./code-block";

interface DeliverableCardProps {
  icon: LucideIcon;
  title: string;
  text: string;
  code?: string;
  codeLanguage?: string;
  children?: ReactNode;
}

export function DeliverableCard({
  icon: Icon,
  title,
  text,
  code,
  codeLanguage,
  children,
}: DeliverableCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all hover:border-white/20">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 sm:p-8 text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-medium text-white">{title}</h3>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{text}</p>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
              {code ? (
                <CodeBlock code={code} language={codeLanguage} />
              ) : children ? (
                children
              ) : (
                <div className="rounded-lg border border-white/10 bg-zinc-900/50 p-4">
                  <p className="text-xs text-zinc-500">Configuration details available upon request.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
