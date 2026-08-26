// Central content source for the portfolio. Update this file to change the site.

export const profile = {
  name: "Piyush Rajput",
  role: "Senior Frontend Engineer",
  headline:
    "Senior Frontend Engineer @ Publicis Sapient — React / Next.js / TypeScript",
  tagline:
    "I make the web feel fast, clean, and effortless — and maintainable for the engineers who come after me.",
  location: "Pune, Maharashtra, India",
  email: "piyushrajput1846@gmail.com",
  openToWork: true,
  yearsExperience: "5+",
  resume: "/Piyush_Rajput_Resume.pdf",
  photo: "/piyush.jpg",
  socials: {
    linkedin: "https://www.linkedin.com/in/impiyushrrajput",
    portfolio: "https://piyushrajput.netlify.app",
  },
  summary: [
    "I've spent the last 5+ years making the web feel fast, clean, and effortless for users — and maintainable for the engineers who come after me.",
    "Currently a Senior Experience Engineer at Publicis Sapient, where I build large-scale frontend applications using React, TypeScript, and Next.js for enterprise clients like CPPIB and Lloyds Banking Group.",
    "I'm known for writing tests first, building reusable component libraries and custom hooks, standing up React/Next.js projects from scratch (CI/CD included), and turning complex data into clear visualizations.",
    "Currently exploring AI Engineering alongside my frontend work, with hands-on RAG/LLM integration experience from the CPPIB Knowledge Initiative project.",
  ],
};

export const stats = [
  { value: "5+", label: "Years of experience" },
  { value: "15+", label: "Products shipped" },
  { value: "3", label: "Enterprise clients" },
  { value: "1L+", label: "Docs searchable via RAG UI" },
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
    role: "Senior Experience Engineer",
    company: "Publicis Sapient",
    period: "Jul 2024 – Present",
    meta: "2 yrs 2 mos · Pune, India · Hybrid",
    points: [
      "Built the frontend for Knowledge Initiative (KI), a RAG-based Q&A platform for CPPIB, enabling natural language search across 1 lakh+ private documents.",
      "Leading frontend modernization for Lloyds Banking Group's Colleague Channels Platform, migrating legacy systems to a microfrontend architecture used by thousands of internal bank employees.",
      "Established BDD/TDD practices using Jest, Cucumber JS, and Playwright, reducing regression defects across UI layers.",
      "Mentored junior engineers on testing and component design, reducing PR review cycles.",
    ],
    skills: ["React", "TypeScript", "Redux Toolkit", "Jest", "Microfrontends"],
  },
  {
    role: "Software Engineer",
    company: "iBase-t",
    period: "Sep 2023 – Jul 2024",
    meta: "11 mos · Pune, India · Remote",
    points: [
      "Built and maintained the frontend for Solumina I-Series, a cloud-native Manufacturing Operations Platform used by Aerospace & Defense and medical device manufacturers.",
      "Expanded unit test coverage across critical user workflows using React Testing Library and Jest, reducing production bugs in high-stakes operational UIs.",
      "Collaborated in a fully remote team to ship frontend improvements on tight delivery cycles, consistently meeting sprint commitments.",
    ],
    skills: ["React", "Redux", "Jest", "React Testing Library"],
  },
  {
    role: "Software Development Engineer 1",
    company: "ScaleReal Technologies",
    period: "Nov 2020 – Sep 2023",
    meta: "2 yrs 11 mos · Pune, India · Remote",
    points: [
      "Built and launched UIs for 6+ client products including TangoRx (healthtech), Lodgistics (hospitality SaaS), and DealSafe (fintech escrow platform).",
      "Implemented complex data visualizations using Nivo graphs and AG Grid for admin dashboards, reducing time-to-insight for operations teams.",
      "Set up 3+ React/Next.js projects from scratch, including GitHub Actions CI/CD, styled-components design systems, and Apollo Client GraphQL integrations.",
      "Contributed to the open-source civic project JalgaonCoHelp during COVID-19, adding multilingual support and custom UI components used by thousands.",
    ],
    skills: ["Next.js", "TypeScript", "styled-components", "Jest", "GraphQL"],
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
      "Leading frontend modernization of the internal platform used by branch staff, contact centre agents, and lending teams. Migrating legacy monolithic systems (MCA, PBS) to a microfrontend architecture with iframe-based sub-apps and secure token-based auth context.",
    tech: ["React", "TypeScript", "Microfrontends", "Auth"],
    featured: true,
  },
  {
    name: "Knowledge Initiative (KI)",
    period: "Jan 2025 – Jul 2025",
    org: "Publicis Sapient · CPPIB",
    description:
      "Built the frontend for a RAG-based internal Q&A platform that lets employees query 1 lakh+ private documents across isolated knowledge bases (Legal, Finance, HR) using natural language. Built the streaming chat UI, knowledge base selector, and admin dashboard, and integrated them with LangChain, a vector DB, and AWS Athena.",
    tech: ["React", "LangChain", "VectorDB", "Streaming UI", "Athena"],
    featured: true,
  },
  {
    name: "Solumina I-Series",
    period: "Sep 2023 – Jul 2024",
    org: "iBase-t",
    description:
      "Built frontend modules for a cloud-native Manufacturing Operations Platform serving Aerospace & Defense and medical device manufacturers, covering MES, SQM, MRO, and EQMS workflows.",
    tech: ["React", "Redux", "Lerna.js", "Jest", "RTL"],
    featured: true,
  },
  {
    name: "Lodgistics",
    period: "Nov 2022 – Apr 2023",
    org: "ScaleReal Technologies",
    description:
      "A cloud-based hotel operations software that optimizes business processes and lowers expenses.",
    tech: ["React", "Redux-Saga", "styled-components", "Material UI"],
    link: "https://lodgistics.com",
    featured: true,
  },
  {
    name: "TangoRx",
    period: "May 2021 – Aug 2022",
    org: "ScaleReal Technologies",
    description:
      "Platform for the US federal 340B drug price control program, allowing qualifying providers serving uninsured/low-income patients in rural communities to purchase outpatient drugs at discounted prices.",
    tech: ["React", "TypeScript", "Redux-Saga", "AWS Lambda", "Postgres"],
    link: "https://www.tangorxsolutions.com",
    featured: true,
  },
  {
    name: "DealSafe",
    period: "Feb 2021 – May 2021",
    org: "ScaleReal Technologies",
    description:
      "India's first platform to build trust between transacting entities via a secure, guaranteed escrow payment system.",
    tech: ["React", "Django", "GraphQL", "AWS", "Docker"],
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
};

export const education: EducationItem[] = [
  {
    school: "D.Y. Patil College of Engineering, Pune",
    degree: "Bachelor of Engineering (BE)",
    field: "Information Technology",
    period: "2018 – 2021",
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
    date: "Jan 2025",
    link: "https://marcel.ai/plai?certID=61945",
  },
  {
    title: "Using Gen AI — Text",
    issuer: "Publicis Groupe",
    date: "Jan 2025",
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
    title: "Core",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS"],
  },
  {
    title: "State & Data",
    items: [
      "Redux Toolkit",
      "Redux Saga",
      "REST APIs",
      "GraphQL",
      "Apollo Client",
      "JSON",
    ],
  },
  {
    title: "Testing",
    items: [
      "Jest",
      "React Testing Library",
      "Playwright",
      "Cucumber (BDD)",
      "TDD",
    ],
  },
  {
    title: "Architecture & Tooling",
    items: [
      "Microfrontends",
      "styled-components",
      "Webpack",
      "Babel",
      "Lerna.js",
      "Git / GitHub",
      "CI/CD",
    ],
  },
  {
    title: "Data Viz & UI",
    items: ["Nivo Charts", "AG Grid", "Material UI", "Responsive Design", "UI/UX"],
  },
  {
    title: "AI Engineering",
    items: ["LangChain", "VectorDB", "RAG", "LLM Integration", "Amazon Athena"],
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
