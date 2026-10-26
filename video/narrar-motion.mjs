// Narração dos vídeos pela API de voz da HeyGen (uma fala por cena, com o tempo de cada palavra).
// Precisa de HEYGEN_API_KEY no ambiente. Saída: video/out/<vídeo>/<cena>.wav e narracao.json
// Uso: node video/narrar-motion.mjs [voice_id]              (VIDEO=motion, o padrão: reels "eu faço motion")
//      VIDEO=site node video/narrar-motion.mjs              (stories de divulgação do site)
//      VIDEO=curto node video/narrar-motion.mjs             (versão curta do stories)
//      CENAS=niches node video/narrar-motion.mjs   (refaz só essas falas, uma por vez, e mantém as outras já geradas)
// Sem CENAS, o roteiro vira uma narração contínua (entonação mais natural) recortada por cena.
import { execFileSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
const dir = path.dirname(new URL(import.meta.url).pathname)
const VIDEO = process.env.VIDEO || 'motion'
const out = path.join(dir, 'out', VIDEO); fs.mkdirSync(out, { recursive: true })
const KEY = process.env.HEYGEN_API_KEY
if (!KEY) throw new Error('HEYGEN_API_KEY não está definida neste ambiente')

const SCRIPTS = {}
SCRIPTS.motion = [
  ['hook', 'Sabe aquele vídeo que faz você parar de rolar o feed?'],
  ['reveal', 'Isso é motion design. Movimento que prende o olhar e explica a sua ideia em segundos.'],
  ['niches', 'Além de criar sites, eu também faço vídeos em motion para diversos nichos: clínicas, restaurantes, lojas, cursos, imobiliárias e prestadores de serviço.'],
  ['details', 'Reels, anúncios e vinhetas, com roteiro, narração e trilha, no formato certo para cada rede.'],
  ['close', 'E este vídeo que você está vendo? Foi feito pelo Thierry Araújo. Chama no WhatsApp e coloca a sua marca em movimento.']
]
SCRIPTS.site = [
  ['hook', 'Seu próximo cliente começa com um bom site.'],
  ['intro', 'Eu sou o Thierry Araújo, desenvolvedor web. Crio landing pages, sites, sistemas e automações com inteligência artificial.'],
  ['offer', 'Uma landing page ou catálogo virtual sai por seiscentos reais. Já o site completo e outros sistemas têm valor a combinar, de acordo com o seu projeto.'],
  ['includes', 'Já vem com design e textos escritos para o seu negócio, versão para celular, WhatsApp e formulário de contato, preparação para o Google e domínio ponto com ponto br no seu nome.'],
  ['process', 'Funciona assim: a gente conversa, alinha a proposta, eu crio e você acompanha. A primeira versão sai em até trinta e cinco horas, e o site fica no ar em até cinco dias.'],
  ['services', 'Tudo com carregamento rápido, pensado para o celular, com foco em conversão e pronto para os seus anúncios.'],
  ['ai', 'Também crio automações com inteligência artificial: atendimento no WhatsApp, respostas automáticas, envio de e-mails e relatórios, tudo integrado ao seu negócio.'],
  ['extras', 'Precisa de loja virtual, login ou sistema? É um adicional de novecentos e noventa e sete reais. Sistemas com inteligência artificial e projetos maiores, sob orçamento.'],
  ['niches', 'Atendo clínicas, cursos, lojas e prestadores de serviço.'],
  ['projects', 'Alguns projetos no ar: Radar de Clientes, Doutora Emile Vitória, Arouche Moda Íntima, Agrovet e Attletto.'],
  ['about', 'São quatro anos de experiência no mercado, e você fala direto comigo, da primeira conversa à publicação.'],
  ['close', 'Acesse Thierry Araújo dev ponto com ponto br, ou chama no WhatsApp.']
]
// versão curta do stories (30–45 s): usa as mesmas cenas de site.html
SCRIPTS.curto = [
  ['hook', 'Seu próximo cliente começa com um bom site.'],
  ['intro', 'Prazer, eu sou o Thierry Araújo. Eu crio landing pages, sites, sistemas, e automações com inteligência artificial.'],
  ['offer', 'Uma landing page ou catálogo virtual sai por seiscentos reais. Já o site completo e outros sistemas têm valor a combinar.'],
  ['includes', 'E já vem com design, textos, versão pro celular, WhatsApp, Google, e domínio no seu nome.'],
  ['ai', 'Também faço automações com inteligência artificial, como atendimento no WhatsApp, respostas automáticas e relatórios.'],
  ['social', 'Quer ver meus trabalhos? Me segue no Instagram, e dá uma olhada em Thierry Araújo dev ponto com ponto br.'],
  ['close', 'Me chama no WhatsApp, e bora colocar o seu negócio no ar!']
]
const SCRIPT = SCRIPTS[VIDEO]
if (!SCRIPT) throw new Error(`roteiro desconhecido: ${VIDEO}`)
const voiceId = process.argv[2] || 'd703f08d1ef34302a36945aa3efc7b3f' // Murilo (pt-BR, masculina)
const SPEED = 1 // velocidade natural: mais devagar soava robótico
const PAUSE = 0.4 // pausa entre as cenas na narração contínua (s)

// API v3 de voz da HeyGen (a v1 é desligada em 31/10/2026)
const speak = async text => {
  const res = await fetch('https://api.heygen.com/v3/voices/speech', {
    method: 'POST', headers: { 'X-Api-Key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ voice_id: voiceId, text, language: 'pt', speed: SPEED, force_regenerate: true })
  })
  const r = await res.json()
  if (!res.ok || !r.data?.audio_url) throw new Error(`voz: ${res.status} ${JSON.stringify(r).slice(0, 300)}`)
  const audio = await fetch(r.data.audio_url)
  if (!audio.ok) throw new Error(`download: ${audio.status}`)
  const words = (r.data.word_timestamps ?? []).filter(w => !/^<.*>$/.test(w.word)).map(w => ({ w: w.word, s: w.start, e: w.end }))
  return { buf: Buffer.from(await audio.arrayBuffer()), duration: r.data.duration, words }
}
const countWords = text => text.split(/\s+/).filter(Boolean).length
// -ss/-t antes do -i: o trecho começa no tempo 0, então o fade de saída fica no fim do trecho (e não no meio da narração)
const cut = (src, dst, from, to) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', from.toFixed(3), '-t', (to - from).toFixed(3), '-i', src, '-af', `afade=t=in:d=0.02,afade=t=out:st=${(to - from - 0.03).toFixed(3)}:d=0.03`, '-c:a', 'pcm_s16le', dst])

const only = process.env.CENAS?.split(',')
const result = { voice_id: voiceId, scenes: [] }
if (!only) {
  // narração contínua: o texto todo numa fala só, para a entonação seguir de uma frase para a outra;
  // depois cada cena é recortada pelo tempo das palavras
  const full = await speak(SCRIPT.map(([, text]) => text).join(` <break time="${PAUSE}s"/> `))
  const fullFile = path.join(out, 'completa.wav'); fs.writeFileSync(fullFile, full.buf)
  const counts = SCRIPT.map(([, text]) => countWords(text))
  if (counts.reduce((x, y) => x + y) !== full.words.length) throw new Error(`palavras não batem (${counts.reduce((x, y) => x + y)} no roteiro, ${full.words.length} na voz); use CENAS=... para gerar fala por fala`)
  // silêncios reais da narração: as marcações de tempo da HeyGen se adiantam até ~0,2 s, então cada corte vai
  // para o meio do silêncio mais próximo da estimativa
  const log = spawnSync('ffmpeg', ['-hide_banner', '-i', fullFile, '-af', 'silencedetect=n=-40dB:d=0.15', '-f', 'null', '-'], { encoding: 'utf8' }).stderr // o ffmpeg escreve o relatório no stderr
  const silences = []; let st = null
  for (const m of log.matchAll(/silence_(start|end): ([0-9.]+)/g)) { if (m[1] === 'start') st = +m[2]; else if (st !== null) { silences.push([st, +m[2]]); st = null } }
  const snap = t => { let best = null, bd = 0.8; for (const [a, b] of silences) { const d = t < a ? a - t : t > b ? t - b : 0; if (d < bd) { bd = d; best = (a + b) / 2 } } return best ?? t }
  const groups = []; let k = 0
  for (const n of counts) { groups.push(full.words.slice(k, k + n)); k += n }
  for (const [i, [id, text]] of SCRIPT.entries()) {
    // o fim marcado de cada palavra vem um pouco antes do som acabar: o corte fica no meio da pausa entre as cenas
    const ws = groups[i], prev = groups[i - 1], next = groups[i + 1]
    const from = prev ? snap((prev.at(-1).e + ws[0].s) / 2) : Math.max(0, ws[0].s - 0.12)
    const to = next ? snap((ws.at(-1).e + next[0].s) / 2) : full.duration
    const file = path.join(out, `${id}.wav`); cut(fullFile, file, from, to)
    result.scenes.push({ id, text, file, duration: to - from, words: ws.map(w => ({ w: w.w, s: w.s - from, e: w.e - from })) })
    console.log(id, (to - from).toFixed(2), 's', `(corte ${from.toFixed(2)}–${to.toFixed(2)})`)
  }
} else {
  // refaz só algumas falas, uma por vez, e mantém as outras já geradas
  const prev = JSON.parse(fs.readFileSync(path.join(out, 'narracao.json'), 'utf8'))
  for (const [id, text] of SCRIPT) {
    const old = prev.scenes.find(s => s.id === id)
    if (!only.includes(id) && old) { result.scenes.push(old); continue }
    const r = await speak(text), file = path.join(out, `${id}.wav`)
    fs.writeFileSync(file, r.buf)
    result.scenes.push({ id, text, file, duration: r.duration, words: r.words })
    console.log(id, r.duration.toFixed(2), 's')
  }
}
fs.writeFileSync(path.join(out, 'narracao.json'), JSON.stringify(result, null, 2))
