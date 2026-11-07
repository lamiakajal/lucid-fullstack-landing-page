"use client";

import Link from "next/link";

/**
 * "ORDER NOW" button for a pricing card. Besides scrolling to the contact form
 * it announces the chosen plan so the form can pre-fill its plan and subject.
 */
export default function PlanOrderLink({ planId, planName }) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("lucid:select-plan", { detail: { planId, planName } }));
  };

  return (
    <Link
      href="#contact"
      onClick={handleClick}
      aria-label={`Order the ${planName} plan`}
      className="group/btn relative block w-full overflow-hidden rounded-xs border border-[#008ed6] px-4 py-2.5 text-[13px] font-bold uppercase tracking-wider text-[#008ed6] transition-colors duration-300"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-center scale-x-0 transform bg-[#008ed6] transition-transform duration-300 ease-out group-hover/btn:scale-x-100 group-focus-visible/btn:scale-x-100 group-active/btn:scale-x-100 group-hover:scale-x-100 group-focus-within:scale-x-100"
      />
      <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white group-hover:text-white group-focus-within:text-white">
        ORDER NOW
      </span>
    </Link>
  );
}
