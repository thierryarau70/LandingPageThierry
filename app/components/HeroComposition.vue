<script setup lang="ts">
// Composição gráfica do hero: mosaico modular 5 × 3 derivado do símbolo da marca.
// Reúne os elementos proprietários do sistema: módulo, ponto, hachura, coordenadas e diagrama de arquitetura.
import { site } from '~/data/site'
import { featuredProjects, visibleProjects } from '~/data/projects'

const project = featuredProjects[0]!
const [lat, lng] = site.location.coords.label.split(' ')
</script>

<template>
  <div class="mosaic" aria-label="Composição gráfica da marca">
    <NuxtLink :to="`/projetos/${project.slug}`" class="cell c-img group" :aria-label="`Projeto em destaque: ${project.name}`">
      <img :src="project.cover.src" :alt="project.cover.alt" :width="project.cover.width" :height="project.cover.height" fetchpriority="high" decoding="async">
      <span class="t-label c-img__tag"><span class="max-xl:hidden">Em destaque — </span>{{ project.name }} <ArrowIcon dir="up-right" /></span>
    </NuxtLink>

    <div class="cell c-coords theme-carbon t-label" aria-hidden="true">
      <svg viewBox="0 0 40 40" class="cross"><path d="M20 4v32M4 20h32" stroke="currentColor" stroke-width="1.5" fill="none" /><rect x="16.5" y="16.5" width="7" height="7" fill="var(--color-signal)" /></svg>
      <p><span>{{ lat }}</span><span>{{ lng }}</span></p>
    </div>

    <div class="cell c-symbol" aria-hidden="true"><BrandMark variant="symbol" /></div>
    <div class="cell c-dot" aria-hidden="true" />
    <div class="cell c-hatch tex-hatch" aria-hidden="true" />

    <div class="cell c-diagram" aria-hidden="true">
      <svg viewBox="0 0 300 100" preserveAspectRatio="xMidYMid meet" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M70 50h50M180 50h50" />
        <rect x="20" y="28" width="50" height="44" /><rect x="120" y="28" width="60" height="44" fill="currentColor" /><rect x="230" y="28" width="50" height="44" />
        <rect x="92" y="46.5" width="7" height="7" fill="var(--color-signal)" stroke="none" /><rect x="201" y="46.5" width="7" height="7" fill="var(--color-signal)" stroke="none" />
        <g stroke="none" font-family="IBM Plex Mono, monospace" font-weight="500" font-size="13" text-anchor="middle">
          <text x="45" y="55" fill="currentColor">UI</text><text x="150" y="55" fill="var(--color-paper)">API</text><text x="255" y="55" fill="currentColor">IA</text>
        </g>
      </svg>
    </div>

    <p class="cell c-count theme-carbon">
      <span class="t-display">{{ visibleProjects.length }}</span>
      <span class="t-label">projetos<br>no ar</span>
    </p>
  </div>
</template>

<style scoped>
.mosaic {
  display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: clamp(3px, 0.32vw, 6px); aspect-ratio: 5 / 3; color: var(--color-carbon); container-type: inline-size;
}
.cell { position: relative; min-width: 0; min-height: 0; overflow: hidden; animation: cell-in 0.7s var(--ease-brand) both; animation-delay: calc(var(--d, 0) * 70ms + 120ms); }
@keyframes cell-in { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0); } }
.c-img { grid-area: 1 / 1 / 3 / 4; background: var(--color-carbon); --d: 0; }
.c-img img { width: 100%; height: 100%; object-fit: cover; object-position: top center; filter: grayscale(1) contrast(1.2); transition: filter 0.5s, transform 0.9s var(--ease-brand); }
.c-img:hover img, .c-img:focus-visible img { filter: none; transform: scale(1.03); }
.c-img__tag { position: absolute; left: 0; bottom: 0; display: flex; align-items: center; gap: 0.6em; padding: 0.5em 0.75em; background: var(--color-carbon); color: var(--color-paper); font-size: max(0.625rem, 2.4cqw); }
.c-coords { grid-area: 1 / 4 / 2 / 6; display: flex; align-items: center; justify-content: space-between; gap: 6%; padding: 7%; --d: 1; }
.c-coords p { display: grid; gap: 0.2em; text-align: right; font-size: max(0.5625rem, 2.9cqw); }
.cross { width: 26%; flex: none; }
.c-symbol { grid-area: 2 / 4 / 3 / 5; display: grid; place-items: center; border: 1px solid var(--color-carbon); --d: 2; }
.c-symbol svg { width: 62%; height: auto; }
.c-dot { grid-area: 2 / 5 / 3 / 6; background: var(--color-signal); --d: 3; }
.c-hatch { grid-area: 3 / 1 / 4 / 2; border: 1px solid var(--color-carbon); --d: 4; }
.c-diagram { grid-area: 3 / 2 / 4 / 5; border: 1px solid var(--color-carbon); display: grid; place-items: center; --d: 5; }
.c-diagram svg { width: 92%; height: 82%; }
.c-count { grid-area: 3 / 5 / 4 / 6; display: flex; flex-direction: column; justify-content: space-between; padding: 9%; --d: 6; }
.c-count .t-display { font-size: 9.5cqw; line-height: 0.8; }
.c-count .t-label { font-size: max(0.5rem, 2.1cqw); color: var(--color-concrete); }
</style>
