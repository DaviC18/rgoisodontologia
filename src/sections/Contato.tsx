import { useMemo } from "react";
import { ExternalLink, Info, MapPin, Phone } from "lucide-react";
import { clinica, contato, MSG, ui } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cn } from "@/lib/cn";

const { endereco } = clinica;
const MAPA = `https://www.google.com/maps?q=${endereco.lat},${endereco.lng}&z=16&output=embed`;
const DIAS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Dia da semana (0 = domingo) no fuso da clínica, independente do fuso do visitante. */
function diaHojeSP() {
  const d = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
  return DIAS.indexOf(d);
}

export function Contato() {
  const hoje = useMemo(() => diaHojeSP(), []);

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="bg-cream-100 py-24 md:py-32"
    >
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            id="contato-titulo"
            eyebrow={contato.eyebrow}
            titulo={contato.titulo}
          />

          <Reveal className="mt-10 space-y-8">
            <address className="space-y-4 not-italic">
              <p className="flex gap-3">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-gold-700"
                />
                <span>
                  <span className="sr-only">{ui.endereco}: </span>
                  {endereco.logradouro}
                  <br />
                  {endereco.bairro}, {endereco.cidade} – {endereco.uf}
                  <br />
                  <span className="text-ink-600">
                    {ui.cep} {endereco.cep}
                  </span>
                </span>
              </p>
              <p className="flex gap-3">
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-gold-700"
                />
                <span>
                  <span className="sr-only">{ui.telefone}: </span>
                  {clinica.telefoneExibicao}
                </span>
              </p>
            </address>

            <div>
              <h3 className="mb-3 text-xl font-medium text-navy-950">
                {contato.horariosTitulo}
              </h3>
              <table className="w-full max-w-md text-left">
                <tbody>
                  {clinica.horarios.map((h) => {
                    const ehHoje = h.dow.includes(hoje);
                    return (
                      <tr
                        key={h.dias}
                        aria-current={ehHoje ? "date" : undefined}
                        className={cn(
                          "border-b border-sand-200",
                          ehHoje && "bg-cream-50 font-semibold text-navy-950",
                        )}
                      >
                        <th scope="row" className="py-3 pl-3 font-[inherit]">
                          {h.dias}
                          {ehHoje && (
                            <span className="ml-2 rounded-full bg-gold-500/20 px-2 py-0.5 text-xs font-semibold text-gold-700">
                              {contato.hoje}
                            </span>
                          )}
                        </th>
                        <td className="py-3 pr-3 text-right">{h.horas}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="flex gap-3 rounded-card border-l-2 border-gold-500 bg-cream-50 p-5 leading-relaxed text-ink-600">
              <Info
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-gold-700"
              />
              {clinica.avisoContato}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <WhatsAppButton msg={MSG.avaliacao} origem="contato" size="md">
                {ui.chamarWhatsapp}
              </WhatsAppButton>
              <a
                href={endereco.mapsUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-navy-950/20 px-6 text-base font-semibold text-navy-950 transition-colors hover:border-gold-500 hover:bg-cream-50"
              >
                {ui.abrirMaps}
                <ExternalLink aria-hidden="true" className="size-4" />
                <span className="sr-only">{ui.abreEmNovaAba}</span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative min-h-80 lg:min-h-0">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-card border border-gold-500"
          />
          <iframe
            src={MAPA}
            title={contato.mapaTitulo}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="relative size-full min-h-80 rounded-card border-0 bg-cream-50"
          />
        </Reveal>
      </div>
    </section>
  );
}
