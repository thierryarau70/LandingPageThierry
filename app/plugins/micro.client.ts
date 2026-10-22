// Micro-interações: títulos que "decodificam" em ASCII ao aparecer e ao passar o mouse,
// e botões magnéticos que puxam levemente em direção ao cursor.
const GLYPHS = '#%@*+=-:.<>/\\|_ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'

function scramble(el: HTMLElement, duration = 650) {
  const final = el.dataset.scrambleText ?? el.textContent ?? ''
  el.dataset.scrambleText = final
  if ((el as any)._scrambling) return
  ;(el as any)._scrambling = true
  const start = performance.now()
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration)
    const reveal = Math.floor(p * final.length)
    let out = ''
    for (let i = 0; i < final.length; i++) {
      const ch = final[i]
      out += i < reveal || ch === ' ' || ch === '\n' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
    }
    el.textContent = out
    if (p < 1) requestAnimationFrame(tick)
    else { el.textContent = final; (el as any)._scrambling = false }
  }
  requestAnimationFrame(tick)
}

export default defineNuxtPlugin((nuxtApp) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const setup = () => {
    // Só elementos de texto puro, para não quebrar links e ícones internos
    const targets = document.querySelectorAll<HTMLElement>('.profile-nav a, .sales-section-title h2, .sales-about h2, .sales-close h2, .sales-project h3')
    targets.forEach((el) => {
      if (el.dataset.scrambleReady) return
      const textEl = el.children.length === 0 ? el : null
      if (!textEl) {
        // h3 do projeto tem uma seta: embrulha só o texto
        const node = [...el.childNodes].find(n => n.nodeType === 3 && n.textContent?.trim())
        if (!node) return
        const span = document.createElement('span')
        span.textContent = node.textContent!.trim()
        el.replaceChild(span, node)
        el.dataset.scrambleReady = '1'
        el.addEventListener('mouseenter', () => scramble(span, 450))
        return
      }
      el.dataset.scrambleReady = '1'
      el.addEventListener('mouseenter', () => scramble(el, 450))
      if (el.tagName === 'H2') {
        const io = new IntersectionObserver(([e]) => {
          if (e?.isIntersecting) { scramble(el, 900); io.disconnect() }
        }, { threshold: 0.6 })
        io.observe(el)
      }
    })

    if (!fine) return
    document.querySelectorAll<HTMLElement>('.sales-button').forEach((btn) => {
      if (btn.dataset.magnetic) return
      btn.dataset.magnetic = '1'
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width / 2) / (r.width / 2)
        const y = (e.clientY - r.top - r.height / 2) / (r.height / 2)
        btn.style.setProperty('--mx', `${(x * 8).toFixed(1)}px`)
        btn.style.setProperty('--my', `${(y * 6).toFixed(1)}px`)
      })
      btn.addEventListener('pointerleave', () => {
        btn.style.setProperty('--mx', '0px'); btn.style.setProperty('--my', '0px')
      })
    })
  }

  // Só mexe no DOM depois que a hidratação terminou, para não causar diferenças com o HTML do servidor
  onNuxtReady(() => {
    setup()
    nuxtApp.hook('page:finish', () => { setTimeout(setup, 50) })
  })
})
