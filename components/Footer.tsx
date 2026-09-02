"use client";

import styled from "styled-components";
import { Container } from "./primitives";
import { profile } from "@/data/portfolio";

const Wrap = styled.footer`
  border-top: 1px solid var(--border);
  padding: 32px 0;
  margin-top: 32px;
`;

const Inner = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Copy = styled.p`
  color: var(--text-subtle);
  font-size: 0.88rem;
`;

const Links = styled.div`
  display: flex;
  gap: 18px;

  a {
    color: var(--text-muted);
    font-size: 0.88rem;
    font-weight: 500;
  }
`;

export default function Footer() {
  return (
    <Wrap>
      <Inner as="div">
        <Copy>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </Copy>
        <Links>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href="#top">Back to top ↑</a>
        </Links>
      </Inner>
    </Wrap>
  );
}
