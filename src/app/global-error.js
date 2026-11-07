"use client";

import "./globals.css";

/**
 * Last-resort error page. It replaces the root layout, so it must render its
 * own <html> and <body>. (Route-level errors are handled by error.js.)
 */
export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#15171e] px-6 text-center">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Something went seriously wrong</h1>
        <p className="mt-3 max-w-md">The application hit an unexpected error. Please try again.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="cursor-pointer rounded-[3px] bg-[#008ed6] px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#0077b5]"
          >
            Try again
          </button>
          {/* A plain link on purpose: it reloads everything from the server */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="rounded-[3px] border border-white/40 px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
          >
            Back to home
          </a>
        </div>
      </body>
    </html>
  );
}
