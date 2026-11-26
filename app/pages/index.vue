<script setup lang="ts">
import { portfolio, HOME_PROJECTS, waLink, EXPERIENCE_YEARS } from '../utils/site'
definePageMeta({ layout: 'profile', alias: ['/en'] })
const { t } = useLocale()
const h = computed(() => t.value.home)
// A página inicial mostra os primeiros projetos; os demais ficam em /projetos
const selectedProjects = computed(() => portfolio
  .slice(0, HOME_PROJECTS)
  .map(p => ({ ...p, ...t.value.projects[p.url] })))
// Os que não cabem na página inicial viram um cartão no fim da grade, com os nomes
const restProjects = computed(() => portfolio.slice(HOME_PROJECTS))
const projectsPath = computed(() => t.value.pageNav[2]!.to)
const domain = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '')
const contact = computed(() => waLink(h.value.contact))
// Contador "35 horas" anima de 0 a 35 ao abrir a página (sem animação para quem prefere movimento reduzido)
const hours = ref(35)
// Barra fixa no celular: aparece quando nenhum botão de contato está na tela e some perto do rodapé
const stickyOn = ref(false)
let io: IntersectionObserver | undefined
onMounted(() => {
  if ('IntersectionObserver' in window) {
    const seen = new Set<Element>()
    io = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)
      stickyOn.value = seen.size === 0
    })
    document.querySelectorAll('.sales-page .sales-button, .profile-footer').forEach(el => io!.observe(el))
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  hours.value = 0
  const start = performance.now()
  const tick = (now: number) => {
    const p = Math.min((now - start) / 1400, 1)
    hours.value = Math.round(35 * (1 - Math.pow(1 - p, 3)))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
})
onBeforeUnmount(() => io?.disconnect())
useSeoMeta({ title: () => h.value.seoTitle, description: () => h.value.seoDescription, ogTitle: () => h.value.ogTitle, ogDescription: () => h.value.ogDescription })
</script>

<template>
  <main class="sales-page">
    <section class="sales-hero" aria-labelledby="sales-title">
      <AsciiField class="ascii-hero" />
      <div class="sales-hero-copy">
        <a class="sales-badge" href="#projetos"><i aria-hidden="true" />{{ h.badge(portfolio.length) }}<span>{{ h.badgeNote }}</span><UiIcon name="arrow-down" /></a>
        <h1 id="sales-title" class="sales-title-anim"><span class="line"><span>{{ h.h1a }}</span></span><span class="line"><span>{{ h.h1b }}<em class="sales-mark">{{ h.h1mark }}</em>{{ h.h1c }}</span></span></h1>
        <p class="sales-lead">{{ h.lead1 }}<br>{{ h.lead2 }}</p>
        <p class="sales-description">{{ h.desc1 }}<strong>{{ h.descStrong }}</strong>{{ h.desc2 }}</p>
        <div class="sales-hero-price"><span>{{ h.priceLabel }}</span><strong>R$ {{ t.offer.price }}</strong><span>{{ h.priceNote }}</span></div>
        <a class="sales-button" :href="contact" target="_blank" rel="noopener noreferrer"><b><UiIcon name="whatsapp" />{{ h.cta }}</b> <span aria-hidden="true"><UiIcon name="arrow-up-right" /></span></a>
        <p class="sales-helper">{{ h.helper }}</p>
        <a class="sales-underlink" href="#projetos">{{ h.seeProjects }} <span aria-hidden="true"><UiIcon name="arrow-down" /></span></a>
      </div>
      <div class="sales-hero-proof">
        <div class="sales-delivery"><span>{{ h.deliveryTop }}</span><p><span class="sales-count" aria-label="35">{{ hours }}</span><span>{{ h.hours }}</span></p><span>{{ h.deliveryBottom }}</span></div>
        <a class="sales-showcase" href="https://www.draemilevitoria.com.br" target="_blank" rel="noopener noreferrer" :aria-label="h.showcaseLabel">
          <img src="/portfolio/emile.webp" :alt="h.showcaseAlt" width="1200" height="616" fetchpriority="high">
          <div class="sales-showcase-top"><span class="sales-live">{{ h.live }}</span><span>Emile Vitória <span aria-hidden="true"><UiIcon name="arrow-up-right" /></span></span></div>
        </a>
        <ol class="sales-timeline" :aria-label="h.timelineLabel"><li v-for="[title, text] in h.timeline" :key="title"><strong>{{ title }}</strong><span>{{ text }}</span></li></ol>
        <p class="sales-deadline-note">{{ h.deadlineNote }}</p>
      </div>
    </section>

    <div class="sales-marquee" aria-hidden="true"><div class="sales-marquee-track"><span v-for="(item, i) in [...h.marquee, ...h.marquee]" :key="i">{{ item }}<b>✦</b></span></div></div>

    <section id="como-funciona" class="sales-section sales-process" aria-labelledby="process-title">
      <div class="sales-section-title"><span class="sales-eyebrow">01 — {{ h.eyebrows.process }}</span><h2 id="process-title">{{ h.processTitle }}</h2><p>{{ h.processSub }}</p></div>
      <ol class="sales-steps"><li v-for="([title, text], i) in h.steps" :key="title"><span>0{{ i + 1 }}</span><h3>{{ title }}</h3><p>{{ text }}</p></li></ol>
    </section>

    <section id="projetos" class="sales-section" aria-labelledby="projects-title">
      <div class="sales-section-title"><span class="sales-eyebrow">02 — {{ h.eyebrows.projects }}</span><h2 id="projects-title">{{ h.projectsTitle }}</h2><p>{{ h.projectsSub }}</p></div>
      <div class="sales-projects">
        <a v-for="project in selectedProjects" :key="project.url" :href="project.url" class="sales-project" target="_blank" rel="noopener noreferrer" :aria-label="h.openProject(project.name)">
          <div class="sales-project-frame">
            <div class="sales-project-bar" aria-hidden="true"><i /><i /><i /><span>{{ domain(project.url) }}</span></div>
            <ProjectThumb :image="project.image" :video="project.video" :alt="h.projectAlt(project.name)" />
          </div>
          <div class="sales-project-info">
            <span class="sales-project-cat">{{ project.category }}</span>
            <h3>{{ project.name }} <span aria-hidden="true"><UiIcon name="arrow-up-right" /></span></h3>
            <p>{{ project.goal }}</p>
          </div>
        </a>
        <NuxtLink v-if="restProjects.length" class="sales-more" :to="projectsPath">
          <small>{{ h.moreCount(restProjects.length) }}</small>
          <strong>{{ h.allProjects(portfolio.length) }}</strong>
          <em>{{ restProjects.map(p => p.name).join(' · ') }}</em>
          <span aria-hidden="true"><UiIcon name="arrow-right" /></span>
        </NuxtLink>
      </div>
    </section>

    <section id="incluso" class="sales-section sales-offer" aria-labelledby="offer-title">
      <div class="sales-section-title"><span class="sales-eyebrow">03 — {{ h.eyebrows.offer }}</span><h2 id="offer-title">{{ h.offerTitle }}</h2><p>{{ h.offerSub(t.offer.price) }}</p></div>
      <div class="sales-offer-layout"><ul class="sales-includes"><li v-for="item in t.offer.includes" :key="item.title"><div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div></li></ul>
        <aside class="sales-price-card" :aria-label="h.offerLabel"><h3>{{ h.cardTitle1 }}<br>{{ h.cardTitle2 }}</h3><p class="sales-price-value"><span>R$</span> {{ t.offer.price }}</p><p>{{ h.cardOr }}</p><ul><li v-for="item in h.cardList" :key="item">{{ item }}</li></ul><a class="sales-button" :href="contact" target="_blank" rel="noopener noreferrer"><b><UiIcon name="whatsapp" />{{ h.cta }}</b> <span aria-hidden="true"><UiIcon name="arrow-up-right" /></span></a><p class="sales-price-note">{{ h.cardNote }}</p></aside>
      </div>
      <div class="sales-extras"><div><h3>{{ h.moreTitle }}</h3><p>{{ h.moreSub }}</p></div><div><h4>{{ h.extraTitle }}</h4><p class="sales-extra-price">+ R$ {{ t.offer.extraPrice }}</p><p>{{ h.extraNote }}</p></div><div><h4>{{ h.bigTitle }}</h4><a :href="waLink(h.bigProject)" target="_blank" rel="noopener noreferrer">{{ h.bigLink }} <span aria-hidden="true"><UiIcon name="arrow-up-right" /></span></a><p>{{ h.bigNote }}</p></div></div>
    </section>

    <section id="quem-faz" class="sales-section sales-about" aria-labelledby="about-title"><div><span class="sales-eyebrow">04 — {{ h.eyebrows.about }}</span><h2 id="about-title">{{ h.aboutTitle }}</h2><p>{{ h.aboutText(EXPERIENCE_YEARS) }}</p><NuxtLink class="sales-underlink" :to="t.pageNav[3]!.to">{{ h.aboutLink }} <span aria-hidden="true"><UiIcon name="arrow-up-right" /></span></NuxtLink></div><div class="sales-about-note"><strong>{{ h.aboutNote1 }}<br>{{ h.aboutNote2 }}</strong><span>{{ h.aboutNoteSub }}</span></div></section>

    <section id="duvidas" class="sales-section sales-faq" aria-labelledby="faq-title"><div class="sales-section-title"><span class="sales-eyebrow">05 — {{ h.eyebrows.faq }}</span><h2 id="faq-title">{{ h.faqTitle }}</h2><p>{{ h.faqSub }}</p></div><div class="profile-questions"><details v-for="question in t.offer.questions" :key="question.q"><summary>{{ question.q }}<span aria-hidden="true">+</span></summary><p>{{ question.a }}</p></details></div></section>

    <section class="sales-section sales-close" aria-labelledby="close-title"><AsciiField class="ascii-close" :cell="13" /><h2 id="close-title">{{ h.closeTitle }}</h2><p>{{ h.closeSub }}</p><a class="sales-button" :href="contact" target="_blank" rel="noopener noreferrer"><b><UiIcon name="whatsapp" />{{ h.cta }}</b> <span aria-hidden="true"><UiIcon name="arrow-up-right" /></span></a><a class="sales-email" href="mailto:thierryaraujo309@gmail.com">{{ h.email }} thierryaraujo309@gmail.com</a></section>

    <div class="sales-sticky" :class="{ 'is-on': stickyOn }" :inert="!stickyOn || undefined">
      <p><span>{{ h.stickyLabel }}</span><strong>R$ {{ t.offer.price }}</strong></p>
      <a :href="contact" target="_blank" rel="noopener noreferrer"><UiIcon name="whatsapp" />{{ h.stickyCta }}</a>
    </div>
  </main>
</template>
