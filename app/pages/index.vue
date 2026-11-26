<script setup lang="ts">
import { faqSchema, organizationSchema } from '~/data/seo'

const { base } = useSiteUrl()
usePageSeo({ path: '/', schema: [organizationSchema(base), faqSchema()] })
</script>

<template>
  <main id="conteudo">
    <HeroSection />
    <EditorialMarquee />
    <SelectedProjects />
    <ServicesSection />
    <BrandManifesto />
    <AboutSection />
    <ProcessSection />
    <DifferentialsSection />
    <FaqSection />
    <ContactSection />
  </main>
</template>
