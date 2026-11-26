<script setup lang="ts">
import { nav, site, waLink, waMessages } from '~/data/site'

const route = useRoute()
const open = ref(false)
const active = ref('')
const toggle = ref<HTMLButtonElement>()
const panel = ref<HTMLElement>()

const linkTo = (hash: string) => ({ path: '/', hash })

const close = (restoreFocus = true) => {
  if (!open.value) return
  open.value = false
  if (restoreFocus) nextTick(() => toggle.value?.focus())
}
watch(() => route.fullPath, () => close(false))
watch(open, (isOpen) => {
  if (import.meta.server) return
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) nextTick(() => panel.value?.querySelector<HTMLElement>('a')?.focus())
})

// Mantém o foco dentro do menu enquanto ele está aberto
const onKeydown = (e: KeyboardEvent) => {
  if (!open.value) return
  if (e.key === 'Escape') return close()
  if (e.key !== 'Tab' || !panel.value) return
  const items = [toggle.value!, ...panel.value.querySelectorAll<HTMLElement>('a, button')]
  const first = items[0]!
  const last = items[items.length - 1]!
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
}

// Destaca no menu a seção que está na tela (somente na página inicial)
let spy: IntersectionObserver | undefined
const watchSections = () => {
  spy?.disconnect()
  active.value = ''
  if (route.path !== '/' || !('IntersectionObserver' in window)) return
  spy = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) active.value = `#${e.target.id}`
  }, { rootMargin: '-45% 0px -50% 0px' })
  nav.forEach(({ hash }) => { const el = document.querySelector(hash); if (el) spy!.observe(el) })
}
onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  watchSections()
})
watch(() => route.path, () => nextTick(() => setTimeout(watchSections, 400)))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  spy?.disconnect()
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="theme-paper site-header sticky top-0 z-50 border-b border-line">
    <div class="wrap flex h-(--header-h) items-stretch">
      <NuxtLink :to="{ path: '/' }" class="flex items-center pr-6 lg:pr-10" :aria-label="`${site.brand} — página inicial`" @click="close(false)">
        <BrandMark variant="lockup" class="h-3.5 w-auto sm:h-4 xl:h-[1.15rem]" />
      </NuxtLink>

      <p class="t-label hidden items-center whitespace-nowrap border-l border-line px-6 text-muted 2xl:flex">{{ site.tagline }}</p>

      <nav class="ml-auto hidden items-stretch lg:flex" aria-label="Navegação principal">
        <NuxtLink v-for="(item, i) in nav" :key="item.hash" :to="linkTo(item.hash)" class="nav-link t-label" :aria-current="active === item.hash ? 'location' : undefined">
          <span class="text-muted tabular-nums" aria-hidden="true">0{{ i + 1 }}</span>{{ item.label }}
        </NuxtLink>
      </nav>

      <NuxtLink :to="linkTo('#contato')" class="header-cta t-label">
        Iniciar um projeto <ArrowIcon dir="up-right" class="text-[1.1em]" />
      </NuxtLink>

      <button ref="toggle" type="button" class="menu-toggle t-label" :aria-expanded="open" aria-controls="menu-mobile" @click="open = !open">
        <span>{{ open ? 'Fechar' : 'Menu' }}</span>
        <span class="menu-icon" :class="{ 'is-open': open }" aria-hidden="true"><i /><i /></span>
      </button>
    </div>

    <div id="menu-mobile" ref="panel" class="theme-carbon mobile-menu lg:hidden" :class="{ 'is-open': open }" :inert="!open" role="dialog" aria-modal="true" aria-label="Menu">
      <nav class="wrap flex flex-1 flex-col justify-center" aria-label="Navegação principal">
        <NuxtLink v-for="(item, i) in nav" :key="item.hash" :to="linkTo(item.hash)" class="mobile-link" :style="{ '--i': i }" @click="close(false)">
          <span class="t-label text-accent tabular-nums">0{{ i + 1 }}</span>
          <span class="t-display">{{ item.label }}<span class="dot" aria-hidden="true" /></span>
        </NuxtLink>
      </nav>
      <div class="wrap grid gap-3 pb-6">
        <BrutalistButton :to="'/#contato'" size="lg" block arrow="up-right" @click="close(false)">Iniciar um projeto</BrutalistButton>
        <div class="t-label flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-4 text-muted">
          <a :href="waLink(waMessages.start)" target="_blank" rel="noopener noreferrer" class="text-ink">WhatsApp {{ site.contact.whatsappLabel }}</a>
          <span>{{ site.location.city }} — {{ site.location.state }} / {{ site.location.country }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  position: relative; display: flex; white-space: nowrap; align-items: center; gap: 0.6em; padding-inline: clamp(0.85rem, 1.4vw, 1.5rem);
  border-left: 1px solid var(--rule); transition: background-color 0.25s, color 0.25s;
}
.nav-link::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 4px; background: var(--color-signal);
  transform: scaleX(0); transform-origin: left; transition: transform 0.35s var(--ease-brand);
}
.nav-link:hover { background: var(--color-carbon); color: var(--color-paper); }
.nav-link:hover span { color: var(--color-concrete); }
.nav-link[aria-current]::after { transform: none; }
.header-cta {
  display: none; margin-left: auto; white-space: nowrap; align-items: center; gap: 0.75em; padding-inline: clamp(1rem, 1.6vw, 1.75rem);
  background: var(--color-signal); color: var(--color-carbon); border-left: 1px solid var(--rule);
  transition: background-color 0.25s, color 0.25s;
}
.header-cta:hover { background: var(--color-carbon); color: var(--color-paper); }
.header-cta svg { transition: transform 0.35s var(--ease-brand); }
.header-cta:hover svg { transform: translate3d(0.15rem, -0.15rem, 0); }
@media (width >= 32rem) { .header-cta { display: flex; } }
@media (width >= 64rem) { .header-cta { margin-left: 0; } .menu-toggle { display: none !important; } }
@media (width < 32rem) { .menu-toggle { margin-left: auto; } }
.menu-toggle { display: flex; align-items: center; gap: 0.85em; padding-inline: 1rem; margin-right: calc(var(--gutter) * -1); border-left: 1px solid var(--rule); min-width: 6.75rem; justify-content: space-between; }
.menu-icon { position: relative; display: block; width: 1.25rem; height: 0.625rem; }
.menu-icon i { position: absolute; left: 0; right: 0; height: 2px; background: currentColor; transition: transform 0.35s var(--ease-brand), top 0.35s var(--ease-brand); }
.menu-icon i:first-child { top: 0; }
.menu-icon i:last-child { top: calc(100% - 2px); }
.menu-icon.is-open i { top: calc(50% - 1px); }
.menu-icon.is-open i:first-child { transform: rotate(45deg); }
.menu-icon.is-open i:last-child { transform: rotate(-45deg); }

.mobile-menu {
  position: fixed; inset: var(--header-h) 0 0 0; display: flex; flex-direction: column; overflow-y: auto;
  clip-path: inset(0 0 100% 0); visibility: hidden;
  transition: clip-path 0.5s var(--ease-brand), visibility 0s 0.5s;
}
.mobile-menu.is-open { clip-path: inset(0); visibility: visible; transition: clip-path 0.5s var(--ease-brand), visibility 0s; }
.mobile-link {
  display: grid; grid-template-columns: 2.25rem 1fr; align-items: baseline; gap: 0.5rem; padding-block: 0.7rem;
  border-bottom: 1px solid var(--rule); font-size: clamp(2.1rem, 11.5vw, 4.5rem); line-height: 0.95;
  opacity: 0; transform: translate3d(0, 1rem, 0); transition: opacity 0.4s, transform 0.5s var(--ease-brand);
}
.mobile-link:first-child { border-top: 1px solid var(--rule); }
.mobile-menu.is-open .mobile-link { opacity: 1; transform: none; transition-delay: calc(0.12s + var(--i) * 50ms); }
.mobile-link .dot { opacity: 0; transition: opacity 0.2s; }
.mobile-link:active .dot, .mobile-link:hover .dot { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .mobile-link { opacity: 1; transform: none; } }
</style>
