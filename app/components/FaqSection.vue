<script setup lang="ts">
import type { FaqItem } from '~/data/faq'
import { faq } from '~/data/faq'
import { waLink } from '~/data/site'

withDefaults(defineProps<{ items?: FaqItem[], index?: string }>(), { items: () => faq, index: '07' })
</script>

<template>
  <section id="faq" class="theme-paper relative py-(--section-y)" aria-labelledby="faq-title">
    <div class="wrap">
      <SectionIndex :index="index" label="Perguntas frequentes" :meta="`${items.length} respostas`" />
      <div class="grid-12 mt-8 gap-y-10 md:mt-12">
        <div class="col-span-4 md:col-span-5">
          <div class="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <MonumentTitle id="faq-title" class="text-huge" :lines="['Antes de', 'começar']" />
            <p class="mt-6 max-w-[36ch] text-muted text-pretty">Não encontrou o que procurava? Pergunte direto para quem vai desenvolver.</p>
            <a :href="waLink('Olá, Thierry! Tenho uma dúvida antes de iniciar um projeto.')" target="_blank" rel="noopener noreferrer" class="link-line t-label mt-5">Perguntar pelo WhatsApp <ArrowIcon dir="up-right" /><span class="sr-only"> (abre em nova aba)</span></a>
          </div>
        </div>
        <div class="col-span-4 border-b border-line md:col-span-7 lg:col-span-6 lg:col-start-7">
          <details v-for="(item, i) in items" :key="item.q" class="question" data-reveal>
            <summary>
              <span class="t-label text-muted tabular-nums" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="t-heading text-subtitle">{{ item.q }}</h3>
              <span class="question__toggle" aria-hidden="true"><i /><i /></span>
            </summary>
            <p class="question__answer text-pretty">{{ item.a }}</p>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.question { border-top: 1px solid var(--rule); interpolate-size: allow-keywords; }
.question summary { display: grid; grid-template-columns: 2.5rem 1fr 1.25rem; gap: var(--gap); align-items: baseline; padding-block: clamp(1rem, 1.6vw, 1.5rem); transition: color 0.2s; }
.question summary:hover { color: var(--accent-ink); }
.question__toggle { position: relative; width: 1.1rem; height: 1.1rem; align-self: center; }
.question__toggle i { position: absolute; inset: 0; margin: auto; background: currentColor; transition: transform 0.4s var(--ease-brand); }
.question__toggle i:first-child { width: 100%; height: 2px; }
.question__toggle i:last-child { width: 2px; height: 100%; }
.question[open] .question__toggle i:last-child { transform: scaleY(0); }
.question::details-content { block-size: 0; overflow: clip; transition: block-size 0.45s var(--ease-brand), content-visibility 0.45s allow-discrete; }
.question[open]::details-content { block-size: auto; }
.question__answer { padding: 0 0 1.75rem calc(2.5rem + var(--gap)); color: var(--mute); max-width: 64ch; }
</style>
