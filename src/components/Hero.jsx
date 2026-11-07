import Image from "next/image";
import ExpandButton from "@/components/ui/ExpandButton";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#15171e] pb-20 pt-32"
    >
      {/* Background photo, optimised by next/image, with a dark overlay on top */}
      <Image
        src="/assets/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#15171e]/85" />

      {/* Drifting glow orbs (decorative, loop forever) */}
      <div
        aria-hidden="true"
        className="animate-orb pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#008ed6]/25 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        style={{ animationDelay: "-9s" }}
        className="animate-orb pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-[#7fd6ff]/15 blur-3xl sm:h-80 sm:w-80"
      />

      <div className="container relative mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 md:px-8 lg:grid-cols-2 lg:px-12">
        {/* Left Column Content */}
        <div className="z-10 text-center lg:text-left">
          <span
            style={{ animationDelay: "0.1s" }}
            className="animate-hero-in mb-4 block text-[13px] font-bold uppercase tracking-wider text-[#008ed6]"
          >
            INTRODUCING LUCID THEME
          </span>

          <h1
            style={{ animationDelay: "0.25s" }}
            className="animate-hero-in text-4xl font-bold leading-[1.18] tracking-tight text-white sm:text-5xl lg:text-[54px]"
          >
            Carefully crafted and <br className="hidden sm:inline" />
            beautiful landing page.
          </h1>

          <p
            style={{ animationDelay: "0.4s" }}
            className="animate-hero-in mx-auto mt-5 max-w-lg text-[15px] leading-relaxed lg:mx-0"
          >
            Etiam ullamcorper et turpis eget hendrerit. Praesent varius leo velit, ut eleifend leo
            molestie a. Curabitur vel venenatis lacus sed dolor placerat tempus. Morbi sed hendrerit
            arcu.
          </p>

          {/* Action Buttons */}
          <div
            style={{ animationDelay: "0.55s" }}
            className="animate-hero-in mt-10 flex flex-wrap justify-center gap-4 sm:mt-12 lg:justify-start"
          >
            <ExpandButton href="#pricing">DOWNLOAD NOW</ExpandButton>
            <ExpandButton href="#features" shimmerDelay="1.4s">
              VIEW FEATURES
            </ExpandButton>
          </div>
        </div>

        {/* Right Column Showcase */}
        <div
          style={{ animationDelay: "0.4s" }}
          className="animate-hero-in relative mt-12 flex items-center justify-center sm:mt-16 lg:mt-0 lg:justify-end"
        >
          {/* Pulsing halo behind the device mockup */}
          <div
            aria-hidden="true"
            className="pulse-ring absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-72 sm:w-72 lg:left-auto lg:right-24 lg:translate-x-0"
          />
          <Image
            src="/assets/lucid.webp"
            alt="Lucid devices mockup"
            width={510}
            height={621}
            priority
            sizes="(min-width: 1024px) 576px, (min-width: 640px) 448px, 90vw"
            className="animate-float relative h-auto w-full max-w-md object-contain drop-shadow-2xl lg:max-w-xl"
          />
        </div>
      </div>
    </section>
  );
}
