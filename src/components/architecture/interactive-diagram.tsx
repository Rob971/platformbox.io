"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Maximize2, Scan, ZoomIn, ZoomOut } from "lucide-react";

interface InteractiveDiagramProps {
  src: string;
  title: string;
  figureNumber: number;
  description: string;
  /**
   * Whether to start scaled to fit the container width. Diagrams that must
   * be read step-by-step (e.g. the promotion sequence) opt out so they start
   * at 100% and stay legible, scrolling instead of shrinking.
   */
  initialFit?: boolean;
}

export function InteractiveDiagram({
  src,
  title,
  figureNumber,
  description,
  initialFit = true,
}: InteractiveDiagramProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgText, setSvgText] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [intrinsicWidth, setIntrinsicWidth] = useState(1);
  const [fitScale, setFitScale] = useState(1);
  const [zoom, setZoom] = useState<number | "fit">(initialFit ? "fit" : 1);

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

  // Read the intrinsic size from the SVG's viewBox and wire up the
  // hover-to-inspect interaction (works for flowchart nodes and, on the
  // sequence diagram, for actors and notes).
  useEffect(() => {
    if (!svgText || !containerRef.current) return;
    const svgEl = containerRef.current.querySelector("svg");
    if (!svgEl) return;

    const vb = svgEl.getAttribute("viewBox");
    if (vb) {
      const parts = vb.trim().split(/\s+/).map(Number);
      if (parts.length === 4 && parts[2] > 0) setIntrinsicWidth(parts[2]);
    }

    const getLabel = (node: Element): string | null => {
      // Actor boxes and notes draw their text as a sibling inside a parent
      // <g>, so search the containing group rather than the shape itself.
      const scope = node.closest("g") ?? node;
      const selectors: string[] = [];
      if (node.matches(".node")) selectors.push(".nodeLabel");
      if (node.matches(".actor")) selectors.push("text.actor tspan", "text.actor");
      if (node.matches(".note")) selectors.push(".noteText tspan", ".noteText");
      selectors.push("text tspan", "text");
      for (const sel of selectors) {
        const text = (scope.querySelector(sel)?.textContent ?? "").trim();
        if (text) return text;
      }
      return null;
    };

    const brighten = (node: Element, on: boolean) => {
      const targets = node.matches("rect, circle, polygon, path, line")
        ? [
            node,
            ...Array.from(
              node.querySelectorAll("rect, circle, polygon, path, line"),
            ),
          ]
        : Array.from(node.querySelectorAll("rect, circle, polygon, path, line"));
      targets.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.filter = on ? "brightness(1.4)" : "";
        htmlEl.style.transition = "filter 150ms ease";
      });
    };

    const handlers = new Map<Element, { enter: () => void; leave: () => void }>();
    svgEl.querySelectorAll(".node, .actor, .note").forEach((node) => {
      const enter = () => {
        setActiveLabel(getLabel(node));
        brighten(node, true);
      };
      const leave = () => {
        setActiveLabel(null);
        brighten(node, false);
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

  // Track the visible width so "fit to width" stays correct on resize.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const viewport = el.clientWidth;
      setFitScale(viewport > 0 ? viewport / Math.max(intrinsicWidth, 1) : 1);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [intrinsicWidth]);

  const scale = zoom === "fit" ? fitScale : zoom;
  const displayWidth = Math.max(Math.round(intrinsicWidth * scale), 1);

  const currentScale = zoom === "fit" ? fitScale : zoom;
  const zoomIn = () => setZoom(Math.min(currentScale * 1.25, 4));
  const zoomOut = () => setZoom(Math.max(currentScale / 1.25, 0.1));
  const fitToWidth = () => setZoom("fit");

  const controlClass =
    "flex h-7 w-7 items-center justify-center text-foreground-tertiary transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";

  if (loading) {
    return (
      <div className="rounded-xl border border-border">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3">
          <span className="text-xs font-semibold text-accent">
            Figure {figureNumber}
          </span>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <div className="flex items-center justify-center bg-surface py-24">
          <Loader2 className="h-6 w-6 animate-spin text-muted" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-border">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3">
          <span className="text-xs font-semibold text-accent">
            Figure {figureNumber}
          </span>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 bg-surface py-20 text-center">
          <p className="text-sm text-muted">Unable to load diagram.</p>
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
    <figure className="rounded-xl border border-border">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-accent">
            Figure {figureNumber}
          </span>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-md border border-border">
            <button
              type="button"
              onClick={zoomOut}
              aria-label={`Zoom out ${title}`}
              className={`${controlClass} rounded-l-md`}
            >
              <ZoomOut className="h-3.5 w-3.5" aria-hidden />
            </button>
            <span
              aria-live="polite"
              className="min-w-12 border-x border-border px-2 text-center text-[11px] tabular-nums text-foreground-tertiary"
            >
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              aria-label={`Zoom in ${title}`}
              className={controlClass}
            >
              <ZoomIn className="h-3.5 w-3.5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={fitToWidth}
              aria-label={`Fit ${title} to width`}
              title="Fit to width"
              className={`${controlClass} rounded-r-md border-l border-border`}
            >
              <Scan className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>

          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] text-foreground-tertiary transition-colors hover:border-border-strong hover:text-foreground"
            title="Open full resolution SVG"
          >
            <Maximize2 className="h-3 w-3" aria-hidden />
            Full resolution
          </a>
        </div>
      </figcaption>

      <div className="bg-background p-4">
        <div
          ref={scrollRef}
          className="overflow-auto diagram-light-invert"
          style={{ maxHeight: "75vh" }}
        >
          <div
            ref={containerRef}
            role="img"
            aria-label={description}
            style={{ width: displayWidth }}
            className="mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-none"
            dangerouslySetInnerHTML={{ __html: svgText! }}
          />
        </div>
      </div>

      <AnimatePresence>
        {activeLabel ? (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border"
          >
            <p className="px-5 py-2.5 text-xs text-foreground-tertiary">
              <span className="text-accent">Element:</span> {activeLabel}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-t border-border px-5 py-2.5"
          >
            <p className="text-center text-[11px] text-muted">
              Hover over the diagram to inspect each element · use the controls
              to zoom.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}

