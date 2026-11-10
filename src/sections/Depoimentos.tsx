import { ExternalLink, Quote } from "lucide-react";
import { depoimentos, ui } from "@/content/site";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { StarRating } from "@/components/StarRating";
import { useReducedMotion } from "@/lib/useReducedMotion";

// TODO_CLINICA: primeiro nome dos autores, se a clínica autorizar
const itens = depoimentos.itens;
const metade = Math.ceil(itens.length / 2);

/** `repeticao`: cópia só para preencher a faixa larga; escondida do leitor de tela */
function Card({
  texto,
  autor,
  repeticao,
}: (typeof itens)[number] & { repeticao?: boolean }) {
  return (
    <figure
      aria-hidden={repeticao || undefined}
      className="flex w-[min(22rem,82vw)] shrink-0 flex-col rounded-card border border-sand-200 bg-cream-50 p-7"
    >
      <Quote
        aria-hidden="true"
        className="size-6 text-gold-500"
        strokeWidth={1.5}
      />
      <blockquote className="mt-4 flex-1 leading-relaxed text-ink-900">
        {texto}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 text-sm text-ink-600">
        <StarRating starClassName="size-3.5" />
        {autor}
      </figcaption>
    </figure>
  );
}

export function Depoimentos() {
  const reduced = useReducedMotion();

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-titulo"
      className="overflow-hidden bg-cream-100 py-24 md:py-32"
    >
      <div className="container-site flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          id="depoimentos-titulo"
          eyebrow={depoimentos.eyebrow}
          titulo={depoimentos.titulo}
        />
        <Reveal className="flex items-center gap-5">
          <span className="font-display text-7xl leading-none text-navy-950">
            5,0
          </span>
          <span className="flex flex-col gap-1.5">
            <StarRating starClassName="size-6" />
            <span className="text-sm text-ink-600">
              {ui.avaliacoesNoGoogle(depoimentos.totalAvaliacoes)}
            </span>
          </span>
        </Reveal>
      </div>

      <div className="mt-14 space-y-5">
        {reduced ? (
          <Marquee staticClassName="container-site">
            {itens.map((d) => (
              <Card key={d.texto} {...d} />
            ))}
          </Marquee>
        ) : (
          <>
            {/* mobile: uma linha com todos; desktop: duas linhas em sentidos opostos */}
            <Marquee className="lg:hidden" duration={55}>
              {itens.map((d) => (
                <Card key={d.texto} {...d} />
              ))}
            </Marquee>
            <Marquee className="hidden lg:block" duration={45}>
              {[...itens.slice(0, metade), ...itens.slice(0, metade)].map(
                (d, i) => (
                  <Card key={i} {...d} repeticao={i >= metade} />
                ),
              )}
            </Marquee>
            <Marquee
              className="hidden lg:block"
              direction="right"
              duration={45}
            >
              {[...itens.slice(metade), ...itens.slice(metade)].map((d, i) => (
                <Card key={i} {...d} repeticao={i >= itens.length - metade} />
              ))}
            </Marquee>
          </>
        )}
      </div>

      <div className="container-site mt-12">
        <a
          href={depoimentos.googleUrl}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-gold-700 underline-offset-4 hover:underline"
        >
          {ui.verAvaliacoes}
          <ExternalLink aria-hidden="true" className="size-4" />
          <span className="sr-only">{ui.abreEmNovaAba}</span>
        </a>
      </div>
    </section>
  );
}
