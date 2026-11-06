"use client";

import { useEffect } from "react";

/**
 * Pauses looping CSS animations in any `[data-anim]` section while it's
 * off-screen by toggling `data-paused` (styles/landing.css freezes
 * `animation-play-state` underneath it). The landing page runs dozens of
 * infinite decorative loops; without this they all keep painting while the
 * visitor scrolls past, which is what made scrolling stutter.
 */
export function OffscreenPause() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-anim]");
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute("data-paused", !entry.isIntersecting);
        }
      },
      // start a little before a section scrolls in so it's already moving
      { rootMargin: "200px 0px" },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
