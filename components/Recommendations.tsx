"use client";

import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Section, SectionTitle, SectionIntro } from "./primitives";
import Reveal from "./Reveal";
import TypeText from "./TypeText";
import { recommendations } from "@/data/portfolio";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <Section id="recommendations">
      <Container>
        <Reveal>
          <SectionTitle>
            <TypeText text="Recommendations" />
          </SectionTitle>
          <SectionIntro>
            What colleagues and teammates have said about working with me.
          </SectionIntro>
        </Reveal>

        <Grid
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {recommendations.map((rec) => (
            <Quote key={rec.name} variants={item}>
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
        </Grid>
      </Container>
    </Section>
  );
}
