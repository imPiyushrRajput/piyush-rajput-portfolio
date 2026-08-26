# Piyush Rajput — Portfolio

A fast, accessible, single-page portfolio built with **Next.js (App Router)** and **styled-components**.

## Features

- **Single-page app** with smooth-scroll navigation and section anchors
- **Dark / light theme** toggle with no flash on load (persisted to `localStorage`)
- **Accessible**: semantic HTML, skip link, keyboard navigation, focus-visible rings, `prefers-reduced-motion` support, ARIA labels
- **Performant**: system-font stack (no web-font download), minimal JS, SSR-styled first paint, no heavy dependencies
- **Responsive**: works from 320px phones to large desktops
- **All content in one file** — edit [`data/portfolio.ts`](data/portfolio.ts) to update everything

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm run start
```

## Editing content

All text, jobs, projects, skills, certifications, and recommendations live in
[`data/portfolio.ts`](data/portfolio.ts). Change that file and the whole site updates.

## Deploy

This is a standard Next.js app — deploy to **Vercel**, **Netlify**, or any Node host.
Push to a Git repo and import it into Vercel for zero-config hosting.

## Structure

```
app/            Next.js App Router (layout + single page)
components/     One component per section (client components)
data/           portfolio.ts — single source of content
lib/            styled-components SSR registry + global styles/theme
public/         Static assets (résumé PDF, etc.)
```

## Résumé

The downloadable résumé lives at `public/Piyush_Rajput_Resume.pdf` and is linked
from the navbar, hero, and contact section. To update it, replace that file
(keep the same name) or change the `resume` path in [`data/portfolio.ts`](data/portfolio.ts).
