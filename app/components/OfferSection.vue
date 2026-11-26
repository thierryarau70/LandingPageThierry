<script setup lang="ts">
// Pacote de entrada para sites e landing pages (páginas de anúncio /para/<nicho>).
// Os números vêm de app/data/offer.ts.
import { siteOffer } from '~/data/offer'
import { waLink } from '~/data/site'

const props = withDefaults(defineProps<{ waSuffix?: string }>(), { waSuffix: '' })
const contact = computed(() => waLink(`Olá, Thierry! Quero um site de até 5 páginas por R$ ${siteOffer.price}. Podemos conversar?${props.waSuffix}`))
const bigger = computed(() => waLink(`Olá, Thierry! Quero consultar o valor de um projeto maior.${props.waSuffix}`))
</script>

<template>
  <section id="pacote" class="theme-paper relative py-(--section-y)" aria-labelledby="pacote-title">
    <div class="wrap">
      <SectionIndex index="03" label="Pacote de entrada" meta="Sites e landing pages" />
      <div class="grid-12 mt-8 gap-y-10 md:mt-12">
        <div class="col-span-4 md:col-span-6 lg:col-span-5">
          <MonumentTitle id="pacote-title" class="text-huge" :lines="['Do texto', 'ao domínio']" />
          <div class="theme-carbon mt-8 p-6 md:p-8" data-reveal>
            <p class="t-label text-muted">Site de até 5 páginas ou uma landing page</p>
            <p class="t-display mt-4 text-giant"><span class="align-top text-title">R$</span> {{ siteOffer.price }}</p>
            <ul class="t-label mt-6 grid gap-2.5 border-t border-line pt-5">
              <li class="flex gap-3"><span class="text-accent" aria-hidden="true">+</span>Primeira versão em {{ siteOffer.firstVersionHours }} horas</li>
              <li class="flex gap-3"><span class="text-accent" aria-hidden="true">+</span>Publicação em até {{ siteOffer.deliveryDays }} dias</li>
              <li class="flex gap-3"><span class="text-accent" aria-hidden="true">+</span>Domínio .com.br incluso, no seu nome</li>
            </ul>
            <BrutalistButton class="mt-7" :href="contact" size="lg" block arrow="up-right">Quero o pacote de entrada</BrutalistButton>
            <p class="mt-4 text-small text-muted">Prazos após o alinhamento e o recebimento das informações, com ajustes e aprovação no período combinado.</p>
          </div>
        </div>

        <div class="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7">
          <h3 class="t-label text-muted">O que está incluso</h3>
          <ul class="mt-4 border-t border-line">
            <li v-for="(item, i) in siteOffer.includes" :key="item.title" class="grid grid-cols-[2.5rem_1fr] items-baseline gap-(--gap) border-b border-line py-4" data-reveal>
              <span class="t-label text-accent-ink tabular-nums" aria-hidden="true">0{{ i + 1 }}</span>
              <div><p class="t-heading text-subtitle">{{ item.title }}</p><p class="mt-1.5 text-muted text-pretty">{{ item.text }}</p></div>
            </li>
          </ul>
          <div class="mt-8 grid gap-(--gap) sm:grid-cols-2" data-reveal>
            <div class="border border-line p-5">
              <p class="t-heading text-subtitle">Loja virtual, login, sistema ou 10+ páginas</p>
              <p class="t-display mt-3 text-title">+ R$ {{ siteOffer.extraPrice }}</p>
              <p class="mt-2 text-small text-muted">Adicional ao pacote base. Prazo alinhado na proposta.</p>
            </div>
            <div class="border border-line p-5">
              <p class="t-heading text-subtitle">SaaS, integrações, IA e projetos maiores</p>
              <a :href="bigger" target="_blank" rel="noopener noreferrer" class="link-line t-label mt-3">Consultar valor <ArrowIcon dir="up-right" /><span class="sr-only"> (abre em nova aba)</span></a>
              <p class="mt-2 text-small text-muted">Uma proposta de acordo com o escopo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
