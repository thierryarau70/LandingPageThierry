<script setup lang="ts">
import { findProject } from '~/data/projects'
import { breadcrumbSchema, projectSchema } from '~/data/seo'

const route = useRoute()
const project = findProject(String(route.params.slug))
if (!project) throw createError({ statusCode: 404, statusMessage: 'Projeto não encontrado', fatal: true })

const { base } = useSiteUrl()
usePageSeo({
  title: `${project.name} — Case`,
  description: project.summary,
  image: project.desktop[0]!.src,
  imageAlt: project.desktop[0]!.alt,
  type: 'article',
  schema: [
    projectSchema(base, project),
    breadcrumbSchema(base, [{ name: 'Início', path: '/' }, { name: 'Projetos', path: '/projetos' }, { name: project.name, path: `/projetos/${project.slug}` }])
  ]
})
</script>

<template>
  <main id="conteudo">
    <ProjectCaseStudy :project="project" />
  </main>
</template>
