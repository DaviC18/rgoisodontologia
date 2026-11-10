import { Gift } from "lucide-react";
import { checkup } from "@/content/site";
import { GoldLine } from "@/components/GoldLine";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cn } from "@/lib/cn";

// TODO_CLINICA: itens do programa e conteúdo do Kit Premium a confirmar (checkup.pendente)
const KIT = "Kit Premium";

export function Checkup() {
  return (
    <section
      id="checkup"
      aria-labelledby="checkup-titulo"
      className="bg-cream-100 py-24 md:py-32"
    >
      <div className="container-site grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            id="checkup-titulo"
            eyebrow={checkup.eyebrow}
            titulo={checkup.titulo}
            subtitulo={checkup.subtitulo}
          />
          <Reveal className="mt-10 hidden lg:block">
            <MagneticButton>
              <WhatsAppButton msg={checkup.cta.msg} origem="checkup" size="lg">
                {checkup.cta.texto}
              </WhatsAppButton>
            </MagneticButton>
          </Reveal>
        </div>

        <div id="checkup-lista" className="relative">
          <div
            className="absolute top-6 bottom-6 left-[1.4375rem]"
            aria-hidden="true"
          >
            <GoldLine variant="vertical" trigger="#checkup-lista" />
          </div>
          <Reveal as="ol" stagger={0.12} className="relative space-y-6">
            {checkup.itens.map((item, i) => {
              const kit = item.titulo === KIT;
              return (
                <li key={item.titulo} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative flex size-12 shrink-0 items-center justify-center rounded-full border font-display text-lg",
                      kit
                        ? "border-gold-500 bg-navy-950 text-gold-300"
                        : "border-gold-500 bg-cream-50 text-gold-700",
                    )}
                  >
                    {kit ? (
                      <Gift className="size-5" strokeWidth={1.5} />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                  <div
                    className={cn(
                      "flex-1 rounded-card p-6",
                      kit
                        ? "bg-navy-950 text-cream-50 shadow-xl shadow-navy-950/15"
                        : "bg-cream-50",
                    )}
                  >
                    <h3
                      className={cn(
                        "text-xl font-medium",
                        kit ? "text-gold-300" : "text-navy-950",
                      )}
                    >
                      {item.titulo}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 leading-relaxed",
                        kit ? "text-cream-100/85" : "text-ink-600",
                      )}
                    >
                      {item.texto}
                    </p>
                  </div>
                </li>
              );
            })}
          </Reveal>
        </div>

        <Reveal className="lg:hidden">
          <WhatsAppButton
            msg={checkup.cta.msg}
            origem="checkup"
            size="lg"
            className="w-full text-center"
          >
            {checkup.cta.texto}
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}
