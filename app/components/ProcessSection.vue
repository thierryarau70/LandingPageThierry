<script setup lang="ts">
import { processSteps } from '~/data/process'

withDefaults(defineProps<{ index?: string }>(), { index: '05' })
</script>

<template>
  <section id="processo" class="theme-paper relative overflow-clip py-(--section-y)" aria-labelledby="processo-title">
    <EditorialGrid />
    <div class="wrap relative">
      <SectionIndex :index="index" label="Processo" meta="4 etapas" />
      <div class="grid-12 mt-8 items-end gap-y-6 md:mt-12">
        <MonumentTitle id="processo-title" class="col-span-4 text-giant md:col-span-12 lg:col-span-9" :lines="['Do problema', 'à solução']" />
        <p class="col-span-4 text-body text-muted md:col-span-6 lg:col-span-3 lg:col-start-10 lg:pb-3 xl:text-lead text-pretty">
          Um caminho previsível, com decisões registradas e etapas que você acompanha do início ao fim.
        </p>
      </div>

      <ol class="steps mt-12 md:mt-20">
        <li v-for="step in processSteps" :key="step.number" class="step" data-reveal>
          <p class="t-display step__num" aria-hidden="true">{{ step.number }}</p>
          <div class="step__body">
            <h3 class="t-display step__title"><span class="sr-only">Etapa {{ step.number }}: </span>{{ step.title }}</h3>
            <p class="mt-3 text-pretty">{{ step.text }}</p>
            <p class="t-label mt-5 flex items-start gap-2 text-muted"><ArrowIcon dir="right" class="mt-px shrink-0 text-accent-ink" /><span>{{ step.output }}</span></p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.steps { display: grid; border-top: 1px solid var(--rule); }
.step { display: grid; grid-template-columns: minmax(4.5rem, 26%) 1fr; gap: var(--gap); padding-block: 1.5rem 2rem; border-bottom: 1px solid var(--rule); background: var(--color-paper); }
.step__num { font-size: clamp(3.5rem, 17vw, 6rem); line-height: 0.8; }
.step__title { font-size: clamp(1.5rem, 2.3vw, 2.5rem); line-height: 1; }
@media (width >= 64rem) {
  .steps { grid-template-columns: repeat(4, minmax(0, 1fr)); border-bottom: 1px solid var(--rule); }
  .step { grid-template-columns: 1fr; align-content: start; gap: clamp(3rem, 6vw, 7rem); padding: 1.5rem var(--gap) 2rem; border-bottom: 0; border-left: 1px solid var(--rule); min-height: 100%; transition: background-color 0.35s, color 0.35s; }
  .step:first-child { border-left: 0; padding-left: 0; }
  .step__num { font-size: clamp(5rem, 10.5vw, 12rem); transition: color 0.35s; }
  .step:hover .step__num { color: var(--color-signal); }
}
</style>
