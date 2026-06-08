"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ProductError({
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
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pt-[var(--header-h)]">
      <p className="eyebrow text-brass mb-6">Product unavailable</p>
      <h1 className="display text-5xl md:text-7xl leading-none text-balance max-w-2xl">
        We can't show this<br />
        <span className="italic font-light text-stone">right now.</span>
      </h1>
      <div className="mt-12 flex items-center gap-4">
        <button
          onClick={reset}
          className="text-[11px] tracking-widest uppercase bg-paper text-ink px-8 py-4 hover:bg-brass transition-colors"
        >
          Try Again →
        </button>
        <Link
          href="/shop"
          className="text-[11px] tracking-widest uppercase border border-paper/30 px-8 py-4 hover:bg-paper hover:text-ink transition-colors"
        >
          Back to Collection
        </Link>
      </div>
    </div>
  );
}
