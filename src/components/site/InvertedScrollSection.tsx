import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WordRevealText } from "./WordRevealText";

export function InvertedScrollSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 0 → dark, 0.2-0.8 → inverted warm gradient, 1 → dark again
  const background = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [
      "linear-gradient(135deg, #0A0908 0%, #0A0908 100%)",
      "linear-gradient(135deg, #FF9A86 0%, #FFB399 50%, #FFD6A6 100%)",
      "linear-gradient(135deg, #FF9A86 0%, #FFB399 50%, #FFD6A6 100%)",
      "linear-gradient(135deg, #0A0908 0%, #0A0908 100%)",
    ]
  );
  const color = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    ["#FFF0BE", "#0A0908", "#0A0908", "#FFF0BE"]
  );

  return (
    <motion.section
      ref={ref}
      style={{ background, color }}
      className="relative border-y border-border"
    >
      <div className="px-4 md:px-10 py-32 md:py-56 min-h-screen flex flex-col justify-center">
        <motion.div
          style={{ color }}
          className="font-mono text-xs uppercase tracking-[0.3em] opacity-70 mb-10"
        >
          ◍ /our-vision — 002
        </motion.div>

        <WordRevealText
          text="We build calm, durable software for teams who measure quality in years, not sprints — interfaces with taste, systems with rigor."
          className="font-black uppercase leading-[0.95] tracking-[-0.03em] max-w-[14ch] md:max-w-none"
          {...{ style: { fontSize: "clamp(2.5rem, 8.5vw, 9rem)" } as React.CSSProperties }}
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs uppercase tracking-[0.25em] opacity-80">
          <div>◍ Senior team only</div>
          <div>◍ Weekly demos, no theatre</div>
          <div>◍ Shipped, not shelfware</div>
        </div>
      </div>
    </motion.section>
  );
}