import content from "@/data/site-content.json";

export function Manifesto() {
  return (
    <section className="px-4 md:px-10 py-24 md:py-40 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-2 font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
          ◍ /manifesto
        </div>
        <div className="md:col-span-10">
          <h2
            className="font-black uppercase leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.25rem, 6vw, 6rem)" }}
          >
            <span className="text-gradient-warm">{content.manifesto.title}</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg md:text-xl text-foreground/80 leading-relaxed">
            {content.manifesto.body}
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {content.services.map((s) => (
              <div key={s.code} className="bg-background p-8 group hover:bg-card transition-colors flex flex-col">
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">{s.code}</div>
                <div className="mt-4 text-2xl md:text-3xl font-bold uppercase tracking-tight">
                  {s.name}
                </div>
                <p className="mt-3 text-foreground/70 flex-1">{s.blurb}</p>
                {s.badges && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.badges.map((b) => (
                      <span
                        key={b}
                        className="font-mono text-[10px] uppercase tracking-[0.2em] border border-border rounded-full px-3 py-1 text-foreground/70 group-hover:border-[color:var(--salmon)] group-hover:text-[color:var(--salmon)] transition-colors"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}