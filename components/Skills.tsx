"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Section, SectionIntro } from "./primitives";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import TechIcon from "./TechIcon";
import { skillGroups } from "@/data/portfolio";

/* Stable, full-width wrapper measured for the column count. */
const MasonryViewport = styled.div`
  width: 100%;
`;

/* Masonry: fixed-width columns filled round-robin, so groups read
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

const Group = styled(motion.div)`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 22px;
  transition: border-color 0.18s ease;

  &:hover {
    border-color: var(--text);
  }
`;

const GroupTitle = styled.h3`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-strong);
  margin-bottom: 16px;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  li {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--chip-bg);
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  li svg {
    flex-shrink: 0;
    opacity: 0.85;
  }
`;

export default function Skills() {
  const reduce = useReducedMotion();

  // Responsive column count for the masonry.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const compute = () => {
      const colW = 300;
      const gap = 20;
      setCols(Math.max(1, Math.floor((el.clientWidth + gap) / (colW + gap))));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Distribute round-robin so groups read left-to-right, top-to-bottom.
  const columns: { group: (typeof skillGroups)[number]; index: number }[][] =
    Array.from({ length: cols }, () => []);
  skillGroups.forEach((group, index) => {
    columns[index % cols].push({ group, index });
  });

  return (
    <Section id="skills">
      <Container>
        <SectionHeader num="04" title="Skills" />
        <Reveal>
          <SectionIntro>
            The tools and practices I reach for — with an emphasis on testing,
            reusable architecture, and, increasingly, AI integration.
          </SectionIntro>
        </Reveal>

        <MasonryViewport ref={wrapRef}>
          <Masonry>
            {columns.map((col, ci) => (
              <MasonryCol key={ci}>
                {col.map(({ group, index }) => (
                  <Group
                    key={group.title}
                    initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                      delay: reduce ? 0 : Math.min(index * 0.05, 0.4),
                    }}
                  >
                    <GroupTitle>{group.title}</GroupTitle>
                    <List>
                      {group.items.map((skill) => (
                        <li key={skill}>
                          <TechIcon name={skill} size={15} />
                          {skill}
                        </li>
                      ))}
                    </List>
                  </Group>
                ))}
              </MasonryCol>
            ))}
          </Masonry>
        </MasonryViewport>
      </Container>
    </Section>
  );
}
