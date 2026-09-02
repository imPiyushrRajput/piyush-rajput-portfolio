import type { Metadata, Viewport } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/lib/GlobalStyles";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { profile, skillGroups, education } from "@/data/portfolio";

const SITE_URL = "https://piyushrajput.me";
const pageTitle = `${profile.name} — ${profile.role}`;
const description =
  "Piyush Rajput is a Senior Frontend Engineer with 5+ years building large-scale React, Next.js, and TypeScript applications for enterprise clients including CPPIB and Lloyds Banking Group.";

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
    "Senior Frontend Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
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
      "5+ years building fast, accessible, large-scale frontend applications with React, Next.js & TypeScript.",
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description:
      "Senior Frontend Engineer — React, Next.js & TypeScript. 5+ years shipping large-scale enterprise UIs.",
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
    <html lang="en" data-theme="dark">
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
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
