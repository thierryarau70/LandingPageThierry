import { niches } from '~/data/niches'
import { visibleProjects } from '~/data/projects'

export default defineEventHandler((event) => {
  const base = (useRuntimeConfig(event).public.siteUrl || getRequestURL(event).origin).replace(/\/$/, '')
  const pages: { path: string, priority: string }[] = [
    { path: '/', priority: '1.0' },
    { path: '/projetos', priority: '0.9' },
    ...visibleProjects.map(p => ({ path: `/projetos/${p.slug}`, priority: '0.8' })),
    ...niches.map(n => ({ path: `/para/${n.slug}`, priority: '0.7' })),
    { path: '/privacidade', priority: '0.2' }
  ]
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${base}${p.path === '/' ? '/' : p.path}</loc><priority>${p.priority}</priority></url>`).join('\n')}
</urlset>
`
})
