"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "./primitives";
import { navLinks, profile } from "@/data/portfolio";

const Header = styled.header<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 50;
  background: ${(p) =>
    p.$scrolled ? "color-mix(in srgb, var(--bg) 88%, transparent)" : "transparent"};
  backdrop-filter: ${(p) => (p.$scrolled ? "blur(10px)" : "none")};
  border-bottom: 1px solid
    ${(p) => (p.$scrolled ? "var(--border)" : "transparent")};
  transition: background 0.25s ease, border-color 0.25s ease;
`;

const Bar = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--border);
  border-radius: 11px;
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: -0.04em;
  color: var(--text);
  background: var(--bg-elevated);

  &:hover {
    text-decoration: none;
    border-color: var(--text);
    color: var(--text);
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 860px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: var(--text-muted);
  font-size: 0.92rem;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;

  &:hover {
    color: var(--text);
    background: var(--chip-bg);
    text-decoration: none;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 9px;
  background: var(--accent);
  color: var(--accent-contrast);
  border: 1px solid var(--accent);

  &:hover {
    background: var(--accent-strong);
    border-color: var(--accent-strong);
    text-decoration: none;
  }

  @media (max-width: 860px) {
    display: none;
  }
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text);
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;

  &:hover {
    border-color: var(--accent);
  }
`;

const MenuButton = styled(IconButton)`
  @media (min-width: 861px) {
    display: none;
  }
`;

const MobileNav = styled.nav<{ $open: boolean }>`
  display: ${(p) => (p.$open ? "block" : "none")};
  border-top: 1px solid var(--border);
  background: var(--bg-elevated);

  @media (min-width: 861px) {
    display: none;
  }

  a {
    display: block;
    padding: 14px 24px;
    color: var(--text-muted);
    font-weight: 500;
    border-bottom: 1px solid var(--border);

    &:hover {
      color: var(--text);
      background: var(--chip-bg);
      text-decoration: none;
    }
  }
`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as
        | "dark"
        | "light") || "dark";
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore storage errors (private mode, etc.) */
    }
  };

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <Header $scrolled={scrolled}>
      <Bar as="div">
        <Brand href="#top" aria-label={`${profile.name} — back to top`}>
          {initials}
        </Brand>

        <Nav aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </Nav>

        <Actions>
          <ResumeButton
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            Résumé ↓
          </ResumeButton>
          <IconButton
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </IconButton>
          <MenuButton
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? "✕" : "☰"}
          </MenuButton>
        </Actions>
      </Bar>

      <MobileNav id="mobile-nav" $open={menuOpen} aria-label="Mobile">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          download
          onClick={() => setMenuOpen(false)}
        >
          Résumé ↓
        </a>
      </MobileNav>
    </Header>
  );
}
