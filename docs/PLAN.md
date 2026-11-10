# PLANO DE EXECUÇÃO: Site RGóis Odontologia

> Leia `docs/SPEC.md` inteiro antes de começar. Conteúdo **somente** de `src/content/site.ts`.
> Cada pacote de trabalho (WP) tem **dono exclusivo dos arquivos listados**. Não edite arquivos de outro WP: se precisar de algo, registre em "Notas para o integrador" no seu relatório.

## Visão geral

```
Fase 0  Fundação (1 agente, sequencial)        ──►  bloqueia todo o resto
Fase 1  Componentes base (1 agente)            ──►  bloqueia a Fase 2
Fase 2  Seções (até 4 agentes em paralelo)     ──►  WP-A · WP-B · WP-C · WP-D
Fase 3  Integração + SEO (1 agente)
Fase 4  QA e verificação (1 agente que não escreveu código)
Fase 5  Deploy (após aprovação do usuário)
```

---

## Fase 0: Fundação (WP-0)

**Arquivos:** `package.json`, `vite.config.ts` (até a Fase 3), `tsconfig*.json`, `index.html` (esqueleto), `src/main.tsx`, `src/App.tsx` (esqueleto), `src/styles/index.css`, `src/lib/*`, `.gitignore`, `README.md`

1. Inicializar o projeto Vite `react-ts` **nesta pasta**, preservando `AGENTS.md`, `docs/` e `src/content/site.ts`. Se o scaffolder recusar uma pasta não vazia, gerar num diretório temporário e mover os arquivos. Remover resíduos do template (`src/assets/*`, `src/App.css`, `public/icons.svg`).
2. Instalar: `tailwindcss @tailwindcss/vite gsap @gsap/react lenis lucide-react @fontsource-variable/fraunces @fontsource-variable/manrope`. Dev: `prettier prettier-plugin-tailwindcss eslint` (config padrão do Vite).
3. `tsconfig`: `strict`, `noUncheckedIndexedAccess`, alias `@/` → `src/`.
4. `src/styles/index.css`: `@import "tailwindcss"`, `@theme` com **todos** os tokens da SPEC §4, estilos base (body creme, texto ink, `::selection` dourado, `:focus-visible`, `html.js [data-reveal]{opacity:0}` com fallback visível em `prefers-reduced-motion: reduce`), utilitário `.container-site` (max-w 1200px, px 20px → 32px) e classe `.grain`.
5. `src/lib/gsap.ts`: registra `ScrollTrigger` e `SplitText` (e `DrawSVGPlugin` se disponível) e reexporta.
6. `src/lib/lenis.ts`: hook `useLenis()` que inicializa o Lenis, sincroniza com o ScrollTrigger, não roda com reduced-motion e expõe `scrollTo(target)` com offset do header.
7. `src/lib/track.ts`: `track(event, props)` (no-op + `console.debug` em dev).
8. `src/lib/useReducedMotion.ts` e `src/lib/cn.ts` (concatenação simples de classes).
9. `index.html`: `lang="pt-BR"`, fontes via import no `main.tsx` (Fraunces com `opsz.css` + `opsz-italic.css`, para ter os eixos `wght`/`opsz` e itálico sem o peso dos eixos SOFT/WONK do `full.css`; Manrope com `index.css`), script inline que adiciona a classe `js` ao `<html>`.
10. `App.tsx`: renderiza `<main id="conteudo">` com comentários-placeholder na ordem das seções da SPEC §5. A partir daí o `App.tsx` é do integrador (WP-3): nenhum WP da Fase 2 edita esse arquivo.

**Pronto quando:** `npm run dev` sobe, `npm run build` passa sem erros de TS e a página mostra o fundo creme com um texto de teste nas duas fontes.

---

## Fase 1: Componentes base (WP-1)

**Arquivos:** `src/components/*` (exceto `WhatsAppFab.tsx`)

Implementar todos os componentes da SPEC §6 (strings de UI vêm de `ui` em `site.ts`): `Reveal`, `SplitHeading`, `CountUp`, `Marquee`, `SpotlightCard`, `MagneticButton`, `GoldLine`, `ToothMark`, `Grain`, `WhatsAppButton`, `SectionHeader`, `StarRating`.

- Cada componente animado usa `useGSAP({ scope })` + `gsap.matchMedia()` e tem um caminho reduced-motion.
- `WhatsAppButton` chama `track("cta_whatsapp", { origem })` no clique, com a prop `origem` obrigatória.
- `ToothMark` é um SVG **desenhado do zero** (traço fino, `currentColor`), sem copiar ícones de marcas.
- Criar `src/components/_demo-components.tsx` (não importado no App, abre em `?demo=components`) mostrando todos os componentes. Serve para QA rápido e pode ser removido na Fase 3.

**Pronto quando:** build ok e cada componente funciona isolado com e sem reduced-motion (testar via DevTools → Rendering → emulate).

---

## Fase 2: Seções (paralelo)

Todas as seções: `<section id="..." aria-labelledby="...">`, conteúdo de `site.ts`, `SectionHeader` e `Reveal`, mobile-first, testadas em 360 e 1440px.

**Não editar `src/App.tsx`.** Para ver a seção, cada WP cria `src/sections/_demo-<wp>.tsx` (ex.: `_demo-a.tsx`, export default) e abre `http://localhost:5173/?demo=a`. O `main.tsx` do WP-0 já carrega qualquer `_demo*.tsx` por `?demo=` (só em dev). O demo dos componentes da Fase 1 fica em `?demo=components`. O integrador apaga os `_demo-*` na Fase 3.

Se precisar de texto que não existe em `site.ts`, **não adicionar**: listar em "Notas para o integrador" (o `site.ts` não tem dono na Fase 2, para evitar conflito).

### WP-A: Topo e conversão
**Arquivos:** `src/sections/Header.tsx`, `src/sections/Hero.tsx`, `src/sections/Checkup.tsx`, `src/components/WhatsAppFab.tsx`
- Header com estado ao rolar, menu mobile acessível (Esc, focus trap, `aria-expanded`) e link ativo.
- Hero com a timeline de entrada (SPEC §6), foto em arco, `CountUp` dos `numeros` e `MagneticButton` no CTA primário.
- Checkup com `GoldLine` vertical desenhando no scroll e card "Kit Premium" em destaque.
- FAB que aparece quando o hero sai da viewport.

### WP-B: Oferta e confiança
**Arquivos:** `src/sections/Tratamentos.tsx`, `src/sections/Depoimentos.tsx`, `src/sections/Faq.tsx`
- Grid de `SpotlightCard` com ícones lucide mapeados pelo campo `icone`.
- Depoimentos com nota grande + `StarRating` + `Marquee` (2 linhas desktop / 1 mobile) e fallback em grid.
- FAQ com `<details>` animado.

### WP-C: História e pessoas
**Arquivos:** `src/sections/Historia.tsx`, `src/sections/Familia.tsx`, `src/sections/Filosofia.tsx`
- Historia (navy + `Grain`) com a carta em card rotacionado, reveal por linha e destaque dourado.
- Familia com 3 colunas deslocadas no desktop e carrossel com scroll-snap + indicadores no mobile.
- Filosofia com pin e troca dos 3 pilares no desktop (ScrollTrigger `pin`, `scrub`, barra de progresso) e cards empilhados no mobile.

### WP-D: Espaço e contato
**Arquivos:** `src/sections/Consultorio.tsx`, `src/sections/Ebook.tsx`, `src/sections/Contato.tsx`, `src/sections/Footer.tsx`, `public/images/*` (placeholders)
- Consultorio com grade assimétrica e parallax leve.
- Ebook com card navy e mockup 3D em CSS com tilt.
- Contato com horários (dia atual destacado; calcular no fuso `America/Sao_Paulo`), callout do aviso, iframe do mapa (`https://www.google.com/maps?q=-22.5373641,-44.217086&z=16&output=embed`) e botões.
- Footer com o CRO e sem resíduos do Canva.
- Criar placeholders (SPEC §9) com os nomes de arquivo exatos.

**Pronto quando (cada WP):** a seção renderiza isolada no `_demo` do WP, o build passa, não há texto fora de `site.ts` e o relatório lista os arquivos tocados, as decisões tomadas e as notas para o integrador.

---

## Fase 3: Integração e SEO (WP-3)

**Arquivos:** `src/App.tsx`, `src/main.tsx`, `vite.config.ts`, `src/content/site.ts` (só para as notas dos WPs), `index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/favicon.svg`, `public/og-image.jpg`

1. Montar o `App` na ordem da SPEC §5 e inicializar o Lenis. Âncoras do header e dos CTAs secundários rolam com offset.
2. Revisar o ritmo de fundos (nunca 2 navy seguidos) e os espaçamentos verticais consistentes (`py-24 md:py-32`).
3. Metadados completos + JSON-LD `Dentist` e `FAQPage` (SPEC §7) gerados pelo plugin `transformIndexHtml` em `vite.config.ts` a partir de `site.ts`. Sem `aggregateRating`. Sem canonical/`og:url` enquanto `seo.siteUrl` for `TODO_DOMINIO`.
4. Favicon SVG ("R" itálico dourado sobre navy) e og-image 1200×630.
5. Preload da imagem do hero e `ScrollTrigger.refresh()` depois do carregamento das fontes e imagens.
6. Remover `src/components/_demo-components.tsx`, `src/sections/_demo-*.tsx` e o roteamento de demo do `main.tsx`. Rodar `grep -rn "TODO" src index.html` e anexar o resultado.

---

## Fase 4: QA (WP-4, agente que **não** escreveu o código)

Checklist com evidência (screenshots via Playwright em 360, 390, 768, 1024 e 1440px, mais reduced-motion):

- [ ] Todos os textos batem com `site.ts`, sem nada inventado (serviço, número, depoimento)
- [ ] Todos os CTAs abrem `wa.me/5524981714542` com a mensagem correta e `origem` no track
- [ ] Sem scroll horizontal em 360px e alvos de toque ≥ 44px
- [ ] Teclado: tab por toda a página, menu mobile, accordion, skip link e foco visível
- [ ] `prefers-reduced-motion`: nenhuma animação de movimento, marquee vira grid, sem pin
- [ ] Lighthouse mobile dentro das metas da SPEC §8 (anexar números)
- [ ] JSON-LD válido (validator.schema.org / Rich Results Test)
- [ ] Horário do "hoje" correto e mapa carregando
- [ ] Nenhum resíduo do site antigo (`reallygreatsite`, `(123) 456`, "Criado com Canva")
- [ ] Contraste AA (axe DevTools sem erros sérios)
- [ ] Lista de `TODO_CLINICA` restantes

Saída: `docs/QA-REPORT.md` com aprovado/reprovado por item e screenshots em `docs/qa/`.

---

## Fase 5: Deploy

Só depois de o usuário aprovar o QA: criar o projeto na Vercel (framework Vite, output `dist`) e publicar a URL de preview. O domínio próprio fica para quando a clínica confirmar.

---

## Regras gerais para os agentes

- Português do Brasil em toda a interface. Código e nomes de arquivo em inglês/pt conforme a SPEC.
- Não instalar dependências além das listadas sem justificar no relatório.
- Não usar imagens de banco com pessoas nem desenhar personagens ou marcas de terceiros.
- Commits pequenos por WP: `feat(hero): ...`, `feat(components): ...`.
- Na dúvida sobre conteúdo, use o que está em `site.ts` e marque `TODO_CLINICA`. Na dúvida sobre design, siga a SPEC §4 e prefira o mais sóbrio.
