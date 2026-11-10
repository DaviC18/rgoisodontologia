import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** sentido do movimento */
  direction?: "left" | "right";
  /** segundos para uma volta completa */
  duration?: number;
  className?: string;
  /** classes do grid estático usado com reduced-motion */
  staticClassName?: string;
};

/**
 * Faixa infinita. Os filhos são renderizados duas vezes; a cópia é `aria-hidden` + `inert`.
 * Pausa no hover e quando algo dentro recebe foco. Com reduced-motion vira grid estático.
 */
export function Marquee({ children, direction = "left", duration = 40, className, staticClassName }: Props) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const t = track.current;
      if (!el || !t) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const [from, to] = direction === "left" ? [0, -50] : [-50, 0];
        const tween = gsap.fromTo(t, { xPercent: from }, { xPercent: to, duration, ease: "none", repeat: -1 });
        const pause = () => tween.pause();
        const play = () => tween.play();
        el.addEventListener("pointerenter", pause);
        el.addEventListener("pointerleave", play);
        el.addEventListener("focusin", pause);
        el.addEventListener("focusout", play);
        return () => {
          el.removeEventListener("pointerenter", pause);
          el.removeEventListener("pointerleave", play);
          el.removeEventListener("focusin", pause);
          el.removeEventListener("focusout", play);
        };
      });
    },
    { scope: root, dependencies: [reduced, direction, duration], revertOnUpdate: true },
  );

  if (reduced) {
    return <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", staticClassName)}>{children}</div>;
  }

  return (
    <div ref={root} className={cn("overflow-hidden", className)}>
      <div ref={track} className="flex w-max">
        <div className="flex shrink-0 gap-6 pr-6">{children}</div>
        <div className="flex shrink-0 gap-6 pr-6" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
