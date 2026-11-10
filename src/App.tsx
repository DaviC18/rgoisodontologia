import { useLenis } from "@/lib/lenis";

// Teste temporário da Fase 0 (fundo creme + duas fontes). O WP-3 substitui pelas seções.
const FASE0_TESTE = { display: "Fraunces: cuidando da sua.", sans: "Manrope: texto corrido." };

function App() {
  useLenis();

  return (
    <>
      {/* <Header /> */}
      <main id="conteudo">
        {/* <Hero /> */}
        {/* <Checkup /> */}
        {/* <Tratamentos /> */}
        {/* <Historia /> */}
        {/* <Familia /> */}
        {/* <Filosofia /> */}
        {/* <Consultorio /> */}
        {/* <Depoimentos /> */}
        {/* <Ebook /> */}
        {/* <Faq /> */}
        {/* <Contato /> */}
        <div className="container-site py-24">
          <p className="font-display text-5xl italic">{FASE0_TESTE.display}</p>
          <p className="mt-4 text-lg text-ink-600">{FASE0_TESTE.sans}</p>
        </div>
      </main>
      {/* <Footer /> */}
      {/* <WhatsAppFab /> */}
    </>
  );
}

export default App;
