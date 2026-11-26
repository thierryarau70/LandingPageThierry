// Reels de rebranding THIERRY. Studio (1080 × 1920, 30 fps, 70 batidas = 35 s a 120 BPM).
// Os cortes seguem uma grade de batidas: informe o BPM da música para sincronizar.
//
//   node video/rebranding.mjs                       # 120 BPM, vídeo mudo
//   BPM=122 node video/rebranding.mjs               # outro andamento
//   BPM=122 MUSICA=trilha.mp3 INICIO=12.5 node video/rebranding.mjs   # com trilha, começando em 12,5 s da música
//   INICIO = (instante da entrada da batida na música) − 4 batidas: a marca nova entra na batida 4.
//   STILLS=1 node video/rebranding.mjs              # só quadros de conferência (um por batida par)
//
// Roteiro (batidas): 0–4 nome antigo · 4–12 wordmark em travelling e recuo · 12–36 seis projetos
// (um compasso cada, com a tela web e a de celular) · 36–48 três faixas em movimento (Design,
// Software, Inteligência) · 48–60 sistema (padrão do símbolo, paleta, tipografia) · 60–70 chamada.
//
// Saída: video/out/rebranding/reels-rebranding-thierry-studio.mp4
import fs from 'node:fs'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { symbol, wordmark } from '../brand/scripts/geometry.mjs'

const { chromium } = createRequire(import.meta.url)('playwright')
const dir = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(dir, '..')
const out = path.join(dir, 'out/rebranding')
fs.mkdirSync(out, { recursive: true })

const FPS = 30
const BPM = Number(process.env.BPM || 120)
const { visibleProjects } = await import(pathToFileURL(path.join(root, 'app/data/projects.ts')).href)
const { site } = await import(pathToFileURL(path.join(root, 'app/data/site.ts')).href)

const font = (pkg, f) => pathToFileURL(path.join(root, 'node_modules', pkg, 'files', f)).href
const img = p => pathToFileURL(path.join(root, 'public', p)).href

const wm = wordmark()
const sym = symbol()
const studio = fs.readFileSync(path.join(root, 'brand/logos/primary.svg'), 'utf8')
const studioPath = [...studio.matchAll(/<path[^>]* d="([^"]+)"/g)].pop()[1] // contorno da palavra STUDIO
const rule = studio.match(/<rect x="0" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/)

// Projetos que aparecem no vídeo, na ordem (escolha do autor: sem Solek, Endhos, Rômulo Tuan e Centro de Isoladas)
const REEL_PROJECTS = ['prumo', 'agenda-emi', 'emile-vitoria', 'arouche', 'louise-reis', 'cw-imports']
// Grade de cenas em batidas (compasso 4/4)
const WORK = 12 // início dos projetos
const PER = 4 // batidas por projeto (um compasso)
const projects = REEL_PROJECTS.map(slug => visibleProjects.find(p => p.slug === slug)).filter(Boolean).map((p, i) => ({
  n: String(i + 1).padStart(2, '0'),
  name: p.name,
  cat: p.category,
  pillars: p.pillars,
  status: p.status,
  domain: (p.url || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, ''),
  desk: img(p.desktop[0].src),
  mob: img(p.mobile[0].src)
}))
const BANDS = WORK + projects.length * PER // 36: três faixas em movimento
const SYS = BANDS + 12 // 48: sistema
const END = SYS + 12 // 60: chamada final
const BEATS = END + 10
// Paleta e tipografia da marca (brand/DESIGN_TOKENS.json e BRAND_GUIDELINES.md)
const PALETTE = [['Carbon', '#0D0D0D', '#F3F0EA'], ['Graphite', '#1C1C1C', '#F3F0EA'], ['Concrete', '#A1A1A1', '#0D0D0D'], ['Paper', '#F3F0EA', '#0D0D0D'], ['Signal Orange', '#FF6A2B', '#0D0D0D'], ['White', '#FFFFFF', '#0D0D0D']]
const TYPE = [
  ['Archivo', 'Display', 'font:900 180px/1 Archivo;letter-spacing:-.045em;text-transform:uppercase'],
  ['Space Grotesk', 'Títulos e interface', 'font:700 124px/1 Grotesk;letter-spacing:-.025em'],
  ['Manrope', 'Texto', 'font:500 124px/1 Manrope;letter-spacing:-.01em'],
  ['IBM Plex Mono', 'Rótulos técnicos', 'font:500 92px/1 Mono;letter-spacing:.04em;text-transform:uppercase']
]
// Três faixas horizontais: fundo, tinta, cor do ponto, legenda e posição do texto dentro da faixa
const MARQUEE = [
  { word: 'Design', cap: 'Sites · landing pages · identidade', bg: '#0D0D0D', fg: '#F3F0EA', dot: '#FF6A2B', capTop: 244, runTop: 290 },
  { word: 'Software', cap: 'Sistemas · SaaS · automações', bg: '#F3F0EA', fg: '#0D0D0D', dot: '#FF6A2B', capTop: 150, runTop: 196 },
  { word: 'Inteligência', cap: 'Agentes de IA · documentos · atendimento', bg: '#FF6A2B', fg: '#0D0D0D', dot: '#F3F0EA', capTop: 12, runTop: 74 }
]
const handle = site.social[0].handle
const domain = site.defaultUrl.replace(/^https?:\/\/(www\.)?/, '')
const symSvg = (fill, dot = '#FF6A2B') => `<path fill="${fill}" d="${sym.d}"/><rect x="${sym.dot.x}" y="${sym.dot.y}" width="${sym.dot.size}" height="${sym.dot.size}" fill="${dot}"/>`

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>
@font-face{font-family:Archivo;src:url(${font('@fontsource-variable/archivo', 'archivo-latin-wght-normal.woff2')});font-weight:100 900}
@font-face{font-family:Grotesk;src:url(${font('@fontsource-variable/space-grotesk', 'space-grotesk-latin-wght-normal.woff2')});font-weight:300 700}
@font-face{font-family:Manrope;src:url(${font('@fontsource-variable/manrope', 'manrope-latin-wght-normal.woff2')});font-weight:200 800}
@font-face{font-family:Mono;src:url(${font('@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff2')});font-weight:500}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1920px;overflow:hidden;background:#0D0D0D}
body{--carbon:#0D0D0D;--paper:#F3F0EA;--orange:#FF6A2B;--graphite:#1C1C1C;font-family:Mono;color:var(--paper)}
.sc{position:absolute;inset:0;display:none;overflow:hidden}
.label{font:500 28px/1.3 Mono;letter-spacing:.08em;text-transform:uppercase}
.display{font:900 100px/.95 Archivo;letter-spacing:-.045em;text-transform:uppercase;white-space:nowrap}
.grid{position:absolute;inset:0 80px;display:grid;grid-template-columns:repeat(6,1fr);pointer-events:none;z-index:5}
.grid i{border-left:1px solid currentColor;opacity:.1}.grid i:last-child{border-right:1px solid currentColor}
.sq{display:inline-block;width:20px;height:20px;background:var(--orange);margin-right:16px;vertical-align:-1px}
.center{position:absolute;left:0;right:0;text-align:center}
.dot{display:inline-block;width:.2em;height:.2em;margin-left:.045em;background:var(--dot,var(--orange))}
/* linha do tempo: o ponto quadrado percorre o vídeo inteiro */
#ph{position:absolute;left:80px;right:80px;top:1556px;height:2px;background:currentColor;opacity:.28;z-index:6}
#phDot{position:absolute;left:80px;top:1548px;width:18px;height:18px;background:var(--orange);z-index:6}
/* projetos: tela web, tela de celular e ficha */
.pj-top{position:absolute;left:80px;right:80px;top:236px;display:flex;justify-content:space-between}
.pj-num{position:absolute;left:80px;top:310px;font:900 220px/.8 Archivo;letter-spacing:-.05em}
.pj-meta{position:absolute;left:390px;right:80px;top:306px}
.pj-name{font:900 62px/.95 Archivo;letter-spacing:-.04em;text-transform:uppercase;margin-top:16px}
.pj-desk{position:absolute;left:80px;top:540px;width:1000px;height:625px;overflow:hidden;border:1px solid rgba(243,240,234,.28);border-right:0;display:none}
.pj-desk img{width:100%;height:100%;object-fit:cover;object-position:top;display:block;transform-origin:50% 0}
.pj-mob{position:absolute;right:80px;top:880px;width:340px;height:620px;overflow:hidden;border:10px solid var(--carbon);outline:1px solid rgba(243,240,234,.28);background:var(--graphite);display:none}
.pj-mob img{width:100%;display:block}
.pj-info{position:absolute;left:80px;top:1250px;width:540px}
.pj-info p+p{margin-top:18px}
/* três faixas em movimento */
.band3{position:absolute;left:0;width:1080px;height:640px;overflow:hidden}
.band3 .cap{position:absolute;left:80px}
.band3 .run{position:absolute;left:0;white-space:nowrap;display:flex;font:900 240px/1 Archivo;letter-spacing:-.045em;text-transform:uppercase}
.band3 .run span{display:block;padding-right:.3em}
/* sistema: padrão do símbolo, paleta em faixas e folha de tipos */
#pat{position:absolute;left:0;top:15px;width:1080px;display:grid;grid-template-columns:repeat(4,270px);grid-auto-rows:270px}
#pat div{display:grid;place-items:center;border:1px solid rgba(243,240,234,.12);visibility:hidden}
.band{position:absolute;left:0;right:0;height:200px;padding:0 80px;display:flex;justify-content:space-between;align-items:center}
.band b{font:900 64px/1 Archivo;letter-spacing:-.04em;text-transform:uppercase}
.spec{position:absolute;left:80px;right:80px;height:270px;border-top:2px solid var(--carbon);padding-top:22px;white-space:nowrap}
.spec p{margin-top:26px}
/* chamada final */
.ml{display:block;overflow:hidden}.ml b{display:block;font-weight:900}
.erow{display:grid;grid-template-columns:270px 1fr;align-items:baseline;border-top:2px solid var(--carbon);padding:28px 0;font:700 46px/1 Grotesk;letter-spacing:-.02em;white-space:nowrap}
.erow:last-child{border-bottom:2px solid var(--carbon)}
</style></head><body>
<div class="grid" id="grid">${'<i></i>'.repeat(6)}</div>
<div id="ph"></div><div id="phDot"></div>

<!-- 0 · antes -->
<section class="sc" id="s0" style="background:var(--carbon)">
  <div class="center" style="top:820px"><span id="old" class="label" style="font-size:44px;position:relative;display:inline-block"><span id="oldText"></span><i id="strike" style="position:absolute;left:-12px;top:50%;height:8px;background:var(--orange);width:0"></i></span></div>
  <div id="pulse" style="position:absolute;left:510px;top:660px;width:60px;height:60px;background:var(--orange)"></div>
  <p class="center label" id="next" style="top:940px;color:#A1A1A1">nova identidade ↓</p>
</section>

<!-- 1 · o wordmark passa em travelling, letra por letra, e a câmera recua até a assinatura inteira -->
<section class="sc" id="s1">
  <svg id="wsvg" viewBox="0 0 ${wm.width} 146" style="position:absolute;left:0;top:0;width:${wm.width}px;height:146px;overflow:visible;transform-origin:0 0">
    <path fill="currentColor" fill-rule="evenodd" d="${wm.d}"/>
    <rect id="wdot" x="${wm.dot.x}" y="${wm.dot.y}" width="26" height="26" fill="#FF6A2B"/>
    <rect id="wrule" x="0" y="${rule[1]}" width="${rule[2]}" height="${rule[3]}" fill="currentColor"/>
    <path id="wstudio" fill="currentColor" d="${studioPath}"/>
  </svg>
</section>

<!-- 2 · projetos: um por compasso, com a tela web e a de celular -->
<section class="sc" id="s2" style="background:var(--carbon)">
  <p class="pj-top label"><span><i class="sq"></i>Trabalhos reais</span><span id="pjCount"></span></p>
  <p class="pj-num" id="pjNum"></p>
  <div class="pj-meta"><p class="label" id="pjCat" style="color:#A1A1A1"></p><p class="pj-name" id="pjName"></p></div>
  ${projects.map((p, i) => `<div class="pj-desk" id="desk${i}"><img src="${p.desk}"></div>`).join('')}
  ${projects.map((p, i) => `<div class="pj-mob" id="mob${i}"><img src="${p.mob}"></div>`).join('')}
  <div class="pj-info label" id="pjInfo"><p id="pjStatus"></p><p id="pjPillars" style="color:#A1A1A1"></p><p id="pjDomain"></p></div>
</section>

<!-- 3 · o que o estúdio faz: três faixas correndo em sentidos alternados -->
<section class="sc" id="s3" style="background:var(--carbon)">
  ${MARQUEE.map((m, i) => `<div class="band3" id="mq${i}" style="top:${i * 640}px;background:${m.bg};color:${m.fg};--dot:${m.dot}">
    <p class="cap label" style="top:${m.capTop}px">0${i + 1} — ${m.cap}</p>
    <div class="run" id="run${i}" style="top:${m.runTop}px">${`<span>${m.word}<i class="dot"></i></span>`.repeat(8)}</div></div>`).join('')}
</section>

<!-- 4 · sistema: padrão do símbolo T.S, paleta e tipografia -->
<section class="sc" id="s4" style="background:var(--carbon)">
  <div id="symLayer">
    <div id="pat">${Array.from({ length: 28 }, (_, i) => `<div data-d="${(i % 4) + Math.floor(i / 4)}"><svg viewBox="0 0 200 200" style="width:46%">${symSvg('#2E2E2E')}</svg></div>`).join('')}</div>
    <div id="bigSym" style="position:absolute;left:190px;top:580px;width:700px;height:700px;background:var(--carbon);display:grid;place-items:center"><svg viewBox="0 0 200 200" style="width:74%;overflow:visible">${symSvg('#F3F0EA')}</svg></div>
    <p class="center" style="top:1320px"><span class="label" id="symCap" style="background:var(--carbon);padding:14px 22px;display:inline-block">Thierry · ponto · Studio</span></p>
  </div>
  <div id="pal">${PALETTE.map(([name, hex, ink], i) => `<div class="band" id="band${i}" style="top:${300 + i * 200}px;background:${hex};color:${ink}"><b>${name}</b><span class="label">${hex}</span></div>`).join('')}
    <i style="position:absolute;left:0;right:0;top:300px;border-top:1px solid rgba(243,240,234,.28)"></i><i style="position:absolute;left:0;right:0;top:1500px;border-top:1px solid rgba(243,240,234,.28)"></i></div>
  <div id="typ" style="position:absolute;inset:0;background:var(--paper);color:var(--carbon)">${TYPE.map(([name, role, css], i) => `<div class="spec" id="spec${i}" style="top:${340 + i * 290}px"><span class="label" style="display:flex;justify-content:space-between"><span>0${i + 1} — ${role}</span><span style="text-transform:none">Aa</span></span><p style="${css}">${name}</p></div>`).join('')}</div>
</section>

<!-- 5 · chamada final -->
<section class="sc" id="s5" style="background:var(--paper);color:var(--carbon)">
  <div class="display" style="position:absolute;left:80px;top:300px;font-size:186px;line-height:.95">
    <span class="ml"><b id="e0">Inicie</b></span><span class="ml"><b id="e1">seu</b></span><span class="ml"><b id="e2">projeto<i class="dot"></i></b></span>
  </div>
  <div style="position:absolute;left:80px;right:80px;top:900px">
    <div class="erow" id="er0"><span class="label">Instagram</span><span>${handle}</span></div>
    <div class="erow" id="er1"><span class="label">Site</span><span>${domain}</span></div>
  </div>
  <svg viewBox="0 0 ${wm.width} 146" style="position:absolute;left:80px;top:1240px;width:560px;overflow:visible">
    <g id="eWord"><path fill="#0D0D0D" fill-rule="evenodd" d="${wm.d}"/></g>
    <rect id="eDot" x="${wm.dot.x}" y="${wm.dot.y}" width="26" height="26" fill="#FF6A2B"/>
    <rect id="eRule" x="0" y="${rule[1]}" width="${rule[2]}" height="${rule[3]}" fill="#0D0D0D"/>
    <path id="eStudio" fill="#0D0D0D" d="${studioPath}"/>
  </svg>
  <p class="label" id="eTag" style="position:absolute;left:80px;top:1440px">Design. Software. Inteligência.</p>
</section>

<div id="flash" style="position:absolute;inset:0;background:#FF6A2B;display:none;z-index:9"></div>
<script>
const FPS = ${FPS}, SPB = 60 / ${BPM}, BEATS = ${BEATS}, WORK = ${WORK}, PER = ${PER}, BANDS = ${BANDS}, SYS = ${SYS}, END = ${END}
window.TOTAL = BEATS * SPB
const P = ${JSON.stringify(projects.map(({ desk, mob, ...p }) => p))}
const $ = id => document.getElementById(id)
const clamp = v => Math.max(0, Math.min(1, v))
const expo = p => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p))
const at = (b, start, dur = 1) => clamp((b - start) / dur)
const lerp = (a, b, p) => a + (b - a) * p
const show = (el, on, as = 'block') => { el.style.display = on ? as : 'none' }
const vis = (el, on) => { el.style.visibility = on ? 'visible' : 'hidden' }
const itemW = []
const TH = ${JSON.stringify(MARQUEE.map(({ bg, fg, dot }) => ({ bg, fg, dot })))}
let lastProject = -1

window.render = (f) => {
  const t = f / FPS, b = t / SPB
  const scene = b < 4 ? 0 : b < WORK ? 1 : b < BANDS ? 2 : b < SYS ? 3 : b < END ? 4 : 5
  for (let i = 0; i < 6; i++) show($('s' + i), i === scene)
  // tinta da malha e da linha do tempo conforme o fundo
  const dark = scene === 0 || scene === 2 || scene === 3 || (scene === 1 && b >= 11) || (scene === 4 && b < SYS + 8)
  const ink = dark ? '#F3F0EA' : '#0D0D0D'
  $('grid').style.color = ink; $('ph').style.color = ink
  const line = scene !== 3 && scene !== 4
  vis($('ph'), line); vis($('phDot'), line)
  $('phDot').style.transform = 'translateX(' + (902 * b / BEATS) + 'px)'
  // clarão de um quadro e meio nas trocas de cena
  const cuts = [4, WORK, BANDS, BANDS + 6, BANDS + 9, SYS, SYS + 4, SYS + 8, END]
  show($('flash'), cuts.some(c => b >= c && b < c + 0.12))

  if (scene === 0) {
    const old = 'Thierry Araújo — Dev web'
    $('oldText').textContent = old.slice(0, Math.round(at(b, 0.25, 1.25) * old.length))
    $('strike').style.width = expo(at(b, 2, 0.6)) * ($('old').offsetWidth + 24) + 'px'
    $('old').style.color = b >= 2.4 ? '#6E6E6E' : '#F3F0EA'
    vis($('next'), b >= 3)
    $('pulse').style.transform = 'scale(' + (1 + 0.5 * (1 - expo((b % 1) * 2.2))) + ')'
  }
  if (scene === 1) {
    // travelling: a cada batida a câmera salta para o trecho seguinte do wordmark
    const big = 7.6, fit = 920 / ${wm.width}
    const stops = [0, 142, 288, 432]
    const k = Math.min(3, Math.floor(b - 4))
    const from = stops[Math.max(0, k - 1)], to = stops[k]
    const panX = k === 0 ? to : lerp(from, to, expo(at(b, 4 + k, 0.55)))
    const z = expo(at(b, 8, 0.7)) // recuo da câmera
    const s = lerp(big, fit, z)
    const tx = lerp(80 - panX * big, 80, z), ty = lerp(580, 770, z)
    $('wsvg').style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')'
    $('wdot').style.transformOrigin = '${wm.dot.x + 13}px ${wm.dot.y + 13}px'
    $('wdot').style.transform = 'scale(' + (b < 8.5 ? 1 : 1 + 4 * (1 - expo(at(b, 8.5, 0.5)))) + ')'
    vis($('wrule'), b >= 9)
    $('wrule').style.transformOrigin = '0 0'
    $('wrule').style.transform = 'scaleX(' + expo(at(b, 9, 0.8)) + ')'
    vis($('wstudio'), b >= 10)
    $('wstudio').style.transform = 'translateX(' + (40 * (1 - expo(at(b, 10, 0.5)))) + 'px)'
    const inv = b >= 11 // última batida: a mesma assinatura sobre Carbon
    $('s1').style.background = inv ? '#0D0D0D' : '#F3F0EA'
    $('s1').style.color = inv ? '#F3F0EA' : '#0D0D0D'
  }
  if (scene === 2) {
    const i = Math.min(P.length - 1, Math.floor((b - WORK) / PER)), l = b - WORK - i * PER, p = P[i]
    if (i !== lastProject) {
      lastProject = i
      $('pjCount').textContent = p.n + '/' + String(P.length).padStart(2, '0')
      $('pjNum').textContent = p.n; $('pjCat').textContent = p.cat; $('pjName').textContent = p.name
      $('pjStatus').innerHTML = '<i class="sq"></i>' + p.status
      $('pjPillars').innerHTML = p.pillars.map(x => '<span style="color:#FF6A2B">+</span> ' + x).join('&nbsp;&nbsp;&nbsp;')
      $('pjDomain').textContent = p.domain
    }
    P.forEach((_, j) => { show($('desk' + j), j === i); show($('mob' + j), j === i) })
    // batida 0: a tela web entra pela direita; batida 1: o celular sobe; batida 2: a ficha
    $('desk' + i).style.transform = 'translateX(' + (1080 * (1 - expo(at(l, 0, 0.6)))) + 'px)'
    $('desk' + i).firstChild.style.transform = 'scale(' + (1 + 0.05 * l / PER) + ')'
    $('mob' + i).style.transform = 'translateY(' + (1100 * (1 - expo(at(l, 1, 0.6)))) + 'px)'
    $('mob' + i).firstChild.style.transform = 'translateY(' + (-60 * at(l, 1.2, PER - 1.2)) + 'px)'
    $('pjName').style.clipPath = 'inset(0 ' + (100 - 100 * expo(at(l, 0.15, 0.6))) + '% 0 0)'
    vis($('pjStatus'), l >= 2); vis($('pjPillars'), l >= 2.25); vis($('pjDomain'), l >= 2.5)
  }
  if (scene === 3) {
    const lb = b - BANDS
    for (let i = 0; i < 3; i++) {
      const band = $('mq' + i), run = $('run' + i), start = i, right = i === 1
      // as cores das faixas giram duas vezes ao longo da cena
      const th = TH[(i + (lb < 6 ? 0 : lb < 9 ? 1 : 2)) % 3]
      band.style.background = th.bg; band.style.color = th.fg; band.style.setProperty('--dot', th.dot)
      vis(band, lb >= start)
      band.style.transform = 'translateX(' + ((right ? 1 : -1) * 1080 * (1 - expo(at(lb, start, 0.6)))) + 'px)'
      if (!itemW[i]) itemW[i] = run.firstChild.getBoundingClientRect().width
      // o texto anda um passo a cada batida (30% da palavra), com arrancada e freio
      const off = (itemW[i] * 0.3 * (Math.floor(lb) + expo((lb % 1) * 1.4))) % itemW[i]
      run.style.transform = 'translateX(' + (right ? off - itemW[i] : -off) + 'px)'
    }
  }
  if (scene === 4) {
    const lb = b - SYS
    show($('symLayer'), lb < 4); show($('pal'), lb >= 4 && lb < 8); show($('typ'), lb >= 8)
    if (lb < 4) {
      // o padrão varre a tela em diagonal; depois o símbolo é carimbado no centro
      for (const el of $('pat').children) vis(el, lb * 8 >= +el.dataset.d)
      vis($('bigSym'), lb >= 2)
      $('bigSym').style.transform = 'scale(' + (1 + 0.3 * (1 - expo(at(lb, 2, 0.5)))) + ')'
      vis($('symCap'), lb >= 3)
    } else if (lb < 8) {
      for (let i = 0; i < 6; i++) {
        const el = $('band' + i)
        vis(el, lb >= 4 + i * 0.5)
        el.style.clipPath = 'inset(0 ' + (100 - 100 * expo(at(lb, 4 + i * 0.5, 0.4))) + '% 0 0)'
      }
    } else {
      for (let i = 0; i < 4; i++) {
        const el = $('spec' + i), p = expo(at(lb, 8 + i, 0.5))
        vis(el, lb >= 8 + i)
        el.querySelector('p').style.transform = 'translateX(' + (-60 * (1 - p)) + 'px)'
        el.style.clipPath = 'inset(0 ' + (100 - 100 * p) + '% 0 0)'
      }
    }
  }
  if (scene === 5) {
    for (let i = 0; i < 3; i++) $('e' + i).style.transform = 'translateY(' + (105 * (1 - expo(at(b, END + i * 0.5, 0.6)))) + '%)'
    for (let i = 0; i < 2; i++) {
      vis($('er' + i), b >= END + 2 + i)
      $('er' + i).style.clipPath = 'inset(0 ' + (100 - 100 * expo(at(b, END + 2 + i, 0.5))) + '% 0 0)'
    }
    vis($('eWord'), b >= END + 4)
    $('eWord').style.clipPath = 'inset(0 ' + (100 - 100 * expo(at(b, END + 4, 0.8))) + '% 0 0)'
    vis($('eDot'), b >= END + 5 && !(b >= END + 8 && b % 1 > 0.5))
    $('eDot').style.transformOrigin = '${wm.dot.x + 13}px ${wm.dot.y + 13}px'
    $('eDot').style.transform = 'scale(' + (1 + 5 * (1 - expo(at(b, END + 5, 0.5)))) + ')'
    vis($('eRule'), b >= END + 6)
    $('eRule').style.transformOrigin = '0 0'
    $('eRule').style.transform = 'scaleX(' + expo(at(b, END + 6, 0.8)) + ')'
    vis($('eStudio'), b >= END + 6.5)
    vis($('eTag'), b >= END + 7)
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
  // trilha do usuário: corta a partir de INICIO, na duração do vídeo, com fade de saída de 1,5 s
  const dur = total / FPS
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', silent, '-ss', String(process.env.INICIO || 0), '-i', process.env.MUSICA, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-af', `afade=t=in:d=0.3,afade=t=out:st=${(dur - 1.5).toFixed(2)}:d=1.5`, '-t', dur.toFixed(2), '-movflags', '+faststart', final], { stdio: 'inherit' })
  if (r.status !== 0) process.exit(r.status ?? 1)
} else {
  fs.copyFileSync(silent, final)
}
console.log(`vídeo: ${path.relative(root, final)} (${(total / FPS).toFixed(2)} s, ${BPM} BPM${process.env.MUSICA ? ', com trilha' : ', mudo'})`)
