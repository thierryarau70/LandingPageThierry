// Grava a miniatura em vídeo de um projeto do portfólio, em loop. Dois modos:
// - profundidade > 0: o site rola para baixo e volta ao topo;
// - profundidade 0: só a tela principal, parada, com as animações do próprio site (o fim emenda no começo).
// O tempo da página é controlado (relógio JS e animações CSS avançam 1/30 s por quadro), então o
// resultado fica fluido mesmo que cada print demore para ser tirado.
// Uso: node scripts/gravar-miniatura.mjs <url> <saida.mp4> [profundidade_px=1400] [seletor_para_fechar_aviso]
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs'
import { spawn } from 'node:child_process'
import fs from 'node:fs'

const [url, out, depthArg = '1400', closeSel = ''] = process.argv.slice(2)
const FPS = 30, W = 960, H = 492
const DEPTH = Number(depthArg)
// roteiro (s): parado no topo, desce, parado embaixo, sobe, parado no topo
const HOLD_TOP = 1.0, DOWN = 3.6, HOLD_BOTTOM = 0.8, UP = 3.0, HOLD_END = 0.6
const HERO = DEPTH === 0
const LOOP = 8, FADE = 0.8 // modo tela principal: 8 s de vídeo, com 0,8 s de fusão emendando o fim no começo
const TOTAL = HERO ? LOOP + FADE : HOLD_TOP + DOWN + HOLD_BOTTOM + UP + HOLD_END
const ease = x => 0.5 - Math.cos(Math.PI * x) / 2 // senoide: começa e termina devagar
const scrollAt = t => {
  if (t < HOLD_TOP) return 0
  t -= HOLD_TOP; if (t < DOWN) return ease(t / DOWN) * DEPTH
  t -= DOWN; if (t < HOLD_BOTTOM) return DEPTH
  t -= HOLD_BOTTOM; if (t < UP) return (1 - ease(t / UP)) * DEPTH
  return 0
}

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--ignore-certificate-errors', '--hide-scrollbars'], proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined })
const page = await browser.newPage({ viewport: { width: 1200, height: 616 }, deviceScaleFactor: W / 1200, reducedMotion: 'no-preference' })
await page.clock.install()
// alguns sites mantêm conexões abertas e nunca ficam com a rede ociosa: espera o load e mais um pouco
await page.goto(url, { waitUntil: 'load', timeout: 60000 })
await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {})
await page.addStyleTag({ content: 'html,body{scroll-behavior:auto!important}' })
if (closeSel) await page.click(closeSel, { timeout: 3000 }).catch(() => {})
// percorre a página para carregar imagens preguiçosas e disparar as animações de entrada
for (let y = 0; !HERO && y <= DEPTH + 616; y += 200) { await page.evaluate(v => window.scrollTo(0, v), y); await page.clock.runFor(150); await page.waitForTimeout(60) }
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {})
await page.clock.runFor(2500); await page.waitForTimeout(300)
// trava o relógio da página: daqui em diante o tempo só anda pelo runFor de cada quadro
// (sem isso, o tempo real também passava enquanto cada print era tirado e as animações em JS aceleravam)
await page.clock.pauseAt(await page.evaluate(() => Date.now() + 50))

// a partir daqui as animações CSS só andam quando o gravador manda
const step = ms => page.evaluate(dt => {
  for (const a of document.getAnimations()) {
    // animações ligadas à rolagem (scroll/view timeline) seguem a posição da página sozinhas
    if (a.timeline && !(a.timeline instanceof DocumentTimeline)) continue
    if (a.playState === 'running') a.pause()
    a.currentTime = (Number(a.currentTime) || 0) + dt
  }
}, ms)

const encode = ['-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-g', String(FPS * 2), '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart']
const raw = HERO ? out.replace(/\.mp4$/, '.bruto.mp4') : out
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-vf', `scale=${W}:${H}`, ...(HERO ? ['-c:v', 'libx264', '-crf', '12', '-pix_fmt', 'yuv420p'] : encode), raw],
  { stdio: ['pipe', 'inherit', 'inherit'] })
const N = Math.round(TOTAL * FPS), dt = 1000 / FPS
for (let i = 0; i < N; i++) {
  await page.evaluate(v => window.scrollTo(0, v), Math.round(scrollAt(i / FPS)))
  await page.clock.runFor(dt)
  await step(dt)
  const buf = await page.screenshot({ type: 'jpeg', quality: 92 })
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r))
}
ff.stdin.end(); await new Promise(r => ff.on('close', r)); await browser.close()

if (HERO) {
  // loop sem pulo: os primeiros FADE s viram uma fusão do trecho final (LOOP..LOOP+FADE) com o começo,
  // então o último quadro do vídeo continua naturalmente no primeiro
  const graph = [
    `[0:v]split=3[a][b][c]`,
    `[a]trim=0:${FADE},setpts=PTS-STARTPTS[head]`,
    `[b]trim=${LOOP}:${LOOP + FADE},setpts=PTS-STARTPTS[tail]`,
    `[c]trim=${FADE}:${LOOP},setpts=PTS-STARTPTS[body]`,
    `[head][tail]blend=all_expr='A*(T/${FADE})+B*(1-T/${FADE})'[seam]`,
    `[seam][body]concat=n=2:v=1[v]`
  ].join(';')
  await new Promise((resolve, reject) => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw, '-filter_complex', graph, '-map', '[v]', ...encode, out], { stdio: 'inherit' })
    .on('close', code => code ? reject(new Error(`ffmpeg ${code}`)) : resolve()))
  fs.unlinkSync(raw)
}
console.log(`ok ${out} (${(HERO ? LOOP : TOTAL).toFixed(1)} s)`)
