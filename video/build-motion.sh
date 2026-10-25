#!/usr/bin/env bash
# Vídeo "eu faço motion" (reels 1080×1920) com narração da HeyGen e trilha sintetizada.
# 1) gera a voz de cada cena (com o tempo de cada palavra)  2) renderiza motion.html  3) gera a trilha  4) mixa tudo
# Uso: bash video/build-motion.sh [voice_id]      Resultado: video/out/motion/reels-motion-thierry.mp4
# REUSAR_VOZ=1 remonta com a narração já gerada em out/motion/ (sem gastar crédito)
set -euo pipefail
cd "$(dirname "$0")"
[[ -n "${REUSAR_VOZ:-}" ]] || node narrar-motion.mjs "${1:-}"

LEAD=0.4; GAP=0.5; TAIL=1.6   # mesmos valores de motion.html
node -e 'const fs=require("fs");fs.writeFileSync("out/motion/timing.js","window.NARR = "+fs.readFileSync("out/motion/narracao.json","utf8"))'
PAGE=motion.html node render.mjs out/motion/video.mp4

read -r TOTAL CUTS < <(node -e '
const n=require("./out/motion/narracao.json"); let t='"$LEAD"', cuts=[]
n.scenes.forEach((s,i)=>{ if(i) cuts.push(t.toFixed(3)); t+=s.duration+'"$GAP"' })
console.log((t+'"$TAIL"').toFixed(3), cuts.join(","))')
node trilha.mjs out/motion/trilha.wav "$TOTAL" "$CUTS"

# cada fala começa no início da sua cena; a trilha abaixa quando a voz entra
inputs=(); filters=""; t=$LEAD; i=0
while read -r file dur; do
  inputs+=(-i "$file")
  ms=$(node -e "console.log(Math.round($t*1000))")
  filters+="[$((i+2)):a]aresample=44100,aformat=channel_layouts=stereo,adelay=${ms}|${ms}[a$i];"
  t=$(node -e "console.log($t+$dur+$GAP)"); i=$((i+1))
done < <(node -e 'require("./out/motion/narracao.json").scenes.forEach(s=>console.log(s.file, s.duration))')
mix=""; for ((k=0;k<i;k++)); do mix+="[a$k]"; done
ffmpeg -y -loglevel error -i out/motion/video.mp4 -i out/motion/trilha.wav "${inputs[@]}" \
  -filter_complex "${filters}${mix}amix=inputs=$i:normalize=0,apad,volume=1.6,asplit[v1][v2];[1:a]volume=0.55[m];[m][v1]sidechaincompress=threshold=0.03:ratio=5:attack=20:release=350[duck];[duck][v2]amix=inputs=2:normalize=0,alimiter=limit=0.95[aud]" \
  -map 0:v -map "[aud]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart out/motion/reels-motion-thierry.mp4
echo "pronto: video/out/motion/reels-motion-thierry.mp4"
