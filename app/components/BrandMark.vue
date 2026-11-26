<script setup lang="ts">
// Logotipo vetorial. As letras usam a cor do texto; o ponto usa a cor de destaque do tema.
import { brandSymbol, brandWordmark } from '~/data/brand.generated'

const props = withDefaults(defineProps<{ variant?: 'wordmark' | 'symbol', title?: string }>(), { variant: 'wordmark' })
const mark = computed(() => (props.variant === 'symbol' ? brandSymbol : brandWordmark))
</script>

<template>
  <svg :viewBox="`0 0 ${mark.width} ${mark.height}`" xmlns="http://www.w3.org/2000/svg" :role="title ? 'img' : undefined" :aria-label="title" :aria-hidden="title ? undefined : 'true'" focusable="false">
    <path fill="currentColor" fill-rule="evenodd" :d="mark.path" />
    <rect class="brand-dot" :x="mark.dot.x" :y="mark.dot.y" :width="mark.dot.size" :height="mark.dot.size" />
  </svg>
</template>

<style scoped>
.brand-dot { fill: var(--dot, var(--color-signal)); }
</style>
