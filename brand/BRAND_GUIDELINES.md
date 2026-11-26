# THIERRY. Studio

Guia rápido da identidade visual de **Thierry Araújo**. A versão completa, com mockups e aplicações, está em
[`guidelines/Thierry_Araujo_Manual_Identidade_Visual.pdf`](guidelines/Thierry_Araujo_Manual_Identidade_Visual.pdf) (24 páginas).

- **Nome da marca:** THIERRY. Studio (lê-se "Thierry Studio"; o ponto quadrado laranja é a assinatura visual).
- **Posicionamento:** estúdio independente de engenharia digital — marca pessoal de Thierry Araújo; não afirma equipe nem empresa de grande porte.
- **Assinatura comercial:** Design. Software. Inteligência.
- **Conceito:** Modern Brutalism — estrutura aparente, duas superfícies e um sinal, forma com regra.

## Logotipo

Três propostas foram desenhadas em SVG vetorial (sem texto em fonte: tudo é contorno).

| Conceito | Arquivo | Ideia | Situação |
| --- | --- | --- | --- |
| A — Monograma estrutural | `logos/concept-a.svg` | T e A unidos por uma viga: pilar e empena. Evolui a ligadura TA do avatar atual | Alternativa (selos, carimbos) |
| B — Wordmark brutalista | `logos/concept-b.svg` | Alfabeto próprio sobre módulos; ponto final quadrado laranja sob o braço do Y | **Recomendado e aplicado no site** |
| C — Símbolo modular | `logos/concept-c.svg` | Malha 4 × 4 com blocos de tamanhos diferentes: a planta de um sistema | Elemento gráfico de apoio |

**Por que o B:** mantém a marca ligada ao nome, é legível sem explicação e entrega um elemento de sistema — o ponto
quadrado — que organiza títulos, botões, favicon e avatar. A redução dele é o símbolo **T.**

### Arquivos

| Uso | SVG (`brand/logos`) | PNG (`brand/exports`) |
| --- | --- | --- |
| Logo principal, empilhada (fundos claros) | `primary.svg` · `primary-on-light.svg` | `logo-light.png` |
| Logo principal (fundos escuros) | `primary-on-dark.svg` | `logo-dark.png` |
| Horizontal: THIERRY. pesado + STUDIO leve | `horizontal.svg` · `horizontal-on-dark.svg` | `logo-horizontal-light.png` · `logo-horizontal-dark.png` |
| Wordmark sem STUDIO (espaços reduzidos) | `wordmark.svg` · `wordmark-on-dark.svg` | — |
| Símbolo isolado | `symbol.svg` · `symbol-on-dark.svg` · `symbol-monochrome.svg` | `symbol-light.png` · `symbol-dark.png` |
| Monocromática | `monochrome.svg` · `monochrome-white.svg` | `logo-monochrome-black.png` · `logo-monochrome-white.png` |
| Favicon | `favicon.svg` · `favicon-light.svg` | `favicon.svg` (cópia) |
| Avatar do Instagram | `instagram-avatar.svg` · `instagram-avatar-light.svg` | `instagram-avatar.png` (1080 × 1080) |

Os PNGs têm fundo transparente (exceto avatar e favicon) e já incluem a área de proteção.

### Regras

- **Construção:** altura 100, haste 26, traço 22, chanfro de 45° com 14, ponto 26 × 26.
- **Área de proteção:** 2X em todos os lados (X = lado do ponto). Mínimo absoluto de 1X em favicon e avatar.
- **Tamanho mínimo:** principal empilhada 160 px / 40 mm · wordmark 64 px / 18 mm · símbolo 16 px / 5 mm.
- **Não fazer:** distorcer, inclinar, trocar a cor ou arredondar o ponto, usar em contorno, aplicar sombra ou gradiente,
  usar branco sobre laranja, redigitar o nome em fonte.

## Cores

| Nome | HEX | Uso |
| --- | --- | --- |
| Carbon | `#0D0D0D` | Fundo escuro, texto sobre claro |
| Graphite | `#1C1C1C` | Superfícies secundárias |
| Concrete | `#A1A1A1` | Texto de apoio sobre escuro |
| Paper | `#F3F0EA` | Fundo claro, texto sobre escuro |
| Signal Orange | `#FF6A2B` | Sinal: ponto final, CTA, marcadores |
| Pure White | `#FFFFFF` | Campos em foco |

Derivadas para acessibilidade: `#A83C0C` (laranja para texto sobre Paper, 5,6:1) e `#55524C` (texto de apoio sobre Paper, 6,8:1).
Carbon sobre laranja tem 6,8:1; **branco ou laranja como texto sobre Paper/laranja não passam em contraste e não são usados**.
O laranja ocupa no máximo ~5% de uma composição, exceto em uma peça-manifesto por página ou por feed.

## Tipografia

| Papel | Fonte | Ajustes |
| --- | --- | --- |
| Display | Archivo 900 | caixa alta, tracking −0,045em, entrelinha 0,92–1,0 |
| Títulos e interface | Space Grotesk 500–700 | tracking −0,025em |
| Texto | Manrope 400–500 | entrelinha 1,62, até 62 caracteres por linha |
| Rótulos técnicos | IBM Plex Mono 500 | caixa alta, tracking +0,08em |

A direção inicial previa Space Grotesk nos títulos; ela ficou nos subtítulos e na interface. Para a escala monumental foi
escolhida a Archivo, que chega ao peso 900 (a Space Grotesk para em 700). Inter Tight foi avaliada e descartada por ser
neutra demais. Todas têm licença SIL OFL 1.1 e são servidas pelo próprio site. A escala fluida está em
[`DESIGN_TOKENS.json`](DESIGN_TOKENS.json).

## Sistema gráfico

Malha de 12 colunas visível · divisores de 1 px · numeração editorial (`02 / Projetos`, `Nº 01`) · coordenadas de Boa Vista
(`02°49′N 60°40′W`) e marcas de registro · setas de traço reto · mosaico modular · hachura a 45° e retícula de impressão ·
carimbo técnico (tabela de prancha de engenharia) · diagrama UI — API — IA. Todo título termina com o ponto quadrado.

## Tom de voz

Primeira pessoa do singular, frases curtas, fatos verificáveis, valor para o negócio antes da tecnologia. Sem superlativos,
sem emojis na comunicação institucional, sem números ou clientes inventados.

## Fotografia

Retratos em preto e branco com contraste alto e fundo neutro; projetos sempre em capturas reais das interfaces. Nunca banco
de imagens. **Pendência:** ainda não há retrato profissional — ao ter um, informe o caminho em `photo` (`app/data/site.ts`).

## Instagram, proposta e e-mail

- Templates e prévia do feed: [`social/`](social/README.md) — nada foi publicado automaticamente.
- Assinatura de e-mail pronta: [`email-signature.html`](email-signature.html).

## Regenerar os arquivos

```bash
node brand/scripts/build-logos.mjs    # SVGs em brand/logos + app/data/brand.generated.ts
node brand/scripts/build-exports.mjs  # PNGs, favicons, og-image e manifesto
node brand/scripts/build-social.mjs   # templates de Instagram e proposta
node brand/scripts/build-manual.mjs   # manual em PDF
```

A geometria da marca tem uma única fonte: `brand/scripts/geometry.mjs`. Os três últimos scripts usam o Playwright para rasterizar.
