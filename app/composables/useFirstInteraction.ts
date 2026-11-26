// Fica verdadeiro depois da primeira interação do visitante (rolar, tocar, mover o mouse ou teclar).
// Usado para adiar o que não deve competir com o carregamento inicial, como os vídeos dos projetos.
const interacted = ref(false)
let listening = false

export const useFirstInteraction = () => {
  if (import.meta.client && !listening && !interacted.value) {
    listening = true
    const events = ['scroll', 'pointerdown', 'pointermove', 'keydown', 'touchstart'] as const
    const done = () => {
      interacted.value = true
      events.forEach(e => window.removeEventListener(e, done))
    }
    events.forEach(e => window.addEventListener(e, done, { passive: true, once: true }))
  }
  return interacted
}
