# THIERRY. Studio

Site de Thierry Araújo (sites, sistemas e inteligência artificial), feito com Nuxt 4, Vue 3, TypeScript e Tailwind CSS 4.

## Rodar
```
npm install
npm run dev
```
`npm run build` gera a versão de produção (páginas pré-renderizadas) e `npm run typecheck` confere os tipos.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Nome, contatos, redes, CNPJ, foto | `app/data/site.ts` |
| Projetos e cases (`/projetos/<slug>`) | `app/data/projects.ts` |
| Serviços | `app/data/services.ts` |
| Processo e diferenciais | `app/data/process.ts` |
| Perguntas frequentes | `app/data/faq.ts` |
| Pacote de entrada (preço e prazos das páginas de anúncio) | `app/data/offer.ts` |
| Páginas por nicho (`/para/<slug>`) | `app/data/niches.ts` |
| Títulos, descrições e dados estruturados | `app/data/seo.ts` |
| Cores, tipografia e tokens | `app/assets/css/main.css` (espelhado em `brand/DESIGN_TOKENS.json`) |

Para publicar um projeto novo: adicione um item em `projects` (com `slug`), salve a capa em `public/portfolio/<arquivo>.webp`
e as capturas em `public/projetos/<slug>/{desktop,desktop-2,mobile,mobile-2}.webp`. A página de case, o índice, o sitemap e os
dados estruturados são gerados a partir desse item. Miniatura em vídeo: `node scripts/gravar-miniatura.mjs <url> public/portfolio/<nome>.mp4`.
Um projeto com `hidden: true` fica fora do site.

## Estrutura

- `app/components` — seções (`HeroSection`, `SelectedProjects`, `ServicesSection`, `BrandManifesto`, `AboutSection`,
  `ProcessSection`, `DifferentialsSection`, `FaqSection`, `ContactSection`) e peças do sistema (`BrandMark`, `BrutalistButton`,
  `SectionIndex`, `EditorialGrid`, `EditorialMarquee`, `MonumentTitle`, `TitleBlock`, `ProjectShowcase`, `ProjectCaseStudy`).
- `app/pages` — `/`, `/projetos`, `/projetos/[slug]`, `/para/[nicho]`, `/privacidade`.
- `brand/` — identidade visual: logotipos, exports, templates de Instagram, manual em PDF e scripts que geram tudo
  (veja `brand/BRAND_GUIDELINES.md`).
- `docs/` — relatório do redesign e capturas de tela.

URLs do site anterior (`/sobre`, `/sobre-mim`, `/faq` e `/en/*`) redirecionam (301) para as seções equivalentes — veja `nuxt.config.ts`.

## Formulário de briefing
Não há backend: o formulário valida os campos, monta a mensagem e abre o WhatsApp oficial (ou o e-mail) para o visitante
enviar. Nada é armazenado. O envio dispara `Contact` no Pixel e `generate_lead` no GA4, quando configurados.

## Verificação
Com o site rodando (`npm run build && PORT=4173 node .output/server/index.mjs`):
```
node scripts/qa.mjs           # overflow, console, links, SEO, menu mobile, redirecionamentos e formulário
node scripts/qa.mjs --shots   # idem + capturas desktop e mobile em docs/screenshots
```
O script usa o Playwright instalado globalmente (ou no projeto).

## Deploy na Vercel
Importe o repositório em vercel.com/new. O preset Nuxt é detectado automaticamente
(build: `npm run build`). Para domínio próprio: Project > Settings > Domains.

## Anúncios e rastreamento
Na Vercel, em Project > Settings > Environment Variables, crie (e faça um novo deploy):

| Variável | Exemplo | Para quê |
| --- | --- | --- |
| `NUXT_PUBLIC_META_PIXEL_ID` | `1234567890123456` | Pixel do Meta (Facebook/Instagram Ads) |
| `NUXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Google Analytics 4 |
| `NUXT_PUBLIC_SITE_URL` | `https://www.thierryaraujodev.com.br` (já é o padrão) | Link canônico, `og:url` e `sitemap.xml` |

Todo clique em link do WhatsApp (e o envio do formulário) dispara `Contact` no Pixel e `generate_lead` no GA4.

## Páginas por nicho
`/para/clinicas`, `/para/cursos` e `/para/servicos`. Textos em `niches` (`app/data/niches.ts`); para criar outra, adicione um item com um novo `slug`.

## Depoimentos
O site não exibe depoimentos enquanto não houver avaliações reais e autorizadas.
