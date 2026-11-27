<script setup lang="ts">
import { services } from '~/data/services'
import { findProject } from '~/data/projects'
import { waLink, waMessages } from '~/data/site'

const related = (slugs: string[]) => slugs.map(findProject).filter(p => !!p)
</script>

<template>
  <section id="servicos" class="theme-paper relative py-(--section-y)" aria-labelledby="servicos-title">
    <div class="wrap">
      <SectionIndex index="03" label="Serviços" :meta="`${services.length} frentes de atuação`" />
      <div class="grid-12 mt-8 items-end gap-y-6 md:mt-12">
        <MonumentTitle id="servicos-title" class="col-span-4 text-giant md:col-span-12 lg:col-span-9" :lines="['O que eu', 'construo']" />
        <p class="col-span-4 text-body text-muted md:col-span-6 lg:col-span-3 lg:col-start-10 lg:pb-3 xl:text-lead text-pretty">
          Da página que apresenta a empresa ao sistema que organiza a operação. Cada frente pode ser contratada sozinha ou combinada.
        </p>
      </div>

      <div class="mt-10 border-b border-line md:mt-16">
        <details v-for="(s, i) in services" :key="s.id" class="service" name="servicos" :open="i === 0" data-reveal>
          <summary class="service__summary">
            <span class="t-label tabular-nums">{{ s.number }} <span class="text-muted" aria-hidden="true">/</span></span>
            <h3 class="t-display service__title">{{ s.title }}</h3>
            <span class="service__toggle" aria-hidden="true"><i /><i /></span>
          </summary>
          <div class="service__panel">
            <div class="grid-12 gap-y-8 pb-10 md:pb-14">
              <p class="col-span-4 text-lead md:col-span-5 md:col-start-2 lg:col-span-4 lg:col-start-2 text-pretty">{{ s.description }}</p>
              <div class="col-span-4 md:col-span-5 md:col-start-8 lg:col-span-3 lg:col-start-7">
                <h4 class="t-label text-muted">Aplicações</h4>
                <ul class="mt-3 grid gap-2.5"><li v-for="item in s.examples" :key="item" class="service__item">{{ item }}</li></ul>
              </div>
              <div class="col-span-4 md:col-span-5 md:col-start-2 lg:col-span-3 lg:col-start-10">
                <h4 class="t-label text-muted">Para o negócio</h4>
                <ul class="mt-3 grid gap-2.5"><li v-for="item in s.benefits" :key="item" class="service__item">{{ item }}</li></ul>
              </div>
              <div class="col-span-4 flex flex-col gap-5 md:col-span-11 md:col-start-2 md:flex-row md:items-center md:justify-between">
                <BrutalistButton :href="waLink(waMessages.service(s.topic))" variant="solid" arrow="up-right">{{ s.cta }}</BrutalistButton>
                <p v-if="related(s.related).length" class="t-label flex flex-wrap items-center gap-x-4 gap-y-2 text-muted">
                  Na prática
                  <NuxtLink v-for="p in related(s.related)" :key="p.slug" :to="`/projetos/${p.slug}`" class="link-line min-w-6 justify-center text-ink">{{ p.name }}</NuxtLink>
                </p>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service { border-top: 1px solid var(--rule); interpolate-size: allow-keywords; }
.service__summary {
  display: grid; grid-template-columns: 2.25rem minmax(0, 1fr) auto; align-items: center; gap: var(--gap);
  padding-block: clamp(1rem, 2vw, 2rem); transition: color 0.25s, padding 0.45s var(--ease-brand), background-color 0.3s;
}
@media (width >= 48rem) { .service__summary { grid-template-columns: calc((100% - 11 * var(--gap)) / 12) minmax(0, 1fr) auto; } }
.service__title { font-size: clamp(1.3rem, 6.1vw, 6rem); line-height: 1; }
@media (width < 48rem) { .service__title { font-size: clamp(1.3rem, 8vw, 3rem); } }
.service__summary:hover { background: var(--color-carbon); color: var(--color-paper); padding-inline: clamp(0.5rem, 1.2vw, 1.25rem); }
.service__toggle { position: relative; width: clamp(1.5rem, 2.6vw, 2.75rem); aspect-ratio: 1; display: block; }
.service__toggle i { position: absolute; inset: 0; margin: auto; background: currentColor; transition: transform 0.45s var(--ease-brand), background-color 0.25s; }
.service__toggle i:first-child { width: 100%; height: 3px; }
.service__toggle i:last-child { width: 3px; height: 100%; }
.service[open] .service__toggle i { background: var(--color-signal); }
.service[open] .service__toggle i:last-child { transform: scaleY(0); }
.service::details-content { block-size: 0; overflow: clip; transition: block-size 0.55s var(--ease-brand), content-visibility 0.55s allow-discrete; }
.service[open]::details-content { block-size: auto; }
.service__item { position: relative; padding-left: 1.35rem; text-wrap: pretty; }
.service__item::before { content: ''; position: absolute; left: 0; top: 0.62em; width: 0.5rem; height: 0.5rem; background: var(--color-signal); }
</style>
