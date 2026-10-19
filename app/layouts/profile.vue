<script setup lang="ts">
const links = [
  { label: 'Sobre', to: '/sobre' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Projetos', to: '/projetos' },
  { label: 'Sobre mim', to: '/sobre-mim' }
]
const route = useRoute()
const navigation = computed(() => route.path === '/' ? [
  { label: 'Processo', to: '/#como-funciona' },
  { label: 'Projetos', to: '/#projetos' },
  { label: 'Incluso', to: '/#incluso' },
  { label: 'Dúvidas', to: '/#duvidas' }
] : links)
</script>

<template>
  <div class="profile-screen" :class="{ 'sales-shell': route.path === '/' }">
    <header class="profile-header">
      <NuxtLink class="profile-identity" to="/" aria-label="Thierry Araújo — início">
        <span class="profile-mark" aria-hidden="true">t.</span>
        <span>Thierry Araújo<span class="profile-role">Desenvolvedor web</span></span>
      </NuxtLink>
      <nav class="profile-nav" aria-label="Navegação principal">
        <template v-if="route.path === '/'">
          <a v-for="link in navigation" :key="link.to" :href="link.to.slice(1)" :aria-current="route.hash === link.to.slice(1) ? 'location' : undefined">{{ link.label }}</a>
        </template>
        <template v-else><NuxtLink v-for="link in navigation" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink></template>
      </nav>
    </header>
    <slot />
    <footer class="profile-footer">
      <a :href="waLink('Olá, Thierry! Vim pelo site e quero conversar sobre um projeto.')" target="_blank" rel="noopener noreferrer">WhatsApp · (95) 99143-2677 <span aria-hidden="true">↗</span></a>
      <a href="mailto:thierryaraujo309@gmail.com">thierryaraujo309@gmail.com <span aria-hidden="true">↗</span></a>
      <span class="profile-legal">© {{ new Date().getFullYear() }} Thierry Araújo · CNPJ {{ CNPJ }}</span>
    </footer>
  </div>
</template>

<style src="../assets/css/profile.css"></style>
<style src="../assets/css/sales.css"></style>
<style src="../assets/css/motion.css"></style>
