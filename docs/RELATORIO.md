# Relatório do redesign — THIERRY. Studio

Data: 26/11/2026 · Escopo: identidade visual, redesign completo do site, cases, SEO, materiais de Instagram e manual em PDF.

## 1. O que foi feito

### Pesquisa (Fase 01)
- **Bright Data** (CLI autenticada com a chave do ambiente): perfil e 10 publicações do Instagram `@thierryaraujo.dev` (hoje `@thierrystudio.co`)
  (bio, legendas, capas), o site atual e as referências de design (Awwwards/brutalism, Siteinspire, Godly, Studio Feixen,
  Pentagram e Behance). Também foram localizados o LinkedIn e o GitHub públicos.
- **Repositório:** Nuxt 4.6 + Vue 3.5 + TypeScript, CSS próprio, 15 projetos cadastrados, rastreamento por Pixel/GA4,
  páginas de anúncio `/para/<nicho>` e versão em inglês.
- **Projetos:** os projetos do portfólio foram abertos um a um; o conteúdo real de cada página e a stack detectável
  (com evidência) alimentam os cases. Foram feitas capturas reais (desktop e mobile) em `public/projetos`.

### Identidade visual (Fases 02–04)
- Três conceitos de logotipo em SVG vetorial (`brand/logos`): **A** monograma estrutural TA, **B** wordmark THIERRY.,
  **C** símbolo modular. Recomendado e aplicado: **B**, com o símbolo **T.S** (o antigo "T." foi trocado depois que a busca reversa encontrou marcas com o mesmo arranjo)
- Exports em PNG transparente, avatar do Instagram, favicons, imagem Open Graph e manifesto.
- Tokens (`brand/DESIGN_TOKENS.json` ↔ `app/assets/css/main.css`), tipografia (Archivo, Space Grotesk, Manrope,
  IBM Plex Mono — todas OFL, servidas pelo próprio site) e sistema gráfico (malha, ponto quadrado, carimbo técnico,
  hachura, mosaico, coordenadas).

### Site (Fases 05–07)
- Tailwind CSS 4 com tokens em `@theme`; toda a base antiga de CSS e componentes foi substituída.
- Página inicial: cabeçalho com menu mobile próprio, hero assimétrico, faixa editorial, trabalhos selecionados, serviços
  expansíveis, manifesto, sobre, processo, diferenciais, FAQ, contato com briefing e rodapé com wordmark em grande escala.
- `/projetos` (índice com filtro por disciplina) e `/projetos/[slug]` (11 cases gerados de `app/data/projects.ts`).
- `/para/clinicas`, `/para/cursos`, `/para/servicos` redesenhadas, mantendo a oferta real (pacote de entrada).
- `/privacidade` e página de erro 404 na identidade.
- Conteúdo centralizado e tipado em `app/data` (site, projetos, serviços, processo, FAQ, oferta, nichos, SEO).
- SEO: títulos e descrições por página, canonical, Open Graph, Twitter Card, sitemap dinâmico, robots, JSON-LD
  (WebSite, Person, ProfessionalService com catálogo de Service, FAQPage, BreadcrumbList e CreativeWork nos cases).
- Briefing com validação, feedback, campo-isca e tempo mínimo contra spam; entrega real pelo WhatsApp oficial ou por e-mail.
- Animações em CSS e IntersectionObserver (sem GSAP): revelação de títulos e imagens, hover dos projetos, setas,
  accordion nativo, transição de página. Tudo desligado em `prefers-reduced-motion` e funcional sem JavaScript.

### Instagram e manual (Fases 08–09)
- `brand/social`: 26 peças (posts, carrossel, case, stories, capas de reels, destaques, proposta comercial em A4 e prévia do
  feed com nove publicações) geradas por script. **Nada foi publicado ou alterado no Instagram.**
- `brand/guidelines/Thierry_Araujo_Manual_Identidade_Visual.pdf`: 24 páginas em A4 paisagem, conferidas uma a uma.

## 2. Decisões que mudam comportamento existente

| Mudança | Motivo |
| --- | --- |
| Versão em inglês (`/en/*`) retirada; as URLs redirecionam (301) para as equivalentes em português | O briefing define português brasileiro; manter duas versões do novo conteúdo dobraria a manutenção. Pode voltar depois |
| `/sobre`, `/sobre-mim` e `/faq` redirecionam (301) para `/#servicos`, `/#sobre` e `/#faq` | O conteúdo passou para a página inicial |
| Preço e prazos fixos saíram da página inicial; continuam nas páginas `/para/<nicho>` | Posicionamento de estúdio; a oferta de R$ 800 segue valendo como pacote de entrada nas páginas de anúncio |
| Tela de carregamento e alternância claro/escuro removidas | O briefing pede que o conteúdo não fique escondido no carregamento; a alternância Paper/Carbon agora é da direção de arte |
| Emojis e ícones emoji retirados dos textos | Regra da nova identidade |
| Vídeos dos projetos começam após a primeira interação do visitante | A captura estática é a imagem principal da página (LCP) |

## 3. Testes executados

| Verificação | Resultado |
| --- | --- |
| `nuxt typecheck` | sem erros |
| `nuxt build` (17 páginas pré-renderizadas + redirecionamentos) | concluído |
| Lint | não há lint configurado no projeto |
| `node scripts/qa.mjs` | **80/80**: sem overflow horizontal e sem erros de console em 320, 375, 430, 768, 1024, 1440, 1920 e 2560 px; um h1 por página e títulos sem saltos; imagens carregando e com `alt`; áreas clicáveis ≥ 24 px; título, descrição, canonical e JSON-LD válidos; links internos e âncoras; redirecionamentos 301; 404; menu mobile (abre, fecha com Esc); formulário (erros, foco, contato inválido, abertura do WhatsApp com a mensagem, feedback, campo-isca) |
| axe-core (WCAG 2.0/2.1/2.2 A e AA + boas práticas), 5 páginas × desktop e mobile | 0 violações |
| Revisão visual | página inicial, índice, case, nicho, menu mobile e accordion conferidos em capturas; PDF e peças de Instagram conferidos página a página |

### Lighthouse (build de produção local)

| Página | Mobile (perf / a11y / boas práticas / SEO) | Desktop |
| --- | --- | --- |
| `/` | 99 / 100 / 100 / 100 · LCP 1,5 s · CLS 0 | 100 / 100 / 100 / 100 |
| `/projetos` | 82 / 100 / 100 / 100 · LCP 4,9 s (simulado) | 99 / 100 / 100 / 100 |
| `/projetos/prumo` | 100 / 100 / 100 / 100 · LCP 1,1 s | 99 / 100 / 100 / 100 |
| `/para/clinicas` | 99 / 100 / 100 / 100 · LCP 1,4 s | 100 / 100 / 100 / 100 |

O índice de projetos fica em 82 no mobile porque a rede 4G lenta simulada divide a banda entre as capturas dos primeiros
projetos; o LCP medido sem simulação fica abaixo de 0,3 s. Os números reais devem ser medidos de novo após a publicação.

Capturas desktop e mobile: [`docs/screenshots`](screenshots).

## 4. Fontes: o que foi e o que não foi encontrado

- **Fotografia profissional:** não existe em nenhuma fonte. O Instagram só tem peças gráficas e o avatar é um logotipo; a
  foto do LinkedIn é uma selfie de 200 × 200 px. Nenhuma imagem genérica foi usada: o hero e a seção Sobre usam composições
  da marca e capturas reais.
- **Radar de Clientes:** confirmado como projeto seu por publicação no LinkedIn, mas `radardecliente.com.br` responde 404 e
  o projeto já havia sido retirado do portfólio em um commit anterior. Ficou fora.
- **Agente Marcos:** nenhuma fonte pública encontrada. Ficou fora.
- **Centro de Isoladas:** incluído a seu pedido, com o domínio `centrodeisoladas.com.br`, no lugar do Protocolo IATF,
  que ficou oculto (`hidden: true` em `app/data/projects.ts`).
- **Attletto Teams:** 404. **Agrovet:** fora da lista curada do site atual. Ambos ficaram fora.
- **CW Imports:** os depoimentos exibidos no catálogo estão rotulados como "exemplo"; não foram usados como prova social.
- **Depoimentos, logotipos de clientes, métricas e certificações:** não há material autorizado; nada foi inventado.
- **Experiência:** "4 anos" vem do site atual (`experienceYears` em `app/data/site.ts`).
- **Referências:** a home do Awwwards e a segunda busca do Behance não foram coletadas; hovers e transições das referências
  não são observáveis em captura estática.

## 5. Pendências reais

1. **Retrato profissional** — ao ter um, salve em `public/brand/` e informe o caminho em `photo` (`app/data/site.ts`).
2. **Publicação** — nada foi publicado. Um push em `main` dispara o deploy da Vercel; aguarda sua autorização.
3. **Projetos fora do portfólio:** Radar de Clientes e Agrovet só entram se você pedir (e com qual status); o Protocolo
   IATF está oculto e volta removendo `hidden: true`. Já confirmados por você: 4 anos de experiência, site só em
   português e sem preço na página inicial.
4. **Tecnologias dos cases** foram detectadas pelo que é visível nos sites publicados; complete `stack` em
   `app/data/projects.ts` se quiser citar backend e serviços.
5. **Resultados dos cases:** o campo `results` existe e a seção aparece sozinha quando houver números verificáveis.
6. **Consentimento de cookies:** Pixel e GA4 carregam quando configurados, como já acontecia. Se for anunciar, vale
   adicionar um aviso de consentimento.
7. **Assinatura de e-mail:** `brand/email-signature.html` aponta para `/brand/symbol-email.png`, que só existirá no domínio
   depois da publicação.
8. **Imagem dos destaques e áreas seguras do Instagram:** os recortes usados nos templates seguem medidas usuais e devem
   ser conferidos no aplicativo antes de publicar.
