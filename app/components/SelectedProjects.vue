<script setup lang="ts">
import { featuredProjects, projectNumber, visibleProjects } from '~/data/projects'

// Ritmo editorial: largura total, par assimétrico 7/5, bloco dividido, par assimétrico 5/7.
const [p1, p2, p3, p4, p5, p6] = featuredProjects
</script>

<template>
  <section id="projetos" class="theme-carbon relative py-(--section-y)" aria-labelledby="projetos-title">
    <div class="wrap">
      <SectionIndex index="02" label="Projetos" :meta="`${visibleProjects.length} projetos no ar`" />
      <div class="grid-12 mt-8 items-end gap-y-6 md:mt-12">
        <MonumentTitle id="projetos-title" class="col-span-4 text-giant md:col-span-12 lg:col-span-9" :lines="['Trabalhos', 'selecionados']" />
        <p class="col-span-4 text-body text-muted md:col-span-6 lg:col-span-3 lg:col-start-10 lg:pb-3 xl:text-lead text-pretty">
          Projetos desenvolvidos para resolver necessidades reais por meio de design, engenharia de software e inteligência artificial.
        </p>
      </div>

      <div class="mt-12 grid gap-y-16 md:mt-20 md:gap-y-24">
        <ProjectShowcase v-if="p1" :project="p1" :number="projectNumber(p1.slug)" layout="full" />

        <div class="grid-12 gap-y-16">
          <ProjectShowcase v-if="p2" class="col-span-4 md:col-span-7" :project="p2" :number="projectNumber(p2.slug)" shot="desktop" />
          <ProjectShowcase v-if="p3" class="col-span-4 md:col-span-5" :project="p3" :number="projectNumber(p3.slug)" shot="mobile" />
        </div>

        <ProjectShowcase v-if="p4" :project="p4" :number="projectNumber(p4.slug)" layout="split" shot="desktop" />

        <div class="grid-12 gap-y-16">
          <ProjectShowcase v-if="p5" class="col-span-4 md:col-span-5" :project="p5" :number="projectNumber(p5.slug)" shot="mobile" />
          <ProjectShowcase v-if="p6" class="col-span-4 md:col-span-7" :project="p6" :number="projectNumber(p6.slug)" shot="desktop" />
        </div>
      </div>

      <NuxtLink to="/projetos" class="all-link group mt-16 md:mt-24" data-reveal>
        <span class="t-label text-muted">Índice completo</span>
        <span class="t-display all-link__text">Ver todos os projetos<span class="dot" aria-hidden="true" /></span>
        <span class="all-link__arrow" aria-hidden="true"><ArrowIcon dir="right" /></span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.all-link { display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 0.5rem 1.5rem; border-block: 1px solid var(--rule); padding-block: clamp(1.25rem, 2.4vw, 2.5rem); transition: background-color 0.35s, color 0.35s, padding 0.45s var(--ease-brand); }
.all-link > .t-label { grid-column: 1 / -1; }
.all-link__text { font-size: var(--text-huge); line-height: 0.9; }
.all-link__arrow { font-size: clamp(2rem, 5vw, 5rem); line-height: 0; transition: transform 0.45s var(--ease-brand); }
.all-link:hover { background: var(--color-signal); color: var(--color-carbon); padding-inline: clamp(0.75rem, 1.6vw, 1.75rem); --dot: var(--color-carbon); }
.all-link:hover .t-label { color: var(--color-carbon); }
.all-link:hover .all-link__arrow { transform: translate3d(0.35rem, 0, 0); }
</style>
