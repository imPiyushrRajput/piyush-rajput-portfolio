"use client";

import { useEffect } from "react";
import {
  setSoundEnabled,
  primeAudio,
  playHover,
  playClick,
  playSlide,
  playSweep,
  playFlip,
} from "@/lib/sfx";

const INTERACTIVE = 'a, button, [role="button"], input[type="submit"]';

/**
 * Plays subtle UI sounds on hover/click of interactive elements, globally via
 * event delegation. Sounds are opt-in (persisted in localStorage, toggled from
 * the navbar) and no-op until enabled. Hover sounds only on fine pointers.
 */
export default function SoundEffects() {
  useEffect(() => {
    // Restore saved preference — on by default unless explicitly turned off.
    try {
      setSoundEnabled(localStorage.getItem("sound") !== "off");
    } catch {
      setSoundEnabled(true);
    }

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let lastEl: Element | null = null;

    // Resume the audio context on the first gesture so sounds can play.
    const onPointerDown = () => primeAudio();

    const onOver = (e: PointerEvent) => {
      if (!finePointer) return;
      const el = (e.target as HTMLElement)?.closest?.(INTERACTIVE) as
        | HTMLElement
        | null;
      if (!el || el === lastEl) return;
      lastEl = el;
      // Elements can opt out of the hover sound with data-sfx-hover="off".
      if (el.dataset.sfxHover === "off") return;
      playHover();
    };
    const onOut = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(INTERACTIVE);
      if (el && el === lastEl) lastEl = null;
    };
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(INTERACTIVE) as
        | HTMLElement
        | null;
      if (!el) return;
      // Elements can opt into a sound that matches their animation via data-sfx.
      switch (el.dataset.sfx) {
        case "slide":
          playSlide();
          break;
        case "sweep":
          playSweep();
          break;
        case "flip":
          playFlip();
          break;
        default:
          playClick();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
