type Tracker = (...args: unknown[]) => void

// Registra um pedido de contato no Pixel do Meta (evento "Contact") e no Google Analytics ("generate_lead").
// Sem os IDs configurados, as funções não existem e nada é enviado.
export function trackLead(source: string): void {
  if (import.meta.server) return
  const w = window as unknown as { fbq?: Tracker, gtag?: Tracker }
  w.fbq?.('track', 'Contact', { content_name: source })
  w.gtag?.('event', 'generate_lead', { method: 'whatsapp', source })
}
