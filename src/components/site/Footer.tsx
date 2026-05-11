import { useEffect, useState } from "react";
import content from "@/data/site-content.json";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata"
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer id="contact" className="border-t border-border px-4 md:px-10 pt-20 pb-8">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60 flex flex-wrap gap-x-8 gap-y-2 mb-12">
        <span>◍ /contact</span>
        <span>◍ Bengaluru, IN — {time || "--:--:--"} IST</span>
        <span>◍ Studio open</span>
      </div>

      <a
        href={`mailto:${content.brand.email}`}
        className="block text-gradient-warm font-black uppercase leading-[0.85] tracking-[-0.04em] hover:opacity-90 transition-opacity"
        style={{ fontSize: "clamp(3rem, 13vw, 14rem)" }}
      >
        Let's<br /> Work<br /> Together.
      </a>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-8">
        <a
          href={`mailto:${content.brand.email}`}
          className="font-mono text-sm uppercase tracking-[0.2em] hover:text-[color:var(--salmon)] inline-flex items-center gap-2"
        >
          {content.brand.email} <ArrowUpRight size={14} />
        </a>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm uppercase tracking-[0.2em]">
          {content.footer.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="hover:text-[color:var(--salmon)] inline-flex items-center gap-1"
                target="_blank"
                rel="noreferrer"
              >
                {s.label} <ArrowUpRight size={12} />
              </a>
            </li>
          ))}
        </ul>

        <div className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/60 md:text-right">
          © {new Date().getFullYear()} SumBhav Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}