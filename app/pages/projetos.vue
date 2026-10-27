<script setup lang="ts">
import { projects as allProjects } from '../utils/site'
definePageMeta({ layout: 'profile', alias: ['/en/projects'] })
const { t } = useLocale()
useSeoMeta({ title: () => t.value.projectsPage.seoTitle, description: () => t.value.projectsPage.seoDescription })
const selectedProjects = computed(() => allProjects
  .filter(project => ['https://www.draemilevitoria.com.br', 'https://www.arouchemodaintima.com.br', 'https://cw-imports-catalogo.vercel.app', 'https://agenda-emi.vercel.app', 'https://protocolo-iatf.vercel.app', 'https://www.plataformaprumo.com.br'].includes(project.url))
  .map(project => ({ ...project, ...t.value.projects[project.url] })))
</script>

<template>
  <main class="profile-detail profile-projects-page">
    <div class="profile-detail-heading"><h1>{{ t.projectsPage.title }}</h1><p>{{ t.projectsPage.sub }}</p></div>
    <div class="profile-project-gallery">
      <a v-for="project in selectedProjects" :key="project.url" class="profile-project" :href="project.url" target="_blank" rel="noopener noreferrer" :aria-label="t.projectsPage.open(project.name)">
        <div class="profile-image"><ProjectThumb :image="project.image" :video="project.video" :alt="t.home.projectAlt(project.name)" :lazy="false" /></div>
        <div class="profile-project-caption"><div><h2>{{ project.name }}</h2><p>{{ project.category }}</p></div><span class="profile-project-arrow" aria-hidden="true">↗</span></div>
      </a>
    </div>
  </main>
</template>
