"use client";

import React from "react";
import { ArrowUp, Terminal } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-6 md:px-12 bg-[#121212] border-t border-white/5 text-zinc-400 font-mono text-xs z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <p className="text-zinc-200 font-semibold">JEEVA VENKIDU</p>
            <p className="text-zinc-500 text-[11px]">Backend Software Developer & Engineer</p>
          </div>
        </div>

        <p className="text-center text-zinc-500 text-[11px]">
          Engineered with Next.js 14, Framer Motion &amp; HTML5 Canvas. © {new Date().getFullYear()} Jeeva Venkidu.
        </p>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-emerald-400 transition-all flex items-center gap-2 cursor-pointer"
          aria-label="Back to Top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
