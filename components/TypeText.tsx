"use client";

import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useReducedMotion } from "framer-motion";

const blink = keyframes`
  0%, 45% { opacity: 1; }
  50%, 95% { opacity: 0; }
  100% { opacity: 1; }
`;

const Caret = styled.span`
  display: inline-block;
  width: 3px;
  margin-left: 4px;
  align-self: stretch;
  background: var(--accent);
  animation: ${blink} 1s steps(1) infinite;
  /* Sit on the text baseline nicely */
  height: 1em;
  vertical-align: -0.08em;
`;

/* Not-yet-typed characters: reserve their space so the heading keeps its full
   width/height from the start (no layout shift, and the box stays observable). */
const Pending = styled.span`
  visibility: hidden;
`;

/* Full text for assistive tech; the animated glyphs are hidden from them. */
const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

type Props = {
  text: string;
  /** Milliseconds per character. */
  speed?: number;
};

/**
 * Types `text` out one character at a time shortly after mount. Screen readers
 * get the full text immediately; users who prefer reduced motion see the final
 * text with no animation.
 */
export default function TypeText({ text, speed = 55 }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  // Start typing shortly after mount. We deliberately do NOT gate this on
  // scroll-into-view: some embedded/preview panes never fire IntersectionObserver,
  // which would leave headings blank. Triggering on mount guarantees the text
  // always appears. A safety timer also force-reveals the full text in case the
  // typing interval can't run for any reason.
  useEffect(() => {
    if (reduce) return;
    const startTimer = window.setTimeout(() => setStarted(true), 120);
    const safety = window.setTimeout(() => {
      setShown((s) => (s.length < text.length ? text : s));
      setDone(true);
    }, 120 + text.length * speed + 600);
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(safety);
    };
  }, [reduce, text, speed]);

  // Run the per-character reveal.
  useEffect(() => {
    if (!started || reduce) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [started, text, speed, reduce]);

  if (reduce) {
    return <span>{text}</span>;
  }

  const pending = text.slice(shown.length);

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {shown}
        {started && !done && <Caret />}
        {pending && <Pending>{pending}</Pending>}
      </span>
      <SrOnly>{text}</SrOnly>
    </span>
  );
}
