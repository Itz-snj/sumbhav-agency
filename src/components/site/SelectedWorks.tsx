import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/constants/projects";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true
          }
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="works" ref={sectionRef} className="relative overflow-hidden border-t border-border bg-background">
      <div className="flex flex-col md:flex-row md:h-screen items-stretch">
        <div ref={trackRef} className="flex flex-col md:flex-row w-full md:w-auto md:h-full">
          {/* Intro panel */}
          <div className="w-full md:w-[60vw] shrink-0 flex flex-col justify-between p-8 md:p-16 border-b md:border-b-0 md:border-r border-border min-h-[50vh] md:min-h-0">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
              ◍ /selected-works ({projects.length})
            </div>
            <h2
              className="font-black leading-[0.85] tracking-[-0.03em] uppercase text-gradient-warm"
              style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}
            >
              Selected
              <br /> Works.
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/60">
              ↳ scroll horizontally
            </p>
          </div>

          {projects.map((p, i) => (
            <article
              key={p.id}
              className="w-full md:w-[70vw] shrink-0 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 p-8 md:p-16 border-b md:border-b-0 md:border-r border-border"
            >
              <div className="col-span-1 md:col-span-5 flex flex-col justify-between min-w-0">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50 mb-6">
                    0{i + 1} / {p.year} / {p.client}
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.88] uppercase break-words hyphens-auto">
                    {p.title}
                  </h3>
                  <p className="mt-6 text-foreground/75 max-w-md leading-relaxed">{p.description}</p>
                </div>

                <div className="mt-8 space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {p.techStack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-[0.2em] border border-border rounded-full px-3 py-1.5 text-foreground/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-foreground hover:text-[color:var(--salmon)] transition-colors"
                  >
                    Visit live <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              <div className="col-span-1 md:col-span-7 grid grid-cols-1 md:grid-cols-2 grid-rows-3 md:grid-rows-2 gap-3 min-h-[320px]">
                <div className="row-span-1 md:row-span-2 border border-border overflow-hidden bg-card aspect-video md:aspect-auto">
                  <img
                    src={p.gallery[0].src}
                    alt={p.gallery[0].alt}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="border border-border overflow-hidden bg-card aspect-video md:aspect-auto">
                  <img src={p.gallery[1].src} alt={p.gallery[1].alt} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="border border-border overflow-hidden bg-card aspect-video md:aspect-auto">
                  <img src={p.gallery[2].src} alt={p.gallery[2].alt} loading="lazy" className="w-full h-full object-cover" />
                </div>
              </div>
            </article>
          ))}

          {/* End panel */}
          <div className="w-full md:w-[40vw] shrink-0 flex items-center justify-center p-16 border-b md:border-b-0 md:border-r border-border min-h-[50vh] md:min-h-0">
            <a
              href="#contact"
              className="font-mono text-sm uppercase tracking-[0.3em] border border-border rounded-full px-6 py-4 hover:border-[color:var(--salmon)] hover:text-[color:var(--salmon)]"
            >
              [ start a project → ]
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}