export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: 'Full Stack' | 'AI & ML' | 'Cloud & System';
  image: string;
  tags: string[];
  stars: number;
  featured: boolean;
  demoUrl: string;
  githubUrl: string;
  metrics: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: number; icon: string; highlight?: boolean }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
  featured?: boolean;
}

export interface Profile {
  name: string;
  title: string;
  roleTitle: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  status: string;
  github: string;
  linkedin: string;
  twitter: string;
  siteUrl: string;
  yearsExperience: number;
  completedProjects: number;
  happyClients: number;
  openSourceContributions: string;
}

export const profileData: Profile = {
  name: "Alex Rivera",
  title: "Senior Full Stack & AI Systems Architect",
  roleTitle: "Senior Full Stack Engineer",
  bio: "Specializing in Next.js, React, TypeScript, and AI integrations. I engineer high-performance, SEO-friendly, scalable web applications that deliver exceptional user experiences.",
  location: "San Francisco, CA (Available Remote Worldwide)",
  email: "alex.rivera.dev@example.com",
  phone: "+1 (555) 234-5678",
  status: "🟢 Available for full-time roles & high-impact consulting",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  siteUrl: "https://alexrivera.dev",
  yearsExperience: 8,
  completedProjects: 45,
  happyClients: 30,
  openSourceContributions: "1.2k+"
};

export const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "NeuroCraft AI Workspace",
    slug: "neurocraft-ai-workspace",
    description: "Enterprise multi-agent AI collaboration platform built with Next.js App Router, WebSockets, and OpenAI API.",
    longDescription: "NeuroCraft AI Workspace is an end-to-end multi-agent orchestration engine. It enables cross-functional teams to automate document synthesis, intelligent search, and autonomous workflow triggers. Designed with server-side rendering for optimal SEO and rapid initial paint times.",
    category: "AI & ML",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    tags: ["Next.js 15", "TypeScript", "OpenAI API", "Tailwind CSS", "WebSockets", "Prisma"],
    stars: 342,
    featured: true,
    demoUrl: "https://example.com/demo/neurocraft",
    githubUrl: "https://github.com/example/neurocraft",
    metrics: [
      { label: "Latency", value: "< 120ms" },
      { label: "Active Users", value: "25K+" },
      { label: "Lighthouse Score", value: "99/100" }
    ]
  },
  {
    id: "proj-2",
    title: "HyperScale E-Commerce Platform",
    slug: "hyperscale-ecommerce",
    description: "Ultra-fast headless e-commerce frontend optimized for Google Core Web Vitals, dynamic SSR, and global edge CDN caching.",
    longDescription: "Architected a high-traffic headless commerce store processing thousands of checkout requests per minute. Features localized currency conversions, structured product schema (JSON-LD), automated XML sitemaps, and seamless Stripe integration.",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop",
    tags: ["Next.js", "GraphQL", "Stripe API", "Redis", "Tailwind CSS", "PostgreSQL"],
    stars: 289,
    featured: true,
    demoUrl: "https://example.com/demo/hyperscale",
    githubUrl: "https://github.com/example/hyperscale",
    metrics: [
      { label: "Conversion Rate Boost", value: "+38%" },
      { label: "First Contentful Paint", value: "0.4s" },
      { label: "Google SEO Rating", value: "100/100" }
    ]
  },
  {
    id: "proj-3",
    title: "CloudPulse Infra Telemetry",
    slug: "cloudpulse-infra-telemetry",
    description: "Real-time cloud resource monitoring and anomaly detection dashboard with interactive WebGL visualizations.",
    longDescription: "CloudPulse monitors server health metrics, Docker cluster logs, and microservice traffic across AWS and GCP infrastructure. Includes predictive outage warnings using lightweight time-series forecasting models.",
    category: "Cloud & System",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    tags: ["React", "TypeScript", "Node.js", "Docker", "TimescaleDB", "Chart.js"],
    stars: 195,
    featured: true,
    demoUrl: "https://example.com/demo/cloudpulse",
    githubUrl: "https://github.com/example/cloudpulse",
    metrics: [
      { label: "Metrics Processed", value: "5M+/day" },
      { label: "Uptime Guaranteed", value: "99.99%" },
      { label: "Memory Footprint", value: "< 45MB" }
    ]
  },
  {
    id: "proj-4",
    title: "VividVision Video Studio",
    slug: "vividvision-video-studio",
    description: "Browser-based WebAssembly video editor with zero-latency frame scrubbing, text overlays, and direct YouTube export.",
    longDescription: "Leveraged WebAssembly (FFmpeg.wasm) and React state management to execute client-side video transcode and editing entirely inside modern browsers without server render costs.",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
    tags: ["Next.js", "WebAssembly", "FFmpeg", "Canvas API", "Tailwind CSS"],
    stars: 412,
    featured: false,
    demoUrl: "https://example.com/demo/vividvision",
    githubUrl: "https://github.com/example/vividvision",
    metrics: [
      { label: "Render Speed", value: "3x Native" },
      { label: "Client Processing", value: "100%" }
    ]
  },
  {
    id: "proj-5",
    title: "SyntaxFlow RAG Search Engine",
    slug: "syntaxflow-rag-search",
    description: "Semantic code search engine using vector embeddings and LangChain for developer documentation discovery.",
    longDescription: "Indexes public repository documentation into Pinecone vector storage to deliver sub-second natural language answers for API integration queries with instant code snippet context.",
    category: "AI & ML",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    tags: ["Next.js", "Python", "LangChain", "Pinecone", "Tailwind CSS"],
    stars: 520,
    featured: false,
    demoUrl: "https://example.com/demo/syntaxflow",
    githubUrl: "https://github.com/example/syntaxflow",
    metrics: [
      { label: "Query Time", value: "85ms" },
      { label: "Accuracy", value: "96.4%" }
    ]
  },
  {
    id: "proj-6",
    title: "DevMetrics SEO Analytics",
    slug: "devmetrics-seo-analytics",
    description: "Automated Core Web Vitals and meta schema auditing tool built for Next.js and static site generators.",
    longDescription: "A developer tool that continuously audits web pages for structured data compliance, missing dynamic OpenGraph images, accessibility contrast issues, and canonical URL misconfigurations.",
    category: "Cloud & System",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    tags: ["Node.js", "Puppeteer", "Next.js", "TypeScript", "Tailwind CSS"],
    stars: 210,
    featured: false,
    demoUrl: "https://example.com/demo/devmetrics",
    githubUrl: "https://github.com/example/devmetrics",
    metrics: [
      { label: "Pages Audited", value: "100k+" },
      { label: "Rules Checked", value: "48 Core SEO Rules" }
    ]
  }
];

export const skillCategoriesData: SkillCategory[] = [
  {
    title: "Frontend & Web Architectures",
    iconName: "Layout",
    skills: [
      { name: "Next.js (App Router, Server Actions)", level: 98, icon: "Code2", highlight: true },
      { name: "React 19 & Concurrent Mode", level: 96, icon: "Atom", highlight: true },
      { name: "TypeScript & Strict Typing", level: 95, icon: "FileCode", highlight: true },
      { name: "Tailwind CSS & Design Systems", level: 94, icon: "Palette" },
      { name: "Google Core Web Vitals & Technical SEO", level: 98, icon: "Search", highlight: true },
      { name: "State Management (Zustand, React Query)", level: 90, icon: "Layers" }
    ]
  },
  {
    title: "Backend, APIs & Databases",
    iconName: "Server",
    skills: [
      { name: "Node.js & Express / NestJS", level: 92, icon: "Server", highlight: true },
      { name: "PostgreSQL & Prisma / Drizzle ORM", level: 90, icon: "Database", highlight: true },
      { name: "GraphQL & RESTful API Design", level: 88, icon: "GitBranch" },
      { name: "Redis Caching & Pub/Sub", level: 86, icon: "Zap" },
      { name: "Vector Databases (Pinecone, pgvector)", level: 85, icon: "Cpu", highlight: true }
    ]
  },
  {
    title: "AI Integration & Machine Learning",
    iconName: "Sparkles",
    skills: [
      { name: "LLM API Orchestration (OpenAI, Anthropic)", level: 94, icon: "Bot", highlight: true },
      { name: "LangChain & LlamaIndex RAG Pipelines", level: 88, icon: "Workflow", highlight: true },
      { name: "Fine-tuning & Prompt Engineering", level: 90, icon: "Wand2" },
      { name: "Vector Embeddings & Semantic Search", level: 89, icon: "Compass" }
    ]
  },
  {
    title: "DevOps, Cloud & Infrastructure",
    iconName: "Cloud",
    skills: [
      { name: "Vercel Edge Platform & Serverless", level: 95, icon: "Globe", highlight: true },
      { name: "Docker & Containerization", level: 88, icon: "Box" },
      { name: "AWS (S3, CloudFront, ECS, Lambda)", level: 86, icon: "CloudSun" },
      { name: "CI/CD (GitHub Actions, Automated Testing)", level: 90, icon: "ShieldCheck" }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Lead Full Stack & AI Architect",
    company: "Apex Tech Labs",
    location: "San Francisco, CA",
    period: "2023 — Present",
    description: [
      "Architected Next.js 15 enterprise SaaS application serving over 250,000 active monthly users with sub-second page loads.",
      "Engineered automated JSON-LD structured data engine and dynamic OpenGraph image generator that boosted organic search traffic by +145%.",
      "Led a team of 8 engineers across frontend performance tuning, backend microservices, and AI RAG pipeline deployments.",
      "Achieved 100/100 Google Lighthouse ratings across Performance, SEO, Accessibility, and Best Practices."
    ],
    skills: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS", "PostgreSQL", "AWS", "SEO"],
    featured: true
  },
  {
    id: "exp-2",
    role: "Senior Frontend Engineer & SEO Lead",
    company: "Veloce Digital Interactive",
    location: "Remote",
    period: "2021 — 2023",
    description: [
      "Spearheaded migration from legacy monolith to Next.js App Router, reducing bundle payload by 52%.",
      "Implemented comprehensive technical SEO practices including dynamic XML sitemaps, robots.txt, canonical tag orchestration, and meta tags.",
      "Designed and deployed reusable UI component library used across 12 product surface areas."
    ],
    skills: ["React", "Next.js", "GraphQL", "Tailwind CSS", "Web Vitals", "Jest"],
    featured: true
  },
  {
    id: "exp-3",
    role: "Full Stack Software Engineer",
    company: "Nexus Cloud Solutions",
    location: "Austin, TX",
    period: "2018 — 2021",
    description: [
      "Built real-time telemetry dashboards monitoring 50,000+ cloud instances with WebSockets and Node.js microservices.",
      "Optimized PostgreSQL query performance, cutting average database response latency from 450ms down to 32ms."
    ],
    skills: ["Node.js", "React", "PostgreSQL", "Docker", "Redis", "REST APIs"]
  }
];
