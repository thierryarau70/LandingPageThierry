<template>
  <div class="site-root">
    <template v-if="!isProfile">
      <div class="bg-orb orb1" /><div class="bg-orb orb2" />
      <SiteHeader />
    </template>
    <NuxtLayout><NuxtPage /></NuxtLayout>
    <footer v-if="!isProfile"><p>© {{ new Date().getFullYear() }} Thierry Araújo · CNPJ {{ CNPJ }}. Todos os direitos reservados.</p></footer>
    <a v-if="!isProfile" class="fab" :href="waLink('Olá Thierry! Vim pelo site.')" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
  </div>
</template>

<script setup lang="ts">
import { pagePaths, switchPath } from './utils/i18n'
const route = useRoute()
const isProfile = computed(() => route.meta.layout === 'profile')
const { siteUrl } = useRuntimeConfig().public
const { lang } = useLocale()
useHead(() => {
  const htmlAttrs = { lang: lang.value === 'en' ? 'en' : 'pt-BR' }
  if (!siteUrl) return { htmlAttrs }
  const base = siteUrl.replace(/\/$/, '')
  const path = route.path.replace(/\/$/, '') || '/'
  const url = base + (path === '/' ? '' : path)
  // Páginas com versão nos dois idiomas avisam o Google uma da outra (hreflang)
  const ptPath = switchPath(path, 'pt'), enPath = switchPath(path, 'en')
  const translated = pagePaths[ptPath] === enPath && (path === ptPath || path === enPath)
  const alternates = translated
    ? [
        { rel: 'alternate' as const, hreflang: 'pt-BR', href: base + (ptPath === '/' ? '' : ptPath) },
        { rel: 'alternate' as const, hreflang: 'en', href: base + enPath },
        { rel: 'alternate' as const, hreflang: 'x-default', href: base + (ptPath === '/' ? '' : ptPath) }
      ]
    : []
  return {
    htmlAttrs,
    link: [{ rel: 'canonical', href: url }, ...alternates],
    meta: [
      { property: 'og:url', content: url },
      // Miniatura ao compartilhar o link (LinkedIn, WhatsApp, Instagram): print do próprio site
      { property: 'og:image', content: `${siteUrl.replace(/\/$/, '')}/og-image.jpg` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Thierry Araújo — Seu site no ar em até 5 dias' },
      { property: 'og:site_name', content: 'Thierry Araújo' },
      { property: 'og:locale', content: lang.value === 'en' ? 'en_US' : 'pt_BR' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: `${siteUrl.replace(/\/$/, '')}/og-image.jpg` }
    ]
  }
})
</script>
