"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
};

/**
 * Fades and lifts its children into view the first time they enter the
 * viewport. Falls back to "always visible" when the visitor has asked for
 * reduced motion.
 *
 * The `reveal-enabled` class on <html> is what arms the hiding behaviour in
 * app/globals.css. It is added here and removed on cleanup so a page with no
 * Reveal on it never renders an invisible element, and so navigating away does
 * not leave the class behind for the next page.
 */
export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const root = document.documentElement;
    root.classList.add("reveal-enabled");

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return () => root.classList.remove("reveal-enabled");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      // Only clear the flag if nothing else on the page is still revealing,
      // otherwise unmounting one Reveal would blank every other one.
      if (!document.querySelector(".reveal:not(.is-in)")) {
        root.classList.remove("reveal-enabled");
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${shown ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
