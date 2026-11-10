import { ExternalLink } from "lucide-react";
import { clinica, MSG, ui, whatsappLink } from "@/content/site";
import { Grain } from "@/components/Grain";
import { Logo } from "@/components/Logo";
import { track } from "@/lib/track";

export function Footer() {
  const { endereco, responsavelTecnico } = clinica;
  return (
    <footer className="relative isolate bg-navy-950 pt-16 pb-28 text-cream-100/80 md:pb-16">
      <Grain />
      <div className="container-site grid gap-10 md:grid-cols-[1.2fr_1fr_auto] md:items-start">
        <div>
          <Logo variant="color" className="h-20" />
          <p className="mt-5 font-display text-xl text-cream-50 italic">
            {clinica.slogan}
          </p>
        </div>

        <address className="text-sm leading-relaxed not-italic">
          {endereco.logradouro}
          <br />
          {endereco.bairro}, {endereco.cidade} – {endereco.uf}
          <br />
          {clinica.telefoneExibicao}
        </address>

        <ul className="flex gap-2 text-sm font-semibold">
          <li>
            <a
              href={clinica.instagram}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-1.5 px-2 text-gold-300 hover:text-cream-50"
            >
              {ui.instagram}
              <ExternalLink aria-hidden="true" className="size-3.5" />
              <span className="sr-only">{ui.abreEmNovaAba}</span>
            </a>
          </li>
          <li>
            <a
              href={whatsappLink(MSG.avaliacao)}
              target="_blank"
              rel="noopener"
              onClick={() => track("cta_whatsapp", { origem: "footer" })}
              className="inline-flex min-h-11 items-center gap-1.5 px-2 text-gold-300 hover:text-cream-50"
            >
              {ui.whatsapp}
              <ExternalLink aria-hidden="true" className="size-3.5" />
              <span className="sr-only">{ui.abreEmNovaAba}</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="container-site mt-12 flex flex-col gap-2 border-t border-cream-50/10 pt-8 text-xs sm:flex-row sm:justify-between">
        {/* TODO_CLINICA: número do CRO (obrigatório em publicidade odontológica) */}
        <p>
          {ui.responsavelTecnico}: {responsavelTecnico.nome} –{" "}
          {responsavelTecnico.cro}
        </p>
        <p>{ui.direitos(new Date().getFullYear())}</p>
      </div>
    </footer>
  );
}
