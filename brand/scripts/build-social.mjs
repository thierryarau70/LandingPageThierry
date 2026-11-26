// Gera os templates de Instagram e a proposta comercial em PNG (brand/social).
// Uso: node brand/scripts/build-social.mjs            → gera tudo
//      node brand/scripts/build-social.mjs posts      → só as peças cujo caminho contém "posts"
//
// Requisitos: Node 22.18+ (importa os .ts de app/data direto) e Playwright com Chromium.
// Para editar: os textos ficam nos blocos "PEÇAS" abaixo; projetos e serviços vêm de app/data.
// Depois de editar, rode o script de novo. Nada aqui publica ou altera o Instagram.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { MODULAR, poly, symbol, wordmark } from './geometry.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const out = path.join(root, 'brand/social')
const file = p => pathToFileURL(path.join(root, p)).href

const { findProject } = await import(file('app/data/projects.ts'))
const { services } = await import(file('app/data/services.ts'))
const { site } = await import(file('app/data/site.ts'))
const { processSteps } = await import(file('app/data/process.ts'))

const SITE = 'thierryaraujodev.com.br'
const HANDLE = site.social[0].handle
const WHATSAPP = site.contact.whatsappLabel
const COORDS = site.location.coords.label
const BIO = ['Desenvolvimento de Software & IA', 'Sites • Sistemas • Automações', 'Tecnologia sob medida para empresas.', 'Inicie seu projeto ↓']

// ---- Base: fontes, tokens e elementos do sistema gráfico -------------------------------------
const font = (family, pkg, f, weight) =>
  `@font-face{font-family:"${family}";src:url("${file(`node_modules/${pkg}/files/${f}`)}") format("woff2");font-weight:${weight};font-display:block}`
const FONTS = [
  font('Archivo', '@fontsource-variable/archivo', 'archivo-latin-wght-normal.woff2', '100 900'),
  font('Space Grotesk', '@fontsource-variable/space-grotesk', 'space-grotesk-latin-wght-normal.woff2', '300 700'),
  font('Manrope', '@fontsource-variable/manrope', 'manrope-latin-wght-normal.woff2', '200 800'),
  font('IBM Plex Mono', '@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff2', '400'),
  font('IBM Plex Mono', '@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff2', '500')
].join('\n')

const css = (w, h, m) => `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${w}px;height:${h}px}
body{position:relative;overflow:hidden;font-family:Manrope,sans-serif;font-weight:500;-webkit-font-smoothing:antialiased;
  background:var(--bg);color:var(--ink);padding:${m}px;display:flex;flex-direction:column;--m:${m}px}
.carbon{--bg:#0D0D0D;--ink:#F3F0EA;--mute:#A1A1A1;--rule:rgba(243,240,234,.34);--hair:rgba(243,240,234,.08);--dot:#FF6A2B;--soft:#1C1C1C;--accent:#FF6A2B}
.paper{--bg:#F3F0EA;--ink:#0D0D0D;--mute:#55524C;--rule:#0D0D0D;--hair:rgba(13,13,13,.1);--dot:#FF6A2B;--soft:#E4E0D8;--accent:#A83C0C}
.signal{--bg:#FF6A2B;--ink:#0D0D0D;--mute:#3B1503;--rule:#0D0D0D;--hair:rgba(13,13,13,.16);--dot:#F3F0EA;--soft:#E85A1E;--accent:#0D0D0D}
.cols{position:absolute;inset:0 var(--m);pointer-events:none;background:repeating-linear-gradient(to right,var(--hair) 0 1px,transparent 1px calc((100% - 1px)/6))}
body>*:not(.cols):not(.abs){position:relative}
.abs{position:absolute}
.display{font-family:Archivo,sans-serif;font-weight:900;text-transform:uppercase;letter-spacing:-.045em;line-height:.97}
.display .l{display:block;white-space:nowrap}
.fit{width:max-content;max-width:none}
.head{font-family:"Space Grotesk",sans-serif;font-weight:700;letter-spacing:-.02em;line-height:1.12}
.label{font-family:"IBM Plex Mono",monospace;font-weight:500;text-transform:uppercase;letter-spacing:.08em;font-size:21px;line-height:1.3}
.mute{color:var(--mute)}
.dot{display:inline-block;width:.2em;height:.2em;margin-left:.045em;background:var(--dot)}
.sq{display:inline-block;width:14px;height:14px;background:var(--dot);margin-right:16px}
.bar{display:flex;align-items:center;justify-content:space-between;gap:24px}
.bar.top{border-bottom:1px solid var(--rule);padding-bottom:20px}
.bar.bottom{border-top:1px solid var(--rule);padding-top:22px}
.bar span{display:flex;align-items:center}
.grow{flex:1;min-height:0}
.rule-t{border-top:1px solid var(--rule)}
.rule-b{border-bottom:1px solid var(--rule)}
.hatch{background-image:repeating-linear-gradient(-45deg,var(--ink) 0 2px,transparent 2px 15px)}
.shot{display:block;width:100%;height:100%;object-fit:cover;object-position:top center}
.shot.w{height:auto}
.frame{border:1px solid var(--rule);background:var(--soft);overflow:hidden}
.tb{border:1px solid var(--rule);font-family:"Space Grotesk",sans-serif;font-weight:600}
.tb div{display:grid;grid-template-columns:var(--tbw,30%) 1fr;border-bottom:1px solid var(--rule)}
.tb div:last-child{border-bottom:0}
.tb dt{padding:.75em .9em;border-right:1px solid var(--rule);display:flex;align-items:center;font-family:"IBM Plex Mono",monospace;font-weight:500;text-transform:uppercase;letter-spacing:.08em;font-size:.72em;color:var(--mute)}
.tb dd{padding:.62em .9em}
.arrow{display:inline-block;width:1em;height:1em;vertical-align:-.12em}
.reg{position:absolute!important;width:26px;height:26px;background:linear-gradient(var(--mute),var(--mute)) center/100% 1.5px no-repeat,linear-gradient(var(--mute),var(--mute)) center/1.5px 100% no-repeat;opacity:.7}
`

const svg = (w, h, body, style) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" style="display:block;${style}">${body}</svg>`
const logo = (height = 30, ink = 'currentColor') => {
  const w = wordmark()
  return svg(w.width, w.height, `<path fill="${ink}" fill-rule="evenodd" d="${w.d}"/><rect x="${w.dot.x}" y="${w.dot.y}" width="${w.dot.size}" height="${w.dot.size}" style="fill:var(--dot)"/>`, `height:${height}px;width:auto`)
}
const mark = (height = 120, ink = 'currentColor', dot = 'var(--dot)') => {
  const s = symbol()
  return svg(s.width, s.height, `<path fill="${ink}" d="${s.d}"/><rect x="${s.dot.x}" y="${s.dot.y}" width="${s.dot.size}" height="${s.dot.size}" style="fill:${dot}"/>`, `height:${height}px;width:auto`)
}
const mosaic = (size = 260, dark = 'var(--soft)', signal = '#FF6A2B') =>
  svg(100, 100, `<path style="fill:${dark}" d="${MODULAR.dark.map(c => poly(c)).join('')}"/><path style="fill:${signal}" d="${poly(MODULAR.signal)}"/>`, `width:${size}px;height:${size}px`)
const ARROWS = { right: 'M2 12h19M13 4l8 8-8 8', up: 'M5 19 19 5M8 5h11v11', down: 'M12 2v19M4 13l8 8 8-8' }
const arrow = (dir = 'right') => `<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square"><path d="${ARROWS[dir]}"/></svg>`
const dot = '<span class="dot"></span>'
// Título em linhas. Linhas terminadas em "." recebem o ponto quadrado. `fit` = tamanho máximo (px):
// o script reduz a fonte até a linha mais larga caber na largura disponível.
const title = (lines, fit, { tag = 'h1', ratio = 1, style = '' } = {}) =>
  `<${tag} class="display fit" data-fit="${fit}" data-ratio="${ratio}" style="${style}">${lines.map(l => `<span class="l">${l.endsWith('.') ? l.slice(0, -1) + dot : l}</span>`).join('')}</${tag}>`
const top = (left, right) => `<header class="bar top label"><span><i class="sq"></i>${left}</span><span class="mute">${right}</span></header>`
const bottom = (right = SITE, h = 30) => `<footer class="bar bottom label">${logo(h)}<span class="mute">${right}</span></footer>`
const tb = (rows, style = '') => `<dl class="tb" style="${style}">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`
const img = (p, cls = '') => `<img class="shot ${cls}" src="${file('public' + p)}" alt="">`
const doc = (w, h, theme, body, { m = 64, grid = true } = {}) =>
  `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>${css(w, h, m)}</style></head><body class="${theme}">${grid ? '<div class="cols"></div>' : ''}${body}</body></html>`
const domain = url => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '')
const esc = s => s.replace(/&/g, '&amp;')

const POST = [1080, 1350]
const STORY = [1080, 1920]
const pieces = []
const add = (name, [w, h], html, opts = {}) => pieces.push({ name, w, h, html, ...opts })

// =============================== PEÇAS ========================================================

// ---- Post institucional (com variações de título, tema e composição) -------------------------
function institutional({ n, theme, lines, fit = 180, art = 'mosaic', kicker = 'Digital Engineering Studio', flip = false }) {
  const arts = {
    mosaic: mosaic(flip ? 400 : 240),
    mark: `<div class="frame" style="width:290px;height:290px;display:grid;place-items:center;background:transparent">${mark(150)}</div>`,
    hatch: `<div style="display:flex;gap:12px"><div class="hatch" style="width:140px;height:290px;border:1px solid var(--rule)"></div><div style="width:140px;height:140px;background:#FF6A2B;align-self:flex-end"></div></div>`,
    diagram: `<div style="display:flex;align-items:center" class="label">
      <span style="border:1px solid var(--rule);padding:26px 24px">Design</span><i style="width:40px;height:1px;background:var(--rule)"></i>
      <span style="background:var(--ink);color:var(--bg);padding:27px 24px">Software</span><i style="width:40px;height:1px;background:var(--rule)"></i>
      <span style="border:1px solid var(--rule);padding:26px 24px">IA</span></div>`
  }
  const sign = `<div>
      <p class="head" style="font-size:44px">Design. Software.<br>Inteligência.</p>
      <p style="font-size:26px;line-height:1.45;margin-top:18px;max-width:500px" class="mute">Sites, sistemas personalizados e soluções com inteligência artificial para empresas.</p>
    </div>`
  const body = flip
    ? `<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:40px">${sign}${arts[art]}</div>${title(lines, fit)}`
    : `${title(lines, fit)}<div style="display:flex;justify-content:space-between;align-items:flex-end;gap:40px">${sign}${arts[art]}</div>`
  return doc(...POST, theme, `
    ${top(kicker, `Nº ${n}`)}
    <main class="grow" style="display:flex;flex-direction:column;justify-content:space-between;padding:50px 0 44px">${body}</main>
    ${bottom(COORDS)}`)
}
add('posts/institucional-01.png', POST, institutional({ n: '01', theme: 'carbon', lines: ['Seu', 'negócio', 'merece', 'mais que', 'um site.'], fit: 154, art: 'mosaic' }))
add('posts/institucional-02.png', POST, institutional({ n: '06', theme: 'paper', lines: ['Da ideia', 'à', 'engenharia.'], fit: 190, art: 'mosaic', flip: true }))
add('posts/institucional-03.png', POST, institutional({ n: '07', theme: 'carbon', lines: ['Tecnologia', 'para', 'negócios', 'reais.'], fit: 170, art: 'hatch' }))
add('posts/institucional-04.png', POST, institutional({ n: '09', theme: 'carbon', lines: ['Design', 'não é', 'decoração.'], fit: 190, art: 'diagram', flip: true }))

// ---- Apresentação de projeto ------------------------------------------------------------------
function projectPost({ n, slug, theme = 'paper', shot = 'desktop' }) {
  const p = findProject(slug)
  const image = shot === 'cover' ? p.cover.src : p.desktop[0].src
  return doc(...POST, theme, `
    ${top('Projeto no ar', `Nº ${n}`)}
    <main class="grow" style="display:flex;flex-direction:column;padding-top:34px">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:26px">
        <p class="label" style="max-width:560px">${esc(p.category)}</p>
        <p class="label mute">${p.pillars.join(' + ')}</p>
      </div>
      <figure class="frame" style="height:640px;margin-right:calc(var(--m) * -1);border-right:0">${img(image)}</figure>
      <p class="label mute" style="display:flex;justify-content:space-between;margin-top:14px"><span>Fig. 01</span><span>${domain(p.url)}</span></p>
      <div class="grow" style="display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:36px">
        ${title([esc(p.name) + '.'], 104, { tag: 'h1' })}
        <p style="font-size:28px;line-height:1.42;margin-top:22px;max-width:900px" class="mute">${esc(p.summary)}</p>
      </div>
    </main>
    ${bottom(`${p.status} · ${SITE}`)}`)
}
add('posts/projeto-01.png', POST, projectPost({ n: '04', slug: 'prumo' }))
add('posts/projeto-02.png', POST, projectPost({ n: '08', slug: 'solek-morais' }))

// ---- Anúncio de serviços (a única peça inteira em laranja do feed) ----------------------------
add('posts/servico-01.png', POST, doc(...POST, 'signal', `
  ${top('Serviços', 'Nº 05')}
  <main class="grow" style="display:flex;flex-direction:column;justify-content:space-between;padding:50px 0 40px">
    ${title(['Software', 'que resolve.'], 170)}
    <ol style="list-style:none" class="rule-t">
      ${services.map(s => `<li class="rule-b" style="display:grid;grid-template-columns:90px 1fr auto;align-items:center;padding:27px 0"><span class="label">${s.number}</span><span class="head" style="font-size:50px">${s.title}</span><span style="font-size:30px">${arrow('up')}</span></li>`).join('')}
    </ol>
    <p class="label" style="display:flex;justify-content:space-between"><span>Inicie seu projeto — link na bio</span><span>${HANDLE}</span></p>
  </main>
  ${bottom(SITE)}`))

// ---- Carrossel educativo: o que um agente de IA faz (4 slides) --------------------------------
const flow = `<div class="label" style="display:flex;align-items:center">
  <span style="border:1px solid var(--rule);padding:26px 26px">01 Entende</span><i style="flex:1;height:1px;background:var(--rule);position:relative"><b style="position:absolute;left:calc(50% - 7px);top:-7px;width:14px;height:14px;background:#FF6A2B"></b></i>
  <span style="background:var(--ink);color:var(--bg);padding:27px 26px">02 Decide</span><i style="flex:1;height:1px;background:var(--rule);position:relative"><b style="position:absolute;left:calc(50% - 7px);top:-7px;width:14px;height:14px;background:#FF6A2B"></b></i>
  <span style="border:1px solid var(--rule);padding:26px 26px">03 Executa</span></div>`
add('posts/carrossel-agente-ia-01.png', POST, doc(...POST, 'paper', `
  ${top('Guia rápido — inteligência artificial', '01/04')}
  <main class="grow" style="display:flex;flex-direction:column;justify-content:space-between;padding:54px 0 44px">
    ${title(['O que um', 'agente de IA', 'faz.'], 160)}
    <div>
      <p class="head" style="font-size:46px;max-width:820px">Não é o robô do “digite 1 para falar com um atendente”.</p>
      <div style="margin-top:44px">${flow}</div>
    </div>
    <p class="label" style="display:flex;justify-content:flex-end;align-items:center;gap:14px">Arraste ${arrow('right')}</p>
  </main>
  ${bottom(HANDLE)}`))

const steps3 = [
  ['Entende', 'o que o cliente pediu, em linguagem comum.'],
  ['Decide', 'o que precisa ser feito para resolver.'],
  ['Executa', 'a tarefa sozinho, a qualquer hora.']
]
add('posts/carrossel-agente-ia-02.png', POST, doc(...POST, 'carbon', `
  ${top('Como funciona', '02/04')}
  <main class="grow" style="display:flex;flex-direction:column;justify-content:space-between;padding:46px 0 40px">
    <p class="head" style="font-size:52px;max-width:860px">Um agente de IA faz três coisas, em sequência.</p>
    <ol style="list-style:none" class="rule-t">
      ${steps3.map(([a, b], i) => `<li class="rule-b" style="display:grid;grid-template-columns:280px 1fr;align-items:center;padding:48px 0">
        <span class="display" style="font-size:180px;line-height:.8">0${i + 1}</span>
        <span><span class="display" style="font-size:78px;display:block">${a}${dot}</span><span style="font-size:32px;line-height:1.35;display:block;margin-top:12px" class="mute">${b}</span></span></li>`).join('')}
    </ol>
    <p class="label" style="display:flex;justify-content:flex-end;align-items:center;gap:14px">Arraste ${arrow('right')}</p>
  </main>
  ${bottom(HANDLE)}`))

const cases3 = [
  ['23h', 'Um cliente pede horário.', 'O agente confere a agenda, marca e manda a confirmação.'],
  ['WhatsApp', 'Chega um pedido.', 'O agente monta o orçamento e responde na hora.'],
  ['Fim do dia', 'Você abre o celular.', 'Recebe um resumo dos atendimentos e de quem precisa de retorno.']
]
add('posts/carrossel-agente-ia-03.png', POST, doc(...POST, 'paper', `
  ${top('Na prática', '03/04')}
  <main class="grow" style="display:flex;flex-direction:column;justify-content:space-between;padding:50px 0 40px">
    ${title(['Na prática.'], 150)}
    <div class="rule-t">
      ${cases3.map(([k, a, b]) => `<div class="rule-b" style="display:grid;grid-template-columns:250px 1fr;gap:24px;padding:46px 0;align-items:start">
        <p class="label" style="display:flex;align-items:center;padding-top:10px"><i class="sq"></i>${k}</p>
        <div><p class="head" style="font-size:50px">${a}</p><p style="font-size:32px;line-height:1.38;margin-top:12px" class="mute">${b}</p></div></div>`).join('')}
    </div>
    <p class="label" style="display:flex;justify-content:flex-end;align-items:center;gap:14px">Arraste ${arrow('right')}</p>
  </main>
  ${bottom(HANDLE)}`))

add('posts/carrossel-agente-ia-04.png', POST, doc(...POST, 'carbon', `
  ${top('Sob medida', '04/04')}
  <main class="grow" style="display:flex;flex-direction:column;justify-content:space-between;padding:54px 0 44px">
    ${title(['Menos', 'processos', 'manuais.', 'Mais', 'inteligência.'], 128)}
    <div style="display:grid;grid-template-columns:1fr 330px;gap:40px;align-items:end">
      <p style="font-size:29px;line-height:1.42">Um agente criado para o seu negócio, integrado ao que você já usa: WhatsApp, Instagram, site, agenda, planilhas e sistema.</p>
      <div style="background:#FF6A2B;color:#0D0D0D;padding:26px 26px 22px">
        <p class="head" style="font-size:38px;line-height:1.05">Inicie seu projeto</p>
        <p class="label" style="margin-top:22px;display:flex;justify-content:space-between;align-items:center">Link na bio ${arrow('up')}</p>
      </div>
    </div>
  </main>
  ${bottom(`${WHATSAPP} · ${SITE}`)}`))

// ---- Case study: Agenda Emi (3 slides, imagens reais) -----------------------------------------
const emi = findProject('agenda-emi')
add('posts/case-agenda-emi-01.png', POST, doc(...POST, 'carbon', `
  ${top('Case study', '01/03')}
  <main class="grow" style="display:grid;grid-template-columns:1fr 470px;gap:44px;padding-top:44px;min-height:0;overflow:hidden">
    <div style="display:flex;flex-direction:column;justify-content:space-between;padding-bottom:44px;min-width:0">
      <div>
        <p class="display" style="font-size:230px;line-height:.8">02</p>
        <p class="label" style="margin-top:34px;display:flex;align-items:center"><i class="sq"></i>${emi.status}</p>
      </div>
      <div>
        ${title(['Agenda', 'Emi.'], 170)}
        <p class="head" style="font-size:34px;margin-top:24px">${emi.category}</p>
        <p class="label mute" style="margin-top:20px">${emi.pillars.join(' + ')}</p>
      </div>
    </div>
    <figure class="frame" style="align-self:start;max-height:100%">${img(emi.mobile[0].src, 'w')}</figure>
  </main>
  ${bottom(domain(emi.url))}`))

add('posts/case-agenda-emi-02.png', POST, doc(...POST, 'paper', `
  ${top('Agenda Emi — do problema à solução', '02/03')}
  <main class="grow" style="display:flex;flex-direction:column;justify-content:space-between;padding:40px 0 38px">
    <div style="display:grid;grid-template-columns:230px 1fr;gap:24px">
      <p class="label" style="padding-top:12px">01 / Problema</p>
      <p class="head" style="font-size:42px">Com caderno, prints de Pix e contas de cabeça, o fim do mês nunca fechava.</p>
    </div>
    <figure class="frame" style="height:470px;margin-left:calc(var(--m) * -1);border-left:0">${img(emi.desktop[1].src)}</figure>
    <div style="display:grid;grid-template-columns:230px 1fr;gap:24px">
      <p class="label" style="padding-top:12px;display:flex;align-items:flex-start"><i class="sq" style="margin-top:6px"></i>02 / Solução</p>
      <p class="head" style="font-size:42px">Um aplicativo que reúne agenda e finanças. A parte do profissional sai calculada na hora, sem a taxa do cartão e sem a comissão da clínica.</p>
    </div>
  </main>
  ${bottom(domain(emi.url))}`))

add('posts/case-agenda-emi-03.png', POST, doc(...POST, 'carbon', `
  ${top('Agenda Emi — funcionalidades', '03/03')}
  <main class="grow" style="display:flex;flex-direction:column;justify-content:space-between;padding:44px 0 40px">
    ${title(['O que foi', 'construído.'], 124)}
    <ol style="list-style:none" class="rule-t">
      ${[emi.features[0], emi.features[1], emi.features[2], 'Assistente com IA que registra consultas e gastos por mensagem', emi.features[6], emi.features[7]].map((f, i) => `<li class="rule-b" style="display:grid;grid-template-columns:70px 1fr;align-items:baseline;padding:17px 0"><span class="label" style="color:#FF6A2B">0${i + 1}</span><span class="head" style="font-size:30px;font-weight:600">${f}</span></li>`).join('')}
    </ol>
    <div style="display:flex;justify-content:space-between;align-items:stretch;gap:30px">
      <p class="head" style="font-size:40px;align-self:center">Quer algo semelhante?</p>
      <p class="label" style="background:#FF6A2B;color:#0D0D0D;padding:24px 26px;display:flex;align-items:center;gap:18px">Link na bio ${arrow('up')}</p>
    </div>
  </main>
  ${bottom(`${emi.status} · ${domain(emi.url)}`)}`))

// ---- Stories (1080 × 1920; conteúdo entre 250 px do topo e 340 px da base) -------------------
add('stories/story-institucional.png', STORY, doc(...STORY, 'carbon', `
  <div class="abs hatch" style="left:0;right:0;top:0;height:190px;opacity:.14"></div>
  <div style="height:190px"></div>
  ${top('Digital Engineering Studio', COORDS)}
  <main class="grow" style="display:flex;flex-direction:column;justify-content:space-between;padding:70px 0 60px">
    ${title(['Software', 'que', 'resolve.'], 230)}
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:40px">
      <p class="head" style="font-size:48px;max-width:560px">Sites, sistemas e soluções com IA sob medida para a sua empresa.</p>
      ${mosaic(250)}
    </div>
    <div style="background:#FF6A2B;color:#0D0D0D;padding:36px 40px;display:flex;justify-content:space-between;align-items:center">
      <span class="display" style="font-size:66px">Inicie seu projeto</span><span style="font-size:60px;line-height:0">${arrow('up')}</span>
    </div>
  </main>
  ${bottom(`${WHATSAPP} · ${SITE}`, 34)}
  <div style="height:270px"></div>`))

const iatf = findProject('protocolo-iatf')
add('stories/story-projeto.png', STORY, doc(...STORY, 'paper', `
  <div style="height:190px"></div>
  ${top('Projeto no ar', 'Nº 03')}
  <main class="grow" style="display:flex;flex-direction:column;padding:50px 0 44px;min-height:0">
    <div class="grow" style="display:grid;grid-template-columns:1fr 430px;gap:44px;min-height:0;overflow:hidden">
      <div style="display:flex;flex-direction:column;justify-content:space-between;min-width:0;padding-bottom:40px">
        <div>
          <p class="display" style="font-size:250px;line-height:.8">03</p>
          <p class="label" style="margin-top:36px;display:flex;align-items:center"><i class="sq"></i>${iatf.status}</p>
          <p class="label mute" style="margin-top:14px">${iatf.pillars.join(' + ')}</p>
        </div>
        <div>
          <p class="head" style="font-size:40px">${iatf.category}</p>
          <p style="font-size:28px;line-height:1.42;margin-top:18px" class="mute">O protocolo inteiro pelo celular, do D0 ao D45, mesmo sem internet no curral.</p>
        </div>
      </div>
      <figure class="frame" style="min-height:0;border-bottom:0">${img(iatf.mobile[0].src, 'w')}</figure>
    </div>
    <div class="rule-t" style="padding-top:34px">${title(['Protocolo', 'IATF.'], 180)}</div>
  </main>
  ${bottom(domain(iatf.url), 34)}
  <div style="height:270px"></div>`))

// ---- Capas de reels (1080 × 1920; título dentro da área 1080 × 1350 que aparece no feed) -----
function reel({ n, theme, lines, fit, kicker }) {
  return doc(...STORY, theme, `
    <div class="abs hatch" style="left:0;right:0;top:0;height:285px;opacity:.16"></div>
    <div class="abs hatch" style="left:0;right:0;bottom:0;height:285px;opacity:.16"></div>
    <i class="reg" style="left:19px;top:272px"></i><i class="reg" style="right:19px;top:272px"></i><i class="reg" style="left:19px;bottom:272px"></i><i class="reg" style="right:19px;bottom:272px"></i>
    <div style="height:285px"></div>
    ${top(kicker, `Reels · Nº ${n}`)}
    <main class="grow" style="display:flex;flex-direction:column;justify-content:space-between;padding:60px 0 50px">
      ${title(lines, fit)}
      <div style="display:flex;justify-content:space-between;align-items:flex-end">
        <p class="head" style="font-size:44px">Design. Software.<br>Inteligência.</p>
        <div class="frame" style="width:190px;height:190px;display:grid;place-items:center;background:transparent">${mark(96)}</div>
      </div>
    </main>
    ${bottom(HANDLE, 34)}
    <div style="height:285px"></div>`)
}
add('reels/reel-capa-01.png', STORY, reel({ n: '01', theme: 'carbon', lines: ['Design', 'não é', 'decoração.'], fit: 190, kicker: 'Manifesto' }))
add('reels/reel-capa-02.png', STORY, reel({ n: '02', theme: 'paper', lines: ['Tecnologia', 'para', 'negócios', 'reais.'], fit: 180, kicker: 'Engenharia digital' }))

// ---- Capas de destaques (1080 × 1920; tudo dentro do círculo central de ~540 px) -------------
const highlights = [['01', 'Projetos', 'carbon'], ['02', 'Serviços', 'paper'], ['03', 'Sobre', 'carbon'], ['04', 'Processo', 'paper'], ['05', 'Contato', 'signal']]
for (const [n, name, theme] of highlights) {
  const slug = name.toLowerCase().normalize('NFD').replace(/[^a-z]/g, '')
  add(`highlights/destaque-${n}-${slug}.png`, STORY, doc(...STORY, theme, `
    <main class="grow" style="display:flex;flex-direction:column;align-items:center;justify-content:center">
      <p class="display" style="font-size:300px;line-height:.8;letter-spacing:-.06em">${n}${dot}</p>
      <p class="label" style="font-size:34px;margin-top:44px;letter-spacing:.14em">${name}</p>
    </main>`, { grid: false }))
}

// ---- Proposta comercial (A4, 1240 × 1754 @2x = 2480 × 3508) -----------------------------------
const A4 = [1240, 1754]
const blank = (n = 1) => Array.from({ length: n }, () => '<i style="display:block;height:44px;border-bottom:1px solid var(--hair)"></i>').join('')
add('proposal/proposta-capa.png', A4, doc(...A4, 'carbon', `
  <div class="abs hatch" style="left:0;right:0;bottom:0;height:150px;opacity:.12"></div>
  ${top('Proposta comercial', 'Nº ____ / ______')}
  <main class="grow" style="display:flex;flex-direction:column;justify-content:space-between;padding:70px 0 60px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start">
      ${title(['Proposta', 'comercial.'], 150, { ratio: 0.74 })}
      ${mosaic(250)}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:end">
      <div>
        <p class="label mute">Preparada para</p>
        <p class="head" style="font-size:50px;margin-top:14px">Nome do cliente</p>
        <p style="font-size:26px;margin-top:10px" class="mute">Nome do projeto</p>
      </div>
      ${tb([['Projeto', '—'], ['Data', '—'], ['Validade', '—'], ['Responsável', site.name], ['Folha', '01 / 02']], 'font-size:24px')}
    </div>
  </main>
  <footer class="bar bottom label">${logo(40)}<span class="mute">Digital Engineering Studio · ${COORDS}</span></footer>`, { m: 80 }), { scale: 2 })

const field = (n, name, body) => `<section class="rule-t" style="display:grid;grid-template-columns:300px 1fr;gap:30px;padding:26px 0 30px"><h2 class="label" style="display:flex;align-items:flex-start"><i class="sq" style="margin-top:6px"></i>${n} / ${name}</h2><div>${body}</div></section>`
add('proposal/proposta-interna.png', A4, doc(...A4, 'paper', `
  <header class="bar top label">${logo(30)}<span class="mute">Proposta comercial · Folha 02 / 02</span></header>
  <main class="grow" style="display:flex;flex-direction:column;justify-content:space-between;padding:50px 0 40px">
    ${title(['Escopo,', 'prazo e', 'investimento.'], 104, { tag: 'h1', ratio: 0.8 })}
    <div>
      ${field('01', 'Contexto', `<p class="mute" style="font-size:22px">Resumo do problema e do objetivo do projeto.</p>${blank(2)}`)}
      ${field('02', 'Escopo', tb([['Entrega 01', 'definido na proposta'], ['Entrega 02', 'definido na proposta'], ['Entrega 03', 'definido na proposta'], ['Fora do escopo', 'definido na proposta']], 'font-size:22px'))}
      ${field('03', 'Prazo', tb([['Início', 'após aprovação e recebimento das informações'], ['Cronograma', 'definido na proposta']], 'font-size:22px'))}
      ${field('04', 'Investimento', tb([['Valor', 'definido na proposta'], ['Condições', 'definido na proposta'], ['Suporte', 'conforme contratação']], 'font-size:22px'))}
      ${field('05', 'Etapas', `<ol style="list-style:none;display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--rule)">${processSteps.map((s, i) => `<li style="padding:16px 18px 18px;${i ? 'border-left:1px solid var(--rule)' : ''}"><span class="display" style="font-size:54px;display:block;line-height:.9">${s.number}</span><span class="head" style="font-size:22px;display:block;margin-top:12px">${s.title}</span></li>`).join('')}</ol>`)}
    </div>
  </main>
  <footer class="bar bottom label" style="font-size:18px;white-space:nowrap"><span>${site.name} · CNPJ ${site.cnpj}</span><span class="mute">${WHATSAPP} · ${SITE}</span></footer>`, { m: 80 }), { scale: 2 })

// ---- Prévia do feed (9 publicações em ritmo xadrez Carbon / Paper, com uma peça laranja) ------
const FEED = [
  'posts/institucional-01.png', 'posts/carrossel-agente-ia-01.png', 'posts/case-agenda-emi-01.png',
  'posts/projeto-01.png', 'posts/servico-01.png', 'posts/institucional-02.png',
  'posts/institucional-03.png', 'posts/projeto-02.png', 'posts/institucional-04.png'
]
const feedHtml = () => {
  const badge = `<div style="width:190px;height:190px;border-radius:50%;background:#0D0D0D;display:grid;place-items:center;flex:none;--dot:#FF6A2B">${mark(84, '#F3F0EA')}</div>`
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>${css(1080, 1650, 40)}
    body{background:#FFFFFF;color:#0D0D0D;--mute:#55524C;--rule:#0D0D0D;--dot:#FF6A2B;--ink:#0D0D0D}
    .g{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.g img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover}</style></head><body>
    <header style="display:flex;gap:44px;align-items:center;padding-bottom:34px">
      ${badge}
      <div>
        <p class="head" style="font-size:40px">${HANDLE.replace('@', '')}</p>
        <p style="font-size:25px;line-height:1.42;margin-top:12px;font-weight:600">${BIO.join('<br>')}</p>
        <p class="label mute" style="margin-top:12px;font-size:19px">${SITE}</p>
      </div>
    </header>
    <p class="label mute" style="display:flex;justify-content:space-between;border-top:1px solid #0D0D0D;padding:16px 0;font-size:18px"><span>Prévia do feed · 9 publicações</span><span>Simulação · não publicado</span></p>
    <div class="g">${FEED.map(f => `<img src="${pathToFileURL(path.join(out, f)).href}">`).join('')}</div>
  </body></html>`
}

// =============================== RENDERIZAÇÃO =================================================
const only = process.argv[2]
const { chromium } = createRequire(import.meta.url)('playwright')
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'thierry-social-'))
const browser = await chromium.launch()

async function render({ name, w, h, html, scale = 1 }) {
  const target = path.join(out, name)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  const src = path.join(tmp, name.replace(/[\\/]/g, '_') + '.html')
  fs.writeFileSync(src, typeof html === 'function' ? html() : html)
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale })
  await page.goto(pathToFileURL(src).href, { waitUntil: 'load' })
  const report = await page.evaluate(async () => {
    await document.fonts.ready
    // Ajuste automático dos títulos: reduz a fonte até a linha mais larga caber
    for (const el of document.querySelectorAll('[data-fit]')) {
      const avail = el.parentElement.clientWidth * Number(el.dataset.ratio || 1)
      let size = Number(el.dataset.fit)
      el.style.fontSize = size + 'px'
      while (el.offsetWidth > avail && size > 24) { size -= 2; el.style.fontSize = size + 'px' }
    }
    // Aviso se algum bloco passar da área útil
    const main = document.querySelector('main')
    return { overflowY: main ? main.scrollHeight - main.clientHeight : 0, overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth }
  })
  if (report.overflowY > 1 || report.overflowX > 1) console.warn('  ! conteúdo excede a área:', name, report)
  await page.screenshot({ path: target })
  await page.close()
  console.log('social', name, `${w * scale}×${h * scale}`)
}

for (const piece of pieces) if (!only || piece.name.includes(only)) await render(piece)
if (!only || 'feed-preview'.includes(only)) await render({ name: 'feed-preview/feed-preview.png', w: 1080, h: 1650, html: feedHtml })
await browser.close()
fs.rmSync(tmp, { recursive: true, force: true })

// Otimização opcional (Pillow): paleta de 256 cores nas peças chapadas; peças com fotografia ficam intactas.
const flat = pieces.filter(p => !/projeto|case-agenda-emi-0[12]|story-projeto/.test(p.name) && (!only || p.name.includes(only))).map(p => path.join(out, p.name))
if (flat.length) {
  const py = 'import sys\nfrom PIL import Image\nfor f in sys.argv[1:]:\n    Image.open(f).convert("RGB").quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).save(f, optimize=True)\n'
  const r = spawnSync('python3', ['-c', py, ...flat], { stdio: 'ignore' })
  console.log(r.status === 0 ? `otimizadas ${flat.length} peças chapadas` : 'Pillow indisponível: PNGs mantidos sem otimização')
}
