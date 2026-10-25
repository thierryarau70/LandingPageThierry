// Narração do vídeo "eu faço motion" pela API de voz da HeyGen (uma fala por cena, com o tempo de cada palavra).
// Precisa de HEYGEN_API_KEY no ambiente. Saída: video/out/motion/<cena>.wav, narracao.json e timing.js (lido por motion.html)
// Uso: node video/narrar-motion.mjs [voice_id]
import fs from 'node:fs'
import path from 'node:path'
const dir = path.dirname(new URL(import.meta.url).pathname)
const out = path.join(dir, 'out', 'motion'); fs.mkdirSync(out, { recursive: true })
const KEY = process.env.HEYGEN_API_KEY
if (!KEY) throw new Error('HEYGEN_API_KEY não está definida neste ambiente')

export const SCRIPT = [
  ['hook', 'Sabe aquele vídeo que faz você parar de rolar o feed?'],
  ['reveal', 'Isso é motion design. Movimento que prende o olhar e explica a sua ideia em segundos.'],
  ['niches', 'Eu crio vídeos em motion para diversos nichos: clínicas, restaurantes, lojas, cursos, imobiliárias e prestadores de serviço.'],
  ['details', 'Reels, anúncios e vinhetas, com roteiro, narração e trilha, no formato certo para cada rede.'],
  ['close', 'E este vídeo que você está vendo? Foi feito pelo Thierry Araújo. Chama no WhatsApp e coloca a sua marca em movimento.']
]
const voiceId = process.argv[2] || 'ab40d65529a74f0e83528a1c2133a3b0' // Serene Sofia (pt-BR, feminina e calma)
const SPEED = 0.95 // um pouco mais devagar, para soar tranquila

const result = { voice_id: voiceId, scenes: [] }
for (const [id, text] of SCRIPT) {
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
