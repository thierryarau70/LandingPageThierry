<template>
  <section id="inicio" class="hero">
    <div class="hero-text">
      <span class="pill">💻 {{ EXPERIENCE_YEARS }} anos de experiência · atendimento direto</span>
      <h1>{{ before }}<em>{{ highlight }}</em>{{ after }}</h1>
      <p>{{ text }}</p>
      <div class="cta">
        <a class="btn" :href="waLink(waText)" target="_blank" rel="noopener">Pedir orçamento no WhatsApp</a>
        <a class="btn btn-ghost" href="#portfolio">Ver projetos</a>
      </div>
    </div>
    <div class="hero-shots" aria-hidden="true">
      <img v-for="(s, i) in shots" :key="s" :class="`s${i + 1}`" :src="s" alt="" width="1200" height="616">
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  highlight?: string
  text?: string
  waText?: string
  shots?: string[]
}>(), {
  title: 'Seu negócio com um site profissional e um caminho direto para novos contatos.',
  highlight: 'caminho direto',
  text: 'Crio landing pages para clínicas, cursos e prestadores de serviços, com design personalizado, versão para celular e contato pelo WhatsApp. Você fala diretamente comigo, da criação à publicação.',
  waText: 'Olá Thierry! Vim pelo site e quero um orçamento de landing page.',
  shots: () => ['/portfolio/emile.webp', '/portfolio/isoladas.webp']
})

const idx = computed(() => props.title.indexOf(props.highlight))
const before = computed(() => idx.value < 0 ? props.title : props.title.slice(0, idx.value))
const after = computed(() => idx.value < 0 ? '' : props.title.slice(idx.value + props.highlight.length))
const highlight = computed(() => idx.value < 0 ? '' : props.highlight)
</script>
