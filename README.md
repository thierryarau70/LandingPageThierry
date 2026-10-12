# Landing Page Thierry

Site de divulgação e venda de landing pages feito com Nuxt 4 + TypeScript.

- WhatsApp e e-mail: `app/utils/site.ts`
- Planos, serviços e FAQ: `app/utils/site.ts`
- Estilos: `app/assets/css/main.css`

## Rodar
```
npm install
npm run dev
```

## Deploy na Vercel
Importe o repositório em vercel.com/new. O preset Nuxt é detectado automaticamente
(build: `npm run build`). Para domínio próprio: Project > Settings > Domains.

## Anúncios e rastreamento
Na Vercel, em Project > Settings > Environment Variables, crie (e faça um novo deploy):

| Variável | Exemplo | Para quê |
| --- | --- | --- |
| `NUXT_PUBLIC_META_PIXEL_ID` | `1234567890123456` | Pixel do Meta (Facebook/Instagram Ads) |
| `NUXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Google Analytics 4 |
| `NUXT_PUBLIC_SITE_URL` | `https://seudominio.com.br` | Link canônico, `og:url` e `sitemap.xml` |

Todo clique em link do WhatsApp (e o envio do formulário) dispara `Contact` no Pixel e `generate_lead` no GA4.

## Páginas por nicho
`/para/clinicas`, `/para/cursos` e `/para/servicos`. Textos em `niches` (`app/utils/site.ts`); para criar outra, adicione um item com um novo `slug`.

## Depoimentos
Adicione em `testimonials` (`app/utils/site.ts`). A seção só aparece quando há pelo menos um.
