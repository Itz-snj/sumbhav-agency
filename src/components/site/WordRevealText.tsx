import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const y = useTransform(progress, range, ["110%", "0%"]);
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="inline-block overflow-hidden align-bottom mr-[0.25em]">
      <motion.span style={{ y, opacity, display: "inline-block" }}>
        {word}
      </motion.span>
    </span>
  );
}

export function WordRevealText({ text, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <div ref={ref} className={className} style={style}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1.5 / words.length);
        return <Word key={i} word={w} progress={scrollYProgress} range={[start, end]} />;
      })}
    </div>
  );
}