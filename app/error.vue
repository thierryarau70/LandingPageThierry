<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error?.statusCode === 404)
useSeoMeta({ title: () => (notFound.value ? 'Página não encontrada | Thierry Araújo' : 'Erro | Thierry Araújo'), robots: 'noindex' })
const home = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
    <AppHeader />
    <main id="conteudo" class="theme-carbon">
      <div class="wrap flex min-h-[72svh] flex-col justify-center py-(--section-y)">
        <p class="t-label flex items-center gap-3 text-muted"><span class="inline-block size-2 bg-accent" aria-hidden="true" />Erro {{ error?.statusCode ?? 500 }}</p>
        <h1 class="t-display mt-6 text-giant">{{ notFound ? 'Página não encontrada' : 'Algo saiu do prumo' }}<span class="dot" aria-hidden="true" /></h1>
        <p class="mt-6 max-w-[46ch] text-lead text-muted">{{ notFound ? 'O endereço pode ter mudado com o novo site. Os projetos e os contatos continuam a um clique.' : 'Tente novamente em instantes ou volte para o início.' }}</p>
        <div class="mt-10 flex flex-col gap-3 sm:flex-row">
          <BrutalistButton size="lg" @click="home">Voltar ao início</BrutalistButton>
          <BrutalistButton to="/projetos" size="lg" variant="outline">Ver projetos</BrutalistButton>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
