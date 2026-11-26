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

## "Sistema com IA ou landing page?"

Vídeo vertical de ~56 s, escuro e tecnológico (campo ASCII, grade em perspectiva, HUD e textos que se decodificam). Ele pergunta se o cliente quer um sistema com IA ou só uma landing page, mostra 5 funções da IA, cada uma com uma demonstração animada (atendimento no WhatsApp 24h, agenda e orçamentos, clientes prontos para fechar, áudio que vira dados, relatórios e emails automáticos), oferece a landing page ou catálogo como alternativa (sem preço) e fecha com o pedido de orçamento pelo WhatsApp. A narração é do Murilo na velocidade natural (abaixo de 1 soa robótica), sem trilha (`SEM_TRILHA=1` é o padrão desse vídeo).

```bash
VIDEO=ia bash video/build-motion.sh              # gera a voz e monta o vídeo
VIDEO=ia REUSAR_VOZ=1 bash video/build-motion.sh # remonta sem gerar a voz de novo
```

O roteiro fica em `narrar-motion.mjs` (`SCRIPTS.ia`) e as cenas em `ia.html`. Resultado: `video/out/ia/reels-ia-thierry.mp4`. Se o `fetch` do Node não passar pelo proxy da sessão, rode com `NODE_USE_ENV_PROXY=1`.

## "Como funciona um agente de IA"

Reels vertical de ~50 s no design branco do site (fundo `#f5f7fc`, roxo `#5745cb`, campo ASCII claro e textos que se decodificam). Ele explica o que é um agente de IA comparando com um robô comum (entende, decide e executa), mostra como funciona (recebe a mensagem, consulta agenda, planilha e sistema, e age) e dá três exemplos animados: horário marcado às 23h, pedido no WhatsApp com orçamento, link de pagamento e estoque, e o resumo do dia. Fecha com "eu crio o seu agente" e o contato pelo WhatsApp. A narração é do Murilo, com a trilha sintetizada por baixo.

```bash
VIDEO=agente VOZ_GRATIS=1 bash video/build-motion.sh # gera a voz pelo modelo gratuito da HeyGen e monta o vídeo
VIDEO=agente REUSAR_VOZ=1 bash video/build-motion.sh # remonta sem gerar a voz de novo
```

`VOZ_GRATIS=1` usa o modelo gratuito da HeyGen (`heygen-voice-1-turbo-free`), que não gasta crédito de API mas tem limite diário. O roteiro fica em `narrar-motion.mjs` (`SCRIPTS.agente`) e as cenas em `agente.html`. Resultado: `video/out/agente/reels-agente-thierry.mp4`.

## Reels de rebranding (THIERRY. Studio)

Vídeo vertical de 35 s (70 batidas a 120 BPM) apresentando a nova identidade: o nome antigo riscado, o wordmark montado letra a letra, os três pilares em parede de palavras, o símbolo T.S, a paleta e a tipografia, projetos reais e a assinatura final. Não tem narração; os cortes seguem uma grade de batidas para sincronizar com a música.

```bash
node video/rebranding.mjs                                          # 120 BPM, mudo
BPM=122 node video/rebranding.mjs                                  # outro andamento
BPM=122 MUSICA=trilha.mp3 INICIO=12.5 node video/rebranding.mjs    # com trilha, a partir de 12,5 s da música
STILLS=1 node video/rebranding.mjs                                 # só quadros de conferência
```

Os projetos que aparecem ficam em `REEL_PROJECTS`, no topo de `rebranding.mjs`. As cenas usam a geometria da marca (`brand/scripts/geometry.mjs`) e as capturas de `public/projetos`. Resultado: `video/out/rebranding/reels-rebranding-thierry-studio.mp4`. A trilha é escolhida por quem publica; confira os direitos de uso da música no Instagram.

A grade segue frases de 4 compassos: nome antigo nas batidas 0–4, wordmark 4–12, pilares 12–24, símbolo 24–36, paleta e tipografia 36–48, projetos de 48 em diante (duas batidas cada) e assinatura nas 10 batidas finais. Para sincronizar, faça a entrada da batida da música cair na batida 4: `INICIO` = instante dessa entrada − 4 batidas. Com "Territory", do The Blaze (120 BPM, versão do vídeo oficial, batida em 2:20,11), fica `BPM=120 INICIO=138.11`; o arquivo da música não entra no repositório.
