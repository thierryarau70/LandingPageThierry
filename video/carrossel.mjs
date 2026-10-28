// Carrossel do Instagram (1080×1350) a partir do vídeo "ia": cada cena, já com a animação completa, vira um slide.
// Uso: node video/carrossel.mjs   (depois de VIDEO=ia bash video/build-motion.sh)   Resultado: video/out/ia/carrossel/slide-01.png …
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
const dir = path.dirname(new URL(import.meta.url).pathname)
const out = path.join(dir, 'out/ia/carrossel'); fs.mkdirSync(out, { recursive: true })
const narr = JSON.parse(fs.readFileSync(path.join(dir, 'out/ia/narracao.json'), 'utf8'))
// fim de cada cena (antes do fade de saída), com os mesmos LEAD/GAP de build-motion.sh
let t = 0.4; const ends = narr.scenes.map(s => { t += s.duration + 0.5; return Math.round((t - 0.5) * 30) / 30 })
execFileSync('node', ['render.mjs', path.join(out, 'q'), '', ends.join(',')], { cwd: dir, env: { ...process.env, PAGE: 'ia.html?v=ia' }, stdio: 'inherit' })
const frames = ends.map(e => path.join(out, `q-${e}.png`))
const N = frames.length
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } })
for (const [i, f] of frames.entries()) {
  const src = 'data:image/png;base64,' + fs.readFileSync(f).toString('base64')
  // a área útil do quadro vertical (y 110–1730) vai inteira para o slide; atrás, o próprio quadro ampliado e desfocado
  await p.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=block" rel="stylesheet"><style>
    *{margin:0}body{width:1080px;height:1350px;overflow:hidden;background:#05060d;position:relative;font-family:'JetBrains Mono',monospace}
    .bgi{position:absolute;left:-60px;top:-120px;width:1200px;filter:blur(40px) brightness(.55)}
    .crop{position:absolute;left:90px;top:0;width:900px;height:1350px;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
    .crop img{position:absolute;left:0;top:${-110 * 900 / 1080}px;width:900px}
    .n{position:absolute;top:40px;right:48px;font-size:26px;color:#8e96c0;letter-spacing:.08em}
    .sw{position:absolute;bottom:40px;right:48px;font-size:26px;color:#3fe0ff;letter-spacing:.06em}
  </style></head><body><img class="bgi" src="${src}"><div class="crop"><img src="${src}"></div>
  <div class="n">${String(i + 1).padStart(2, '0')}/${N}</div>${i < N - 1 ? '<div class="sw">arraste →</div>' : ''}</body></html>`, { waitUntil: 'networkidle' })
  await p.evaluate(() => document.fonts.ready)
  await p.screenshot({ path: path.join(out, `slide-${String(i + 1).padStart(2, '0')}.png`) })
  fs.unlinkSync(f)
}
await b.close()
console.log(`${N} slides em ${out}`)
