// Tela de carregamento embutida no HTML (aparece no primeiro quadro, antes do CSS e do JS do app)
// e fonte do Google carregada sem bloquear a primeira pintura.
const FONTS = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap'
const RAMP = ' .·:-=+*≈%#@'

const style = `<style id="boot-css">
#boot{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;background:#f5f7fc;color:#182947;transition:opacity .35s ease,visibility .35s}
html.dark #boot{background:#0c0e1a;color:#e7e9f5}
#boot.out{opacity:0;visibility:hidden}
#boot .m{display:flex;flex-direction:column;align-items:center;gap:18px}
#boot b{font:700 56px/1 system-ui,-apple-system,'Segoe UI',sans-serif;letter-spacing:-.06em;color:#5745cb}
html.dark #boot b{color:#a99cff}
#boot b i{font-style:normal;animation:bootdot 1s ease-in-out infinite}
#boot p{display:flex;gap:2px;font:14px/1 ui-monospace,SFMono-Regular,Menlo,monospace}
#boot p span{width:.62em;text-align:center;opacity:.15;animation:bootwave 1.1s ease-in-out infinite}
@keyframes bootwave{50%{opacity:1;color:#5745cb}}
html.dark #boot p span{animation-name:bootwaved}
@keyframes bootwaved{50%{opacity:1;color:#a99cff}}
@keyframes bootdot{50%{opacity:.25}}
@media (prefers-reduced-motion:reduce){#boot *{animation:none!important}#boot p span{opacity:.5}}
</style>`

const glyphs = RAMP.trim().split('').concat(RAMP.trim().split('').reverse().slice(1))
const markup = `<div id="boot" aria-hidden="true"><div class="m"><b>t<i>.</i></b><p>${glyphs.map((g, i) => `<span style="animation-delay:${(i * 0.07).toFixed(2)}s">${g}</span>`).join('')}</p></div></div>
<noscript><style>#boot{display:none}</style></noscript>
<script>setTimeout(function(){var b=document.getElementById('boot');if(b)b.remove()},6000)</script>`

// No fim do <body>: o HTML todo já chegou e o CSS já está aplicado. Espera só as fontes (até 1,5 s)
// e tira o loading, sem esperar o JavaScript do app (que não muda o que aparece na tela).
const hide = `<script>(function(){var b=document.getElementById('boot');if(!b)return
function out(){b.classList.add('out');setTimeout(function(){b.remove()},400)}
var l=document.querySelector('link[href*="fonts.googleapis.com/css2"]')
var css=new Promise(function(r){(function w(){if(!l||l.sheet)r();else setTimeout(w,40)})()})
var fonts=css.then(function(){var f=document.fonts;return f&&Promise.all([f.load('500 1em Inter'),f.load('500 1em "Space Grotesk"')])})
Promise.race([fonts,new Promise(function(r){setTimeout(r,1500)})]).then(function(){requestAnimationFrame(out)},function(){out()})})()</script>`

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    html.head.unshift(style)
    html.head.push(`<link rel="preload" as="style" href="${FONTS}" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${FONTS}"></noscript>`)
    html.bodyPrepend.unshift(markup)
    html.bodyAppend.push(hide)
  })
})
