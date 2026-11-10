import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { MSG, ui, whatsappLink } from "@/content/site";
import { cn } from "@/lib/cn";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { track } from "@/lib/track";

/** Botão flutuante: aparece quando o hero (#inicio) sai da tela. */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useGSAP(() => {
    const hero = document.getElementById("inicio");
    if (!hero) {
      setVisible(true);
      return;
    }
    ScrollTrigger.create({
      trigger: hero,
      start: "bottom top",
      // além do fim: com "max" o trigger desativa ao chegar no rodapé
      end: () => ScrollTrigger.maxScroll(window) + 1,
      onToggle: (self) => setVisible(self.isActive),
    });
  });

  return (
    <a
      href={whatsappLink(MSG.avaliacao)}
      target="_blank"
      rel="noopener"
      aria-label={ui.fabAria}
      inert={!visible}
      onClick={() => track("cta_whatsapp", { origem: "fab" })}
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
      className={cn(
        "fixed right-5 z-30 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-navy-950/20",
        "transition-[transform,opacity] duration-500 ease-(--ease-out-soft) motion-reduce:transition-none",
        visible
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-50 opacity-0",
      )}
    >
      <span
        aria-hidden="true"
        className="fab-pulse absolute inset-0 rounded-full bg-whatsapp"
      />
      <MessageCircle
        aria-hidden="true"
        className="relative size-7"
        strokeWidth={2}
      />
    </a>
  );
}
