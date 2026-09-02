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
  resume: "/Piyush_Rajput_Resume.pdf",
  photo: "/piyush.jpg",
  socials: {
    linkedin: "https://www.linkedin.com/in/impiyushrrajput",
    github: "https://github.com/imPiyushrRajput",
    portfolio: "https://piyushrajput.netlify.app",
  },
  summary: [
    "Senior Frontend Engineer with nearly 6 years of experience building enterprise web applications across banking, fintech, healthcare, and manufacturing.",
    "Currently at Publicis Sapient, delivering frontend for Lloyds Banking Group's Colleague Channels Platform in a microfrontend architecture with React, TypeScript, and Redux Toolkit.",
    "Previously built the frontend for a production RAG system at CPPIB — integrating LangChain, a vector DB, and AWS Athena into a streaming chat interface.",
    "Along the way I've stood up frontends from scratch, restructured codebases into feature-based monorepos, built reusable component and forms libraries, and pushed Lighthouse scores from the 50s into the 90s.",
  ],
};

export const stats = [
  { value: "~6", label: "Years of experience" },
  { value: "4", label: "Industries" },
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
    role: "Senior Experience Engineer (Frontend)",
    company: "Publicis Sapient",
    period: "Jul 2024 – Present",
    meta: "2 yrs 2 mos · Pune, India · Hybrid",
    points: [
      "Delivered frontend across two enterprise engagements — Knowledge Initiative (KI) for CPPIB, then CCP for Lloyds Banking Group — owning end-to-end delivery on each.",
      "Built a shared page consumed by every journey on the CCP platform, delivered via Module Federation and integrated with each owning team.",
      "Own assigned journeys and features from UI through state management, API integration, and tests, working alongside backend, ML, and QE teams.",
    ],
    skills: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Module Federation",
    ],
  },
  {
    role: "Software Engineer",
    company: "iBase-t",
    period: "Sep 2023 – Jul 2024",
    meta: "10 mos · Pune, India",
    points: [
      "Delivered frontend features for Solumina I-Series, iBase-t's manufacturing operations platform for Aerospace & Defense and medical device clients.",
      "Restructured a large codebase into 40+ monorepo packages organized by feature module, so feature teams could build and deploy independently.",
    ],
    skills: ["React", "Redux", "Lerna.js", "Jest", "React Testing Library"],
  },
  {
    role: "Software Engineer",
    company: "ScaleReal Technologies",
    period: "Nov 2020 – Sep 2023",
    meta: "2 yrs 10 mos · Pune, India",
    points: [
      "Delivered production frontends across three client products in hospitality, healthcare, and fintech — from greenfield setup through ongoing feature work.",
      "Built responsive web applications following Atomic Design and TDD within Agile/Scrum teams.",
      "Took Lighthouse/PageSpeed scores from the 50s into the 90s through lazy-loading, asset compression, and deferring non-critical JS.",
    ],
    skills: ["React", "TypeScript", "Redux", "Redux-Saga", "styled-components"],
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
      "Building journeys on Lloyds Banking Group's internal platform used daily by branch staff and contact centre agents, where each journey ships as an independent microfrontend. Built a shared page used across every journey via Module Federation, owned the Profile, Make Payments, and Pending Payments journeys — including the multi-step payment flow with Review, Success, Error, Blocked, and Cancelled states — and handled state and data fetching with Redux Toolkit and RTK Query.",
    tech: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Microfrontends",
      "Module Federation",
    ],
    featured: true,
  },
  {
    name: "Knowledge Initiative (KI)",
    period: "Jan 2025 – Jul 2025",
    org: "Publicis Sapient · CPPIB",
    description:
      "Built a streaming chat UI for CPPIB that lets users query 100,000+ private documents across isolated knowledge bases (Legal, Finance, HR) in plain English — real-time token streaming, a keyboard-navigable knowledge-base picker (selector + '/' slash-command), conversation history with cursor-based pagination and react-window virtualization, export-to-PDF and share actions, and an admin dashboard. Integrated with RAG backend APIs (LangChain, vector DB, AWS Athena).",
    tech: ["React", "TypeScript", "Redux", "Streaming UI", "RAG APIs"],
    featured: true,
  },
  {
    name: "Solumina I-Series",
    period: "Sep 2023 – Jul 2024",
    org: "iBase-t",
    description:
      "Built frontend modules for iBase-t's cloud-native manufacturing platform across MES, SQM, MRO, and EQMS — including inspection-planning and non-conformance screens. Built an internal JSON-schema forms library that renders form fields from a schema (cutting repetitive form code across modules), and surfaced ERP/PLM-sourced records over REST with sync and error handling.",
    tech: ["React", "Redux", "Lerna.js", "Jest", "RTL"],
    featured: true,
  },
  {
    name: "Lodgistics",
    period: "Nov 2022 – Apr 2023",
    org: "ScaleReal Technologies",
    description:
      "Built the Guest Connect messaging feature end-to-end — Twilio SMS plus Action Cable (WebSockets) so hotel staff saw guest messages arrive live without refreshing — and the task-management UI for assigning tasks, tracking status to completion, and handing off open items between shifts. Wrote unit and integration tests across both workflows.",
    tech: ["React", "Redux", "Material UI", "Jest", "RTL"],
    link: "https://lodgistics.com",
    featured: true,
  },
  {
    name: "TangoRx",
    period: "May 2021 – Aug 2022",
    org: "ScaleReal Technologies",
    description:
      "Built patient-management and pharmacy-workflow screens supporting US federal 340B compliance, integrating with a Kotlin/Postgres backend on AWS Lambda. Built the reporting dashboard with Nivo charts, wiring async data through Redux Sagas and 8+ custom hooks and HOCs, and worked across 20+ modules of the healthcare platform.",
    tech: ["React", "TypeScript", "Redux-Saga", "styled-components", "Jest"],
    link: "https://www.tangorxsolutions.com",
    featured: true,
  },
  {
    name: "DealSafe",
    period: "Feb 2021 – May 2021",
    org: "ScaleReal Technologies",
    description:
      "Built the escrow-flow UI across the full deal lifecycle — funds in escrow, in transit, disputed, released — handling edge cases like frozen funds during disputes and inspection timers auto-releasing. Set up the frontend architecture from scratch (Webpack, Babel, routing, a Redux-Saga async layer scaling to 15+ modules) and adopted GraphQL to cut overfetching, integrating a Django/Postgres backend across web and Flutter.",
    tech: ["React", "TypeScript", "GraphQL", "Redux-Saga", "styled-components"],
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
      "Jest",
      "React Testing Library",
      "styled-components",
      "Material UI",
    ],
  },
  {
    title: "Architecture",
    items: [
      "Microfrontends",
      "Module Federation",
      "Monorepo",
      "Atomic Design",
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
    items: ["REST APIs", "GraphQL", "WebSockets"],
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
      "GitHub Actions CI/CD",
      "Webpack",
      "Babel",
      "Agile",
      "Scrum",
    ],
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
