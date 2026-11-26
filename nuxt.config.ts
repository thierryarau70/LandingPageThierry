import tailwindcss from '@tailwindcss/vite'

// URLs antigas (site anterior e versão em inglês) levam às seções equivalentes do site novo.
const legacyRedirects: Record<string, string> = {
  '/sobre': '/#servicos',
  '/sobre-mim': '/#sobre',
  '/faq': '/#faq',
  '/en': '/',
  '/en/about': '/#servicos',
  '/en/about-me': '/#sobre',
  '/en/faq': '/#faq',
  '/en/projects': '/projetos'
}

// Domínio anterior: continua ligado ao projeto na Vercel e leva, com 308, à mesma página no domínio novo.
const previousHost = '(?:www\\.)?thierryaraujodev\\.com\\.br'
const currentOrigin = 'https://www.thierrystudio.com.br'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  nitro: {
    // Keep renderer imports bundled so Nuxt resolves its generated manifest.
    externals: { inline: [/^nuxt(?:\/|$)/] },
    vercel: {
      config: {
        routes: [{ src: '/(.*)', has: [{ type: 'host', value: previousHost }], status: 308, headers: { Location: `${currentOrigin}/$1` } }]
      }
    },
    // Páginas geradas no build e servidas direto da CDN (sem esperar o servidor montar a cada visita)
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projetos', '/privacidade', '/para/clinicas', '/para/cursos', '/para/servicos', '/sitemap.xml']
    }
  },
  routeRules: Object.fromEntries(
    Object.entries(legacyRedirects).map(([from, to]) => [from, { redirect: { to, statusCode: 301 } }])
  ),
  vite: { plugins: [tailwindcss()] },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // Preencha pelas variáveis de ambiente da Vercel (Settings > Environment Variables)
      siteUrl: 'https://www.thierrystudio.com.br', // pode ser trocado por NUXT_PUBLIC_SITE_URL
      metaPixelId: '', // NUXT_PUBLIC_META_PIXEL_ID
      gaId: '' // NUXT_PUBLIC_GA_ID, ex.: G-XXXXXXXXXX
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0D0D0D' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  }
})
