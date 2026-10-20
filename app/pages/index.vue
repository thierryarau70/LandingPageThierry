<script setup lang="ts">
import { siteOffer } from '../utils/offer'
import { projects as allProjects, waLink, EXPERIENCE_YEARS } from '../utils/site'
definePageMeta({ layout: 'profile' })
const selectedProjects = allProjects.filter(p => ['https://www.radardecliente.com.br', 'https://www.draemilevitoria.com.br', 'https://arouche-moda-intima.vercel.app'].includes(p.url))
const contact = waLink('Olá, Thierry! Quero um site de até 5 páginas por R$ 600. Podemos conversar?')
// Contador "35 horas" anima de 0 a 35 ao abrir a página (sem animação para quem prefere movimento reduzido)
const hours = ref(35)
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  hours.value = 0
  const start = performance.now()
  const tick = (now: number) => {
    const t = Math.min((now - start) / 1400, 1)
    hours.value = Math.round(35 * (1 - Math.pow(1 - t, 3)))
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
})
const marquee = ['Landing pages', 'Sites institucionais', 'Versão para celular', 'Domínio .com.br', 'Integração com WhatsApp', 'Sistemas web', 'Pronto para anúncios', 'Atendimento direto']
useSeoMeta({ title: 'Site em até 5 dias por R$ 600 | Thierry Araújo', description: 'Primeira versão em 35 horas. Site de até 5 páginas ou landing page por R$ 600, com textos, versão para celular e domínio .com.br incluso.', ogTitle: 'Seu site em até 5 dias | Thierry Araújo', ogDescription: 'Até 5 páginas, textos e domínio .com.br por R$ 600. Primeira versão em 35 horas.' })
</script>

<template>
  <main class="sales-page">
    <section class="sales-hero" aria-labelledby="sales-title">
      <div class="sales-hero-copy">
        <h1 id="sales-title" class="sales-title-anim"><span class="line"><span>Seu site no ar</span></span><span class="line"><span>em até <em class="sales-mark">5 dias</em>.</span></span></h1>
        <p class="sales-lead">Você cuida do negócio.<br>Eu cuido do seu site.</p>
        <p class="sales-description">Design, textos, versão para celular e domínio .com.br. Você vê a primeira versão em <strong>35 horas</strong>, pede os ajustes e acompanha tudo direto comigo.</p>
        <div class="sales-hero-price"><span>Site completo por</span><strong>R$ {{ siteOffer.price }}</strong><span>Domínio incluso, no seu nome.</span></div>
        <a class="sales-button" :href="contact" target="_blank" rel="noopener noreferrer">Quero meu site em 5 dias <span aria-hidden="true">↗</span></a>
        <p class="sales-helper">Abre o WhatsApp. Quem responde sou eu, Thierry.</p>
        <a class="sales-underlink" href="#projetos">Ver projetos publicados <span aria-hidden="true">↓</span></a>
      </div>
      <div class="sales-hero-proof">
        <div class="sales-delivery"><span>Do primeiro contato à primeira versão.</span><p><span class="sales-count" aria-label="35">{{ hours }}</span><span>horas</span></p><span>Você vê. A gente ajusta. Seu site vai ao ar.</span></div>
        <a class="sales-showcase" href="https://www.draemilevitoria.com.br" target="_blank" rel="noopener noreferrer" aria-label="Abrir site de Emile Vitória em nova aba">
          <img src="/portfolio/emile.webp" alt="Site da Dra. Emile Vitória, desenvolvido por Thierry" width="1200" height="616" fetchpriority="high">
          <div class="sales-showcase-top"><span class="sales-live">Projeto publicado</span><span>Emile Vitória <span aria-hidden="true">↗</span></span></div>
        </a>
        <ol class="sales-timeline" aria-label="Prazo de criação do site"><li><strong>Começamos</strong><span>Sua ideia e referências</span></li><li><strong>Até 35 horas</strong><span>Primeira versão</span></li><li><strong>Até 5 dias</strong><span>Site publicado</span></li></ol>
        <p class="sales-deadline-note">Prazos após o alinhamento e recebimento das informações. Ajustes e aprovação dentro do período combinado.</p>
      </div>
    </section>

 <div class="sales-marquee" aria-hidden="true"><div class="sales-marquee-track"><span v-for="(item, i) in [...marquee, ...marquee]" :key="i">{{ item }}<b>✦</b></span></div></div>

    <section id="como-funciona" class="sales-section sales-process" aria-labelledby="process-title">
      <div class="sales-section-title"><h2 id="process-title">Da sua ideia ao site publicado.</h2><p>Sem complicar o que pode ser simples.</p></div>
      <ol class="sales-steps"><li><span>01</span><h3>Conte o que você faz</h3><p>Me apresente seu negócio e envie até 3 sites que você gosta. Alinhamos o conteúdo e o escopo.</p></li><li><span>02</span><h3>Veja em 35 horas</h3><p>Receba a primeira versão, confira os textos e o visual e me diga o que ajustar.</p></li><li><span>03</span><h3>Publique em até 5 dias</h3><p>Com sua aprovação, coloco o site no seu domínio, pronto para você compartilhar.</p></li></ol>
    </section>

    <section id="projetos" class="sales-section" aria-labelledby="projects-title">
      <div class="sales-section-title"><h2 id="projects-title">Sites no ar. Pode entrar.</h2><p>Abra os projetos e veja o trabalho funcionando.</p></div>
      <div class="sales-projects"><a v-for="project in selectedProjects" :key="project.url" :href="project.url" class="sales-project" target="_blank" rel="noopener noreferrer" :aria-label="`Abrir ${project.name} em nova aba`"><img :src="project.image" :alt="`Página inicial de ${project.name}`" width="1200" height="616" loading="lazy"><div><h3>{{ project.name }} <span aria-hidden="true">↗</span></h3><p>{{ project.goal }}</p></div></a></div>
    </section>

    <section id="incluso" class="sales-section sales-offer" aria-labelledby="offer-title">
      <div class="sales-section-title"><h2 id="offer-title">Seu site, do texto ao domínio.</h2><p>O que está incluso nos R$ {{ siteOffer.price }}.</p></div>
      <div class="sales-offer-layout"><ul class="sales-includes"><li v-for="item in siteOffer.includes" :key="item.title"><div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div></li></ul>
        <aside class="sales-price-card" aria-label="Resumo da oferta"><h3>Até 5 páginas.<br>Um preço fechado.</h3><p class="sales-price-value"><span>R$</span> {{ siteOffer.price }}</p><p>Ou uma landing page para seus anúncios.</p><ul><li>Primeira versão em 35 horas</li><li>Publicado em até 5 dias</li><li>Domínio .com.br incluso</li><li>Atendimento direto comigo</li></ul><a class="sales-button" :href="contact" target="_blank" rel="noopener noreferrer">Quero meu site em 5 dias <span aria-hidden="true">↗</span></a><p class="sales-price-note">Prazos do pacote base, após receber as informações e alinhar o projeto.</p></aside>
      </div>
      <div class="sales-extras"><div><h3>Precisa de mais?</h3><p>Definimos o escopo antes de começar.</p></div><div><h4>Loja virtual, login, sistema ou 10+ páginas</h4><p class="sales-extra-price">+ R$ {{ siteOffer.extraPrice }}</p><p>Adicional ao pacote base. Prazo alinhado na proposta.</p></div><div><h4>SaaS, integrações e projetos maiores</h4><a :href="waLink('Olá, Thierry! Quero consultar o valor de um projeto maior. Minha ideia é:')" target="_blank" rel="noopener noreferrer">Consultar valor <span aria-hidden="true">↗</span></a><p>Uma proposta de acordo com sua ideia.</p></div></div>
    </section>

    <section id="quem-faz" class="sales-section sales-about" aria-labelledby="about-title"><div><h2 id="about-title">Quem conversa é quem desenvolve.</h2><p>Sou Thierry Araújo, desenvolvedor com {{ EXPERIENCE_YEARS }} anos de experiência. Já trabalhei com sites, sistemas de gestão e plataformas de ensino. Do primeiro contato à publicação, você fala direto comigo.</p><NuxtLink class="sales-underlink" to="/sobre-mim">Conheça meu trabalho <span aria-hidden="true">↗</span></NuxtLink></div><div class="sales-about-note"><strong>Sua ideia.<br>Meu próximo projeto.</strong><span>Design, desenvolvimento e publicação.</span></div></section>

    <section id="duvidas" class="sales-section sales-faq" aria-labelledby="faq-title"><div class="sales-section-title"><h2 id="faq-title">Antes de começar.</h2><p>As respostas para decidir com clareza.</p></div><div class="profile-questions"><details v-for="question in siteOffer.questions" :key="question.q"><summary>{{ question.q }}<span aria-hidden="true">+</span></summary><p>{{ question.a }}</p></details></div></section>

    <section class="sales-section sales-close" aria-labelledby="close-title"><h2 id="close-title">Vamos colocar seu negócio no ar?</h2><p>Me conte o que você faz. Sua primeira versão chega em 35 horas.</p><a class="sales-button" :href="contact" target="_blank" rel="noopener noreferrer">Quero meu site em 5 dias <span aria-hidden="true">↗</span></a><a class="sales-email" href="mailto:thierryaraujo309@gmail.com">Prefere e-mail? thierryaraujo309@gmail.com</a></section>
  </main>
</template>
