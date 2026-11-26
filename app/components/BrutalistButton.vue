<script setup lang="ts">
// Botão retangular com célula de seta. Renderiza <NuxtLink>, <a> ou <button> conforme as props.
const props = withDefaults(defineProps<{
  to?: string
  href?: string
  variant?: 'signal' | 'solid' | 'outline'
  size?: 'md' | 'lg'
  arrow?: 'right' | 'up-right' | 'down'
  type?: 'button' | 'submit'
  block?: boolean
}>(), { variant: 'signal', size: 'md', arrow: 'right', type: 'button', block: false })

const external = computed(() => !!props.href && /^https?:/.test(props.href))
const tag = computed(() => (props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button'))
const attrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return external.value ? { href: props.href, target: '_blank', rel: 'noopener noreferrer' } : { href: props.href }
  return { type: props.type }
})
</script>

<template>
  <component :is="tag" v-bind="attrs" class="btn" :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]">
    <span class="btn__label"><slot /><span v-if="external" class="sr-only"> (abre em nova aba)</span></span>
    <span class="btn__arrow" aria-hidden="true"><ArrowIcon :dir="arrow" /></span>
  </component>
</template>

<style scoped>
.btn {
  --b-bg: var(--color-signal); --b-fg: var(--color-carbon); --b-line: var(--color-signal);
  --b-hover-bg: var(--fg); --b-hover-fg: var(--bg);
  position: relative; isolation: isolate; overflow: hidden;
  display: inline-flex; align-items: stretch; min-height: 3.25rem;
  border: 1px solid var(--b-line); background: var(--b-bg); color: var(--b-fg);
  font-family: var(--font-heading); font-weight: 700; font-size: 0.875rem; line-height: 1.15;
  letter-spacing: 0.04em; text-transform: uppercase; text-align: left; cursor: pointer;
  transition: color 0.3s var(--ease-brand), border-color 0.3s var(--ease-brand);
}
.btn::before {
  content: ''; position: absolute; inset: 0; z-index: -1; background: var(--b-hover-bg);
  transform: translate3d(0, 101%, 0); transition: transform 0.4s var(--ease-brand);
}
.btn:hover, .btn:focus-visible { color: var(--b-hover-fg); border-color: var(--b-hover-bg); }
.btn:hover::before, .btn:focus-visible::before { transform: none; }
.btn__label { display: flex; align-items: center; flex: 1; padding: 0.75rem 1.15rem; }
.btn__arrow { display: grid; place-items: center; width: 3.25rem; flex: none; border-left: 1px solid currentColor; font-size: 1.05rem; overflow: hidden; }
.btn__arrow svg { transition: transform 0.4s var(--ease-brand); }
.btn:hover .btn__arrow svg { transform: translate3d(0.2rem, 0, 0); }
.btn--lg { min-height: 4rem; font-size: 0.9375rem; }
.btn--lg .btn__label { padding-inline: 1.5rem; }
.btn--lg .btn__arrow { width: 4rem; font-size: 1.2rem; }
.btn--block { display: flex; width: 100%; }
.btn--solid { --b-bg: var(--fg); --b-fg: var(--bg); --b-line: var(--fg); --b-hover-bg: var(--color-signal); --b-hover-fg: var(--color-carbon); }
.btn--outline { --b-bg: transparent; --b-fg: var(--fg); --b-line: var(--fg); --b-hover-bg: var(--fg); --b-hover-fg: var(--bg); }
</style>
