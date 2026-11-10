# AGENTS.md: RGóis Odontologia

Landing page single-page para o consultório odontológico RGóis (Barra Mansa, RJ).
Stack: Vite + React 19 + TypeScript + Tailwind v4 + GSAP (ScrollTrigger, SplitText) + Lenis.

## Leia antes de qualquer coisa

1. `docs/SPEC.md`: o que construir (design, seções, componentes, critérios de aceite)
2. `docs/PLAN.md`: em que ordem e quem é dono de quais arquivos
3. `src/content/site.ts`: **todo** o texto do site. Nunca escreva conteúdo fora dele

## Regras inegociáveis

- Objetivo do site: levar o visitante ao WhatsApp para agendar. Todo CTA de agendamento usa `whatsappLink(MSG.*)`. Exceções (links externos): e-book (`clinica.ebookUrl`), Google Maps e avaliações do Google.
- Não inventar serviços, números, depoimentos ou detalhes do Check-up. Pendências ficam como `TODO_CLINICA`.
- Mobile-first, sem scroll horizontal em 360px, `prefers-reduced-motion` respeitado em tudo.
- Fotos somente reais da clínica. Sem banco de imagem com pessoas.
- Animações via `useGSAP` com `scope`, só `transform` e `opacity` (exceções listadas na SPEC §6).
- Strings de interface (botões, rótulos, títulos de seção) também ficam em `site.ts`, no objeto `ui` ou no objeto da seção.

## Comandos

- `npm run dev`: desenvolvimento
- `npm run build`: precisa passar sem erros antes de entregar qualquer WP
- `npm run preview`: conferir o build

## Uso do taste-skill (design-taste-frontend)

O taste-skill entra como **revisor**, não como fonte de design. Em qualquer conflito, vale a ordem: `docs/SPEC.md` > `docs/PLAN.md` > taste-skill.

### Usar

- **Na Fase 4 (QA):** rodar o verificador do taste-skill em 1440, 1024, 768 e 390px e incluir os achados em `docs/QA-REPORT.md`.
- **Auditoria:** usar o modo `redesign-existing-projects` sobre o site já construído para apontar problemas de hierarquia, espaçamento, contraste e alinhamento.
- **Regras contra visual genérico:** podem guiar decisões de detalhe que a SPEC não cobre.

### Não usar

- **Não rodar `scripts/start.mjs`** nem aceitar paleta ou fonte sorteadas. Cores e fontes são as da SPEC §4 (navy, dourado, creme, Fraunces, Manrope), porque vêm da marca da clínica.
- **Não trocar a stack.** Nada do `assets/starter.html` nem de HTML puro: o projeto é Vite + React + TypeScript + Tailwind v4 + GSAP.
- **Não reescrever conteúdo.** Todo texto vem de `src/content/site.ts`.
- **Não adicionar WebGL nem shaders**, e não usar fotos de banco com pessoas.

### Ajuste de movimento (tipo de página: `service`)

- Seguir a orientação do taste-skill para negócios de serviço. A seção **Filosofia não usa pin nem scroll travado** em nenhum tamanho de tela: são 3 cards com reveal simples. Isto substitui o pin descrito na SPEC §5.
- As demais animações (reveal, CountUp, Marquee, GoldLine, SpotlightCard, MagneticButton) seguem permitidas, sempre discretas e com fallback para `prefers-reduced-motion`.

### Alertas esperados

- O verificador vai acusar "texto provisório" nos itens `TODO_CLINICA`. Eles ficam até a clínica responder. Liste-os no relatório, mas não os invente nem remova.
