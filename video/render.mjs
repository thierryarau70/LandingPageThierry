// Renders promo.html frame by frame (deterministic) and pipes into ffmpeg.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dir = path.dirname(fileURLToPath(import.meta.url))
const [out = path.join(dir, 'promo.mp4'), fpsArg = '30', durArg = '28', only] = process.argv.slice(2)
const fps = Number(fpsArg), duration = Number(durArg)

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--ignore-certificate-errors'], proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' } : undefined })
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
await page.goto('file://' + path.join(dir, 'promo.html'), { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.evaluate(() => document.getAnimations().forEach(a => a.pause()))
const seek = t => page.evaluate(ms => { for (const a of document.getAnimations()) a.currentTime = ms }, t * 1000)

if (only) { // single still: node render.mjs still.png 30 28 <seconds>
  await seek(Number(only)); await page.screenshot({ path: out }); await browser.close(); process.exit(0)
}

const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] })
const total = Math.round(fps * duration)
for (let i = 0; i < total; i++) {
  await seek(i / fps)
  const buf = await page.screenshot({ type: 'jpeg', quality: 92 })
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r))
  if (i % 120 === 0) console.log(`frame ${i}/${total}`)
}
ff.stdin.end()
await new Promise(r => ff.on('close', r))
await browser.close()
console.log('done', out)
