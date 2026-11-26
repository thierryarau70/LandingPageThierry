<script setup lang="ts">
import archivo from '@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2?url'

// A fonte dos títulos monumentais é pré-carregada: é ela que define a primeira dobra.
useHead({ link: [{ rel: 'preload', as: 'font', type: 'font/woff2', href: archivo, crossorigin: 'anonymous' }] })
</script>

<template>
  <div>
    <a href="#conteudo" class="skip-link t-label">Pular para o conteúdo</a>
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </div>
</template>

<style>
.skip-link { position: fixed; left: 0.5rem; top: 0.5rem; z-index: 100; padding: 0.9rem 1.1rem; background: var(--color-signal); color: var(--color-carbon); transform: translateY(-200%); }
.skip-link:focus { transform: none; }
</style>
