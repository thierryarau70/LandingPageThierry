<template>
  <section v-if="testimonials.length" id="depoimentos" class="section">
    <h2>O que dizem os clientes</h2>
    <div class="grid3">
      <figure v-for="t in testimonials" :key="t.name" class="card testimonial">
        <blockquote>“{{ t.text }}”</blockquote>
        <figcaption><b>{{ t.name }}</b><span>{{ t.role }}</span></figcaption>
      </figure>
    </div>
  </section>
</template>
