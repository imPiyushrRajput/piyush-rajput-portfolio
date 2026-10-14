"use client";

import styled from "styled-components";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { FiMail, FiArrowUp } from "react-icons/fi";
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
  align-items: center;
  flex-wrap: wrap;
  gap: 10px 18px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    color: var(--text-muted);
    font-size: 0.88rem;
    font-weight: 500;
  }

  a:hover {
    color: var(--text);
  }

  svg {
    flex-shrink: 0;
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
            <FaLinkedinIn aria-hidden size={14} />
            LinkedIn
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden size={14} />
            GitHub
          </a>
          <a href={`mailto:${profile.email}`}>
            <FiMail aria-hidden size={14} />
            Email
          </a>
          <a href="#top">
            <FiArrowUp aria-hidden size={14} />
            Back to top
          </a>
        </Links>
      </Inner>
    </Wrap>
  );
}
