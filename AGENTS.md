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
