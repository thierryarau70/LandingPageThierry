<template>
  <section id="inicio" class="hero">
    <div class="hero-text">
      <span class="pill">Thierry Araújo · Desenvolvedor web</span>
      <h1>{{ title }}</h1>
      <p>{{ text }}</p>
      <div class="cta">
        <a class="btn" :href="waLink(waText)" target="_blank" rel="noopener">Criar minha landing page</a>
        <a class="btn btn-ghost" href="#portfolio">Ver projetos</a>
      </div>
      <p class="hero-offer">Landing page por <strong>R$ 600</strong> <span>Outros projetos sob orçamento</span></p>
    </div>
    <div class="hero-shots" aria-hidden="true">
      <img v-for="(s, i) in shots" :key="s" :class="`s${i + 1}`" :src="s" alt="" width="1200" height="616">
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  highlight?: string
  text?: string
  waText?: string
  shots?: string[]
}>(), {
  title: 'Seu próximo cliente começa com um bom site.',
  highlight: 'caminho direto',
  text: 'Design e desenvolvimento para colocar sua ideia no ar. Landing pages, sites e sistemas feitos por mim, com atenção a cada detalhe.',
  waText: 'Olá Thierry! Vim pelo site e quero um orçamento de landing page.',
  shots: () => ['/portfolio/emile.webp', '/portfolio/isoladas.webp']
})

</script>
