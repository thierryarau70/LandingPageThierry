import { niches } from '~/utils/site'
import { pagePaths } from '~/utils/i18n'

export default defineEventHandler((event) => {
  const base = (useRuntimeConfig(event).public.siteUrl || getRequestURL(event).origin).replace(/\/$/, '')
  const paths = ['/', '/projetos', '/sobre', '/sobre-mim', '/faq', ...niches.map(n => `/para/${n.slug}`), ...Object.values(pagePaths)]
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => `  <url><loc>${base}${p === '/' ? '/' : p}</loc></url>`).join('\n')}
</urlset>
`
})
