"use client";

import { useRef, useState } from "react";
import styled from "styled-components";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { FiDownload, FiMail, FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { Container, MonoLabel } from "./primitives";
import { profile, stats } from "@/data/portfolio";

const Wrap = styled.section`
  position: relative;
  padding: 72px 0 64px;
  overflow: hidden;

  @media (max-width: 600px) {
    padding: 44px 0 40px;
  }
`;

/* Subtle base grid — drifts on scroll. */
const GridBase = styled(motion.div)`
  position: absolute;
  inset: -40px 0;
  background-image: linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 85% 65% at 50% 0%, #000 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(
    ellipse 85% 65% at 50% 0%,
    #000 40%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 0;
`;

/* Brighter grid revealed only in a circle that follows the cursor. */
const GridGlow = styled(motion.div)`
  position: absolute;
  inset: -40px 0;
  background-image: linear-gradient(var(--grid-glow) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-glow) 1px, transparent 1px);
  background-size: 44px 44px;
  pointer-events: none;
  z-index: 0;
  -webkit-mask-image: radial-gradient(
    circle 240px at var(--mx) var(--my),
    #000 0%,
    transparent 72%
  );
  mask-image: radial-gradient(
    circle 240px at var(--mx) var(--my),
    #000 0%,
    transparent 72%
  );
`;

const Inner = styled(Container)`
  position: relative;
  z-index: 1;
`;

/* Top editorial meta line: role on the left, live status on the right. */
const MetaRow = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
`;

const Status = styled(MonoLabel)`
  color: var(--live);
`;

const Pulse = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--live);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--live);
    animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @keyframes ping {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    75%,
    100% {
      transform: scale(2.8);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

/* Giant typographic wordmark. */
const Wordmark = styled.h1`
  margin: 32px 0 0;
  font-size: clamp(3.1rem, 15vw, 11rem);
  font-weight: 600;
  line-height: 0.82;
  letter-spacing: -0.045em;
  text-transform: uppercase;

  @media (max-width: 600px) {
    margin-top: 28px;
  }
`;

/* Each wordmark line clips an inner span that slides up on reveal. */
const Line = styled.span`
  display: block;
  overflow: hidden;
  /* Headroom so ascenders aren't clipped by the reveal mask at tight leading. */
  padding: 0.14em 0 0.08em;
`;

const LineInner = styled(motion.span)`
  display: block;
`;

const Dot = styled.span`
  color: var(--text-subtle);
`;

/* Lead statement + contextual annotations beneath the wordmark. */
const LeadRow = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 40px;
  align-items: end;
  margin-top: 44px;
  padding-top: 32px;
  border-top: 1px solid var(--border);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const Lead = styled(motion.p)`
  font-size: clamp(1.15rem, 2.4vw, 1.5rem);
  line-height: 1.4;
  color: var(--text-muted);
  max-width: 34ch;

  strong {
    color: var(--text);
    font-weight: 600;
  }
`;

const Annotations = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-self: end;
  text-align: right;

  @media (max-width: 820px) {
    justify-self: start;
    text-align: left;
  }
`;

const Annotation = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
  font-size: 0.92rem;
  color: var(--text-muted);

  svg {
    flex-shrink: 0;
    opacity: 0.7;
  }

  strong {
    color: var(--text);
    font-weight: 600;
  }

  @media (max-width: 820px) {
    justify-content: flex-start;
  }
`;

/* Actions: one solid CTA + a row of underline-sweep text links. */
const Actions = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px 24px;
  margin-top: 40px;
`;

const Primary = styled(motion.a)`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 26px;
  border: 1px solid var(--accent);
  border-radius: 2px;
  background: transparent;
  color: var(--text);
  font-family: var(--font-mono), ui-monospace, monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.82rem;
  font-weight: 500;
  overflow: hidden;
  isolation: isolate;

  /* Accent fill sweeps in from the left on hover. */
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
    text-decoration: none;
  }
  &:hover::before {
    transform: translateX(0);
  }

  svg {
    transition: transform 0.3s ease;
  }
  &:hover svg {
    transform: translateY(4px);
  }
`;

/* Text link with a left-to-right underline sweep on hover/focus. */
const SweepLink = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
  font-weight: 500;
  font-size: 0.95rem;
  padding: 4px 0;

  svg {
    flex-shrink: 0;
    opacity: 0.8;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.5px;
    background: var(--text);
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover,
  &:focus-visible {
    text-decoration: none;
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
  }
`;

/* ---- Stats ---- */
const Stats = styled.dl`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 64px 0 0;
  border-top: 1px solid var(--border);
  padding-top: 32px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px 16px;
    margin-top: 48px;
  }
`;

const Stat = styled(motion.div)`
  dt {
    font-family: var(--font-display), system-ui, sans-serif;
    font-size: clamp(1.7rem, 4vw, 2.3rem);
    font-weight: 600;
    color: var(--text);
    letter-spacing: -0.03em;
    line-height: 1;
  }
  dd {
    margin: 10px 0 0;
    color: var(--text-subtle);
    font-family: var(--font-mono), ui-monospace, monospace;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.68rem;
  }
`;

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const lineReveal = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: EASE },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const [glowOn, setGlowOn] = useState(false);
  const wrapRef = useRef<HTMLElement>(null);

  // Scroll: the grid drifts downward and fades as the hero leaves the viewport.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const gridYRaw = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const gridY = useSpring(gridYRaw, { stiffness: 120, damping: 30 });
  const gridOpacityRaw = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const gridOpacity = reduce ? 1 : gridOpacityRaw;

  // Hover: a "spotlight" of brighter grid lines follows the cursor.
  const mxVal = useMotionValue(-500);
  const myVal = useMotionValue(-500);
  const mx = useTransform(mxVal, (v) => `${v}px`);
  // +40 compensates for the layer's `inset: -40px 0` top offset.
  const my = useTransform(myVal, (v) => `${v + 40}px`);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    mxVal.set(e.clientX - rect.left);
    myVal.set(e.clientY - rect.top);
    if (!glowOn) setGlowOn(true);
  };

  // Reveal the wordmark instantly for reduced-motion users.
  const lineVariants = reduce ? undefined : lineReveal;
  const lineInitial = reduce ? false : "hidden";

  return (
    <Wrap
      id="top"
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setGlowOn(false)}
    >
      <GridBase style={{ y: reduce ? 0 : gridY, opacity: gridOpacity }} aria-hidden="true" />
      <GridGlow
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: glowOn ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={
          {
            "--mx": mx,
            "--my": my,
            y: reduce ? 0 : gridY,
          } as unknown as React.CSSProperties
        }
      />

      <Inner as="div">
        <MetaRow variants={fadeUp} initial="hidden" animate="visible">
          <MonoLabel>{profile.role}</MonoLabel>
          {profile.openToWork ? (
            <Status>
              <Pulse aria-hidden="true" />
              Open to work
            </Status>
          ) : (
            <MonoLabel>Building since 2019</MonoLabel>
          )}
        </MetaRow>

        <Wordmark aria-label={profile.name}>
          <Line aria-hidden="true">
            <LineInner variants={lineVariants} initial={lineInitial} animate="visible">
              Piyush
            </LineInner>
          </Line>
          <Line aria-hidden="true">
            <LineInner
              variants={lineVariants}
              initial={lineInitial}
              animate="visible"
              transition={reduce ? undefined : { delay: 0.12 }}
            >
              Rajput<Dot>.</Dot>
            </LineInner>
          </Line>
        </Wordmark>

        <LeadRow>
          <Lead variants={fadeUp} initial="hidden" animate="visible">
            I build <strong>fast, accessible React apps</strong> for banks,
            fintechs, and AI products — and keep them maintainable long after
            launch.
          </Lead>
          <Annotations
            as={motion.div}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <Annotation>
                <FiArrowUpRight size={15} aria-hidden />
                <strong>6 years</strong>&nbsp;in enterprise React
              </Annotation>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Annotation>
                <FiArrowUpRight size={15} aria-hidden />
                <strong>14,000+</strong>&nbsp;users reached
              </Annotation>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Annotation>
                <FiArrowUpRight size={15} aria-hidden />
                {profile.location.split(",")[0]}, India
              </Annotation>
            </motion.div>
          </Annotations>
        </LeadRow>

        <Actions variants={container} initial="hidden" animate="visible">
          <Primary
            as={motion.a}
            href="#projects"
            variants={fadeUp}
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            See what I&apos;ve built
            <FiArrowDown aria-hidden size={16} />
          </Primary>

          <motion.div variants={fadeUp}>
            <SweepLink
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <FiDownload aria-hidden size={15} />
              Résumé
            </SweepLink>
          </motion.div>
          <motion.div variants={fadeUp}>
            <SweepLink href={`mailto:${profile.email}`}>
              <FiMail aria-hidden size={15} />
              Email
            </SweepLink>
          </motion.div>
          <motion.div variants={fadeUp}>
            <SweepLink
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn aria-hidden size={14} />
              LinkedIn
            </SweepLink>
          </motion.div>
          <motion.div variants={fadeUp}>
            <SweepLink
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub aria-hidden size={15} />
              GitHub
            </SweepLink>
          </motion.div>
        </Actions>

        <Stats
          as={motion.dl}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {stats.map((s) => (
            <Stat key={s.label} variants={fadeUp}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </Stat>
          ))}
        </Stats>
      </Inner>
    </Wrap>
  );
}
