import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { children: ReactNode; className?: string };

const setSpot = (e: PointerEvent<HTMLDivElement>) => {
  if (e.pointerType !== "mouse") return;
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};

/**
 * Card com brilho radial dourado que segue o mouse.
 * Só aparece com `pointer: fine` e sem reduced-motion (o brilho fica em CSS, sem re-render).
 */
export function SpotlightCard({ children, className }: Props) {
  return (
    <div
      onPointerMove={setSpot}
      className={cn(
        "group relative isolate overflow-hidden rounded-card border border-sand-200 bg-cream-50",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-fine:motion-safe:block"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgb(201 162 75 / 0.16), transparent 65%)",
        }}
      />
      {children}
    </div>
  );
}
