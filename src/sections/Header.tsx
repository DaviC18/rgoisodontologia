import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { MSG, nav, ui } from "@/content/site";
import { Logo } from "@/components/Logo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cn } from "@/lib/cn";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { setScrollLock } from "@/lib/lenis";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // fundo ao rolar + link ativo conforme a seção visível
  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 12,
        // além do fim: com "max" o trigger desativa ao chegar no rodapé
        end: () => ScrollTrigger.maxScroll(window) + 1,
        onToggle: (self) => setScrolled(self.isActive),
      });
      nav.forEach(({ href }) => {
        const el = document.querySelector(href);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActive(href);
            else setActive((cur) => (cur === href ? null : cur));
          },
        });
      });
    },
    { scope: root },
  );

  // menu mobile: trava scroll, Esc fecha, foco preso
  useEffect(() => {
    if (!open) return;
    setScrollLock(true);
    const panel = overlay.current;
    const toggleBtn = toggle.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = [
        toggle.current,
        ...panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ].filter((el): el is HTMLElement => !!el);
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      setScrollLock(false);
      // devolve o foco ao botão, exceto quando um link já levou o foco para a seção de destino
      const ativo = document.activeElement;
      if (!ativo || ativo === document.body || panel?.contains(ativo)) {
        toggleBtn?.focus({ preventScroll: true });
      }
    };
  }, [open]);

  // stagger dos links ao abrir
  useGSAP(
    () => {
      if (!open || !overlay.current) return;
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.from(overlay.current!.querySelectorAll("[data-menu-item]"), {
          opacity: 0,
          y: 24,
          duration: 0.6,
          stagger: 0.06,
        });
      });
    },
    { dependencies: [open], scope: overlay },
  );

  const solid = scrolled || open;

  return (
    <>
      <header
        ref={root}
        data-site-header=""
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500",
          solid
            ? "bg-cream-50/85 shadow-[0_1px_0_var(--color-sand-200)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <a
          href="#conteudo"
          className="sr-only-focusable absolute top-2 left-2 z-50 rounded-full bg-navy-950 px-4 py-3 text-sm font-semibold text-cream-50"
        >
          {ui.pularConteudo}
        </a>

        <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-20">
          <a
            href="#inicio"
            className="relative z-50 flex min-h-11 items-center"
            onClick={() => setOpen(false)}
          >
            <Logo className="h-10 lg:h-12" />
          </a>

          <nav aria-label={ui.navAria} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active === item.href ? "true" : undefined}
                    className={cn(
                      "relative flex min-h-11 items-center px-3 text-[0.9375rem] font-medium transition-colors",
                      "after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform after:duration-500",
                      active === item.href
                        ? "text-navy-950 after:scale-x-100"
                        : "text-ink-600 hover:text-navy-950 hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-50 flex items-center gap-2">
            <WhatsAppButton msg={MSG.avaliacao} origem="header" size="sm">
              {ui.agendar}
            </WhatsAppButton>
            <button
              ref={toggle}
              type="button"
              className="flex size-11 items-center justify-center rounded-full text-navy-950 hover:bg-cream-100 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? ui.menuFechar : ui.menuAbrir}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fora do <header>: o backdrop-blur dele vira bloco de contenção e prenderia o overlay `fixed` */}
      <div
        ref={overlay}
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-cream-50 pt-24 pb-12 lg:hidden"
        data-lenis-prevent=""
      >
        <nav aria-label={ui.navAria} className="container-site">
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href} data-menu-item="">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center border-b border-sand-200 font-display text-3xl text-navy-950"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div data-menu-item="" className="mt-10">
            <WhatsAppButton
              msg={MSG.avaliacao}
              origem="menu-mobile"
              size="lg"
              className="w-full"
            >
              {ui.agendar}
            </WhatsAppButton>
          </div>
        </nav>
      </div>
    </>
  );
}
