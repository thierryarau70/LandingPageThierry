<template>
  <section class="hero">
    <div class="hero-text">
      <span class="pill">💻 {{ EXPERIENCE_YEARS }} anos de experiência · atendimento direto</span>
      <h1>Seu negócio com um site profissional e um <em>caminho direto</em> para novos contatos.</h1>
      <p>Crio landing pages para clínicas, cursos e prestadores de serviços, com design personalizado, versão para celular e contato pelo WhatsApp. Você fala diretamente comigo, da criação à publicação.</p>
      <div class="cta">
        <a class="btn" :href="waLink('Olá Thierry! Vim pelo site e quero um orçamento de landing page.')" target="_blank" rel="noopener">Pedir orçamento no WhatsApp</a>
        <a class="btn btn-ghost" href="#portfolio">Ver projetos</a>
      </div>
    </div>
    <div class="hero-shots" aria-hidden="true">
      <img class="s1" src="/portfolio/emile.webp" alt="" width="1200" height="616">
      <img class="s2" src="/portfolio/isoladas.webp" alt="" width="1200" height="616">
    </div>
  </section>
</template>
