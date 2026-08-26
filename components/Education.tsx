"use client";

import styled from "styled-components";
import { Container, Section, SectionTitle } from "./primitives";
import Reveal from "./Reveal";
import TypeText from "./TypeText";
import { education, certifications } from "@/data/portfolio";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

const ColTitle = styled.h3`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-subtle);
  margin-bottom: 20px;
`;

const EduItem = styled.div`
  border-left: 2px solid var(--border);
  padding: 0 0 24px 20px;
  position: relative;

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: "";
    position: absolute;
    left: -7px;
    top: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent);
  }

  h4 {
    font-size: 1.02rem;
  }
  p {
    color: var(--text-muted);
    font-size: 0.92rem;
    margin-top: 4px;
  }
  span {
    color: var(--text-subtle);
    font-size: 0.85rem;
  }
`;

const CertList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CertItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 16px;

  h4 {
    font-size: 0.95rem;
    font-weight: 600;
  }
  p {
    color: var(--text-subtle);
    font-size: 0.83rem;
    margin-top: 2px;
  }
  a {
    flex-shrink: 0;
    font-size: 0.82rem;
    font-weight: 600;
    white-space: nowrap;
  }
`;

export default function Education() {
  return (
    <Section id="education">
      <Container>
        <Reveal>
          <SectionTitle>
            <TypeText text="Education & Certifications" />
          </SectionTitle>
        </Reveal>
        <Grid>
          <Reveal as="div">
            <ColTitle>Education</ColTitle>
            {education.map((edu) => (
              <EduItem key={edu.school}>
                <h4>{edu.school}</h4>
                <p>
                  {edu.degree} — {edu.field}
                </p>
                <span>{edu.period}</span>
              </EduItem>
            ))}
          </Reveal>

          <Reveal as="div" delay={0.08}>
            <ColTitle>Certifications</ColTitle>
            <CertList>
              {certifications.map((cert) => (
                <CertItem key={cert.title}>
                  <div>
                    <h4>{cert.title}</h4>
                    <p>
                      {cert.issuer} · {cert.date}
                    </p>
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${cert.title} certificate (opens in new tab)`}
                    >
                      View ↗
                    </a>
                  )}
                </CertItem>
              ))}
            </CertList>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
