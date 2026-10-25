#!/usr/bin/env bash
# Vídeo de divulgação do site com narração feminina da HeyGen.
# 1) gera a voz de cada cena  2) ajusta a duração das cenas à voz  3) renderiza o motion  4) junta áudio e vídeo
# Uso: bash video/build.sh [voice_id]      Resultado: video/out/divulgacao-thierryaraujodev.mp4
set -euo pipefail
cd "$(dirname "$0")"
export PATH="$HOME/.local/bin:$PATH"
# REUSAR_VOZ=1 remonta o vídeo com a narração já gerada em out/ (sem gastar crédito)
if [[ -z "${REUSAR_VOZ:-}" ]]; then
  command -v heygen >/dev/null || curl -fsSL https://static.heygen.ai/cli/install.sh | bash
  [[ -n "${HEYGEN_API_KEY:-}" ]] || { echo "HEYGEN_API_KEY não está definida neste ambiente" >&2; exit 3; }
  node narrar.mjs "${1:-}"
fi

LEAD=0.5   # mesmo valor de LEAD em promo.html
GAP=0.45   # respiro depois de cada fala
DURS=$(node -e 'const n=require("./out/narracao.json");console.log(n.scenes.map(s=>(s.duration+'"$GAP"').toFixed(2)).join(","))')
echo "durações das cenas: $DURS"
node render.mjs out/motion.mp4 "$DURS"

# Cada fala começa no início da sua cena
inputs=(); filters=""; t=$LEAD; i=0
while read -r file dur; do
  inputs+=(-i "$file")
  ms=$(node -e "console.log(Math.round($t*1000))")
  filters+="[$((i+1)):a]adelay=${ms}|${ms}[a$i];"
  t=$(node -e "console.log($t+$dur+$GAP)"); i=$((i+1))
done < <(node -e 'require("./out/narracao.json").scenes.forEach(s=>console.log(s.file, s.duration))')
mix=""; for ((k=0;k<i;k++)); do mix+="[a$k]"; done
ffmpeg -y -loglevel error -i out/motion.mp4 "${inputs[@]}" \
  -filter_complex "${filters}${mix}amix=inputs=$i:normalize=0,apad[aud]" \
  -map 0:v -map "[aud]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart out/divulgacao-thierryaraujodev.mp4
echo "pronto: video/out/divulgacao-thierryaraujodev.mp4"
