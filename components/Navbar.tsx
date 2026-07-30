"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Mail, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-[#121212]/80 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
            : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group text-left cursor-pointer"
            aria-label="Jeeva Venkidu Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg group-hover:scale-105 group-hover:border-emerald-400 transition-all">
              <Terminal className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="font-semibold tracking-tight text-white group-hover:text-emerald-400 transition-colors text-base block">
                JEEVA VENKIDU
              </span>
              <span className="text-xs text-zinc-400 font-mono block">
                Backend Dev & Engineer
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <button
              onClick={() => scrollToSection("scrolly-section")}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Story
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/JeevaVenkidu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-white transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/jeevavenkidu/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-white transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              Get in Touch
            </button>
          </div>
        </div>

        {/* Scroll Progress Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-400 origin-left"
          style={{ scaleX }}
        />
      </header>
    </>
  );
}
