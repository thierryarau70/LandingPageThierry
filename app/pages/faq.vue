<script setup lang="ts">
import { siteOffer } from '../utils/offer'
definePageMeta({ layout: 'profile' })
useSeoMeta({ title: 'Perguntas frequentes | Thierry Araújo', description: 'Preço, primeira versão em 35 horas, publicação em até 5 dias e domínio incluso.' })
</script>
<template>
  <main class="profile-detail profile-faq-page">
    <div class="profile-detail-heading"><h1>Perguntas frequentes</h1><p>Preço, prazo e o que está incluído.</p></div>
    <div class="profile-questions"><details v-for="question in siteOffer.questions" :key="question.q"><summary>{{ question.q }}<span aria-hidden="true">+</span></summary><p>{{ question.a }}</p></details></div>
  </main>
</template>
