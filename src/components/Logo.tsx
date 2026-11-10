import { clinica } from "@/content/site";
import { cn } from "@/lib/cn";

type Props = {
  /** `color`: dourado original (fundo navy). `mask`: pintado com `currentColor` (fundo claro). */
  variant?: "color" | "mask";
  className?: string;
};

/** Proporção do arquivo gerado (640×466). */
const W = 640;
const H = 466;

/** Logo oficial da clínica (gerado de `design/logo-original.jpg`). Controlar o tamanho pela altura/largura em `className`. */
export function Logo({ variant = "mask", className }: Props) {
  if (variant === "color") {
    return (
      <img
        src="/images/logo.webp"
        alt={clinica.nome}
        width={W}
        height={H}
        decoding="async"
        className={cn("h-12 w-auto", className)}
      />
    );
  }
  return (
    <span
      role="img"
      aria-label={clinica.nome}
      className={cn("inline-block h-12 bg-current text-gold-700", className)}
      style={{
        aspectRatio: `${W} / ${H}`,
        maskImage: "url(/images/logo-mask.webp)",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
}
