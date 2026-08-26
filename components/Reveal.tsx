"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
};

/**
 * Fades + slides its children in shortly after mount. We trigger on mount
 * (not on scroll-into-view) so the reveal never depends on IntersectionObserver
 * firing — some embedded/preview panes don't fire it, which would otherwise
 * leave content stuck invisible. Reduced motion renders instantly.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  as = "div",
  className,
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </MotionTag>
  );
}
