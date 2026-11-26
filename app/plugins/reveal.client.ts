// Revelação progressiva ao rolar. O conteúdo já vem visível do servidor: só é escondido o que
// ainda está abaixo da dobra quando o JavaScript assume, então nada "pisca" e nada some sem JS.
// O estado fica em atributos (data-in / data-reveal-ready), nunca em classes: o Vue reescreve o
// atributo class quando uma classe dinâmica muda e apagaria a marca de "já revelado".
export default defineNuxtPlugin((nuxtApp) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      ;(e.target as HTMLElement).dataset.in = '1'
      io.unobserve(e.target)
    }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 })

  const setup = () => {
    const groups = new Map<Element | null, number>()
    document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal-ready])').forEach((el) => {
      el.dataset.revealReady = '1'
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) { el.dataset.in = '1'; return }
      // Irmãos entram em sequência
      const i = groups.get(el.parentElement) ?? 0
      groups.set(el.parentElement, i + 1)
      el.style.setProperty('--reveal-delay', `${Math.min(i, 5) * 80}ms`)
      io.observe(el)
    })
    document.documentElement.classList.add('has-reveal')
  }

  let queued = false
  const schedule = () => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => { queued = false; setup() })
  }

  nuxtApp.hook('app:mounted', () => {
    schedule()
    // Elementos que entram depois (filtros, listas que mudam) também precisam ser preparados
    new MutationObserver((records) => {
      if (records.some(r => r.addedNodes.length)) schedule()
    }).observe(document.body, { childList: true, subtree: true })
  })
  nuxtApp.hook('page:finish', schedule)
  nuxtApp.hook('page:transition:finish', schedule)
})
