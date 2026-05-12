import content from "@/data/site-content.json";

const LOGO_SLUGS: Record<string, string> = {
  "React.js": "react/FFF0BE",
  "Next.js": "nextdotjs/FFF0BE",
  "Firebase": "firebase/FFF0BE",
  "Flutter": "flutter/FFF0BE",
  "TDL Integration": "tally-solutions/FFF0BE",
  "Docker": "docker/FFF0BE",
};

export function Marquee() {
  const base = content.marquee;
  const items = [...base, ...base, ...base];
  return (
    <div className="border-y border-border overflow-hidden bg-background py-5">
      <div className="marquee gap-12 whitespace-nowrap">
        {items.map((s, i) => {
          const slug = LOGO_SLUGS[s];
          return (
            <div
              key={i}
              className="font-mono text-sm uppercase tracking-[0.2em] text-foreground/70 inline-flex items-center gap-12 shrink-0"
            >
              <span className="inline-flex items-center gap-3">
                {slug ? (
                  <img
                    src={`https://cdn.simpleicons.org/${slug}`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-4 w-4 opacity-80"
                  />
                ) : null}
                <span>{s}</span>
              </span>
              <span className="text-[color:var(--salmon)]">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}