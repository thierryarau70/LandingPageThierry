# THIERRY. — Identidade para Instagram

Extensão da identidade visual para o perfil [@thierrystudio.co](https://www.instagram.com/thierrystudio.co/).
**Nada foi publicado nem alterado no Instagram:** os arquivos desta pasta são modelos para você publicar quando quiser.

## Como regenerar

```bash
node brand/scripts/build-social.mjs
```

```bash
node brand/scripts/build-social.mjs posts
```

O segundo comando gera só as peças cujo caminho contém o termo informado (`posts`, `stories`, `reels`, `highlights`, `proposal`, `feed-preview`, ou o nome de um arquivo).

Requisitos: Node 22.18 ou superior, dependências do projeto instaladas (`npm install`) e Playwright com Chromium. Se o Pillow (Python) estiver instalado, as peças chapadas são compactadas em paleta de 256 cores; sem ele, os PNGs saem sem otimização.

## Como editar

Tudo fica em `brand/scripts/build-social.mjs`, na seção **PEÇAS**:

- **Textos**: troque as linhas dos títulos (`title([...])`), os rótulos de `top(...)`/`bottom(...)` e os parágrafos. Cada item do array é uma linha; linha terminada em ponto recebe o ponto quadrado laranja.
- **Tamanho do título**: o número passado a `title` é o tamanho máximo em px. O script reduz a fonte sozinho até a linha mais larga caber, e avisa no terminal se algum bloco passar da área útil.
- **Projetos e serviços**: nome, categoria, resumo, status e imagens vêm de `app/data/projects.ts` e `app/data/services.ts`. Para trocar o projeto de uma peça, mude o `slug` (`projectPost({ slug: 'prumo' })`, `findProject('agenda-emi')`).
- **Imagens**: são as capturas reais em `public/portfolio/` e `public/projetos/<slug>/`. Não use fotos genéricas.
- **Novas peças**: copie um bloco `add(...)` e mude o nome do arquivo. As funções `institutional()` e `projectPost()` já geram variações (tema `carbon`/`paper`, arte `mosaic`/`mark`/`hatch`/`diagram`, composição `flip`).
- **Logotipo**: sempre pelas funções `logo()` e `mark()`, que desenham o vetor oficial. Nunca escreva THIERRY em fonte no lugar do logotipo.

## Peças

| Pasta | Arquivo | Medida | Uso |
| --- | --- | --- | --- |
| `posts/` | `institucional-01` a `-04` | 1080 × 1350 | Post institucional, quatro variações de título e composição |
| `posts/` | `projeto-01`, `projeto-02` | 1080 × 1350 | Apresentação de projeto no ar (Prumo, Solek & Morais) |
| `posts/` | `servico-01` | 1080 × 1350 | Anúncio de serviços (a única peça inteira em laranja) |
| `posts/` | `carrossel-agente-ia-01` a `-04` | 1080 × 1350 | Carrossel educativo: capa, dois slides de conteúdo e CTA |
| `posts/` | `case-agenda-emi-01` a `-03` | 1080 × 1350 | Case study: capa, problema e solução, funcionalidades e CTA |
| `posts/` | `rebrand-01` a `-06` | 1080 × 1350 | Carrossel de apresentação da nova identidade: capa (antes e agora), o nome, o símbolo T.S, paleta e tipografia, os três pilares e CTA |
| `posts/` | `venda-01` a `-05` | 1080 × 1350 | Carrossel de venda: capa (site, sistema ou IA?), qual é o seu caso, processo, diferenciais e CTA. Sem preço nem prazo fixos e sem projetos |
| `whatsapp/` | `anuncio-grupo` | 1080 × 1350 | Anúncio para grupos de WhatsApp (classificados): serviços, diferenciais e telefone |
| `stories/` | `story-institucional`, `story-projeto` | 1080 × 1920 | Story com CTA e story de projeto no ar |
| `reels/` | `reel-capa-01`, `reel-capa-02` | 1080 × 1920 | Capas de reels |
| `highlights/` | `destaque-01` a `-05` | 1080 × 1920 | Capas dos destaques: Projetos, Serviços, Sobre, Processo, Contato |
| `proposal/` | `proposta-capa`, `proposta-interna` | 2480 × 3508 (A4 a 300 dpi) | Proposta comercial: capa e folha de escopo, prazo e investimento |
| `feed-preview/` | `feed-preview` | 1080 × 1650 | Simulação do perfil com nove publicações |

## Áreas seguras

- **Posts 4:5 (1080 × 1350)**: margem de 64 px. Na grade do perfil o Instagram corta as laterais (proporção 3:4), e nada essencial fica a menos de 64 px da borda.
- **Stories (1080 × 1920)**: conteúdo entre 250 px do topo e 340 px da base, livres para a interface do aplicativo. O bloco laranja "Inicie seu projeto" é o lugar do adesivo de link.
- **Capas de reels (1080 × 1920)**: título, assinatura e logotipo ficam dentro da faixa central de 1080 × 1350 que aparece no feed. As faixas hachuradas de cima e de baixo (285 px cada) podem ser cortadas; as marcas de registro (+) indicam o limite.
- **Destaques (1080 × 1920)**: numeral e rótulo ficam dentro do círculo central de cerca de 540 px, que é o recorte exibido no perfil.
- **Proposta (A4)**: margem de 80 px na base de 1240 px (cerca de 16 mm).

## Sistema visual

- Fundos Carbon `#0D0D0D` e Paper `#F3F0EA`, alternados em xadrez no feed.
- Laranja `#FF6A2B` só como sinal: ponto final quadrado, etiqueta, um bloco por peça. No máximo uma peça inteira laranja a cada nove publicações.
- Títulos em Archivo 900, caixa alta, sempre terminados no ponto quadrado. Rótulos em IBM Plex Mono, subtítulos em Space Grotesk, texto em Manrope.
- Elementos proprietários: numeração editorial (`Nº 01`, `01/04`), linhas de 1 px, malha de seis colunas, marcas de registro, coordenadas de Boa Vista (`02°49′N 60°40′W`), hachura a 45°, carimbo técnico e mosaico modular.
- Sem gradiente, sombra, canto arredondado, emoji ou ícone de robô.

## Bio sugerida

```
Estúdio de engenharia digital de Thierry Araújo
Sites • Sistemas • Automações com IA
Tecnologia sob medida para empresas.
Inicie seu projeto ↓
```

142 caracteres com as quebras de linha (o limite do Instagram é 150). Link do perfil: `thierryaraujodev.com.br`.

Campo **Nome** do perfil (pesquisável, até 64 caracteres): `THIERRY. Studio · Sites, Sistemas e IA`.

## Legendas-modelo

Sem emojis, em primeira pessoa, com um único chamado à ação no fim.

**Institucional**

> Seu negócio merece mais que um site.
> Um site apresenta. Um sistema organiza. Uma automação tira trabalho repetitivo da rotina. Eu projeto e desenvolvo os três, sob medida para a sua empresa.
> Inicie seu projeto pelo link da bio.

**Projeto no ar**

> Projeto no ar: [nome do projeto].
> [Uma frase sobre o que é e para quem.] [Uma frase sobre o que foi construído.]
> Design e desenvolvimento por Thierry Araújo. Veja o case completo no link da bio.

**Serviços**

> Software que resolve.
> Landing pages, sites institucionais, software sob medida, inteligência artificial e automações. Cada frente pode ser contratada sozinha ou combinada.
> Conte o que a sua empresa precisa: link na bio.

**Carrossel educativo**

> O que um agente de IA faz.
> Ele entende o pedido, decide o que precisa ser feito e executa a tarefa, a qualquer hora. Arraste para ver três exemplos práticos.
> Quer um agente sob medida para o seu negócio? Link na bio.

**Case study**

> Case: Agenda Emi.
> Com caderno, prints de Pix e contas de cabeça, o fim do mês nunca fechava. O aplicativo reúne agenda e finanças do consultório e calcula a parte do profissional na hora.
> Quer algo semelhante? Link na bio.

## Regras de conteúdo

- Só fatos verificáveis: nada de clientes, depoimentos, métricas ou preços inventados.
- Projeto fora do ar ou não autorizado não entra em peça.
- A proposta comercial traz campos neutros ("definido na proposta"); valores e prazos entram caso a caso.
