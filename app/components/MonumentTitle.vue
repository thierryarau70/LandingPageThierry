<script setup lang="ts">
// Título monumental em linhas. O ponto final quadrado é a assinatura da marca.
withDefaults(defineProps<{
  lines: string[]
  tag?: 'h1' | 'h2' | 'h3' | 'p'
  // 'last': ponto só na última linha · 'all': ponto em todas · número[]: índices das linhas com ponto
  dots?: 'last' | 'all' | 'none' | number[]
  reveal?: boolean
}>(), { tag: 'h2', dots: 'last', reveal: true })

const hasDot = (dots: 'last' | 'all' | 'none' | number[], i: number, total: number) =>
  dots === 'all' || (dots === 'last' && i === total - 1) || (Array.isArray(dots) && dots.includes(i))
</script>

<template>
  <component :is="tag" class="t-display" :data-reveal="reveal ? 'lines' : undefined">
    <span v-for="(line, i) in lines" :key="i" class="line" :style="{ '--line-i': i }"><span>{{ line }}<DotEnd v-if="hasDot(dots, i, lines.length)" />{{ i < lines.length - 1 ? ' ' : '' }}</span></span>
  </component>
</template>
