<template>
  <section id="portfolio" class="section">
    <h2>Portfólio</h2>
    <p class="sub">Alguns dos sistemas que desenvolvi e estão no ar, entre outros projetos feitos em empresas. Clique para ver funcionando.</p>
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
          <ul class="chips">
            <li v-for="t in p.tags" :key="t">{{ t }}</li>
          </ul>
          <a :href="p.url" target="_blank" rel="noopener" class="live">Ver site ao vivo ↗</a>
        </div>
      </article>
    </div>
    <p class="portfolio-cta">
      Quer um projeto assim para o seu negócio?
      <a :href="waLink('Olá Thierry! Vi seu portfólio e quero um orçamento.')" target="_blank" rel="noopener">Fale comigo no WhatsApp</a>
    </p>
  </section>
</template>
