<template>
  <section id="solucoes" class="section">
    <h2>Não é só landing page</h2>
    <p class="sub">Além de landing pages, desenvolvo outros produtos digitais para o seu negócio.</p>
    <div class="grid3">
      <article v-for="p in products" :key="p.title" class="card">
        <div class="ico">{{ p.ico }}</div>
        <h3>{{ p.title }}</h3>
        <p>{{ p.text }}</p>
      </article>
    </div>
    <p class="portfolio-cta">
      Tem outra ideia em mente?
      <a :href="waLink('Olá Thierry! Vi seu site e quero um orçamento para outro tipo de projeto.')" target="_blank" rel="noopener">Me conta no WhatsApp</a>
    </p>
  </section>
</template>
