"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-semibold tracking-tight text-white">
        Something went wrong
      </h2>
      <p className="mt-2 text-zinc-400">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Try again
      </button>
    </div>
  );
}