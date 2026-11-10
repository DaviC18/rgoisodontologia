import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  valor: number;
  decimais?: number;
  prefixo?: string;
  sufixo?: string;
  className?: string;
};

const format = (n: number, decimais: number) =>
  new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimais,
    maximumFractionDigits: decimais,
  }).format(n);

/**
 * Conta de 0 até `valor` ao entrar na viewport, em formato pt-BR.
 * O HTML já nasce com o valor final (sem JS / reduced-motion mostra o número certo);
 * leitores de tela leem só o valor final.
 */
export function CountUp({
  valor,
  decimais = 0,
  prefixo = "",
  sufixo = "",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = `${prefixo}${format(valor, decimais)}${sufixo}`;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const state = { v: 0 };
        const render = () => {
          el.textContent = `${prefixo}${format(state.v, decimais)}${sufixo}`;
        };
        render();
        gsap.to(state, {
          v: valor,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: render,
          scrollTrigger: { trigger: el, start: "top bottom", once: true },
        });
        return () => {
          el.textContent = finalText;
        };
      });
    },
    { scope: ref, dependencies: [valor, decimais, prefixo, sufixo] },
  );

  return (
    <span className={cn("tabular-nums", className)}>
      <span ref={ref} aria-hidden="true">
        {finalText}
      </span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
}
