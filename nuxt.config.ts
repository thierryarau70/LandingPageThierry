export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  nitro: {
    // Keep renderer imports bundled so Nuxt resolves its generated manifest.
    externals: { inline: [/^nuxt(?:\/|$)/] },
    // Páginas geradas no build e servidas direto da CDN (sem esperar o servidor montar a cada visita)
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en', '/sobre', '/faq', '/projetos', '/sobre-mim', '/en/about', '/en/faq', '/en/projects', '/en/about-me', '/para/clinicas', '/para/cursos', '/para/servicos', '/sitemap.xml']
    }
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // Preencha pelas variáveis de ambiente da Vercel (Settings > Environment Variables)
      siteUrl: 'https://thierryaraujodev.com.br', // pode ser trocado por NUXT_PUBLIC_SITE_URL
      metaPixelId: '', // NUXT_PUBLIC_META_PIXEL_ID
      gaId: '' // NUXT_PUBLIC_GA_ID, ex.: G-XXXXXXXXXX
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Thierry Araújo | Landing Pages que vendem',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Landing pages profissionais, rápidas e feitas para converter. Escolha seu plano e fale comigo direto no WhatsApp.' },
        { name: 'theme-color', content: '#0b0b1a' },
        { property: 'og:title', content: 'Thierry Araújo | Landing Pages que vendem' },
        { property: 'og:description', content: 'Sua página no ar em poucos dias. Veja os planos e peça seu orçamento.' },
        { property: 'og:type', content: 'website' }
      ],
      script: [
        // Aplica o tema antes de desenhar a página (evita piscar claro no modo escuro)
        { innerHTML: "try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}", tagPosition: 'head' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
        // a folha de fontes entra por server/plugins/loader.ts, sem bloquear a primeira pintura
      ]
    }
  }
})
