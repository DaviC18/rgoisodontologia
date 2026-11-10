import { Fragment, useRef } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  as?: "h1" | "h2" | "h3";
  id?: string;
  /** Texto do site.ts. `\n` vira quebra de linha. */
  text: string;
  /** Trecho do texto renderizado em itálico (ex.: "cuidando da sua.") */
  highlight?: string;
  /** `load`: anima ao montar (hero). `scroll`: anima ao entrar na viewport. */
  trigger?: "load" | "scroll";
  delay?: number;
  className?: string;
  highlightClassName?: string;
};

function renderText(text: string, highlight: string | undefined, highlightClassName?: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const idx = highlight ? line.indexOf(highlight) : -1;
    const content =
      highlight && idx >= 0 ? (
        <>
          {line.slice(0, idx)}
          <em className={cn("italic", highlightClassName)}>{highlight}</em>
          {line.slice(idx + highlight.length)}
        </>
      ) : (
        line
      );
    return (
      <Fragment key={i}>
        {content}
        {i < lines.length - 1 && <br />}
      </Fragment>
    );
  });
}

/**
 * Título com linhas que sobem de dentro de uma máscara (SplitText).
 * Não começa com opacity 0: o texto existe e é legível sem JS e com reduced-motion.
 */
export function SplitHeading({
  as: Tag = "h2",
  id,
  text,
  highlight,
  trigger = "scroll",
  delay = 0,
  className,
  highlightClassName,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.9,
              stagger: 0.08,
              delay,
              ease: "power3.out",
              ...(trigger === "scroll" && {
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              }),
            }),
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={cn("font-display", className)}>
      {renderText(text, highlight, highlightClassName)}
    </Tag>
  );
}
