<script setup lang="ts">
// Logotipo vetorial THIERRY. Studio. As letras usam a cor do texto; o ponto usa a cor de destaque do tema.
// wordmark: só THIERRY. · lockup: THIERRY. STUDIO em linha · stacked: THIERRY. com STUDIO abaixo · symbol: T.
import { brandLockup, brandStacked, brandSymbol, brandWordmark } from '~/data/brand.generated'

const props = withDefaults(defineProps<{ variant?: 'wordmark' | 'lockup' | 'stacked' | 'symbol', title?: string }>(), { variant: 'wordmark' })
const mark = computed(() => (props.variant === 'symbol' ? brandSymbol : brandWordmark))
const viewBox = computed(() => {
  if (props.variant === 'lockup') return `0 -2 ${brandLockup.width} 104`
  if (props.variant === 'stacked') return `0 0 ${brandWordmark.width} ${brandStacked.height}`
  return `0 0 ${mark.value.width} ${mark.value.height}`
})
</script>

<template>
  <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg" :role="title ? 'img' : undefined" :aria-label="title" :aria-hidden="title ? undefined : 'true'" focusable="false">
    <path fill="currentColor" fill-rule="evenodd" :d="mark.path" />
    <rect class="brand-dot" :x="mark.dot.x" :y="mark.dot.y" :width="mark.dot.size" :height="mark.dot.size" />
    <path v-if="variant === 'lockup'" fill="currentColor" :d="brandLockup.studio" />
    <template v-else-if="variant === 'stacked'">
      <rect fill="currentColor" :x="brandStacked.rule.x" :y="brandStacked.rule.y" :width="brandStacked.rule.width" :height="brandStacked.rule.height" />
      <path fill="currentColor" :d="brandStacked.studio" />
    </template>
  </svg>
</template>

<style scoped>
.brand-dot { fill: var(--dot, var(--color-signal)); }
</style>
