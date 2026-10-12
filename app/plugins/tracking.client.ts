// Carrega o Pixel do Meta e o Google Analytics (GA4) quando os IDs estão configurados
// e registra como conversão todo clique em link para o WhatsApp.
export default defineNuxtPlugin(() => {
  const { metaPixelId, gaId } = useRuntimeConfig().public
  const w = window as unknown as Record<string, any>
  const addScript = (src: string) => {
    const s = document.createElement('script')
    s.async = true
    s.src = src
    document.head.appendChild(s)
  }

  if (metaPixelId) {
    const fbq: any = function (...args: unknown[]) {
      fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args)
    }
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    w.fbq = w._fbq = fbq
    addScript('https://connect.facebook.net/en_US/fbevents.js')
    fbq('init', String(metaPixelId))
    fbq('track', 'PageView')
    useRouter().afterEach((to, from) => {
      if (to.path !== from.path) fbq('track', 'PageView')
    })
  }

  if (gaId) {
    w.dataLayer = w.dataLayer || []
    w.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments)
    }
    w.gtag('js', new Date())
    w.gtag('config', String(gaId))
    addScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`)
  }

  document.addEventListener('click', (e) => {
    const link = (e.target as Element | null)?.closest?.('a[href*="wa.me/"]')
    if (!link) return
    const source = link.closest('section[id]')?.id || (link.classList.contains('fab') ? 'botao-flutuante' : 'menu')
    trackLead(source)
  }, { capture: true })
})
