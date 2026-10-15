<script setup lang="ts">
import { EXPERIENCE_YEARS } from '../utils/site'
definePageMeta({ layout: 'profile' })
useSeoMeta({ title: 'Sobre mim | Thierry Araújo', description: 'Conheça Thierry Araújo, desenvolvedor de sites e sistemas web com atendimento direto.' })
</script>

<template>
  <main class="profile-detail">
    <div class="profile-detail-heading"><h1>Sou Thierry Araújo.</h1><p>Desenvolvedor web. Da ideia à publicação, você fala comigo.</p></div>
    <div class="profile-information-grid">
      <section class="profile-information" aria-labelledby="experience-title">
        <h2 id="experience-title">{{ EXPERIENCE_YEARS }} anos de experiência</h2>
        <p>Desenvolvo sites e sistemas web. Minha experiência inclui plataformas de gestão e de ensino a distância.</p>
        <p>Hoje também crio landing pages para negócios que precisam se apresentar na internet.</p>
      </section>
      <section class="profile-information" aria-labelledby="stack-title">
        <h2 id="stack-title">Design e desenvolvimento</h2>
        <p>Trabalho com Nuxt, Vue e TypeScript, cuidando da interface e da implementação.</p>
        <a class="profile-text-link" href="mailto:thierryaraujo309@gmail.com">Conversar por e-mail <span aria-hidden="true">↗</span></a>
      </section>
    </div>
  </main>
</template>
