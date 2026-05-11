import content from "@/data/site-content.json";

export function Marquee() {
  const items = [...content.marquee, ...content.marquee];
  return (
    <div className="border-y border-border overflow-hidden bg-background py-5">
      <div className="marquee gap-12 whitespace-nowrap">
        {items.map((s, i) => (
          <span
            key={i}
            className="font-mono text-sm uppercase tracking-[0.2em] text-foreground/70 flex items-center gap-12"
          >
            {s}
            <span className="text-[color:var(--salmon)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}