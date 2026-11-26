<script setup lang="ts">
const statements = [
  ['Um website', 'precisa comunicar confiança.'],
  ['Um sistema', 'precisa resolver problemas.'],
  ['Uma automação', 'precisa reduzir trabalho.']
]
</script>

<template>
  <section class="theme-signal manifesto relative overflow-clip py-(--section-y)" aria-labelledby="manifesto-title">
    <div class="manifesto__hatch tex-hatch" aria-hidden="true" />
    <div class="wrap relative">
      <div class="t-label flex items-center justify-between gap-4 border-t border-line pt-3">
        <p class="flex items-center gap-3"><span class="inline-block size-2 bg-ink" aria-hidden="true" />Manifesto</p>
        <p class="text-muted">Posicionamento</p>
      </div>

      <MonumentTitle id="manifesto-title" class="manifesto__title mt-8 md:mt-12" :lines="['Tecnologia não é', 'decoração', 'É estrutura']" :dots="[1, 2]" />

      <ol class="mt-12 grid border-t border-line md:mt-20 md:grid-cols-3">
        <li v-for="([a, b], i) in statements" :key="a" class="manifesto__item" data-reveal>
          <span class="t-label tabular-nums">0{{ i + 1 }}</span>
          <p class="t-heading text-title">{{ a }}<br>{{ b }}</p>
        </li>
      </ol>

      <div class="grid-12 border-t border-line pt-8 md:pt-12">
        <p class="col-span-4 text-lead md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7 text-pretty font-medium" data-reveal>
          Minha atuação conecta design, engenharia e inteligência artificial para construir soluções que fazem sentido para o negócio.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.manifesto__title { font-size: clamp(1.6rem, 8.5vw, 10rem); line-height: 1; }
@media (width < 48rem) { .manifesto__title { font-size: 11.4vw; } }
.manifesto__hatch { position: absolute; top: 0; right: 0; width: min(34vw, 30rem); height: 100%; color: var(--color-carbon); opacity: 0.16; mask-image: linear-gradient(to left, #000, transparent); }
.manifesto__item { display: grid; gap: 1.25rem; align-content: start; padding-block: 1.5rem 2rem; border-bottom: 1px solid var(--rule); }
@media (width >= 48rem) {
  .manifesto__item { padding: 1.75rem var(--gap) 3rem 0; border-bottom: 0; }
  .manifesto__item + .manifesto__item { border-left: 1px solid var(--rule); padding-left: var(--gap); }
}
</style>
