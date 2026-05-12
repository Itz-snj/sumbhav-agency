import { motion } from "framer-motion";
import content from "@/data/site-content.json";
import { ArrowDownRight, GripVertical } from "lucide-react";
import { ParticleText } from "./ParticleText";
import { FakeCursors } from "./FakeCursors";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Top nav */}
      <header className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-border">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/70">
          SumBhav Works — West Bengal, India HQ
        </div>
        <nav className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-[0.25em] text-foreground/70">
          <a href="#works" className="hover:text-[color:var(--salmon)]">Works</a>
          <a href="#talk" className="hover:text-[color:var(--salmon)]">Terminal</a>
          <a href="#contact" className="hover:text-[color:var(--salmon)]">Contact</a>
        </nav>
        <a
          href="#talk"
          className="font-mono text-xs uppercase tracking-[0.25em] border border-border rounded-full px-4 py-2 hover:border-[color:var(--salmon)] hover:text-[color:var(--salmon)] transition-colors"
        >
          [ {content.hero.cta} ]
        </a>
      </header>

      {/* Hero typography */}
      <div className="relative flex-1 flex flex-col justify-center px-4 md:px-10 py-24">
        <FakeCursors />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60 mb-8 flex flex-wrap gap-x-6 gap-y-2"
        >
          <span>◍ Available — Q3 2026</span>
          <span>◍ {content.brand.location}</span>
          <span>◍ UK Enterprise Solutions</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          aria-label={content.hero.headline}
        >
          <h1 className="sr-only">{content.hero.headline}</h1>
          <ParticleText
            text={content.hero.headline}
            className="w-full h-[clamp(180px,32vw,440px)]"
            density={6}
            repulsion={120}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
          <div className="md:col-span-6 md:col-start-7 relative min-h-[260px]">
            <motion.div
              drag
              dragMomentum={false}
              dragElastic={0.15}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              whileDrag={{ scale: 1.02, zIndex: 30 }}
              className="cursor-grab active:cursor-grabbing select-none rounded-md border border-white/10 bg-black/50 backdrop-blur-md p-5 max-w-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center justify-between mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                <span className="inline-flex items-center gap-1.5">
                  <GripVertical size={12} /> MOD-01 / subline
                </span>
                <span>[ DRAG ]</span>
              </div>
              <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
                {content.hero.subline}
              </p>
            </motion.div>

            <motion.div
              drag
              dragMomentum={false}
              dragElastic={0.15}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35 }}
              whileDrag={{ scale: 1.04, zIndex: 30 }}
              className="mt-6 inline-block cursor-grab active:cursor-grabbing select-none rounded-full border border-white/10 bg-black/50 backdrop-blur-md p-2 pl-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 inline-flex items-center gap-1">
                  <GripVertical size={10} /> MOD-02
                </span>
                <a
                  href="#works"
                  onPointerDownCapture={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] border border-border rounded-full px-5 py-2.5 hover:border-[color:var(--salmon)] hover:text-[color:var(--salmon)] transition-colors"
                >
                  Selected Works <ArrowDownRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}