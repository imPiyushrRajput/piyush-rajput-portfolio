"use client";

import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 600px) {
    padding: 0 18px;
  }
`;

export const Section = styled.section`
  padding: 88px 0;
  scroll-margin-top: 84px;

  @media (max-width: 600px) {
    padding: 60px 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: "";
    width: 28px;
    height: 3px;
    border-radius: 2px;
    background: var(--accent);
  }
`;

export const SectionIntro = styled.p`
  color: var(--text-muted);
  max-width: 60ch;
  margin-bottom: 40px;
  font-size: 1.02rem;
`;

export const Chip = styled.span`
  display: inline-block;
  background: var(--chip-bg);
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 0.82rem;
  font-weight: 500;
  white-space: nowrap;
`;

export const Card = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
  box-shadow: var(--shadow);
`;
