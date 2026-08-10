"use client";

import { Mail } from "lucide-react";
import { LinkedInIcon } from "./icons";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-zinc-500">PlatformBox.io © 2026</p>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
            build {process.env.NEXT_PUBLIC_COMMIT_SHA?.slice(0, 7) ?? "dev"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <a
            href="mailto:roberto@platformbox.io"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4" aria-hidden />
            roberto@platformbox.io
          </a>
          <a
            href="https://www.linkedin.com/in/robertocornano/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
            aria-label="PlatformBox on LinkedIn"
          >
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
