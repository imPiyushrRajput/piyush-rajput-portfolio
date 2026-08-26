"use client";

import { createGlobalStyle } from "styled-components";

// Theming is driven by CSS custom properties toggled via the `data-theme`
// attribute on <html>. This keeps theme switching cheap (no React re-render of
// the whole tree) and lets the first paint match the saved preference.
const GlobalStyles = createGlobalStyle`
  :root {
    --max-width: 1080px;

    /* Dark theme (default) — monochrome */
    --bg: #0a0a0a;
    --bg-elevated: #141414;
    --bg-card: #111111;
    --border: #262626;
    --text: #fafafa;
    --text-muted: #a3a3a3;
    --text-subtle: #6e6e6e;
    --accent: #ffffff;
    --accent-strong: #ffffff;
    --accent-contrast: #0a0a0a;
    --chip-bg: #191919;
    --shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    --ring: rgba(255, 255, 255, 0.6);
    --grid-line: rgba(255, 255, 255, 0.035);
    --grid-glow: rgba(255, 255, 255, 0.18);
  }

  [data-theme="light"] {
    --bg: #ffffff;
    --bg-elevated: #ffffff;
    --bg-card: #ffffff;
    --border: #e5e5e5;
    --text: #0a0a0a;
    --text-muted: #525252;
    --text-subtle: #8a8a8a;
    --accent: #0a0a0a;
    --accent-strong: #000000;
    --accent-contrast: #ffffff;
    --chip-bg: #f4f4f4;
    --shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
    --ring: rgba(0, 0, 0, 0.5);
    --grid-line: rgba(0, 0, 0, 0.04);
    --grid-glow: rgba(0, 0, 0, 0.16);
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 84px;
    -webkit-text-size-adjust: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial,
      sans-serif;
    line-height: 1.6;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    transition: background 0.25s ease, color 0.25s ease;
  }

  h1, h2, h3, h4 {
    line-height: 1.2;
    margin: 0;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
  }

  a {
    color: var(--accent-strong);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  img {
    max-width: 100%;
    display: block;
  }

  :focus-visible {
    outline: 3px solid var(--ring);
    outline-offset: 2px;
    border-radius: 4px;
  }

  ::selection {
    background: var(--accent);
    color: var(--accent-contrast);
  }

  .skip-link {
    position: absolute;
    left: 16px;
    top: -60px;
    z-index: 100;
    background: var(--accent);
    color: var(--accent-contrast);
    padding: 10px 18px;
    border-radius: 8px;
    font-weight: 600;
    transition: top 0.2s ease;
  }

  .skip-link:focus {
    top: 16px;
    text-decoration: none;
  }

  /* Hide the native cursor only once the custom cursor is mounted (JS on,
     fine pointer). Keyboard/touch/no-JS users keep the default cursor. */
  html.has-custom-cursor,
  html.has-custom-cursor * {
    cursor: none !important;
  }

  /* Lenis smooth-scroll helpers (recommended defaults). */
  html.lenis,
  html.lenis body {
    height: auto;
  }
  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }
  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }
  .lenis.lenis-stopped {
    overflow: hidden;
  }
`;

export default GlobalStyles;
