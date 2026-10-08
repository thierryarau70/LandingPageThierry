<template>
  <section class="section">
    <h2>Como funciona</h2>
    <ol class="steps">
      <li v-for="(s, i) in steps" :key="s.title">
        <b>{{ i + 1 }}</b>
        <h3>{{ s.title }}</h3>
        <p>{{ s.text }}</p>
      </li>
    </ol>
  </section>
</template>
