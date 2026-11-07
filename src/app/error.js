"use client";

import { useEffect } from "react";
import Link from "next/link";

/** Route-level error boundary: shows a friendly message and a retry button. */
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#15171e] px-6 text-center">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">Something went wrong</h1>
      <p className="mt-3 max-w-md">An unexpected error occurred. Please try again.</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="cursor-pointer rounded-[3px] bg-[#008ed6] px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#0077b5]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-[3px] border border-white/40 px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
