"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

const PER_SLIDE = 2;
const SWIPE_THRESHOLD = 50; // px

// Group testimonials into slides of two (computed once, not on every render)
const slideGroups = Array.from({ length: Math.ceil(testimonials.length / PER_SLIDE) }, (_, index) =>
  testimonials.slice(index * PER_SLIDE, index * PER_SLIDE + PER_SLIDE)
);

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const goTo = (index) => setCurrentSlide((index + slideGroups.length) % slideGroups.length);

  // Swipe left/right on touch screens
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    setIsPaused(true);
  };
  const handleTouchEnd = (event) => {
    if (touchStartX.current !== null) {
      const delta = event.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(delta) > SWIPE_THRESHOLD) goTo(currentSlide + (delta < 0 ? 1 : -1));
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <section
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      {/* Background image with a dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/testimonial.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Heading Area */}
        <Reveal className="mb-16 sm:mb-20">
          <SectionHeading eyebrow="WHAT OUR CLIENTS SAY" title="Clients Testimonials" theme="dark" />
        </Reveal>

        {/* Carousel viewport */}
        <Reveal delay={150}>
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            className="relative mx-auto max-w-5xl overflow-hidden"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slideGroups.map((group, groupIdx) => (
                <div
                  key={groupIdx}
                  inert={groupIdx !== currentSlide}
                  aria-roledescription="slide"
                  aria-label={`${groupIdx + 1} of ${slideGroups.length}`}
                  className="grid w-full shrink-0 grid-cols-1 gap-10 px-2 md:grid-cols-2 md:gap-14"
                >
                  {group.map((item) => (
                    <figure key={item.id} className="flex flex-col justify-between">
                      <blockquote className="mb-6 text-[16px] font-light italic leading-[1.8] text-gray-100 drop-shadow-sm sm:text-[17px]">
                        “{item.quote}”
                      </blockquote>

                      {/* Author Info */}
                      <figcaption className="flex items-center space-x-4">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white/40 shadow-md">
                          <Image src={item.avatar} alt="" fill sizes="56px" className="object-cover" />
                        </div>
                        <div>
                          <span className="block text-[15px] font-bold text-white drop-shadow-sm sm:text-[16px]">
                            {item.name}
                          </span>
                          <span className="block text-[12px] font-semibold uppercase tracking-wider text-[#008ed6] drop-shadow-xs">
                            {item.role}
                          </span>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Pagination dots */}
        <div className="flex items-center justify-center space-x-3 pt-12">
          {slideGroups.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => goTo(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              aria-current={currentSlide === dotIndex}
              className={`cursor-pointer rounded-full transition-all duration-200 ${
                currentSlide === dotIndex
                  ? "h-3 w-3 scale-125 bg-white shadow-md"
                  : "h-2.5 w-2.5 bg-white/40 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Progress bar: its CSS animation is the timer. When it ends, the next slide shows. */}
        <div aria-hidden="true" className="mx-auto mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-white/20">
          <div
            key={currentSlide}
            onAnimationEnd={() => goTo(currentSlide + 1)}
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
            className="carousel-progress h-full w-full bg-[#008ed6]"
          />
        </div>
      </div>
    </section>
  );
}
