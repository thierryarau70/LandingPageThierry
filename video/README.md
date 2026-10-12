# Vídeo de divulgação

`promo.mp4`: vídeo vertical 1080x1920 (Reels, Stories, TikTok), 28 s, sem áudio.

Para editar: altere `promo.html` (textos, cores e tempos das animações em CSS) e gere de novo:

```
node video/render.mjs video/promo.mp4 30 28
```

Precisa de Playwright/Chromium e `ffmpeg`. Para conferir um quadro só: `node video/render.mjs quadro.png 30 28 9.5`.
