/**
 * Ponto único de registro do GSAP. Sempre importar daqui, nunca de "gsap" direto.
 */
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);

gsap.defaults({ duration: 0.8, ease: "power3.out" });

/** Media queries padrão para `gsap.matchMedia()` (SPEC §6) */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023.98px)",
  finePointer: "(pointer: fine)",
} as const;

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP };
