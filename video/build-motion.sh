#!/usr/bin/env bash
# Vídeos verticais (1080×1920) com narração da HeyGen e trilha sintetizada.
# 1) gera a voz de cada cena (com o tempo de cada palavra)  2) renderiza <vídeo>.html  3) gera a trilha  4) mixa tudo
# Uso: bash video/build-motion.sh [voice_id]             Resultado: video/out/motion/reels-motion-thierry.mp4
#      VIDEO=site bash video/build-motion.sh             Resultado: video/out/site/stories-site-thierry.mp4
#      VIDEO=curto bash video/build-motion.sh            Resultado: video/out/curto/stories-curto-thierry.mp4 (30–45 s)
# REUSAR_VOZ=1 remonta com a narração já gerada em out/<vídeo>/ (sem gastar crédito)
# SEM_TRILHA=1 deixa só a narração (o vídeo "ia" já sai sem trilha por padrão)
set -euo pipefail
cd "$(dirname "$0")"
export VIDEO="${VIDEO:-motion}"
OUT="out/$VIDEO"
PAGE="$VIDEO.html?v=$VIDEO"
case "$VIDEO" in
  site) FINAL="$OUT/stories-site-thierry.mp4" ;;
  curto) FINAL="$OUT/stories-curto-thierry.mp4"; PAGE="site.html?v=curto" ;; # mesmas cenas do stories completo
  *) FINAL="$OUT/reels-$VIDEO-thierry.mp4" ;;
esac
[[ "$VIDEO" == ia ]] && SEM_TRILHA="${SEM_TRILHA:-1}"
[[ -n "${REUSAR_VOZ:-}" ]] || node narrar-motion.mjs "${1:-}"

LEAD=0.4; GAP=0.5; TAIL=1.6   # mesmos valores das páginas (motion.html, site.html)
OUT=$OUT node -e 'const fs=require("fs");fs.writeFileSync(process.env.OUT+"/timing.js","window.NARR = "+fs.readFileSync(process.env.OUT+"/narracao.json","utf8"))'
PAGE="$PAGE" node render.mjs $OUT/video.mp4

read -r TOTAL CUTS < <(OUT=$OUT node -e '
const n=require("./"+process.env.OUT+"/narracao.json"); let t='"$LEAD"', cuts=[]
n.scenes.forEach((s,i)=>{ if(i) cuts.push(t.toFixed(3)); t+=s.duration+'"$GAP"' })
console.log((t+'"$TAIL"').toFixed(3), cuts.join(","))')
node trilha.mjs $OUT/trilha.wav "$TOTAL" "$CUTS"

# cada fala começa no início da sua cena; a trilha abaixa um pouco quando a voz entra (sem sumir)
inputs=(); filters=""; t=$LEAD; i=0
while read -r file dur; do
  inputs+=(-i "$file")
  ms=$(node -e "console.log(Math.round($t*1000))")
  filters+="[$((i+2)):a]aresample=44100,aformat=channel_layouts=stereo,adelay=${ms}|${ms}[a$i];"
  t=$(node -e "console.log($t+$dur+$GAP)"); i=$((i+1))
done < <(OUT=$OUT node -e 'require("./"+process.env.OUT+"/narracao.json").scenes.forEach(s=>console.log(s.file, s.duration))')
mix=""; for ((k=0;k<i;k++)); do mix+="[a$k]"; done
if [[ -n "${SEM_TRILHA:-}" ]]; then
  # só a voz, com o mesmo ganho e limitador da versão com trilha
  ffmpeg -y -loglevel error -i $OUT/video.mp4 -i $OUT/trilha.wav "${inputs[@]}" \
    -filter_complex "${filters}${mix}amix=inputs=$i:normalize=0,apad,volume=1.6,alimiter=limit=0.95[aud]" \
    -map 0:v -map "[aud]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$FINAL"
  echo "pronto (sem trilha): video/$FINAL"; exit 0
fi
ffmpeg -y -loglevel error -i $OUT/video.mp4 -i $OUT/trilha.wav "${inputs[@]}" \
  -filter_complex "${filters}${mix}amix=inputs=$i:normalize=0,apad,volume=1.6,asplit[v1][v2];[1:a]volume=1.3[m];[m][v1]sidechaincompress=threshold=0.05:ratio=2.5:attack=30:release=400[duck];[duck][v2]amix=inputs=2:normalize=0,alimiter=limit=0.95[aud]" \
  -map 0:v -map "[aud]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$FINAL"
echo "pronto: video/$FINAL"
