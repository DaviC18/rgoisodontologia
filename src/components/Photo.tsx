import { useState } from "react";
import { ui } from "@/content/site";
import { cn } from "@/lib/cn";
import { ToothMark } from "./ToothMark";

type Props = {
  /** Fontes em ordem de preferência; se todas falharem, mostra o placeholder "Foto em breve". */
  srcs: string[];
  alt: string;
  width: number;
  height: number;
  /** imagem do LCP (hero): carrega com prioridade, sem lazy */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/** Foto real da clínica com fallback neutro enquanto o arquivo não existe (SPEC §9). */
export function Photo({
  srcs,
  alt,
  width,
  height,
  priority,
  className,
  imgClassName,
}: Props) {
  const [i, setI] = useState(0);
  const src = srcs[i];

  return (
    <div className={cn("overflow-hidden bg-cream-100", className)}>
      {src ? (
        <img
          key={src}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          onError={() => setI((n) => n + 1)}
          className={cn("size-full object-cover", imgClassName)}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={cn(
            "flex size-full flex-col items-center justify-center gap-3 text-gold-700",
            imgClassName,
          )}
        >
          <ToothMark className="size-12" />
          <span className="text-sm font-medium text-ink-600">
            {ui.fotoEmBreve}
          </span>
        </div>
      )}
    </div>
  );
}
