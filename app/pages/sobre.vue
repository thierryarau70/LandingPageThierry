<script setup lang="ts">
import { waLink } from '../utils/site'
definePageMeta({ layout: 'profile', alias: ['/en/about'] })
const { t } = useLocale()
useSeoMeta({ title: () => t.value.aboutPage.seoTitle, description: () => t.value.aboutPage.seoDescription })
</script>
<template>
  <main class="profile-detail">
    <div class="profile-detail-heading"><h1>{{ t.aboutPage.title }}</h1><p>{{ t.aboutPage.sub }}</p></div>
    <div class="profile-information-grid"><section class="profile-information" aria-labelledby="included-title"><h2 id="included-title">{{ t.aboutPage.includedTitle }}</h2><ul><li v-for="item in t.offer.includes" :key="item.title"><strong>{{ item.title }}</strong><p>{{ item.text }}</p></li></ul></section><section class="profile-information" aria-labelledby="delivery-title"><h2 id="delivery-title">{{ t.aboutPage.moreTitle }}</h2><p v-for="line in t.aboutPage.more" :key="line">{{ line }}</p><a class="profile-text-link" :href="waLink(t.aboutPage.wa)" target="_blank" rel="noopener noreferrer">{{ t.aboutPage.waLabel }} <span aria-hidden="true">↗</span></a></section></div>
  </main>
</template>
