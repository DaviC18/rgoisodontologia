import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { familia, familiaHeader, ui } from "@/content/site";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

export function Familia() {
  const track = useRef<HTMLUListElement>(null);
  const [atual, setAtual] = useState(0);

  // indicador do carrossel (mobile/tablet): card alinhado à esquerda; no fim da rolagem, o último
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const [a, b] = el.children as HTMLCollectionOf<HTMLElement>;
      if (!a || !b) return;
      const fim = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
      const passo = b.offsetLeft - a.offsetLeft;
      setAtual(
        fim ? el.children.length - 1 : Math.round(el.scrollLeft / passo),
      );
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // rola só o carrossel (scrollIntoView também moveria a página na vertical)
  const irPara = (i: number) => {
    const el = track.current;
    const li = el?.children[i] as HTMLElement | undefined;
    if (!el || !li) return;
    el.scrollTo({
      left: li.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="familia"
      aria-labelledby="familia-titulo"
      className="py-24 md:py-32"
    >
      <div className="container-site">
        <SectionHeader
          id="familia-titulo"
          eyebrow={familiaHeader.eyebrow}
          titulo={familiaHeader.titulo}
        />
      </div>

      <div className="container-site mt-14 lg:pb-10">
        <ul
          ref={track}
          // mobile/tablet: carrossel com scroll-snap; desktop: 3 colunas, a do meio 40px abaixo
          className="relative -mx-5 flex snap-x snap-mandatory scroll-px-5 [scrollbar-width:none] gap-5 overflow-x-auto px-5 pb-4 md:-mx-8 md:scroll-px-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {familia.map((p, i) => (
            <li
              key={p.nome}
              data-index={i}
              className={cn(
                "w-[82%] shrink-0 snap-start sm:w-[55%] md:w-[44%] lg:w-auto",
                // margem em vez de translate: não disputa o transform com animações GSAP
                i === 1 && "lg:mt-10",
              )}
            >
              <Reveal as="article" delay={i * 0.12}>
                <Photo
                  srcs={[p.foto]}
                  alt={p.nome}
                  width={800}
                  height={1000}
                  className="aspect-[4/5] rounded-card"
                />
                <h3 className="mt-6 text-2xl font-medium text-navy-950">
                  {p.nome}
                </h3>
                <p className="mt-1 text-sm font-semibold tracking-wide text-gold-700">
                  {p.cargo}
                </p>
                <p className="mt-4 leading-relaxed text-ink-600">{p.texto}</p>
                {"instagram" in p && p.instagram && (
                  <a
                    href={p.instagram}
                    target="_blank"
                    rel="noopener"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-gold-700 underline-offset-4 hover:underline"
                  >
                    {ui.instagram}
                    <ExternalLink aria-hidden="true" className="size-4" />
                    <span className="sr-only">{ui.abreEmNovaAba}</span>
                  </a>
                )}
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-center gap-1 lg:hidden">
          {familia.map((p, i) => (
            <button
              key={p.nome}
              type="button"
              aria-label={ui.irPara(p.nome)}
              aria-current={atual === i ? "true" : undefined}
              onClick={() => irPara(i)}
              className="flex size-11 items-center justify-center"
            >
              <span
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  atual === i ? "w-6 bg-gold-500" : "w-2 bg-sand-200",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
