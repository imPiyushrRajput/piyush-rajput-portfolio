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
} from "react-icons/si";
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
  // State / data
  redux: SiRedux,
  "redux toolkit": SiRedux,
  "rtk query": SiRedux,
  graphql: SiGraphql,
  "apollo client": SiApollographql,
  axios: SiAxios,
  // UI libs
  "styled-components": SiStyledcomponents,
  "material ui": SiMui,
  "ant design": SiAntdesign,
  "next.js": SiNextdotjs,
  nivo: FiBarChart2,
  // Testing
  jest: SiJest,
  storybook: SiStorybook,
  rtl: SiTestinglibrary,
  "react testing library": SiTestinglibrary,
  playwright: FiCheckCircle,
  cucumber: SiCucumber,
  "unit testing": FiCheckCircle,
  "integration testing": FiCheckCircle,
  tdd: FiCheckCircle,
  // Backend / mobile / db
  "node.js": SiNodedotjs,
  express: SiExpress,
  "ruby on rails": SiRubyonrails,
  flutter: SiFlutter,
  firebase: SiFirebase,
  "firebase firestore": SiFirebase,
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
  // Performance
  "code splitting": FiZap,
  "bundle optimization": FiZap,
  lighthouse: FiZap,
  pagespeed: FiZap,
  "cross-browser compatibility": FiZap,
  // Tooling / workflow
  git: SiGit,
  github: SiGithub,
  "git / github": SiGithub,
  gitlab: SiGitlab,
  "github actions ci/cd": SiGithubactions,
  "private npm registry": SiNpm,
  webpack: SiWebpack,
  babel: SiBabel,
  agile: FiRefreshCw,
  scrum: FiRefreshCw,
};

export function getTechIcon(name: string): IconType {
  return MAP[name.trim().toLowerCase()] ?? FiCode;
}

export default function TechIcon({
  name,
  size = 14,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = getTechIcon(name);
  return <Icon size={size} className={className} aria-hidden focusable={false} />;
}
