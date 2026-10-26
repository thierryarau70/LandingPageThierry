<script setup lang="ts">
// Miniatura de projeto: quando há vídeo, mostra o site em uso, tocando só enquanto o card aparece na tela.
// Sem vídeo, ou para quem prefere movimento reduzido, fica o print.
const props = defineProps<{ image: string, video?: string, alt: string, lazy?: boolean }>()
const el = ref<HTMLVideoElement>()
const playing = ref(false)
let io: IntersectionObserver | undefined
onMounted(async () => {
  if (!props.video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  playing.value = true
  await nextTick()
  const v = el.value
  if (!v) return
  io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) v.play().catch(() => {}); else v.pause() }, { threshold: 0.25 })
  io.observe(v)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <video v-if="playing" ref="el" :src="video" :poster="image" :aria-label="alt" width="1200" height="616" muted loop playsinline preload="none" />
  <img v-else :src="image" :alt="alt" width="1200" height="616" :loading="lazy === false ? undefined : 'lazy'">
</template>
