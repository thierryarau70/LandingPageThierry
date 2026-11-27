<script setup lang="ts">
// Página de case: mesma estrutura para qualquer projeto de app/data/projects.ts.
import type { Project } from '~/data/projects'
import { projectNumber, visibleProjects } from '~/data/projects'
import { waLink, waMessages } from '~/data/site'

const props = defineProps<{ project: Project }>()
const number = computed(() => projectNumber(props.project.slug))
const next = computed(() => {
  const i = visibleProjects.findIndex(p => p.slug === props.project.slug)
  return visibleProjects[(i + 1) % visibleProjects.length]!
})
const domain = computed(() => props.project.url?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, ''))
const sheet = computed(() => [
  { label: 'Projeto', value: props.project.name },
  { label: 'Categoria', value: props.project.category },
  { label: 'Disciplinas', value: props.project.pillars.join(' · ') },
  { label: 'Status', value: props.project.status },
  ...(props.project.url ? [{ label: 'Acesso', value: domain.value!, href: props.project.url }] : [])
])
// segunda captura de computador: produtos com painel fechado só têm a tela de entrada
const inner = computed(() => props.project.desktop[1])
const chapters = computed(() => [
  { title: 'Contexto', text: props.project.context },
  { title: 'Problema identificado', text: props.project.problem },
  { title: 'Solução proposta', text: props.project.solution }
])
</script>

<template>
  <article>
    <header class="theme-paper relative overflow-clip">
      <EditorialGrid />
      <div class="wrap relative pt-10 md:pt-16">
        <nav class="t-label flex flex-wrap items-center gap-3 text-muted" aria-label="Trilha">
          <NuxtLink to="/" class="link-line">Início</NuxtLink><span aria-hidden="true">/</span>
          <NuxtLink to="/projetos" class="link-line">Projetos</NuxtLink><span aria-hidden="true">/</span>
          <span aria-current="page" class="text-ink">{{ number }}</span>
        </nav>

        <div class="grid-12 mt-8 gap-y-10 pb-10 md:mt-12 md:pb-16">
          <div class="col-span-4 md:col-span-12 lg:col-span-8">
            <p class="t-label flex flex-wrap items-center gap-x-5 gap-y-2"><span>{{ project.category }}</span><StatusTag :status="project.status" /></p>
            <h1 class="t-display case-title mt-5">{{ project.name }}<DotEnd /></h1>
            <p class="mt-6 max-w-[52ch] text-lead text-pretty md:mt-8">{{ project.summary }}</p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <BrutalistButton v-if="project.url" :href="project.url" variant="solid" size="lg" arrow="up-right">Abrir o projeto</BrutalistButton>
              <BrutalistButton :href="waLink(waMessages.similar(project.name))" size="lg" arrow="up-right">Quero uma solução semelhante</BrutalistButton>
            </div>
          </div>
          <TitleBlock class="col-span-4 self-end md:col-span-8 lg:col-span-4" :rows="sheet" :caption="`Fol. ${number} / ${String(visibleProjects.length).padStart(2, '0')}`" />
        </div>
      </div>
    </header>

    <div class="theme-carbon">
      <div class="wrap py-(--gutter)">
        <figure class="case-cover" data-reveal="clip">
          <img :src="project.desktop[0]!.src" :alt="project.desktop[0]!.alt" :width="project.desktop[0]!.width" :height="project.desktop[0]!.height" fetchpriority="high" decoding="async">
          <figcaption class="t-label text-muted"><span>Fig. 01</span><span>{{ domain ?? project.name }} — 1440 × 900</span></figcaption>
        </figure>
      </div>
    </div>

    <section class="theme-paper py-(--section-y)" aria-label="Apresentação do projeto">
      <div class="wrap grid gap-y-12 md:gap-y-20">
        <div v-for="(c, i) in chapters" :key="c.title" class="grid-12 gap-y-4 border-t border-line pt-4" data-reveal>
          <h2 class="t-label col-span-4 flex items-center gap-3 md:col-span-4"><span class="inline-block size-2 bg-accent" aria-hidden="true" /><span class="tabular-nums">0{{ i + 1 }}</span><span class="text-muted" aria-hidden="true">/</span>{{ c.title }}</h2>
          <p class="t-heading col-span-4 text-title font-medium text-pretty md:col-span-8 lg:col-span-7">{{ c.text }}</p>
        </div>
      </div>
    </section>

    <section class="theme-carbon py-(--section-y)" aria-labelledby="case-features">
      <div class="wrap">
        <SectionIndex index="04" label="Funcionalidades" :meta="`${project.features.length} itens`" />
        <h2 id="case-features" class="t-display mt-8 text-huge md:mt-12">O que foi construído<DotEnd /></h2>
        <ol class="features mt-10 md:mt-16">
          <li v-for="(f, i) in project.features" :key="f" data-reveal><span class="t-label text-accent tabular-nums" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span><span class="t-heading text-subtitle font-medium">{{ f }}</span></li>
        </ol>

        <div class="grid-12 mt-16 items-start gap-y-(--gap) md:mt-24">
          <figure v-if="inner" class="shot col-span-4 md:col-span-8" data-reveal="clip">
            <img :src="inner.src" :alt="inner.alt" :width="inner.width" :height="inner.height" loading="lazy" decoding="async">
            <figcaption class="t-label text-muted"><span>Fig. 02</span><span>Seção interna — computador</span></figcaption>
          </figure>
          <div class="col-span-4 grid grid-cols-2 gap-(--gap)" :class="inner ? 'md:col-span-4' : 'md:col-span-6'">
            <figure v-for="(m, i) in project.mobile" :key="m.src" class="shot shot--mobile" data-reveal="clip">
              <img :src="m.src" :alt="m.alt" :width="m.width" :height="m.height" loading="lazy" decoding="async">
              <figcaption class="t-label text-muted"><span>Fig. 0{{ i + (inner ? 3 : 2) }}</span><span>390 × 844</span></figcaption>
            </figure>
          </div>
          <div v-if="!inner" class="col-span-4 self-end border-t border-line pt-4 md:col-span-5 md:col-start-8" data-reveal>
            <p class="t-label flex items-center gap-3"><span class="inline-block size-2 bg-accent" aria-hidden="true" />Painel com acesso restrito</p>
            <p class="t-heading mt-4 text-subtitle text-pretty">O painel é aberto só para os clientes do produto. As capturas mostram as telas públicas: a entrada e o primeiro acesso.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="theme-paper py-(--section-y)" aria-labelledby="case-process">
      <div class="wrap grid-12 gap-y-14">
        <div class="col-span-4 md:col-span-6" data-reveal>
          <SectionIndex index="05" label="Processo de desenvolvimento" />
          <h2 id="case-process" class="t-display mt-8 text-huge">Escopo da entrega<DotEnd /></h2>
          <ol class="mt-8 border-t border-line">
            <li v-for="(d, i) in project.delivery" :key="d" class="delivery"><span class="t-label text-muted tabular-nums" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span><span class="t-heading text-subtitle">{{ d }}</span></li>
          </ol>
        </div>
        <div class="col-span-4 md:col-span-5 md:col-start-8" data-reveal>
          <template v-if="project.stack.length">
            <SectionIndex index="06" label="Tecnologias" />
            <ul class="t-label mt-8 flex flex-wrap gap-2" aria-label="Tecnologias utilizadas">
              <li v-for="t in project.stack" :key="t" class="border border-line px-3 py-2.5">{{ t }}</li>
            </ul>
          </template>
          <div v-if="project.results?.length" class="mt-12">
            <SectionIndex index="07" label="Resultados" />
            <ul class="mt-6 grid gap-3"><li v-for="r in project.results" :key="r" class="t-heading text-subtitle">{{ r }}</li></ul>
          </div>
          <div class="mt-12 border border-line p-5 md:p-7">
            <p class="t-label flex items-center justify-between gap-4"><span>Status</span><StatusTag :status="project.status" /></p>
            <p class="mt-4 text-muted text-pretty">{{ project.url ? 'O projeto está publicado e pode ser acessado pelo link abaixo.' : 'Projeto sem endereço público.' }}</p>
            <a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer" class="link-line t-label mt-4">{{ domain }} <ArrowIcon dir="up-right" /><span class="sr-only"> (abre em nova aba)</span></a>
          </div>
        </div>
      </div>
    </section>

    <section class="theme-signal relative overflow-clip py-(--section-y)" aria-labelledby="case-cta">
      <div class="wrap grid-12 items-end gap-y-8">
        <h2 id="case-cta" class="t-display case-cta col-span-4 md:col-span-12 lg:col-span-8"><span class="line"><span>Quer algo</span></span><span class="line"><span>semelhante?</span></span></h2>
        <div class="col-span-4 grid gap-4 md:col-span-7 lg:col-span-4">
          <p class="text-lead font-medium text-pretty">Conte o que a sua empresa precisa. Eu respondo com o caminho, o prazo e o investimento.</p>
          <BrutalistButton :href="waLink(waMessages.similar(project.name))" variant="solid" size="lg" block arrow="up-right">Contratar uma solução semelhante</BrutalistButton>
          <BrutalistButton to="/#contato" variant="outline" size="lg" block>Enviar um briefing</BrutalistButton>
        </div>
      </div>
    </section>

    <NuxtLink :to="`/projetos/${next.slug}`" class="theme-carbon next group block">
      <div class="wrap grid-12 items-end gap-y-6 py-12 md:py-20">
        <div class="col-span-4 md:col-span-8">
          <p class="t-label text-muted">Próximo projeto — {{ projectNumber(next.slug) }}</p>
          <p class="t-display next__title mt-4">{{ next.name }}<span class="dot" aria-hidden="true" /></p>
        </div>
        <div class="col-span-4 md:col-span-4"><div class="next__thumb"><img :src="next.cover.src" alt="" :width="next.cover.width" :height="next.cover.height" loading="lazy" decoding="async"></div></div>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.case-title { font-size: clamp(2.4rem, 7.4vw, 8.5rem); line-height: 0.88; text-wrap: balance; }
.case-cta { font-size: clamp(2.05rem, 7.4vw, 8.25rem); line-height: 0.96; }
.case-cover img, .shot img { width: 100%; background: var(--color-graphite); }
.case-cover figcaption, .shot figcaption { display: flex; justify-content: space-between; gap: 1rem; padding-top: 0.7rem; }
.shot--mobile img { border: 1px solid var(--rule); }
.features { display: grid; border-top: 1px solid var(--rule); }
.features li { display: grid; grid-template-columns: 2.5rem 1fr; gap: var(--gap); align-items: baseline; padding-block: 1.1rem; border-bottom: 1px solid var(--rule); }
@media (width >= 48rem) {
  .features { grid-template-columns: 1fr 1fr; column-gap: var(--gap); }
}
.delivery { display: grid; grid-template-columns: 2.5rem 1fr; gap: var(--gap); align-items: baseline; padding-block: 1rem; border-bottom: 1px solid var(--rule); }
.next { border-top: 1px solid var(--rule); transition: background-color 0.4s; }
.next:hover { background: var(--color-graphite); }
.next__title { font-size: var(--text-huge); line-height: 0.9; }
.next__thumb { overflow: hidden; aspect-ratio: 1200 / 616; background: var(--color-graphite); }
.next__thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; filter: grayscale(1) contrast(1.1); transition: filter 0.5s, transform 0.9s var(--ease-brand); }
.next:hover .next__thumb img { filter: none; transform: scale(1.03); }
</style>
