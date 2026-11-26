<script setup lang="ts">
import type { Pillar } from '~/data/projects'
import { projectNumber, visibleProjects } from '~/data/projects'
import { breadcrumbSchema } from '~/data/seo'

const { base } = useSiteUrl()
usePageSeo({
  title: 'Projetos',
  description: 'Sites, aplicativos por assinatura, catálogos e plataformas com inteligência artificial desenvolvidos por Thierry Araújo: Prumo, Agenda Emi, Protocolo IATF, Solek & Morais Advogados e outros.',
  schema: [breadcrumbSchema(base, [{ name: 'Início', path: '/' }, { name: 'Projetos', path: '/projetos' }])]
})

const filters: ('Todos' | Pillar)[] = ['Todos', 'Design', 'Software', 'Inteligência', 'Automação']
const filter = ref<'Todos' | Pillar>('Todos')
const count = (f: 'Todos' | Pillar) => (f === 'Todos' ? visibleProjects.length : visibleProjects.filter(p => p.pillars.includes(f)).length)
const list = computed(() => (filter.value === 'Todos' ? visibleProjects : visibleProjects.filter(p => p.pillars.includes(filter.value as Pillar))))

// Ritmo assimétrico: 7/5, 5/7, e a cada cinco projetos um em largura total
const slot = (i: number) => {
  const k = i % 5
  if (k === 4) return { span: 'md:col-span-12', layout: 'split' as const, shot: 'desktop' as const }
  return { span: k === 0 || k === 3 ? 'md:col-span-7' : 'md:col-span-5', layout: 'stack' as const, shot: 'cover' as const }
}
</script>

<template>
  <main id="conteudo" class="theme-carbon">
    <section class="wrap pt-10 pb-(--section-y) md:pt-16" aria-labelledby="projetos-h1">
      <nav class="t-label flex items-center gap-3 text-muted" aria-label="Trilha">
        <NuxtLink to="/" class="link-line">Início</NuxtLink><span aria-hidden="true">/</span><span aria-current="page" class="text-ink">Projetos</span>
      </nav>
      <div class="grid-12 mt-8 items-end gap-y-6 md:mt-12">
        <h1 id="projetos-h1" class="t-display col-span-4 text-giant md:col-span-12 lg:col-span-9"><span class="line"><span>Todos os</span></span><span class="line"><span>projetos<DotEnd /></span></span></h1>
        <p class="col-span-4 text-body text-muted md:col-span-6 lg:col-span-3 lg:col-start-10 lg:pb-3 xl:text-lead text-pretty">Sites, aplicativos e plataformas no ar. Abra cada case para ver o contexto, a solução e as funcionalidades.</p>
      </div>

      <div class="t-label mt-10 flex flex-wrap items-stretch border-y border-line md:mt-16" role="group" aria-label="Filtrar por disciplina">
        <button v-for="f in filters" :key="f" type="button" class="filter" :aria-pressed="filter === f" @click="filter = f">
          {{ f }} <span class="filter__count tabular-nums">{{ String(count(f)).padStart(2, '0') }}</span>
        </button>
      </div>
      <p class="sr-only" role="status" aria-live="polite">{{ list.length }} projetos exibidos</p>

      <div class="grid-12 mt-12 gap-y-16 md:mt-16 md:gap-y-24">
        <ProjectShowcase v-for="(p, i) in list" :key="p.slug" class="col-span-4" :class="slot(i).span" :project="p" :number="projectNumber(p.slug)" :layout="slot(i).layout" :shot="slot(i).shot" heading="h2" :eager="i < 2" />
      </div>
    </section>
    <ContactSection index="02" />
  </main>
</template>

<style scoped>
.filter { display: flex; align-items: center; gap: 0.75em; padding: 1rem clamp(0.85rem, 1.6vw, 1.5rem); border-right: 1px solid var(--rule); transition: background-color 0.25s, color 0.25s; cursor: pointer; }
.filter__count { opacity: 0.6; }
.filter[aria-pressed="true"] .filter__count { opacity: 1; }
.filter:first-child { border-left: 1px solid var(--rule); }
.filter:hover { background: var(--color-graphite); }
.filter[aria-pressed="true"] { background: var(--color-signal); color: var(--color-carbon); }
@media (width < 40rem) { .filter { flex: 1 1 33%; justify-content: space-between; border-bottom: 1px solid var(--rule); margin-bottom: -1px; } }
</style>
