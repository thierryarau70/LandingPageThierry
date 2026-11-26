<script setup lang="ts">
// Malha estrutural visível: 12 colunas (4 no celular). Puramente decorativa.
withDefaults(defineProps<{ marks?: boolean }>(), { marks: false })
</script>

<template>
  <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
    <div class="wrap h-full">
      <div class="grid-12 h-full">
        <span v-for="n in 12" :key="n" class="col" :class="{ 'max-md:hidden': n > 4 }" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.col { border-left: 1px solid var(--hair); height: 100%; }
.col:last-child, .col:nth-child(4) { border-right: 1px solid var(--hair); }
@media (width >= 48rem) { .col:nth-child(4) { border-right: 0; } }
</style>
