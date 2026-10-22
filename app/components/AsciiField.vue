<script setup lang="ts">
// Campo de caracteres ASCII que reage ao cursor: o movimento deixa um rastro de "vento"
// que se espalha e some aos poucos; o clique solta uma onda. Feito do zero para este site.
const props = withDefaults(defineProps<{ cell?: number, ink?: string, accent?: string }>(), {
  cell: 14,
  ink: '24, 41, 71', // --sales-ink em RGB
  accent: '87, 69, 203' // roxo da marca
})

const canvas = ref<HTMLCanvasElement | null>(null)
const RAMP = ' .·:-=+*≈%#@'

onMounted(() => {
  const el = canvas.value
  if (!el) return
  const ctx = el.getContext('2d')
  if (!ctx) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let cols = 0, rows = 0, w = 0, h = 0, dpr = 1
  let energy = new Float32Array(0), next = new Float32Array(0)
  let vx = new Float32Array(0), vy = new Float32Array(0)
  let seed = new Float32Array(0)
  const C = props.cell

  const resize = () => {
    const r = el.getBoundingClientRect()
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = r.width; h = r.height
    el.width = Math.round(w * dpr); el.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cols = Math.ceil(w / C); rows = Math.ceil(h / C)
    const n = cols * rows
    energy = new Float32Array(n); next = new Float32Array(n)
    vx = new Float32Array(n); vy = new Float32Array(n)
    seed = new Float32Array(n).map(() => Math.random())
    ctx.font = `${Math.round(C * 0.86)}px ui-monospace, SFMono-Regular, Menlo, monospace`
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  }

  // Injeta energia e direção ao redor de um ponto (coordenadas do canvas)
  const splat = (x: number, y: number, dx: number, dy: number, strength: number, radius: number) => {
    const cx = x / C, cy = y / C, rr = radius / C
    const x0 = Math.max(0, Math.floor(cx - rr)), x1 = Math.min(cols - 1, Math.ceil(cx + rr))
    const y0 = Math.max(0, Math.floor(cy - rr)), y1 = Math.min(rows - 1, Math.ceil(cy + rr))
    for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) {
      const d = Math.hypot(i - cx, j - cy) / rr
      if (d > 1) continue
      const f = (1 - d) * (1 - d)
      const k = j * cols + i
      energy[k] = Math.min(1.6, energy[k]! + strength * f)
      // velocidade limitada: o rastro escorre sem ser varrido para fora
      vx[k] = Math.max(-1.4, Math.min(1.4, vx[k]! + dx * f * 0.02)); vy[k] = Math.max(-1.4, Math.min(1.4, vy[k]! + dy * f * 0.02))
    }
  }

  const ripples: { x: number, y: number, t: number }[] = []
  let px = -1, py = -1, lastMove = 0, t = 0

  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left, y = e.clientY - r.top
    if (x < -40 || y < -40 || x > w + 40 || y > h + 40) { px = -1; return }
    if (px >= 0) {
      const dx = x - px, dy = y - py
      const speed = Math.min(Math.hypot(dx, dy), 80)
      splat(x, y, dx, dy, 0.22 + speed * 0.03, 64 + speed * 0.9)
    }
    px = x; py = y; lastMove = performance.now()
  }
  const onDown = (e: PointerEvent) => {
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left, y = e.clientY - r.top
    if (x < 0 || y < 0 || x > w || y > h) return
    ripples.push({ x, y, t: 0 })
  }

  const step = () => {
    // Piloto automático: sem mouse (ex.: celular), um cursor invisível passeia pela área
    if (performance.now() - lastMove > 2600) {
      const ax = w * (0.5 + 0.36 * Math.sin(t * 0.0011) * Math.cos(t * 0.0004))
      const ay = h * (0.5 + 0.32 * Math.sin(t * 0.00075 + 1.3))
      const bx = w * (0.5 + 0.36 * Math.sin((t - 16) * 0.0011) * Math.cos((t - 16) * 0.0004))
      const by = h * (0.5 + 0.32 * Math.sin((t - 16) * 0.00075 + 1.3))
      splat(ax, ay, (ax - bx) * 4, (ay - by) * 4, 0.15, 64)
    }
    for (let q = ripples.length - 1; q >= 0; q--) {
      const rp = ripples[q]!
      rp.t += 1
      const radius = rp.t * 11
      const steps = Math.max(12, Math.floor(radius / 6))
      for (let s = 0; s < steps; s++) {
        const a = (s / steps) * Math.PI * 2
        splat(rp.x + Math.cos(a) * radius, rp.y + Math.sin(a) * radius, Math.cos(a) * 30, Math.sin(a) * 30, 0.32 * (1 - rp.t / 40), 22)
      }
      if (rp.t > 40) ripples.splice(q, 1)
    }
    // Advecção simples: cada célula puxa a energia de onde o "vento" veio
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const k = j * cols + i
      const sx = Math.min(cols - 1, Math.max(0, i - vx[k]!))
      const sy = Math.min(rows - 1, Math.max(0, j - vy[k]!))
      const ix = sx | 0, iy = sy | 0, fx = sx - ix, fy = sy - iy
      const ix1 = Math.min(cols - 1, ix + 1), iy1 = Math.min(rows - 1, iy + 1)
      const a = energy[iy * cols + ix]!, b = energy[iy * cols + ix1]!
      const c = energy[iy1 * cols + ix]!, d = energy[iy1 * cols + ix1]!
      next[k] = ((a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy) * 0.972
      vx[k] = vx[k]! * 0.93; vy[k] = vy[k]! * 0.93
    }
    const tmp = energy; energy = next; next = tmp
  }

  // Estilos pré-calculados (alpha em 20 níveis) para não criar strings a cada célula
  const LEVELS = 20
  const inkStyles = Array.from({ length: LEVELS + 1 }, (_, a) => `rgba(${props.ink},${(a / LEVELS).toFixed(2)})`)
  const accentStyles = Array.from({ length: LEVELS + 1 }, (_, a) => `rgba(${props.accent},${(a / LEVELS).toFixed(2)})`)
  const style = (accent: boolean, alpha: number) => (accent ? accentStyles : inkStyles)[Math.round(Math.min(1, alpha) * LEVELS)]!

  // A textura de fundo muda devagar: é desenhada numa camada separada a cada poucos quadros
  const base = document.createElement('canvas')
  const bctx = base.getContext('2d')!
  let frame = 0
  const drawBase = () => {
    base.width = el.width; base.height = el.height
    bctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    bctx.font = ctx.font; bctx.textAlign = 'center'; bctx.textBaseline = 'middle'
    const tt = t * 0.00025
    for (let j = 0; j < rows; j++) {
      const y = j * C + C / 2
      for (let i = 0; i < cols; i++) {
        const k = j * cols + i
        const b = 0.5 + 0.5 * Math.sin(i * 0.21 + tt * 3 + Math.sin(j * 0.17 - tt * 2) * 2 + seed[k]! * 0.8)
        const idx = Math.min(RAMP.length - 1, Math.floor(b * 0.32 * RAMP.length))
        if (idx === 0) continue
        bctx.fillStyle = style(false, 0.07 + b * 0.08)
        bctx.fillText(RAMP.charAt(idx), i * C + C / 2, y)
      }
    }
  }

  const draw = () => {
    if (frame++ % 4 === 0) drawBase()
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(base, 0, 0, w, h)
    for (let j = 0; j < rows; j++) {
      const y = j * C + C / 2
      for (let i = 0; i < cols; i++) {
        const k = j * cols + i
        const e = energy[k]!
        if (e < 0.04) continue
        const idx = Math.min(RAMP.length - 1, Math.floor(Math.min(1, e + 0.12) * RAMP.length))
        ctx.clearRect(i * C, j * C, C, C)
        ctx.fillStyle = style(e > 0.12, Math.min(0.62, 0.14 + e * 0.6))
        ctx.fillText(RAMP.charAt(idx), i * C + C / 2, y)
      }
    }
  }

  resize()
  if (reduced) { draw(); return }

  let raf = 0, visible = true
  const loop = (now: number) => {
    t = now
    step(); draw()
    raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0
  }
  const start = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop) }

  const io = new IntersectionObserver(([entry]) => { visible = !!entry?.isIntersecting; start() })
  io.observe(el)
  const ro = new ResizeObserver(() => resize())
  ro.observe(el)
  const onVis = () => start()
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onDown, { passive: true })
  document.addEventListener('visibilitychange', onVis)
  start()

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    io.disconnect(); ro.disconnect()
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerdown', onDown)
    document.removeEventListener('visibilitychange', onVis)
  })
})
</script>

<template>
  <canvas ref="canvas" class="ascii-field" aria-hidden="true" />
</template>
