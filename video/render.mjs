// Renderiza promo.html quadro a quadro (o campo ASCII avança um passo por quadro) e grava um MP4 mudo.
// Uso: node video/render.mjs <saida.mp4> "<d1,d2,d3,d4,d5>"   (duração de cada cena em segundos)
//      node video/render.mjs <prefixo> "<durações>" "1,5,9"   (salva só prints nesses segundos)
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs'
import { spawn } from 'node:child_process'
import path from 'node:path'
const dir = path.dirname(new URL(import.meta.url).pathname)
const [out, durations, stills] = process.argv.slice(2)
const FPS = 30
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--ignore-certificate-errors'], proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: 'localhost' } : undefined })
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } })
p.on('pageerror', e => { console.error('PAGEERROR', e); process.exit(1) })
await p.goto('file://' + path.join(dir, process.env.PAGE || 'promo.html') + (durations ? `?d=${durations}` : ''), { waitUntil: 'networkidle' })
await p.evaluate(() => document.fonts.ready)
const total = Math.round(FPS * await p.evaluate(() => window.TOTAL))
if (stills) {
  const want = stills.split(',').map(Number)
  for (let i = 0; i < total; i++) { await p.evaluate(f => window.render(f), i); const s = want.find(w => Math.round(w * FPS) === i); if (s !== undefined) await p.screenshot({ path: `${out}-${s}.png` }) }
  await b.close(); process.exit(0)
}
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] })
for (let i = 0; i < total; i++) { await p.evaluate(f => window.render(f), i); const buf = await p.screenshot({ type: 'jpeg', quality: 92 }); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)) }
ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close()
console.log(`vídeo: ${out} (${(total / FPS).toFixed(2)} s)`)
