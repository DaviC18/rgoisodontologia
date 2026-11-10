import { cn } from "@/lib/cn";
import { SplitHeading } from "./SplitHeading";

type Props = {
  /** id do h2, usado no `aria-labelledby` da seção */
  id: string;
  eyebrow?: string;
  titulo: string;
  subtitulo?: string;
  /** trecho do título em itálico */
  highlight?: string;
  align?: "left" | "center";
  /** `dark` para seções navy */
  tone?: "light" | "dark";
  className?: string;
};

/** Eyebrow + h2 animado + subtítulo opcional. */
export function SectionHeader({
  id,
  eyebrow,
  titulo,
  subtitulo,
  highlight,
  align = "left",
  tone = "light",
  className,
}: Props) {
  const dark = tone === "dark";
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-[0.8125rem] font-semibold uppercase tracking-[0.2em]",
            dark ? "text-gold-300" : "text-gold-700",
          )}
        >
          {eyebrow}
        </p>
      )}
      <SplitHeading
        id={id}
        text={titulo}
        highlight={highlight}
        className={cn(
          "text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-medium text-balance",
          dark ? "text-cream-50" : "text-navy-950",
        )}
        highlightClassName={dark ? "text-gold-300" : "text-gold-700"}
      />
      {subtitulo && (
        <p
          className={cn(
            "mt-5 max-w-[65ch] text-lg leading-relaxed",
            align === "center" && "mx-auto",
            dark ? "text-cream-100/80" : "text-ink-600",
          )}
        >
          {subtitulo}
        </p>
      )}
    </header>
  );
}
