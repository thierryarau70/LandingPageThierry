<script setup lang="ts">
import { projects as allProjects } from '../utils/site'
definePageMeta({ layout: 'profile' })
useSeoMeta({ title: 'Projetos | Thierry Araújo', description: 'Conheça o Radar de Clientes e os sites de Emile Vitória e Centro de Isoladas desenvolvidos por Thierry Araújo.' })
const selectedProjects = allProjects.filter(project => ['https://cacar-site-com-ia.vercel.app/', 'https://emilevitoria.vercel.app', 'https://centro-de-isoladas.vercel.app'].includes(project.url))
</script>

<template>
  <main class="profile-detail profile-projects-page">
    <div class="profile-detail-heading"><h1>Ideias que já estão no ar.</h1><p>Sites e plataformas que conectam negócios, pessoas e oportunidades.</p></div>
    <div class="profile-project-gallery">
      <a v-for="project in selectedProjects" :key="project.url" class="profile-project" :href="project.url" target="_blank" rel="noopener noreferrer" :aria-label="`${project.name} — abrir site em nova aba`">
        <div class="profile-image"><img :src="project.image" :alt="`Página inicial de ${project.name}`" width="1200" height="616"></div>
        <div class="profile-project-caption"><div><h2>{{ project.name }}</h2><p>{{ project.category }}</p></div><span class="profile-project-arrow" aria-hidden="true">↗</span></div>
      </a>
    </div>
  </main>
</template>
