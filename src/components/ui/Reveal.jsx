"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades and slides its children into view the first time they scroll on screen.
 *
 * @param {number} delay      Stagger delay in milliseconds.
 * @param {"up"|"left"|"right"|"zoom"} direction  Entrance direction.
 */
export default function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animate only once
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-direction={direction}
      style={{ "--reveal-delay": `${delay}ms` }}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
