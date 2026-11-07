"use client";

import { useRouter } from "next/navigation";

/** Outlined button that returns to the previous page (or home when there is none). */
export default function GoBackButton({ className = "" }) {
  const router = useRouter();

  const handleClick = () => {
    // history.length is 1 when the visitor opened this URL directly
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`cursor-pointer rounded-[3px] border border-white/40 px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black ${className}`}
    >
      Go back
    </button>
  );
}
