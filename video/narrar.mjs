// Gera a narração feminina (pt-BR) com o CLI da HeyGen: uma fala por cena.
// Precisa do CLI instalado e de HEYGEN_API_KEY no ambiente. Saída: video/out/<cena>.mp3 e video/out/narracao.json
// Uso: node video/narrar.mjs [voice_id]   (sem voice_id, escolhe a primeira voz feminina em português)
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
const dir = path.dirname(new URL(import.meta.url).pathname)
const out = path.join(dir, 'out'); fs.mkdirSync(out, { recursive: true })
const heygen = (...args) => JSON.parse(execFileSync('heygen', args, { encoding: 'utf8', maxBuffer: 64 << 20 }))

export const SCRIPT = [
  ['hook', 'Seu negócio ainda não tem um site?'],
  ['offer', 'Com o Thierry Araújo, seu site fica pronto em até cinco dias. Design, textos, versão para celular e domínio ponto com ponto br, tudo incluso por seiscentos reais.'],
  ['process', 'Você vê a primeira versão em trinta e cinco horas, pede os ajustes e fala direto com quem desenvolve.'],
  ['projects', 'Veja os projetos que já estão no ar e peça o seu.'],
  ['close', 'Acesse thierryaraujodev ponto com ponto br, ou chame no WhatsApp.']
]

let voiceId = process.argv[2]
if (!voiceId) {
  const list = heygen('voice', 'list', '--gender', 'female', '--language', 'Portuguese', '--limit', '100')
  const voices = (list.data?.voices ?? list.data ?? []).filter(v => /pt|portugu/i.test(`${v.language} ${v.locale ?? ''}`))
  fs.writeFileSync(path.join(out, 'vozes.json'), JSON.stringify(voices, null, 2))
  const br = voices.find(v => /BR|Brazil/i.test(`${v.language} ${v.locale ?? ''} ${v.name}`)) ?? voices[0]
  if (!br) throw new Error('nenhuma voz feminina em português encontrada; veja video/out/vozes.json')
  voiceId = br.voice_id
  console.log('voz:', br.name, voiceId, br.language, br.locale ?? '')
}

const result = { voice_id: voiceId, scenes: [] }
for (const [id, text] of SCRIPT) {
  const r = heygen('voice', 'speech', 'create', '--voice-id', voiceId, '--text', text, '--language', 'pt')
  const file = path.join(out, `${id}.mp3`)
  const res = await fetch(r.data.audio_url)
  if (!res.ok) throw new Error(`download ${id}: ${res.status}`)
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()))
  result.scenes.push({ id, text, file, duration: r.data.duration })
  console.log(id, r.data.duration.toFixed(2), 's')
}
fs.writeFileSync(path.join(out, 'narracao.json'), JSON.stringify(result, null, 2))
