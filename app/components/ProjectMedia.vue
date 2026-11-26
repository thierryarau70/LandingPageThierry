<script setup lang="ts">
// Imagem real do projeto. Quando há vídeo, mostra o site em uso enquanto o bloco está na tela
// (depois da primeira interação); com movimento reduzido ou sem JavaScript fica a captura estática.
import type { ProjectImage } from '~/data/projects'

const props = withDefaults(defineProps<{ image: ProjectImage, video?: string, eager?: boolean, sizes?: string }>(), { eager: false })
const el = ref<HTMLVideoElement>()
const playing = ref(false)
const interacted = useFirstInteraction()
let io: IntersectionObserver | undefined

// O vídeo só é montado depois da primeira interação: até lá a captura estática é a imagem da página.
async function start() {
  if (playing.value || !props.video || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
  playing.value = true
  await nextTick()
  const v = el.value
  if (!v) return
  io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) v.play().catch(() => {}); else v.pause() }, { threshold: 0.25 })
  io.observe(v)
}
onMounted(() => { if (interacted.value) start() })
watch(interacted, on => on && start())
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <span class="media-wrap">
    <img class="media" :src="image.src" :alt="image.alt" :width="image.width" :height="image.height" :loading="eager ? undefined : 'lazy'" :fetchpriority="eager ? 'high' : undefined" decoding="async">
    <!-- o vídeo entra por cima da captura, que continua sendo a imagem principal da página (LCP) -->
    <video v-if="playing" ref="el" class="media media--video" :src="video" aria-hidden="true" :width="image.width" :height="image.height" muted loop playsinline preload="none" />
  </span>
</template>

<style scoped>
.media-wrap { position: relative; display: block; width: 100%; height: 100%; }
.media { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
.media--video { position: absolute; inset: 0; }
</style>
