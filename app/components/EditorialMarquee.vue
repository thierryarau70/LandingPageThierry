<script setup lang="ts">
import { pillars } from '~/data/site'

withDefaults(defineProps<{ items?: readonly string[] }>(), { items: () => pillars })
</script>

<template>
  <div class="theme-paper marquee border-y border-line">
    <p class="sr-only">{{ items.join(' / ') }}</p>
    <div class="marquee__track t-display" aria-hidden="true">
      <span v-for="n in 4" :key="n" class="marquee__group">
        <template v-for="item in items" :key="item"><span>{{ item }}</span><i /></template>
      </span>
    </div>
  </div>
</template>

<style scoped>
.marquee { overflow: clip; }
.marquee__track { display: flex; width: max-content; font-size: clamp(1.5rem, 3.6vw, 3.75rem); line-height: 1; padding-block: clamp(0.8rem, 1.5vw, 1.5rem); animation: marquee 48s linear infinite; }
.marquee:hover .marquee__track { animation-play-state: paused; }
.marquee__group { display: flex; align-items: center; flex: none; }
.marquee__group span { padding-inline: clamp(1rem, 2vw, 2.25rem); }
.marquee__group i { display: block; width: 0.09em; height: 0.82em; background: var(--color-signal); transform: skewX(-20deg); }
@media (prefers-reduced-motion: reduce) { .marquee__track { animation: none; } }
</style>
