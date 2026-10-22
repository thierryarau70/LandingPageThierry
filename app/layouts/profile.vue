<script setup lang="ts">
const route = useRoute()
const { lang, t, otherPath } = useLocale()
const isHome = computed(() => route.path === '/' || route.path === '/en')
const navigation = computed(() => isHome.value
  ? t.value.homeNav.map(link => ({ label: link.label, to: link.hash }))
  : t.value.pageNav)

// Tema: a classe .dark no <html> já é definida antes da página aparecer (script em nuxt.config)
const toggleTheme = () => {
  const root = document.documentElement
  root.classList.add('theme-anim')
  setTimeout(() => root.classList.remove('theme-anim'), 400)
  const dark = root.classList.toggle('dark')
  try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
}
</script>

<template>
  <div class="profile-screen" :class="{ 'sales-shell': isHome }">
    <header class="profile-header">
      <NuxtLink class="profile-identity" :to="lang === 'en' ? '/en' : '/'" :aria-label="t.homeLabel">
        <span class="profile-mark" aria-hidden="true">t.</span>
        <span>Thierry Araújo<span class="profile-role">{{ t.role }}</span></span>
      </NuxtLink>
      <nav class="profile-nav" :aria-label="t.navLabel">
        <template v-if="isHome">
          <a v-for="link in navigation" :key="link.to" :href="link.to" :aria-current="route.hash === link.to ? 'location' : undefined">{{ link.label }}</a>
        </template>
        <template v-else><NuxtLink v-for="link in navigation" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink></template>
      </nav>
      <div class="profile-tools">
        <div class="profile-lang" role="group" :aria-label="t.langLabel">
          <!-- link comum (recarrega): troca todos os textos de uma vez -->
          <a :href="lang === 'pt' ? undefined : otherPath" :aria-current="lang === 'pt' ? 'true' : undefined" lang="pt-BR" hreflang="pt-BR">PT</a>
          <a :href="lang === 'en' ? undefined : otherPath" :aria-current="lang === 'en' ? 'true' : undefined" lang="en" hreflang="en">EN</a>
        </div>
        <button class="profile-theme" type="button" @click="toggleTheme">
          <span class="theme-to-dark" aria-hidden="true">☾</span><span class="theme-to-light" aria-hidden="true">☀</span>
          <span class="theme-label theme-to-dark">{{ t.themeDark }}</span><span class="theme-label theme-to-light">{{ t.themeLight }}</span>
        </button>
      </div>
    </header>
    <slot />
    <footer class="profile-footer">
      <a :href="waLink(t.footerWa)" target="_blank" rel="noopener noreferrer">WhatsApp · (95) 99143-2677 <span aria-hidden="true">↗</span></a>
      <a href="mailto:thierryaraujo309@gmail.com">thierryaraujo309@gmail.com <span aria-hidden="true">↗</span></a>
      <span class="profile-legal">© {{ new Date().getFullYear() }} Thierry Araújo · CNPJ {{ CNPJ }}</span>
    </footer>
  </div>
</template>

<style src="../assets/css/profile.css"></style>
<style src="../assets/css/sales.css"></style>
<style src="../assets/css/motion.css"></style>
<style src="../assets/css/theme.css"></style>
