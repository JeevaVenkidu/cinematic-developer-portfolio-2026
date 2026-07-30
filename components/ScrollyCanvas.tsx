"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEQUENCE_FILES } from "@/lib/sequenceFiles";

const TOTAL_FRAMES = SEQUENCE_FILES.length; // 120

interface ScrollyCanvasProps {
  children?: React.ReactNode;
}

export function ScrollyCanvas({ children }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const rafRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // ── 1. Preload all images ──────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    SEQUENCE_FILES.forEach((file, i) => {
      const img = new Image();
      img.src = `/sequence/${file}`;
      img.onload = () => {
        if (!mounted) return;
        imgs[i] = img;
        loaded++;
        setLoadedCount(loaded);
        // Paint frame 0 the instant it arrives
        if (i === 0) paintFrame(0, imgs);
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
      img.onerror = () => {
        if (!mounted) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
    });

    imagesRef.current = imgs;
    return () => { mounted = false; };
  }, []);

  // ── 2. Paint a specific frame (object-fit: cover) ──────────────────
  const paintFrame = useCallback(
    (idx: number, images: HTMLImageElement[] = imagesRef.current) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Cap DPR at 2 max for mobile GPU performance optimization
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width: cssW, height: cssH } = canvas.getBoundingClientRect();
      if (cssW === 0 || cssH === 0) return;

      const w = Math.round(cssW * dpr);
      const h = Math.round(cssH * dpr);

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      // Enable fast image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";

      // Clear with matching background
      ctx.fillStyle = "#121212";
      ctx.fillRect(0, 0, w, h);

      // object-fit: cover math
      const imgR = img.naturalWidth / img.naturalHeight;
      const canR = w / h;
      let dw = w, dh = h, dx = 0, dy = 0;
      if (canR > imgR) {
        dh = w / imgR;
        dy = (h - dh) / 2;
      } else {
        dw = h * imgR;
        dx = (w - dw) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    },
    []
  );

  // ── 3. Optimized Passive Scroll Listener (Zero Main-Thread Blocking) ──
  const lastSetProgressRef = useRef<number>(-1);
  const viewportHeightRef = useRef<number>(0);

  useEffect(() => {
    // Cache viewport height to prevent layout thrashing on mobile scroll
    viewportHeightRef.current = window.innerHeight;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = containerRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const vh = viewportHeightRef.current || window.innerHeight;
            const scrollable = rect.height - vh;
            if (scrollable > 0) {
              const raw = Math.min(1, Math.max(0, -rect.top / scrollable));
              progressRef.current = raw;

              // Throttle React state update to prevent heavy mobile re-renders
              if (Math.abs(raw - lastSetProgressRef.current) > 0.0015) {
                lastSetProgressRef.current = raw;
                setProgress(raw);
              }

              // Pick frame and paint if changed
              const idx = Math.min(
                TOTAL_FRAMES - 1,
                Math.max(0, Math.round(raw * (TOTAL_FRAMES - 1)))
              );
              if (idx !== currentFrameRef.current) {
                currentFrameRef.current = idx;
                paintFrame(idx);
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      viewportHeightRef.current = window.innerHeight;
      paintFrame(currentFrameRef.current);
    };

    // Initial paint
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [paintFrame]);

  const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div
      id="scrolly-section"
      ref={containerRef}
      className="relative w-full bg-[#121212] h-[350vh] md:h-[500vh]"
      style={{ touchAction: "pan-y" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#121212] will-change-transform">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ touchAction: "pan-y" }}
        />

        {/* Loader overlay */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
              className="absolute inset-0 z-40 bg-[#07090d] flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Background ambient lighting & film grain */}
              <div className="story__scrim" />
              <div className="story__grain" />
              <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

              {/* Center Content Group */}
              <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
                {/* Brand Badge */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-8 backdrop-blur-md"
                >
                  <span className="font-mono text-emerald-400 text-xs font-bold tracking-wider">
                    JV
                  </span>
                </motion.div>

                {/* Big Monolithic Percentage */}
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-display text-6xl sm:text-7xl font-bold text-[#f4f0e8] tracking-[-0.04em]">
                    {pct}
                  </span>
                  <span className="font-mono text-xl text-emerald-400 font-medium">
                    %
                  </span>
                </div>

                {/* Progress Bar Track */}
                <div className="w-64 sm:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden mb-6 relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-[#f4f0e8] origin-left shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                </div>

                {/* Terminal Status Details */}
                <div className="flex flex-col items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>INITIALIZING CANVAS ENGINE</span>
                  </span>
                  <span className="text-zinc-500">
                    [{String(loadedCount).padStart(3, "0")} / {TOTAL_FRAMES} FRAMES LOADED]
                  </span>
                </div>
              </div>

              {/* Bottom Copyright/Version Footer */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 font-mono text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
                <span>PORTFOLIO SEQUENCE ’26</span>
                <span>STATUS // LOADING</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text overlay — receives numeric progress 0‑1 */}
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<{ progress: number }>, {
                progress,
              })
            : child
        )}
      </div>
    </div>
  );
}
