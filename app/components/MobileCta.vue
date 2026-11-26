<script setup lang="ts">
// Barra fixa no rodapé da tela (celular e tablet): mantém a chamada "Iniciar um projeto" sempre à mão,
// como o botão do cabeçalho no desktop. Some no topo da página, na seção de contato e no rodapé.
import { waLink, waMessages } from '~/data/site'

const route = useRoute()
const show = ref(false)
let io: IntersectionObserver | undefined
const hidden = new Set<Element>()

const watch = () => {
  io?.disconnect()
  hidden.clear()
  show.value = false
  if (!('IntersectionObserver' in window)) return
  io = new IntersectionObserver((entries) => {
    for (const e of entries) e.isIntersecting ? hidden.add(e.target) : hidden.delete(e.target)
    show.value = hidden.size === 0
  })
  // enquanto o topo, o contato ou o rodapé estão na tela, a barra não aparece
  document.querySelectorAll('main > section:first-child, main > article > header, #contato, body footer, #menu-mobile.is-open').forEach(el => io!.observe(el))
}
onMounted(() => nextTick(watch))
useRouter().afterEach(() => setTimeout(watch, 450))
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <div class="mobile-cta no-print" :class="{ 'is-on': show }" :inert="!show">
    <NuxtLink :to="{ path: '/', hash: '#contato' }" class="mobile-cta__main t-label">Iniciar um projeto <ArrowIcon dir="up-right" /></NuxtLink>
    <a :href="waLink(waMessages.start)" target="_blank" rel="noopener noreferrer" class="mobile-cta__wa t-label">WhatsApp<span class="sr-only"> (abre em nova aba)</span></a>
  </div>
</template>

<style scoped>
.mobile-cta {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 40; display: grid; grid-template-columns: 1fr auto;
  border-top: 1px solid var(--color-carbon); transform: translate3d(0, 101%, 0); transition: transform 0.45s var(--ease-brand);
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--color-carbon);
}
.mobile-cta.is-on { transform: none; }
.mobile-cta__main { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 3.5rem; padding-inline: var(--gutter); background: var(--color-signal); color: var(--color-carbon); font-size: 0.8125rem; }
.mobile-cta__wa { display: flex; align-items: center; padding-inline: 1.25rem; background: var(--color-carbon); color: var(--color-paper); font-size: 0.8125rem; }
@media (width >= 64rem) { .mobile-cta { display: none; } }
@media (prefers-reduced-motion: reduce) { .mobile-cta { transition: none; } }
</style>
