// Faz os blocos da página aparecerem suavemente conforme o visitante rola.
// Só esconde o que ainda está fora da tela, então nada "pisca" no carregamento.
const SELECTOR = [
  '.sales-section-title', '.sales-steps li', '.sales-project', '.sales-includes>li', '.sales-price-card',
  '.sales-extras>div', '.sales-about>*', '.profile-questions details', '.sales-close>*',
  '.profile-project', '.profile-detail-heading'
].join(',')

export default defineNuxtPlugin((nuxtApp) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      e.target.classList.add('is-visible')
      io.unobserve(e.target)
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })

  const setup = () => {
    const els = document.querySelectorAll<HTMLElement>(SELECTOR)
    const groups = new Map<Element | null, number>()
    els.forEach((el) => {
      if (el.classList.contains('reveal')) return
      if (el.getBoundingClientRect().top < window.innerHeight) return
      // Itens irmãos entram em sequência
      const i = groups.get(el.parentElement) ?? 0
      groups.set(el.parentElement, i + 1)
      el.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 90}ms`)
      el.classList.add('reveal')
      io.observe(el)
    })
  }

  nuxtApp.hook('page:finish', () => { requestAnimationFrame(setup) })
  nuxtApp.hook('app:mounted', () => { requestAnimationFrame(setup) })
})
