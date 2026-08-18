"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PlatformBoxLogoIcon } from "./icons";
import { BOOKING_URL, BOOKING_LABEL } from "@/lib/constants";

interface HeaderProps {
  showHomeLink?: boolean;
}

const pageLinks = [
  { href: "/showcase", label: "Blueprint" },
  { href: "/architecture", label: "Architecture" },
] as const;

export function Header({ showHomeLink = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const close = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          onClick={close}
          prefetch={false}
          className="flex shrink-0 items-center gap-2.5 text-sm font-semibold tracking-tight text-white"
        >
          <PlatformBoxLogoIcon className="h-7 w-7" />
          PlatformBox<span className="text-accent">.io</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          {showHomeLink ? (
            <Link
              href="/"
              prefetch={false}
              className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Home
            </Link>
          ) : (
            <>
              <a
                href="#delivery"
                className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                How it works
              </a>
              <a
                href="#pricing"
                className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                FAQ
              </a>
            </>
          )}
          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center rounded-lg bg-accent-strong px-4 text-sm font-medium text-white transition-colors hover:bg-accent"
            >
              {BOOKING_LABEL}
            </a>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white sm:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-zinc-950/95 backdrop-blur-md sm:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {showHomeLink && (
              <Link
                href="/"
                onClick={close}
                prefetch={false}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                Home
              </Link>
            )}
            {!showHomeLink && (
              <>
                <a
                  href="#delivery"
                  onClick={close}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  How it works
                </a>
                <a
                  href="#pricing"
                  onClick={close}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  Pricing
                </a>
                <a
                  href="#faq"
                  onClick={close}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  FAQ
                </a>
              </>
            )}
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                prefetch={false}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-accent-strong px-4 text-sm font-medium text-white transition-colors hover:bg-accent"
            >
              {BOOKING_LABEL}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
