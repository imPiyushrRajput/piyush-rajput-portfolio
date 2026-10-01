"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

const NavLink = styled.a<{ $active?: boolean }>`
  position: relative;
  color: ${(p) => (p.$active ? "var(--text)" : "var(--text-muted)")};
  font-size: 0.92rem;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text);
    background: var(--chip-bg);
    text-decoration: none;
  }

  &::after {
    content: "";
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 3px;
    height: 2px;
    border-radius: 2px;
    background: var(--accent);
    transform: scaleX(${(p) => (p.$active ? 1 : 0)});
    transform-origin: left center;
    transition: transform 0.25s ease;
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

const Burger = styled(IconButton)<{ $open: boolean }>`
  position: relative;

  @media (min-width: 861px) {
    display: none;
  }

  span {
    position: absolute;
    left: 11px;
    width: 18px;
    height: 2px;
    border-radius: 2px;
    background: var(--text);
    transition: transform 0.3s ease, opacity 0.2s ease, top 0.3s ease;
  }

  span:nth-child(1) {
    top: ${(p) => (p.$open ? "19px" : "14px")};
    transform: ${(p) => (p.$open ? "rotate(45deg)" : "none")};
  }
  span:nth-child(2) {
    top: 19px;
    opacity: ${(p) => (p.$open ? 0 : 1)};
    transform: ${(p) => (p.$open ? "translateX(-6px)" : "none")};
  }
  span:nth-child(3) {
    top: ${(p) => (p.$open ? "19px" : "24px")};
    transform: ${(p) => (p.$open ? "rotate(-45deg)" : "none")};
  }
`;

const MobileNav = styled(motion.nav)`
  position: fixed;
  top: 68px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 45;
  overflow-y: auto;
  border-top: 1px solid var(--border);
  background: var(--bg);

  @media (min-width: 861px) {
    display: none;
  }

  a {
    display: block;
    padding: 16px 24px;
    color: var(--text-muted);
    font-weight: 500;
    font-size: 1.05rem;
    border-bottom: 1px solid var(--border);
    border-left: 3px solid transparent;

    &:hover {
      color: var(--text);
      background: var(--chip-bg);
      text-decoration: none;
    }
  }

  a[aria-current="true"] {
    color: var(--text);
    border-left-color: var(--accent);
    background: var(--chip-bg);
  }
`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeId, setActiveId] = useState<string>("");
  const reduce = useReducedMotion();

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

  // Scrollspy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      // A thin band around the upper-middle of the viewport picks the section
      // the reader is actually looking at.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));

    // Fallback (and bottom-of-page accuracy): compute from scroll position too.
    const compute = () => {
      const line = window.innerHeight * 0.45;
      let current = "";
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      }
      // Snap to the last section once the page is scrolled to the bottom.
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = sections[sections.length - 1].id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", compute, { passive: true });
    compute();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", compute);
    };
  }, []);

  // Lock page scroll while the mobile menu is open (pause Lenis + hide overflow).
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (menuOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
    <>
    <Header $scrolled={scrolled}>
      <Bar as="div">
        <Brand href="#top" aria-label={`${profile.name} — back to top`}>
          {initials}
        </Brand>

        <Nav aria-label="Primary">
          {navLinks.map((link) => {
            const active = activeId === link.href.replace("#", "");
            return (
              <NavLink
                key={link.href}
                href={link.href}
                $active={active}
                aria-current={active ? "true" : undefined}
              >
                {link.label}
              </NavLink>
            );
          })}
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
          <Burger
            $open={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span />
            <span />
            <span />
          </Burger>
        </Actions>
      </Bar>
    </Header>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <MobileNav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: reduce ? 0 : 0.26,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={
                  activeId === link.href.replace("#", "") ? "true" : undefined
                }
                onClick={() => setMenuOpen(false)}
              >
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
        )}
      </AnimatePresence>
    </>
  );
}
