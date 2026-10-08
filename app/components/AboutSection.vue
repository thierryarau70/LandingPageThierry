<template>
  <section id="sobre" class="section about">
    <div class="avatar">T</div>
    <div>
      <h2>Sobre mim</h2>
      <p>Olá, eu sou o <b>Thierry Araújo</b>. Crio landing pages com visual forte e foco em resultado, ajudando negócios e profissionais a ganharem presença online e a converterem mais visitantes em clientes.</p>
      <p>Cuido de tudo: design, desenvolvimento, publicação e ajustes. Você fala direto comigo, sem intermediários.</p>
      <ul class="chips">
        <li v-for="c in chips" :key="c">{{ c }}</li>
      </ul>
      <!-- TODO: adicionar formação, experiências e projetos do currículo -->
    </div>
  </section>
</template>

<script setup lang="ts">
const chips = ['Nuxt / Vue', 'TypeScript', 'Design de interface', 'SEO básico', 'Pixel & Analytics', 'Atendimento direto']
</script>
