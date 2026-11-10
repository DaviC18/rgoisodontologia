import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { prefersReducedMotion } from "./useReducedMotion";

let lenis: Lenis | null = null;

/** Altura do header fixo, usada como offset nas âncoras. */
const headerOffset = () =>
  -(
    document.querySelector<HTMLElement>("[data-site-header]")?.offsetHeight ?? 0
  );

/**
 * Rola até um alvo (seletor, elemento ou posição) descontando o header.
 * Sem Lenis (reduced-motion), cai no scroll nativo sem animação.
 */
export function scrollTo(target: string | HTMLElement | number) {
  if (lenis) {
    lenis.scrollTo(target, { offset: headerOffset() });
    return;
  }
  const el =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : target;
  const top =
    typeof el === "number"
      ? el
      : el
        ? el.getBoundingClientRect().top + window.scrollY + headerOffset()
        : null;
  if (top !== null) window.scrollTo({ top, behavior: "auto" });
}

/**
 * Inicializa o Lenis uma vez (chamar no App) e sincroniza com o ScrollTrigger.
 * Não roda com `prefers-reduced-motion: reduce`.
 */
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({ autoRaf: false });
    lenis = instance;

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);
}

/** Trava o scroll da página (menu mobile aberto). */
export function setScrollLock(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) lenis?.stop();
  else lenis?.start();
}

/**
 * Links `#ancora` da página rolam via Lenis com offset do header
 * e movem o foco para a seção (teclado e leitor de tela acompanham).
 */
export function useAnchorScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const hash = a?.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      // o link pode vir do menu mobile, que trava o scroll; navegar sempre destrava
      setScrollLock(false);
      scrollTo(target);
      history.replaceState(null, "", hash);
      if (!target.hasAttribute("tabindex"))
        target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
