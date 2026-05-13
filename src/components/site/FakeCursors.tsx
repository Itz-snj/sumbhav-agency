import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

type CursorData = {
  name: string;
  color: string;
  delay: number;
};

const CURSORS: CursorData[] = [
  { name: "Suman", color: "#FF9A86", delay: 0 },
  { name: "User", color: "#FFD6A6", delay: 1.5 },
];

function CursorSvg({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 3L19 12L12 13.5L9 21L5 3Z"
        fill={color}
        stroke="#0A0908"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RandomCursor({ data }: { data: CursorData }) {
  const controls = useAnimation();

  // Start at a static position to prevent SSR hydration mismatches
  const initialX = useRef(50).current;
  const initialY = useRef(50).current;

  useEffect(() => {
    let isActive = true;

    const runSim = async () => {
      if (data.delay > 0) {
        await new Promise((r) => setTimeout(r, data.delay * 1000));
      }

      if (!isActive) return;

      // Jump to a random starting position immediately before fading in
      controls.set({
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`
      });

      // Fade in
      await controls.start({ opacity: 1, transition: { duration: 0.8 } });

      while (isActive) {
        // Pick a random target within 5% to 95% of the container to simulate full screen coverage
        const nextX = Math.random() * 90 + 5;
        const nextY = Math.random() * 90 + 5;

        // Randomize the movement duration between 0.8s and 2.5s for human-like variation
        const duration = 0.8 + Math.random() * 1.7;

        // Vary the easing so it doesn't look purely mechanical
        const easings = ["easeOut", "easeInOut", "linear", "circOut"];
        const ease = easings[Math.floor(Math.random() * easings.length)];

        // Move to the new target
        await controls.start({
          left: `${nextX}%`,
          top: `${nextY}%`,
          transition: { duration, ease }
        });

        // 70% chance to pause at the destination, simulating a human stopping to read
        if (Math.random() > 0.3) {
          const pauseDuration = 0.5 + Math.random() * 2.5; // pause for 0.5s to 3s
          await new Promise((r) => setTimeout(r, pauseDuration * 1000));
        }
      }
    };

    runSim();

    return () => {
      isActive = false;
    };
  }, [controls, data.delay]);

  return (
    <motion.div
      initial={{ left: `${initialX}%`, top: `${initialY}%`, opacity: 0 }}
      animate={controls}
      className="absolute"
    >
      {/* Micro-jitter layer to simulate human hand tremor */}
      <motion.div
        animate={{
          x: [0, 1.5, -0.5, 2, 0, -1, 1, 0],
          y: [0, -1, 1.5, 0, 2, -1, 1, 0],
        }}
        transition={{
          duration: 3 + (data.name.length * 0.15),
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative -translate-x-1 -translate-y-1"
      >
        <CursorSvg color={data.color} />
        <span
          className="absolute left-5 top-5 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0A0908]"
          style={{ background: data.color }}
        >
          {data.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function FakeCursors() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 hidden md:block"
    >
      {CURSORS.map((c) => (
        <RandomCursor key={c.name} data={c} />
      ))}
    </div>
  );
}