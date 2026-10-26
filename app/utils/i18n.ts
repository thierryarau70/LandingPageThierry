import { siteOffer } from './offer'

export type Lang = 'pt' | 'en'

// Páginas com versão em inglês: caminho em português -> caminho em inglês
export const pagePaths: Record<string, string> = {
  '/': '/en',
  '/sobre': '/en/about',
  '/faq': '/en/faq',
  '/projetos': '/en/projects',
  '/sobre-mim': '/en/about-me'
}

export const langOf = (path: string): Lang => (path === '/en' || path.startsWith('/en/') ? 'en' : 'pt')

// Caminho equivalente no outro idioma (páginas sem tradução levam ao início)
export const switchPath = (path: string, to: Lang): string => {
  const clean = path.replace(/\/$/, '') || '/'
  if (to === 'en') return pagePaths[clean] ?? '/en'
  const pt = Object.keys(pagePaths).find(k => pagePaths[k] === clean)
  return pt ?? '/'
}

const pt = {
  role: 'Desenvolvedor web',
  homeLabel: 'Thierry Araújo — início',
  navLabel: 'Navegação principal',
  homeNav: [
    { label: 'Processo', hash: '#como-funciona' },
    { label: 'Projetos', hash: '#projetos' },
    { label: 'Incluso', hash: '#incluso' },
    { label: 'Dúvidas', hash: '#duvidas' }
  ],
  pageNav: [
    { label: 'Sobre', to: '/sobre' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Projetos', to: '/projetos' },
    { label: 'Sobre mim', to: '/sobre-mim' }
  ],
  themeDark: 'Ativar modo escuro',
  themeLight: 'Ativar modo claro',
  langLabel: 'Idioma',
  footerWa: 'Olá, Thierry! Vim pelo site e quero conversar sobre um projeto.',
  offer: siteOffer,
  projects: {} as Record<string, { category: string, goal: string }>,
  home: {
    seoTitle: 'Site em até 5 dias por R$ 800 | Thierry Araújo',
    seoDescription: 'Primeira versão em 35 horas. Site de até 5 páginas ou landing page por R$ 800, com textos, versão para celular e domínio .com.br incluso.',
    ogTitle: 'Seu site em até 5 dias | Thierry Araújo',
    ogDescription: 'Até 5 páginas, textos e domínio .com.br por R$ 800. Primeira versão em 35 horas.',
    contact: 'Olá, Thierry! Quero um site de até 5 páginas por R$ 800. Podemos conversar?',
    bigProject: 'Olá, Thierry! Quero consultar o valor de um projeto maior. Minha ideia é:',
    h1a: 'Seu site no ar', h1b: 'em até ', h1mark: '5 dias', h1c: '.',
    lead1: 'Você cuida do negócio.', lead2: 'Eu cuido do seu site.',
    desc1: 'Design, textos, versão para celular e domínio .com.br. Você vê a primeira versão em ', descStrong: '35 horas', desc2: ', pede os ajustes e acompanha tudo direto comigo.',
    priceLabel: 'Site completo por', priceNote: 'Domínio incluso, no seu nome.',
    cta: 'Quero meu site em 5 dias',
    helper: 'Abre o WhatsApp. Quem responde sou eu, Thierry.',
    seeProjects: 'Ver projetos publicados',
    deliveryTop: 'Do primeiro contato à primeira versão.', hours: 'horas', deliveryBottom: 'Você vê. A gente ajusta. Seu site vai ao ar.',
    showcaseLabel: 'Abrir site de Emile Vitória em nova aba', showcaseAlt: 'Site da Dra. Emile Vitória, desenvolvido por Thierry', live: 'Projeto publicado',
    timelineLabel: 'Prazo de criação do site',
    timeline: [['Começamos', 'Sua ideia e referências'], ['Até 35 horas', 'Primeira versão'], ['Até 5 dias', 'Site publicado']],
    deadlineNote: 'Prazos após o alinhamento e recebimento das informações. Ajustes e aprovação dentro do período combinado.',
    marquee: ['Landing pages', 'Sites institucionais', 'Versão para celular', 'Domínio .com.br', 'Integração com WhatsApp', 'Sistemas web', 'Pronto para anúncios', 'Atendimento direto'],
    processTitle: 'Da sua ideia ao site publicado.', processSub: 'Sem complicar o que pode ser simples.',
    steps: [
      ['Conte o que você faz', 'Me apresente seu negócio e envie até 3 sites que você gosta. Alinhamos o conteúdo e o escopo.'],
      ['Veja em 35 horas', 'Receba a primeira versão, confira os textos e o visual e me diga o que ajustar.'],
      ['Publique em até 5 dias', 'Com sua aprovação, coloco o site no seu domínio, pronto para você compartilhar.']
    ],
    projectsTitle: 'Sites no ar. Pode entrar.', projectsSub: 'Abra os projetos e veja o trabalho funcionando.',
    openProject: (name: string) => `Abrir ${name} em nova aba`, projectAlt: (name: string) => `Página inicial de ${name}`,
    offerTitle: 'Seu site, do texto ao domínio.', offerSub: (price: number) => `O que está incluso nos R$ ${price}.`,
    offerLabel: 'Resumo da oferta', cardTitle1: 'Até 5 páginas.', cardTitle2: 'Um preço fechado.', cardOr: 'Ou uma landing page para seus anúncios.',
    cardList: ['Primeira versão em 35 horas', 'Publicado em até 5 dias', 'Domínio .com.br incluso', 'Atendimento direto comigo'],
    cardNote: 'Prazos do pacote base, após receber as informações e alinhar o projeto.',
    moreTitle: 'Precisa de mais?', moreSub: 'Definimos o escopo antes de começar.',
    extraTitle: 'Loja virtual, login, sistema ou 10+ páginas', extraNote: 'Adicional ao pacote base. Prazo alinhado na proposta.',
    bigTitle: 'SaaS, integrações e projetos maiores', bigLink: 'Consultar valor', bigNote: 'Uma proposta de acordo com sua ideia.',
    aboutTitle: 'Quem conversa é quem desenvolve.',
    aboutText: (years: number) => `Sou Thierry Araújo, desenvolvedor com ${years} anos de experiência. Já trabalhei com sites, sistemas de gestão e plataformas de ensino. Do primeiro contato à publicação, você fala direto comigo.`,
    aboutLink: 'Conheça meu trabalho', aboutNote1: 'Sua ideia.', aboutNote2: 'Meu próximo projeto.', aboutNoteSub: 'Design, desenvolvimento e publicação.',
    faqTitle: 'Antes de começar.', faqSub: 'As respostas para decidir com clareza.',
    closeTitle: 'Vamos colocar seu negócio no ar?', closeSub: 'Me conte o que você faz. Sua primeira versão chega em 35 horas.',
    email: 'Prefere e-mail?'
  },
  faqPage: {
    seoTitle: 'Perguntas frequentes | Thierry Araújo', seoDescription: 'Preço, primeira versão em 35 horas, publicação em até 5 dias e domínio incluso.',
    title: 'Perguntas frequentes', sub: 'Preço, prazo e o que está incluído.'
  },
  projectsPage: {
    seoTitle: 'Projetos | Thierry Araújo', seoDescription: 'Conheça o Radar de Clientes, os sites de Emile Vitória e Arouche Moda Íntima e os apps Agenda Emi e Protocolo IATF, desenvolvidos por Thierry Araújo.',
    title: 'Ideias que já estão no ar.', sub: 'Sites e plataformas que conectam negócios, pessoas e oportunidades.',
    open: (name: string) => `${name} — abrir site em nova aba`
  },
  mePage: {
    seoTitle: 'Sobre mim | Thierry Araújo', seoDescription: 'Conheça Thierry Araújo, desenvolvedor de sites e sistemas web com atendimento direto.',
    title: 'Sou Thierry Araújo.', sub: 'Desenvolvedor web. Da ideia à publicação, você fala comigo.',
    expTitle: (years: number) => `${years} anos de experiência`,
    exp: ['Desenvolvo sites e sistemas web. Minha experiência inclui plataformas de gestão e de ensino a distância.', 'Hoje também crio landing pages para negócios que precisam se apresentar na internet.'],
    stackTitle: 'Design e desenvolvimento', stack: 'Trabalho com Nuxt, Vue e TypeScript, cuidando da interface e da implementação.',
    email: 'Conversar por e-mail'
  },
  aboutPage: {
    seoTitle: 'Site completo por R$ 800 | Thierry Araújo', seoDescription: 'Até 5 páginas ou uma landing page, com textos, domínio .com.br e primeira versão em 35 horas.',
    title: 'Seu site, do começo ao ar.', sub: 'Até 5 páginas ou uma landing page por R$ 800. Primeira versão em 35 horas e publicação em até 5 dias.',
    includedTitle: 'O que está incluso', moreTitle: 'Mais funcionalidades',
    more: ['Loja virtual, login, sistema ou 10+ páginas: adicional de R$ 997 ao pacote base. SaaS, integrações e projetos maiores: valor sob consulta.', 'Os prazos começam após o alinhamento e recebimento das informações. Ajustes e aprovação dentro do período combinado; funcionalidades extras têm prazo definido na proposta.'],
    wa: 'Olá, Thierry! Quero conversar sobre um site por R$ 800.', waLabel: 'Conversar no WhatsApp'
  }
}

export type Messages = typeof pt

const en: Messages = {
  role: 'Web developer',
  homeLabel: 'Thierry Araújo — home',
  navLabel: 'Main navigation',
  homeNav: [
    { label: 'Process', hash: '#como-funciona' },
    { label: 'Projects', hash: '#projetos' },
    { label: 'Included', hash: '#incluso' },
    { label: 'FAQ', hash: '#duvidas' }
  ],
  pageNav: [
    { label: 'About', to: '/en/about' },
    { label: 'FAQ', to: '/en/faq' },
    { label: 'Projects', to: '/en/projects' },
    { label: 'About me', to: '/en/about-me' }
  ],
  themeDark: 'Switch to dark mode',
  themeLight: 'Switch to light mode',
  langLabel: 'Language',
  footerWa: 'Hi Thierry! I found your website and would like to talk about a project.',
  offer: {
    ...siteOffer,
    includes: [
      { title: 'Up to 5 pages or a landing page', text: 'Home, about, services, contact and one more page. For ads, a single page focused on conversion.' },
      { title: 'Copy written for your business', text: 'You tell me what you do. I write the copy, you review it and I adjust.' },
      { title: 'Built for mobile', text: 'A layout that lets customers explore your work on a phone just as well as on a computer.' },
      { title: 'WhatsApp and contact form', text: 'A WhatsApp button on every page and a form that sends leads straight to your email.' },
      { title: 'Ready for Google', text: 'Titles, descriptions and speed prepared for indexing. Google Business Profile setup if you don\'t have one yet, subject to eligibility.' },
      { title: '.com.br domain included, in your name', text: 'Registered in your name and published on your domain. Renewal terms are agreed before we start.' }
    ],
    questions: [
      { q: 'What do I get for R$ 800?', a: 'A website of up to 5 pages or a landing page for ads, with design, copy, mobile version, WhatsApp, contact form, Google readiness and a .com.br domain registered in your name.' },
      { q: 'When do I see the first version?', a: 'Within 35 hours after we align the project and I receive the information I need about your business. You review it and tell me what to adjust.' },
      { q: 'When does the site go live?', a: 'Within 5 days after alignment and receiving the information, with adjustments and approval inside that period. Projects with extra features get a timeline in the proposal.' },
      { q: 'Is the domain in my name?', a: 'Yes. The .com.br domain is included and registered in your name. Renewal terms and any recurring costs are defined before we start.' },
      { q: 'What if I need a store, login or a system?', a: 'An online store, login, system or 10+ pages cost R$ 997 on top of the base package. The scope is agreed before we begin. SaaS, integrations and larger projects are quoted individually.' },
      { q: 'Will my site show up on Google?', a: 'The site is prepared for indexing, with titles, descriptions and attention to speed. That doesn\'t guarantee a ranking. If you don\'t have a Google Business Profile yet, I set it up when the business is eligible.' }
    ]
  },
  projects: {
    'https://www.radardecliente.com.br': { category: 'Prospecting platform', goal: 'Find local businesses without a website and organize the search for new clients.' },
    'https://www.draemilevitoria.com.br': { category: 'Dentist website', goal: 'Present the treatments and make it easy to book an appointment.' },
    'https://www.arouchemodaintima.com.br': { category: 'Online catalog', goal: 'Showcase the store\'s products and take orders on WhatsApp, no sign-up needed.' },
    'https://agenda-emi.vercel.app': { category: 'App for dentists', goal: 'Appointments with reminders and the practice\'s finances in one app, no notebook or spreadsheet.' },
    'https://protocolo-iatf.vercel.app': { category: 'App for veterinarians', goal: 'Record FTAI protocols and pregnancy checks in the field, even without signal.' }
  },
  home: {
    seoTitle: 'Your website in up to 5 days for R$ 800 | Thierry Araújo',
    seoDescription: 'First version in 35 hours. A website of up to 5 pages or a landing page for R$ 800, with copy, mobile version and a .com.br domain included.',
    ogTitle: 'Your website in up to 5 days | Thierry Araújo',
    ogDescription: 'Up to 5 pages, copy and a .com.br domain for R$ 800. First version in 35 hours.',
    contact: 'Hi Thierry! I\'d like a website of up to 5 pages for R$ 800. Can we talk?',
    bigProject: 'Hi Thierry! I\'d like a quote for a larger project. My idea is:',
    h1a: 'Your website live', h1b: 'in up to ', h1mark: '5 days', h1c: '.',
    lead1: 'You run the business.', lead2: 'I take care of your website.',
    desc1: 'Design, copy, mobile version and a .com.br domain. You see the first version in ', descStrong: '35 hours', desc2: ', ask for changes and follow everything directly with me.',
    priceLabel: 'Complete website for', priceNote: 'Domain included, in your name.',
    cta: 'I want my site in 5 days',
    helper: 'Opens WhatsApp. I\'m the one who replies — Thierry.',
    seeProjects: 'See live projects',
    deliveryTop: 'From first contact to first version.', hours: 'hours', deliveryBottom: 'You review. We adjust. Your site goes live.',
    showcaseLabel: 'Open Emile Vitória\'s website in a new tab', showcaseAlt: 'Dr. Emile Vitória\'s website, built by Thierry', live: 'Live project',
    timelineLabel: 'Website timeline',
    timeline: [['We start', 'Your idea and references'], ['Up to 35 hours', 'First version'], ['Up to 5 days', 'Site published']],
    deadlineNote: 'Timelines start after we align and I receive the information. Adjustments and approval within the agreed period.',
    marquee: ['Landing pages', 'Business websites', 'Mobile-ready', '.com.br domain', 'WhatsApp integration', 'Web systems', 'Ready for ads', 'Direct contact'],
    processTitle: 'From your idea to a live website.', processSub: 'No need to complicate what can be simple.',
    steps: [
      ['Tell me what you do', 'Introduce your business and send up to 3 websites you like. We align the content and scope.'],
      ['See it in 35 hours', 'Get the first version, check the copy and visuals and tell me what to adjust.'],
      ['Go live in up to 5 days', 'Once you approve, I publish the site on your domain, ready to share.']
    ],
    projectsTitle: 'Live websites. Step inside.', projectsSub: 'Open the projects and see the work running.',
    openProject: (name: string) => `Open ${name} in a new tab`, projectAlt: (name: string) => `${name} homepage`,
    offerTitle: 'Your website, from copy to domain.', offerSub: (price: number) => `What's included for R$ ${price}.`,
    offerLabel: 'Offer summary', cardTitle1: 'Up to 5 pages.', cardTitle2: 'One fixed price.', cardOr: 'Or a landing page for your ads.',
    cardList: ['First version in 35 hours', 'Live in up to 5 days', '.com.br domain included', 'Direct contact with me'],
    cardNote: 'Base package timelines, after I receive the information and we align the project.',
    moreTitle: 'Need more?', moreSub: 'We define the scope before starting.',
    extraTitle: 'Online store, login, system or 10+ pages', extraNote: 'On top of the base package. Timeline set in the proposal.',
    bigTitle: 'SaaS, integrations and larger projects', bigLink: 'Ask for a quote', bigNote: 'A proposal tailored to your idea.',
    aboutTitle: 'The one you talk to is the one who builds it.',
    aboutText: (years: number) => `I'm Thierry Araújo, a developer with ${years} years of experience. I've worked on websites, management systems and e-learning platforms. From first contact to launch, you talk directly to me.`,
    aboutLink: 'Get to know my work', aboutNote1: 'Your idea.', aboutNote2: 'My next project.', aboutNoteSub: 'Design, development and launch.',
    faqTitle: 'Before we start.', faqSub: 'The answers you need to decide with confidence.',
    closeTitle: 'Shall we put your business online?', closeSub: 'Tell me what you do. Your first version arrives in 35 hours.',
    email: 'Prefer email?'
  },
  faqPage: {
    seoTitle: 'FAQ | Thierry Araújo', seoDescription: 'Price, first version in 35 hours, launch in up to 5 days and domain included.',
    title: 'Frequently asked questions', sub: 'Price, timeline and what\'s included.'
  },
  projectsPage: {
    seoTitle: 'Projects | Thierry Araújo', seoDescription: 'See Radar de Clientes, the websites for Emile Vitória and Arouche Moda Íntima, and the Agenda Emi and Protocolo IATF apps, built by Thierry Araújo.',
    title: 'Ideas that are already live.', sub: 'Websites and platforms that connect businesses, people and opportunities.',
    open: (name: string) => `${name} — open website in a new tab`
  },
  mePage: {
    seoTitle: 'About me | Thierry Araújo', seoDescription: 'Meet Thierry Araújo, a developer of websites and web systems who works with you directly.',
    title: 'I\'m Thierry Araújo.', sub: 'Web developer. From idea to launch, you talk to me.',
    expTitle: (years: number) => `${years} years of experience`,
    exp: ['I build websites and web systems. My experience includes management and e-learning platforms.', 'Today I also create landing pages for businesses that need to present themselves online.'],
    stackTitle: 'Design and development', stack: 'I work with Nuxt, Vue and TypeScript, taking care of both the interface and the implementation.',
    email: 'Talk by email'
  },
  aboutPage: {
    seoTitle: 'Complete website for R$ 800 | Thierry Araújo', seoDescription: 'Up to 5 pages or a landing page, with copy, a .com.br domain and the first version in 35 hours.',
    title: 'Your website, from start to live.', sub: 'Up to 5 pages or a landing page for R$ 800. First version in 35 hours and launch in up to 5 days.',
    includedTitle: 'What\'s included', moreTitle: 'More features',
    more: ['Online store, login, system or 10+ pages: R$ 997 on top of the base package. SaaS, integrations and larger projects: quoted individually.', 'Timelines start after we align and I receive the information. Adjustments and approval within the agreed period; extra features get a timeline in the proposal.'],
    wa: 'Hi Thierry! I\'d like to talk about a website for R$ 800.', waLabel: 'Talk on WhatsApp'
  }
}

export const messages: Record<Lang, Messages> = { pt, en }
