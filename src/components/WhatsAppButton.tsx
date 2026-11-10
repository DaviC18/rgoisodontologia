import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { ui, whatsappLink } from "@/content/site";
import { cn } from "@/lib/cn";
import { track } from "@/lib/track";

type Props = {
  /** Mensagem pré-preenchida (sempre de `MSG` em site.ts) */
  msg: string;
  /** id da seção de onde veio o clique (evento `cta_whatsapp`) */
  origem: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  className?: string;
};

const VARIANTS = {
  primary: "bg-navy-950 text-cream-50 hover:bg-navy-700 [&_svg]:text-gold-300",
  ghost: "border border-navy-950/20 text-navy-950 hover:border-gold-500 hover:bg-cream-100 [&_svg]:text-gold-700",
  light: "bg-cream-50 text-navy-950 hover:bg-gold-300 [&_svg]:text-gold-700",
} as const;

const SIZES = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-6 text-base",
  lg: "min-h-14 px-8 text-lg",
} as const;

/** CTA de agendamento: abre o WhatsApp com mensagem pronta e registra `cta_whatsapp`. */
export function WhatsAppButton({
  msg,
  origem,
  children,
  variant = "primary",
  size = "md",
  icon = true,
  className,
}: Props) {
  return (
    <a
      href={whatsappLink(msg)}
      target="_blank"
      rel="noopener"
      onClick={() => track("cta_whatsapp", { origem })}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-colors duration-300",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
    >
      {icon && <MessageCircle aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />}
      <span>{children}</span>
      <span className="sr-only"> {ui.abreEmNovaAba}</span>
    </a>
  );
}
