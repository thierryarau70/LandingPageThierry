<template>
  <section id="servicos" class="section">
    <h2>O que você leva</h2>
    <p class="sub">Tudo que uma página precisa para vender, sem enrolação.</p>
    <div class="grid3">
      <article v-for="s in services" :key="s.title" class="card">
        <div class="ico">{{ s.ico }}</div>
        <h3>{{ s.title }}</h3>
        <p>{{ s.text }}</p>
      </article>
    </div>
  </section>
</template>
