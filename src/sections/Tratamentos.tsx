import {
  ArrowRight,
  Gem,
  Shield,
  Smile,
  Sparkles,
  Stethoscope,
  Sun,
  type LucideIcon,
} from "lucide-react";
import {
  MSG,
  tratamentos,
  tratamentosHeader,
  tratamentosNota,
  ui,
} from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightCard } from "@/components/SpotlightCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";

/** `icone` do site.ts → componente lucide */
const ICONS: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  smile: Smile,
  sun: Sun,
  gem: Gem,
  shield: Shield,
};

// TODO_CLINICA: lista final de tratamentos (implante, ortodontia, canal, infantil?) a confirmar
export function Tratamentos() {
  return (
    <section
      id="tratamentos"
      aria-labelledby="tratamentos-titulo"
      className="py-24 md:py-32"
    >
      <div className="container-site">
        <SectionHeader
          id="tratamentos-titulo"
          eyebrow={tratamentosHeader.eyebrow}
          titulo={tratamentosHeader.titulo}
        />

        <Reveal
          as="ul"
          stagger={0.08}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {tratamentos.map((t) => {
            const Icon = ICONS[t.icone] ?? Sparkles;
            return (
              <li key={t.id} className="flex">
                <SpotlightCard className="flex w-full flex-col p-7">
                  <span className="flex size-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-700">
                    <Icon
                      aria-hidden="true"
                      className="size-6"
                      strokeWidth={1.5}
                    />
                  </span>
                  <h3 className="mt-6 text-2xl font-medium text-navy-950">
                    {t.nome}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-600">
                    {t.texto}
                  </p>
                  <WhatsAppButton
                    msg={MSG.tratamento(t.nome)}
                    origem={`tratamentos-${t.id}`}
                    variant="link"
                    icon={false}
                    className="mt-5 self-start"
                  >
                    {ui.saberMais}
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-1 inline size-4"
                    />
                  </WhatsAppButton>
                </SpotlightCard>
              </li>
            );
          })}
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-start gap-4 rounded-card border border-dashed border-sand-200 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg text-ink-900">{tratamentosNota}</p>
          <WhatsAppButton
            msg={MSG.avaliacao}
            origem="tratamentos-nota"
            variant="ghost"
            size="sm"
          >
            {ui.chamarWhatsapp}
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}
