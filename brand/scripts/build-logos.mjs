// Gera os logotipos em SVG vetorial (brand/logos) a partir de geometry.mjs.
// Uso: node brand/scripts/build-logos.mjs
// A palavra "STUDIO" é convertida em contornos (IBM Plex Mono, licença OFL),
// então os arquivos não dependem de fonte instalada.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'
import { COLORS, MODULAR, MONOGRAM_TA, poly, symbol, wordmark } from './geometry.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const out = path.join(root, 'brand/logos')
fs.mkdirSync(out, { recursive: true })

const monoFile = path.join(root, 'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff')
const buf = fs.readFileSync(monoFile)
const mono = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))

// Serializa os comandos do opentype.js (o toPathData dele devolve NaN em alguns arredondamentos).
const f2 = v => +v.toFixed(2)
const pathData = pth => pth.commands.map((c) => {
  if (c.type === 'M' || c.type === 'L') return `${c.type}${f2(c.x)} ${f2(c.y)}`
  if (c.type === 'Q') return `Q${f2(c.x1)} ${f2(c.y1)} ${f2(c.x)} ${f2(c.y)}`
  if (c.type === 'C') return `C${f2(c.x1)} ${f2(c.y1)} ${f2(c.x2)} ${f2(c.y2)} ${f2(c.x)} ${f2(c.y)}`
  return 'Z'
}).join('')

// Texto em contornos. `width` justifica a linha de ponta a ponta; `tracking` (em) define o espaçamento.
export function outline(text, { x = 0, y = 0, size = 20, width, tracking = 0.2 } = {}) {
  const scale = size / mono.unitsPerEm
  const glyphs = [...text].map(ch => mono.charToGlyph(ch))
  const first = glyphs[0]
  const last = glyphs[glyphs.length - 1]
  const lsb = (first.getMetrics().xMin || 0) * scale
  const lastMax = (last.getMetrics().xMax || last.advanceWidth) * scale
  const step = width
    ? (width - lastMax + lsb) / (glyphs.length - 1)
    : mono.charToGlyph('M').advanceWidth * scale + tracking * size
  const d = glyphs.map((g, i) => pathData(g.getPath(+(x - lsb + i * step).toFixed(2), +y.toFixed(2), size))).join('')
  return { d, width: width ?? (glyphs.length - 1) * step + lastMax - lsb, capHeight: (mono.tables.os2.sCapHeight || 698) * scale }
}

const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`
const p = (d, fill) => `<path fill="${fill}" fill-rule="evenodd" d="${d}"/>`
const sq = (dot, fill) => `<rect x="${dot.x}" y="${dot.y}" width="${dot.size}" height="${dot.size}" fill="${fill}"/>`
const write = (name, content) => { fs.writeFileSync(path.join(out, name), content); console.log('logo', name) }

const TITLE = 'THIERRY. Studio'
// Tamanho de fonte para uma altura de maiúscula desejada (IBM Plex Mono: 698/1000)
const capSize = cap => cap / 0.698

// ---- Conceito B (recomendado): wordmark THIERRY. -------------------------------------------
function wordmarkSvg(ink, dotColor) {
  const w = wordmark()
  return svg(w.width, w.height, p(w.d, ink) + sq(w.dot, dotColor), 'THIERRY.')
}

// Versão principal (empilhada): wordmark + fio estrutural + STUDIO alinhado à direita. 562 × 146.
function stacked() {
  const w = wordmark()
  const size = capSize(24)
  const x = w.width - outline('STUDIO', { size, tracking: 0.22 }).width
  return { w, word: outline('STUDIO', { x, y: 146, size, tracking: 0.22 }), rule: { x: 0, y: 132.5, width: +(x - 16).toFixed(1), height: 3 }, height: 146 }
}
function primarySvg(ink, dotColor, sub = ink) {
  const { w, word, rule, height } = stacked()
  return svg(w.width, height, p(w.d, ink) + sq(w.dot, dotColor) + `<rect x="${rule.x}" y="${rule.y}" width="${rule.width}" height="${rule.height}" fill="${sub}"/>` + p(word.d, sub), TITLE)
}

// Versão horizontal: THIERRY. pesado + STUDIO leve, na mesma altura. A caixa tem 2 unidades de folga
// acima e abaixo para as curvas do S e do O, que ultrapassam a linha de base e a altura das maiúsculas.
function horizontal() {
  const w = wordmark()
  const word = outline('STUDIO', { x: w.width + 40, y: 100, size: capSize(100), tracking: 0.02 })
  return { w, word, width: +(w.width + 40 + word.width).toFixed(1) }
}
function horizontalSvg(ink, dotColor, sub = ink) {
  const { w, word, width } = horizontal()
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 ${width} 104" width="${width}" height="104" role="img" aria-label="${TITLE}"><title>${TITLE}</title>${p(w.d, ink) + sq(w.dot, dotColor) + p(word.d, sub)}</svg>\n`
}

function symbolSvg(ink, dotColor) {
  const s = symbol()
  return svg(s.width, s.height, p(s.d, ink) + sq(s.dot, dotColor), 'THIERRY. — símbolo')
}

// Símbolo dentro de um quadrado (favicon, avatar, selos). `pad` em unidades do símbolo.
export function badgeSvg({ size = 512, bg = COLORS.carbon, ink = COLORS.paper, dotColor = COLORS.orange, ratio = 0.5, extra = '' } = {}) {
  const s0 = symbol()
  const scale = (size * ratio) / s0.height
  const s = symbol((size - s0.width * scale) / 2, (size - s0.height * scale) / 2, scale)
  return svg(size, size, `<rect width="${size}" height="${size}" fill="${bg}"/>${extra}` + p(s.d, ink) + sq(s.dot, dotColor), 'THIERRY.')
}

write('wordmark.svg', wordmarkSvg(COLORS.carbon, COLORS.orange))
write('wordmark-on-dark.svg', wordmarkSvg(COLORS.paper, COLORS.orange))
write('primary.svg', primarySvg(COLORS.carbon, COLORS.orange))
write('primary-on-light.svg', primarySvg(COLORS.carbon, COLORS.orange))
write('primary-on-dark.svg', primarySvg(COLORS.paper, COLORS.orange, COLORS.paper))
write('horizontal.svg', horizontalSvg(COLORS.carbon, COLORS.orange))
write('horizontal-on-dark.svg', horizontalSvg(COLORS.paper, COLORS.orange, COLORS.paper))
write('monochrome.svg', primarySvg(COLORS.carbon, COLORS.carbon))
write('monochrome-white.svg', primarySvg(COLORS.white, COLORS.white, COLORS.white))
write('symbol.svg', symbolSvg(COLORS.carbon, COLORS.orange))
write('symbol-on-dark.svg', symbolSvg(COLORS.paper, COLORS.orange))
write('symbol-monochrome.svg', symbolSvg(COLORS.carbon, COLORS.carbon))
write('concept-b.svg', primarySvg(COLORS.carbon, COLORS.orange))

// ---- Conceito A: monograma estrutural TA ---------------------------------------------------
function lockup(markBody, ink, sub) {
  const name = outline('THIERRY STUDIO', { x: 132, y: 43, size: 34, tracking: 0.14 })
  const desc = outline('ENGENHARIA DIGITAL', { x: 132, y: 84, size: 17, tracking: 0.2 })
  const width = 132 + Math.max(name.width, desc.width)
  return svg(+width.toFixed(1), 100, markBody + p(name.d, ink) + `<rect x="132" y="56" width="${(width - 132).toFixed(1)}" height="2" fill="${sub}"/>` + p(desc.d, sub), TITLE)
}
const monoA = p(poly(MONOGRAM_TA), COLORS.carbon)
write('concept-a.svg', svg(100, 100, monoA, 'Monograma TA'))
write('concept-a-lockup.svg', lockup(monoA, COLORS.carbon, COLORS.carbon))

// ---- Conceito C: símbolo modular ------------------------------------------------------------
const modC = p(MODULAR.dark.map(c => poly(c)).join(''), COLORS.carbon) + p(poly(MODULAR.signal), COLORS.orange)
write('concept-c.svg', svg(100, 100, modC, 'Símbolo modular'))
write('concept-c-lockup.svg', lockup(modC, COLORS.carbon, COLORS.carbon))

// ---- Favicon e avatar -------------------------------------------------------------------------
write('favicon.svg', badgeSvg({ size: 64, ratio: 0.62 }))
write('favicon-light.svg', badgeSvg({ size: 64, ratio: 0.62, bg: COLORS.paper, ink: COLORS.carbon }))
// Avatar do Instagram: símbolo dentro da área segura do recorte circular, com marcas de registro.
const tick = (x, y) => `<path d="M${x - 14} ${y}H${x + 14}M${x} ${y - 14}V${y + 14}" stroke="${COLORS.concrete}" stroke-width="2" opacity=".55"/>`
write('instagram-avatar.svg', badgeSvg({ size: 1080, ratio: 0.44, extra: [tick(270, 270), tick(810, 270), tick(270, 810), tick(810, 810)].join('') }))
write('instagram-avatar-light.svg', badgeSvg({ size: 1080, ratio: 0.44, bg: COLORS.paper, ink: COLORS.carbon }))

// ---- Geometria para o site (componente BrandMark): gerado, não editar à mão --------------------
{
  const w = wordmark()
  const s = symbol()
  const h = horizontal()
  const st = stacked()
  const ts = `// Gerado por brand/scripts/build-logos.mjs — não editar à mão.
export const brandWordmark = { width: ${w.width}, height: ${w.height}, path: '${w.d}', dot: ${JSON.stringify(w.dot)} } as const
export const brandSymbol = { width: ${s.width}, height: ${s.height}, path: '${s.d}', dot: ${JSON.stringify(s.dot)} } as const
// THIERRY. Studio: versão horizontal (viewBox 0 -2 largura 104) e empilhada (562 × 146)
export const brandLockup = { width: ${h.width}, studio: '${h.word.d}' } as const
export const brandStacked = { height: ${st.height}, rule: ${JSON.stringify(st.rule)}, studio: '${st.word.d}' } as const
export const brandMonogram = '${poly(MONOGRAM_TA)}'
export const brandModular = { dark: '${MODULAR.dark.map(c => poly(c)).join('')}', signal: '${poly(MODULAR.signal)}' } as const
`
  fs.mkdirSync(path.join(root, 'app/data'), { recursive: true })
  fs.writeFileSync(path.join(root, 'app/data/brand.generated.ts'), ts)
  console.log('data app/data/brand.generated.ts')
}
