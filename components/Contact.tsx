"use client";

import styled from "styled-components";
import { FaLinkedinIn } from "react-icons/fa6";
import { FiMail, FiDownload } from "react-icons/fi";
import { Container, Section, MonoLabel } from "./primitives";
import Reveal from "./Reveal";
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
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 28px;
  border-radius: 2px;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: var(--accent-contrast);
  font-family: var(--font-mono), ui-monospace, monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.8rem;
  font-weight: 500;
  transition: background 0.35s ease, color 0.35s ease;

  &:hover {
    background: transparent;
    color: var(--text);
    text-decoration: none;
  }

  svg {
    transition: transform 0.3s ease;
  }
  &:hover svg {
    transform: translateX(3px);
  }
`;

const Secondary = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 28px;
  border-radius: 2px;
  border: 1px solid var(--border);
  color: var(--text);
  background: transparent;
  font-family: var(--font-mono), ui-monospace, monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.8rem;
  font-weight: 500;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--accent);
    transform: translateX(-101%);
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: var(--accent-contrast);
    border-color: var(--accent);
    text-decoration: none;
  }
  &:hover::before {
    transform: translateX(0);
  }

  svg {
    transition: transform 0.3s ease;
  }
  &:hover svg {
    transform: translateY(3px);
  }
`;

export default function Contact() {
  return (
    <Section id="contact">
      <Container>
        <Reveal>
        <Panel>
          <MonoLabel style={{ justifyContent: "center", marginBottom: 18 }}>
            07 — Contact
          </MonoLabel>
          <Heading>Let&apos;s build something great</Heading>
          <Sub>
            I'm open to Senior Frontend / Full-Stack roles where I can own
            meaningful product surfaces and keep growing. If that sounds like a
            fit, I'd love to hear from you.
          </Sub>
          <Row>
            <Primary data-sfx="sweep" href={`mailto:${profile.email}`}>
              <FiMail aria-hidden size={16} />
              Email me
            </Primary>
            <Secondary
              data-sfx="sweep"
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <FiDownload aria-hidden size={16} />
              Download résumé
            </Secondary>
            <Secondary
              data-sfx="sweep"
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn aria-hidden size={16} />
              Connect on LinkedIn
            </Secondary>
          </Row>
        </Panel>
        </Reveal>
      </Container>
    </Section>
  );
}
