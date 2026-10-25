# Vídeo de divulgação

Gerador do vídeo vertical (1080×1920) de divulgação do site, no mesmo visual do site: campo ASCII e textos que se decodificam. A narração feminina em pt-BR é gerada pela HeyGen.

```bash
bash video/build.sh            # escolhe uma voz feminina em português
bash video/build.sh <voice_id> # ou usa uma voz específica (veja video/out/vozes.json)
```

Precisa do `HEYGEN_API_KEY` no ambiente, de `ffmpeg` e do Chromium do Playwright. O roteiro fica em `narrar.mjs` e as cenas em `promo.html`. A pasta `video/` fica fora do build do Nuxt, e `video/out/` não vai para o git.
