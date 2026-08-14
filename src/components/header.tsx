"use client";

import Link from "next/link";
import { PlatformBoxLogoIcon } from "./icons";
import { BOOKING_URL, BOOKING_LABEL } from "@/lib/constants";

interface HeaderProps {
  showHomeLink?: boolean;
}

export function Header({ showHomeLink = false }: HeaderProps) {
  return (
    <header className="relative z-20 border-b border-white/10 bg-zinc-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white"
        >
          <PlatformBoxLogoIcon className="h-7 w-7" />
          PlatformBox<span className="text-accent">.io</span>
        </Link>
        <div className="flex items-center gap-4">
          {showHomeLink ? (
            <Link
              href="/"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:inline"
            >
              Home
            </Link>
          ) : (
            <Link
              href="/showcase"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:inline"
            >
              Blueprint
            </Link>
          )}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:inline"
          >
            {BOOKING_LABEL}
          </a>
        </div>
      </div>
    </header>
  );
}
