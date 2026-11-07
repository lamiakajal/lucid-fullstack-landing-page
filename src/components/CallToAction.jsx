import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function CallToAction() {
  return (
    <section className="relative w-full overflow-hidden border-t border-white/10 bg-black py-10 sm:py-12">
      {/* Animated accent line along the top edge */}
      <div aria-hidden="true" className="gradient-bar absolute left-0 top-0 h-[2px] w-full" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <Reveal className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left Heading */}
          <h3 className="text-center text-xl font-light leading-snug tracking-tight text-white sm:text-2xl md:text-left lg:text-[28px]">
            <span className="font-bold">Like what you see?</span> Get this great theme now!
          </h3>

          {/* Right Action Buttons */}
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
            <Link
              href="#pricing"
              style={{ "--shimmer-delay": "0.6s" }}
              className="shimmer relative inline-block overflow-hidden rounded-sm border border-white/40 px-5 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-[#008ed6] hover:bg-[#008ed6] focus-visible:bg-[#008ed6] sm:px-6 sm:py-3 sm:text-[13px]"
            >
              DOWNLOAD NOW
            </Link>
            <Link
              href="#features"
              className="inline-block rounded-sm border border-white/40 px-5 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black sm:px-6 sm:py-3 sm:text-[13px]"
            >
              VIEW FEATURES
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
