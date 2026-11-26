<script setup lang="ts">
// "Carimbo" de prancha técnica: tabela de dados no padrão dos desenhos de engenharia.
// É um dos elementos proprietários do sistema gráfico (site, cases, Instagram e propostas).
defineProps<{ rows: { label: string, value: string, href?: string }[], caption?: string }>()
</script>

<template>
  <div class="title-block">
    <dl>
    <div v-for="row in rows" :key="row.label" class="title-block__row">
      <dt class="t-label text-muted">{{ row.label }}</dt>
      <dd>
        <a v-if="row.href" :href="row.href" class="tb-link" :target="row.href.startsWith('http') ? '_blank' : undefined" :rel="row.href.startsWith('http') ? 'noopener noreferrer' : undefined">{{ row.value }}<span v-if="row.href.startsWith('http')" class="sr-only"> (abre em nova aba)</span></a>
        <template v-else>{{ row.value }}</template>
      </dd>
    </div>
    </dl>
    <p v-if="caption" class="t-label title-block__caption text-muted">{{ caption }}</p>
  </div>
</template>

<style scoped>
.title-block { border: 1px solid var(--rule); font-family: var(--font-heading); font-weight: 500; }
.title-block__row { display: grid; grid-template-columns: minmax(5.5rem, 30%) 1fr; border-bottom: 1px solid var(--rule); }
.title-block__row:last-child { border-bottom: 0; }
.title-block__row dt { padding: 0.8rem 0.9rem; border-right: 1px solid var(--rule); align-self: stretch; display: flex; align-items: center; }
.title-block__row dd { padding: 0.7rem 0.9rem; min-width: 0; overflow-wrap: anywhere; font-size: clamp(0.8125rem, 0.72rem + 0.4vw, 0.9375rem); }
.tb-link { background: linear-gradient(var(--color-signal), var(--color-signal)) 0 100% / 0 2px no-repeat; transition: background-size 0.35s var(--ease-brand); }
.tb-link:hover { background-size: 100% 2px; }
.title-block__caption { padding: 0.6rem 0.9rem; border-top: 1px solid var(--rule); }
</style>
