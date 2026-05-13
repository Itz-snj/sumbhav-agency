import { useState } from "react";
import { motion } from "framer-motion";
import content from "@/data/site-content.json";
import { ArrowDownRight, GripVertical, Menu, X } from "lucide-react";
import { ParticleText } from "./ParticleText";
import { FakeCursors } from "./FakeCursors";
import { DraggableModule } from "./DraggableModule";

export function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Top nav */}
      <header className="fixed md:absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-10 py-4 border-b border-border bg-background/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none z-50">
        <div className="flex items-center">
          <img src="/assets/bglessnewlogo.svg" alt="SumBhav Logo" className="h-10 w-20 object-contain opacity-90 hover:opacity-100 transition-opacity" />
        </div>
        
        {/* Desktop Nav & CTA */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8 font-mono text-xs uppercase tracking-[0.25em] text-foreground/70">
            <a href="#works" className="hover:text-[color:var(--salmon)]">Works</a>
            <a href="#talk" className="hover:text-[color:var(--salmon)]">Terminal</a>
            <a href="#contact" className="hover:text-[color:var(--salmon)]">Contact</a>
          </nav>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-[0.25em] border border-border rounded-full px-4 py-2 hover:border-[color:var(--salmon)] hover:text-[color:var(--salmon)] transition-colors"
          >
            [ {content.hero.cta} ]
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden text-foreground/80 hover:text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[73px] bg-background/95 backdrop-blur-xl z-40 md:hidden flex flex-col items-center justify-center gap-8 border-t border-border">
          <nav className="flex flex-col items-center gap-8 font-mono text-sm uppercase tracking-[0.25em] text-foreground/70">
            <a href="#works" onClick={() => setIsMenuOpen(false)} className="hover:text-[color:var(--salmon)]">Works</a>
            <a href="#talk" onClick={() => setIsMenuOpen(false)} className="hover:text-[color:var(--salmon)]">Terminal</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[color:var(--salmon)]">Contact</a>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 font-mono text-xs uppercase tracking-[0.25em] border border-border rounded-full px-6 py-3 hover:border-[color:var(--salmon)] hover:text-[color:var(--salmon)] transition-colors text-foreground"
            >
              [ {content.hero.cta} ]
            </a>
          </nav>
        </div>
      )}

      {/* Hero typography */}
      <div className="relative flex-1 flex flex-col justify-center px-4 md:px-10 py-24 pt-32 md:pt-24">
        <FakeCursors />
        <DraggableModule label="" delay={0.4} initialY={0} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60 mb-8 flex flex-wrap gap-x-6 gap-y-2"
          >
            <span>◍ Available — Q3 2026</span>
            <span>◍ {content.brand.location}</span>
            <span>◍ Enterprise Solutions</span>
          </motion.div>
        </DraggableModule>

        <DraggableModule label="MOD-00 / IDENTITY" delay={1.2} initialY={40} className="w-full">
          <div className="relative" aria-label={content.hero.headline}>
            <h1 className="sr-only">{content.hero.headline}</h1>
            <ParticleText
              text={content.hero.headline}
              className="w-full h-[clamp(180px,32vw,440px)]"
              density={6}
              repulsion={120}
            />
          </div>
        </DraggableModule>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
          <div className="md:col-span-6 md:col-start-7 relative min-h-[260px]">
            <DraggableModule
              label="MOD-01 / subline"
              delay={0.2}
              className="md:rounded-md md:border md:border-white/10 md:bg-black/50 md:backdrop-blur-md md:p-5 max-w-xl md:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
            >
              <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
                {content.hero.subline}
              </p>
            </DraggableModule>

            <DraggableModule
              delay={0.35}
              className="mt-6 inline-block md:rounded-full md:border md:border-white/10 md:bg-black/50 md:backdrop-blur-md md:p-2 md:pl-3"
            >
              <div className="flex items-center gap-3">
                <span className="hidden md:inline-flex font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 items-center gap-1">
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
            </DraggableModule>
          </div>
        </div>
      </div>
    </section>
  );
}