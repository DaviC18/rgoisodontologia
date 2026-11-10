import { useRef, type MouseEvent } from "react";
import { Plus } from "lucide-react";
import { faq, faqHeader } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

function Item({ p, r }: (typeof faq)[number]) {
  const details = useRef<HTMLDetailsElement>(null);
  const body = useRef<HTMLDivElement>(null);

  // Altura animada (exceção permitida na SPEC §6). Com reduced-motion fica o comportamento nativo.
  const onToggle = (e: MouseEvent) => {
    const d = details.current;
    const b = body.current;
    if (!d || !b || prefersReducedMotion()) return;
    e.preventDefault();
    gsap.killTweensOf(b);
    if (!d.open) {
      d.open = true;
      gsap.fromTo(
        b,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.45, ease: "power2.out" },
      );
    } else {
      gsap.to(b, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: () => {
          d.open = false;
          gsap.set(b, { clearProps: "height,opacity" });
        },
      });
    }
  };

  return (
    <details ref={details} className="group border-b border-sand-200">
      <summary
        onClick={onToggle}
        className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-xl text-navy-950 [&::-webkit-details-marker]:hidden"
      >
        {p}
        <Plus
          aria-hidden="true"
          className="size-6 shrink-0 text-gold-700 transition-transform duration-300 group-open:rotate-45"
        />
      </summary>
      <div ref={body} className="overflow-hidden">
        <p className="max-w-[65ch] pb-6 leading-relaxed text-ink-600">{r}</p>
      </div>
    </details>
  );
}

/** JSON-LD `FAQPage` não fica aqui: é gerado no index.html (SPEC §7). */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="py-24 md:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeader
          id="faq-titulo"
          eyebrow={faqHeader.eyebrow}
          titulo={faqHeader.titulo}
        />
        <Reveal className="border-t border-sand-200">
          {faq.map((item) => (
            <Item key={item.p} {...item} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
