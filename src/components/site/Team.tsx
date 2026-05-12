import content from "@/data/site-content.json";
import { motion } from "framer-motion";

export function Team() {
  return (
    <section id="team" className="px-4 md:px-10 py-24 md:py-40 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-2 font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
          ◍ /team
        </div>
        <div className="md:col-span-10">
          <h2
            className="font-black uppercase leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.25rem, 6vw, 6rem)" }}
          >
            <span className="text-gradient-warm">Senior people. No layers.</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg md:text-xl text-foreground/80 leading-relaxed">
            Five operators between you and your shipped product — a small, deliberate team
            spanning engineering, mobile, ERP and delivery.
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {content.team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="bg-background p-8 group hover:bg-card transition-colors flex flex-col min-h-[280px]"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                  / 0{i + 1}
                </div>
                <div
                  aria-hidden="true"
                  className="mt-6 h-16 w-16 rounded-full border border-border flex items-center justify-center font-mono text-xl uppercase tracking-tight text-foreground/80 group-hover:border-[color:var(--salmon)] group-hover:text-[color:var(--salmon)] transition-colors"
                >
                  {m.name.slice(0, 1)}
                </div>
                <div className="mt-6 text-xl md:text-2xl font-bold uppercase tracking-tight">
                  {m.name}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--salmon)]">
                  {m.role}
                </div>
                <p className="mt-4 text-foreground/70 text-sm leading-relaxed">{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}