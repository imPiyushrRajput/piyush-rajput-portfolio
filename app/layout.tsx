import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans, DM_Mono } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/lib/GlobalStyles";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import SoundEffects from "@/components/SoundEffects";
import { profile, skillGroups, education } from "@/data/portfolio";

// Editorial type system: Space Grotesk (display), DM Sans (body), DM Mono (labels).
const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const monoFont = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
const fontVars = `${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`;

const SITE_URL = "https://piyushrajput.me";
const pageTitle = `${profile.name} — ${profile.role}`;
const description =
  "Piyush Rajput is a Senior Full Stack Engineer with nearly 6 years building large-scale web applications end-to-end — React & TypeScript on the front, with Node, APIs, real-time, and data/AI behind them — for enterprise clients including Lloyds Banking Group and CPPIB.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: pageTitle,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} Portfolio`,
  keywords: [
    "Piyush Rajput",
    "Senior Full Stack Engineer",
    "Full Stack Developer",
    "React Developer",
    "Node.js",
    "Next.js",
    "TypeScript",
    "Backend Developer",
    "APIs",
    "Microservices",
    "Microfrontends",
    "RAG",
    "Publicis Sapient",
    "Pune",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: profile.socials.linkedin }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: pageTitle,
    description:
      "Nearly 6 years building fast, accessible web apps end-to-end — React & TypeScript up front, with Node, APIs, real-time & data/AI behind them.",
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description:
      "Senior Full Stack Engineer — React, Node & TypeScript. Nearly 6 years shipping large-scale enterprise web apps end-to-end.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.role}`,
      },
    ],
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Person structured data (JSON-LD) so search engines can build a rich profile card.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  image: `${SITE_URL}${profile.photo}`,
  sameAs: [
    profile.socials.linkedin,
    profile.socials.github,
    profile.socials.portfolio,
  ],
  worksFor: { "@type": "Organization", name: "Publicis Sapient" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  alumniOf: education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.school,
  })),
  knowsAbout: skillGroups.flatMap((g) => g.items),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Applies the saved theme before first paint to avoid a flash of the wrong theme.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={fontVars}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <SmoothScroll />
          <CustomCursor />
          <SoundEffects />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
