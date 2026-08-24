"use client";

import { ArrowRight } from "lucide-react";
import { BOOKING_URL, BOOKING_LABEL } from "@/lib/constants";

interface BookingCtaProps {
  variant?: "primary" | "outline";
  className?: string;
  label?: string;
}

export function BookingCta({
  variant = "primary",
  className,
  label = BOOKING_LABEL,
}: BookingCtaProps) {
  const styles =
    variant === "primary"
      ? "bg-accent-strong text-white hover:bg-accent"
      : "border border-border-strong text-foreground-secondary hover:border-border-strong";

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 text-sm font-medium transition-colors ${styles} ${className ?? ""}`}
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </a>
  );
}
