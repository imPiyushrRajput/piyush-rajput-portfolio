"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Dot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 7px;
  height: 7px;
  margin: -3.5px 0 0 -3.5px;
  border-radius: 50%;
  background: #fff;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const Ring = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 34px;
  height: 34px;
  margin: -17px 0 0 -17px;
  border-radius: 50%;
  border: 1px solid #fff;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

/**
 * A decorative two-part cursor: a dot that tracks the pointer exactly and a
 * ring that trails it with spring physics, growing over interactive elements.
 * Only renders on devices with a fine pointer (mouse) and when the user has
 * not requested reduced motion — touch and keyboard users keep the native cursor.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 350, damping: 28, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 350, damping: 28, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target?.closest?.('a, button, [role="button"], input, textarea, select')
      );
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <Dot
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <Ring
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        animate={{ scale: hovering ? 1.7 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
