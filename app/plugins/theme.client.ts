// Sem escolha salva, o tema acompanha o sistema também quando ele muda com a página aberta
export default defineNuxtPlugin(() => {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', (e) => {
    let saved: string | null = null
    try { saved = localStorage.getItem('theme') } catch {}
    if (!saved) document.documentElement.classList.toggle('dark', e.matches)
  })
})
