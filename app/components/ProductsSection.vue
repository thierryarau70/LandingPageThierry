<template>
  <section id="solucoes" class="section">
    <h2>Muito além de landing pages</h2>
    <p class="sub">Desenvolvo o produto digital que o seu negócio precisa, do site à plataforma completa.</p>
    <div class="grid3">
      <article v-for="p in products" :key="p.title" class="card">
        <div class="ico">{{ p.ico }}</div>
        <h3>{{ p.title }}</h3>
        <p>{{ p.text }}</p>
        <a v-if="p.example" href="#portfolio" class="example">Exemplo: {{ p.example }} →</a>
      </article>
    </div>
    <p class="portfolio-cta">
      Tem uma ideia diferente?
      <a :href="waLink('Olá Thierry! Quero um orçamento para um sistema/site sob medida.')" target="_blank" rel="noopener">Me conte no WhatsApp</a>
    </p>
  </section>
</template>
