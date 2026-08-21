"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Loader2 } from "lucide-react";

interface InteractiveDiagramProps {
  src: string;
  title: string;
  figureNumber: number;
  width: number;
  height: number;
}

export function InteractiveDiagram({
  src,
  title,
  figureNumber,
  width,
  height,
}: InteractiveDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgText, setSvgText] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((svg) => {
        if (!cancelled) {
          setSvgText(svg);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    if (!svgText || !containerRef.current) return;
    const svgEl = containerRef.current.querySelector("svg");
    if (!svgEl) return;

    const handlers = new Map<
      Element,
      { enter: () => void; leave: () => void }
    >();

    const nodes = svgEl.querySelectorAll(".node");
    nodes.forEach((node) => {
      const labelEl = node.querySelector(
        ".nodeLabel, .label text, text:not(.edgeLabel *)",
      );
      const label = labelEl?.textContent?.trim() || null;

      const enter = () => {
        setActiveLabel(label);
        node
          .querySelectorAll(
            "rect, circle, polygon, path:not(.edge-pattern-*)",
          )
          .forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.filter = "brightness(1.4)";
            htmlEl.style.transition = "filter 150ms ease";
          });
      };
      const leave = () => {
        setActiveLabel(null);
        node
          .querySelectorAll(
            "rect, circle, polygon, path:not(.edge-pattern-*)",
          )
          .forEach((el) => {
            (el as HTMLElement).style.filter = "";
          });
      };

      node.addEventListener("mouseenter", enter);
      node.addEventListener("mouseleave", leave);
      handlers.set(node, { enter, leave });
    });

    return () => {
      handlers.forEach(({ enter, leave }, node) => {
        node.removeEventListener("mouseenter", enter);
        node.removeEventListener("mouseleave", leave);
      });
    };
  }, [svgText]);

  const aspectRatio = height > 0 ? width / height : 16 / 9;

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <span className="text-xs font-semibold text-accent">
            Figure {figureNumber}
          </span>
          <span className="text-sm font-medium text-white">{title}</span>
        </div>
        <div
          className="flex items-center justify-center bg-white/[0.02]"
          style={{ aspectRatio: String(aspectRatio) }}
        >
          <Loader2 className="h-6 w-6 animate-spin text-zinc-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-white/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <span className="text-xs font-semibold text-accent">
            Figure {figureNumber}
          </span>
          <span className="text-sm font-medium text-white">{title}</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 bg-white/[0.02] py-20 text-center">
          <p className="text-sm text-zinc-500">Unable to load diagram.</p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent hover:text-accent-hover"
          >
            View source SVG →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-accent">
            Figure {figureNumber}
          </span>
          <span className="text-sm font-medium text-white">{title}</span>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-[11px] text-zinc-400 transition-colors hover:border-white/25 hover:text-white"
          title="Open full resolution SVG"
        >
          <Maximize2 className="h-3 w-3" />
          Full resolution
        </a>
      </div>
      <div className="overflow-x-auto bg-[#09090b] p-4">
        <div
          ref={containerRef}
          className="[&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-none"
          dangerouslySetInnerHTML={{ __html: svgText! }}
        />
      </div>
      <AnimatePresence>
        {activeLabel ? (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10"
          >
            <p className="px-5 py-2.5 text-xs text-zinc-400">
              <span className="text-accent">Node:</span> {activeLabel}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-t border-white/10 px-5 py-2.5"
          >
            <p className="text-center text-[11px] text-zinc-600">
              Hover over the diagram to explore each node.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}