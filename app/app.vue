<template>
  <div>
    <div class="bg-orb orb1" /><div class="bg-orb orb2" />
    <SiteHeader />
    <NuxtPage />
    <footer><p>© {{ new Date().getFullYear() }} Thierry Araújo. Todos os direitos reservados.</p></footer>
    <a class="fab" :href="waLink('Olá Thierry! Vim pelo site.')" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { siteUrl } = useRuntimeConfig().public
useHead(() => {
  if (!siteUrl) return {}
  const url = siteUrl.replace(/\/$/, '') + (route.path === '/' ? '' : route.path)
  return {
    link: [{ rel: 'canonical', href: url }],
    meta: [{ property: 'og:url', content: url }, { property: 'og:image', content: `${siteUrl.replace(/\/$/, '')}/portfolio/emile.webp` }]
  }
})
</script>
