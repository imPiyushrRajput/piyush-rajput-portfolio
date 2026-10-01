"use client";

import { Fragment } from "react";
import styled from "styled-components";

// Résumé-style highlighter: a subtle marker behind key terms + metrics.
const Mark = styled.mark`
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  color: var(--text);
  font-weight: 600;
  padding: 0 0.18em;
  border-radius: 3px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
`;

// Distinctive technologies + concepts worth calling out in prose. Ubiquitous
// ones already shown as tech chips (React, TypeScript, Redux, Jest) are left out
// to avoid over-highlighting. Longest first so multi-word terms win.
const KEYWORDS = [
  "Server-Sent Events (SSE)",
  "Server-Sent Events",
  "JSON schema-driven form library",
  "Action Cable (WebSockets)",
  "Kotlin/Postgres",
  "Module Federation",
  "Redux Toolkit",
  "Apollo Client",
  "Atomic Design",
  "Material UI",
  "react-window",
  "Microfrontends",
  "microfrontend",
  "AWS Athena",
  "Ant Design",
  "RTK Query",
  "LangChain",
  "Playwright",
  "Storybook",
  "WebSockets",
  "vector DB",
  "Cucumber",
  "GraphQL",
  "Postgres",
  "Twilio",
  "Django",
  "Nivo",
  "Axios",
  "340B",
  "RAG",
  "TDD",
  "SSE",
].sort((a, b) => b.length - a.length);

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const METRIC = String.raw`\d[\d,.–-]*(?:K|M|B|s)?\+?%?`;
// Keywords require non-letter boundaries so acronyms (SSE, RAG) don't match
// inside words like "asset", "coverage", "assembled".
const PATTERN = new RegExp(
  `(${METRIC}|(?<![A-Za-z])(?:${KEYWORDS.map(escapeRe).join("|")})(?![A-Za-z]))`,
  "gi"
);

/**
 * Renders `text` with metrics and key terms wrapped in a highlighter mark —
 * the "make the important parts pop" treatment from the résumé.
 */
export default function Emphasize({ text }: { text: string }) {
  // split() with one capture group interleaves [plain, hit, plain, hit, …]
  const parts = text.split(PATTERN);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Mark key={i}>{part}</Mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
