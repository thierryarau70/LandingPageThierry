<template>
  <section id="portfolio" class="section">
    <h2>Projetos</h2>
    <p class="sub">Alguns dos sites e sistemas que desenvolvi e estão no ar. Clique para ver funcionando.</p>
    <div class="portfolio">
      <article v-for="p in projects" :key="p.name" class="project">
        <a :href="p.url" target="_blank" rel="noopener" class="shot" :aria-label="`Abrir ${p.name} em nova aba`">
          <div class="bar">
            <i /><i /><i />
            <span>{{ p.url.replace(/^https:\/\//, '') }}</span>
          </div>
          <img :src="p.image" :alt="`Tela inicial do ${p.name}`" width="1200" height="616" loading="lazy">
        </a>
        <div class="info">
          <span class="cat">{{ p.category }}</span>
          <h3>{{ p.name }}</h3>
          <p>{{ p.description }}</p>
          <dl class="facts">
            <dt>Objetivo</dt><dd>{{ p.goal }}</dd>
            <dt>Minha entrega</dt><dd>{{ p.delivery }}</dd>
          </dl>
          <a :href="p.url" target="_blank" rel="noopener" class="live">Abrir o site ↗</a>
        </div>
      </article>
    </div>
    <p class="portfolio-cta">
      Quer um projeto assim para o seu negócio?
      <a :href="waLink('Olá Thierry! Vi seus projetos e quero um orçamento.')" target="_blank" rel="noopener">Pedir orçamento no WhatsApp</a>
    </p>
  </section>
</template>
