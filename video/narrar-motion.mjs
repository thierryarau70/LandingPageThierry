// Narração dos vídeos pela API de voz da HeyGen (uma fala por cena, com o tempo de cada palavra).
// Precisa de HEYGEN_API_KEY no ambiente. Saída: video/out/<vídeo>/<cena>.wav e narracao.json
// Uso: node video/narrar-motion.mjs [voice_id]              (VIDEO=motion, o padrão: reels "eu faço motion")
//      VIDEO=site node video/narrar-motion.mjs              (stories de divulgação do site)
//      CENAS=niches node video/narrar-motion.mjs   (refaz só essas falas e mantém as outras já geradas)
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
  ['intro', 'Eu sou o Thierry Araújo, desenvolvedor web. Crio landing pages, sites e sistemas, com atenção a cada detalhe.'],
  ['offer', 'Seu site completo, com até cinco páginas ou uma landing page, por oitocentos reais.'],
  ['includes', 'Já vem com design e textos escritos para o seu negócio, versão para celular, WhatsApp e formulário de contato, preparação para o Google e domínio ponto com ponto br no seu nome.'],
  ['process', 'Funciona assim: a gente conversa, alinha a proposta, eu crio e você acompanha. A primeira versão sai em até trinta e cinco horas, e o site fica no ar em até cinco dias.'],
  ['services', 'Tudo com carregamento rápido, pensado para o celular, com foco em conversão e pronto para os seus anúncios.'],
  ['extras', 'Precisa de loja virtual, login ou sistema? É um adicional de novecentos e noventa e sete reais. Plataformas e projetos maiores, sob orçamento.'],
  ['niches', 'Atendo clínicas, cursos, lojas e prestadores de serviço.'],
  ['projects', 'Alguns projetos no ar: Plataforma Prumo, Radar de Clientes, Doutora Emile Vitória, Arouche Moda Íntima, Agrovet e Attletto.'],
  ['about', 'São quatro anos de experiência no mercado, e você fala direto comigo, da primeira conversa à publicação.'],
  ['close', 'Acesse Thierry Araújo dev ponto com ponto br, ou chama no WhatsApp.']
]
const SCRIPT = SCRIPTS[VIDEO]
if (!SCRIPT) throw new Error(`roteiro desconhecido: ${VIDEO}`)
const voiceId = process.argv[2] || 'd703f08d1ef34302a36945aa3efc7b3f' // Murilo (pt-BR, masculina)
const SPEED = 0.95 // um pouco mais devagar, para soar calma

const only = process.env.CENAS?.split(',')
const prev = only ? JSON.parse(fs.readFileSync(path.join(out, 'narracao.json'), 'utf8')) : null
const result = { voice_id: voiceId, scenes: [] }
for (const [id, text] of SCRIPT) {
  const old = prev?.scenes.find(s => s.id === id)
  if (only && !only.includes(id) && old) { result.scenes.push(old); continue }
  const res = await fetch('https://api.heygen.com/v1/audio/text_to_speech', {
    method: 'POST', headers: { 'X-Api-Key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ voice_id: voiceId, text, language: 'pt', speed: SPEED })
  })
  const r = await res.json()
  if (!res.ok || !r.data?.audio_url) throw new Error(`fala ${id}: ${res.status} ${JSON.stringify(r).slice(0, 300)}`)
  const file = path.join(out, `${id}.wav`)
  const audio = await fetch(r.data.audio_url)
  if (!audio.ok) throw new Error(`download ${id}: ${audio.status}`)
  fs.writeFileSync(file, Buffer.from(await audio.arrayBuffer()))
  const words = (r.data.word_timestamps ?? []).filter(w => !/^<.*>$/.test(w.word)).map(w => ({ w: w.word, s: w.start, e: w.end }))
  result.scenes.push({ id, text, file, duration: r.data.duration, words })
  console.log(id, r.data.duration.toFixed(2), 's')
}
fs.writeFileSync(path.join(out, 'narracao.json'), JSON.stringify(result, null, 2))
