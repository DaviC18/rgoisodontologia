import { useRef } from "react";
import { hero, numeros } from "@/content/site";
import { CountUp } from "@/components/CountUp";
import { MagneticButton } from "@/components/MagneticButton";
import { Photo } from "@/components/Photo";
import { SplitHeading } from "@/components/SplitHeading";
import { StarRating } from "@/components/StarRating";
import { ToothMark } from "@/components/ToothMark";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Trecho do título em itálico dourado: a segunda linha ("cuidando da sua."). */
const destaque = hero.titulo.split("\n")[1];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  // Entrada (≤1.2s): eyebrow → título (SplitHeading, delay) → subtítulo → CTAs → foto → números
  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({
          defaults: { duration: 0.6, ease: "power3.out" },
        });
        tl.from(q("[data-hero='eyebrow']"), { opacity: 0, y: 16 })
          .from(q("[data-hero='sub']"), { opacity: 0, y: 20 }, 0.35)
          .from(
            q("[data-hero='ctas'] > *"),
            { opacity: 0, y: 20, stagger: 0.08 },
            0.45,
          )
          .fromTo(
            q("[data-hero='foto']"),
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.9,
              ease: "power3.inOut",
            },
            0.2,
          )
          .from(
            q("[data-hero='numeros'] > *"),
            { opacity: 0, y: 16, stagger: 0.06 },
            0.6,
          );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative isolate overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28"
    >
      {/* forma navy decorativa atrás da foto */}
      <div
        aria-hidden="true"
        className="absolute top-20 right-0 -z-10 hidden h-[72%] w-[36%] rounded-l-[10rem] bg-navy-950 lg:block"
      />
      <ToothMark className="absolute bottom-16 left-[52%] -z-10 hidden size-16 text-gold-500/40 lg:block" />

      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p
            data-hero="eyebrow"
            className="mb-5 text-[0.8125rem] font-semibold tracking-[0.2em] text-gold-700 uppercase"
          >
            {hero.eyebrow}
          </p>
          <SplitHeading
            as="h1"
            id="inicio-titulo"
            trigger="load"
            delay={0.1}
            text={hero.titulo}
            highlight={destaque}
            className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.04] font-medium text-navy-950"
            highlightClassName="text-gold-700"
          />
          <p
            data-hero="sub"
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-600"
          >
            {hero.subtitulo}
          </p>

          <div
            data-hero="ctas"
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <MagneticButton>
              <WhatsAppButton
                msg={hero.ctaPrimario.msg}
                origem="inicio"
                size="lg"
                className="w-full sm:w-auto"
              >
                {hero.ctaPrimario.texto}
              </WhatsAppButton>
            </MagneticButton>
            <a
              href={hero.ctaSecundario.href}
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-navy-950/20 px-7 text-base font-semibold text-navy-950 transition-colors hover:border-gold-500 hover:bg-cream-100"
            >
              {hero.ctaSecundario.texto}
            </a>
          </div>

          <ul data-hero="ctas" className="mt-8 flex flex-wrap gap-2">
            {hero.selos.map((selo) => (
              <li
                key={selo}
                className="rounded-full border border-sand-200 bg-cream-50 px-3.5 py-1.5 text-sm font-medium text-ink-600"
              >
                {selo}
              </li>
            ))}
          </ul>

          <dl
            data-hero="numeros"
            className="mt-10 grid grid-cols-3 gap-4 border-t border-sand-200 pt-8"
          >
            {numeros.map((n) => (
              <div key={n.rotulo} className="flex flex-col-reverse gap-1">
                <dt className="text-sm leading-snug text-ink-600">
                  {n.rotulo}
                </dt>
                <dd className="flex items-center gap-2">
                  <CountUp
                    valor={n.valor}
                    decimais={n.decimais}
                    prefixo={n.prefixo}
                    sufixo={n.sufixo}
                    className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-none text-navy-950"
                  />
                  {n.icone === "estrela" && (
                    <StarRating
                      className="hidden sm:inline-flex"
                      starClassName="size-3.5"
                    />
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* foto em arco com moldura dourada deslocada */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-full border border-gold-500 lg:translate-x-5 lg:translate-y-5"
          />
          <div data-hero="foto" className="relative">
            <Photo
              srcs={[hero.foto.src]}
              srcSet={hero.foto.srcSet}
              sizes={hero.foto.sizes}
              alt={hero.foto.alt}
              width={hero.foto.width}
              height={hero.foto.height}
              priority
              className="aspect-[4/5] max-h-[60svh] w-full rounded-t-full lg:max-h-none"
              imgClassName="object-[50%_45%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
