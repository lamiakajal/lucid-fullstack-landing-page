"use client";

import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

/** Floating button that appears after scrolling down and returns to the top. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#008ed6] text-white shadow-lg transition-all duration-300 hover:bg-[#0077b5] active:scale-90 sm:bottom-8 sm:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <FaChevronUp className="animate-bob" />
    </button>
  );
}
