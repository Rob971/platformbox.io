"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { LinkedInIcon, PlatformBoxLogoIcon } from "./icons";
import { BOOKING_URL, BOOKING_LABEL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <PlatformBoxLogoIcon className="h-5 w-5" />
              <p className="text-sm font-semibold text-white">
                PlatformBox<span className="text-accent">.io</span>
              </p>
            </div>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-zinc-500">
              A production-ready developer platform delivered in 14 working days, at a fixed price.
            </p>
            <p className="mt-2 text-xs text-zinc-600">
              © 2026 PlatformBox.io
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-700">
              build {process.env.NEXT_PUBLIC_COMMIT_SHA?.slice(0, 7) ?? "dev"}
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
              Pages
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  prefetch={false}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/showcase"
                  prefetch={false}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  14-Day Blueprint
                </Link>
              </li>
              <li>
                <Link
                  href="/architecture"
                  prefetch={false}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Reference Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
              Contact
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:roberto@platformbox.io"
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  roberto@platformbox.io
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/robertocornano/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                  aria-label="PlatformBox on LinkedIn"
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              </li>
              <li className="mt-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent-hover transition-colors hover:text-white"
                >
                  {BOOKING_LABEL} →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
