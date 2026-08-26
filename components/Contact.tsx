"use client";

import styled from "styled-components";
import { Container, Section } from "./primitives";
import Reveal from "./Reveal";
import TypeText from "./TypeText";
import { profile } from "@/data/portfolio";

const Panel = styled.div`
  text-align: center;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 56px 28px;

  @media (max-width: 600px) {
    padding: 40px 20px;
  }
`;

const Heading = styled.h2`
  font-size: clamp(1.7rem, 4.5vw, 2.4rem);
  margin-bottom: 14px;
`;

const Sub = styled.p`
  color: var(--text-muted);
  max-width: 52ch;
  margin: 0 auto 30px;
  font-size: 1.05rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
`;

const Primary = styled.a`
  background: var(--accent);
  color: var(--accent-contrast);
  font-weight: 600;
  padding: 13px 26px;
  border-radius: 10px;
  border: 1px solid var(--accent);

  &:hover {
    background: var(--accent-strong);
    text-decoration: none;
  }
`;

const Secondary = styled.a`
  color: var(--text);
  font-weight: 600;
  padding: 13px 26px;
  border-radius: 10px;
  border: 1px solid var(--border);

  &:hover {
    border-color: var(--accent);
    text-decoration: none;
  }
`;

export default function Contact() {
  return (
    <Section id="contact">
      <Container>
        <Reveal>
        <Panel>
          <Heading>
            <TypeText text="Let's build something great" />
          </Heading>
          <Sub>
            I'm open to Senior Frontend / Full-Stack roles where I can own
            meaningful product surfaces and keep growing. If that sounds like a
            fit, I'd love to hear from you.
          </Sub>
          <Row>
            <Primary href={`mailto:${profile.email}`}>Email me</Primary>
            <Secondary
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Download résumé ↓
            </Secondary>
            <Secondary
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn ↗
            </Secondary>
          </Row>
        </Panel>
        </Reveal>
      </Container>
    </Section>
  );
}
