<template>
  <section id="faq" class="section">
    <h2>Perguntas frequentes</h2>
    <div class="faq">
      <details v-for="item in faq" :key="item.q">
        <summary>{{ item.q }}</summary>
        <p>{{ item.a }}</p>
      </details>
    </div>
  </section>
</template>
