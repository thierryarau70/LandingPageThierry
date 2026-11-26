import { site } from '~/data/site'

// URL pública do site, sem barra no final (NUXT_PUBLIC_SITE_URL ou o domínio padrão).
export const useSiteUrl = () => {
  const { siteUrl } = useRuntimeConfig().public
  const base = String(siteUrl || site.defaultUrl).replace(/\/$/, '')
  return { base, abs: (path = '/') => base + (path === '/' ? '' : path) }
}
