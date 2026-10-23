<script setup lang="ts">
import { projects as allProjects } from '../utils/site'
definePageMeta({ layout: 'profile', alias: ['/en/projects'] })
const { t } = useLocale()
useSeoMeta({ title: () => t.value.projectsPage.seoTitle, description: () => t.value.projectsPage.seoDescription })
const selectedProjects = computed(() => allProjects
  .filter(project => ['https://www.plataformaprumo.com.br', 'https://www.radardecliente.com.br', 'https://www.draemilevitoria.com.br', 'https://www.arouchemodaintima.com.br'].includes(project.url))
  .map(project => ({ ...project, ...t.value.projects[project.url] })))
</script>

<template>
  <main class="profile-detail profile-projects-page">
    <div class="profile-detail-heading"><h1>{{ t.projectsPage.title }}</h1><p>{{ t.projectsPage.sub }}</p></div>
    <div class="profile-project-gallery">
      <a v-for="project in selectedProjects" :key="project.url" class="profile-project" :href="project.url" target="_blank" rel="noopener noreferrer" :aria-label="t.projectsPage.open(project.name)">
        <div class="profile-image"><img :src="project.image" :alt="t.home.projectAlt(project.name)" width="1200" height="616"></div>
        <div class="profile-project-caption"><div><h2>{{ project.name }}</h2><p>{{ project.category }}</p></div><span class="profile-project-arrow" aria-hidden="true">↗</span></div>
      </a>
    </div>
  </main>
</template>
