"use client";

import { useState } from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Section, SectionTitle, SectionIntro, Chip } from "./primitives";
import Reveal from "./Reveal";
import TypeText from "./TypeText";
import { projects } from "@/data/portfolio";

const Toggle = styled.div`
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-elevated);
  margin-bottom: 28px;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 7px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${(p) => (p.$active ? "var(--accent)" : "transparent")};
  color: ${(p) => (p.$active ? "var(--accent-contrast)" : "var(--text-muted)")};

  &:hover {
    color: ${(p) => (p.$active ? "var(--accent-contrast)" : "var(--text)")};
  }
`;

const Count = styled.span`
  display: inline-block;
  min-width: 1.4em;
  padding: 0 0.35em;
  margin-left: 2px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.5;
  background: color-mix(in srgb, currentColor 16%, transparent);
`;

const Grid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
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

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <Section id="projects">
      <Container>
        <Reveal>
          <SectionTitle>
            <TypeText text="Projects" />
          </SectionTitle>
          <SectionIntro>
            A selection of the {projects.length} products I've shipped — from
            RAG-powered enterprise tools to civic apps used by thousands during
            the pandemic.
          </SectionIntro>
        </Reveal>

        <Toggle role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <ToggleButton
              key={f.key}
              $active={filter === f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
            >
              {f.label} <Count>{f.count}</Count>
            </ToggleButton>
          ))}
        </Toggle>

        <Grid
          as={motion.ul}
          key={filter}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {visible.map((project) => (
            <ProjectCard
              key={project.name}
              variants={item}
              whileHover={reduce ? undefined : { y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
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
              {project.org && <Org>{project.org}</Org>}
              <Period>{project.period}</Period>
              <Desc>{project.description}</Desc>
              <Tech>
                {project.tech.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </Tech>
            </ProjectCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
