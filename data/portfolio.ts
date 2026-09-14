// Central content source for the portfolio. Update this file to change the site.

export const profile = {
  name: "Piyush Rajput",
  role: "Senior Frontend Engineer",
  headline:
    "Senior Frontend Engineer @ Publicis Sapient — React / TypeScript / Redux Toolkit",
  tagline:
    "I make the web feel fast, clean, and effortless — and maintainable for the engineers who come after me.",
  location: "Pune, Maharashtra, India",
  email: "piyushrajput1846@gmail.com",
  openToWork: true,
  yearsExperience: "~6",
  resume: "/Piyush_Rajput_Resume.pdf?v=941d7951",
  photo: "/piyush.jpg",
  socials: {
    linkedin: "https://www.linkedin.com/in/impiyushrrajput",
    github: "https://github.com/imPiyushrRajput",
    portfolio: "https://piyushrajput.netlify.app",
  },
  summary: [
    "Senior Frontend Engineer with nearly 6 years building large-scale React and TypeScript applications for enterprise clients across banking, fintech, healthcare, and manufacturing.",
    "Currently leading frontend delivery for Lloyds Banking Group at Publicis Sapient in a microfrontend architecture with React, TypeScript, and Redux Toolkit.",
    "Built the frontend for a production RAG system at CPPIB — an SSE-based streaming chat wiring LangChain, a vector DB, and AWS Athena into the UI, used by 14,000+ employees across 25+ knowledge bases.",
    "Along the way I've stood up frontends from scratch, co-owned a schema-driven forms library, mentored junior engineers through code review, and pushed Lighthouse scores from the 50s into the 90s.",
  ],
};

export const stats = [
  { value: "~6", label: "Years of experience" },
  { value: "14K+", label: "Employees reached (RAG)" },
  { value: "18", label: "Projects shipped" },
  { value: "100K+", label: "Docs searchable via RAG UI" },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  meta: string;
  points: string[];
  skills: string[];
};

export const experiences: Experience[] = [
  {
    role: "Senior Frontend Engineer",
    company: "Publicis Sapient",
    period: "Jul 2024 – Present",
    meta: "2 yrs 3 mos · Pune, India · Hybrid",
    points: [
      "Delivered frontend across two enterprise engagements — Knowledge Initiative (CPPIB) and CCP (Lloyds Banking Group) — owning end-to-end delivery on each.",
      "Engineered the KI chat interface on Server-Sent Events, rendering tokens as they streamed rather than waiting on full responses — for 14,000+ users querying 100,000+ documents across 25+ knowledge bases.",
      "Architected the CCP payment flow from scratch — discrete Payment, Review, and Success steps with explicit Error, Blocked, and Cancelled states — so colleagues confirm details before committing and every failure path has a defined outcome.",
      "Mentored 2–3 junior engineers through code review, guiding component design, state handling, and testing practices.",
    ],
    skills: ["React", "TypeScript", "Redux Toolkit", "RTK Query", "SSE"],
  },
  {
    role: "Software Engineer",
    company: "iBase-t",
    period: "Sep 2023 – Jul 2024",
    meta: "11 mos · Pune, India · Remote",
    points: [
      "Co-owned an internal JSON schema-driven form library adopted as the form layer across 4 modules of Solumina I-Series, used by 8–10 teams — new screens ship as configuration, reducing custom UI code.",
      "Supported consuming teams — reviewed schema usage, coordinated version upgrades, and served as the point of contact for issues raised against the package.",
    ],
    skills: ["React", "Redux", "JSON Schema", "Storybook", "Jest"],
  },
  {
    role: "Software Engineer",
    company: "ScaleReal Technologies",
    period: "Nov 2020 – Sep 2023",
    meta: "2 yrs 11 mos · Pune, India · Remote",
    points: [
      "Shipped production frontends across 3 client products (hospitality, healthcare, fintech), from greenfield setup through ongoing feature work.",
      "Developed responsive web applications following Atomic Design and TDD within Agile/Scrum teams.",
      "Improved Lighthouse/PageSpeed scores from the 50s to 90s+ through lazy-loading, asset compression, and deferred non-critical JS.",
    ],
    skills: ["React", "TypeScript", "Redux", "GraphQL", "styled-components"],
  },
];

export type Project = {
  name: string;
  period: string;
  org?: string;
  description: string;
  tech: string[];
  link?: string;
  featured?: boolean;
  personal?: boolean;
};

export const projects: Project[] = [
  {
    name: "CCP — Colleague Channels Platform",
    period: "Jul 2025 – Present",
    org: "Publicis Sapient · Lloyds Banking Group",
    description:
      "An internal platform used daily by branch staff and contact center agents at Lloyds Banking Group, where each journey is deployed as an independent microfrontend. Owned the Profile, Make Payments, and Pending Payments journeys on it, built with the internal component library. Architected the multi-step payment flow end-to-end from scratch — Payment, Review, and Success steps plus explicit Error, Blocked, and Cancelled states — so colleagues confirm details before committing, with every failure path handled rather than a dead end. Implemented the Pending Payments view (filtering, sorting, and search across up to 100 records, kept responsive via pagination), managed state and data fetching with Redux Toolkit and RTK Query, and wrote unit and integration tests alongside QE's Playwright/Cucumber coverage.",
    tech: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Microfrontends",
      "Internal Component Library",
    ],
    featured: true,
  },
  {
    name: "Knowledge Initiative (KI)",
    period: "Jan 2025 – Jul 2025",
    org: "Publicis Sapient · CPPIB",
    description:
      "Built a streaming chat UI for CPPIB across 100,000+ private documents — chose Server-Sent Events over request-response polling so tokens render as they're generated instead of waiting on a full completion. Added a keyboard-navigable knowledge-base picker (selector + '/' slash-command) for switching between 25+ isolated knowledge bases (Legal, Finance, HR), a conversation-history sidebar with cursor-based pagination and react-window virtualization, export-to-PDF and share actions (among the most-used features per team feedback), and an admin dashboard surfacing ingestion status and PDF counts. Integrated with RAG backend APIs (LangChain, vector DB, AWS Athena).",
    tech: [
      "React",
      "TypeScript",
      "Redux",
      "REST APIs",
      "SSE",
      "LangChain",
      "Vector DB",
      "AWS Athena",
    ],
    featured: true,
  },
  {
    name: "Solumina I-Series",
    period: "Sep 2023 – Jul 2024",
    org: "iBase-t",
    description:
      "iBase-t's manufacturing operations platform for Aerospace & Defense clients. Co-owned an internal JSON-schema-driven form library — a single renderer mapping schema field types to React components, with conditional visibility, dependent fields, and declarative validation, so new screens shipped as configuration rather than hand-written JSX. Handled nested and repeatable field groups via recursive rendering (one schema describing a full multi-section inspection form), published it as a versioned package to a private npm registry adopted as the app's form layer, documented components in Storybook for consuming teams, and shipped product screens on top of it.",
    tech: [
      "React",
      "Redux",
      "JSON Schema",
      "Storybook",
      "Jest",
      "RTL",
      "Private npm Registry",
      "GitLab",
    ],
    featured: true,
  },
  {
    name: "Lodgistics",
    period: "Nov 2022 – Apr 2023",
    org: "ScaleReal Technologies",
    description:
      "Hospitality SaaS for hotel operations. Built the Guest Connect messaging feature end-to-end — Twilio SMS plus Action Cable (WebSockets) so hotel staff saw guest messages arrive live without refreshing — and the task-management UI for assigning tasks, tracking status to completion, and handing off open items between shifts. Wrote unit and integration tests across both workflows.",
    tech: [
      "React",
      "Redux",
      "Material UI",
      "Twilio",
      "Action Cable (WebSockets)",
      "Jest",
      "RTL",
    ],
    link: "https://lodgistics.com",
    featured: true,
  },
  {
    name: "TangoRx",
    period: "May 2021 – Aug 2022",
    org: "ScaleReal Technologies",
    description:
      "Healthtech platform supporting US Federal 340B pharmacy compliance. Engineered patient-management and pharmacy-workflow screens, integrating with a Kotlin/Postgres backend, and assembled the reporting dashboard with Nivo charts. Developed 8+ custom hooks and HOCs and handled data fetching via Axios over REST APIs across 20+ modules — shipping new features, fixing production issues, and maintaining existing screens.",
    tech: [
      "React",
      "TypeScript",
      "Redux",
      "Axios",
      "REST APIs",
      "Nivo",
      "styled-components",
      "Jest",
    ],
    link: "https://www.tangorxsolutions.com",
    featured: true,
  },
  {
    name: "DealSafe",
    period: "Feb 2021 – May 2021",
    org: "ScaleReal Technologies",
    description:
      "Fintech escrow platform — internal admin application. Built pages for managing deals, customers, transactions, and users — including a timeline view showing where each deal sat in the escrow lifecycle. Added the reporting section with Ant Design charts surfacing deal, customer, and transaction data for the operations team. Wrote unit and integration tests across the admin pages, consuming GraphQL APIs backed by Django and Postgres.",
    tech: [
      "React",
      "TypeScript",
      "GraphQL",
      "Apollo Client",
      "Redux",
      "Ant Design",
      "styled-components",
    ],
    link: "https://www.dealsafe.in",
    featured: true,
  },
  {
    name: "JalgaonCoHelp — COVID-19 Resources",
    period: "Apr 2021 – May 2021",
    org: "Open Source",
    description:
      "Crowdsourced civic app to fight COVID across Jalgaon District — helping thousands find hospital beds, oxygen, and plasma. Added multilingual support and custom UI components.",
    tech: ["React", "Redux", "TypeScript"],
    link: "https://jalgaoncohelp.in",
    personal: true,
  },
  {
    name: "GoSafe — Emergency Safety Services",
    period: "Jan 2020 – Apr 2021",
    org: "D. Y. Patil College of Engineering",
    description:
      "Real-time safety app: a mobile app for citizens plus a web app for police to report incidents. Published a research paper on the system.",
    tech: ["React", "Firebase", "Node.js", "Flutter"],
    link: "https://www.irjet.net/archives/V8/i4/IRJET-V8I4315.pdf",
    personal: true,
  },
  {
    name: "mySustain Online",
    period: "Apr 2021 – Jun 2021",
    org: "ScaleReal Technologies",
    description:
      "Curated learning platform migrated from bare-metal servers to AWS, integrated with the OpenEdx LMS.",
    tech: ["JavaScript", "Ruby on Rails", "MongoDB"],
    link: "https://www.mysustainonline.com",
  },
  {
    name: "GraysonSky",
    period: "Aug 2023 – Sep 2023",
    org: "ScaleReal Technologies",
    description:
      "A web product built at ScaleReal Technologies with a Next.js frontend and a styled-components design system.",
    tech: ["Next.js", "React", "styled-components"],
    link: "https://graysonsky.com/",
  },
  {
    name: "Cytess",
    period: "Aug 2022 – Nov 2022",
    org: "ScaleReal Technologies",
    description:
      "A client web platform delivered at ScaleReal Technologies.",
    tech: ["React"],
    link: "https://www.cytess.com",
  },
  {
    name: "Noobstorm",
    period: "Apr 2023 – Aug 2023",
    org: "ScaleReal Technologies",
    description:
      "A client product delivered at ScaleReal Technologies.",
    tech: ["React"],
  },
  {
    name: "Compass Crew",
    period: "May 2023 – Aug 2023",
    org: "ScaleReal Technologies",
    description:
      "A client product delivered at ScaleReal Technologies.",
    tech: ["React"],
  },
  {
    name: "NeelClasses",
    period: "Jul 2020 – Aug 2020",
    org: "Personal Project",
    description:
      "A Udemy-like online learning platform where instructors can publish courses and students can enroll and learn at their own pace.",
    tech: ["React", "Node.js", "Express", "Firebase"],
    link: "https://neelclasses.com",
    personal: true,
  },
  {
    name: "My Vaccine",
    period: "Jan 2021 – Feb 2021",
    org: "Personal Project",
    description:
      "An offline-first mobile app that creates a digital vaccination pass with side-effect tracking and dose reminders.",
    tech: ["React Native"],
    personal: true,
  },
  {
    name: "Portfolio Website (v1)",
    period: "Apr 2020",
    org: "Personal Project",
    description:
      "My first personal portfolio, built to learn data-driven UI with a GraphQL-powered content layer.",
    tech: ["React", "GraphQL", "JavaScript"],
    link: "https://piyushrajput.netlify.app",
    personal: true,
  },
  {
    name: "Realtime Crime Reporting App",
    period: "Jan 2020 – Apr 2020",
    org: "Academic Project",
    description:
      "A cross-platform mobile and web app that lets citizens and police report crimes in real time during emergencies.",
    tech: ["React", "Flutter"],
    personal: true,
  },
  {
    name: "Digital Voting System",
    period: "Dec 2016 – Apr 2017",
    org: "Academic Project",
    description:
      "An Aadhaar-based voting system using fingerprint authentication to prevent duplicate and fraudulent votes.",
    tech: ["Biometrics", "Web"],
    personal: true,
  },
];

export type EducationItem = {
  school: string;
  degree: string;
  field: string;
  period: string;
  detail?: string;
};

export const education: EducationItem[] = [
  {
    school: "D.Y. Patil College of Engineering, Pune",
    degree: "Bachelor of Engineering (BE)",
    field: "Information Technology",
    period: "2018 – 2021",
    detail: "CGPA 8.45 / 10",
  },
  {
    school: "Government Polytechnic Jalgaon",
    degree: "Diploma",
    field: "Information Technology",
    period: "2015 – 2018",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  link?: string;
};

export const certifications: Certification[] = [
  {
    title: "AI Trends — Emerging Technologies: The Very Latest",
    issuer: "Publicis Groupe",
    date: "Mar 2025",
    link: "https://marcel.ai/plai?certID=61945",
  },
  {
    title: "Using Gen AI — Text",
    issuer: "Publicis Groupe",
    date: "Feb 2025",
    link: "https://marcel.ai/plai?certID=58968",
  },
  {
    title: "GenAI — The Basics",
    issuer: "Publicis Groupe",
    date: "Jan 2025",
    link: "https://marcel.ai/plai?certID=58967",
  },
  {
    title: "Interactivity with JavaScript",
    issuer: "Coursera",
    date: "Apr 2020",
    link: "https://www.coursera.org/account/accomplishments/certificate/PVL45DFMDVEH",
  },
  {
    title: "Introduction to CSS3",
    issuer: "Coursera",
    date: "Apr 2020",
    link: "https://www.coursera.org/account/accomplishments/certificate/5S7VTPMYU8L6",
  },
  {
    title: "Introduction to HTML5",
    issuer: "Coursera",
    date: "Apr 2020",
    link: "https://www.coursera.org/account/accomplishments/certificate/V5A3ZZTMJKL3",
  },
];

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Libraries & Frameworks",
    items: [
      "React.js",
      "Next.js",
      "React Native",
      "Redux",
      "Redux Toolkit",
      "RTK Query",
      "Jest",
      "React Testing Library",
      "Storybook",
      "styled-components",
      "Material UI",
      "Ant Design",
      "Nivo",
      "JSON Schema",
    ],
  },
  {
    title: "Architecture",
    items: [
      "Microfrontends",
      "Module Federation",
      "Atomic Design",
      "Design Systems",
      "Component Libraries",
      "Responsive Design",
    ],
  },
  {
    title: "Testing",
    items: [
      "Unit Testing",
      "Integration Testing",
      "TDD",
      "Playwright",
      "Cucumber",
    ],
  },
  {
    title: "Performance",
    items: [
      "Code Splitting",
      "Bundle Optimization",
      "Lighthouse",
      "PageSpeed",
      "Cross-browser Compatibility",
    ],
  },
  {
    title: "APIs & Integration",
    items: [
      "REST APIs",
      "GraphQL",
      "Apollo Client",
      "Axios",
      "WebSockets",
      "Action Cable (WebSockets)",
      "Twilio",
      "Server-Sent Events (SSE)",
    ],
  },
  {
    title: "RAG / AI",
    items: ["LangChain", "Vector DBs", "AWS Athena", "Prompt Engineering"],
  },
  {
    title: "Tools & Workflow",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "GitHub Actions CI/CD",
      "Private npm Registry",
      "Webpack",
      "Babel",
      "Agile",
      "Scrum",
    ],
  },
  {
    title: "Backend & Mobile",
    items: ["Node.js", "Express", "Ruby on Rails", "Flutter", "Firebase"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "Firebase Firestore"],
  },
];

export type Recommendation = {
  name: string;
  title: string;
  date: string;
  quote: string;
};

export const recommendations: Recommendation[] = [
  {
    name: "Abhishek Ghadge",
    title: "Software Engineer",
    date: "May 2024",
    quote:
      "Piyush is an experienced web developer. He has vast knowledge of the latest web technologies like React, Redux, and Next.js. He is exceptionally quick to complete tasks at hand without any errors, and is a really good pair programmer.",
  },
  {
    name: "Sandesh Bodke",
    title: "Full-Stack Developer, Atlassian",
    date: "Sep 2022",
    quote:
      "Piyush is my go-to person for all frontend-related tasks. I worked with him for a couple of years, and on top of being a great engineer, he is also an easy-going person. I definitely recommend Piyush to any job.",
  },
  {
    name: "Tajwinder Singh",
    title: "SDE-I @ Medly, Frontend/ReactJS",
    date: "Jul 2022",
    quote:
      "Piyush is a quick learner and a very good developer. He has good knowledge of frontend technologies. He is a team player with a very helpful, humble, and down-to-earth attitude. I enjoy working with him.",
  },
  {
    name: "Krishna Khandagale",
    title: "Frontend Enthusiast",
    date: "Jul 2022",
    quote:
      "Piyush is a great team player with a let's-do-it attitude. Always ready to take on challenges, he brings a positive attitude and strong technical depth that make him a commendable developer. I highly recommend Piyush.",
  },
];

export const languages = [
  { name: "English", level: "Professional working" },
  { name: "Hindi", level: "Full professional" },
  { name: "Marathi", level: "Native / bilingual" },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#recommendations", label: "Recommendations" },
  { href: "#contact", label: "Contact" },
];
