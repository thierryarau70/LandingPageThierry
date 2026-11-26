<script setup lang="ts">
import { site } from '~/data/site'

// Largura de cada palavra (com o ponto), em em: usada para ajustar a linha à largura da tela no celular
const fit = [4.36, 6.22, 7.9]

const meta = [
  `${site.location.city} — ${site.location.state} / ${site.location.country}`,
  'Atendimento em todo o Brasil',
  'Software Engineering / Digital Experience'
]
</script>

<template>
  <section id="topo" class="theme-paper hero relative overflow-clip" aria-labelledby="hero-title">
    <EditorialGrid />
    <div class="wrap relative z-10">
      <div class="t-label flex items-center justify-between gap-4 border-b border-line py-3">
        <p class="flex items-center gap-3"><span class="inline-block size-2 bg-accent" aria-hidden="true" />Estúdio independente de engenharia digital</p>
        <p class="text-muted max-md:hidden" aria-hidden="true">{{ site.location.coords.label }}</p>
        <p class="text-muted max-xs:hidden" aria-hidden="true">Fol. 01</p>
      </div>

      <div class="hero-stage">
        <h1 id="hero-title" class="t-display hero-title">
          <span class="sr-only">{{ site.brand }}, de {{ site.name }} — sites, sistemas personalizados e inteligência artificial: </span>
          <span v-for="(word, i) in ['Design', 'Software', 'Inteligência']" :key="word" class="line" :style="{ '--fit': fit[i] }"><span>{{ word }}<span class="dot hero-dot" :style="{ '--i': i }" aria-hidden="true" /><span class="sr-only">. </span></span></span>
        </h1>
        <HeroComposition class="hero-art" />
      </div>

      <div class="grid-12 gap-y-7 border-t border-line py-6 md:py-8">
        <p class="col-span-4 text-lead md:col-span-6 lg:col-span-5 text-pretty">
          Desenvolvo sites, sistemas personalizados e soluções com inteligência artificial para empresas que buscam autoridade digital, eficiência operacional e crescimento.
        </p>
        <div class="col-span-4 flex flex-col gap-3 sm:flex-row md:col-span-6 md:flex-col lg:col-span-6 lg:col-start-7 lg:flex-row lg:items-start lg:justify-end">
          <BrutalistButton to="/#contato" size="lg" arrow="up-right">Iniciar um projeto</BrutalistButton>
          <BrutalistButton to="/#projetos" size="lg" variant="outline" arrow="down">Explorar projetos</BrutalistButton>
        </div>
      </div>

      <ul class="t-label grid border-t border-line text-muted md:grid-cols-3">
        <li v-for="(item, i) in meta" :key="item" class="flex items-center gap-3 py-3 max-md:border-b max-md:border-hairline max-md:last:border-b-0 md:py-4" :class="{ 'md:border-l md:border-hairline md:pl-(--gap)': i > 0 }">
          <span class="tabular-nums text-ink" aria-hidden="true">0{{ i + 1 }}</span>{{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero { --mega: clamp(2rem, 10.6vw, 11.9rem); }
.hero-stage { position: relative; padding-block: clamp(1.75rem, 3.4vw, 4rem) clamp(1.25rem, 2.2vw, 2.5rem); }
.hero-title { font-size: var(--mega); line-height: 0.95; }
.hero-dot { animation: stamp 0.5s var(--ease-brand) both; animation-delay: calc(0.35s + var(--i) * 0.14s); transform-origin: 0 100%; }
.hero-art { margin-top: clamp(1.5rem, 5vw, 2.5rem); }
@media (width < 64rem) {
  /* Composição de cartaz: cada linha do título é ajustada à largura da tela */
  .hero-title .line { font-size: calc((100vw - 2 * var(--gutter)) / var(--fit)); line-height: 0.93; }
}
@media (width >= 64rem) {
  /* A composição ocupa o espaço à direita das duas primeiras linhas (mais curtas) do título */
  .hero-art { position: absolute; right: 0; margin: 0; height: calc(var(--mega) * 1.52); top: calc(clamp(1.75rem, 3.4vw, 4rem) + var(--mega) * 0.13); width: auto; }
}
</style>
