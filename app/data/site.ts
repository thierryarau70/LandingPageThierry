// Informações institucionais, contatos e links: única fonte para todo o site.

export const site = {
  name: 'Thierry Araújo',
  brand: 'THIERRY.',
  descriptor: 'Digital Engineering Studio',
  signature: 'Thierry Araújo — Digital Engineering Studio',
  tagline: 'Design. Software. Inteligência.',
  role: 'Desenvolvedor de software',
  defaultUrl: 'https://thierryaraujodev.com.br',
  cnpj: '69.676.386/0001-52',
  experienceYears: 4,
  location: {
    city: 'Boa Vista',
    state: 'RR',
    stateName: 'Roraima',
    country: 'Brasil',
    // Centro de Boa Vista: usado como marcador de coordenadas do sistema gráfico
    coords: { lat: 2.8195, lng: -60.6714, label: '02°49′N 60°40′W' }
  },
  contact: {
    whatsapp: '5595991432677',
    whatsappLabel: '(95) 99143-2677',
    email: 'thierryaraujo309@gmail.com'
  },
  social: [
    { id: 'instagram', label: 'Instagram', handle: '@thierryaraujo.dev', url: 'https://www.instagram.com/thierryaraujo.dev/' },
    { id: 'linkedin', label: 'LinkedIn', handle: '/in/thierryarauj0', url: 'https://www.linkedin.com/in/thierryarauj0/' },
    { id: 'github', label: 'GitHub', handle: '/thierryarau70', url: 'https://github.com/thierryarau70' }
  ],
  // Caminho de uma fotografia profissional real (ex.: '/brand/thierry-araujo.webp').
  // Enquanto estiver vazio, a seção Sobre usa a ficha técnica com o símbolo da marca.
  photo: '' as string
} as const

export type SocialLink = (typeof site.social)[number]

export const nav = [
  { label: 'Projetos', hash: '#projetos' },
  { label: 'Serviços', hash: '#servicos' },
  { label: 'Sobre', hash: '#sobre' },
  { label: 'Processo', hash: '#processo' },
  { label: 'Contato', hash: '#contato' }
] as const

export const pillars = ['Design', 'Desenvolvimento', 'Automação', 'Inteligência Artificial'] as const

export const waLink = (text: string): string =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`

export const mailLink = (subject: string, body = ''): string =>
  `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`

export const waMessages = {
  start: 'Olá, Thierry! Vim pelo site e quero iniciar um projeto.',
  talk: 'Olá, Thierry! Vim pelo site e quero conversar sobre uma solução para a minha empresa.',
  similar: (project: string) => `Olá, Thierry! Vi o case ${project} no seu site e quero uma solução semelhante.`,
  service: (service: string) => `Olá, Thierry! Quero conversar sobre ${service}.`
} as const
