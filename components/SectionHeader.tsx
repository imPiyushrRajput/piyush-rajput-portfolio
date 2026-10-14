"use client";

import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";

const Wrapper = styled.div`
  margin-bottom: 44px;

  @media (max-width: 600px) {
    margin-bottom: 32px;
  }
`;

/* Mono index number + hairline rule running to the edge. */
const TopRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
`;

const Index = styled.span`
  font-family: var(--font-mono), ui-monospace, "SFMono-Regular", Menlo, monospace;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
  color: var(--text-subtle);
  white-space: nowrap;
`;

const Rule = styled.span`
  flex: 1;
  height: 1px;
  background: var(--border);
`;

const Title = styled.h2`
  font-size: clamp(1.9rem, 5vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1;
`;

/* Clip box for the slide-up title reveal. */
const Line = styled.span`
  display: block;
  overflow: hidden;
  padding: 0.1em 0 0.08em;
`;

const LineInner = styled(motion.span)`
  display: block;
`;

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  /** Two-digit editorial index, e.g. "01". */
  num: string;
  /** Short uppercase label shown beside the index, e.g. "SELECTED WORK". */
  kicker?: string;
  title: string;
  className?: string;
};

export default function SectionHeader({ num, kicker, title, className }: Props) {
  const reduce = useReducedMotion();

  return (
    <Wrapper className={className}>
      <TopRow
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <Index>{kicker ? `${num} — ${kicker}` : num}</Index>
        <Rule aria-hidden="true" />
      </TopRow>
      <Title>
        <Line>
          <LineInner
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {title}
          </LineInner>
        </Line>
      </Title>
    </Wrapper>
  );
}
