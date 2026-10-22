<script setup lang="ts">
import { EXPERIENCE_YEARS } from '../utils/site'
definePageMeta({ layout: 'profile', alias: ['/en/about-me'] })
const { t } = useLocale()
useSeoMeta({ title: () => t.value.mePage.seoTitle, description: () => t.value.mePage.seoDescription })
</script>

<template>
  <main class="profile-detail">
    <div class="profile-detail-heading"><h1>{{ t.mePage.title }}</h1><p>{{ t.mePage.sub }}</p></div>
    <div class="profile-information-grid">
      <section class="profile-information" aria-labelledby="experience-title">
        <h2 id="experience-title">{{ t.mePage.expTitle(EXPERIENCE_YEARS) }}</h2>
        <p v-for="line in t.mePage.exp" :key="line">{{ line }}</p>
      </section>
      <section class="profile-information" aria-labelledby="stack-title">
        <h2 id="stack-title">{{ t.mePage.stackTitle }}</h2>
        <p>{{ t.mePage.stack }}</p>
        <a class="profile-text-link" href="mailto:thierryaraujo309@gmail.com">{{ t.mePage.email }} <span aria-hidden="true">↗</span></a>
      </section>
    </div>
  </main>
</template>
