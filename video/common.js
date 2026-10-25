// ---------- Utilidades determinísticas ----------
let seedState = 1234567
const rnd = () => { seedState = (seedState * 1664525 + 1013904223) >>> 0; return seedState / 4294967296 }
const hash = (a, b) => { let h = (a * 374761393 + b * 668265263) >>> 0; h = (h ^ (h >>> 13)) * 1274126177 >>> 0; return ((h ^ (h >>> 16)) >>> 0) / 4294967296 }
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const ease = p => 1 - Math.pow(1 - clamp(p, 0, 1), 3)
const easeIO = p => { p = clamp(p, 0, 1); return p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2 }
const span = (t, a, d) => clamp((t - a) / d, 0, 1)
const $ = id => document.getElementById(id)

// Texto que "decodifica": caracteres aleatórios viram o texto final da esquerda para a direita
const GLYPHS = '#%@*+=-:.<>/\\|_ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
const decode = (final, p, frame, hold = 0.35) => {
  if (p <= 0) return ''
  const n = final.length
  const shown = Math.ceil(clamp(p / (1 - hold) , 0, 1) * n)        // quantos caracteres já aparecem (ainda bagunçados)
  const reveal = Math.floor(clamp((p - hold) / (1 - hold), 0, 1) * n) // quantos já estão certos
  let out = ''
  for (let i = 0; i < n; i++) {
    const ch = final[i]
    if (i >= shown) { out += ' '; continue }
    if (i < reveal || ch === ' ') { out += ch; continue }
    out += GLYPHS[Math.floor(hash(i, frame >> 1) * GLYPHS.length)]
  }
  return out
}

// ---------- Campo ASCII (mesma ideia do site, passo fixo por quadro) ----------
const C = 18, W = 1080, H = 1920, cols = Math.ceil(W / C), rows = Math.ceil(H / C), N = cols * rows
let energy = new Float32Array(N), next = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N)
const seedArr = new Float32Array(N).map(() => rnd())
const RAMP = ' .·:-=+*≈%#@'
const ctx = $('c').getContext('2d')
ctx.font = `${Math.round(C * 0.86)}px ui-monospace, "DejaVu Sans Mono", Menlo, monospace`
ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
const INK = '214, 219, 240', ACC = '169, 156, 255'
const splat = (x, y, dx, dy, strength, radius) => {
  const cx = x / C, cy = y / C, rr = radius / C
  const x0 = Math.max(0, Math.floor(cx - rr)), x1 = Math.min(cols - 1, Math.ceil(cx + rr))
  const y0 = Math.max(0, Math.floor(cy - rr)), y1 = Math.min(rows - 1, Math.ceil(cy + rr))
  for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) {
    const d = Math.hypot(i - cx, j - cy) / rr
    if (d > 1) continue
    const f = (1 - d) * (1 - d), k = j * cols + i
    energy[k] = Math.min(1.6, energy[k] + strength * f)
    vx[k] = clamp(vx[k] + dx * f * 0.02, -1.4, 1.4); vy[k] = clamp(vy[k] + dy * f * 0.02, -1.4, 1.4)
  }
}
const ripples = []
const ripple = (x, y, size = 1) => ripples.push({ x, y, t: 0, size })
const stepField = () => {
  for (let q = ripples.length - 1; q >= 0; q--) {
    const rp = ripples[q]; rp.t += 1
    const radius = rp.t * 14 * rp.size, steps = Math.max(16, Math.floor(radius / 7))
    for (let s = 0; s < steps; s++) {
      const a = (s / steps) * Math.PI * 2
      splat(rp.x + Math.cos(a) * radius, rp.y + Math.sin(a) * radius, Math.cos(a) * 30, Math.sin(a) * 30, 0.36 * (1 - rp.t / 46), 30 * rp.size)
    }
    if (rp.t > 46) ripples.splice(q, 1)
  }
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const k = j * cols + i
    const sx = clamp(i - vx[k], 0, cols - 1), sy = clamp(j - vy[k], 0, rows - 1)
    const ix = sx | 0, iy = sy | 0, fx = sx - ix, fy = sy - iy
    const ix1 = Math.min(cols - 1, ix + 1), iy1 = Math.min(rows - 1, iy + 1)
    const a = energy[iy * cols + ix], b = energy[iy * cols + ix1], c = energy[iy1 * cols + ix], d = energy[iy1 * cols + ix1]
    next[k] = ((a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy) * 0.972
    vx[k] *= 0.93; vy[k] *= 0.93
  }
  const tmp = energy; energy = next; next = tmp
}
const drawField = (frame, baseAlpha) => {
  ctx.clearRect(0, 0, W, H)
  const tt = frame * 16.7 * 0.00025
  for (let j = 0; j < rows; j++) {
    const y = j * C + C / 2
    for (let i = 0; i < cols; i++) {
      const k = j * cols + i, e = energy[k]
      if (e >= 0.04) {
        const idx = Math.min(RAMP.length - 1, Math.floor(Math.min(1, e + 0.12) * RAMP.length))
        const al = Math.min(0.85, 0.14 + e * 0.6)
        ctx.fillStyle = `rgba(${e > 0.12 ? ACC : INK},${al.toFixed(2)})`
        ctx.fillText(RAMP[idx], i * C + C / 2, y)
        continue
      }
      const b = 0.5 + 0.5 * Math.sin(i * 0.21 + tt * 3 + Math.sin(j * 0.17 - tt * 2) * 2 + seedArr[k] * 0.8)
      const idx = Math.min(RAMP.length - 1, Math.floor(b * 0.5 * RAMP.length))
      if (idx === 0) continue
      ctx.fillStyle = `rgba(${INK},${((0.12 + b * 0.2) * baseAlpha).toFixed(2)})`
      ctx.fillText(RAMP[idx], i * C + C / 2, y)
    }
  }
}

