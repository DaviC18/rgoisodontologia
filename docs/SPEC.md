# SPEC: Site RGóis Odontologia (single page)

> Documento de referência para os agentes. Em caso de conflito: **SPEC.md > PLAN.md > bom senso**.
> Conteúdo textual: **somente** `src/content/site.ts`. Nunca inventar texto, número, serviço ou depoimento.

---

## 1. Contexto

| | |
|---|---|
| **Cliente** | RGóis Odontologia (Google: "RGóis Consultório Odontológico") |
| **Local** | Colônia Santo Antônio, Barra Mansa (RJ) |
| **Equipe** | Dr. Rogério Góis (cirurgião-dentista e técnico em prótese), Rachel Emerick Góis (TSB, dentista em formação), Renata Góis (futura dentista) |
| **Site atual** | Canva (`rgoisodontologia.my.canva.site`): ilegível no celular, sem serviços, sem endereço, rodapé com texto de modelo e sem SEO |
| **Público** | Moradores de Barra Mansa e região, em sua maioria adultos e idosos, muitos com medo de dentista. Acessam pelo celular, vindos do Instagram e do Google |
| **Diferenciais** | Clínica de família · +40 anos de experiência · honestidade ("nossa meta não é bater meta") · paciência e calma · café na recepção · nota 5,0 no Google |

## 2. Objetivo e métrica

**Objetivo único:** levar o visitante a abrir uma conversa no WhatsApp para agendar, de preferência o **Check-up Inteligente + Kit Premium**.

- Todo CTA de agendamento abre `wa.me` com a mensagem pré-preenchida de `MSG` (em `site.ts`). Links externos (e-book, Google Maps, avaliações) não usam WhatsApp nem disparam `cta_whatsapp`.
- Cada CTA dispara o evento `cta_whatsapp` com `{ origem: "<id-da-secao>" }` via `src/lib/track.ts`. Por enquanto o evento só faz no-op e `console.debug` em dev, pronto para receber GA4 ou Vercel Analytics depois.
- Botão flutuante do WhatsApp visível em todas as telas depois que o hero sai da viewport.

## 3. Stack

- **Vite** (última estável) + **React 19** + **TypeScript** (`strict: true`)
- **Tailwind CSS v4** via `@tailwindcss/vite`, com tokens em `@theme` no `src/styles/index.css` (sem `tailwind.config.js`)
- **GSAP 3** + `@gsap/react` (`useGSAP`), com os plugins `ScrollTrigger` e `SplitText`; `DrawSVGPlugin` é opcional
- **Lenis** para scroll suave, integrado ao `ScrollTrigger` e desligado com `prefers-reduced-motion`
- **lucide-react** para ícones
- **Fontes** (self-hosted via `@fontsource`, sem Google Fonts em runtime): `Fraunces` (títulos, variável) e `Manrope` (texto)
- Sem roteador, sem biblioteca de UI e sem CSS-in-JS
- Deploy na **Vercel** (estático)

## 4. Identidade visual

O logo atual é a escrita "RGóis" em dourado sobre azul-marinho escuro. A direção é **"premium acolhedor"**: base clara e limpa (cara de clínica), azul-marinho para autoridade e dourado só como destaque. O site atual é todo preto, e o novo **não** deve ser.

### Tokens (`@theme`)

```css
--color-navy-950: #0B1424;  /* fundos escuros (hero alternativo, rodapé, seção história) */
--color-navy-900: #111D33;
--color-navy-700: #24365A;
--color-gold-500: #C9A24B;  /* destaque principal, linhas, ícones */
--color-gold-300: #E3C988;
--color-gold-700: #9C7A2E;  /* texto dourado sobre fundo claro (contraste AA) */
--color-cream-50: #FBF8F3;  /* fundo base */
--color-cream-100: #F4EEE4;
--color-sand-200: #E8DFD0;  /* bordas, divisores */
--color-ink-900: #1A1A1F;   /* texto principal */
--color-ink-600: #55565E;   /* texto secundário */
--color-whatsapp: #25D366;

--font-display: "Fraunces Variable", Georgia, serif;
--font-sans: "Manrope Variable", system-ui, sans-serif;

--radius-card: 1.25rem;
--ease-out-soft: cubic-bezier(.22,1,.36,1);
```

### Regras

- **Tipografia:** títulos em Fraunces (peso 400–600, `opsz` alto, itálico nas palavras de destaque, como *"cuidando da sua."*). Texto em Manrope 16–18px, `leading-relaxed`, no máximo 65ch.
- **Escala:** h1 `clamp(2.5rem, 6vw, 5rem)` · h2 `clamp(2rem, 4vw, 3.25rem)` · eyebrow 12–13px em maiúsculas, `tracking-[0.2em]`, cor gold-700.
- **Contraste:** WCAG AA em tudo. Não usar dourado em texto pequeno sobre o creme (usar gold-700).
- **Ritmo de fundos:** creme → creme-100 → navy (história) → creme → navy (rodapé). Nunca duas seções escuras seguidas.
- **Textura:** grão sutil (SVG noise com 3–4% de opacidade) nas seções navy. Linhas finas douradas como divisores.
- **Fotos:** sempre reais da clínica e da família. **Proibido usar banco de imagem com pessoas.**
- **Layout:** mobile-first, com testes em 360px, 390px, 768px, 1024px e 1440px. Gutter lateral de 20px no mobile e container máximo de 1200px.

## 5. Estrutura da página

Ordem fixa. Cada seção é um componente em `src/sections/`, com `id` igual à âncora.

| # | id | Componente | Fundo | Conteúdo (`site.ts`) | CTA |
|---|---|---|---|---|---|
| 0 | — | `Header` | transparente → creme com blur ao rolar | `nav`, logo | "Agendar" (pequeno) |
| 1 | `inicio` | `Hero` | creme + forma navy | `hero`, `numeros` | primário WhatsApp + secundário `#checkup` |
| 2 | `checkup` | `Checkup` | creme-100 | `checkup` | "Quero meu Check-up + Kit Premium" |
| 3 | `tratamentos` | `Tratamentos` | creme | `tratamentos`, `tratamentosNota` | por card: "Saber mais" → `MSG.tratamento(nome)` |
| 4 | `historia` | `Historia` | **navy** | `historia` | — |
| 5 | `familia` | `Familia` | creme | `familia` | — |
| 6 | `filosofia` | `Filosofia` | creme-100 | `filosofia` | — |
| 7 | `consultorio` | `Consultorio` | creme | `consultorio` | — |
| 8 | `depoimentos` | `Depoimentos` | creme-100 | `depoimentos` | "Ver avaliações no Google" |
| 9 | `ebook` | `Ebook` | creme (card navy) | `ebook` | link externo do e-book |
| 10 | `faq` | `Faq` | creme | `faq` | — |
| 11 | `contato` | `Contato` | creme-100 | `clinica` (endereço, horários, aviso, mapa) | "Chamar no WhatsApp" + "Abrir no Google Maps" |
| 12 | — | `Footer` | **navy** | nome, CRO do responsável técnico, Instagram, ano | — |
| — | — | `WhatsAppFab` | fixo, canto inferior direito | — | `MSG.avaliacao` |

### Detalhamento

**Header:** logo à esquerda. Links do `nav` a partir de 1024px. No mobile, menu em overlay de tela cheia com stagger GSAP. Botão "Agendar" sempre visível. O link ativo segue a seção visível (ScrollTrigger). Fecha com Esc e mantém o foco preso enquanto aberto.

**Hero:**
- Layout de 2 colunas a partir de 1024px: texto à esquerda e, à direita, a foto da família num recorte em arco (`rounded-t-full`) com moldura dourada fina deslocada.
- No mobile, a foto vai abaixo do texto, com altura de no máximo 60svh.
- Abaixo dos CTAs: os 3 `selos` como chips e a faixa `numeros` com `CountUp`.
- **Foto:** usar `/images/familia-hero.webp`. Enquanto não existir, usar `/images/rogerio.webp` e deixar `TODO` no código.

**Checkup:** à esquerda, o título e o subtítulo com selo "Programa exclusivo". À direita, os 4 `itens` como lista numerada com linha dourada vertical que se desenha no scroll. O item "Kit Premium" ganha destaque visual (card navy com ícone de presente). O CTA vem logo abaixo, grande.

**Tratamentos:** grid de cards (1 coluna no mobile, 2 no tablet, 3 no desktop) com ícone lucide em círculo dourado, nome, texto e link "Saber mais →". Hover com `SpotlightCard`. A `tratamentosNota` vai abaixo do grid, com link para o WhatsApp.

**Historia (navy):**
- Bloco 1: título "De protético a cirurgião-dentista" e o `resumo`.
- Bloco 2: a `carta` em estilo "carta escrita". Card creme levemente rotacionado (−1°) sobre o fundo navy, parágrafos revelados linha a linha (`SplitText`), `destaqueCarta` em Fraunces itálico grande e dourado e assinatura no fim.
- Com `historiaCompletaPendente`, não renderizar link de "ler história completa".

**Familia:** 3 cards verticais com foto em proporção 4:5, nome, cargo e texto. O link do Instagram da Rachel só aparece se existir. No desktop, ficam em 3 colunas com leve deslocamento vertical (o do meio 40px abaixo). No mobile, viram carrossel horizontal com scroll-snap e indicadores.

**Filosofia:** usar o `intro` e os 3 pilares. No desktop (≥1024px), a seção fica fixa (pin com ScrollTrigger) e os 3 pilares trocam conforme o scroll, com número grande "01/02/03" em Fraunces, barra de progresso dourada e transição de crossfade com leve deslocamento em y. No mobile, nada de pin: 3 cards empilhados com reveal simples.

**Consultorio:** grade assimétrica (1 foto grande + 2 menores) com parallax suave nas imagens (yPercent ±8) e `alt` vindo de `site.ts`. Se houver menos de 3 fotos, a grade se adapta.

**Depoimentos:**
- Topo: "5,0" grande + 5 estrelas douradas + `ui.avaliacoesNoGoogle(depoimentos.totalAvaliacoes)`.
- Embaixo: `Marquee` infinito com os cards dos depoimentos, em duas linhas com sentidos opostos no desktop e uma linha no mobile. Pausa no hover e no foco.
- Com `prefers-reduced-motion`, vira um grid estático.
- As cópias duplicadas do marquee levam `aria-hidden="true"` e `inert` (leitor de tela lê cada depoimento uma vez só).
- Link para o Google abaixo.

**Ebook:** card navy com mockup do e-book em CSS (capa com logo e título, efeito 3D leve com `rotateY` no hover/tilt). Texto e botão abrem `clinica.ebookUrl` com `target="_blank" rel="noopener"`.

**Faq:** accordion acessível com `<details>`/`<summary>` estilizados e animação de altura via GSAP (exceção permitida, ver §6). O JSON-LD `FAQPage` **não** é gerado aqui: fica no `index.html` (§7).

**Contato:**
- Duas colunas. À esquerda, endereço, tabela de horários (destacando o dia de hoje pelo campo `dow` de `clinica.horarios`, fuso `America/Sao_Paulo`), `avisoContato` em callout e os dois botões.
- À direita, mapa em iframe do Google Maps embed (`loading="lazy"`, `title` acessível), com cantos arredondados e moldura dourada.
- No mobile, o mapa vai abaixo.

**Footer:** logo, slogan, endereço curto, links (Instagram e WhatsApp), linha "Responsável técnico: Dr. Rogério Góis – {cro}" e "© {ano} RGóis Odontologia". **Sem** link "Criado com Canva", sem e-mail e sem telefone de modelo.

**WhatsAppFab:** círculo verde de 56px com ícone e pulso suave a cada 6s (que some com reduced-motion). Aparece com scale-in depois que o hero sai da tela e no mobile fica acima da safe-area (`env(safe-area-inset-bottom)`). Tem `aria-label="Agendar pelo WhatsApp"`.

## 6. Componentes visuais (`src/components/`)

| Componente | Descrição | Reduced motion |
|---|---|---|
| `Reveal` | Wrapper: fade + y 24px ao entrar na viewport (ScrollTrigger `start: "top 85%"`, `once`). Props `delay` e `stagger` para filhos | renderiza sem animação |
| `SplitHeading` | Título com `SplitText` (linhas com máscara e subida). Usado em h1 e h2 | texto estático |
| `CountUp` | Número que conta de 0 ao valor ao entrar na viewport. Suporta `decimais`, `prefixo` e `sufixo`. Formato pt-BR (vírgula) | mostra o valor final |
| `Marquee` | Faixa infinita via `gsap.to(xPercent)` com `repeat:-1`. Duplica os filhos (cópias com `aria-hidden` + `inert`) e pausa no hover/foco | grid estático |
| `SpotlightCard` | Card com brilho radial dourado que segue o mouse (CSS vars `--x/--y`). Só em `pointer: fine` | sem efeito |
| `MagneticButton` | Botão que "puxa" levemente em direção ao cursor (`gsap.quickTo`). Usado nos CTAs primários. Só em `pointer: fine` | botão normal |
| `GoldLine` | SVG de linha/curva dourada desenhada no scroll (`DrawSVG` ou `strokeDashoffset`) | linha já desenhada |
| `ToothMark` | Ícone SVG próprio de dente em traço fino (desenho original), usado como ornamento no hero e nos divisores | estático |
| `Grain` | Overlay de ruído SVG para seções navy | — |
| `WhatsAppButton` | `<a>` com `href` de `whatsappLink(msg)`, `target="_blank"`, `rel="noopener"`, ícone, tracking e variantes `primary`, `ghost` e `light` | — |
| `SectionHeader` | eyebrow + h2 (`SplitHeading`) + subtítulo opcional, alinhamento configurável | — |
| `StarRating` | 5 estrelas douradas (SVG) com `aria-label="Nota 5 de 5"` | — |

**Regras de animação (GSAP):**
- Registrar plugins uma vez em `src/lib/gsap.ts` e importar de lá.
- Usar sempre `useGSAP` com `scope` (limpeza automática). Nada de `useEffect` com gsap solto.
- `gsap.matchMedia()` para separar desktop/mobile e `(prefers-reduced-motion: reduce)`.
- Animar apenas `transform` e `opacity`. **Exceções permitidas:** altura do accordion do FAQ, `clip-path` da foto do hero e `strokeDashoffset`/DrawSVG do `GoldLine`. Nenhuma outra. Duração de 0.6–1.0s com ease `power3.out` ou `--ease-out-soft`.
- Hero: o `<h1>` é candidato a LCP. Ele começa visível (sem `opacity:0` no CSS) e a animação das linhas usa só `yPercent` com máscara, para não atrasar o LCP. Timeline de entrada em até 1.2s no total (eyebrow → título em linhas → subtítulo → CTAs → foto com clip-path de baixo para cima → números).
- Lenis + ScrollTrigger: `lenis.on('scroll', ScrollTrigger.update)` e `gsap.ticker`. Links âncora rolam via Lenis com offset da altura do header.
- Nada de animação que bloqueie a leitura: o conteúdo precisa estar legível mesmo se o JS falhar (usar a classe `.js` no `<html>` para esconder antes do reveal). O CSS já força `[data-reveal]` visível com `prefers-reduced-motion: reduce`.

## 7. SEO e metadados

- `index.html`: `lang="pt-BR"`, `<title>` e `meta description` vindos de `seo` (injetados no build por um plugin `transformIndexHtml` em `vite.config.ts` que importa `site.ts`), `theme-color` `#0B1424`, canonical, Open Graph e Twitter card (`og:image` 1200×630 com logo, slogan e foto) e favicon com o "R" dourado do logo.
- Um único `<h1>` (hero). h2 por seção.
- **JSON-LD** em `index.html`, gerado no build pelo mesmo plugin a partir de `site.ts` (único lugar; nenhum componente injeta JSON-LD):
  - `Dentist`: nome, endereço (`PostalAddress`), `geo`, telefone, `openingHoursSpecification`, `sameAs` (Instagram), `url`, `image`. **Sem `aggregateRating`:** nota vinda do Google marcada no próprio site é review autopromovido para o Google (não gera estrela e pode gerar ação manual)
  - `FAQPage` com o `faq` (o Google hoje só exibe rich result de FAQ para sites gov/saúde de autoridade; manter mesmo assim, é inofensivo)
- Enquanto `seo.siteUrl` tiver `TODO_DOMINIO`, o plugin **omite** canonical, `og:url`, `og:image` absoluto e `url` do JSON-LD. `sitemap.xml` só é publicado com domínio definido.
- `robots.txt` e `sitemap.xml` estáticos em `public/`.
- Texto real em HTML (nada de texto dentro de imagem).

## 8. Performance e acessibilidade (critérios de aceite)

- Lighthouse mobile: **Performance ≥ 90, Acessibilidade ≥ 95, Boas práticas ≥ 95, SEO = 100**.
- LCP < 2,5s em 4G: a imagem do hero vai em `fetchpriority="high"` e `<link rel="preload">`, e as demais em `loading="lazy"` + `decoding="async"`.
- Imagens em WebP/AVIF com `width`/`height` definidos, `srcset` 640/960/1440 e cada uma com até 200KB.
- Bundle JS inicial < 180KB gz.
- Sem scroll horizontal em 360px.
- Navegação completa por teclado, `:focus-visible` dourado visível, skip link "Pular para o conteúdo" e landmarks (`header`, `main`, `footer`, `nav`).
- `prefers-reduced-motion` respeitado em **todos** os componentes animados.
- Áreas de toque ≥ 44px.

## 9. Assets

Pasta `public/images/`. Nomes fixos (os componentes já apontam para eles):

| Arquivo | Origem | Status |
|---|---|---|
| `logo.svg` | Vetorizar o logo "RGóis Odontologia" ou receber da clínica | **pendente** (usar logotipo em texto Fraunces itálico dourado como fallback) |
| `familia-hero.webp` | Foto real da família no consultório | **pendente**: pedir à clínica |
| `rogerio.webp`, `rachel.webp`, `renata.webp` | Fotos do site Canva atual / Instagram | baixar do site atual |
| `consultorio-1..3.webp` | Fotos do consultório no site Canva atual | baixar do site atual |
| `og-image.jpg` | Gerar 1200×630 | criar |

Enquanto um asset estiver pendente, usar placeholder neutro (bloco creme-100 com `ToothMark` e texto "Foto em breve"). **Nunca** usar foto de banco com pessoas: o site atual tem esse problema e ele é justamente uma das coisas a corrigir.

## 10. Conformidade (publicidade odontológica)

- Exibir o nome e o **CRO** do responsável técnico no rodapé (o valor está em `clinica.responsavelTecnico.cro`, hoje `TODO_CLINICA`).
- Não prometer resultados, não usar "antes e depois" sem autorização e não exibir preços nem "promoções" de procedimentos.
- O "Kit Premium" e o e-book são brindes e conteúdo educativo. Manter a redação como está em `site.ts`. **Atenção:** brinde condicionado ao agendamento pode ser lido como premiação/promoção pelo Código de Ética Odontológica. Confirmar com a clínica (ou com o CRO-RJ) antes de publicar.
- Exibição de depoimentos e da nota do Google em publicidade odontológica também precisa ser validada.
- Depoimentos são avaliações públicas reais do Google. Não editar o sentido e não criar novos.
- Validar este tópico com a clínica antes de publicar (o agente não é advogado; isto é um checklist, não um parecer).

## 11. Pendências (rastreadas no código como `TODO_CLINICA`)

1. Número do CRO do Dr. Rogério
2. Lista final de tratamentos (implante? ortodontia? canal? infantil?)
3. Conteúdo oficial do Check-up Inteligente e do Kit Premium
4. História completa do Dr. Rogério ("da periferia de SP a cirurgião-dentista")
5. Foto real da família para o hero + logo em vetor
6. Domínio (ex.: `rgoisodontologia.com.br`)
7. Autorização para exibir o primeiro nome dos autores dos depoimentos

Ao terminar, rodar `grep -rn "TODO_CLINICA\|TODO" src index.html` e listar o resultado no relatório final.

## 12. Estrutura de pastas

```
rgois-site/
├─ AGENTS.md
├─ docs/  SPEC.md · PLAN.md
├─ index.html
├─ public/  images/ · favicon.svg · robots.txt · sitemap.xml · og-image.jpg
└─ src/
   ├─ main.tsx · App.tsx
   ├─ content/site.ts          ← fonte única de conteúdo, inclusive strings de UI (`ui`)
   ├─ lib/  gsap.ts · lenis.ts · track.ts · cn.ts · useReducedMotion.ts
   ├─ components/  (seção 6)
   ├─ sections/  Header · Hero · Checkup · Tratamentos · Historia · Familia ·
   │             Filosofia · Consultorio · Depoimentos · Ebook · Faq · Contato · Footer
   ├─ components/WhatsAppFab.tsx
   └─ styles/index.css         ← @import "tailwindcss"; @theme {...}; base
```
