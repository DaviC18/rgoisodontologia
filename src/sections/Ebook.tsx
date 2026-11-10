import { useRef } from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import { clinica, ebook, ui } from "@/content/site";
import { Grain } from "@/components/Grain";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

export function Ebook() {
  const book = useRef<HTMLDivElement>(null);

  // tilt 3D leve seguindo o mouse
  useGSAP(
    () => {
      const el = book.current;
      const area = el?.parentElement;
      if (!el || !area) return;
      gsap.matchMedia().add(`${MQ.finePointer} and ${MQ.motion}`, () => {
        const rx = gsap.quickTo(el, "rotationX", {
          duration: 0.6,
          ease: "power3.out",
        });
        const ry = gsap.quickTo(el, "rotationY", {
          duration: 0.6,
          ease: "power3.out",
        });
        const move = (e: PointerEvent) => {
          const r = area.getBoundingClientRect();
          ry(-18 + ((e.clientX - r.left) / r.width - 0.5) * 16);
          rx(((e.clientY - r.top) / r.height - 0.5) * -10);
        };
        const leave = () => {
          ry(-18);
          rx(0);
        };
        area.addEventListener("pointermove", move);
        area.addEventListener("pointerleave", leave);
        return () => {
          area.removeEventListener("pointermove", move);
          area.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: book },
  );

  return (
    <section
      id="ebook"
      aria-labelledby="ebook-titulo"
      className="py-12 md:py-16"
    >
      <div className="container-site">
        <div className="relative isolate grid items-center gap-12 overflow-hidden rounded-[2rem] bg-navy-950 px-6 py-14 sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-16 lg:py-20">
          <Grain />
          <div>
            <SectionHeader
              id="ebook-titulo"
              tone="dark"
              eyebrow={ebook.eyebrow}
              titulo={ebook.titulo}
              subtitulo={ebook.texto}
            />
            <Reveal className="mt-9">
              <a
                href={clinica.ebookUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-14 items-center gap-2.5 rounded-full bg-cream-50 px-8 text-lg font-semibold text-navy-950 transition-colors hover:bg-gold-300"
              >
                <BookOpen
                  aria-hidden="true"
                  className="size-5 text-gold-700"
                  strokeWidth={1.75}
                />
                {ebook.cta}
                <ExternalLink aria-hidden="true" className="size-4" />
                <span className="sr-only">{ui.abreEmNovaAba}</span>
              </a>
            </Reveal>
          </div>

          {/* mockup do e-book em CSS */}
          <div
            aria-hidden="true"
            className="flex justify-center perspective-[1200px]"
          >
            <div
              ref={book}
              className="relative aspect-[3/4] w-[min(16rem,70vw)] transform-3d"
              style={{ transform: "rotateY(-18deg)" }}
            >
              <div className="absolute inset-0 flex flex-col justify-between rounded-l-sm rounded-r-xl border border-gold-500/40 bg-gradient-to-br from-navy-700 to-navy-900 p-6 shadow-[18px_24px_50px_rgb(0_0_0/0.45)]">
                <span className="absolute inset-y-0 left-3 w-px bg-gold-500/40" />
                <Logo variant="color" className="h-14 self-start" />
                <p className="font-display text-2xl leading-tight text-cream-50">
                  {ebook.titulo}
                </p>
                <span className="h-px w-16 bg-gold-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
