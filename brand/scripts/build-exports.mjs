// Exporta PNGs dos logotipos (brand/exports) e os ativos públicos do site (public/):
// favicons, ícones do manifesto, logo para dados estruturados e a imagem Open Graph.
// Uso: node brand/scripts/build-logos.mjs && node brand/scripts/build-exports.mjs
// Requer Playwright (global ou no projeto) para rasterizar.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { COLORS, MODULAR, poly } from './geometry.mjs'

const { chromium } = createRequire(import.meta.url)('playwright')
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const logos = path.join(root, 'brand/logos')
const exportsDir = path.join(root, 'brand/exports')
const pub = path.join(root, 'public')
fs.mkdirSync(exportsDir, { recursive: true })
fs.mkdirSync(path.join(pub, 'brand'), { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage()

// Rasteriza um SVG. `pad` é a área de proteção, em fração da altura do logotipo.
async function png(svgFile, outFile, { width, pad = 0, bg = 'transparent', square = false }) {
  const svg = fs.readFileSync(path.join(logos, svgFile), 'utf8')
  const [, , vw, vh] = svg.match(/viewBox="([\d.\s-]+)"/)[1].split(/\s+/).map(Number)
  const p = Math.round(pad * (width / vw) * vh)
  const w = Math.round(width + p * 2)
  const h = square ? w : Math.round((width / vw) * vh + p * 2)
  await page.setViewportSize({ width: w, height: h })
  await page.setContent(`<body style="margin:0;width:${w}px;height:${h}px;display:grid;place-items:center;background:${bg}"><div style="width:${width}px;line-height:0">${svg.replace(/width="[\d.]+" height="[\d.]+"/, 'width="100%"')}</div></body>`)
  await page.screenshot({ path: outFile, omitBackground: bg === 'transparent' })
  console.log('png', path.relative(root, outFile), `${w}×${h}`)
}

// ---- brand/exports ---------------------------------------------------------------------------
await png('primary-on-dark.svg', path.join(exportsDir, 'logo-dark.png'), { width: 2000, pad: 0.38 })
await png('primary.svg', path.join(exportsDir, 'logo-light.png'), { width: 2000, pad: 0.38 })
await png('horizontal-on-dark.svg', path.join(exportsDir, 'logo-horizontal-dark.png'), { width: 2400, pad: 0.52 })
await png('horizontal.svg', path.join(exportsDir, 'logo-horizontal-light.png'), { width: 2400, pad: 0.52 })
await png('monochrome.svg', path.join(exportsDir, 'logo-monochrome-black.png'), { width: 2000, pad: 0.38 })
await png('monochrome-white.svg', path.join(exportsDir, 'logo-monochrome-white.png'), { width: 2000, pad: 0.38 })
await png('symbol.svg', path.join(exportsDir, 'symbol-light.png'), { width: 1000, pad: 0.13 })
await png('symbol-on-dark.svg', path.join(exportsDir, 'symbol-dark.png'), { width: 1000, pad: 0.13 })
await png('instagram-avatar.svg', path.join(exportsDir, 'instagram-avatar.png'), { width: 1080 })
await png('instagram-avatar-light.svg', path.join(exportsDir, 'instagram-avatar-light.png'), { width: 1080 })
await png('concept-a.svg', path.join(exportsDir, 'concept-a.png'), { width: 1000, pad: 0.26 })
await png('concept-b.svg', path.join(exportsDir, 'concept-b.png'), { width: 2000, pad: 0.38 })
await png('concept-c.svg', path.join(exportsDir, 'concept-c.png'), { width: 1000, pad: 0.26 })
fs.copyFileSync(path.join(logos, 'favicon.svg'), path.join(exportsDir, 'favicon.svg'))

// ---- public/ (site) ---------------------------------------------------------------------------
fs.copyFileSync(path.join(logos, 'favicon.svg'), path.join(pub, 'favicon.svg'))
await png('favicon.svg', path.join(pub, 'favicon-32.png'), { width: 32 })
await png('favicon.svg', path.join(pub, 'apple-touch-icon.png'), { width: 180 })
await png('favicon.svg', path.join(pub, 'icon-192.png'), { width: 192 })
await png('favicon.svg', path.join(pub, 'icon-512.png'), { width: 512 })
await png('primary.svg', path.join(pub, 'brand/logo.png'), { width: 1000, pad: 0.38, bg: COLORS.paper })
await png('symbol-compact.svg', path.join(pub, 'brand/symbol-email.png'), { width: 88 }) // assinatura de e-mail (exibido a 44 × 44)
for (const f of ['primary.svg', 'primary-on-dark.svg', 'symbol.svg']) fs.copyFileSync(path.join(logos, f), path.join(pub, 'brand', f))

fs.writeFileSync(path.join(pub, 'site.webmanifest'), JSON.stringify({
  name: 'THIERRY. Studio',
  short_name: 'THIERRY.',
  lang: 'pt-BR',
  start_url: '/',
  display: 'browser',
  background_color: COLORS.paper,
  theme_color: COLORS.carbon,
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
  ]
}, null, 2) + '\n')

// ---- Open Graph 1200 × 630 --------------------------------------------------------------------
const font = (pkg, file) => 'file://' + path.join(root, 'node_modules', pkg, 'files', file)
const og = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Archivo;src:url(${font('@fontsource-variable/archivo', 'archivo-latin-wght-normal.woff2')});font-weight:100 900}
@font-face{font-family:Mono;src:url(${font('@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff2')});font-weight:500}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:${COLORS.carbon};color:${COLORS.paper};position:relative;overflow:hidden;font-family:Mono;text-transform:uppercase;letter-spacing:.08em;font-size:17px}
.grid{position:absolute;inset:0 48px;display:grid;grid-template-columns:repeat(12,1fr)}
.grid i{border-left:1px solid rgba(243,240,234,.09)}.grid i:last-child{border-right:1px solid rgba(243,240,234,.09)}
.top{position:absolute;left:48px;right:48px;top:44px;display:flex;justify-content:space-between;align-items:center;padding-bottom:22px;border-bottom:1px solid rgba(243,240,234,.3)}
h1{position:absolute;left:44px;top:158px;font:900 118px/0.96 Archivo;letter-spacing:-.045em}
h1 b{display:inline-block;width:.2em;height:.2em;background:${COLORS.orange};margin-left:.045em}
.bottom{position:absolute;left:48px;right:48px;bottom:40px;display:flex;justify-content:space-between;padding-top:20px;border-top:1px solid rgba(243,240,234,.3);color:${COLORS.concrete}}
.bottom span:first-child{color:${COLORS.paper}}
.mosaic{position:absolute;right:48px;top:166px;width:214px;height:214px}
</style></head><body>
<div class="grid">${'<i></i>'.repeat(12)}</div>
<div class="top">${fs.readFileSync(path.join(logos, 'horizontal-on-dark.svg'), 'utf8').replace(/<title>.*?<\/title>/, '').replace(/width="[\d.]+" height="[\d.]+"/, 'height="58"')}<span>Engenharia digital</span></div>
<h1>Design<b></b><br>Software<b></b><br>Inteligência<b></b></h1>
<svg class="mosaic" viewBox="0 0 100 100"><path fill="${COLORS.graphite}" d="${MODULAR.dark.map(c => poly(c)).join('')}"/><path fill="${COLORS.orange}" d="${poly(MODULAR.signal)}"/></svg>
<div class="bottom"><span>Sites · Sistemas · Inteligência artificial</span><span>Boa Vista — RR / Brasil</span><span>thierrystudio.com.br</span></div>
</body></html>`
const ogFile = path.join(os.tmpdir(), 'thierry-og-image.html')
fs.writeFileSync(ogFile, og)
await page.setViewportSize({ width: 1200, height: 630 })
await page.goto('file://' + ogFile)
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: path.join(pub, 'og-image.jpg'), type: 'jpeg', quality: 88 })
console.log('jpg public/og-image.jpg 1200×630')

await browser.close()
