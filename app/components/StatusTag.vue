<script setup lang="ts">
defineProps<{ status: string }>()
</script>

<template>
  <span class="t-label inline-flex items-center gap-2 whitespace-nowrap">
    <span class="inline-block size-2" :class="status === 'Em desenvolvimento' ? 'border border-current' : 'bg-accent'" aria-hidden="true" />{{ status }}
  </span>
</template>
