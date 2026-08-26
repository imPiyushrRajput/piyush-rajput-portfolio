"use client";

import styled from "styled-components";
import { Container, Section, SectionTitle } from "./primitives";
import Reveal from "./Reveal";
import TypeText from "./TypeText";
import { profile, languages } from "@/data/portfolio";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const Prose = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;

  p {
    color: var(--text-muted);
    font-size: 1.05rem;
  }
`;

const Aside = styled.aside`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
  margin-top: 24px;
`;

const AsideTitle = styled.h3`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-subtle);
  margin-bottom: 16px;
`;

const InfoList = styled.dl`
  display: grid;
  gap: 14px;
  margin: 0;

  div {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-size: 0.95rem;
  }
  dt {
    color: var(--text-subtle);
  }
  dd {
    margin: 0;
    color: var(--text);
    font-weight: 500;
    text-align: right;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border);
  margin: 20px 0;
`;

export default function About() {
  return (
    <Section id="about">
      <Container>
        <Reveal>
          <SectionTitle>
            <TypeText text="About" />
          </SectionTitle>
        </Reveal>
        <Grid>
          <Prose as={Reveal}>
            {profile.summary.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Prose>

          <Reveal delay={0.08}>
          <Aside>
            <AsideTitle>Quick facts</AsideTitle>
            <InfoList>
              <div>
                <dt>Location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>{profile.yearsExperience} years</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Frontend + AI Eng.</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>Open to work</dd>
              </div>
            </InfoList>

            <Divider />

            <AsideTitle>Languages</AsideTitle>
            <InfoList>
              {languages.map((lang) => (
                <div key={lang.name}>
                  <dt>{lang.name}</dt>
                  <dd>{lang.level}</dd>
                </div>
              ))}
            </InfoList>
          </Aside>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
