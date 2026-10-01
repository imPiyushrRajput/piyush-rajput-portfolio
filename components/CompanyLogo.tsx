"use client";

import { useState } from "react";
import styled from "styled-components";

// Two brand-colored variants per company: the "dark" variant reads on the dark
// theme, the "light" variant on the light theme. We show the right one via CSS,
// matching the theme mechanism used elsewhere (dark is the default).
const Base = styled.img`
  width: auto;
  object-fit: contain;
  display: block;
`;

const DarkLogo = styled(Base)`
  display: block;
  :root[data-theme="light"] & {
    display: none;
  }
  @media (prefers-color-scheme: light) {
    :root:not([data-theme="dark"]) & {
      display: none;
    }
  }
`;

const LightLogo = styled(Base)`
  display: none;
  :root[data-theme="light"] & {
    display: block;
  }
  @media (prefers-color-scheme: light) {
    :root:not([data-theme="dark"]) & {
      display: block;
    }
  }
`;

const Stack = styled.div`
  height: 34px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Inline = styled.span`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
`;

const NameFallback = styled.p`
  color: var(--accent-strong);
  font-weight: 600;
  margin: 0 0 2px;
`;

// h = stacked (experience) optical height; hi = inline (project card) height.
const LOGOS: Record<string, { dark: string; light: string; h: number; hi: number }> = {
  "Publicis Sapient": {
    dark: "/logos/publicis-sapient-dark.svg",
    light: "/logos/publicis-sapient-light.svg",
    h: 34,
    hi: 18,
  },
  "iBase-t": {
    dark: "/logos/ibaset-dark.svg",
    light: "/logos/ibaset-light.svg",
    h: 22,
    hi: 13,
  },
  "ScaleReal Technologies": {
    dark: "/logos/scalereal-dark.svg",
    light: "/logos/scalereal-light.svg",
    h: 19,
    hi: 12,
  },
};

/** Detect a known company from a free-form org string. */
export function companyFromOrg(org?: string): string | null {
  if (!org) return null;
  if (/publicis sapient/i.test(org)) return "Publicis Sapient";
  if (/ibase-?t/i.test(org)) return "iBase-t";
  if (/scalereal/i.test(org)) return "ScaleReal Technologies";
  return null;
}

export default function CompanyLogo({
  company,
  inline = false,
}: {
  company: string;
  inline?: boolean;
}) {
  const logo = LOGOS[company];
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return inline ? <>{company}</> : <NameFallback>{company}</NameFallback>;
  }

  const h = inline ? logo.hi : logo.h;
  const imgs = (
    <>
      {/* eslint-disable @next/next/no-img-element */}
      <DarkLogo
        src={logo.dark}
        alt={company}
        style={{ height: h }}
        onError={() => setFailed(true)}
      />
      <LightLogo
        src={logo.light}
        alt={company}
        style={{ height: h }}
        aria-hidden="true"
      />
      {/* eslint-enable @next/next/no-img-element */}
    </>
  );

  return inline ? <Inline>{imgs}</Inline> : <Stack>{imgs}</Stack>;
}
