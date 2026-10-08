export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
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
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap' }
      ]
    }
  }
})
