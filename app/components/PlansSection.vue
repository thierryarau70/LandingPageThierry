<template>
  <section id="planos" class="section">
    <h2>Escolha seu plano</h2>
    <p class="sub">Valores a combinar conforme o projeto. Clique no plano e a mensagem já vai pronta para o meu WhatsApp.</p>
    <div class="plans">
      <article v-for="p in plans" :key="p.name" class="plan" :class="{ featured: p.featured }">
        <span v-if="p.featured" class="badge">Mais escolhido</span>
        <h3>{{ p.name }}</h3>
        <p class="tag">{{ p.tag }}</p>
        <ul><li v-for="f in p.features" :key="f">{{ f }}</li></ul>
        <a
          class="btn"
          :class="{ 'btn-ghost': !p.featured }"
          :href="waLink(`Olá Thierry! Tenho interesse no plano ${p.name.toUpperCase()} de landing page.`)"
          target="_blank"
          rel="noopener"
        >Contratar {{ p.name }}</a>
      </article>
    </div>
  </section>
</template>
