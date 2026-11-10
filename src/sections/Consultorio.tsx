import { useRef } from "react";
import { consultorio } from "@/content/site";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/cn";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Grade assimétrica: 1 grande + 2 menores. Com menos fotos, a grade se adapta. */
const LAYOUT: Record<number, string[]> = {
  1: ["lg:col-span-3 aspect-[16/9]"],
  2: ["lg:col-span-2 aspect-[4/3]", "aspect-[4/3] lg:aspect-auto"],
  3: [
    "lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto",
    "aspect-[4/3]",
    "aspect-[4/3]",
  ],
};

export function Consultorio() {
  const root = useRef<HTMLElement>(null);
  const fotos = consultorio.fotos.slice(0, 3);
  const layout = LAYOUT[fotos.length] ?? [];

  // parallax suave dentro de cada moldura
  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="consultorio"
      aria-labelledby="consultorio-titulo"
      className="py-24 md:py-32"
    >
      <div className="container-site">
        <SectionHeader
          id="consultorio-titulo"
          eyebrow={consultorio.eyebrow}
          titulo={consultorio.titulo}
          subtitulo={consultorio.texto}
        />
        <Reveal
          stagger={0.12}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {fotos.map((f, i) => (
            <div
              key={f.src}
              className={cn(
                "relative overflow-hidden rounded-card",
                i === 0 && "sm:col-span-2",
                layout[i],
              )}
            >
              <div
                data-parallax=""
                className="absolute inset-x-0 -inset-y-[10%]"
              >
                <Photo
                  srcs={[f.src]}
                  alt={f.alt}
                  width={1440}
                  height={1080}
                  className="size-full"
                />
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
