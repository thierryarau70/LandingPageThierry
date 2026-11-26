<script setup lang="ts">
import { differentials } from '~/data/process'
</script>

<template>
  <section class="theme-carbon relative py-(--section-y)" aria-labelledby="diferenciais-title">
    <div class="wrap">
      <SectionIndex index="06" label="Diferenciais" :meta="`${differentials.length} compromissos`" />
      <div class="grid-12 mt-8 gap-y-10 md:mt-12">
        <div class="col-span-4 md:col-span-5">
          <div class="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <MonumentTitle id="diferenciais-title" class="text-huge" :lines="['O que você', 'pode esperar']" />
            <p class="mt-6 max-w-[38ch] text-muted text-pretty">Compromissos de trabalho, não promessas de resultado. É o que está sob meu controle em qualquer projeto.</p>
          </div>
        </div>
        <ol class="col-span-4 border-t border-line md:col-span-7 lg:col-span-6 lg:col-start-7">
          <li v-for="(item, i) in differentials" :key="item.title" class="diff" data-reveal>
            <span class="t-label text-accent tabular-nums" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <h3 class="t-heading text-subtitle">{{ item.title }}</h3>
              <p class="mt-2 text-muted text-pretty">{{ item.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.diff { display: grid; grid-template-columns: 2.5rem 1fr; gap: var(--gap); align-items: baseline; padding-block: clamp(1.1rem, 1.8vw, 1.75rem); border-bottom: 1px solid var(--rule); }
</style>
