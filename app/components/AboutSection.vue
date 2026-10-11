<template>
  <section id="sobre" class="section about">
    <div class="avatar">T</div>
    <div>
      <h2>Sobre mim</h2>
      <p>Olá, eu sou o <b>Thierry Araújo</b>, desenvolvedor com <b>{{ EXPERIENCE_YEARS }} anos de experiência em programação no mercado</b>. Já desenvolvi sistemas web completos, como plataformas de gestão e de ensino a distância, e hoje uso essa bagagem para criar landing pages, sites e sistemas com visual forte e foco em resultado.</p>
      <p>Cuido de tudo: design, desenvolvimento, publicação e ajustes. Você fala direto comigo, sem intermediários.</p>
      <ul class="about-stats">
        <li><b>{{ EXPERIENCE_YEARS }} anos</b><span>de mercado</span></li>
        <li><b>{{ projects.length }}</b><span>projetos no portfólio</span></li>
      </ul>
      <ul class="chips">
        <li v-for="c in chips" :key="c">{{ c }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const chips = ['Nuxt / Vue', 'TypeScript', 'Sistemas web', 'Design de interface', 'SEO básico', 'Pixel & Analytics']
</script>
