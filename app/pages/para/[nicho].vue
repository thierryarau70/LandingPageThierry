<script setup lang="ts">
import { siteOffer } from '~/data/offer'
import { niches } from '~/data/niches'
import { featuredProjects, findProject, projectNumber } from '~/data/projects'
import { faqSchema } from '~/data/seo'
import { waLink } from '~/data/site'

const route = useRoute()
const niche = niches.find(n => n.slug === route.params.nicho)
if (!niche) throw createError({ statusCode: 404, statusMessage: 'Página não encontrada', fatal: true })

const waSuffix = ` (vim pela página para ${niche.label})`
const contact = waLink(`Olá, Thierry! Vi a página para ${niche.label} e quero um orçamento.`)
// Projetos mais próximos do negócio do visitante; sem indicação, os três primeiros em destaque
const related = (niche.projects.map(findProject).filter(p => !!p).length ? niche.projects.map(findProject).filter(p => !!p) : featuredProjects).slice(0, 3)
// Título com o trecho de destaque marcado
const [before, after] = niche.title.split(niche.highlight)

usePageSeo({ title: niche.seoTitle, description: niche.text, schema: [faqSchema(siteOffer.questions)] })
</script>

<template>
  <main id="conteudo">
    <section class="theme-paper relative overflow-clip" aria-labelledby="nicho-title">
      <EditorialGrid />
      <div class="wrap relative">
        <div class="t-label flex items-center justify-between gap-4 border-b border-line py-3">
          <p class="flex items-center gap-3"><span class="inline-block size-2 bg-accent" aria-hidden="true" />Sites para {{ niche.label }}</p>
          <p class="text-muted max-xs:hidden">Boa Vista — RR / Brasil</p>
        </div>
        <div class="grid-12 gap-y-8 py-10 md:py-16">
          <h1 id="nicho-title" class="t-display niche-title col-span-4 md:col-span-11">{{ before }}<mark>{{ niche.highlight }}</mark>{{ after?.replace(/\.$/, '') }}<DotEnd /></h1>
          <p class="col-span-4 text-lead md:col-span-6 lg:col-span-5 text-pretty">{{ niche.text }}</p>
          <div class="col-span-4 flex flex-col gap-3 sm:flex-row md:col-span-6 md:flex-col lg:col-start-7 lg:flex-row lg:justify-end">
            <BrutalistButton :href="contact" size="lg" arrow="up-right">Pedir orçamento no WhatsApp</BrutalistButton>
            <BrutalistButton href="#projetos" size="lg" variant="outline" arrow="down">Ver projetos</BrutalistButton>
          </div>
        </div>
      </div>
    </section>

    <section class="theme-carbon py-(--section-y)" aria-labelledby="pontos-title">
      <div class="wrap">
        <SectionIndex index="01" label="Por que funciona" :meta="`${niche.points.length} pontos`" />
        <h2 id="pontos-title" class="t-display mt-8 max-w-[18ch] text-huge md:mt-12">{{ niche.pointsTitle }}<DotEnd /></h2>
        <ol class="mt-10 grid border-t border-line md:mt-16 md:grid-cols-2 md:gap-x-(--gap) lg:grid-cols-3">
          <li v-for="(p, i) in niche.points" :key="p.title" class="grid grid-cols-[2.5rem_1fr] items-baseline gap-(--gap) border-b border-line py-5" data-reveal>
            <span class="t-label text-accent tabular-nums" aria-hidden="true">0{{ i + 1 }}</span>
            <div><h3 class="t-heading text-subtitle">{{ p.title }}</h3><p class="mt-2 text-muted text-pretty">{{ p.text }}</p></div>
          </li>
        </ol>
      </div>
    </section>

    <section id="projetos" class="theme-carbon border-t border-line py-(--section-y)" aria-labelledby="nicho-projetos">
      <div class="wrap">
        <SectionIndex index="02" label="Projetos" meta="No ar" />
        <h2 id="nicho-projetos" class="t-display mt-8 text-huge md:mt-12">Veja funcionando<DotEnd /></h2>
        <div class="mt-10 grid gap-x-(--gap) gap-y-14 md:mt-16 md:grid-cols-3">
          <ProjectShowcase v-for="p in related" :key="p.slug" :project="p" :number="projectNumber(p.slug)" />
        </div>
        <NuxtLink to="/projetos" class="link-line t-label mt-12">Ver todos os projetos <ArrowIcon dir="right" /></NuxtLink>
      </div>
    </section>

    <OfferSection :wa-suffix="waSuffix" />
    <ProcessSection index="04" />
    <FaqSection :items="siteOffer.questions" index="05" />
    <ContactSection index="06" />
  </main>
</template>

<style scoped>
.niche-title { font-size: clamp(1.9rem, 6vw, 6.75rem); line-height: 1.04; text-wrap: balance; }
.niche-title mark { background: var(--color-signal); color: var(--color-carbon); padding: 0 0.08em; margin: 0 -0.08em; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
</style>
