"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "./primitives";
import { navLinks, profile } from "@/data/portfolio";

const Header = styled.header<{ $scrolled: boolean; $menuOpen: boolean }>`
  /* While the mobile menu is open the page is scroll-locked with
     overflow:hidden, which breaks position:sticky — so pin the header with
     position:fixed instead to keep it (and the close button) at the top. */
  position: ${(p) => (p.$menuOpen ? "fixed" : "sticky")};
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: ${(p) =>
    p.$menuOpen
      ? "var(--bg)"
      : p.$scrolled
      ? "color-mix(in srgb, var(--bg) 88%, transparent)"
      : "transparent"};
  backdrop-filter: ${(p) =>
    p.$scrolled && !p.$menuOpen ? "blur(10px)" : "none"};
  border-bottom: 1px solid
    ${(p) => (p.$scrolled || p.$menuOpen ? "var(--border)" : "transparent")};
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
  display: inline-block;
  color: ${(p) => (p.$active ? "var(--text)" : "var(--text-muted)")};
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 12px;
  transition: color 0.25s ease;

  &:hover {
    color: var(--text);
    text-decoration: none;
  }

  /* Active-section indicator. */
  &::after {
    content: "";
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 2px;
    height: 1.5px;
    background: var(--accent);
    transform: scaleX(${(p) => (p.$active ? 1 : 0)});
    transform-origin: left center;
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
`;

/* Vertical text-swap on hover: the label slides up and an identical copy
   rises in from below. */
const Clip = styled.span`
  display: inline-block;
  overflow: hidden;
  height: 1.4em;
  line-height: 1.4;
  vertical-align: top;
`;

const Slider = styled.span`
  display: block;
  transition: transform 0.45s cubic-bezier(0.76, 0, 0.24, 1);

  span {
    display: block;
    height: 1.4em;
  }

  ${NavLink}:hover & {
    transform: translateY(-1.4em);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ResumeButton = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono), ui-monospace, monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.74rem;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 2px;
  color: var(--text);
  border: 1px solid var(--border);
  background: transparent;
  overflow: hidden;
  isolation: isolate;

  /* Fill-sweep from the left on hover. */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--accent);
    transform: translateX(-101%);
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: var(--accent-contrast);
    border-color: var(--accent);
    text-decoration: none;
  }
  &:hover::before {
    transform: translateX(0);
  }

  span.arrow {
    transition: transform 0.3s ease;
  }
  &:hover span.arrow {
    transform: translateY(2px);
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
  display: flex;
  flex-direction: column;

  @media (min-width: 861px) {
    display: none;
  }
`;

/* Big editorial menu row: mono index + large display label, slides right on
   hover/active. */
const MLink = styled(motion.a)`
  display: flex;
  align-items: baseline;
  gap: 18px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  color: var(--text-muted);
  font-family: var(--font-display), system-ui, sans-serif;
  font-weight: 600;
  font-size: clamp(1.7rem, 8vw, 2.4rem);
  letter-spacing: -0.03em;
  line-height: 1;
  transition: color 0.2s ease, padding-left 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.2s ease;

  .idx {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    color: var(--text-subtle);
    font-weight: 400;
    flex-shrink: 0;
    width: 2.4em;
  }

  &:hover,
  &:focus-visible {
    color: var(--text);
    padding-left: 34px;
    background: var(--chip-bg);
    text-decoration: none;
  }

  &[aria-current="true"] {
    color: var(--text);
  }
  &[aria-current="true"] .idx {
    color: var(--accent);
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

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      setTheme(next);
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* ignore storage errors (private mode, etc.) */
      }
    };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Animate the switch as a circular reveal of the new theme, growing from the
    // toggle button. Falls back to an instant switch where unsupported.
    const startVT = (
      document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      }
    ).startViewTransition;

    if (!startVT || prefersReduced) {
      apply();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = startVT.call(document, apply);
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 520,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <>
    <Header $scrolled={scrolled} $menuOpen={menuOpen}>
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
                <Clip>
                  <Slider>
                    <span>{link.label}</span>
                    <span aria-hidden="true">{link.label}</span>
                  </Slider>
                </Clip>
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
            Résumé <span className="arrow">↓</span>
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
            {navLinks.map((link, i) => (
              <MLink
                key={link.href}
                href={link.href}
                aria-current={
                  activeId === link.href.replace("#", "") ? "true" : undefined
                }
                onClick={() => setMenuOpen(false)}
                initial={reduce ? false : { opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: reduce ? 0 : 0.08 + i * 0.05,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="idx" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </MLink>
            ))}
            <MLink
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
              onClick={() => setMenuOpen(false)}
              initial={reduce ? false : { opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: reduce ? 0 : 0.08 + navLinks.length * 0.05,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="idx" aria-hidden="true">
                ↓
              </span>
              Résumé
            </MLink>
          </MobileNav>
        )}
      </AnimatePresence>
    </>
  );
}
