import { useRef } from "react";
import { filosofia } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Desktop com movimento: seção fixa (pin) e os 3 pilares trocam com o scroll.
 * Mobile ou reduced-motion: cards empilhados (o mesmo HTML, sem pin).
 */
export function Filosofia() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(`${MQ.desktop} and ${MQ.motion}`, () => {
        const q = gsap.utils.selector(root);
        const pilares = q("[data-pilar]");
        const nums = q("[data-num]");
        root.current?.setAttribute("data-pinned", "");

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            start: "top top",
            end: `+=${pilares.length * 70}%`,
            scrub: 0.6,
          },
        });
        tl.fromTo(
          q("[data-progresso]"),
          { scaleX: 1 / pilares.length },
          { scaleX: 1, ease: "none", duration: pilares.length - 1 },
          0,
        );
        pilares.forEach((p, i) => {
          if (i === 0) return;
          const t = i - 1;
          tl.to(pilares[i - 1]!, { opacity: 0, y: -40 }, t)
            .fromTo(p, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, t)
            .to(nums[i - 1]!, { opacity: 0, yPercent: -30 }, t)
            .fromTo(
              nums[i]!,
              { opacity: 0, yPercent: 30 },
              { opacity: 1, yPercent: 0 },
              t,
            );
        });
        tl.to({}, { duration: 0.3 });

        return () => root.current?.removeAttribute("data-pinned");
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="filosofia"
      aria-labelledby="filosofia-titulo"
      className="group/f bg-cream-100 py-24 data-pinned:flex data-pinned:h-svh data-pinned:items-center data-pinned:py-0 md:py-32"
    >
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeader
            id="filosofia-titulo"
            eyebrow={filosofia.eyebrow}
            titulo={filosofia.titulo}
            subtitulo={filosofia.intro}
          />
          {/* número grande + progresso: só no modo fixo */}
          <div
            aria-hidden="true"
            className="mt-12 hidden group-data-pinned/f:block"
          >
            <div className="relative h-[clamp(5rem,9vw,8rem)] overflow-hidden">
              {filosofia.pilares.map((p, i) => (
                <span
                  key={p.titulo}
                  data-num=""
                  className="absolute inset-0 font-display text-[clamp(5rem,9vw,8rem)] leading-none text-gold-500"
                  style={i > 0 ? { opacity: 0 } : undefined}
                >
                  {num(i)}
                </span>
              ))}
            </div>
            <div className="mt-6 h-px w-full max-w-sm bg-sand-200">
              <div
                data-progresso=""
                className="h-full origin-left bg-gold-500"
              />
            </div>
          </div>
        </div>

        <ol className="space-y-5 group-data-pinned/f:relative group-data-pinned/f:min-h-80 group-data-pinned/f:space-y-0 group-data-pinned/f:self-center">
          {filosofia.pilares.map((p, i) => (
            <li
              key={p.titulo}
              data-pilar=""
              className="rounded-card bg-cream-50 p-7 group-data-pinned/f:absolute group-data-pinned/f:inset-x-0 group-data-pinned/f:top-1/2 group-data-pinned/f:-translate-y-1/2 group-data-pinned/f:bg-transparent group-data-pinned/f:p-0"
            >
              {/* reveal no conteúdo, não no <li>: o <li> é animado pelo pin */}
              <Reveal delay={i * 0.1}>
                <span
                  aria-hidden="true"
                  className="font-display text-gold-700 group-data-pinned/f:hidden"
                >
                  {num(i)}
                </span>
                <h3 className="mt-2 text-3xl font-medium text-navy-950 group-data-pinned/f:text-[clamp(2.5rem,4vw,3.5rem)]">
                  {p.titulo}
                </h3>
                <p className="mt-3 max-w-[48ch] text-lg leading-relaxed text-ink-600 group-data-pinned/f:mt-5 group-data-pinned/f:text-xl">
                  {p.texto}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
