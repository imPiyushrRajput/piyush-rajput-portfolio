"use client";

import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Section, SectionTitle, SectionIntro } from "./primitives";
import Reveal from "./Reveal";
import TypeText from "./TypeText";
import { skillGroups } from "@/data/portfolio";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
    background: var(--chip-bg);
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

export default function Skills() {
  const reduce = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <Section id="skills">
      <Container>
        <Reveal>
          <SectionTitle>
            <TypeText text="Skills" />
          </SectionTitle>
          <SectionIntro>
            The tools and practices I reach for — with an emphasis on testing,
            reusable architecture, and, increasingly, AI integration.
          </SectionIntro>
        </Reveal>

        <Grid
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {skillGroups.map((group) => (
            <Group key={group.title} variants={item}>
              <GroupTitle>{group.title}</GroupTitle>
              <List>
                {group.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </List>
            </Group>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
