// Gera o manual de identidade visual em PDF (A4 paisagem, 24 páginas).
// Uso: node brand/scripts/build-manual.mjs
// Depende de: brand/logos (build-logos.mjs), brand/social (build-social.mjs) e docs/screenshots (scripts/qa.mjs --shots).
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { COLORS, GLYPHS, MODULAR, MONOGRAM_TA, poly, symbol, wordmark } from './geometry.mjs'

const { chromium } = createRequire(import.meta.url)('playwright')
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const outDir = path.join(root, 'brand/guidelines')
fs.mkdirSync(outDir, { recursive: true })

const file = p => 'file://' + path.join(root, p)
const font = (pkg, f) => file(`node_modules/${pkg}/files/${f}`)
const svgFile = name => fs.readFileSync(path.join(root, 'brand/logos', name), 'utf8').replace(/<title>.*?<\/title>/, '').replace(/width="[\d.]+" height="[\d.]+"/, '')
const C = COLORS

// ---- Peças vetoriais reutilizadas -----------------------------------------------------------
const wm = (ink = C.carbon, dot = C.orange, attrs = '') => {
  const w = wordmark()
  return `<svg ${attrs} viewBox="0 0 ${w.width} ${w.height}"><path fill="${ink}" fill-rule="evenodd" d="${w.d}"/><rect x="${w.dot.x}" y="${w.dot.y}" width="${w.dot.size}" height="${w.dot.size}" fill="${dot}"/></svg>`
}
const sym = (ink = C.carbon, dot = C.orange, attrs = '') => {
  const s = symbol()
  return `<svg ${attrs} viewBox="0 0 ${s.width} ${s.height}"><path fill="${ink}" d="${s.d}"/><rect x="${s.dot.x}" y="${s.dot.y}" width="${s.dot.size}" height="${s.dot.size}" fill="${dot}"/></svg>`
}
const mosaic = (dark = C.carbon, signal = C.orange, attrs = '') =>
  `<svg ${attrs} viewBox="0 0 100 100"><path fill="${dark}" d="${MODULAR.dark.map(c => poly(c)).join('')}"/><path fill="${signal}" d="${poly(MODULAR.signal)}"/></svg>`
const monogram = (ink = C.carbon, attrs = '') => `<svg ${attrs} viewBox="0 0 100 100"><path fill="${ink}" d="${poly(MONOGRAM_TA)}"/></svg>`

// Padrões derivados do símbolo e do mosaico
const patternT = (ink, dot, n = 5) => {
  const s = symbol()
  let out = ''
  for (let r = 0; r < 4; r++) for (let c = 0; c < n; c++) {
    const x = c * 240 + (r % 2 ? 120 : 0); const y = r * 240
    out += `<g transform="translate(${x} ${y})"><path fill="${ink}" d="${s.d}"/><rect x="${s.dot.x}" y="${s.dot.y}" width="26" height="26" fill="${(r + c) % 3 === 0 ? dot : ink}"/></g>`
  }
  return `<svg viewBox="0 0 ${n * 240} 940" preserveAspectRatio="xMidYMid slice">${out}</svg>`
}

// ---- Conteúdo ---------------------------------------------------------------------------------
const TOTAL = 24
const pad = n => String(n).padStart(2, '0')
let pageNo = 0
const page = (title, body, { theme = 'paper', bare = false } = {}) => {
  pageNo++
  const chrome = bare ? '' : `<header class="chrome"><span><i class="sq"></i>${pad(pageNo)} / ${title}</span><span>THIERRY. Studio — Manual de identidade visual</span></header>
  <footer class="chrome"><span>Design. Software. Inteligência.</span><span>02°49′N 60°40′W</span><span>${pad(pageNo)} / ${TOTAL}</span></footer>`
  return `<section class="page ${theme}${bare ? ' bare' : ''}">${chrome}<div class="body">${body}</div></section>`
}
const h = (text, cls = '') => `<h2 class="display ${cls}">${text}<b class="dot"></b></h2>`
const label = t => `<p class="label">${t}</p>`

const hexToRgb = hex => hex.replace('#', '').match(/../g).map(v => parseInt(v, 16))
const cmyk = (hex) => {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255)
  const k = 1 - Math.max(r, g, b)
  if (k === 1) return '0 / 0 / 0 / 100'
  return [(1 - r - k) / (1 - k), (1 - g - k) / (1 - k), (1 - b - k) / (1 - k), k].map(v => Math.round(v * 100)).join(' / ')
}
const palette = [
  ['Carbon', C.carbon, 'Fundo principal escuro, texto sobre claro', C.paper],
  ['Graphite', C.graphite, 'Superfícies secundárias e módulos', C.paper],
  ['Concrete', C.concrete, 'Texto de apoio sobre fundo escuro', C.carbon],
  ['Paper', C.paper, 'Fundo principal claro, texto sobre escuro', C.carbon],
  ['Signal Orange', C.orange, 'Sinalização: ponto final, CTA, destaque', C.carbon],
  ['Pure White', C.white, 'Campos de formulário e respiro pontual', C.carbon]
]

// Construção geométrica do wordmark, com a malha de módulos
const construction = () => {
  const w = wordmark()
  let grid = ''
  for (let x = 0; x <= 572; x += 13) grid += `<line x1="${x}" y1="-20" x2="${x}" y2="120" />`
  for (const y of [0, 22, 39, 61, 78, 100]) grid += `<line x1="-20" y1="${y}" x2="592" y2="${y}" class="strong"/>`
  return `<svg viewBox="-40 -46 652 196" class="construction">
    <g class="g">${grid}</g>
    <path fill="${C.carbon}" fill-opacity=".9" fill-rule="evenodd" d="${w.d}"/><rect x="${w.dot.x}" y="${w.dot.y}" width="26" height="26" fill="${C.orange}"/>
    <g class="dim">
      <path d="M-14 0V100M-18 0h8M-18 100h8"/><text x="-22" y="54" text-anchor="end">100</text>
      <path d="M26 112h26M26 108v8M52 108v8"/><text x="39" y="128" text-anchor="middle">26</text>
      <path d="M0 -12h78M0 -16v8M78 -16v8"/><text x="39" y="-20" text-anchor="middle">78</text>
      <path d="M180 0v22M176 0h8M176 22h8"/><text x="170" y="15" text-anchor="end">22</text>
      <path d="M536 112h26M536 108v8M562 108v8"/><text x="549" y="128" text-anchor="middle">26 = X</text>
      <path d="M362 -4l14 14" stroke="${C.orange}"/><text x="384" y="-14">chanfro 45° · 14</text>
      <text x="592" y="-20" text-anchor="end">562 × 100</text>
    </g></svg>`
}

const clearspace = () => {
  const w = wordmark()
  const X = 26
  return `<svg viewBox="${-X * 2 - 30} ${-X * 2 - 30} ${w.width + X * 4 + 60} ${146 + X * 4 + 60}" class="construction">
    <rect x="${-X * 2}" y="${-X * 2}" width="${w.width + X * 4}" height="${146 + X * 4}" fill="none" stroke="${C.orange}" stroke-width="1.2" stroke-dasharray="6 5"/>
    ${[[-X * 2, -X * 2], [w.width + X, -X * 2], [-X * 2, 146 + X], [w.width + X, 146 + X]].map(([x, y]) => `<rect x="${x}" y="${y}" width="${X}" height="${X}" fill="${C.orange}" opacity=".85"/><rect x="${x + (x < 0 ? X : -X)}" y="${y}" width="${X}" height="${X}" fill="${C.orange}" opacity=".3"/>`).join('')}
    ${svgFile('primary.svg').replace('<svg', `<svg x="0" y="0" width="${w.width}" height="146"`)}
    <g class="dim"><text x="${-X}" y="${-X * 2 - 10}" text-anchor="middle">2X</text><text x="${w.width / 2}" y="${146 + X * 2 + 22}" text-anchor="middle">Área de proteção = 2X em todos os lados · X = lado do ponto final</text></g></svg>`
}

const shots = {
  homeD: file('docs/screenshots/home-desktop-dobra.jpg'),
  homeM: file('docs/screenshots/home-mobile-dobra.jpg'),
  caseD: file('docs/screenshots/case-prumo-desktop-dobra.jpg'),
  caseM: file('docs/screenshots/case-prumo-mobile-dobra.jpg'),
  projD: file('docs/screenshots/projetos-desktop-dobra.jpg')
}
const social = f => file('brand/social/' + f)

const pages = []

// 01 — Capa
pages.push(page('Capa', `
  <div class="cover">
    <div class="cover__top label"><span><i class="sq"></i>Manual de identidade visual</span><span>Versão 1.0 — 2026</span></div>
    ${svgFile('primary-on-dark.svg').replace('<svg', '<svg class="cover__wm"')}
    <div class="cover__bottom">
      <p class="heading">Engenharia digital</p>
      <p class="label">Design. Software. Inteligência.</p>
      <p class="label mute">Thierry Araújo · Boa Vista — RR / Brasil · 02°49′N 60°40′W</p>
    </div>
    <div class="cover__hatch"></div>
  </div>`, { theme: 'carbon', bare: true }))

// 02 — Apresentação
const toc = ['Capa', 'Apresentação da marca', 'Posicionamento', 'Conceito criativo', 'Moodboard', 'Proposta de logotipo A', 'Proposta de logotipo B', 'Proposta de logotipo C', 'Logotipo recomendado', 'Construção geométrica', 'Área de proteção', 'Tamanho mínimo', 'Variações monocromáticas', 'Aplicações incorretas', 'Paleta de cores', 'Hierarquia tipográfica', 'Sistema gráfico', 'Direção fotográfica', 'Tom de voz', 'Aplicação no website', 'Aplicação no Instagram', 'Materiais comerciais', 'Assinatura de e-mail', 'Considerações finais']
pages.push(page('Apresentação da marca', `
  <div class="cols c-7-5">
    <div>
      ${h('Uma marca<br>com nome<br>próprio')}
      <p class="lead mt">THIERRY. Studio é a identidade de Thierry Araújo, desenvolvedor de software em Boa Vista, Roraima. A marca continua ligada diretamente ao nome do profissional: quem conversa com o cliente é quem projeta e programa.</p>
      <p class="text mt-s">Este manual reúne as regras para aplicar a identidade no site, no Instagram e em materiais comerciais. Ele registra as três propostas de logotipo desenvolvidas, a escolha recomendada e o sistema que mantém tudo coerente: cor, tipografia, malha e elementos gráficos.</p>
    </div>
    <ol class="toc">${toc.map((t, i) => `<li><span>${pad(i + 1)}</span>${t}</li>`).join('')}</ol>
  </div>`))

// 03 — Posicionamento
pages.push(page('Posicionamento', `
  <div class="cols c-5-7">
    <div>
      ${h('Estúdio<br>independente<br>de engenharia<br>digital', 'sm')}
      <p class="text mt">“Studio” descreve o posicionamento criativo da marca pessoal: o cuidado de estúdio aplicado à engenharia de software. Não afirma a existência de uma equipe ou de uma empresa de grande porte.</p>
    </div>
    <div class="stack">
      <div class="rowline"><span class="label">Quem</span><p class="heading">Thierry Araújo, desenvolvedor de software. Atendimento direto, sem intermediários.</p></div>
      <div class="rowline"><span class="label">O quê</span><p class="heading">Landing pages, sites institucionais, software sob medida, inteligência artificial, automação e integrações.</p></div>
      <div class="rowline"><span class="label">Para quem</span><p class="heading">Empresas que buscam autoridade digital, eficiência operacional e crescimento.</p></div>
      <div class="rowline"><span class="label">Onde</span><p class="heading">Boa Vista — RR, com atendimento remoto em todo o Brasil.</p></div>
      <div class="rowline"><span class="label">Promessa</span><p class="heading">O mesmo profissional que desenha um site sofisticado constrói o sistema que organiza a operação.</p></div>
      <div class="chips">${['Autoridade', 'Credibilidade', 'Engenharia', 'Precisão', 'Inovação', 'Maturidade', 'Exclusividade'].map(t => `<span>${t}</span>`).join('')}</div>
    </div>
  </div>`))

// 04 — Conceito criativo
pages.push(page('Conceito criativo', `
  <div class="concept">
    <p class="label"><i class="sq"></i>Modern Brutalism — THIERRY. Studio</p>
    ${h('Tecnologia não é<br>decoração<b class="dot"></b><span class="gap"></span>É estrutura', 'xl')}
    <div class="cols c-3 mt">
      <div class="cell"><span class="label">01 / Estrutura aparente</span><p class="text">Malha de 12 colunas visível, divisores de 1 px, numeração de seções. O layout mostra como foi construído, como o concreto mostra a fôrma.</p></div>
      <div class="cell"><span class="label">02 / Uma voz, um sinal</span><p class="text">Superfícies monocromáticas em Carbon e Paper. O laranja aparece pouco e sempre com função: ponto final, chamada para ação, marcador.</p></div>
      <div class="cell"><span class="label">03 / Forma com regra</span><p class="text">Tudo deriva de três gestos: o retângulo, o chanfro de 45° e o ponto quadrado. Bordas retas, sem gradiente, sem sombra, sem arredondamento.</p></div>
    </div>
  </div>`, { theme: 'signal' }))

// 05 — Moodboard
pages.push(page('Moodboard', `
  <div class="mood">
    <div class="m m1 carbon"><p class="display" style="text-transform:none">Aa</p><span class="label">Tipografia monumental</span></div>
    <div class="m m2"><img src="${file('public/portfolio/solek-morais.webp')}"><span class="label tag">Trabalho real em preto e branco</span></div>
    <div class="m m3 hatch"></div>
    <div class="m m4 signalbg"><span class="label">Sinal</span></div>
    <div class="m m5 carbon">${mosaic(C.graphite, C.orange)}</div>
    <div class="m m6"><div class="gridlines"></div><span class="label">Malha suíça de 12 colunas</span></div>
    <div class="m m7 carbon"><table class="tb"><tr><td>Projeto</td><td>—</td></tr><tr><td>Resp.</td><td>Thierry Araújo</td></tr><tr><td>Folha</td><td>01 / 01</td></tr></table><span class="label">Carimbo de prancha</span></div>
    <div class="m m8 halftone"></div>
    <div class="m m9"><p class="label">Referências estudadas</p><p class="text">Awwwards (brutalism) · Siteinspire · Godly · Studio Feixen · Pentagram · Behance. Observado: um único acento de cor, título pesado terminado em ponto, grade assimétrica 1/3 + 2/3, imagem real como protagonista, legendas em mono. Nada foi copiado: a linguagem acima é própria.</p></div>
    <div class="m m10 carbon"><p class="label">02°49′N<br>60°40′W</p><span class="cross"></span></div>
  </div>`))

// 06–08 — Propostas
const proposal = (letter, title, mark, lockup, rationale, pros, cons, verdict) => page(`Proposta de logotipo ${letter}`, `
  <div class="cols c-7-5">
    <div class="stage">${mark}<span class="label stage__tag">Conceito ${letter}</span></div>
    <div>
      ${h(title, 'sm')}
      <p class="text mt">${rationale}</p>
      <div class="lock">${lockup}</div>
      <div class="cols c-2 mt-s"><div><p class="label">Forças</p><ul class="list">${pros.map(p => `<li>${p}</li>`).join('')}</ul></div><div><p class="label">Limites</p><ul class="list">${cons.map(p => `<li>${p}</li>`).join('')}</ul></div></div>
      <p class="verdict label"><i class="sq"></i>${verdict}</p>
    </div>
  </div>`)
pages.push(proposal('A', 'Monograma<br>estrutural', monogram(C.carbon, 'class="stage__mark"'), svgFile('concept-a-lockup.svg'),
  'As letras T e A unidas por uma viga única: o pilar do T à esquerda, a empena do A à direita. É uma evolução, em desenho chapado e ortogonal, da ligadura TA que já aparece no avatar atual do Instagram.',
  ['Continuidade com a marca atual', 'Leitura de engenharia e arquitetura', 'Funciona em tamanhos pequenos'], ['Depende do nome ao lado para ser lido', 'Monogramas TA são comuns', 'Menos espaço para o ponto final'], 'Alternativa — indicada para selos e carimbos'))
pages.push(proposal('B', 'Wordmark<br>brutalista', `<div class="stage__wm">${svgFile('primary.svg')}</div>`, svgFile('horizontal.svg'),
  'O nome THIERRY em alfabeto próprio, acompanhado da palavra STUDIO em peso leve,, desenhado sobre módulos: hastes de 26, traços de 22, chanfros de 45° nos dois R. O ponto final é um quadrado laranja encaixado sob o braço do Y — o elemento mais reconhecível da marca.',
  ['Assinatura direta: o nome é a marca', 'O ponto vira sistema (títulos, CTAs, ícone)', 'Gera o símbolo T.S (T · ponto · S)'], ['Pede espaço horizontal', 'Exige o símbolo T.S em áreas quadradas'], 'Recomendado — aplicado no website'))
pages.push(proposal('C', 'Símbolo<br>modular', mosaic(C.carbon, C.orange, 'class="stage__mark"'), svgFile('concept-c-lockup.svg'),
  'Uma malha 4 × 4 ocupada por blocos de tamanhos diferentes, como a planta de um sistema: módulos grandes, componentes menores, um vazio e uma unidade de sinal. Funciona sem o nome e gera padrões por repetição e rotação.',
  ['Independente do nome', 'Gera padrões e texturas', 'Fala de sistemas e modularidade'], ['Abstrato: não identifica o profissional sozinho', 'Perde detalhe abaixo de 20 px'], 'Alternativa — adotada como elemento gráfico de apoio'))

// 09 — Recomendado
pages.push(page('Logotipo recomendado', `
  <div class="cols c-7-5 fill">
    <div class="stage carbon">${svgFile('primary-on-dark.svg').replace('<svg', '<svg class="stage__primary"')}<span class="label stage__tag">Logo principal</span></div>
    <div>
      ${h('Conceito B', 'sm')}
      <p class="text mt">O wordmark é a proposta mais forte porque faz o que as outras não fazem: mantém a marca ligada ao nome, é legível sem explicação e entrega um elemento de sistema — o ponto quadrado — que organiza títulos e botões e vira a dobradiça do símbolo T.S (THIERRY · ponto · STUDIO), usado em favicon e avatar. O monograma e o mosaico ficam como apoio.</p>
      <div class="variants">
        <div class="v">${svgFile('horizontal.svg')}<span class="label">Horizontal</span></div>
        <div class="v v--s">${sym()}<span class="label">Símbolo</span></div>
        <div class="v v--s carbon">${sym(C.paper)}<span class="label">Avatar / favicon</span></div>
      </div>
      <p class="label mt-s mute">Arquivos: brand/logos/primary.svg · horizontal.svg · symbol.svg · favicon.svg · versões -on-dark</p>
    </div>
  </div>`))

// 10 — Construção
pages.push(page('Construção geométrica', `
  <div class="cols c-4-8">
    <div>${h('Desenhado<br>sobre<br>módulos', 'sm')}
      <p class="text mt">Altura de 100 unidades. Hastes verticais de 26 e traços horizontais de 22 (compensação óptica). O chanfro de 45° mede 14 e aparece só nos R e no Y. O ponto final tem 26 de lado, a mesma largura da haste, e fica a 7 unidades do pé do Y.</p>
      <table class="spec mt-s"><tr><td>Altura</td><td>100</td></tr><tr><td>Haste</td><td>26</td></tr><tr><td>Traço</td><td>22</td></tr><tr><td>Chanfro</td><td>14 · 45°</td></tr><tr><td>Ponto (X)</td><td>26 × 26</td></tr></table>
    </div>
    <div class="boards"><div class="board">${construction()}</div>
      <div class="glyphs">${['T', 'H', 'I', 'E', 'R', 'Y'].map(ch => `<div><svg viewBox="-6 -6 ${GLYPHS[ch].w + 12} 112"><path fill="${C.carbon}" fill-rule="evenodd" d="${GLYPHS[ch].shapes.map(p => poly(p)).join('')}"/></svg><span class="label">${ch} · ${GLYPHS[ch].w}</span></div>`).join('')}<div><svg viewBox="-6 -6 38 112"><rect x="0" y="74" width="26" height="26" fill="${C.orange}"/></svg><span class="label">Ponto · 26</span></div></div></div>
  </div>`))

// 11 — Proteção
pages.push(page('Área de proteção', `
  <div class="cols c-4-8">
    <div>${h('Espaço<br>para<br>respirar', 'sm')}
      <p class="text mt">X é o lado do ponto final. Nenhum texto, imagem ou borda entra na faixa de 2X ao redor do logotipo. Em espaços muito reduzidos (favicon, avatar), a margem mínima é de 1X.</p></div>
    <div class="boards"><div class="board">${clearspace()}</div>
      <div class="cols c-2 mini"><div class="board carbon">${svgFile('primary-on-dark.svg')}<span class="label">Correto: respiro de 2X</span></div><div class="board crowd">${svgFile('primary.svg')}<i></i><b></b><span class="label">Incorreto: elementos dentro da área</span></div></div></div>
  </div>`))

// 12 — Tamanho mínimo
pages.push(page('Tamanho mínimo', `
  ${h('Legível até<br>o limite', 'sm')}
  <div class="cols c-3 mt sizes">
    <div class="cell"><div class="size">${svgFile('primary.svg').replace('<svg', '<svg style="width:42mm"')}</div><span class="label">Principal (empilhada)</span><p class="text">Mínimo: 160 px no digital · 40 mm no impresso. Abaixo disso, use o wordmark sem STUDIO.</p></div>
    <div class="cell"><div class="size">${wm(C.carbon, C.orange, 'style="width:18mm"')}</div><span class="label">Wordmark</span><p class="text">Mínimo: 64 px no digital · 18 mm no impresso.</p></div>
    <div class="cell"><div class="size">${sym(C.carbon, C.orange, 'style="height:8mm"')}&nbsp;&nbsp;&nbsp;${svgFile('favicon.svg').replace('<svg', '<svg style="width:6mm"')}</div><span class="label">Símbolo T.S</span><p class="text">Mínimo: 32 px no digital · 8 mm no impresso. Abaixo de 48 px, use a versão compacta (a do favicon), com o ponto maior.</p></div>
  </div>`))

// 13 — Monocromáticas
pages.push(page('Variações monocromáticas', `
  <div class="mono">
    <div class="paper">${svgFile('primary.svg')}<span class="label">Fundos claros — principal</span></div>
    <div class="carbon">${svgFile('primary-on-dark.svg')}<span class="label">Fundos escuros — principal</span></div>
    <div class="white">${svgFile('monochrome.svg')}<span class="label">Monocromática preta</span></div>
    <div class="graphite">${svgFile('monochrome-white.svg')}<span class="label">Monocromática branca</span></div>
    <div class="signalbg">${svgFile('monochrome.svg')}<span class="label">Sobre laranja: sempre em Carbon</span></div>
    <div class="concretebg">${svgFile('monochrome.svg')}<span class="label">Uma cor (carimbo, gravação, fax)</span></div>
  </div>`))

// 14 — Incorretas
const wrong = (inner, text) => `<div class="wrong"><div class="wrong__art">${inner}<i class="x"></i></div><span class="label">${text}</span></div>`
pages.push(page('Aplicações incorretas', `
  ${h('Não faça', 'sm')}
  <div class="wrongs mt">
    ${wrong(wm(C.carbon, C.orange, 'style="transform:scaleX(1.35) scaleY(.75);width:60%"'), 'Não distorcer')}
    ${wrong(wm(C.carbon, C.orange, 'style="transform:rotate(-12deg);width:68%"'), 'Não inclinar')}
    ${wrong(wm(C.carbon, '#2B6AFF'), 'Não trocar a cor do ponto')}
    ${wrong(`<svg viewBox="0 0 562 100"><path fill="${C.carbon}" fill-rule="evenodd" d="${wordmark().d}"/><circle cx="549" cy="87" r="13" fill="${C.orange}"/></svg>`, 'Não arredondar o ponto')}
    ${wrong(`<svg viewBox="0 0 562 100"><path fill="none" stroke="${C.carbon}" stroke-width="3" fill-rule="evenodd" d="${wordmark().d}"/><rect x="536" y="74" width="26" height="26" fill="none" stroke="${C.orange}" stroke-width="3"/></svg>`, 'Não usar em contorno')}
    ${wrong(`<div style="filter:drop-shadow(3mm 3mm 2mm rgba(0,0,0,.45));width:76%">${wm(C.carbon)}</div>`, 'Não aplicar sombra ou gradiente')}
    ${wrong(`<div style="background:${C.orange};padding:6mm;width:100%;height:100%;display:grid;place-items:center">${wm(C.white, C.white, 'style="width:76%"')}</div>`, 'Não usar branco sobre laranja')}
    ${wrong('<p style="font:900 13mm Archivo;letter-spacing:-.04em">THIERRY.</p>', 'Não redigitar em fonte')}
  </div>`))

// 15 — Paleta
pages.push(page('Paleta de cores', `
  <div class="swatches">${palette.map(([n, hex, use, fg]) => `<div class="sw" style="background:${hex};color:${fg}"><p class="heading">${n}</p><p class="label">${hex.toUpperCase()}<br>RGB ${hexToRgb(hex).join(' / ')}<br>CMYK* ${cmyk(hex)}</p><p class="text">${use}</p></div>`).join('')}</div>
  <div class="cols c-2 mt-s">
    <div><p class="label">Proporção de uso</p><div class="ratio"><i style="flex:46;background:${C.carbon}"></i><i style="flex:40;background:${C.paper};border-block:1px solid ${C.carbon}"></i><i style="flex:6;background:${C.graphite}"></i><i style="flex:4;background:${C.concrete}"></i><i style="flex:4;background:${C.orange}"></i></div><p class="text">Carbon e Paper dominam. O laranja não passa de 5% de uma composição, exceto em uma peça-manifesto por página ou por feed.</p></div>
    <div><p class="label">Contraste (WCAG 2.1)</p><table class="spec"><tr><td>Paper sobre Carbon</td><td>17,1 : 1 · AAA</td></tr><tr><td>Concrete sobre Carbon</td><td>7,5 : 1 · AAA</td></tr><tr><td>Carbon sobre Signal Orange</td><td>6,8 : 1 · AA</td></tr><tr><td>Laranja de texto #A83C0C sobre Paper</td><td>5,6 : 1 · AA</td></tr><tr><td>Texto de apoio #55524C sobre Paper</td><td>6,8 : 1 · AA</td></tr><tr><td>Laranja ou branco como texto sobre Paper / laranja</td><td>não usar</td></tr></table><p class="label mute">* CMYK aproximado por conversão direta; ajustar com a gráfica.</p></div>
  </div>`))

// 16 — Tipografia
pages.push(page('Hierarquia tipográfica', `
  <div class="cols c-7-5">
    <div class="types">
      <div class="type"><span class="label">Display — Archivo 900 · caixa alta · tracking −4,5% · entrelinha 0,92–1,0</span><p class="display" style="font-size:25mm">Software<b class="dot"></b></p></div>
      <div class="type"><span class="label">Títulos — Space Grotesk 700 · tracking −2,5%</span><p class="heading" style="font-size:9mm">Quem conversa é quem desenvolve.</p></div>
      <div class="type"><span class="label">Texto — Manrope 400/500 · entrelinha 1,62 · até 62 caracteres por linha</span><p class="text" style="font-size:4.4mm;max-width:none">Um website precisa comunicar confiança. Um sistema precisa resolver problemas. Uma automação precisa reduzir trabalho.</p></div>
      <div class="type"><span class="label">Detalhes técnicos — IBM Plex Mono 500 · caixa alta · tracking +8%</span><p class="label" style="font-size:4mm">01 / Projetos — 02°49′N 60°40′W — No ar</p></div>
    </div>
    <div>
      <p class="label">Por que Archivo no display</p>
      <p class="text">A direção inicial previa Space Grotesk nos títulos. Ela continua nos subtítulos e na interface, mas para a escala monumental foi escolhida a Archivo: chega ao peso 900, enquanto a Space Grotesk para em 700 e perde massa em tamanhos grandes. Inter Tight foi avaliada e descartada por ser neutra demais.</p>
      <p class="label mt-s">Escala fluida (clamp)</p>
      <table class="spec"><tr><td>Mega (hero)</td><td>clamp(2rem, 10.6vw, 11.9rem)</td></tr><tr><td>Giant (seções)</td><td>clamp(2.05rem, 8.2vw, 9.25rem)</td></tr><tr><td>Huge</td><td>clamp(2rem, 5.4vw, 5.75rem)</td></tr><tr><td>Title</td><td>clamp(1.375rem, 1.1rem + 1.3vw, 2.5rem)</td></tr><tr><td>Lead</td><td>clamp(1.06rem, .98rem + .42vw, 1.44rem)</td></tr><tr><td>Body</td><td>clamp(.97rem, .94rem + .14vw, 1.09rem)</td></tr><tr><td>Label</td><td>clamp(.69rem, .66rem + .1vw, .81rem)</td></tr></table>
      <p class="label mute mt-s">Todas com licença SIL Open Font License 1.1 (uso comercial permitido), servidas pelo próprio site.</p>
    </div>
  </div>`))

// 17 — Sistema gráfico
pages.push(page('Sistema gráfico', `
  <div class="system">
    <div class="s s1"><div class="gridlines"></div><span class="label">Malha de 12 colunas · linhas de 1 px</span></div>
    <div class="s s2 carbon"><p class="label"><i class="sq"></i>02 / Projetos</p><p class="display" style="font-size:17mm">04</p><span class="label">Numeração editorial</span></div>
    <div class="s s3"><p class="label">02°49′N 60°40′W</p><span class="cross"></span><span class="label">Coordenadas e marcas de registro</span></div>
    <div class="s s4"><svg viewBox="0 0 120 30" fill="none" stroke="${C.carbon}" stroke-width="2.4" stroke-linecap="square"><path d="M2 15h20M14 7l8 8-8 8M42 23 58 7M46 7h12v12M82 4v20M74 16l8 8 8-8M104 15h14M111 8v14"/></svg><span class="label">Setas e símbolos direcionais</span></div>
    <div class="s s5 hatch"><span class="label tag">Hachura 45°</span></div>
    <div class="s s6 halftone"><span class="label tag">Retícula de impressão</span></div>
    <div class="s s7 carbon">${mosaic(C.graphite, C.orange)}<span class="label">Mosaico modular</span></div>
    <div class="s s8">${patternT(C.carbon, C.orange)}<span class="label tag">Padrão derivado do símbolo</span></div>
    <div class="s s9"><table class="tb dark"><tr><td>Projeto</td><td>Plataforma Prumo</td></tr><tr><td>Status</td><td>No ar</td></tr><tr><td>Folha</td><td>01 / 11</td></tr></table><span class="label">Carimbo técnico</span></div>
    <div class="s s10"><svg viewBox="0 0 300 70" fill="none" stroke="${C.carbon}" stroke-width="1.5"><path d="M70 35h50M180 35h50"/><rect x="20" y="13" width="50" height="44"/><rect x="120" y="13" width="60" height="44" fill="${C.carbon}"/><rect x="230" y="13" width="50" height="44"/><rect x="92" y="31.5" width="7" height="7" fill="${C.orange}" stroke="none"/><rect x="201" y="31.5" width="7" height="7" fill="${C.orange}" stroke="none"/><g stroke="none" font-family="Mono" font-size="13" text-anchor="middle"><text x="45" y="40" fill="${C.carbon}">UI</text><text x="150" y="40" fill="${C.paper}">API</text><text x="255" y="40" fill="${C.carbon}">IA</text></g></svg><span class="label">Diagrama de arquitetura</span></div>
  </div>`))

// 18 — Fotografia
pages.push(page('Direção fotográfica', `
  <div class="cols c-4-8">
    <div>${h('Imagens<br>reais', 'sm')}
      <p class="text mt"><b>Retratos.</b> Preto e branco, contraste alto, fundo neutro (parede clara ou concreto), luz lateral dura, enquadramento do peito para cima ou em ambiente de trabalho. Sem sorriso forçado, sem notebook encenado.</p>
      <p class="text mt-s"><b>Projetos.</b> Sempre capturas reais das interfaces, em cor, sem mockups 3D. No hero e em links de navegação, a captura pode aparecer em preto e branco e voltar à cor no hover.</p>
      <p class="text mt-s"><b>Nunca.</b> Banco de imagens de programadores, robôs, chuva de código, telas flutuantes ou imagens geradas que simulem clientes.</p>
      <p class="label mt-s signal-ink">Pendência: ainda não existe retrato profissional. Enquanto isso, a seção “Sobre” usa a placa com o símbolo.</p>
    </div>
    <div class="photo">
      <figure><img src="${file('public/projetos/solek-morais/desktop.webp')}"><figcaption class="label">Captura real — cor</figcaption></figure>
      <figure><img class="bw" src="${file('public/projetos/solek-morais/desktop.webp')}"><figcaption class="label">Tratamento editorial — P&B, contraste +20%</figcaption></figure>
      <figure class="ph"><div class="ph__frame"><span class="label">4 : 5</span></div><figcaption class="label">Retrato: proporção e enquadramento</figcaption></figure>
      <figure><img src="${file('public/projetos/agenda-emi/mobile.webp')}" style="object-position:top"><figcaption class="label">Aplicativos: captura em 390 × 844</figcaption></figure>
    </div>
  </div>`))

// 19 — Tom de voz
pages.push(page('Tom de voz', `
  <div class="cols c-4-8">
    <div>${h('Direto,<br>técnico,<br>humano', 'sm')}
      <p class="text mt">A marca fala na primeira pessoa do singular. Frases curtas, verbos concretos, nenhum superlativo. Explica o valor para o negócio antes da tecnologia. Não usa emojis na comunicação institucional.</p>
      <div class="chips mt-s">${['Primeira pessoa', 'Frases curtas', 'Fatos verificáveis', 'Sem jargão vazio', 'Sem emoji'].map(t => `<span>${t}</span>`).join('')}</div>
    </div>
    <table class="voice">
      <tr><th class="label">Dizemos</th><th class="label">Não dizemos</th></tr>
      <tr><td>Desenvolvo sites, sistemas personalizados e soluções com inteligência artificial.</td><td>Somos uma agência 360° líder em transformação digital.</td></tr>
      <tr><td>Orçamento e cronograma dependem do escopo. Você recebe o valor antes de qualquer compromisso.</td><td>Os melhores preços do mercado, entrega relâmpago garantida.</td></tr>
      <tr><td>Um agente de IA entende o pedido, decide o que fazer e executa a tarefa.</td><td>Revolucione seu negócio com o poder disruptivo da IA.</td></tr>
      <tr><td>O site é preparado para indexação. Isso não garante posição nos resultados.</td><td>Primeiro lugar no Google garantido.</td></tr>
      <tr><td>Quem conversa com você é quem projeta e programa.</td><td>Nossa equipe de especialistas vai te atender.</td></tr>
    </table>
  </div>`))

// 20 — Website
pages.push(page('Aplicação no website', `
  <div class="web">
    <figure class="web__d"><img src="${shots.homeD}"><figcaption class="label">Página inicial — 1440 px</figcaption></figure>
    <figure class="web__m"><img src="${shots.homeM}"><figcaption class="label">390 px</figcaption></figure>
    <figure class="web__m"><img src="${shots.caseM}"><figcaption class="label">Case — 390 px</figcaption></figure>
    <figure class="web__s"><img src="${shots.caseD}"><figcaption class="label">Página de case</figcaption></figure>
    <figure class="web__s"><img src="${shots.projD}"><figcaption class="label">Índice de projetos</figcaption></figure>
    <div class="web__t"><p class="label">Regras no site</p><ul class="list"><li>Wordmark no cabeçalho, em escala monumental no rodapé</li><li>Todo título termina com o ponto quadrado</li><li>Seções alternam Paper, Carbon e uma única faixa laranja (manifesto)</li><li>Botões retangulares com célula de seta</li><li>Animação discreta e desligada em prefers-reduced-motion</li></ul></div>
  </div>`))

// 21 — Instagram
pages.push(page('Aplicação no Instagram', `
  <div class="ig">
    <figure class="ig__feed"><img src="${social('feed-preview/feed-preview.png')}"></figure>
    <div class="ig__posts">
      ${['posts/institucional-01.png', 'posts/projeto-01.png', 'posts/servico-01.png', 'posts/carrossel-agente-ia-01.png', 'posts/case-agenda-emi-01.png', 'posts/institucional-02.png'].map(f => `<img src="${social(f)}">`).join('')}
    </div>
    <div class="ig__side"><div class="ig__v">
      ${['stories/story-institucional.png', 'reels/reel-capa-01.png', 'highlights/destaque-01-projetos.png'].map(f => `<img src="${social(f)}">`).join('')}
    </div>
    <div class="ig__t"><p class="label">Regras no feed</p><ul class="list"><li>Fundos Carbon e Paper em xadrez; no máximo uma peça laranja a cada nove</li><li>Numeração de publicações (Nº 01) e de slides (01/04)</li><li>Imagens reais dos projetos, nunca banco de imagens</li><li>Avatar: símbolo T.S sobre Carbon</li></ul><p class="label mt-s mute">Templates em brand/social · nada foi publicado automaticamente</p></div></div>
  </div>`, { theme: 'carbon' }))

// 22 — Materiais comerciais
pages.push(page('Materiais comerciais', `
  <div class="mat">
    <figure class="mat__p"><img src="${social('proposal/proposta-capa.png')}"><figcaption class="label">Proposta — capa (A4)</figcaption></figure>
    <figure class="mat__p"><img src="${social('proposal/proposta-interna.png')}"><figcaption class="label">Proposta — escopo, prazo e investimento</figcaption></figure>
    <div class="mat__cards">
      <div class="card carbon">${svgFile('primary-on-dark.svg').replace('<svg', '<svg style="width:68%"')}<p class="label">Engenharia digital</p></div>
      <div class="card"><p class="heading">Thierry Araújo</p><p class="label mute">Desenvolvimento de software e IA</p><p class="label">(95) 99143-2677<br>thierryaraujodev.com.br<br>@thierrystudio.co</p>${sym(C.carbon, C.orange, 'class="card__sym"')}</div>
      <span class="label">Cartão de visita — 90 × 50 mm</span>
      <div class="letter"><div class="letter__top">${wm(C.carbon, C.orange, 'style="width:26mm"')}<span class="label">Fol. 01</span></div><i></i><i></i><i style="width:60%"></i><div class="letter__foot label">Thierry Araújo · CNPJ 69.676.386/0001-52 · Boa Vista — RR</div></div>
      <span class="label">Papel timbrado</span>
    </div>
  </div>`))

// 23 — Assinatura de e-mail
const signature = (dark) => `<table class="sig ${dark ? 'sig--dark' : ''}" cellpadding="0" cellspacing="0"><tr>
  <td class="sig__mark">${sym(dark ? C.paper : C.carbon, C.orange, 'width="44" height="44"')}</td>
  <td class="sig__body"><p class="sig__name">Thierry Araújo</p><p class="sig__role">THIERRY. Studio · Software e IA</p><p class="sig__line">(95) 99143-2677 · thierryaraujodev.com.br</p><p class="sig__line">Boa Vista — RR / Brasil · @thierrystudio.co</p></td></tr></table>`
pages.push(page('Assinatura de e-mail', `
  <div class="cols c-4-8">
    <div>${h('Assinatura<br>de e-mail', 'sm')}
      <p class="text mt">Tabela HTML simples, compatível com Gmail, Outlook e Apple Mail. Símbolo em PNG de 88 × 88 px (exibido a 44 × 44), nome em negrito, demais linhas em cinza. Fonte do sistema (Arial/Helvetica) para não depender de webfont.</p>
      <table class="spec mt-s"><tr><td>Nome</td><td>Arial Bold 15 px · #0D0D0D</td></tr><tr><td>Cargo</td><td>Arial 12 px · #55524C</td></tr><tr><td>Contatos</td><td>Arial 12 px · #0D0D0D</td></tr><tr><td>Divisor</td><td>2 px · #FF6A2B</td></tr><tr><td>Largura máx.</td><td>420 px</td></tr></table>
      <p class="label mute mt-s">Código pronto em brand/email-signature.html</p>
    </div>
    <div class="sigs"><div class="mail">${'<i></i><i></i><i style="width:70%"></i>'}${signature(false)}</div><div class="mail carbon">${'<i></i><i style="width:55%"></i>'}${signature(true)}</div></div>
  </div>`))

// 24 — Considerações finais
pages.push(page('Considerações finais', `
  <div class="final">
    ${svgFile('primary-on-dark.svg').replace('<svg', '<svg class="final__wm"')}
    <div class="cols c-3 mt">
      <div><p class="label">Três regras que resumem o manual</p><ul class="list"><li>O ponto final é quadrado e laranja. Sempre.</li><li>Duas superfícies, um sinal: Carbon, Paper e pouco laranja.</li><li>Conteúdo real: projetos reais, números reais, voz na primeira pessoa.</li></ul></div>
      <div><p class="label">Arquivos da marca</p><ul class="list"><li>brand/logos — SVG vetoriais (3 conceitos e versões)</li><li>brand/exports — PNG transparentes, avatar, favicon</li><li>brand/social — templates de Instagram e proposta</li><li>brand/DESIGN_TOKENS.json · BRAND_GUIDELINES.md</li></ul></div>
      <div><p class="label">Próximos passos</p><ul class="list"><li>Produzir o retrato profissional conforme a página 18</li><li>Registrar depoimentos autorizados de clientes</li><li>Revisar este manual a cada mudança de posicionamento</li></ul><p class="label mt-s">thierryaraujodev.com.br · @thierrystudio.co · (95) 99143-2677</p></div>
    </div>
  </div>`, { theme: 'carbon' }))

// ---- Folha de estilo --------------------------------------------------------------------------
const css = `
@font-face{font-family:Archivo;src:url(${font('@fontsource-variable/archivo', 'archivo-latin-wght-normal.woff2')});font-weight:100 900}
@font-face{font-family:Grotesk;src:url(${font('@fontsource-variable/space-grotesk', 'space-grotesk-latin-wght-normal.woff2')});font-weight:300 700}
@font-face{font-family:Manrope;src:url(${font('@fontsource-variable/manrope', 'manrope-latin-wght-normal.woff2')});font-weight:200 800}
@font-face{font-family:Mono;src:url(${font('@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff2')});font-weight:500}
@page{size:297mm 210mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:Manrope;color:${C.carbon};font-size:3.5mm;line-height:1.55}
.page{width:297mm;height:210mm;position:relative;overflow:hidden;page-break-after:always;break-after:page;background:${C.paper};--fg:${C.carbon};--rule:${C.carbon};--mute:#55524C;color:var(--fg)}
.page.carbon,.carbon{background:${C.carbon};--fg:${C.paper};--rule:rgba(243,240,234,.3);--mute:${C.concrete};color:${C.paper}}
.page.signal{background:${C.orange};--mute:#3B1503;--dot:${C.paper}}
.graphite{background:${C.graphite};color:${C.paper}}.white{background:#fff}.signalbg{background:${C.orange}}.concretebg{background:${C.concrete}}.paper{background:${C.paper}}
.chrome{position:absolute;left:14mm;right:14mm;display:flex;justify-content:space-between;gap:8mm;font:500 2.35mm/1 Mono;letter-spacing:.08em;text-transform:uppercase}
header.chrome{top:9mm;padding-bottom:3.2mm;border-bottom:1px solid var(--rule)}
footer.chrome{bottom:8mm;padding-top:3.2mm;border-top:1px solid var(--rule);color:var(--mute)}
.body{position:absolute;inset:22mm 14mm 19mm}.bare .body{inset:0}
.sq{display:inline-block;width:2mm;height:2mm;background:${C.orange};margin-right:2mm}
.signal .sq{background:${C.carbon}}
.label{font:500 2.35mm/1.45 Mono;letter-spacing:.08em;text-transform:uppercase}
.mute{color:var(--mute)}.signal-ink{color:#A83C0C}
.display{font:900 21mm/.96 Archivo;letter-spacing:-.045em;text-transform:uppercase}
.display.sm{font-size:15mm}.display.xl{font-size:23mm;line-height:1}
.dot{display:inline-block;width:.2em;height:.2em;background:var(--dot,${C.orange});margin-left:.045em;margin-right:-.245em}.gap{display:inline-block;width:.42em}
.heading{font:700 4.6mm/1.2 Grotesk;letter-spacing:-.02em}
.lead{font:500 5mm/1.42 Manrope;max-width:120mm}
.text{font-size:3.35mm;line-height:1.58;max-width:112mm;color:var(--fg)}
.mt{margin-top:8mm}.mt-s{margin-top:4.5mm}
.cols{display:grid;gap:10mm;height:100%}.cols.fill{align-items:stretch}
.c-7-5{grid-template-columns:7fr 5fr}.c-5-7{grid-template-columns:5fr 7fr}.c-4-8{grid-template-columns:4fr 8fr}
.c-3{grid-template-columns:repeat(3,1fr);height:auto}.c-2{grid-template-columns:1fr 1fr;height:auto;gap:6mm}
.list{list-style:none;margin-top:2.5mm;display:grid;gap:1.8mm;font-size:3.2mm;line-height:1.45}
.list li{padding-left:4.5mm;position:relative}.list li:before{content:'';position:absolute;left:0;top:1.35mm;width:1.8mm;height:1.8mm;background:${C.orange}}
.toc{list-style:none;columns:2;column-gap:8mm;font:500 3.1mm/1 Grotesk;align-self:end;border-top:1px solid var(--rule);padding-top:4mm}
.toc li{display:flex;gap:3mm;padding:2.05mm 0;border-bottom:1px solid rgba(13,13,13,.14);break-inside:avoid}
.toc span{font:500 2.35mm/1.2 Mono;color:#A83C0C;width:6mm}
.stack{display:grid;align-content:start}
.rowline{display:grid;grid-template-columns:28mm 1fr;gap:6mm;padding:4.2mm 0;border-top:1px solid var(--rule);align-items:baseline}
.chips{display:flex;flex-wrap:wrap;gap:2mm;border-top:1px solid var(--rule);padding-top:5mm}
.chips span{font:500 2.35mm/1 Mono;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--rule);padding:2.2mm 3mm}
.cell{border-top:1px solid var(--rule);padding-top:3.5mm;display:grid;gap:3mm;align-content:start}
.concept{display:flex;flex-direction:column;height:100%;justify-content:space-between}.concept .display{margin-top:6mm}
/* capa */
.cover{position:absolute;inset:0;padding:14mm}
.cover__top{display:flex;justify-content:space-between;padding-bottom:4mm;border-bottom:1px solid rgba(243,240,234,.3)}
.cover__wm{position:absolute;left:14mm;right:14mm;top:44mm;width:269mm;height:auto}
.cover__bottom{position:absolute;left:14mm;right:14mm;bottom:14mm;display:grid;grid-template-columns:1fr 1fr 1fr;align-items:end;border-top:1px solid rgba(243,240,234,.3);padding-top:5mm}
.cover__bottom .heading{font-size:6mm}.cover__bottom p:nth-child(2){text-align:center}.cover__bottom p:nth-child(3){text-align:right}
.cover__hatch{position:absolute;left:14mm;right:14mm;top:134mm;height:34mm;color:${C.paper};opacity:.16;background-image:repeating-linear-gradient(-45deg,currentColor 0 1px,transparent 1px 9px)}
/* texturas */
.hatch{background-image:repeating-linear-gradient(-45deg,currentColor 0 1px,transparent 1px 8px)}
.halftone{background-image:radial-gradient(currentColor 1.1px,transparent 1.4px);background-size:7px 7px}
.gridlines{position:absolute;inset:0;background-image:repeating-linear-gradient(90deg,rgba(13,13,13,.28) 0 1px,transparent 1px calc(100%/12))}
.cross{position:absolute;right:5mm;top:5mm;width:9mm;height:9mm;background:linear-gradient(currentColor,currentColor) 50% 0/1px 100% no-repeat,linear-gradient(currentColor,currentColor) 0 50%/100% 1px no-repeat}
.cross:after{content:'';position:absolute;inset:3.5mm;background:${C.orange}}
.tb{border-collapse:collapse;font:500 2.6mm/1 Grotesk;width:100%}.tb td{border:1px solid rgba(243,240,234,.35);padding:2mm 2.4mm}.tb td:first-child{font:500 2.1mm/1 Mono;letter-spacing:.08em;text-transform:uppercase;width:34%;color:${C.concrete}}
.tb.dark td{border-color:${C.carbon}}.tb.dark td:first-child{color:#55524C}
/* moodboard */
.mood{display:grid;height:100%;gap:2.5mm;grid-template-columns:repeat(12,1fr);grid-template-rows:repeat(6,1fr)}
.m{position:relative;overflow:hidden;padding:4mm;display:flex;flex-direction:column;justify-content:space-between;border:1px solid ${C.carbon}}
.m.carbon{border-color:${C.carbon}}.m img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;filter:grayscale(1) contrast(1.2)}
.m .tag,.s .tag{position:absolute;left:0;bottom:0;background:${C.carbon};color:${C.paper};padding:1.6mm 2.4mm}
.m1{grid-area:1/1/4/4}.m1 .display{font-size:38mm;line-height:.8}.m2{grid-area:1/4/4/9}.m3{grid-area:1/9/3/11}.m4{grid-area:1/11/3/13;justify-content:flex-end}
.m5{grid-area:3/9/7/13;align-items:center;justify-content:center}.m5 svg{height:100%}.m6{grid-area:4/1/7/4;justify-content:flex-end}.m7{grid-area:4/4/6/7}.m8{grid-area:6/4/7/7}.m9{grid-area:4/7/7/9;justify-content:flex-start;gap:2.5mm}.m9 .text{font-size:2.55mm;line-height:1.45}
.m10{display:none}
/* propostas */
.stage{position:relative;border:1px solid var(--rule);display:grid;place-items:center;background:#fff;height:100%}
.stage.carbon{background:${C.carbon};border-color:${C.carbon}}
.stage__mark{width:44%}.stage__wm{width:74%}.stage__wm svg,.lock svg,.v svg,.mono svg{width:100%;height:auto;display:block}.stage__primary{width:76%!important}
.stage__tag{position:absolute;left:0;top:0;background:${C.carbon};color:${C.paper};padding:2mm 3mm}.stage.carbon .stage__tag{background:${C.orange};color:${C.carbon}}
.lock{margin-top:6mm;padding:5mm 0;border-block:1px solid var(--rule)}.lock svg{width:74%}
.verdict{margin-top:5mm;padding-top:4mm;border-top:1px solid var(--rule)}
.variants{display:grid;grid-template-columns:2.2fr 1fr 1fr;gap:3mm;margin-top:7mm}
.v{border:1px solid var(--rule);padding:5mm 4mm 9mm;position:relative;display:grid;place-items:center;min-height:32mm}.v .label{position:absolute;left:2.5mm;bottom:2mm}.v--s svg{width:auto;height:15mm}.v.carbon{border-color:${C.carbon}}
/* construção */
.boards{display:grid;grid-template-rows:1fr auto;gap:3mm;height:100%;min-height:0}.board{border:1px solid var(--rule);background:#fff;display:grid;place-items:center;padding:6mm;min-height:0;position:relative}.board.carbon{background:${C.carbon}}
.glyphs{display:grid;grid-template-columns:repeat(7,1fr);gap:2mm}.glyphs div{border:1px solid var(--rule);background:#fff;padding:3mm 3mm 2mm;display:grid;gap:2mm;justify-items:center}.glyphs svg{height:20mm}
.mini{gap:3mm}.mini .board{height:44mm;padding:9mm 12mm 11mm}.mini svg{width:70%;height:auto}.mini .label{position:absolute;left:3mm;bottom:2.5mm}.crowd svg{width:86%}.crowd i{position:absolute;right:3mm;top:3mm;width:14mm;height:14mm;background:${C.orange}}.crowd b{position:absolute;left:4mm;top:5mm;right:20mm;height:1px;background:${C.carbon}}
.construction{width:100%;height:auto;max-height:100%}
.construction .g line{stroke:rgba(13,13,13,.13);stroke-width:.5}.construction .g line.strong{stroke:rgba(255,106,43,.75);stroke-width:.6}
.dim path{stroke:${C.carbon};stroke-width:.8;fill:none}.dim text{font:500 7px Mono;letter-spacing:.06em;fill:${C.carbon};text-transform:uppercase}
.spec{border-collapse:collapse;width:100%;font:500 2.9mm/1.25 Grotesk;margin-top:2.5mm}.spec td{border-top:1px solid var(--rule);padding:2mm 0}.spec td:last-child{text-align:right;font:500 2.35mm/1.3 Mono;letter-spacing:.04em}.spec tr:last-child td{border-bottom:1px solid var(--rule)}
.sizes .size{height:46mm;display:flex;align-items:center;justify-content:center;border:1px solid var(--rule);background:#fff;margin-bottom:1mm}
/* mono */
.mono{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:1fr 1fr;gap:2.5mm;height:100%}
.mono>div{position:relative;display:grid;place-items:center;border:1px solid ${C.carbon}}.mono svg{width:66%}.mono .label{position:absolute;left:3mm;bottom:2.5mm}
/* incorretas */
.wrongs{display:grid;grid-template-columns:repeat(4,1fr);gap:4mm 3mm}
.wrong__art{position:relative;height:50mm;border:1px solid var(--rule);background:#fff;display:grid;place-items:center;overflow:hidden;margin-bottom:2mm}
.wrong__art>svg{width:76%}.x{position:absolute;right:0;top:0;width:8mm;height:8mm;background:${C.carbon}}
.x:before,.x:after{content:'';position:absolute;left:1.8mm;right:1.8mm;top:50%;height:.6mm;background:${C.orange};transform:rotate(45deg)}.x:after{transform:rotate(-45deg)}
/* paleta */
.swatches{display:grid;grid-template-columns:repeat(6,1fr);height:92mm;border:1px solid ${C.carbon}}
.sw{padding:4mm;display:flex;flex-direction:column;justify-content:space-between;border-left:1px solid rgba(128,128,128,.35)}.sw .text{font-size:2.7mm;color:inherit;line-height:1.4}
.ratio{display:flex;height:11mm;margin:2.5mm 0 3mm;border-inline:1px solid ${C.carbon}}
/* tipografia */
.types{display:grid;align-content:space-between;height:100%}.type{border-top:1px solid var(--rule);padding-top:3mm;display:grid;gap:3mm}
/* sistema */
.system{display:grid;height:100%;gap:2.5mm;grid-template-columns:repeat(12,1fr);grid-template-rows:repeat(6,1fr)}
.s{position:relative;overflow:hidden;border:1px solid ${C.carbon};padding:3.5mm;display:flex;flex-direction:column;justify-content:space-between}
.s1{grid-area:1/1/4/5;justify-content:flex-end}.s2{grid-area:1/5/4/7}.s3{grid-area:1/7/3/10}.s4{grid-area:1/10/3/13}.s4 svg{width:80%}
.s5{grid-area:3/7/5/9}.s6{grid-area:3/9/5/11}.s7{grid-area:3/11/7/13;align-items:flex-start}.s7 svg{width:100%}
.s8{grid-area:4/1/7/5;padding:0}.s8 svg{position:absolute;inset:0;width:100%;height:100%}.s9{grid-area:4/5/7/7;justify-content:flex-end;gap:3mm}.s10{grid-area:5/7/7/11}.s10 svg{width:100%}
/* foto */
.photo{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:4mm 3mm;height:100%}
.photo figure{display:grid;grid-template-rows:auto auto;gap:1.6mm;min-height:0;align-content:start}.photo img,.ph__frame{width:100%;height:70mm;object-fit:cover;object-position:top left;border:1px solid var(--rule)}.bw{filter:grayscale(1) contrast(1.2)}
.ph__frame{border:1px dashed ${C.carbon};display:grid;place-items:center;background:repeating-linear-gradient(-45deg,rgba(13,13,13,.12) 0 1px,transparent 1px 8px);position:relative}
.ph__frame:before{content:'';width:22mm;height:27.5mm;border:1px solid ${C.carbon};background:${C.paper}}.ph__frame .label{position:absolute}
/* voz */
.voice{border-collapse:collapse;width:100%;align-self:start;font:500 3.5mm/1.4 Grotesk}
.voice th{text-align:left;padding:0 4mm 3mm 0;border-bottom:1px solid var(--rule)}.voice td{padding:4.4mm 5mm 4.4mm 0;border-bottom:1px solid var(--rule);vertical-align:top;width:50%}
.voice td:last-child{color:#55524C;text-decoration:line-through;text-decoration-color:${C.orange};text-decoration-thickness:.5mm}
/* web */
.web{display:grid;height:100%;gap:3mm;grid-template-columns:repeat(12,1fr);grid-template-rows:auto auto}
.web figure{display:grid;gap:1.5mm;align-content:start}.web img{width:100%;border:1px solid var(--rule);display:block}
.web__d{grid-column:1/8}.web__m{grid-column:span 2}.web__m:nth-of-type(2){grid-column:8/10}.web__m:nth-of-type(3){grid-column:10/12}
.web__s{grid-column:span 3}.web__t{grid-column:7/13;align-self:end}

/* instagram */
.ig{display:grid;height:100%;gap:4mm;grid-template-columns:62mm 1fr 58mm}
.ig img{display:block;width:100%}.ig__feed img{height:100%;object-fit:contain;object-position:top left}
.ig__posts{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5mm;align-content:start}
.ig__side{display:flex;flex-direction:column;justify-content:space-between;gap:5mm}.ig__v{display:grid;grid-template-columns:repeat(3,1fr);gap:2mm;align-content:start}
.ig .list li{color:${C.paper}}
/* materiais */
.mat{display:grid;grid-template-columns:1fr 1fr 1.1fr;gap:6mm;height:100%}
.mat__p{display:grid;gap:1.6mm;align-content:start}.mat__p img{width:100%;border:1px solid var(--rule);display:block;max-height:150mm;object-fit:contain;object-position:top left}
.mat__cards{display:grid;gap:2.2mm;align-content:start}
.card{width:76mm;height:42mm;border:1px solid ${C.carbon};padding:5mm;display:flex;flex-direction:column;justify-content:space-between;position:relative}.card__sym{position:absolute;right:5mm;top:5mm;height:9mm}
.letter{width:76mm;height:48mm;border:1px solid ${C.carbon};background:#fff;padding:5mm;display:grid;gap:2.4mm;align-content:start;position:relative;margin-top:3mm}
.letter__top{display:flex;justify-content:space-between;align-items:center;margin-bottom:3mm}.letter i{display:block;height:.5mm;background:rgba(13,13,13,.2)}.letter__foot{position:absolute;left:5mm;right:5mm;bottom:4mm;font-size:1.7mm;border-top:1px solid ${C.carbon};padding-top:1.6mm}
/* assinatura */
.sigs{display:grid;gap:5mm;align-content:start}
.mail{border:1px solid ${C.carbon};background:#fff;padding:8mm;display:grid;gap:3mm}.mail>i{display:block;height:.6mm;background:rgba(128,128,128,.35)}.mail.carbon{background:${C.carbon}}
.sig{margin-top:5mm;font-family:Arial,Helvetica,sans-serif}.sig__mark{padding-right:14px;border-right:2px solid ${C.orange};vertical-align:middle}.sig__body{padding-left:14px}
.sig__name{font-weight:700;font-size:15px;color:${C.carbon}}.sig__role{font-size:12px;color:#55524C;margin-bottom:4px}.sig__line{font-size:12px;color:${C.carbon};line-height:1.5}
.sig--dark .sig__name,.sig--dark .sig__line{color:${C.paper}}.sig--dark .sig__role{color:${C.concrete}}
/* final */
.final{display:flex;flex-direction:column;justify-content:space-between;height:100%}.final__wm{width:100%}.final .list li{color:${C.paper}}
`

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>THIERRY. Studio — Manual de Identidade Visual</title><style>${css}</style></head><body>${pages.join('\n')}</body></html>`
const htmlFile = path.join(os.tmpdir(), 'thierry-manual.html')
fs.writeFileSync(htmlFile, html)

// Assinatura de e-mail pronta para colar (tabela HTML com estilos inline)
fs.writeFileSync(path.join(root, 'brand/email-signature.html'), `<!-- Assinatura de e-mail — Thierry Araújo. Hospede brand/exports/symbol-light.png e troque o src abaixo pela URL pública. -->
<table cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;max-width:420px">
  <tr>
    <td style="padding-right:14px;border-right:2px solid #FF6A2B;vertical-align:middle"><img src="https://thierryaraujodev.com.br/brand/symbol-email.png" width="44" height="44" alt="THIERRY. Studio" style="display:block;border:0"></td>
    <td style="padding-left:14px">
      <p style="margin:0;font-weight:700;font-size:15px;color:#0D0D0D">Thierry Araújo</p>
      <p style="margin:0 0 4px;font-size:12px;color:#55524C">THIERRY. Studio · Software e IA</p>
      <p style="margin:0;font-size:12px;line-height:1.5;color:#0D0D0D">(95) 99143-2677 · <a href="https://thierryaraujodev.com.br" style="color:#0D0D0D">thierryaraujodev.com.br</a></p>
      <p style="margin:0;font-size:12px;line-height:1.5;color:#0D0D0D">Boa Vista — RR / Brasil · <a href="https://www.instagram.com/thierrystudio.co/" style="color:#0D0D0D">@thierrystudio.co</a></p>
    </td>
  </tr>
</table>
`)

const browser = await chromium.launch()
const pg = await browser.newPage()
await pg.goto('file://' + htmlFile, { waitUntil: 'networkidle' })
await pg.evaluate(() => document.fonts.ready)
const pdf = path.join(outDir, 'Thierry_Araujo_Manual_Identidade_Visual.pdf')
await pg.pdf({ path: pdf, width: '297mm', height: '210mm', printBackground: true, preferCSSPageSize: true })
// prévia de cada página (para conferência visual), se pedido
if (process.argv.includes('--preview')) {
  const dir = process.argv[process.argv.indexOf('--preview') + 1]
  fs.mkdirSync(dir, { recursive: true })
  await pg.setViewportSize({ width: 1123, height: 794 })
  const els = await pg.locator('.page').all()
  for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: path.join(dir, `p${pad(i + 1)}.png`) })
}
await browser.close()
console.log(`pdf ${path.relative(root, pdf)} · ${pages.length} páginas · ${(fs.statSync(pdf).size / 1e6).toFixed(1)} MB`)
if (pages.length !== TOTAL) console.warn(`atenção: TOTAL=${TOTAL}, geradas ${pages.length}`)
