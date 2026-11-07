import Link from "next/link";

/**
 * Outlined call-to-action link whose blue background expands from the center
 * on hover, keyboard focus and touch. A light shimmer sweeps across it in a loop.
 */
export default function ExpandButton({ href, children, className = "", shimmerDelay = "0s" }) {
  return (
    <Link
      href={href}
      style={{ "--shimmer-delay": shimmerDelay }}
      className={`shimmer group relative inline-block select-none overflow-hidden rounded-[3px] border border-white bg-transparent px-7 py-3 text-center text-[13px] font-bold uppercase tracking-wider text-white transition-colors duration-500 ease-in-out hover:border-[#008ed6] focus-visible:border-[#008ed6] active:border-[#008ed6] ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-center scale-x-0 bg-[#008ed6] transition-transform duration-500 ease-in-out group-hover:scale-x-100 group-focus-visible:scale-x-100 group-active:scale-x-100"
      />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
