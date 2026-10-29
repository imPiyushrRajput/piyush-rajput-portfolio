"use client";

import type { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiRedux,
  SiGraphql,
  SiApollographql,
  SiStorybook,
  SiJest,
  SiAxios,
  SiStyledcomponents,
  SiMui,
  SiAntdesign,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiRubyonrails,
  SiFlutter,
  SiFirebase,
  SiMongodb,
  SiCucumber,
  SiGitlab,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiWebpack,
  SiBabel,
  SiNpm,
  SiTestinglibrary,
  SiLangchain,
  SiPython,
  SiVite,
  SiEslint,
  SiPrettier,
  SiReactquery,
  SiReacthookform,
  SiReactrouter,
  SiSass,
  SiJsonwebtokens,
  SiGooglechrome,
  SiFastapi,
  SiDjango,
} from "react-icons/si";
import { FaUniversalAccess } from "react-icons/fa6";
import {
  FiCode,
  FiDatabase,
  FiServer,
  FiActivity,
  FiGrid,
  FiPackage,
  FiLayers,
  FiZap,
  FiCheckCircle,
  FiSmartphone,
  FiRefreshCw,
  FiMessageSquare,
  FiBarChart2,
  FiWifi,
  FiPhone,
  FiSearch,
  FiShare2,
  FiShield,
  FiGlobe,
} from "react-icons/fi";

// Map a tech/skill label (case-insensitive) to an icon. Brand icons where they
// exist; otherwise a category icon. Everything renders in currentColor so it
// stays on-theme in both light and dark.
const MAP: Record<string, IconType> = {
  // Languages / core
  react: SiReact,
  "react.js": SiReact,
  "react native": SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
  python: SiPython,
  // Styling
  "sass/scss": SiSass,
  sass: SiSass,
  scss: SiSass,
  "css-in-js": SiStyledcomponents,
  "react router": SiReactrouter,
  "i18next (i18n)": FiGlobe,
  i18next: FiGlobe,
  i18n: FiGlobe,
  // State / data
  redux: SiRedux,
  "redux toolkit": SiRedux,
  "rtk query": SiRedux,
  "tanstack query": SiReactquery,
  "react query": SiReactquery,
  swr: FiRefreshCw,
  zustand: FiPackage,
  "react context api": SiReact,
  "context api": SiReact,
  "error boundaries": FiShield,
  // Forms & validation
  "react hook form": SiReacthookform,
  zod: FiCheckCircle,
  yup: FiCheckCircle,
  graphql: SiGraphql,
  "apollo client": SiApollographql,
  axios: SiAxios,
  // UI libs
  "styled-components": SiStyledcomponents,
  "material ui": SiMui,
  "ant design": SiAntdesign,
  "next.js": SiNextdotjs,
  nivo: FiBarChart2,
  recharts: FiBarChart2,
  "ag grid": FiGrid,
  aggrid: FiGrid,
  // Testing
  jest: SiJest,
  storybook: SiStorybook,
  rtl: SiTestinglibrary,
  "react testing library": SiTestinglibrary,
  playwright: FiCheckCircle,
  cucumber: SiCucumber,
  "unit testing": FiCheckCircle,
  "integration testing": FiCheckCircle,
  "e2e testing": FiCheckCircle,
  e2e: FiCheckCircle,
  tdd: FiCheckCircle,
  // Rendering & SEO
  csr: SiReact,
  "client-side rendering": SiReact,
  ssr: FiServer,
  "server-side rendering": FiServer,
  ssg: FiServer,
  "static site generation": FiServer,
  isr: FiServer,
  "incremental static regeneration": FiServer,
  "react server components": FiServer,
  rsc: FiServer,
  hydration: FiActivity,
  seo: FiSearch,
  "open graph": FiShare2,
  // Backend / mobile / db
  "node.js": SiNodedotjs,
  express: SiExpress,
  fastapi: SiFastapi,
  django: SiDjango,
  "ruby on rails": SiRubyonrails,
  flutter: SiFlutter,
  firebase: SiFirebase,
  "firebase firestore": SiFirebase,
  firestore: SiFirebase,
  mongodb: SiMongodb,
  "vector db": FiDatabase,
  "vector dbs": FiDatabase,
  vectordb: FiDatabase,
  // RAG / AI
  langchain: SiLangchain,
  "aws athena": FiDatabase,
  "amazon athena": FiDatabase,
  "prompt engineering": FiMessageSquare,
  // APIs / integration
  "rest apis": FiServer,
  sse: FiActivity,
  "server-sent events (sse)": FiActivity,
  websockets: FiWifi,
  "action cable (websockets)": FiWifi,
  "action cable": FiWifi,
  jwt: SiJsonwebtokens,
  twilio: FiPhone,
  "json schema": FiCode,
  // Architecture
  microfrontends: FiGrid,
  "module federation": SiWebpack,
  "atomic design": FiLayers,
  "design systems": FiGrid,
  "component libraries": FiPackage,
  "internal component library": FiPackage,
  "responsive design": FiSmartphone,
  // Accessibility
  accessibility: FaUniversalAccess,
  "wcag 2.1 aa": FaUniversalAccess,
  wcag: FaUniversalAccess,
  a11y: FaUniversalAccess,
  "semantic html": SiHtml5,
  aria: FaUniversalAccess,
  "keyboard navigation": FaUniversalAccess,
  "axe devtools": FaUniversalAccess,
  // Performance
  "code splitting": FiZap,
  "lazy loading": FiZap,
  memoization: FiZap,
  "bundle optimization": FiZap,
  lighthouse: FiZap,
  pagespeed: FiZap,
  "core web vitals": FiActivity,
  cdn: FiGlobe,
  "cross-browser compatibility": FiZap,
  // Tooling / workflow
  git: SiGit,
  github: SiGithub,
  "git / github": SiGithub,
  gitlab: SiGitlab,
  "github actions ci/cd": SiGithubactions,
  "lighthouse ci": FiZap,
  husky: FiCheckCircle,
  "chrome devtools": SiGooglechrome,
  "claude code": FiCode,
  claude: FiMessageSquare,
  "private npm registry": SiNpm,
  webpack: SiWebpack,
  vite: SiVite,
  babel: SiBabel,
  eslint: SiEslint,
  prettier: SiPrettier,
  agile: FiRefreshCw,
  scrum: FiRefreshCw,
};

export function getTechIcon(name: string): IconType {
  return MAP[name.trim().toLowerCase()] ?? FiCode;
}

// Official-ish brand colors, applied only to true brand logos. Generic category
// icons (and anything not listed) inherit currentColor so they stay monochrome
// and on-theme. Near-black logos (Next.js, GitHub, Express, JWT, LangChain) are
// intentionally omitted so they follow the text color and remain visible in dark
// mode.
const BRAND: Record<string, string> = {
  react: "#61DAFB",
  "react.js": "#61DAFB",
  "react native": "#61DAFB",
  "react context api": "#61DAFB",
  "react server components": "#61DAFB",
  csr: "#61DAFB",
  typescript: "#3178C6",
  javascript: "#F7DF1E",
  html: "#E34F26",
  html5: "#E34F26",
  css: "#1572B6",
  css3: "#1572B6",
  python: "#3776AB",
  redux: "#764ABC",
  "redux toolkit": "#764ABC",
  "rtk query": "#764ABC",
  "tanstack query": "#FF4154",
  "react query": "#FF4154",
  "react hook form": "#EC5990",
  graphql: "#E10098",
  axios: "#5A29E4",
  "styled-components": "#DB7093",
  "css-in-js": "#DB7093",
  "material ui": "#007FFF",
  "ant design": "#0170FE",
  storybook: "#FF4785",
  jest: "#C21325",
  "react testing library": "#E33332",
  cucumber: "#23D96C",
  "node.js": "#5FA04E",
  fastapi: "#009688",
  django: "#44B78B",
  "ruby on rails": "#D30001",
  flutter: "#02569B",
  firebase: "#FFCA28",
  firestore: "#FFCA28",
  mongodb: "#47A248",
  "claude code": "#D97757",
  claude: "#D97757",
  git: "#F05032",
  gitlab: "#FC6D26",
  "github actions ci/cd": "#2088FF",
  "private npm registry": "#CB3837",
  webpack: "#8DD6F9",
  "module federation": "#8DD6F9",
  vite: "#646CFF",
  babel: "#F9DC3E",
  eslint: "#8A6DFF",
  prettier: "#F7B93E",
  "sass/scss": "#CC6699",
  "react router": "#F44250",
  "chrome devtools": "#4285F4",
};

export function getBrandColor(name: string): string | undefined {
  return BRAND[name.trim().toLowerCase()];
}

export default function TechIcon({
  name,
  size = 14,
  className,
  color,
}: {
  name: string;
  size?: number;
  className?: string;
  /** Override: pass "currentColor" to force monochrome. Defaults to the brand color when one exists. */
  color?: string;
}) {
  const Icon = getTechIcon(name);
  const resolved = color ?? getBrandColor(name);
  return (
    <Icon
      size={size}
      className={className}
      color={resolved}
      aria-hidden
      focusable={false}
    />
  );
}
