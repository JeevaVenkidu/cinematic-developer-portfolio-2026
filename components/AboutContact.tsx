"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Terminal, Sparkles, Sprout, Code2, Cpu, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function AboutContact() {
  const [copied, setCopied] = useState(false);
  const email = "jeevavenkidu.dev@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="about" className="relative py-32 px-6 md:px-12 bg-[#121212] z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* ABOUT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <Sprout className="w-3.5 h-3.5" />
              <span>THE JOURNEY</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              From Agricultural Engineering to <span className="text-gradient-emerald">Software Mastery</span>
            </h2>

            <div className="space-y-4 text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
              <p>
                My background in <strong className="text-white font-medium">Agricultural Engineering</strong> taught me to respect real-world constraints, complex system feedback loops, and resource optimization. When I discovered software, I realized code is the ultimate lever for engineering impact.
              </p>
              <p>
                Today, I design and build <strong className="text-white font-medium">distributed backend architectures</strong>, multi-tenant cloud APIs, and high-performance digital tools. I treat code as both an engineering discipline and a creative craft—where every query, index, and interface is crafted with precision.
              </p>
              <p>
                Currently exploring <strong className="text-emerald-400 font-medium">Agentic AI systems</strong>, autonomous subagent workflows, and interactive scrollytelling visual experiences.
              </p>
            </div>

            {/* Core Competencies Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: "Backend Architecture", icon: Terminal },
                { name: "Multi-Tenant Systems", icon: Code2 },
                { name: "PostgreSQL & Prisma", icon: Cpu },
                { name: "Distributed Systems", icon: Sparkles },
                { name: "AgriTech & IoT Stream", icon: Sprout },
                { name: "Agentic AI Tools", icon: Sparkles },
              ].map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs font-mono text-zinc-200"
                >
                  <skill.icon className="w-4 h-4 text-emerald-400" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Code Card / Philosophy Highlight */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-zinc-400">jeeva_philosophy.ts</span>
              </div>

              <pre className="font-mono text-xs text-zinc-300 space-y-2 overflow-x-auto leading-relaxed">
                <code>
                  <span className="text-emerald-400">const</span> developer = &#123;<br />
                  &nbsp;&nbsp;name: <span className="text-cyan-300">&quot;Jeeva Venkidu&quot;</span>,<br />
                  &nbsp;&nbsp;origin: <span className="text-cyan-300">&quot;Agricultural Engineer&quot;</span>,<br />
                  &nbsp;&nbsp;coreCraft: <span className="text-cyan-300">&quot;Backend Software Systems&quot;</span>,<br />
                  &nbsp;&nbsp;values: [<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">&quot;High Performance&quot;</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">&quot;Clean Architecture&quot;</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">&quot;Continuous Learning&quot;</span>,<br />
                  &nbsp;&nbsp;],<br />
                  &nbsp;&nbsp;status: <span className="text-cyan-300">&quot;Building &amp; Exploring AI&quot;</span>,<br />
                  &#125;;
                </code>
              </pre>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>// Ready for high-impact engineering</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div id="contact" className="relative">
          <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-emerald-500/30 text-center relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <Mail className="w-3.5 h-3.5" />
                <span>LET'S CONNECT</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                Building Something <span className="text-gradient-emerald">Extraordinary?</span>
              </h2>

              <p className="text-zinc-300 text-base sm:text-xl font-light leading-relaxed">
                Whether you need a robust backend architecture, multi-tenant engineering expertise, or AI integration — let's start a conversation.
              </p>

              {/* Copy Email Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between sm:justify-start gap-4 font-mono text-sm text-zinc-200">
                  <span>{email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${email}`}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="pt-8 flex items-center justify-center gap-4">
                <a
                  href="https://github.com/JeevaVenkidu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono"
                >
                  <GithubIcon className="w-4 h-4 text-emerald-400" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>

                <a
                  href="https://www.linkedin.com/in/jeevavenkidu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono"
                >
                  <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
