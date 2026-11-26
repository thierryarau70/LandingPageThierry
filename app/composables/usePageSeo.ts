import { seo } from '~/data/seo'

interface PageSeo {
  title?: string
  description?: string
  // caminho da página (ex.: '/projetos/prumo'); padrão: rota atual
  path?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  schema?: object[]
  noindex?: boolean
}

// Meta title/description, Open Graph, Twitter Card, canonical e JSON-LD de uma página.
export const usePageSeo = (input: PageSeo = {}) => {
  const route = useRoute()
  const { base, abs } = useSiteUrl()
  const path = input.path ?? (route.path.replace(/\/$/, '') || '/')
  const url = abs(path)
  const title = input.title ? seo.titleTemplate.replace('%s', input.title) : seo.defaultTitle
  const description = input.description ?? seo.defaultDescription
  const image = base + (input.image ?? seo.ogImage)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: input.type ?? 'website',
    ogUrl: url,
    ogImage: image,
    ogImageAlt: input.imageAlt ?? seo.ogImageAlt,
    ogSiteName: seo.siteName,
    ogLocale: seo.locale,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: input.imageAlt ?? seo.ogImageAlt,
    robots: input.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'
  })
  useHead({
    link: [{ rel: 'canonical', href: url }],
    script: (input.schema ?? []).map((s, i) => ({ key: `ld-${i}`, type: 'application/ld+json', innerHTML: JSON.stringify(s) }))
  })
}
