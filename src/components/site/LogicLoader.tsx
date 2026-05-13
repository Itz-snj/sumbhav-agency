import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DURATION = 5000;

type Props = {
  onComplete?: () => void;
};

type P = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  link: number; // index of partner for line phase, -1 if none
};

export function LogicLoader({ onComplete }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<P[]>([]);
  const targetsRef = useRef<{ x: number; y: number }[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const startRef = useRef<number>(0);
  const skipRef = useRef(false);
  const skipStartRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [showSkip, setShowSkip] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Build SumBhav logo target points
  const buildLogoTargets = (w: number, h: number) => {
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const octx = off.getContext("2d");
    if (!octx) return [];
    const fs = Math.min(140, Math.floor(w * 0.18));
    octx.font = `900 ${fs}px Inter, system-ui, sans-serif`;
    octx.fillStyle = "#fff";
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillText("SumBhav", w / 2, h / 2);
    const data = octx.getImageData(0, 0, w, h).data;
    const pts: { x: number; y: number }[] = [];
    const step = 5;
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4 + 3;
        if (data[i] > 128) pts.push({ x, y });
      }
    }
    return pts;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setup = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targets = buildLogoTargets(w, h);
      targetsRef.current = targets;

      const count = Math.min(targets.length, 420);
      const ps: P[] = [];
      for (let i = 0; i < count; i++) {
        const t = targets[Math.floor((i / count) * targets.length)];
        ps.push({
          x: w / 2 + (Math.random() - 0.5) * w * 0.6,
          y: h / 2 + (Math.random() - 0.5) * h * 0.6,
          ox: w / 2,
          oy: h / 2,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          tx: t.x,
          ty: t.y,
          link: (i + 1 + Math.floor(Math.random() * 3)) % count,
        });
      }
      particlesRef.current = ps;
    };
    setup();

    startRef.current = performance.now();

    const lerpColor = (a: string, b: string, t: number) => {
      const pa = parseInt(a.slice(1), 16);
      const pb = parseInt(b.slice(1), 16);
      const ar = (pa >> 16) & 255, ag = (pa >> 8) & 255, ab = pa & 255;
      const br = (pb >> 16) & 255, bg = (pb >> 8) & 255, bb = pb & 255;
      const r = Math.round(ar + (br - ar) * t);
      const g = Math.round(ag + (bg - ag) * t);
      const bl = Math.round(ab + (bb - ab) * t);
      return `rgb(${r},${g},${bl})`;
    };

    const tick = (now: number) => {
      const rect = wrap.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Compute progress
      let elapsed = now - startRef.current;
      let p = Math.min(1, elapsed / DURATION);

      if (skipRef.current && skipStartRef.current != null) {
        const sElapsed = now - skipStartRef.current;
        const skipDur = 600;
        const skipP = Math.min(1, sElapsed / skipDur);
        // Fast-forward from progress at skip moment to 1
        const base = (skipStartRef.current - startRef.current) / DURATION;
        p = Math.min(1, base + (1 - base) * skipP);
      }

      setProgress(p);
      const newPhase: 1 | 2 | 3 = p < 0.3 ? 1 : p < 0.7 ? 2 : 3;
      setPhase((cur) => (cur === newPhase ? cur : newPhase));
      if (p >= 0.3) setShowSkip((s) => s || true);

      ctx.clearRect(0, 0, w, h);

      // Background grid pulse (Phase 1)
      if (p < 0.35) {
        const a = 0.04 + 0.04 * Math.sin(now / 400);
        ctx.strokeStyle = `rgba(255,240,190,${a})`;
        ctx.lineWidth = 1;
        const gs = 40;
        for (let x = 0; x < w; x += gs) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += gs) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }

      const ps = particlesRef.current;
      const m = mouseRef.current;

      for (let i = 0; i < ps.length; i++) {
        const pt = ps[i];
        let tx: number, ty: number;

        if (p < 0.3) {
          // Chaotic cluster near center
          const ang = (i + now / 600) * 0.3;
          const rad = 60 + 50 * Math.sin(now / 500 + i);
          tx = w / 2 + Math.cos(ang) * rad;
          ty = h / 2 + Math.sin(ang) * rad;
        } else {
          // Move toward final logo position
          tx = pt.tx;
          ty = pt.ty;
        }

        // Mouse repulsion
        if (m.active) {
          const dx = pt.x - m.x;
          const dy = pt.y - m.y;
          const d2 = dx * dx + dy * dy;
          const r = 90;
          if (d2 < r * r && d2 > 0.1) {
            const f = (1 - d2 / (r * r)) * 4;
            const d = Math.sqrt(d2);
            pt.vx += (dx / d) * f;
            pt.vy += (dy / d) * f;
          }
        }

        const ease = p < 0.3 ? 0.08 : 0.09;
        pt.vx += (tx - pt.x) * ease;
        pt.vy += (ty - pt.y) * ease;
        pt.vx *= 0.78;
        pt.vy *= 0.78;
        pt.x += pt.vx;
        pt.y += pt.vy;
      }

      // Lines (Phase 2 onward)
      if (p >= 0.3) {
        const lineT = Math.min(1, (p - 0.3) / 0.4);
        ctx.lineWidth = 0.8;
        for (let i = 0; i < ps.length; i++) {
          const a = ps[i];
          const b = ps[a.link];
          if (!b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 140) continue;
          const alpha = (1 - dist / 140) * lineT * 0.7;
          // Color gradient salmon -> sand based on position
          const mix = (a.x / w + a.y / h) / 2;
          const col = lerpColor("#FF9A86", "#FFD6A6", mix);
          ctx.strokeStyle = col.replace("rgb", "rgba").replace(")", `,${alpha})`);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Particles
      for (let i = 0; i < ps.length; i++) {
        const pt = ps[i];
        let color = "#FFF0BE";
        if (p >= 0.3) {
          const t = Math.min(1, (p - 0.3) / 0.5);
          color = lerpColor("#FFF0BE", i % 2 ? "#FF9A86" : "#FFD6A6", t);
        }
        const size = p >= 0.7 ? 2.4 : 1.8;
        // Glow in phase 3
        if (p >= 0.7) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#FF9A86";
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = color;
        ctx.fillRect(pt.x - size / 2, pt.y - size / 2, size, size);
      }
      ctx.shadowBlur = 0;

      if (p >= 1 && !doneRef.current) {
        doneRef.current = true;
        // Flash final text 0.3s then fade
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => onComplete?.(), 600);
        }, 300);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    let resizeT: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(setup, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [onComplete]);

  const triggerSkip = () => {
    if (skipRef.current || progress < 0.3) return;
    skipRef.current = true;
    skipStartRef.current = performance.now();
  };

  const status =
    phase === 1
      ? "INITIALIZING DATA NODES // [ MOD-00 ]"
      : phase === 2
      ? "WEAVING BUSINESS LOGIC // Connecting [ Firebase <-> Next.js ]"
      : "DEPLOYMENT READY // [ MOD-FINAL ]";

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0908]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={triggerSkip}
        >
          <div ref={wrapRef} className="absolute inset-0">
            <canvas ref={canvasRef} className="block h-full w-full" />
          </div>

          {/* Final heading reveal */}
          <AnimatePresence>
            {progress >= 1 && (
              <motion.h2
                key="final"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="pointer-events-none absolute z-10 text-center font-sans text-2xl font-black tracking-[0.3em] text-[#FFF0BE] md:text-4xl"
                style={{ top: "62%" }}
              >
                SUMBHAV WORKS ONLINE.
              </motion.h2>
            )}
          </AnimatePresence>

          {/* Top-left status */}
          <div className="pointer-events-none absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFF0BE]/70 md:text-xs">
            <motion.span
              key={status}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {status}
            </motion.span>
          </div>

          {/* Top-right counter */}
          <div className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFF0BE]/70 md:text-xs">
            {String(Math.round(progress * 100)).padStart(3, "0")} / 100
          </div>

          {/* Progress bar */}
          <div className="pointer-events-none absolute bottom-16 left-1/2 w-[80%] max-w-2xl -translate-x-1/2">
            <div className="h-px w-full bg-white/10">
              <motion.div
                className="h-px"
                style={{
                  width: `${progress * 100}%`,
                  background:
                    "linear-gradient(90deg, #FFF0BE 0%, #FF9A86 60%, #FFD6A6 100%)",
                  boxShadow: "0 0 12px rgba(255,154,134,0.5)",
                }}
              />
            </div>
          </div>

          {/* Skip button */}
          <AnimatePresence>
            {showSkip && progress < 1 && (
              <motion.button
                type="button"
                key="skip"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  triggerSkip();
                }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer border border-white/15 bg-black/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFF0BE] backdrop-blur-md transition-colors hover:border-[#FF9A86]/60 hover:text-[#FF9A86]"
              >
                [ Tap or Click to Skip ]
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}