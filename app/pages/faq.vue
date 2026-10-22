<script setup lang="ts">
definePageMeta({ layout: 'profile', alias: ['/en/faq'] })
const { t } = useLocale()
useSeoMeta({ title: () => t.value.faqPage.seoTitle, description: () => t.value.faqPage.seoDescription })
</script>
<template>
  <main class="profile-detail profile-faq-page">
    <div class="profile-detail-heading"><h1>{{ t.faqPage.title }}</h1><p>{{ t.faqPage.sub }}</p></div>
    <div class="profile-questions"><details v-for="question in t.offer.questions" :key="question.q"><summary>{{ question.q }}<span aria-hidden="true">+</span></summary><p>{{ question.a }}</p></details></div>
  </main>
</template>
