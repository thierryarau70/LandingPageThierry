// Reels de rebranding THIERRY. Studio (1080 × 1920, 30 fps, 48 batidas).
// Os cortes seguem uma grade de batidas: informe o BPM da música para sincronizar.
//
//   node video/rebranding.mjs                       # 120 BPM, vídeo mudo
//   BPM=122 node video/rebranding.mjs               # outro andamento
//   BPM=122 MUSICA=trilha.mp3 INICIO=12.5 node video/rebranding.mjs   # com trilha, começando em 12,5 s da música
//   STILLS=1 node video/rebranding.mjs              # só quadros de conferência (um por batida par)
//
// Saída: video/out/rebranding/reels-rebranding-thierry-studio.mp4
import fs from 'node:fs'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { GLYPHS, poly, symbol, wordmark } from '../brand/scripts/geometry.mjs'

const { chromium } = createRequire(import.meta.url)('playwright')
const dir = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(dir, '..')
const out = path.join(dir, 'out/rebranding')
fs.mkdirSync(out, { recursive: true })

const FPS = 30
const BPM = Number(process.env.BPM || 120)
const BEATS = 48
const { visibleProjects } = await import(pathToFileURL(path.join(root, 'app/data/projects.ts')).href)
const { site } = await import(pathToFileURL(path.join(root, 'app/data/site.ts')).href)

const font = (pkg, f) => pathToFileURL(path.join(root, 'node_modules', pkg, 'files', f)).href
const img = p => pathToFileURL(path.join(root, 'public', p)).href

// Letras do wordmark, uma a uma, com a posição de cada uma (mesma métrica de geometry.mjs)
const WORD = [['T', 9], ['H', 10], ['I', 10], ['E', 9], ['R', 5], ['R', 5], ['Y', 0]]
let x = 0
const letters = WORD.map(([ch, gap]) => { const l = { d: GLYPHS[ch].shapes.map(p => poly(p, x, 0)).join('') }; x += GLYPHS[ch].w + gap; return l })
const wm = wordmark()
const sym = symbol()
const studio = fs.readFileSync(path.join(root, 'brand/logos/primary.svg'), 'utf8')
const studioPath = [...studio.matchAll(/<path[^>]* d="([^"]+)"/g)].pop()[1] // contorno da palavra STUDIO
const rule = studio.match(/<rect x="0" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/)

// Projetos que aparecem no vídeo, na ordem (escolha do autor: sem Solek, Endhos, Rômulo Tuan e Centro de Isoladas)
const REEL_PROJECTS = ['prumo', 'agenda-emi', 'emile-vitoria', 'arouche', 'louise-reis', 'cw-imports']
// Quanto subir a captura (em px do quadro) para o assunto não ficar atrás da faixa com o nome
const SHIFT = { 'emile-vitoria': 560 }
const projects = REEL_PROJECTS.map(slug => visibleProjects.find(p => p.slug === slug)).filter(Boolean).map((p, i) => ({ n: String(i + 1).padStart(2, '0'), name: p.name, cat: p.category, src: img(p.mobile[0].src), shift: SHIFT[p.slug] || 0 }))
const handle = site.social[0].handle
const domain = site.defaultUrl.replace(/^https?:\/\/(www\.)?/, '')

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>
@font-face{font-family:Archivo;src:url(${font('@fontsource-variable/archivo', 'archivo-latin-wght-normal.woff2')});font-weight:100 900}
@font-face{font-family:Grotesk;src:url(${font('@fontsource-variable/space-grotesk', 'space-grotesk-latin-wght-normal.woff2')});font-weight:300 700}
@font-face{font-family:Mono;src:url(${font('@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff2')});font-weight:500}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1920px;overflow:hidden;background:#0D0D0D}
body{--carbon:#0D0D0D;--paper:#F3F0EA;--orange:#FF6A2B;--graphite:#1C1C1C;font-family:Mono;color:var(--paper)}
.sc{position:absolute;inset:0;display:none;overflow:hidden}
.label{font:500 28px/1.3 Mono;letter-spacing:.08em;text-transform:uppercase}
.display{font:900 100px/.95 Archivo;letter-spacing:-.045em;text-transform:uppercase;white-space:nowrap}
.grid{position:absolute;inset:0 80px;display:grid;grid-template-columns:repeat(6,1fr);pointer-events:none;z-index:5}
.grid i{border-left:1px solid currentColor;opacity:.1}.grid i:last-child{border-right:1px solid currentColor}
.hud{position:absolute;left:80px;right:80px;display:flex;justify-content:space-between;z-index:6}
.hud.t{top:236px}.hud.b{bottom:356px}
.sq{display:inline-block;width:20px;height:20px;background:var(--orange);margin-right:16px;vertical-align:-1px}
.center{position:absolute;left:0;right:0;text-align:center}
/* cena 2: parede de palavras */
.wall{position:absolute;left:80px;right:80px;top:330px}
.wall p{display:block}
.wall .o{color:transparent;-webkit-text-stroke:3px var(--ink)}
.dot{display:inline-block;width:.2em;height:.2em;margin-left:.045em;background:var(--dot,var(--orange))}
/* cena 4: projetos */
.shot{position:absolute;left:0;top:0;width:100%;height:auto}
.plate{position:absolute;left:0;right:0;bottom:0;height:640px;background:var(--carbon);padding:44px 80px 0;display:grid;grid-template-columns:auto 1fr;gap:0 40px;align-content:start}
.plate .num{font:900 220px/.8 Archivo;letter-spacing:-.05em;grid-row:span 2}
.plate .name{font:900 64px/.95 Archivo;letter-spacing:-.04em;text-transform:uppercase;align-self:end}
</style></head><body>
<div class="grid" id="grid">${'<i></i>'.repeat(6)}</div>
<div class="hud t label" id="hudT"><span><i class="sq"></i>THIERRY. STUDIO</span><span id="tc">00:00:00</span></div>
<div class="hud b label" id="hudB"><span>REBRAND — 2026</span><span>02°49′N 60°40′W</span></div>

<!-- 0 · antes -->
<section class="sc" id="s0" style="background:var(--carbon)">
  <div class="center" style="top:820px"><span id="old" class="label" style="font-size:44px;position:relative;display:inline-block"><span id="oldText"></span><i id="strike" style="position:absolute;left:-12px;top:50%;height:8px;background:var(--orange);width:0"></i></span></div>
  <div id="pulse" style="position:absolute;left:510px;top:660px;width:60px;height:60px;background:var(--orange)"></div>
  <p class="center label" id="next" style="top:940px;color:#A1A1A1">nova identidade ↓</p>
</section>

<!-- 1 · o wordmark é montado letra a letra -->
<section class="sc" id="s1" style="background:var(--paper);color:var(--carbon)">
  <svg viewBox="0 0 ${wm.width} 146" style="position:absolute;left:80px;top:770px;width:920px;overflow:visible">
    ${letters.map((l, i) => `<path id="l${i}" fill="#0D0D0D" fill-rule="evenodd" d="${l.d}"/>`).join('')}
    <rect id="wdot" x="${wm.dot.x}" y="${wm.dot.y}" width="26" height="26" fill="#FF6A2B"/>
    <rect id="wrule" x="0" y="${rule[1]}" width="${rule[2]}" height="${rule[3]}" fill="#0D0D0D"/>
    <path id="wstudio" fill="#0D0D0D" d="${studioPath}"/>
  </svg>
</section>

<!-- 2 · três pilares em parede de palavras -->
<section class="sc" id="s2"><div class="wall display" id="wall"></div><p class="label" id="cap" style="position:absolute;left:80px;right:80px;bottom:420px"></p></section>

<!-- 3 · símbolo T.S -->
<section class="sc" id="s3" style="background:var(--carbon)">
  <div id="tiles" style="position:absolute;inset:300px 80px 420px;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(5,1fr);gap:0"></div>
  <svg viewBox="0 0 200 200" style="position:absolute;left:190px;top:580px;width:700px;overflow:visible">
    <rect x="-20" y="-20" width="240" height="240" fill="#0D0D0D" id="symbg"/>
    <path id="symT" fill="#F3F0EA" d="${poly(GLYPHS.T.shapes[0])}"/>
    <path id="symS" fill="#F3F0EA" d="${poly(GLYPHS.S.shapes[0], 122, 100)}"/>
    <rect id="symDot" x="${sym.dot.x}" y="${sym.dot.y}" width="26" height="26" fill="#FF6A2B"/>
  </svg>
  <p class="center" style="top:1356px"><span class="label" id="symCap" style="background:var(--carbon);padding:14px 22px;display:inline-block">Thierry · ponto · Studio</span></p>
</section>

<!-- 4 · projetos reais -->
<section class="sc" id="s4" style="background:var(--carbon)">
  ${projects.map((p, i) => `<img class="shot" id="shot${i}" src="${p.src}" style="display:none">`).join('')}
  <div class="plate"><p class="num" id="pnum"></p><p class="label" id="pcat" style="color:#A1A1A1;align-self:start;padding-top:6px"></p><p class="name" id="pname"></p></div>
  <p class="label" style="position:absolute;left:80px;top:236px;background:var(--carbon);padding:14px 18px;z-index:7"><i class="sq"></i>Trabalhos reais</p>
</section>

<!-- 5 · assinatura -->
<section class="sc" id="s5" style="background:var(--paper);color:var(--carbon)">
  <svg viewBox="0 0 ${wm.width} 146" style="position:absolute;left:140px;top:720px;width:800px;overflow:visible">
    <g id="eWord"><path fill="#0D0D0D" fill-rule="evenodd" d="${wm.d}"/></g>
    <rect id="eDot" x="${wm.dot.x}" y="${wm.dot.y}" width="26" height="26" fill="#FF6A2B"/>
    <rect id="eRule" x="0" y="${rule[1]}" width="${rule[2]}" height="${rule[3]}" fill="#0D0D0D"/>
    <path id="eStudio" fill="#0D0D0D" d="${studioPath}"/>
  </svg>
  <p class="center" id="eTag" style="top:1010px;font:700 46px/1 Grotesk;letter-spacing:-.02em">Design. Software. Inteligência.</p>
  <div id="eInfo" style="position:absolute;left:140px;right:140px;top:1180px;border-top:2px solid #0D0D0D;padding-top:26px;display:flex;justify-content:space-between" class="label"><span>${handle}</span><span>${domain}</span></div>
</section>

<div id="flash" style="position:absolute;inset:0;background:#FF6A2B;display:none;z-index:9"></div>
<script>
const FPS = ${FPS}, SPB = 60 / ${BPM}, BEATS = ${BEATS}
window.TOTAL = BEATS * SPB
const P = ${JSON.stringify(projects)}
const $ = id => document.getElementById(id)
const clamp = v => Math.max(0, Math.min(1, v))
const expo = p => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p))
const at = (b, start, dur = 1) => clamp((b - start) / dur)
const show = (el, on) => { el.style.display = on ? 'block' : 'none' }
const PILLARS = [
  { word: 'Design', fit: 4.36, bg: '#0D0D0D', fg: '#F3F0EA', dot: '#FF6A2B', cap: 'Sites · landing pages · identidade' },
  { word: 'Software', fit: 6.22, bg: '#F3F0EA', fg: '#0D0D0D', dot: '#FF6A2B', cap: 'Sistemas · SaaS · automações' },
  { word: 'Inteligência', fit: 7.9, bg: '#FF6A2B', fg: '#0D0D0D', dot: '#F3F0EA', cap: 'Agentes de IA · documentos · atendimento' }
]
// peças do símbolo repetidas ao fundo (ordem fixa, sem aleatoriedade entre execuções)
const ORDER = [7, 2, 13, 18, 0, 11, 5, 16, 9, 3, 14, 19, 1, 12, 6, 17, 10, 4, 15, 8]
$('tiles').innerHTML = ORDER.map((_, i) => '<div data-i="' + i + '" style="display:grid;place-items:center;border:1px solid rgba(243,240,234,.12);visibility:hidden"><svg viewBox="0 0 200 200" style="width:44%"><path fill="#2E2E2E" d="${sym.d}"/><rect x="87" y="87" width="26" height="26" fill="#FF6A2B"/></svg></div>').join('')
let lastPillar = -1

window.render = (f) => {
  const t = f / FPS, b = t / SPB
  const END = 32 + P.length // a assinatura começa quando os projetos acabam
  const scene = b < 4 ? 0 : b < 12 ? 1 : b < 24 ? 2 : b < 32 ? 3 : b < END ? 4 : 5
  for (let i = 0; i < 6; i++) show($('s' + i), i === scene)
  // HUD: cor conforme o fundo e contador de tempo
  const dark = scene === 0 || scene === 3 || scene === 4 || (scene === 2 && Math.floor((b - 12) / 4) === 0)
  const ink = dark ? '#F3F0EA' : '#0D0D0D'
  for (const el of [$('hudT'), $('hudB'), $('grid')]) el.style.color = ink
  $('hudT').style.visibility = scene === 4 ? 'hidden' : 'visible'
  $('hudB').style.visibility = scene === 4 ? 'hidden' : 'visible'
  const ff = n => String(n).padStart(2, '0')
  $('tc').textContent = ff(Math.floor(t / 60)) + ':' + ff(Math.floor(t) % 60) + ':' + ff(f % FPS)
  // clarão de um quadro e meio nas trocas de cena
  const cuts = [4, 12, 24, 32, END]
  $('flash').style.display = cuts.some(c => b >= c && b < c + 0.12) ? 'block' : 'none'

  if (scene === 0) {
    const old = 'Thierry Araújo — Dev web'
    $('oldText').textContent = old.slice(0, Math.round(at(b, 0.25, 1.25) * old.length))
    $('strike').style.width = expo(at(b, 2, 0.6)) * ($('old').offsetWidth + 24) + 'px'
    $('old').style.color = b >= 2.4 ? '#6E6E6E' : '#F3F0EA'
    $('next').style.visibility = b >= 3 ? 'visible' : 'hidden'
    const beat = b % 1
    $('pulse').style.transform = 'scale(' + (1 + 0.5 * (1 - expo(beat * 2.2))) + ')'
  }
  if (scene === 1) {
    for (let i = 0; i < 7; i++) {
      const p = at(b, 4 + i * 0.5, 0.42)
      $('l' + i).style.visibility = b >= 4 + i * 0.5 ? 'visible' : 'hidden'
      $('l' + i).style.transform = 'translateY(' + (-70 * (1 - expo(p))) + 'px)'
    }
    const d = at(b, 8, 0.5)
    $('wdot').style.visibility = b >= 8 ? 'visible' : 'hidden'
    $('wdot').style.transformOrigin = '${wm.dot.x + 13}px ${wm.dot.y + 13}px'
    $('wdot').style.transform = 'scale(' + (1 + 5 * (1 - expo(d))) + ')'
    $('wrule').style.transformOrigin = '0 0'
    $('wrule').style.transform = 'scaleX(' + expo(at(b, 9, 0.8)) + ')'
    $('wstudio').style.visibility = b >= 10 ? 'visible' : 'hidden'
    $('wstudio').style.transform = 'translateX(' + (40 * (1 - expo(at(b, 10, 0.5)))) + 'px)'
  }
  if (scene === 2) {
    const k = Math.min(2, Math.floor((b - 12) / 4)), pl = PILLARS[k], local = b - 12 - k * 4
    const size = 920 / pl.fit
    const lh = k === 2 ? 1.1 : 0.95 // a palavra com acento precisa de mais entrelinha
    const rows = Math.floor(1130 / (size * lh))
    if (k !== lastPillar) {
      lastPillar = k
      $('wall').innerHTML = Array.from({ length: rows }, () => '<p>' + pl.word + '<span class="dot"></span></p>').join('')
    }
    $('s2').style.background = pl.bg; $('s2').style.color = pl.fg
    $('wall').style.fontSize = size + 'px'; $('wall').style.lineHeight = lh; $('wall').style.setProperty('--dot', pl.dot); $('wall').style.setProperty('--ink', pl.fg)
    // a linha cheia desce uma posição a cada meia batida; as outras ficam em contorno
    const active = Math.min(rows - 1, Math.floor(local * 2 * rows / 8))
    ;[...$('wall').children].forEach((row, i) => {
      row.className = i === active ? '' : 'o'
      row.style.visibility = i <= Math.floor(local * rows / 1.2) || local > 1.2 ? 'visible' : 'hidden'
      row.querySelector('.dot').style.visibility = i === active ? 'visible' : 'hidden'
    })
    $('cap').textContent = pl.cap
  }
  if (scene === 3) {
    $('symT').style.visibility = b >= 24 ? 'visible' : 'hidden'
    $('symT').style.transform = 'translate(' + (-90 * (1 - expo(at(b, 24, 0.5)))) + 'px,' + (-90 * (1 - expo(at(b, 24, 0.5)))) + 'px)'
    $('symS').style.visibility = b >= 25 ? 'visible' : 'hidden'
    $('symS').style.transform = 'translate(' + (90 * (1 - expo(at(b, 25, 0.5)))) + 'px,' + (90 * (1 - expo(at(b, 25, 0.5)))) + 'px)'
    $('symDot').style.visibility = b >= 26 ? 'visible' : 'hidden'
    $('symDot').style.transformOrigin = '100px 100px'
    $('symDot').style.transform = 'scale(' + (1 + 6 * (1 - expo(at(b, 26, 0.5)))) + ')'
    $('symCap').style.visibility = b >= 27 ? 'visible' : 'hidden'
    const shown = Math.floor(at(b, 28, 3.5) * 20)
    for (const el of $('tiles').children) el.style.visibility = ORDER[+el.dataset.i] < shown ? 'visible' : 'hidden'
  }
  if (scene === 4) {
    const i = Math.min(P.length - 1, Math.floor(b - 32)), local = b - 32 - i
    P.forEach((_, j) => { const el = $('shot' + j); el.style.display = j === i ? 'block' : 'none'; if (j === i) el.style.transform = 'translateY(' + (60 * (1 - expo(local * 1.6)) - P[i].shift) + 'px) scale(1.04)' })
    $('pnum').textContent = P[i].n; $('pname').textContent = P[i].name; $('pcat').textContent = P[i].cat
  }
  if (scene === 5) {
    $('eWord').style.clipPath = 'inset(0 ' + (100 - 100 * expo(at(b, END, 1))) + '% 0 0)'
    $('eDot').style.visibility = b >= END + 1 ? ((b >= END + 4 && b % 1 > 0.5) ? 'hidden' : 'visible') : 'hidden'
    $('eDot').style.transformOrigin = '${wm.dot.x + 13}px ${wm.dot.y + 13}px'
    $('eDot').style.transform = 'scale(' + (1 + 5 * (1 - expo(at(b, END + 1, 0.5)))) + ')'
    $('eRule').style.transformOrigin = '0 0'
    $('eRule').style.transform = 'scaleX(' + expo(at(b, END + 2, 0.8)) + ')'
    $('eStudio').style.visibility = b >= END + 2.5 ? 'visible' : 'hidden'
    $('eTag').style.visibility = b >= END + 3 ? 'visible' : 'hidden'
    $('eInfo').style.visibility = b >= END + 4 ? 'visible' : 'hidden'
  }
}
</script></body></html>`

const page = path.join(out, 'rebranding.html')
fs.writeFileSync(page, html)

const browser = await chromium.launch()
const p = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
p.on('pageerror', (e) => { console.error('PAGEERROR', e); process.exit(1) })
await p.goto(pathToFileURL(page).href, { waitUntil: 'networkidle' })
await p.evaluate(() => document.fonts.ready)
const total = Math.round(FPS * await p.evaluate(() => window.TOTAL))
const spb = 60 / BPM

if (process.env.STILLS) {
  const beats = (process.env.STILLS === '1' ? Array.from({ length: BEATS / 2 }, (_, i) => i * 2 + 0.9) : process.env.STILLS.split(',').map(Number))
  for (const b of beats) {
    await p.evaluate(f => window.render(f), Math.round(b * spb * FPS))
    await p.screenshot({ path: path.join(out, `still-${String(b).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 80 })
  }
  await browser.close()
  console.log(`quadros de conferência em ${path.relative(root, out)}`)
  process.exit(0)
}

const silent = path.join(out, 'rebranding-mudo.mp4')
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', silent], { stdio: ['pipe', 'inherit', 'inherit'] })
for (let i = 0; i < total; i++) {
  await p.evaluate(f => window.render(f), i)
  const buf = await p.screenshot({ type: 'jpeg', quality: 93 })
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r))
}
ff.stdin.end()
await new Promise(r => ff.on('close', r))
await browser.close()

const final = path.join(out, 'reels-rebranding-thierry-studio.mp4')
if (process.env.MUSICA) {
  // trilha do usuário: corta a partir de INICIO, na duração do vídeo, com fade de saída de 1 s
  const dur = total / FPS
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', silent, '-ss', String(process.env.INICIO || 0), '-i', process.env.MUSICA, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-af', `afade=t=in:d=0.05,afade=t=out:st=${(dur - 1).toFixed(2)}:d=1`, '-t', dur.toFixed(2), '-movflags', '+faststart', final], { stdio: 'inherit' })
  if (r.status !== 0) process.exit(r.status ?? 1)
} else {
  fs.copyFileSync(silent, final)
}
console.log(`vídeo: ${path.relative(root, final)} (${(total / FPS).toFixed(2)} s, ${BPM} BPM${process.env.MUSICA ? ', com trilha' : ', mudo'})`)
