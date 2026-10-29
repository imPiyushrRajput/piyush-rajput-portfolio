"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Section, SectionIntro } from "./primitives";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { recommendations, type Recommendation } from "@/data/portfolio";

/* Stable, full-width wrapper measured for the column count. */
const MasonryViewport = styled.div`
  width: 100%;
`;

/* Masonry: fixed-width columns filled round-robin, so cards read
   left-to-right while keeping their natural heights. */
const Masonry = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const MasonryCol = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Quote = styled(motion.figure)`
  margin: 0;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.18s ease;

  &:hover {
    border-color: var(--text);
  }

  &::before {
    content: "\\201C";
    font-size: 2.6rem;
    line-height: 0.6;
    color: var(--accent);
    font-family: Georgia, serif;
    margin-bottom: 8px;
  }
`;

const Text = styled.blockquote`
  margin: 0 0 18px;
  color: var(--text);
  font-size: 0.98rem;
  flex: 1;
`;

const Cite = styled.figcaption`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.span`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.95rem;
  background: var(--accent);
  color: var(--accent-contrast);
`;

const Person = styled.div`
  strong {
    display: block;
    font-size: 0.95rem;
    color: var(--text);
  }
  span {
    color: var(--text-subtle);
    font-size: 0.82rem;
  }
`;

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

export default function Recommendations() {
  const reduce = useReducedMotion();

  // Responsive column count for the masonry.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const compute = () => {
      const colW = 340;
      const gap = 20;
      setCols(Math.max(1, Math.floor((el.clientWidth + gap) / (colW + gap))));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Newest first — parse "Mon YYYY" robustly by prepending a day.
  const toTime = (d: string) => {
    const t = Date.parse(`1 ${d}`);
    return Number.isNaN(t) ? 0 : t;
  };
  const sorted = [...recommendations].sort(
    (a, b) => toTime(b.date) - toTime(a.date)
  );

  // Distribute round-robin so cards read left-to-right, top-to-bottom.
  const columns: { rec: Recommendation; index: number }[][] = Array.from(
    { length: cols },
    () => []
  );
  sorted.forEach((rec, index) => {
    columns[index % cols].push({ rec, index });
  });

  return (
    <Section id="recommendations">
      <Container>
        <SectionHeader num="06" title="Recommendations" />
        <Reveal>
          <SectionIntro>
            What colleagues and teammates have said about working with me.
          </SectionIntro>
        </Reveal>

        <MasonryViewport ref={wrapRef}>
          <Masonry>
            {columns.map((col, ci) => (
              <MasonryCol key={ci}>
                {col.map(({ rec, index }) => (
                  <Quote
                    key={rec.name}
                    initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                      delay: reduce ? 0 : Math.min(index * 0.06, 0.4),
                    }}
                  >
                    <Text>{rec.quote}</Text>
                    <Cite>
                      <Avatar aria-hidden="true">{initials(rec.name)}</Avatar>
                      <Person>
                        <strong>{rec.name}</strong>
                        <span>
                          {rec.title} · {rec.date}
                        </span>
                      </Person>
                    </Cite>
                  </Quote>
                ))}
              </MasonryCol>
            ))}
          </Masonry>
        </MasonryViewport>
      </Container>
    </Section>
  );
}
