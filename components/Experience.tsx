"use client";

import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Section, SectionTitle, SectionIntro, Chip } from "./primitives";
import Reveal from "./Reveal";
import TypeText from "./TypeText";
import { experiences } from "@/data/portfolio";

const Timeline = styled.ol`
  list-style: none;
  position: relative;
  padding-left: 28px;

  &::before {
    content: "";
    position: absolute;
    left: 7px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background: var(--border);
  }

  @media (max-width: 600px) {
    padding-left: 30px;
  }
`;

const Item = styled(motion.li)`
  position: relative;
  padding-bottom: 40px;

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: "";
    position: absolute;
    left: -28px;
    top: 6px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--bg);
    border: 3px solid var(--accent);

    @media (max-width: 600px) {
      left: -30px;
    }
  }
`;

const Head = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 16px;
`;

const RoleName = styled.h3`
  font-size: 1.2rem;
`;

const Company = styled.p`
  color: var(--accent-strong);
  font-weight: 600;
  margin: 2px 0 2px;
`;

const Period = styled.span`
  color: var(--text-subtle);
  font-size: 0.88rem;
  white-space: nowrap;
`;

const Meta = styled.p`
  color: var(--text-subtle);
  font-size: 0.85rem;
  margin-bottom: 14px;
`;

const Points = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;

  li {
    position: relative;
    padding-left: 20px;
    color: var(--text-muted);
    font-size: 0.98rem;

    &::before {
      content: "▹";
      position: absolute;
      left: 0;
      color: var(--accent);
    }
  }
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export default function Experience() {
  const reduce = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <Section id="experience">
      <Container>
        <Reveal>
          <SectionTitle>
            <TypeText text="Experience" />
          </SectionTitle>
          <SectionIntro>
            5+ years building large-scale frontend applications for enterprise
            clients across banking, healthtech, and manufacturing.
          </SectionIntro>
        </Reveal>

        <Timeline
          as={motion.ol}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {experiences.map((exp) => (
            <Item key={`${exp.company}-${exp.role}`} variants={item}>
              <Head>
                <div>
                  <RoleName>{exp.role}</RoleName>
                  <Company>{exp.company}</Company>
                </div>
                <Period>{exp.period}</Period>
              </Head>
              <Meta>{exp.meta}</Meta>
              <Points>
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </Points>
              <Skills>
                {exp.skills.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </Skills>
            </Item>
          ))}
        </Timeline>
      </Container>
    </Section>
  );
}
