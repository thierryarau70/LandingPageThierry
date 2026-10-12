<template>
  <main id="topo">
    <HeroSection
      :title="niche.title"
      :highlight="niche.highlight"
      :text="niche.text"
      :wa-text="waText"
      :shots="niche.shots"
    />
    <section class="section niche-points">
      <h2>{{ niche.pointsTitle }}</h2>
      <div class="grid3">
        <article v-for="p in niche.points" :key="p.title" class="card">
          <div class="ico">{{ p.ico }}</div>
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
        </article>
      </div>
    </section>
    <PortfolioSection :order="niche.projects" />
    <TestimonialsSection />
    <PlansSection :wa-suffix="` (vim pela página para ${niche.label})`" />
    <StepsSection />
    <AboutSection />
    <FaqSection />
    <ContactSection />
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const niche = niches.find(n => n.slug === route.params.nicho)
if (!niche) throw createError({ statusCode: 404, statusMessage: 'Página não encontrada', fatal: true })

const waText = `Olá Thierry! Vi a página para ${niche.label} e quero um orçamento.`
useHead({
  title: `${niche.seoTitle} | Thierry Araújo`,
  meta: [
    { name: 'description', content: niche.text },
    { property: 'og:title', content: `${niche.seoTitle} | Thierry Araújo` },
    { property: 'og:description', content: niche.text }
  ]
})
</script>
