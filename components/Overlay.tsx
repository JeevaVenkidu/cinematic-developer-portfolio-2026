"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

/* ── helpers ────────────────────────────────────────────────────────── */

function bandOpacity(
  p: number,
  fadeIn: number,
  holdStart: number,
  holdEnd: number,
  fadeOut: number
): number {
  if (p <= fadeIn || p >= fadeOut) return 0;
  if (p < holdStart) return (p - fadeIn) / (holdStart - fadeIn);
  if (p > holdEnd) return 1 - (p - holdEnd) / (fadeOut - holdEnd);
  return 1;
}

function bandY(p: number, start: number, end: number, range = 30): number {
  if (p <= start) return range;
  if (p >= end) return -range;
  const t = (p - start) / (end - start);
  return range * (1 - 2 * t);
}

/* ── Section definitions ──────────────────────────────────────────── */

interface Section {
  fadeIn: number;
  holdStart: number;
  holdEnd: number;
  fadeOut: number;
  align: "center" | "left" | "right";
  eyebrow: string;
  title: string;
  subtitle: string;
}

const SECTIONS: Section[] = [
  {
    fadeIn: 0.10,
    holdStart: 0.15,
    holdEnd: 0.22,
    fadeOut: 0.30,
    align: "left",
    eyebrow: "02 — ORIGIN",
    title: "An Agricultural\nEngineer.",
    subtitle: "Who discovered a passion for software.",
  },
  {
    fadeIn: 0.25,
    holdStart: 0.30,
    holdEnd: 0.37,
    fadeOut: 0.45,
    align: "right",
    eyebrow: "03 — PURPOSE",
    title: "Building digital\nproducts.",
    subtitle: "Designed to solve real-world problems.",
  },
  {
    fadeIn: 0.40,
    holdStart: 0.45,
    holdEnd: 0.52,
    fadeOut: 0.60,
    align: "left",
    eyebrow: "04 — CRAFT",
    title: "Engineering\nmeets Art.",
    subtitle: "Where performance meets emotion.",
  },
  {
    fadeIn: 0.55,
    holdStart: 0.60,
    holdEnd: 0.67,
    fadeOut: 0.75,
    align: "right",
    eyebrow: "05 — CONTRIBUTION",
    title: "Open Source\nfirst.",
    subtitle: "Building tools that empower developers.",
  },
  {
    fadeIn: 0.70,
    holdStart: 0.75,
    holdEnd: 0.82,
    fadeOut: 0.90,
    align: "center",
    eyebrow: "06 — NEXT",
    title: "Learning Artificial\nIntelligence.",
    subtitle: "One concept. One project. One step forward.",
  },
];

interface OverlayProps {
  progress: number; // 0 – 1
}

export function Overlay({ progress }: OverlayProps) {
  const p = progress;

  // Hero section opacity & transform
  const heroOpacity = p <= 0 ? 1 : p >= 0.15 ? 0 : 1 - p / 0.15;
  const heroY = p <= 0 ? 0 : p >= 0.15 ? -40 : -(40 * (p / 0.15));

  // CTA section opacity & transform
  const ctaFadeIn = 0.85;
  const ctaOpacity = p < ctaFadeIn ? 0 : Math.min(1, (p - ctaFadeIn) / 0.08);
  const ctaY = p < ctaFadeIn ? 30 : 30 * (1 - Math.min(1, (p - ctaFadeIn) / 0.08));

  // Current active scene index for HUD
  const sceneNumber = Math.min(7, Math.floor(p * 7) + 1);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
      {/* ── CINEMATIC OVERLAYS (VIGNETTE & FILM GRAIN) ── */}
      <div className="story__scrim" />
      <div className="story__grain" />

      {/* ── TOP RIGHT IDENTITY ── */}
      <div className="story__identity">
        <span>JV</span>
        <span className="hidden sm:inline">PORTFOLIO ’26</span>
      </div>

      {/* ── BOTTOM LEFT PROGRESS TRACKER ── */}
      <div className="story__progress">
        <span className="story__progress-label">SCROLL TO EXPLORE</span>
        <span className="story__progress-track">
          <span
            className="story__progress-value"
            style={{ transform: `scaleX(${Math.min(1, Math.max(0, p))})` }}
          />
        </span>
        <span className="story__progress-count">
          {String(sceneNumber).padStart(2, "0")}
        </span>
      </div>

      {/* ── HERO SCENE (01) ── */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-start pl-6 md:pl-20 lg:pl-28 pr-6 max-w-4xl"
        style={{
          opacity: heroOpacity,
          transform: `translate3d(0, ${heroY}px, 0)`,
          willChange: "opacity, transform",
        }}
      >
        <p className="font-mono text-xs sm:text-sm text-[#f4f0e8]/70 tracking-[0.2em] uppercase mb-4">
          01 — INTRODUCTION
        </p>

        <h1
          className="font-display text-[clamp(3.4rem,8.5vw,8.5rem)] font-bold text-[#f4f0e8] leading-[0.88] tracking-[-0.05em] mb-6"
        >
          JEEVA
          <br />
          <span>VENKIDU</span>
        </h1>

        <p className="text-lg sm:text-2xl text-[#f4f0e8]/90 font-normal tracking-[-0.01em] max-w-lg">
          Backend Software Developer.
        </p>
      </div>

      {/* ── STORY SECTIONS (02 - 06) ── */}
      {SECTIONS.map((sec, i) => {
        const opacity = bandOpacity(p, sec.fadeIn, sec.holdStart, sec.holdEnd, sec.fadeOut);
        const y = bandY(p, sec.fadeIn, sec.fadeOut);

        if (opacity <= 0) return null;

        const alignClass =
          sec.align === "left"
            ? "items-start text-left pl-6 md:pl-20 lg:pl-28 pr-6"
            : sec.align === "right"
            ? "items-end text-right pr-6 md:pr-20 lg:pr-28 pl-6"
            : "items-center text-center px-6";

        return (
          <div
            key={i}
            className={`absolute inset-0 flex flex-col justify-center ${alignClass}`}
            style={{
              opacity,
              transform: `translate3d(0, ${y}px, 0)`,
              willChange: "opacity, transform",
            }}
          >
            <div className="max-w-2xl">
              <p className="font-mono text-xs sm:text-sm text-[#f4f0e8]/70 tracking-[0.2em] uppercase mb-4">
                {sec.eyebrow}
              </p>
              <h2
                className="font-display text-[clamp(2.8rem,6.5vw,6.5rem)] font-bold text-[#f4f0e8] leading-[0.9] tracking-[-0.04em] mb-4 whitespace-pre-line"
              >
                {sec.title}
              </h2>
              {sec.subtitle && (
                <p className="text-base sm:text-xl text-[#f4f0e8]/80 font-normal tracking-[-0.01em] max-w-md inline-block">
                  {sec.subtitle}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* ── CTA SCENE (07) ── */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center"
        style={{
          opacity: ctaOpacity,
          transform: `translate3d(0, ${ctaY}px, 0)`,
          willChange: "opacity, transform",
        }}
      >
        <div className="max-w-2xl">
          <p className="font-mono text-xs sm:text-sm text-emerald-400 tracking-[0.2em] uppercase mb-4">
            07 — CONTINUUM
          </p>
          <h2 className="font-display text-[clamp(3rem,7vw,6.8rem)] font-bold text-[#f4f0e8] leading-[0.9] tracking-[-0.04em] mb-6">
            Always Learning.
            <br />
            <span className="text-[#10b981]">Always Building.</span>
          </h2>

          <div className="mt-8 pointer-events-auto">
            <button
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#f4f0e8] text-black font-semibold text-sm hover:bg-emerald-400 transition-all cursor-pointer shadow-lg"
            >
              <span>Explore Selected Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
