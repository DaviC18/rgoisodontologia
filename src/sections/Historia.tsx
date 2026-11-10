import { useRef } from "react";
import { historia } from "@/content/site";
import { Grain } from "@/components/Grain";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

// TODO_CLINICA: história completa do Dr. Rogério. Com `historiaCompletaPendente`, não há link "ler mais".
export function Historia() {
  const carta = useRef<HTMLDivElement>(null);

  // parágrafos da carta revelados linha a linha
  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        const ps = gsap.utils.toArray<HTMLElement>("[data-carta-p]");
        const splits = ps.map((p) =>
          SplitText.create(p, {
            type: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                opacity: 0,
                y: 14,
                duration: 0.7,
                stagger: 0.07,
                scrollTrigger: { trigger: p, start: "top 85%", once: true },
              }),
          }),
        );
        return () => splits.forEach((s) => s.revert());
      });
    },
    { scope: carta },
  );

  return (
    <section
      id="historia"
      aria-labelledby="historia-titulo"
      className="relative isolate overflow-hidden bg-navy-950 py-24 text-cream-50 md:py-32"
    >
      <Grain />
      <div className="container-site">
        <SectionHeader
          id="historia-titulo"
          tone="dark"
          eyebrow={historia.eyebrow}
          titulo={historia.titulo}
          subtitulo={historia.resumo}
        />

        <div className="mt-16 grid items-center gap-12 lg:mt-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal
            as="blockquote"
            className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] text-gold-300 italic"
          >
            <p>“{historia.destaqueCarta}”</p>
          </Reveal>

          <div
            ref={carta}
            className="-rotate-1 rounded-card bg-cream-50 p-7 text-ink-900 shadow-2xl shadow-black/30 sm:p-10 lg:p-12"
          >
            <div className="space-y-5 text-[1.0625rem] leading-relaxed">
              {historia.carta.map((par) => (
                <p key={par} data-carta-p="">
                  {par}
                </p>
              ))}
            </div>
            <p className="mt-8 border-t border-sand-200 pt-6 font-display text-xl text-gold-700 italic">
              {historia.assinatura}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
