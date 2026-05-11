import { useEffect, useRef } from "react";

type Props = {
  text: string;
  /** Approximate pixel font-size used to rasterize text */
  fontSize?: number;
  /** Spacing between particles (smaller = denser) */
  density?: number;
  /** Mouse repulsion radius in px */
  repulsion?: number;
  className?: string;
  colors?: string[];
};

type Particle = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  c: string;
  s: number;
};

export function ParticleText({
  text,
  fontSize = 280,
  density = 6,
  repulsion = 110,
  className,
  colors = ["#FF9A86", "#FFB399", "#FFD6A6", "#FFF0BE"],
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Offscreen rasterize
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d");
      if (!octx) return;
      // Choose font size to fit width
      const desired = Math.min(fontSize, Math.floor(h * 0.95));
      let fs = desired;
      octx.font = `900 ${fs}px Inter, system-ui, sans-serif`;
      let m = octx.measureText(text);
      while (m.width > w * 0.95 && fs > 32) {
        fs -= 6;
        octx.font = `900 ${fs}px Inter, system-ui, sans-serif`;
        m = octx.measureText(text);
      }
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(text, w / 2, h / 2);

      const data = octx.getImageData(0, 0, w, h).data;
      const particles: Particle[] = [];
      for (let y = 0; y < h; y += density) {
        for (let x = 0; x < w; x += density) {
          const i = (y * w + x) * 4 + 3; // alpha
          if (data[i] > 128) {
            particles.push({
              x,
              y,
              ox: x,
              oy: y,
              vx: 0,
              vy: 0,
              c: colors[(x + y) % colors.length],
              s: density * 0.55,
            });
          }
        }
      }
      particlesRef.current = particles;
    };

    build();

    const tick = () => {
      const rect = wrap.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);
      const m = mouseRef.current;
      const r2 = repulsion * repulsion;
      const ps = particlesRef.current;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        if (m.active) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2 && d2 > 0.01) {
            const f = (1 - d2 / r2) * 6;
            const d = Math.sqrt(d2);
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        // Spring back
        p.vx += (p.ox - p.x) * 0.06;
        p.vy += (p.oy - p.y) * 0.06;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillStyle = p.c;
        ctx.fillRect(p.x, p.y, p.s, p.s);
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
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    let resizeT: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(build, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [text, fontSize, density, repulsion, colors]);

  return (
    <div ref={wrapRef} className={className} aria-label={text} role="img">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}