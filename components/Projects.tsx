"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, Layers, Database, Cpu, Sparkles, Terminal, Shield, Zap } from "lucide-react";
import { GithubIcon } from "@/components/icons";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlights: string[];
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics: string;
  gradient: string;
}

const PROJECTS: Project[] = [
  {
    id: "cinematic-developer-portfolio-2026",
    title: "Cinematic Scrollytelling Portfolio",
    subtitle: "Award-Winning Inspired Interactive Developer Portfolio",
    category: "Frontend Engineering",
    description:
      "An open-source cinematic developer portfolio built with Next.js 16, featuring 60 FPS HTML5 Canvas image-sequence scrubbing, immersive scroll storytelling, premium typography, and production-ready responsive design inspired by modern Awwwards experiences.",
    highlights: [
      "60 FPS HTML5 Canvas image-sequence scrollytelling engine",
      "Framer Motion powered cinematic transitions with film-grain overlays",
      "Fully customizable portfolio architecture with responsive project showcases",
    ],
    tech: [
      "Next.js 16",
      "React",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "HTML5 Canvas",
      "Geist",
      "Clash Display",
    ],
    githubUrl:
      "https://github.com/JeevaVenkidu/cinematic-developer-portfolio-2026",
    liveUrl: "#",
    metrics: "60 FPS Canvas • Responsive • Open Source",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
  },
  {
    id: "skill-pilot",
    title: "Skill Pilot",
    subtitle: "AI Agent Skill Discovery & Installation CLI",
    category: "AI Developer Tools",
    description:
      "An open-source CLI that helps AI agents discover, recommend, and install project-specific skills. It analyzes repositories, suggests relevant capabilities, and lets users approve installations before applying changes.",
    highlights: [
      "Automatic project analysis for relevant AI agent skills",
      "One-command installation via `npx skills add`",
      "Plugin-based architecture for extensible skill packages",
    ],
    tech: ["TypeScript", "Node.js", "CLI", "npm", "OpenAI SDK"],
    githubUrl: "https://github.com/JeevaVenkidu/skill-pilot",
    liveUrl: "#",
    metrics: "Open Source CLI • AI Agent Tooling",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
  {
    id: "quick-extension-manager",
    title: "Quick Extension Manager",
    subtitle: "Privacy-first Chrome Extension Manager",
    category: "Browser Extension",
    description:
      "An open-source Chrome extension that makes managing installed extensions faster through instant search, enable/disable toggles, bulk actions, and a clean developer-focused interface.",
    highlights: [
      "Real-time extension search",
      "Bulk enable & disable actions",
      "Lightweight popup optimized for productivity",
    ],
    tech: ["JavaScript", "Chrome Extension API", "HTML", "CSS", "Vite"],
    githubUrl: "https://github.com/JeevaVenkidu/quick-extension-manager",
    liveUrl: "https://quick-extension-manager.vercel.app/",
    metrics: "Open Source • Chrome Productivity Tool",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    id: "awesome-open-ai-alternatives",
    title: "Awesome Open AI Alternatives",
    subtitle: "Curated Open-Source AI Ecosystem",
    category: "Developer Resources",
    description:
      "A curated collection of open-source alternatives to proprietary AI tools covering LLMs, AI agents, RAG frameworks, coding assistants, image generation, video generation, voice models, and local deployment solutions.",
    highlights: [
      "Categorized AI ecosystem with hundreds of resources",
      "Frequently updated with the latest open-source projects",
      "Covers models, frameworks, tooling, and deployment platforms",
    ],
    tech: ["Markdown", "GitHub", "Open Source", "LLMs", "RAG"],
    githubUrl: "https://github.com/JeevaVenkidu/awesome-open-ai-alternatives",
    liveUrl: "#",
    metrics: "Curated AI Resource Collection",
    gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
  },
  {
    id: "portfolio-2026",
    title: "Awwwards Style Portfolio 2026",
    subtitle: "Interactive Scrollytelling Developer Portfolio",
    category: "Frontend Engineering",
    description:
      "My personal portfolio built with cinematic scrolling, smooth motion, and immersive storytelling. Designed to showcase projects through premium interactions inspired by modern award-winning web experiences.",
    highlights: [
      "Scroll-driven storytelling experience",
      "Framer Motion powered animations",
      "Responsive premium UI with performance optimization",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/JeevaVenkidu/awwwards-style-portfolio-2026",
    liveUrl: "#",
    metrics: "Personal Brand • Modern Web Experience",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
  },
  {
    id: "free-hosting-2025",
    title: "Free Hosting 2025",
    subtitle: "Deployment Guide for Modern Web Apps",
    category: "Developer Guide",
    description:
      "A curated guide comparing free hosting platforms with deployment walkthroughs for React, Next.js, and Jamstack applications, helping developers choose the right hosting solution.",
    highlights: [
      "Platform comparisons",
      "Deployment tutorials",
      "React & Jamstack focused documentation",
    ],
    tech: ["Markdown", "GitHub", "Vercel", "Cloudflare", "Netlify"],
    githubUrl: "https://github.com/JeevaVenkidu/free-hosting-2025",
    liveUrl: "#",
    metrics: "Developer Documentation",
    gradient: "from-orange-500/20 via-yellow-500/10 to-transparent",
  },
  {
    id: "edms",
    title: "Enterprise Document Management System",
    subtitle: "Document Workflow & Records Management Platform",
    category: "Enterprise Software",
    description:
      "Contributed to the development of a large-scale enterprise document management platform supporting secure document storage, approval workflows, user permissions, search, and audit logging for business operations.",
    highlights: [
      "REST API development and backend modules",
      "Role-based access control",
      "Enterprise document workflows & audit logs",
    ],
    tech: ["Laravel 11", "Angular", "MySQL", "REST API", "JWT"],
    githubUrl: "#",
    liveUrl: "#",
    metrics: "Commercial Enterprise Project",
    gradient: "from-slate-500/20 via-zinc-500/10 to-transparent",
  },
  {
    id: "lawsuit",
    title: "LawSuite",
    subtitle: "Legal Case Management Platform",
    category: "Backend Architecture",
    description:
      "Currently developing a modern legal practice management system with secure authentication, case workflows, document handling, and scalable REST APIs for law firms.",
    highlights: [
      "Repository pattern architecture",
      "JWT authentication & Redis session management",
      "Validation using Joi with PostgreSQL backend",
    ],
    tech: ["Node.js", "Express", "React", "PostgreSQL", "Redis", "Joi", "Tailwind CSS"],
    githubUrl: "#",
    liveUrl: "#",
    metrics: "Production Enterprise Application",
    gradient: "from-indigo-500/20 via-sky-500/10 to-transparent",
  },
];

export function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

  const filteredProjects =
    selectedFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="relative py-32 px-6 md:px-12 bg-[#121212] z-20">
      {/* Background glow ambient effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
              <Terminal className="w-3.5 h-3.5" />
              <span>FEATURED CASE STUDIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Engineering <span className="text-gradient-emerald">Work</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mt-4 font-light">
              A collection of production backend systems, AI orchestration tools, agricultural data engines, and dark-themed UI components.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${selectedFilter === cat
                  ? "bg-emerald-500 text-black font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  : "bg-white/5 hover:bg-white/10 text-zinc-400 border border-white/10"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group border border-white/10 transition-all duration-500"
            >
              {/* Card top subtle gradient highlight */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                        aria-label="View Source Code"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-emerald-400 transition-colors"
                        aria-label="View Live Project"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm font-mono text-zinc-400 mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-light">
                  {project.description}
                </p>

                {/* Key Architectural Highlights */}
                <div className="space-y-2 mb-8 bg-black/30 p-4 rounded-2xl border border-white/5">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                    Key Highlights
                  </span>
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Tech Tags & Metric */}
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400/90 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    {project.metrics}
                  </span>

                  {project.liveUrl && project.liveUrl !== "#" ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-white group-hover:text-emerald-400 transition-colors"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : project.githubUrl && project.githubUrl !== "#" ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-white group-hover:text-emerald-400 transition-colors"
                    >
                      <span>View Repository</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-400">
                      <span>Enterprise System</span>
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
