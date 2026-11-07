"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const MIN_VISIBLE_MS = 700; // avoid a distracting flash when the page loads instantly
const MAX_WAIT_MS = 4000; // never keep visitors waiting on a slow third-party asset
const FADE_OUT_MS = 500; // must match the duration-500 class below

/**
 * Full-screen loader with a circular spinner, shown while the site loads.
 * It is part of the server HTML, so it covers the page from the very first paint,
 * then fades out after the browser finished loading (and is removed from the DOM).
 */
export default function Preloader() {
  const [phase, setPhase] = useState("visible"); // visible | leaving | gone

  useEffect(() => {
    const startedAt = performance.now();
    const timers = [];
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt));
      timers.push(
        setTimeout(() => {
          setPhase("leaving");
          timers.push(setTimeout(() => setPhase("gone"), FADE_OUT_MS));
        }, wait)
      );
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      timers.push(setTimeout(finish, MAX_WAIT_MS));
    }

    return () => {
      window.removeEventListener("load", finish);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`preloader fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-[#15171e] transition-opacity duration-500 ease-out ${
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Circular loading ring */}
      <div className="relative h-20 w-20">
        <span aria-hidden="true" className="absolute inset-0 rounded-full border-4 border-white/10" />
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#008ed6]"
        />
      </div>

      <Image
        src="/assets/logo.png"
        alt=""
        width={300}
        height={48}
        priority
        className="h-8 w-auto animate-pulse object-contain"
      />
      <span className="sr-only">Loading, please wait</span>
    </div>
  );
}
