import { ui } from "@/content/site";
import { cn } from "@/lib/cn";

type Props = { className?: string; starClassName?: string };

const STAR =
  "M12 2.6l2.83 6.08 6.67.78-4.93 4.56 1.32 6.58L12 17.3l-5.89 3.3 1.32-6.58L2.5 9.46l6.67-.78L12 2.6Z";

/** 5 estrelas douradas. Lido como uma imagem só ("Nota 5 de 5"). */
export function StarRating({ className, starClassName }: Props) {
  return (
    <span
      role="img"
      aria-label={ui.notaAria}
      className={cn("inline-flex gap-1 text-gold-500", className)}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          className={cn("size-5", starClassName)}
        >
          <path d={STAR} fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}
