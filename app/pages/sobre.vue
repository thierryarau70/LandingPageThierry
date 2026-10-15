<script setup lang="ts">
import { siteOffer } from '../utils/offer'
import { waLink } from '../utils/site'
definePageMeta({ layout: 'profile' })
useSeoMeta({ title: 'Site completo por R$ 600 | Thierry Araújo', description: 'Até 5 páginas ou uma landing page, com textos, domínio .com.br e primeira versão em 35 horas.' })
</script>
<template>
  <main class="profile-detail">
    <div class="profile-detail-heading"><h1>Seu site, do começo ao ar.</h1><p>Até 5 páginas ou uma landing page por R$ 600. Primeira versão em 35 horas e publicação em até 5 dias.</p></div>
    <div class="profile-information-grid"><section class="profile-information" aria-labelledby="included-title"><h2 id="included-title">O que está incluso</h2><ul><li v-for="item in siteOffer.includes" :key="item.title"><strong>{{ item.title }}</strong><p>{{ item.text }}</p></li></ul></section><section class="profile-information" aria-labelledby="delivery-title"><h2 id="delivery-title">Mais funcionalidades</h2><p>Loja virtual, login, sistema ou 10+ páginas: adicional de R$ 997 ao pacote base. SaaS, integrações e projetos maiores: valor sob consulta.</p><p>Os prazos começam após o alinhamento e recebimento das informações. Ajustes e aprovação dentro do período combinado; funcionalidades extras têm prazo definido na proposta.</p><a class="profile-text-link" :href="waLink('Olá, Thierry! Quero conversar sobre um site por R$ 600.')" target="_blank" rel="noopener noreferrer">Conversar no WhatsApp <span aria-hidden="true">↗</span></a></section></div>
  </main>
</template>
