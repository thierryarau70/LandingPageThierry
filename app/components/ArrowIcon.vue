<script setup lang="ts">
withDefaults(defineProps<{ dir?: 'right' | 'up-right' | 'down' | 'left' | 'plus' }>(), { dir: 'right' })
const paths: Record<string, string> = {
  right: 'M2 12h19M13 4l8 8-8 8',
  left: 'M22 12H3M11 4l-8 8 8 8',
  'up-right': 'M5 19 19 5M8 5h11v11',
  down: 'M12 2v19M4 13l8 8 8-8',
  plus: 'M12 3v18M3 12h18'
}
</script>

<template>
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true" focusable="false"><path :d="paths[dir]" /></svg>
</template>
