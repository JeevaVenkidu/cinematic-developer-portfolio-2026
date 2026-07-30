"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
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
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const { width: cssW, height: cssH } = canvas.getBoundingClientRect();
      const w = Math.round(cssW * dpr);
      const h = Math.round(cssH * dpr);

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

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

  // ── 3. Scroll → progress → frame (vanilla rAF loop) ───────────────
  useEffect(() => {
    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        if (scrollable > 0) {
          const raw = Math.min(1, Math.max(0, -rect.top / scrollable));
          progressRef.current = raw;

          // Update React state (throttled to rAF)
          setProgress(raw);

          // Pick frame and paint if changed
          const idx = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.round(raw * (TOTAL_FRAMES - 1)))
          );
          if (idx !== currentFrameRef.current) {
            currentFrameRef.current = idx;
            paintFrame(idx);
            // Debug: uncomment to verify frame scrubbing
            // console.log(`[ScrollyCanvas] frame=${idx} progress=${raw.toFixed(3)}`);
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [paintFrame]);

  // ── 4. Repaint on resize ───────────────────────────────────────────
  useEffect(() => {
    const onResize = () => paintFrame(currentFrameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paintFrame]);

  const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div
      id="scrolly-section"
      ref={containerRef}
      className="relative w-full bg-[#121212]"
      style={{ height: "500vh" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ touchAction: "none" }}
        />

        {/* Loader overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-30 bg-[#121212] flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center animate-pulse">
              <span className="font-mono text-emerald-400 text-xs font-bold">
                JV
              </span>
            </div>
            <div className="w-64 h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>
            <p className="text-xs font-mono text-zinc-400 tracking-wider">
              LOADING FRAMES... {pct}%
            </p>
          </div>
        )}

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
