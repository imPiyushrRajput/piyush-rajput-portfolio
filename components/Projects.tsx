"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container, Section, SectionIntro, Chip } from "./primitives";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import TechIcon from "./TechIcon";
import Emphasize from "./Emphasize";
import CompanyLogo, { companyFromOrg } from "./CompanyLogo";
import { projects, type Project } from "@/data/portfolio";

const Toggle = styled.div`
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--border);
  border-radius: 3px;
  background: var(--bg-elevated);
  margin-bottom: 32px;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  padding: 9px 18px;
  border-radius: 2px;
  background: transparent;
  font-family: var(--font-mono), ui-monospace, monospace;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.74rem;
  font-weight: 500;
  color: ${(p) => (p.$active ? "var(--accent-contrast)" : "var(--text-muted)")};
  transition: color 0.25s ease;

  &:hover {
    color: ${(p) => (p.$active ? "var(--accent-contrast)" : "var(--text)")};
  }
`;

/* Shared-layout highlight that slides to the active filter. */
const ActivePill = styled(motion.span)`
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 2px;
  background: var(--accent);
`;

const Count = styled.span`
  font-size: 0.7rem;
  opacity: 0.65;
`;

/* Stable, full-width wrapper that is measured for the column count. It never
   remounts on filter change, so the ResizeObserver keeps working. */
const MasonryViewport = styled.div`
  width: 100%;
`;

/* Masonry: fixed-width columns filled round-robin, so cards read left-to-right
   (row-major) while keeping their natural heights — no equal-row whitespace. */
const Masonry = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const MasonryCol = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProjectCard = styled(motion.li)`
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 22px;
  transition: border-color 0.18s ease;

  &:hover {
    border-color: var(--text);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
`;

const Name = styled.h3`
  font-size: 1.12rem;
`;

const Link = styled.a`
  flex-shrink: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-strong);
  white-space: nowrap;
`;

const Org = styled.p`
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
  color: var(--accent-strong);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 2px;
`;

const Period = styled.p`
  color: var(--text-subtle);
  font-size: 0.82rem;
  margin-bottom: 12px;
`;

const Desc = styled.p`
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 16px;
  flex: 1;
`;

const Tech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

type Filter = "featured" | "personal" | "all";

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("featured");
  const reduce = useReducedMotion();

  const featuredList = projects.filter((p) => p.featured);
  const personalList = projects.filter((p) => p.personal);
  const visible =
    filter === "all"
      ? projects
      : filter === "personal"
      ? personalList
      : featuredList;

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "featured", label: "Featured", count: featuredList.length },
    { key: "personal", label: "Personal", count: personalList.length },
    { key: "all", label: "All", count: projects.length },
  ];

  // Responsive column count for the masonry.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const compute = () => {
      const colW = 320;
      const gap = 20;
      setCols(Math.max(1, Math.floor((el.clientWidth + gap) / (colW + gap))));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Distribute round-robin so cards read left-to-right, top-to-bottom.
  const columns: { project: Project; index: number }[][] = Array.from(
    { length: cols },
    () => []
  );
  visible.forEach((project, index) => {
    columns[index % cols].push({ project, index });
  });

  return (
    <Section id="projects">
      <Container>
        <SectionHeader num="03" title="Projects" />
        <Reveal>
          <SectionIntro>
            A selection of the {projects.length} products I've shipped — from
            RAG-powered enterprise tools to civic apps used by thousands during
            the pandemic.
          </SectionIntro>
        </Reveal>

        <Toggle role="group" aria-label="Filter projects">
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <ToggleButton
                key={f.key}
                $active={active}
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                data-sfx="slide"
                data-sfx-hover="off"
              >
                {active && (
                  <ActivePill
                    layoutId="projectFilterPill"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                  />
                )}
                <span>{f.label}</span>
                <Count>{f.count}</Count>
              </ToggleButton>
            );
          })}
        </Toggle>

        <MasonryViewport ref={wrapRef}>
          <AnimatePresence mode="wait">
            <Masonry
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
          {columns.map((col, ci) => (
            <MasonryCol key={ci}>
              {col.map(({ project, index }) => (
                <ProjectCard
                  key={`${filter}-${project.name}`}
                  initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                    delay: reduce ? 0 : Math.min(index * 0.04, 0.35),
                  }}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          y: -5,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 24,
                          },
                        }
                  }
                >
                  <CardTop>
                    <Name>{project.name}</Name>
                    {project.link && (
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.name} (opens in new tab)`}
                      >
                        Visit ↗
                      </Link>
                    )}
                  </CardTop>
                  {project.org &&
                    (() => {
                      const company = companyFromOrg(project.org);
                      if (!company) return <Org>{project.org}</Org>;
                      const rest = project
                        .org!.replace(
                          /publicis sapient|ibase-?t|scalereal technologies/i,
                          ""
                        )
                        .replace(/^[\s·—-]+/, "")
                        .trim();
                      return (
                        <Org>
                          <CompanyLogo company={company} inline />
                          {rest && <span>· {rest}</span>}
                        </Org>
                      );
                    })()}
                  <Period>{project.period}</Period>
                  <Desc>
                    <Emphasize text={project.description} />
                  </Desc>
                  <Tech>
                    {project.tech.map((t) => (
                      <Chip key={t}>
                        <TechIcon name={t} />
                        {t}
                      </Chip>
                    ))}
                  </Tech>
                </ProjectCard>
              ))}
            </MasonryCol>
          ))}
            </Masonry>
          </AnimatePresence>
        </MasonryViewport>
      </Container>
    </Section>
  );
}
