import { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

type Line = { kind: "in" | "out"; text: string };

const responses: Record<string, string[]> = {
  "what's your stack?": [
    "→ TypeScript everywhere. React, Vite, Next, TanStack.",
    "→ Postgres + Drizzle / Prisma. Redis, Kafka when warranted.",
    "→ Edge runtimes (Cloudflare Workers) + Go/Rust services."
  ],
  "show me a project": [
    "→ See ./works — POS Inventory, V2 CMS, SlothOps, Whatsapp Sender.",
    "→ Each one shipped to production. Each one used daily."
  ],
  "how do you work?": [
    "→ Small senior team. 2–4 people per engagement.",
    "→ Weekly demos. No JIRA theatre. PRs as the unit of progress."
  ],
  "what does it cost?": [
    "→ Sprint engagements from $12k/wk.",
    "→ Fixed-scope MVPs from $40k. Equity considered for outliers."
  ],
  "are you available?": [
    "→ Yes. New engagements opening Q3 2026.",
    "→ Reply to office.snj.2005@gmail.com with one paragraph."
  ]
};

const prompts = Object.keys(responses);

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "sumbhav-cli v1.0.0 — connected." },
    { kind: "out", text: "Type a question or pick a prompt below." }
  ]);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const ask = (q: string) => {
    if (busy) return;
    setBusy(true);
    setLines((p) => [...p, { kind: "in", text: q }]);
    const reply = responses[q] ?? ["→ Hmm, ask me about stack, projects, process or pricing."];
    let i = 0;
    const tick = () => {
      setLines((p) => [...p, { kind: "out", text: reply[i] }]);
      i++;
      if (i < reply.length) setTimeout(tick, 380);
      else setBusy(false);
    };
    setTimeout(tick, 320);
  };

  return (
    <section id="talk" className="px-4 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60 mb-4">
            ◍ /talk-to-sumbhav
          </div>
          <h2 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tight uppercase">
            Ask the <span className="text-gradient-warm">studio</span>.
          </h2>
          <p className="mt-6 text-foreground/70 max-w-md">
            A small terminal wired to a real human inbox. No bots, no funnels —
            just answers.
          </p>
        </div>

        <div className="md:col-span-8">
          <div className="border border-border rounded-md bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40 font-mono text-xs">
              <span className="h-3 w-3 rounded-full bg-[color:var(--salmon)]" />
              <span className="h-3 w-3 rounded-full bg-[color:var(--peach)]" />
              <span className="h-3 w-3 rounded-full bg-[color:var(--sand)]" />
              <div className="flex-1 text-center text-foreground/50 flex items-center justify-center gap-2">
                <TerminalIcon size={12} /> sumbhav@studio: ~/talk
              </div>
            </div>

            <div ref={scrollRef} className="h-72 md:h-80 overflow-y-auto p-5 font-mono text-sm leading-relaxed no-scrollbar">
              {lines.map((l, i) => (
                <div key={i} className={l.kind === "in" ? "text-[color:var(--salmon)]" : "text-foreground/85"}>
                  {l.kind === "in" ? `> ${l.text}` : l.text}
                </div>
              ))}
              <div className="text-[color:var(--salmon)] blink-cursor">{busy ? "" : "> "}</div>
            </div>

            <div className="flex flex-wrap gap-2 p-4 border-t border-border">
              {prompts.map((p) => (
                <button
                  key={p}
                  onClick={() => ask(p)}
                  disabled={busy}
                  className="font-mono text-xs uppercase tracking-[0.15em] border border-border rounded-full px-3 py-2 text-foreground/80 hover:border-[color:var(--salmon)] hover:text-[color:var(--salmon)] transition-colors disabled:opacity-40"
                >
                  [ {p} ]
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}