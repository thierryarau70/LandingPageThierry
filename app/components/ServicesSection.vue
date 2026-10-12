<template>
  <section id="servicos" class="section">
    <h2>O que vem em toda página</h2>
    <p class="sub">O básico bem feito, para o visitante entender o seu serviço e falar com você.</p>
    <div class="grid3">
      <article v-for="s in services" :key="s.title" class="card">
        <div class="ico">{{ s.ico }}</div>
        <h3>{{ s.title }}</h3>
        <p>{{ s.text }}</p>
      </article>
    </div>
  </section>
</template>
