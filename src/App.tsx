import { useEffect } from "react";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ScrollTrigger } from "@/lib/gsap";
import { useAnchorScroll, useLenis } from "@/lib/lenis";
import { Checkup } from "@/sections/Checkup";
import { Consultorio } from "@/sections/Consultorio";
import { Contato } from "@/sections/Contato";
import { Depoimentos } from "@/sections/Depoimentos";
import { Ebook } from "@/sections/Ebook";
import { Familia } from "@/sections/Familia";
import { Faq } from "@/sections/Faq";
import { Filosofia } from "@/sections/Filosofia";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { Historia } from "@/sections/Historia";
import { Tratamentos } from "@/sections/Tratamentos";

/** Recalcula posições do ScrollTrigger quando fontes e imagens mudam o layout. */
function useLayoutRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    return () => window.removeEventListener("load", refresh);
  }, []);
}

function App() {
  useLenis();
  useAnchorScroll();
  useLayoutRefresh();

  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Checkup />
        <Tratamentos />
        <Historia />
        <Familia />
        <Filosofia />
        <Consultorio />
        <Depoimentos />
        <Ebook />
        <Faq />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

export default App;
