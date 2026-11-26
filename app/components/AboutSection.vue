<script setup lang="ts">
import { site, waLink, waMessages } from '~/data/site'

const specialties = [
  'Frontend com Nuxt, Vue e TypeScript',
  'Backend, APIs e bancos de dados',
  'Sistemas sob medida e plataformas SaaS',
  'Automações e integrações',
  'Inteligência artificial aplicada',
  'SEO técnico e performance'
]

const sheet = [
  { label: 'Responsável', value: site.name },
  { label: 'Atuação', value: 'Desenvolvimento de software e IA' },
  { label: 'Base', value: `${site.location.city} — ${site.location.state}, ${site.location.country}` },
  { label: 'Atendimento', value: 'Remoto, em todo o Brasil' },
  { label: 'CNPJ', value: site.cnpj }
]
</script>

<template>
  <section id="sobre" class="theme-carbon relative py-(--section-y)" aria-labelledby="sobre-title">
    <div class="wrap">
      <SectionIndex index="04" label="Sobre" :meta="site.location.coords.label" />
      <MonumentTitle id="sobre-title" class="mt-8 text-giant md:mt-12" :lines="['Quem está', 'por trás do código']" />

      <div class="grid-12 mt-12 gap-y-12 md:mt-20">
        <div class="col-span-4 md:col-span-5 lg:col-span-4" data-reveal>
          <figure v-if="site.photo" class="portrait">
            <img :src="site.photo" :alt="`Retrato de ${site.name}`" width="960" height="1200" loading="lazy" decoding="async">
            <figcaption class="t-label">{{ site.name }} — {{ site.location.city }}, {{ site.location.state }}</figcaption>
          </figure>
          <div v-else class="plate" aria-hidden="true">
            <div class="plate__hatch tex-hatch" />
            <BrandMark variant="symbol" class="plate__mark" />
            <p class="t-label plate__tag">TA — 01</p>
          </div>
          <TitleBlock class="mt-(--gap)" :rows="sheet" />
        </div>

        <div class="col-span-4 md:col-span-6 md:col-start-7 lg:col-span-7 lg:col-start-6">
          <div class="grid gap-5" data-reveal>
            <p class="t-heading text-title text-balance">Sou Thierry Araújo, desenvolvedor de software em Boa Vista, Roraima. Quem conversa com você é quem projeta e programa.</p>
            <p class="t-prose text-muted">
              Trabalho de ponta a ponta: frontend, backend, sistemas personalizados, automações e inteligência artificial.
              Tenho {{ site.experienceYears }} anos de experiência em desenvolvimento, com atuação em sites, sistemas de gestão e plataformas de ensino a distância.
            </p>
            <p class="t-prose text-muted">
              Hoje projeto e construo sites, aplicativos por assinatura, automações e soluções com IA para negócios de áreas como saúde, advocacia, varejo, agropecuária e engenharia.
            </p>
          </div>

          <div class="mt-10 border-t border-line pt-5 md:mt-14" data-reveal>
            <h3 class="t-label text-muted">Áreas de especialidade</h3>
            <ul class="mt-4 grid gap-x-(--gap) sm:grid-cols-2">
              <li v-for="(item, i) in specialties" :key="item" class="spec"><span class="t-label text-accent tabular-nums" aria-hidden="true">0{{ i + 1 }}</span>{{ item }}</li>
            </ul>
          </div>

          <blockquote class="mt-10 border-l-4 border-accent pl-5 md:mt-14 md:pl-8" data-reveal>
            <p class="t-label text-muted">Filosofia de desenvolvimento</p>
            <p class="t-heading mt-3 text-title text-balance">Software bom continua fazendo sentido depois da entrega. Por isso começo pelo problema, desenho antes de programar e organizo o código para o projeto poder crescer.</p>
          </blockquote>

          <p class="t-label mt-10 flex flex-wrap gap-x-7 gap-y-3 md:mt-14" data-reveal>
            <a v-for="s in site.social" :key="s.id" :href="s.url" target="_blank" rel="noopener noreferrer me" class="link-line">{{ s.label }} <ArrowIcon dir="up-right" /><span class="sr-only"> (abre em nova aba)</span></a>
            <a :href="waLink(waMessages.talk)" target="_blank" rel="noopener noreferrer" class="link-line">WhatsApp <ArrowIcon dir="up-right" /><span class="sr-only"> (abre em nova aba)</span></a>
            <a :href="`mailto:${site.contact.email}`" class="link-line">E-mail <ArrowIcon dir="up-right" /></a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portrait { position: relative; background: var(--color-graphite); }
.portrait img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; filter: grayscale(1) contrast(1.12); }
.portrait figcaption { position: absolute; left: 0; bottom: 0; padding: 0.6em 0.8em; background: var(--color-signal); color: var(--color-carbon); }
.plate { position: relative; aspect-ratio: 4 / 3.4; background: var(--color-signal); color: var(--color-carbon); overflow: hidden; --dot: var(--color-paper); }
.plate__hatch { position: absolute; inset: 0 0 0 55%; opacity: 0.22; }
.plate__mark { position: absolute; left: 9%; bottom: 9%; height: 70%; width: auto; }
.plate__tag { position: absolute; right: 0; top: 0; padding: 0.6em 0.8em; background: var(--color-carbon); color: var(--color-paper); }
.spec { display: grid; grid-template-columns: 2rem 1fr; align-items: baseline; gap: 0.5rem; padding-block: 0.8rem; border-bottom: 1px solid var(--hair); font-family: var(--font-heading); font-weight: 500; }
</style>
