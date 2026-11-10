import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  /**
   * `vertical` / `horizontal`: linha reta que estica com o container (anima `scale`).
   * `curve`: divisor ondulado em SVG (anima o traço com DrawSVG).
   */
  variant?: "vertical" | "horizontal" | "curve";
  /** elemento que controla o progresso; padrão = a própria linha */
  trigger?: string;
  className?: string;
};

/** Linha dourada que se desenha conforme o scroll. Com reduced-motion já aparece desenhada. */
export function GoldLine({ variant = "horizontal", trigger, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const scrollTrigger = {
          trigger: trigger ?? el,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.6,
        };
        if (variant === "curve") {
          gsap.from(el.querySelector("path"), { drawSVG: "0%", ease: "none", scrollTrigger });
        } else {
          gsap.from(el, { [variant === "vertical" ? "scaleY" : "scaleX"]: 0, ease: "none", scrollTrigger });
        }
      });
    },
    { scope: ref, dependencies: [variant, trigger] },
  );

  if (variant === "curve") {
    return (
      <div ref={ref} aria-hidden="true" className={cn("w-full text-gold-500", className)}>
        {/* `slice`: escala uniforme (o DrawSVG precisa medir o path) e corta as laterais em telas estreitas */}
        <svg viewBox="0 0 1200 40" preserveAspectRatio="xMidYMid slice" fill="none" className="block h-6 w-full">
          <path
            d="M0 20 C 150 4, 300 36, 450 20 S 750 4, 900 20 S 1100 34, 1200 20"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "bg-gold-500",
        variant === "vertical" ? "h-full w-px origin-top" : "h-px w-full origin-left",
        className,
      )}
    />
  );
}
