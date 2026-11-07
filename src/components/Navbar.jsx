"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "#home", id: "home" },
  { name: "Features", href: "#features", id: "features" },
  { name: "About", href: "#about", id: "about" },
  { name: "Testimonials", href: "#testimonials", id: "testimonials" },
  { name: "Pricing", href: "#pricing", id: "pricing" },
  { name: "Contact", href: "#contact", id: "contact" },
];

// Sections without their own nav item are highlighted under a related item
const sectionToNavId = { customization: "about" };
const observedSections = [...navItems.map((item) => item.id), "customization"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const progressRef = useRef(null);

  // Solid background after scrolling + reading-progress bar (updated without re-rendering)
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 30);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`;
    };

    // Throttle to one update per animation frame
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Highlight the nav item of the section currently crossing the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(sectionToNavId[entry.target.id] ?? entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    observedSections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  // Close the mobile drawer with Escape or when the viewport grows to desktop size
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = (event) => {
      if (event.matches) setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        scrolled ? "bg-[#15171e]/95 py-4 shadow-md backdrop-blur-md" : "bg-transparent py-6 sm:py-8"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Brand Logo */}
        <Link href="#home" aria-label="Lucid - back to top" className="inline-flex shrink-0 items-center">
          <Image
            src="/assets/logo.png"
            alt="Lucid Logo"
            width={300}
            height={48}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center space-x-8 lg:flex xl:space-x-10">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className="group relative py-1 text-[14px] font-semibold uppercase tracking-wider text-white"
              >
                {item.name}
                {/* Hover, focus, touch or being the active section all open the underline */}
                <span
                  className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-[#008ed6] transition-all duration-500 ease-in-out group-hover:w-full group-focus-visible:w-full group-active:w-full ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="cursor-pointer rounded p-2 text-white transition-colors hover:bg-white/10 active:bg-white/20 lg:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer (inert while closed so hidden links cannot be tabbed to) */}
      <div
        id="mobile-menu"
        inert={!isOpen}
        className={`overflow-hidden border-b border-gray-800 bg-[#15171e] transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "max-h-96 py-4 opacity-100 shadow-xl" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile navigation" className="container mx-auto flex flex-col space-y-3 px-4 sm:px-6 md:px-8">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "location" : undefined}
                className="group relative border-b border-gray-800/60 py-2 text-sm font-semibold uppercase tracking-wider text-gray-200 last:border-none"
              >
                <span
                  className={`relative z-10 transition-colors duration-200 group-hover:text-white group-active:text-[#008ed6] ${
                    isActive ? "text-white" : ""
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-[#008ed6] transition-all duration-500 ease-in-out group-hover:w-full group-active:w-full ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Reading progress bar */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="gradient-bar absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0"
      />
    </header>
  );
}
