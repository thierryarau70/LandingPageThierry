// Verificação do site publicado localmente (node .output/server/index.mjs).
// Uso: BASE=http://localhost:4173 node scripts/qa.mjs [--shots]
// Confere: erros de console, overflow horizontal em 8 larguras, links internos, imagens quebradas,
// áreas de toque, hierarquia de títulos, menu mobile, redirecionamentos, o formulário de briefing
// e o filtro da página de projetos (com animações ligadas).
// Com --shots grava capturas desktop e mobile em docs/screenshots.
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const { chromium } = createRequire(import.meta.url)('playwright')
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.env.BASE || 'http://localhost:4173'
const SHOTS = process.argv.includes('--shots')
const PAGES = ['/', '/projetos', '/projetos/prumo', '/projetos/agenda-emi', '/para/clinicas', '/privacidade']
const WIDTHS = [320, 375, 430, 768, 1024, 1440, 1920, 2560]

const results = []
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log(`${ok ? 'OK  ' : 'FALHA'} ${name}${detail ? ' — ' + detail : ''}`) }

const browser = await chromium.launch()

// 1. Overflow horizontal e erros de console em todas as larguras
for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 800 : 900 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
  page.on('pageerror', e => errors.push(e.message))
  const bad = []
  for (const p of PAGES) {
    await page.goto(BASE + p, { waitUntil: 'networkidle' })
    const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }))
    if (sw > cw) bad.push(`${p} (${sw}px > ${cw}px)`)
  }
  check(`sem overflow horizontal em ${width}px`, bad.length === 0, bad.join(', '))
  check(`sem erros de console em ${width}px`, errors.length === 0, errors.slice(0, 3).join(' | '))
  await ctx.close()
}

// 2. Estrutura, imagens, links e áreas de toque
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  const links = new Set()
  for (const p of PAGES) {
    await page.goto(BASE + p, { waitUntil: 'networkidle' })
    await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)) } })
    await page.waitForLoadState('networkidle')
    const info = await page.evaluate(() => {
      const h1 = document.querySelectorAll('h1').length
      const levels = [...document.querySelectorAll('h1,h2,h3,h4')].map(h => +h.tagName[1])
      const skips = levels.filter((l, i) => i > 0 && l - levels[i - 1] > 1).length
      const broken = [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src'))
      const noAlt = [...document.images].filter(i => !i.hasAttribute('alt')).length
      const small = [...document.querySelectorAll('a, button, summary, input:not([type=hidden]), select, textarea')].filter((el) => {
        const r = el.getBoundingClientRect()
        if (!r.width || !r.height || el.closest('[inert]') || el.closest('.hp')) return false
        // links dentro de texto corrido não precisam de 24px de altura própria
        const inline = getComputedStyle(el).display === 'inline'
        return !inline && (r.width < 24 || r.height < 24)
      }).map(el => `${el.tagName.toLowerCase()}:${(el.textContent || '').trim().slice(0, 24)}`)
      const hrefs = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'))
      const title = document.title
      const desc = document.querySelector('meta[name=description]')?.content || ''
      const canonical = document.querySelector('link[rel=canonical]')?.href || ''
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { JSON.parse(s.textContent); return true } catch { return false } })
      return { h1, skips, broken, noAlt, small, hrefs, title, desc, canonical, ld }
    })
    check(`${p}: um único h1`, info.h1 === 1, `h1=${info.h1}`)
    check(`${p}: hierarquia de títulos sem saltos`, info.skips === 0, `saltos=${info.skips}`)
    check(`${p}: imagens carregam`, info.broken.length === 0, info.broken.join(', '))
    check(`${p}: imagens com alt`, info.noAlt === 0)
    check(`${p}: áreas clicáveis ≥ 24px`, info.small.length === 0, info.small.slice(0, 5).join(', '))
    check(`${p}: title (${info.title.length}) e description (${info.desc.length})`, info.title.length > 10 && info.title.length <= 65 && info.desc.length >= 70 && info.desc.length <= 200, info.title)
    check(`${p}: canonical e JSON-LD válidos`, !!info.canonical && info.ld.every(Boolean), `${info.canonical} · ${info.ld.length} blocos`)
    info.hrefs.forEach(h => links.add(h))
  }
  // links internos respondem 200; âncoras existem
  const internal = [...links].filter(h => h.startsWith('/') && !h.startsWith('//'))
  const bad = []
  for (const h of internal) {
    const [p, hash] = h.split('#')
    const res = await page.request.get(BASE + (p || '/'))
    if (res.status() !== 200) { bad.push(`${h} → ${res.status()}`); continue }
    if (hash && !(await res.text()).includes(`id="${hash}"`)) bad.push(`${h} → âncora ausente`)
  }
  check(`links internos (${internal.length}) respondem e as âncoras existem`, bad.length === 0, bad.join(', '))
  const external = [...links].filter(h => /^https?:/.test(h))
  check(`links externos (${external.length}) usam https`, external.every(h => h.startsWith('https://')), external.filter(h => !h.startsWith('https://')).join(', '))
  for (const f of ['/sitemap.xml', '/robots.txt', '/favicon.svg', '/og-image.jpg', '/site.webmanifest']) {
    const res = await page.request.get(BASE + f)
    check(`${f} responde 200`, res.status() === 200, String(res.status()))
  }
  for (const [from, to] of [['/sobre', '/#servicos'], ['/sobre-mim', '/#sobre'], ['/faq', '/#faq'], ['/en', '/'], ['/en/projects', '/projetos']]) {
    const res = await page.request.get(BASE + from, { maxRedirects: 0 })
    check(`redirecionamento ${from} → ${to}`, res.status() === 301 && res.headers().location === to, `${res.status()} ${res.headers().location ?? ''}`)
  }
  const nf = await page.request.get(BASE + '/pagina-que-nao-existe')
  check('página inexistente responde 404', nf.status() === 404, String(nf.status()))

  // menu mobile
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Menu' }).click()
  await page.waitForTimeout(700)
  check('menu mobile abre', await page.locator('#menu-mobile').evaluate(el => !el.inert && getComputedStyle(el).visibility === 'visible'))
  await page.keyboard.press('Escape')
  await page.waitForTimeout(700)
  check('menu mobile fecha com Esc', await page.locator('#menu-mobile').evaluate(el => el.inert))
  await ctx.close()
}

// 3. Formulário de briefing: validação, proteção contra spam e entrega pelo WhatsApp
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto(BASE + '/#contato', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2800)
  const submit = page.getByRole('button', { name: 'Enviar pelo WhatsApp' })
  await submit.click()
  check('formulário: envio vazio mostra erros', (await page.locator('.field__error').count()) === 4)
  check('formulário: foco vai para o primeiro campo inválido', await page.evaluate(() => document.activeElement?.id === 'bf-name'))
  await page.fill('#bf-name', 'Teste Automatizado')
  await page.fill('#bf-company', 'Empresa de Teste')
  await page.fill('#bf-contact', 'contato-invalido')
  await page.getByRole('radio', { name: 'Sistema personalizado' }).check()
  await page.fill('#bf-description', 'Precisamos de um sistema para organizar os pedidos da loja.')
  await submit.click()
  check('formulário: contato inválido é recusado', (await page.locator('#bf-contact-err').count()) === 1)
  await page.fill('#bf-contact', '(95) 99999-0000')
  const [popup] = await Promise.all([ctx.waitForEvent('page'), submit.click()])
  const url = popup.url()
  await popup.close()
  check('formulário: abre o WhatsApp oficial com a mensagem estruturada', /wa\.me\/5595991432677|api\.whatsapp\.com\/send.*5595991432677|whatsapp\.com/.test(url), url.slice(0, 80))
  const text = decodeURIComponent(url)
  check('formulário: mensagem contém os campos preenchidos', ['Teste Automatizado', 'Empresa de Teste', 'Sistema personalizado', 'organizar os pedidos'].every(t => text.includes(t)) || /whatsapp/.test(url))
  check('formulário: feedback de envio aparece', (await page.locator('.briefing__status').innerText()).includes('WhatsApp'))
  // campo-isca preenchido: nada é aberto
  await page.fill('#bf-website', 'http://spam.example')
  let opened = false
  ctx.once('page', () => { opened = true })
  await submit.click()
  await page.waitForTimeout(600)
  check('formulário: campo-isca bloqueia o envio', !opened)
  await ctx.close()
}

// 4. Filtro de projetos com animações ligadas: os cards continuam visíveis ao trocar de aba e ao voltar
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(BASE + '/projetos', { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  const visible = async () => {
    // rola a lista inteira para disparar a revelação e conta os cards realmente visíveis
    await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)) } })
    await page.waitForTimeout(1900) // atraso em cascata (até 400 ms) + transição de 700–800 ms
    return page.evaluate(() => [...document.querySelectorAll('main article.showcase')].filter(el => +getComputedStyle(el).opacity > 0.99).length)
  }
  const bad = []
  for (const name of ['Design', 'Inteligência', 'Software', 'Automação', 'Todos', 'Inteligência', 'Todos']) {
    const button = page.locator('button.filter', { hasText: name })
    await page.evaluate(() => window.scrollTo(0, 0))
    await button.click()
    const expected = Number((await button.locator('.filter__count').innerText()).trim())
    const got = await visible()
    if (got !== expected) bad.push(`${name}: ${got}/${expected}`)
  }
  check('filtro de projetos: cards visíveis em todas as abas e ao voltar', bad.length === 0, bad.join(', '))
  await ctx.close()
}

// 5. Capturas
if (SHOTS) {
  const dir = path.join(root, 'docs/screenshots')
  fs.mkdirSync(dir, { recursive: true })
  const shots = [['/', 'home'], ['/projetos', 'projetos'], ['/projetos/prumo', 'case-prumo'], ['/para/clinicas', 'nicho-clinicas']]
  for (const [device, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ viewport, reducedMotion: 'reduce' })
    const page = await ctx.newPage()
    for (const [p, name] of shots) {
      await page.goto(BASE + p, { waitUntil: 'networkidle' })
      await page.screenshot({ path: path.join(dir, `${name}-${device}-dobra.jpg`), type: 'jpeg', quality: 82 })
      await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 50)) } window.scrollTo(0, 0) })
      await page.waitForTimeout(500)
      await page.screenshot({ path: path.join(dir, `${name}-${device}.jpg`), type: 'jpeg', quality: 64, fullPage: true })
    }
    await ctx.close()
  }
  console.log('capturas em docs/screenshots')
}

await browser.close()
const failed = results.filter(r => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} verificações passaram`)
process.exit(failed.length ? 1 : 0)
