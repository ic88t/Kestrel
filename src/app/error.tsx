"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-[var(--header-h)]">
      <p className="eyebrow text-brass mb-6">Something broke</p>
      <h1 className="display text-6xl md:text-8xl leading-none text-balance max-w-3xl">
        A small<br />
        <span className="italic font-light text-stone">turbulence.</span>
      </h1>
      <p className="text-paper/60 max-w-md mt-8 leading-relaxed">
        Try again, or return home. If this keeps happening, write us at{" "}
        <a className="text-brass" href="mailto:hello@kestrel.co">
          hello@kestrel.co
        </a>
        .
      </p>
      <div className="mt-12 flex items-center gap-4">
        <button
          onClick={reset}
          className="text-[11px] tracking-widest uppercase bg-paper text-ink px-8 py-4 hover:bg-brass focus:outline-none focus-visible:ring-1 focus-visible:ring-brass transition-colors"
        >
          Try Again →
        </button>
        <Link
          href="/"
          className="text-[11px] tracking-widest uppercase border border-paper/30 px-8 py-4 hover:bg-paper hover:text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-brass transition-colors"
        >
          Return Home →
        </Link>
      </div>
    </div>
  );
}
