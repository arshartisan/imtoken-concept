"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";

/**
 * Page-level Lenis smooth scrolling. Same-page `#hash` links glide to their
 * target instead of jumping; Lenis honours each section's `scroll-mt-*`, which
 * already clears the sticky header. Lenis is switched off when the visitor prefers
 * reduced motion, leaving native scrolling. Nested scroll regions should
 * carry `data-lenis-prevent` so they keep their own wheel scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        wheelMultiplier: 1,
        smoothWheel: true,
        anchors: { duration: 1.2 },
        // Touch keeps native momentum scrolling; Lenis only smooths wheel/trackpad.
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
