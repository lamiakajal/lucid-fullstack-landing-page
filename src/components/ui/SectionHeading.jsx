"use client";

import { useRef, useState } from "react";

/**
 * Shared section title: small eyebrow label + heading + animated underline.
 * The underline sweeps in a loop and stays open while hovered or touched.
 *
 * @param {"light"|"dark"} theme   Text colour for light or dark backgrounds.
 * @param {"center"|"left"} align  "left" only applies from the lg breakpoint up.
 */
export default function SectionHeading({
  eyebrow,
  title,
  theme = "light",
  align = "center",
  className = "",
}) {
  const [active, setActive] = useState(false);
  const touchTimer = useRef(null);

  const alignment =
    align === "left"
      ? "items-center text-center lg:items-start lg:text-left"
      : "items-center text-center";

  const handleTouchStart = () => {
    setActive(true);
    clearTimeout(touchTimer.current);
    // Touch screens have no "mouse leave", so close the underline after a moment
    touchTimer.current = setTimeout(() => setActive(false), 1600);
  };

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={handleTouchStart}
      className={`flex flex-col ${alignment} ${className}`}
    >
      <span className="mb-3 block text-[13px] font-bold uppercase tracking-wider text-[#008ed6] select-none">
        {eyebrow}
      </span>

      <div className="relative inline-block">
        <h2
          className={`pb-3 text-3xl font-bold tracking-tight sm:pb-4 sm:text-4xl lg:text-[42px] ${
            theme === "dark" ? "text-white drop-shadow-md" : "text-[#1a1a1a]"
          }`}
        >
          {title}
        </h2>
        <span
          aria-hidden="true"
          data-active={active}
          className="heading-underline pointer-events-none absolute bottom-0 left-0 h-[2.5px] w-full bg-[#008ed6]"
        />
      </div>
    </div>
  );
}
