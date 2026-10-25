// Trilha calma sintetizada para o vídeo de motion (sem samples de terceiros): acordes suaves, baixo, batida leve
// a partir da 2ª cena, whoosh discreto em cada troca de cena e um impacto grave na entrada da batida.
// Uso: node video/trilha.mjs <saida.wav> <duração total> "<início da cena 2,início da cena 3,...>"
import fs from 'node:fs'
const [out, totalArg, cutsArg] = process.argv.slice(2)
const SR = 44100, TOTAL = Number(totalArg), CUTS = cutsArg.split(',').map(Number)
const N = Math.ceil(TOTAL * SR), L = new Float32Array(N), R = new Float32Array(N)
const BPM = 84, BEAT = 60 / BPM, DROP = CUTS[0] - 0.22 // a batida entra junto com a cortina da 2ª cena
let seed = 99; const noise = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2147483648 - 1 }
const add = (i, l, r = l) => { if (i >= 0 && i < N) { L[i] += l; R[i] += r } }
const hz = m => 440 * Math.pow(2, (m - 69) / 12)

// acordes Lá menor – Fá – Dó – Sol, dois compassos cada
const CHORDS = [[57, 60, 64], [53, 57, 60], [48, 55, 60, 64], [55, 59, 62]]
const BAR = BEAT * 4
for (let i = 0; i < N; i++) {
  const t = i / SR, ci = Math.floor(t / (BAR * 2)) % 4, ct = t % (BAR * 2)
  const env = Math.min(1, ct / 0.6, (BAR * 2 - ct) / 0.3)
  let pad = 0
  for (const m of CHORDS[ci]) { const f = hz(m + 12); pad += Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(2 * Math.PI * f * 2.003 * t) + 0.5 * Math.sin(2 * Math.PI * f * 0.997 * t) }
  const wob = 0.5 + 0.5 * Math.sin(2 * Math.PI * t / BEAT / 2)
  const v = pad * 0.018 * env * (t < DROP ? 0.8 : 0.6 + 0.4 * wob)
  add(i, v * (0.9 + 0.1 * Math.sin(t * 1.3)), v * (0.9 + 0.1 * Math.cos(t * 1.3)))
}
// baixo em colcheias depois da entrada da batida
for (let k = 0; ; k++) {
  const t0 = DROP + k * BEAT / 2; if (t0 >= TOTAL) break
  const ci = Math.floor(t0 / (BAR * 2)) % 4, f = hz(CHORDS[ci][0] - 12)
  for (let j = 0; j < SR * 0.25; j++) { const t = j / SR, e = Math.exp(-t * 9) * Math.min(1, t * 200); add(Math.floor(t0 * SR) + j, (Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(4 * Math.PI * f * t)) * 0.07 * e) }
}
// bumbo e chimbal, bem baixos
for (let k = 0; ; k++) {
  const t0 = DROP + k * BEAT; if (t0 >= TOTAL) break
  const i0 = Math.floor(t0 * SR); let ph = 0
  for (let j = 0; j < SR * 0.35; j++) { const t = j / SR; ph += 2 * Math.PI * (45 + 90 * Math.exp(-t * 28)) / SR; add(i0 + j, Math.sin(ph) * 0.26 * Math.exp(-t * 9)) }
  const h0 = Math.floor((t0 + BEAT / 2) * SR); let prev = 0
  for (let j = 0; j < SR * 0.05; j++) { const n = noise(), hp = n - prev; prev = n; const e = Math.exp(-j / SR * 70); add(h0 + j, hp * 0.018 * e * 0.8, hp * 0.018 * e) }
}
// whoosh: ruído com filtro que abre e fecha, centrado na troca de cena
const whoosh = (tc, dur = 0.7, amp = 0.22) => {
  const i0 = Math.floor((tc - dur * 0.6) * SR); let lp = 0, lp2 = 0
  for (let j = 0; j < SR * dur; j++) {
    const p = j / (SR * dur), e = Math.sin(Math.PI * Math.pow(p, 0.8)) ** 2, cut = 0.02 + 0.5 * e
    const n = noise(); lp += cut * (n - lp); lp2 += cut * (lp - lp2)
    const pan = p * 2 - 1; add(i0 + j, lp2 * amp * e * (1 - pan * 0.5), lp2 * amp * e * (1 + pan * 0.5))
  }
}
CUTS.forEach(c => whoosh(c - 0.22, 0.8, 0.12))
// subida antes da batida e impacto grave na entrada
for (let j = 0; j < SR * 1.6; j++) { const t = j / SR, p = t / 1.6, f = 200 + 900 * p * p; add(Math.floor((DROP - 1.6) * SR) + j, Math.sin(2 * Math.PI * f * t) * 0.03 * p * p + noise() * 0.03 * p * p * p) }
{ const i0 = Math.floor(DROP * SR); let ph = 0; for (let j = 0; j < SR * 1.4; j++) { const t = j / SR; ph += 2 * Math.PI * (38 + 60 * Math.exp(-t * 10)) / SR; add(i0 + j, Math.sin(ph) * 0.3 * Math.exp(-t * 3)) } }

// fade de saída, limitador suave e WAV 16 bits estéreo
const buf = Buffer.alloc(44 + N * 4)
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22)
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40)
for (let i = 0; i < N; i++) {
  const t = i / SR, f = Math.min(1, t / 0.3, (TOTAL - t) / 1.5)
  buf.writeInt16LE(Math.round(Math.tanh(L[i] * f) * 32000), 44 + i * 4); buf.writeInt16LE(Math.round(Math.tanh(R[i] * f) * 32000), 46 + i * 4)
}
fs.writeFileSync(out, buf)
