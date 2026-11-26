<script setup lang="ts">
// Etiqueta técnica de abertura de seção: [ 02 ] NOME ............ metadado
defineProps<{ index: string, label: string, meta?: string }>()
</script>

<template>
  <div class="t-label flex items-center justify-between gap-4 border-t border-line pt-3 text-ink">
    <p class="flex items-center gap-3">
      <span class="inline-block size-2 bg-accent" aria-hidden="true" />
      <span class="tabular-nums">{{ index }}</span>
      <span aria-hidden="true" class="text-muted">/</span>
      <span>{{ label }}</span>
    </p>
    <p v-if="meta" class="text-right text-muted">{{ meta }}</p>
  </div>
</template>
