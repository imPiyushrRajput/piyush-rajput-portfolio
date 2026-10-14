"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Adds momentum-based smooth scrolling with Lenis, and makes in-page anchor
 * links (#about, #projects, …) glide instead of jump. Honors the user's
 * reduced-motion preference by skipping smoothing entirely.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    // Expose so other components (e.g. the mobile menu) can lock/unlock scroll.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smoothly scroll to in-page anchors on click.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();

      // Offset so the target lands just below the sticky header.
      const HEADER_OFFSET = 80;

      // If the mobile menu is open the page is scroll-locked (overflow:hidden)
      // and the header is position:fixed, which shifts every section up by the
      // header height — so wait (via rAF) until the lock is released and the
      // layout has settled before measuring. Then compute the absolute target
      // position ourselves and pass a NUMBER to Lenis: Lenis's element-target
      // resolution lands short here, but a numeric target is reliable.
      const scrollWhenReady = (attempts = 0) => {
        const locked =
          document.documentElement.style.overflow === "hidden" ||
          document.body.style.overflow === "hidden";
        if (locked && attempts < 30) {
          requestAnimationFrame(() => scrollWhenReady(attempts + 1));
          return;
        }
        lenis.start();
        const top =
          (target as HTMLElement).getBoundingClientRect().top +
          window.scrollY -
          HEADER_OFFSET;
        lenis.scrollTo(Math.max(0, Math.round(top)), { force: true });
      };
      scrollWhenReady();
      history.replaceState(null, "", id);
    };

    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
