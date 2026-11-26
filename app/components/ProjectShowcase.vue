<script setup lang="ts">
// Um projeto em destaque. `layout` muda a composição; `shot` escolhe a imagem e a proporção.
import type { Project } from '~/data/projects'

const props = withDefaults(defineProps<{
  project: Project
  number: string
  layout?: 'full' | 'stack' | 'split'
  shot?: 'cover' | 'desktop' | 'mobile'
  heading?: 'h2' | 'h3'
  eager?: boolean
}>(), { layout: 'stack', shot: 'cover', heading: 'h3', eager: false })

const image = computed(() => props.shot === 'mobile' ? props.project.mobile[0]! : props.shot === 'desktop' ? props.project.desktop[0]! : props.project.cover)
const video = computed(() => (props.shot === 'cover' ? props.project.video : undefined))
const to = computed(() => `/projetos/${props.project.slug}`)
const domain = computed(() => props.project.url?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, ''))
</script>

<template>
  <article class="showcase" :class="`showcase--${layout}`" data-reveal>
    <header class="showcase__head">
      <p class="t-display showcase__num" aria-hidden="true">{{ number }}</p>
      <div class="t-label showcase__meta">
        <p class="text-muted">{{ project.category }}</p>
        <StatusTag :status="project.status" />
      </div>
    </header>

    <NuxtLink :to="to" class="showcase__media" :class="`is-${shot}`" :aria-label="`Ver o case ${project.name}`">
      <ProjectMedia :image="image" :video="video" :eager="eager" />
      <span class="t-label showcase__cue" aria-hidden="true">Ver case <ArrowIcon dir="right" /></span>
    </NuxtLink>

    <div class="showcase__body">
      <component :is="heading" class="t-display showcase__title"><NuxtLink :to="to">{{ project.name }}</NuxtLink></component>
      <div class="showcase__text">
        <p class="text-muted text-pretty">{{ project.summary }}</p>
        <ul class="t-label mt-4 flex flex-wrap gap-x-4 gap-y-1 text-muted" aria-label="Disciplinas">
          <li v-for="p in project.pillars" :key="p" class="flex items-center gap-2"><span class="text-accent" aria-hidden="true">+</span>{{ p }}</li>
        </ul>
        <p class="t-label mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <NuxtLink :to="to" class="link-line">Ver case <ArrowIcon dir="right" /></NuxtLink>
          <a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer" class="link-line text-muted">{{ domain }} <ArrowIcon dir="up-right" /><span class="sr-only"> (abre em nova aba)</span></a>
        </p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.showcase { display: grid; gap: clamp(0.9rem, 1.4vw, 1.5rem); align-content: start; min-width: 0; }
.showcase__head { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; border-top: 1px solid var(--rule); padding-top: 0.75rem; }
.showcase__num { font-size: clamp(3rem, 6.4vw, 7rem); line-height: 0.78; transition: color 0.3s; }
.showcase:hover .showcase__num, .showcase:focus-within .showcase__num { color: var(--color-signal); }
.showcase__meta { display: grid; gap: 0.35rem; justify-items: end; text-align: right; }
.showcase__media { position: relative; display: block; overflow: hidden; background: var(--color-graphite); aspect-ratio: 1200 / 616; }
.showcase__media.is-desktop { aspect-ratio: 16 / 10; }
.showcase__media.is-mobile { aspect-ratio: 4 / 5; }
.showcase__media :deep(.media) { transition: transform 1.1s var(--ease-brand); }
.showcase__media:hover :deep(.media), .showcase__media:focus-visible :deep(.media) { transform: scale(1.025); }
.showcase__cue {
  position: absolute; right: 0; bottom: 0; display: flex; align-items: center; gap: 0.7em; padding: 0.85em 1.1em;
  background: var(--color-signal); color: var(--color-carbon);
  transform: translate3d(0, 101%, 0); transition: transform 0.4s var(--ease-brand);
}
.showcase__media:hover .showcase__cue, .showcase__media:focus-visible .showcase__cue { transform: none; }
.showcase__body { display: grid; gap: 0.9rem; }
.showcase__title { font-size: clamp(1.6rem, 2.9vw, 3.25rem); line-height: 0.92; letter-spacing: -0.04em; text-wrap: balance; }
@media (width < 48rem) { .showcase__title { font-size: clamp(1.75rem, 8.4vw, 3rem); } }
/* Sem hover (toque): a chamada "Ver case" fica sempre visível */
@media (hover: none) { .showcase__cue { transform: none; } }
.showcase__title a { background: linear-gradient(var(--color-signal), var(--color-signal)) 0 100% / 0 0.08em no-repeat; transition: background-size 0.45s var(--ease-brand); }
.showcase__title a:hover { background-size: 100% 0.08em; }

@media (width >= 64rem) {
  .showcase--full .showcase__body { grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--gap); align-items: start; }
  .showcase--full .showcase__title { grid-column: 1 / span 7; font-size: clamp(2.5rem, 5.4vw, 6rem); }
  .showcase--full .showcase__text { grid-column: 9 / span 4; }
  .showcase--split { grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--gap); grid-template-rows: auto 1fr; }
  .showcase--split .showcase__head { grid-column: 1 / span 4; grid-row: 1; }
  .showcase--split .showcase__body { grid-column: 1 / span 4; grid-row: 2; align-content: end; }
  .showcase--split .showcase__media { grid-column: 5 / span 8; grid-row: 1 / span 2; }
}
</style>
