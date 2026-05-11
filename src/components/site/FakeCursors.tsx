import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Cursor = {
  name: string;
  color: string;
  path: { x: string; y: string }[];
  duration: number;
};

const CURSORS: Cursor[] = [
  {
    name: "ananya",
    color: "#FF9A86",
    duration: 18,
    path: [
      { x: "12%", y: "22%" },
      { x: "68%", y: "30%" },
      { x: "78%", y: "70%" },
      { x: "22%", y: "78%" },
      { x: "12%", y: "22%" },
    ],
  },
  {
    name: "kenji",
    color: "#FFD6A6",
    duration: 22,
    path: [
      { x: "85%", y: "18%" },
      { x: "55%", y: "55%" },
      { x: "30%", y: "40%" },
      { x: "62%", y: "82%" },
      { x: "85%", y: "18%" },
    ],
  },
  {
    name: "rhea",
    color: "#FFB399",
    duration: 26,
    path: [
      { x: "40%", y: "85%" },
      { x: "15%", y: "55%" },
      { x: "48%", y: "20%" },
      { x: "80%", y: "48%" },
      { x: "40%", y: "85%" },
    ],
  },
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

export function FakeCursors() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {}, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 hidden md:block"
    >
      {CURSORS.map((c) => (
        <motion.div
          key={c.name}
          initial={{ x: c.path[0].x, y: c.path[0].y, opacity: 0 }}
          animate={{
            x: c.path.map((p) => p.x),
            y: c.path.map((p) => p.y),
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.1, 0.5, 0.9, 1],
          }}
          className="absolute top-0 left-0"
        >
          <div className="relative -translate-x-1 -translate-y-1">
            <CursorSvg color={c.color} />
            <span
              className="absolute left-5 top-5 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0A0908]"
              style={{ background: c.color }}
            >
              {c.name}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}