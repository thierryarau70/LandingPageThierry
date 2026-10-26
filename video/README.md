# Vídeo de divulgação

Gerador do vídeo vertical (1080×1920) de divulgação do site, no mesmo visual do site: campo ASCII e textos que se decodificam. A narração feminina em pt-BR é gerada pela HeyGen.

```bash
bash video/build.sh            # escolhe uma voz feminina em português
bash video/build.sh <voice_id> # ou usa uma voz específica (veja video/out/vozes.json)
```

Precisa do `HEYGEN_API_KEY` no ambiente, de `ffmpeg` e do Chromium do Playwright. O roteiro fica em `narrar.mjs` e as cenas em `promo.html`. A pasta `video/` fica fora do build do Nuxt, e `video/out/` não vai para o git.

## Reels "eu faço motion"

Vídeo vertical de ~37 s, no visual claro do site, divulgando o serviço de motion design para diversos nichos, com narração masculina e calma em pt-BR (voz Murilo da HeyGen, com legenda sincronizada palavra a palavra) e trilha sintetizada.

```bash
bash video/build-motion.sh              # narração com a voz Murilo (masculina)
bash video/build-motion.sh <voice_id>   # ou outra voz da HeyGen
REUSAR_VOZ=1 bash video/build-motion.sh # remonta sem gerar a voz de novo
```

O roteiro fica em `narrar-motion.mjs`, as cenas em `motion.html` e a trilha em `trilha.mjs`. Resultado: `video/out/motion/reels-motion-thierry.mp4`.

## Stories de divulgação do site

Vídeo vertical de ~1min40, no visual claro do site e sem legenda, com todas as informações do site: landing page por R$ 600, site completo e sistemas com valor a combinar, o que está incluso, como funciona e prazos, benefícios, automações com IA, adicional de R$ 997 e sistemas com IA sob orçamento, nichos, projetos, sobre mim e contato. Narração do Murilo (HeyGen) e animações suaves.

```bash
VIDEO=site bash video/build-motion.sh              # gera a voz e monta o vídeo
VIDEO=site REUSAR_VOZ=1 bash video/build-motion.sh # remonta sem gerar a voz de novo
```

O roteiro fica em `narrar-motion.mjs` (`SCRIPTS.site`) e as cenas em `site.html`. Resultado: `video/out/site/stories-site-thierry.mp4`.

Versão curta (~44 s), com as mesmas cenas e os pontos principais: `VIDEO=curto bash video/build-motion.sh` (roteiro em `SCRIPTS.curto`). Resultado: `video/out/curto/stories-curto-thierry.mp4`.
