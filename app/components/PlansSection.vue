<template>
  <section id="planos" class="section">
    <h2>Pacotes</h2>
    <p class="sub">Escolha pelo objetivo da página. O valor final é confirmado na conversa, conforme o seu projeto.</p>
    <div class="plans">
      <article v-for="p in plans" :key="p.name" class="plan" :class="{ featured: p.featured }">
        <span v-if="p.featured" class="badge">Recomendado para quem anuncia</span>
        <span class="goal">{{ p.goal }}</span>
        <h3>{{ p.name }}</h3>
        <p class="price"><small>a partir de</small> R$ {{ p.price.toLocaleString('pt-BR') }}</p>
        <p class="tag">{{ p.tag }}</p>
        <ul><li v-for="f in p.features" :key="f">{{ f }}</li></ul>
        <a
          class="btn"
          :class="{ 'btn-ghost': !p.featured }"
          :href="waLink(`Olá Thierry! Quero um orçamento do pacote ${p.name.toUpperCase()} de landing page.${waSuffix}`)"
          target="_blank"
          rel="noopener"
        >Solicitar orçamento</a>
      </article>
    </div>
    <div class="plan-notes">
      <div v-for="n in planNotes" :key="n.title">
        <b>{{ n.title }}</b>
        <p>{{ n.text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ waSuffix?: string }>(), { waSuffix: '' })
</script>
