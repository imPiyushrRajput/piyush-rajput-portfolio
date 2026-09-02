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
import { Container } from "./primitives";
import { profile, stats } from "@/data/portfolio";

const Wrap = styled.section`
  position: relative;
  padding: 96px 0 72px;
  overflow: hidden;

  @media (max-width: 600px) {
    padding: 56px 0 44px;
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
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Left = styled.div``;

const Badge = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: var(--chip-bg);
  border: 1px solid var(--border);
  color: var(--text-muted);
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 22px;
`;

const Pulse = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--text);
    animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @keyframes ping {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    75%,
    100% {
      transform: scale(2.6);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

const Title = styled.h1`
  font-size: clamp(2.2rem, 6vw, 3.6rem);
  margin-bottom: 16px;
`;

const Accent = styled.span`
  position: relative;
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.08em;
    height: 0.12em;
    background: var(--text);
    opacity: 0.85;
  }
`;

const Role = styled.p`
  font-size: clamp(1.05rem, 2.4vw, 1.35rem);
  color: var(--text);
  font-weight: 600;
  margin-bottom: 14px;
`;

const Tagline = styled.p`
  font-size: 1.08rem;
  color: var(--text-muted);
  max-width: 54ch;
  margin-bottom: 32px;
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

const Primary = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent);
  color: var(--accent-contrast);
  font-weight: 600;
  padding: 13px 22px;
  border-radius: 10px;
  border: 1px solid var(--accent);

  &:hover {
    text-decoration: none;
    opacity: 0.9;
  }
`;

const Secondary = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--text);
  font-weight: 600;
  padding: 13px 22px;
  border-radius: 10px;
  border: 1px solid var(--border);

  &:hover {
    border-color: var(--text);
    text-decoration: none;
  }
`;

/* ---- Portrait ---- */
const PortraitWrap = styled.div`
  justify-self: center;
  position: relative;
  width: min(320px, 78vw);
  aspect-ratio: 1;
`;

const Ring = styled(motion.div)`
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  border: 1px dashed var(--border);
`;

const Portrait = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  box-shadow: var(--shadow);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.02);
  }
`;

const Monogram = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-size: 4.5rem;
  font-weight: 800;
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

/* ---- Stats ---- */
const Stats = styled.dl`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 56px 0 0;
  border-top: 1px solid var(--border);
  padding-top: 32px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 16px;
    margin-top: 44px;
  }
`;

const Stat = styled(motion.div)`
  dt {
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.02em;
  }
  dd {
    margin: 4px 0 0;
    color: var(--text-muted);
    font-size: 0.9rem;
  }
`;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const initials = profile.name
  .split(" ")
  .map((n) => n[0])
  .slice(0, 2)
  .join("");

export default function Hero() {
  const reduce = useReducedMotion();
  const [imgError, setImgError] = useState(false);
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

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

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
        <Left as={motion.div} variants={container} initial="hidden" animate="visible">
          {profile.openToWork && (
            <motion.div variants={item}>
              <Badge>
                <Pulse aria-hidden="true" />
                Open to Senior Frontend / Full-Stack roles
              </Badge>
            </motion.div>
          )}

          <motion.div variants={item}>
            <Title>
              Hi, I'm <Accent>{profile.name}</Accent>
            </Title>
          </motion.div>

          <motion.div variants={item}>
            <Role>
              {profile.role} · {profile.location}
            </Role>
          </motion.div>

          <motion.div variants={item}>
            <Tagline>{profile.tagline}</Tagline>
          </motion.div>

          <CtaRow as={motion.div} variants={item}>
            <Primary
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              View my work
            </Primary>
            <Secondary
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Download résumé ↓
            </Secondary>
            <Secondary
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Get in touch
            </Secondary>
            <Secondary
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              LinkedIn ↗
            </Secondary>
            <Secondary
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              GitHub ↗
            </Secondary>
          </CtaRow>
        </Left>

        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <PortraitWrap>
            <Ring
              aria-hidden="true"
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <Portrait>
              {!imgError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  onError={() => setImgError(true)}
                  loading="eager"
                />
              ) : (
                <Monogram aria-label={profile.name}>{initials}</Monogram>
              )}
            </Portrait>
          </PortraitWrap>
        </motion.div>
      </Inner>

      <Container>
        <Stats
          as={motion.dl}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {stats.map((s) => (
            <Stat key={s.label} variants={item}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </Stat>
          ))}
        </Stats>
      </Container>
    </Wrap>
  );
}
