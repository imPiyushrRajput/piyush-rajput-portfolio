"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Container, Section } from "./primitives";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import Emphasize from "./Emphasize";
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
  gap: 20px;
  margin-top: 4px;

  p {
    color: var(--text-muted);
    font-size: 1.0625rem; /* ~17px — comfortable reading size */
    line-height: 1.8;
    letter-spacing: -0.003em;
  }

  /* Opening paragraph reads as an editorial lead. */
  p:first-child {
    color: var(--text);
    font-size: clamp(1.25rem, 2.2vw, 1.5rem);
    line-height: 1.5;
    letter-spacing: -0.012em;
  }

  @media (max-width: 600px) {
    p {
      font-size: 1.02rem;
      line-height: 1.75;
    }
    p:first-child {
      font-size: 1.22rem;
    }
  }
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
`;

/* Editorial monochrome portrait with corner annotations. */
const Figure = styled.figure`
  position: relative;
  margin: 0;
  aspect-ratio: 4 / 5;
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  background: var(--bg-elevated);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.03);
  }

  figcaption {
    position: absolute;
    left: 14px;
    bottom: 12px;
    font-family: var(--font-mono), ui-monospace, monospace;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.62rem;
    color: #fafafa;
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.7);
    z-index: 2;
  }
`;

const Monogram = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-family: var(--font-display), system-ui, sans-serif;
  font-size: 4rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: var(--text);
  background: repeating-linear-gradient(
    -45deg,
    var(--chip-bg),
    var(--chip-bg) 10px,
    var(--bg-elevated) 10px,
    var(--bg-elevated) 20px
  );
`;

const Aside = styled.aside`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
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
  const [imgError, setImgError] = useState(false);
  const photoRef = useRef<HTMLImageElement>(null);
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  // Catch a photo that 404'd before hydration (onError wouldn't re-fire).
  useEffect(() => {
    const el = photoRef.current;
    if (el && el.complete && el.naturalWidth === 0) setImgError(true);
  }, []);

  return (
    <Section id="about">
      <Container>
        <SectionHeader num="01" title="About" />
        <Grid>
          <Prose as={Reveal}>
            {profile.summary.map((para, i) => (
              <p key={i}>
                <Emphasize text={para} />
              </p>
            ))}
          </Prose>

          <Reveal delay={0.08}>
          <RightCol>
          <Figure>
            {!imgError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={photoRef}
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                onError={() => setImgError(true)}
                loading="lazy"
              />
            ) : (
              <Monogram aria-label={profile.name}>{initials}</Monogram>
            )}
            <figcaption>{profile.location.split(",")[0]}, India</figcaption>
          </Figure>
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
                <dd>Full-stack + AI</dd>
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
          </RightCol>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
