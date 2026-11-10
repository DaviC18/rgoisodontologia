/**
 * QA dos componentes base (Fase 1). Abrir em `/?demo=components`.
 * Não é importado no App; o integrador remove na Fase 3.
 */
import { Gift } from "lucide-react";
import { checkup, depoimentos, hero, historia, MSG, numeros, tratamentos, ui } from "@/content/site";
import { CountUp } from "./CountUp";
import { GoldLine } from "./GoldLine";
import { Grain } from "./Grain";
import { Logo } from "./Logo";
import { MagneticButton } from "./MagneticButton";
import { Marquee } from "./Marquee";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { SplitHeading } from "./SplitHeading";
import { SpotlightCard } from "./SpotlightCard";
import { StarRating } from "./StarRating";
import { ToothMark } from "./ToothMark";
import { WhatsAppButton } from "./WhatsAppButton";

const Label = ({ children }: { children: string }) => (
  <p className="mb-4 font-mono text-xs tracking-wider text-ink-600 uppercase">{children}</p>
);

export default function DemoComponents() {
  return (
    <main className="space-y-24 pb-48">
      <section className="container-site pt-16">
        <Label>Logo (mask / color) + ToothMark</Label>
        <div className="flex flex-wrap items-center gap-8">
          <Logo className="h-16" />
          <div className="rounded-card bg-navy-950 p-6">
            <Logo variant="color" className="h-16" />
          </div>
          <ToothMark className="size-12 text-gold-700" />
        </div>
      </section>

      <section className="container-site">
        <Label>SplitHeading h1 (load)</Label>
        <SplitHeading
          as="h1"
          trigger="load"
          text={hero.titulo}
          highlight="cuidando da sua."
          className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] font-medium text-navy-950"
          highlightClassName="text-gold-700"
        />
      </section>

      <section className="container-site">
        <Label>WhatsAppButton (primary / ghost) + MagneticButton</Label>
        <div className="flex flex-wrap gap-4">
          <MagneticButton>
            <WhatsAppButton msg={hero.ctaPrimario.msg} origem="demo" size="lg">
              {hero.ctaPrimario.texto}
            </WhatsAppButton>
          </MagneticButton>
          <WhatsAppButton msg={MSG.avaliacao} origem="demo" variant="ghost" size="sm">
            {ui.agendar}
          </WhatsAppButton>
        </div>
      </section>

      <section className="container-site">
        <Label>CountUp + StarRating</Label>
        <div className="flex flex-wrap gap-12">
          {numeros.map((n) => (
            <div key={n.rotulo}>
              <CountUp
                valor={n.valor}
                decimais={n.decimais}
                prefixo={n.prefixo}
                sufixo={n.sufixo}
                className="font-display text-5xl text-navy-950"
              />
              <p className="text-sm text-ink-600">{n.rotulo}</p>
            </div>
          ))}
          <StarRating starClassName="size-7" />
        </div>
      </section>

      <section className="container-site">
        <Label>SectionHeader + Reveal (stagger) + SpotlightCard</Label>
        <SectionHeader id="demo-trat" eyebrow={checkup.eyebrow} titulo={checkup.titulo} subtitulo={checkup.subtitulo} />
        <Reveal stagger={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tratamentos.map((t) => (
            <SpotlightCard key={t.id} className="p-8">
              <h3 className="text-xl text-navy-950">{t.nome}</h3>
              <p className="mt-2 text-ink-600">{t.texto}</p>
            </SpotlightCard>
          ))}
        </Reveal>
      </section>

      <section className="container-site">
        <Label>GoldLine (curve / horizontal / vertical)</Label>
        <GoldLine variant="curve" />
        <GoldLine className="mt-12" />
        <div className="mt-12 flex h-64 gap-8">
          <GoldLine variant="vertical" />
          <Reveal className="flex items-center gap-3 rounded-card bg-navy-950 p-6 text-cream-50">
            <Gift className="text-gold-300" aria-hidden="true" />
            {checkup.itens[3]?.titulo}
          </Reveal>
        </div>
      </section>

      <section className="relative isolate bg-navy-950 py-24">
        <Grain />
        <div className="container-site">
          <SectionHeader id="demo-hist" tone="dark" eyebrow={historia.eyebrow} titulo={historia.titulo} subtitulo={historia.resumo} />
        </div>
      </section>

      <section>
        <div className="container-site">
          <Label>Marquee (left / right)</Label>
        </div>
        <div className="space-y-6">
          {(["left", "right"] as const).map((dir) => (
            <Marquee key={dir} direction={dir} staticClassName="container-site">
              {depoimentos.itens.map((d) => (
                <figure key={d.texto} className="w-80 shrink-0 rounded-card border border-sand-200 bg-cream-100 p-6">
                  <blockquote className="text-ink-900">{d.texto}</blockquote>
                  <figcaption className="mt-3 text-sm text-ink-600">{d.autor}</figcaption>
                </figure>
              ))}
            </Marquee>
          ))}
        </div>
      </section>
    </main>
  );
}
