<script setup lang="ts">
import { nav, site, waLink, waMessages } from '~/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="theme-paper relative overflow-clip border-t border-line">
    <div class="wrap">
      <div class="grid-12 gap-y-10 py-12 md:py-16">
        <div class="col-span-4 md:col-span-4">
          <p class="t-label text-muted">Assinatura</p>
          <p class="t-heading mt-3 text-title leading-[1.05]">Design. Software.<br>Inteligência.</p>
          <p class="mt-4 max-w-[34ch] text-small text-muted">Sites, sistemas personalizados e soluções com inteligência artificial, de {{ site.location.city }} para todo o Brasil.</p>
        </div>

        <nav class="col-span-2 md:col-span-2 md:col-start-6" aria-label="Rodapé">
          <p class="t-label text-muted">Navegação</p>
          <ul class="mt-3 grid gap-0.5">
            <li v-for="item in nav" :key="item.hash"><NuxtLink class="foot-link" :to="{ path: '/', hash: item.hash }">{{ item.label }}</NuxtLink></li>
            <li><NuxtLink class="foot-link" to="/projetos">Todos os projetos</NuxtLink></li>
          </ul>
        </nav>

        <div class="col-span-4 max-md:order-last md:col-span-3">
          <p class="t-label text-muted">Contato</p>
          <ul class="mt-3 grid gap-0.5">
            <li><a class="foot-link" :href="waLink(waMessages.start)" target="_blank" rel="noopener noreferrer">WhatsApp {{ site.contact.whatsappLabel }}<span class="sr-only"> (abre em nova aba)</span></a></li>
            <li><a class="foot-link break-all" :href="`mailto:${site.contact.email}`">{{ site.contact.email }}</a></li>
            <li v-for="s in site.social" :key="s.id"><a class="foot-link" :href="s.url" target="_blank" rel="noopener noreferrer me">{{ s.label }} {{ s.handle }}<span class="sr-only"> (abre em nova aba)</span></a></li>
          </ul>
        </div>

        <div class="col-span-2 md:col-span-2">
          <p class="t-label text-muted">Base</p>
          <address class="mt-3 grid gap-1.5 not-italic">
            <span>{{ site.location.city }} — {{ site.location.state }}</span>
            <span>{{ site.location.country }}</span>
            <span class="t-label text-muted">{{ site.location.coords.label }}</span>
          </address>
        </div>
      </div>
    </div>

    <div class="wrap">
      <NuxtLink :to="{ path: '/' }" class="block border-t border-line pt-6 md:pt-10" :aria-label="`${site.brand} — voltar ao início`">
        <BrandMark variant="stacked" class="h-auto w-full" />
      </NuxtLink>
    </div>

    <div class="wrap">
      <div class="t-label mt-6 flex flex-col gap-3 border-t border-line py-5 text-muted md:mt-10 md:flex-row md:items-center md:justify-between">
        <p class="text-ink">{{ site.signature }}</p>
        <p>© {{ year }} {{ site.name }} · CNPJ {{ site.cnpj }}</p>
        <p class="flex gap-5">
          <NuxtLink class="foot-link" to="/privacidade">Política de privacidade</NuxtLink>
          <a class="foot-link" href="#topo">Topo ↑</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.foot-link { display: inline-block; padding-block: 0.35rem; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size 0.35s var(--ease-brand), color 0.2s; }
.foot-link:hover { background-size: 100% 1px; color: var(--accent-ink); }
</style>
