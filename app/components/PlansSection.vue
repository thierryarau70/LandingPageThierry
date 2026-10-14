<template>
  <section id="planos" class="section investment">
    <div class="investment-intro">
      <h2>Uma ideia boa merece sair do papel.</h2>
      <p class="sub">Uma oferta simples para começar. E espaço para construir algo maior quando você precisar.</p>
    </div>
    <div class="plans">
      <article v-for="p in plans" :key="p.name" class="plan landing-plan">
        <span class="goal">{{ p.goal }}</span>
        <h3>{{ p.name }}</h3>
        <p class="price">R$ {{ p.price.toLocaleString('pt-BR') }}</p>
        <p class="tag">{{ p.tag }}</p>
        <ul><li v-for="f in p.features" :key="f">{{ f }}</li></ul>
        <a class="btn" :href="waLink(`Olá Thierry! Quero uma landing page de R$ 600.${waSuffix}`)" target="_blank" rel="noopener">Quero minha landing page</a>
      </article>
      <article class="plan custom-plan">
        <span class="goal">Do tamanho da sua ideia</span>
        <h3>Outros projetos</h3>
        <p class="custom-price">Consultar orçamento</p>
        <p class="tag">Para projetos que precisam ir além de uma landing page.</p>
        <ul>
          <li>Sites institucionais</li>
          <li>Sistemas e plataformas web</li>
          <li>Áreas de membros e cursos</li>
          <li>Funcionalidades e integrações sob medida</li>
        </ul>
        <a class="btn btn-ghost" :href="waLink(`Olá Thierry! Quero consultar um orçamento para um projeto sob medida.${waSuffix}`)" target="_blank" rel="noopener">Conversar sobre meu projeto</a>
      </article>
    </div>
    <div class="plan-notes">
      <div v-for="n in planNotes" :key="n.title"><b>{{ n.title }}</b><p>{{ n.text }}</p></div>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ waSuffix?: string }>(), { waSuffix: '' })
</script>
