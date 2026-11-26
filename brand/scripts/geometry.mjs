// Geometria da marca THIERRY. — fonte única de verdade para logotipos, símbolo e padrões.
// Tudo é construído sobre uma altura de 100 unidades. Haste vertical = 26, traço horizontal = 22,
// chanfro de 45° = 14. O ponto final é um quadrado de 26 (a mesma largura da haste).

export const COLORS = {
  carbon: '#0D0D0D',
  graphite: '#1C1C1C',
  concrete: '#A1A1A1',
  paper: '#F3F0EA',
  orange: '#FF6A2B',
  white: '#FFFFFF'
}

export const STEM = 26
export const BAR = 22
export const CAP = 100

const n = v => +v.toFixed(2)
export const poly = (points, dx = 0, dy = 0, s = 1) =>
  'M' + points.map(([x, y]) => `${n(x * s + dx)} ${n(y * s + dy)}`).join('L') + 'Z'
export const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]

// Alfabeto próprio (apenas as letras da assinatura). Cada glifo: largura + polígonos.
export const GLYPHS = {
  T: { w: 78, shapes: [[[0, 0], [78, 0], [78, 22], [52, 22], [52, 100], [26, 100], [26, 22], [0, 22]]] },
  H: { w: 84, shapes: [[[0, 0], [26, 0], [26, 39], [58, 39], [58, 0], [84, 0], [84, 100], [58, 100], [58, 61], [26, 61], [26, 100], [0, 100]]] },
  I: { w: 26, shapes: [rect(0, 0, 26, 100)] },
  E: { w: 68, shapes: [[[0, 0], [68, 0], [68, 22], [26, 22], [26, 39], [60, 39], [60, 61], [26, 61], [26, 78], [68, 78], [68, 100], [0, 100]]] },
  R: {
    w: 84,
    shapes: [
      [[0, 0], [68, 0], [82, 14], [82, 47], [68, 61], [59.5, 61], [84, 100], [54, 100], [29, 61], [26, 61], [26, 100], [0, 100]],
      [[26, 22], [56, 22], [56, 39], [26, 39]] // contraforma (fill-rule evenodd)
    ]
  },
  Y: { w: 88, shapes: [[[0, 0], [29, 0], [44, 27], [59, 0], [88, 0], [57, 54], [57, 100], [31, 100], [31, 54]]] }
}

// Espaço depois de cada letra de THIERRY (ajuste óptico, não métrico).
const WORD = [['T', 9], ['H', 10], ['I', 10], ['E', 9], ['R', 5], ['R', 5], ['Y', 0]]

// Wordmark: devolve o path das letras, o retângulo do ponto e as dimensões (562 × 100 em escala 1).
export function wordmark(dx = 0, dy = 0, s = 1) {
  let x = 0
  let d = ''
  let yStart = 0
  for (const [ch, gap] of WORD) {
    const g = GLYPHS[ch]
    if (ch === 'Y') yStart = x
    d += g.shapes.map(p => poly(p, dx + x * s, dy, s)).join('')
    x += g.w + gap
  }
  // O ponto encaixa sob o braço direito do Y: assinatura da marca.
  const dot = { x: n(dx + (yStart + 64) * s), y: n(dy + 74 * s), size: n(26 * s) }
  return { d, dot, width: n((yStart + 90) * s), height: n(100 * s) }
}

// Símbolo "T." — redução do wordmark (86 × 100 em escala 1).
export function symbol(dx = 0, dy = 0, s = 1) {
  return {
    d: GLYPHS.T.shapes.map(p => poly(p, dx, dy, s)).join(''),
    dot: { x: n(dx + 60 * s), y: n(dy + 74 * s), size: n(26 * s) },
    width: n(86 * s),
    height: n(100 * s)
  }
}

// Conceito A — monograma estrutural TA (100 × 100): viga compartilhada, pilar do T e empena do A.
export const MONOGRAM_TA = [[0, 0], [100, 0], [100, 100], [80, 100], [80, 63.6], [60, 100], [40, 100], [84, 20], [32, 20], [32, 100], [10, 100], [10, 20], [0, 20]]

// Conceito C — símbolo modular (100 × 100): malha 4 × 4, módulo 22, junta 4.
const U = 22
const G = 4
const cell = (c, r, cw = 1, rh = 1) => rect(c * (U + G), r * (U + G), cw * U + (cw - 1) * G, rh * U + (rh - 1) * G)
export const MODULAR = {
  dark: [cell(0, 0, 2, 2), cell(2, 0, 2, 1), cell(2, 1), cell(0, 2, 1, 2), cell(1, 2, 2, 2), cell(3, 2)],
  signal: cell(3, 3)
}
