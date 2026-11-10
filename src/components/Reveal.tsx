import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** atraso em segundos */
  delay?: number;
  /** se definido, anima cada filho direto em sequência, com esse intervalo */
  stagger?: number;
  /** deslocamento inicial em px */
  y?: number;
};

/**
 * Fade + subida ao entrar na viewport (uma vez).
 * Sem JS ou com reduced-motion, o conteúdo fica visível (ver `[data-reveal]` no CSS).
 */
export function Reveal({ children, as: Tag = "div", className, delay = 0, stagger, y = 24 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const targets = stagger ? Array.from(el.children) : el;
        if (stagger) gsap.set(el, { opacity: 1 });
        gsap.fromTo(
          targets,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            delay,
            stagger,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });

      mm.add(MQ.reduce, () => {
        gsap.set(el, { opacity: 1 });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal="" className={cn(className)}>
      {children}
    </Tag>
  );
}
