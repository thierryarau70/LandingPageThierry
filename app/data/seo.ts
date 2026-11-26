// Configurações de SEO e dados estruturados (Schema.org).
import { faq } from './faq'
import type { Project } from './projects'
import { services } from './services'
import { site } from './site'

export const seo = {
  siteName: site.signature,
  defaultTitle: 'Thierry Araújo | Sites, sistemas e IA em Boa Vista (RR)',
  titleTemplate: '%s | Thierry Araújo',
  defaultDescription: 'Desenvolvimento de sites, landing pages, sistemas personalizados, automações e agentes de inteligência artificial. De Boa Vista, Roraima, para empresas de todo o Brasil.',
  ogImage: '/og-image.jpg',
  ogImageAlt: 'THIERRY. — Digital Engineering Studio: Design. Software. Inteligência.',
  locale: 'pt_BR'
} as const

const address = {
  '@type': 'PostalAddress',
  addressLocality: site.location.city,
  addressRegion: site.location.state,
  addressCountry: 'BR'
}

// Pessoa + serviço profissional + site: representa a atuação real (profissional independente).
export const organizationSchema = (base: string) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      url: base,
      name: site.signature,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${base}/#person` }
    },
    {
      '@type': 'Person',
      '@id': `${base}/#person`,
      name: site.name,
      url: base,
      jobTitle: site.role,
      address,
      sameAs: site.social.map(s => s.url),
      knowsAbout: ['Desenvolvimento de sites', 'Landing pages', 'Sistemas personalizados', 'Plataformas SaaS', 'Inteligência artificial', 'Automação de processos', 'Nuxt', 'Vue', 'TypeScript']
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${base}/#service`,
      name: site.signature,
      description: seo.defaultDescription,
      url: base,
      image: base + seo.ogImage,
      logo: `${base}/brand/logo.png`,
      telephone: `+${site.contact.whatsapp}`,
      email: site.contact.email,
      address,
      areaServed: { '@type': 'Country', name: 'Brasil' },
      founder: { '@id': `${base}/#person` },
      sameAs: site.social.map(s => s.url),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Serviços',
        itemListElement: services.map(s => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, description: s.description, provider: { '@id': `${base}/#person` }, areaServed: { '@type': 'Country', name: 'Brasil' } }
        }))
      }
    }
  ]
})

export const faqSchema = (items = faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(i => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } }))
})

export const breadcrumbSchema = (base: string, trail: { name: string, path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: base + (t.path === '/' ? '' : t.path) }))
})

export const projectSchema = (base: string, p: Project) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: p.name,
  description: p.summary,
  url: `${base}/projetos/${p.slug}`,
  image: base + p.desktop[0]!.src,
  inLanguage: 'pt-BR',
  genre: p.category,
  keywords: p.pillars.join(', '),
  creator: { '@id': `${base}/#person` },
  ...(p.url ? { sameAs: p.url } : {})
})
