export const WHATSAPP = '5595991432677'
export const EMAIL = 'thierryaraujo309@gmail.com'
export const EXPERIENCE_YEARS = 4

export const waLink = (text: string): string =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`

export interface Plan {
  name: string
  tag: string
  features: string[]
  featured?: boolean
}

export const plans: Plan[] = [
  {
    name: 'Essencial',
    tag: 'Para começar a vender online',
    features: ['1 página (one-page)', 'Design personalizado', 'Responsivo', 'Botão de WhatsApp', 'Entrega em até 5 dias']
  },
  {
    name: 'Profissional',
    tag: 'Para quem vai anunciar',
    featured: true,
    features: ['Tudo do Essencial', 'Formulário de captação', 'Pixel Meta + Google Analytics', 'SEO básico', 'Domínio e publicação', '7 dias de ajustes grátis']
  },
  {
    name: 'Premium',
    tag: 'Presença completa',
    features: ['Tudo do Profissional', 'Animações avançadas', 'Redação dos textos (copy)', 'Até 3 seções extras', '30 dias de suporte']
  }
]

export const services = [
  { ico: '⚡', title: 'Carregamento rápido', text: 'Código leve e otimizado. Melhor nota no Google e menos desistência.' },
  { ico: '📱', title: 'Mobile first', text: 'Pensada para o celular, onde está a maioria do seu público.' },
  { ico: '🎯', title: 'Foco em conversão', text: 'Textos, botões e estrutura desenhados para gerar contatos e vendas.' },
  { ico: '📈', title: 'Pronta para anúncios', text: 'Integração com Pixel do Meta, Google Ads e Analytics.' },
  { ico: '💬', title: 'WhatsApp integrado', text: 'Botão direto que leva o cliente para sua conversa.' },
  { ico: '🌐', title: 'Domínio e publicação', text: 'Coloco no ar com seu domínio próprio e certificado seguro.' }
]

export const steps = [
  { title: 'Conversa', text: 'Você me conta sobre o negócio e o objetivo.' },
  { title: 'Proposta', text: 'Defino o plano e o prazo com você.' },
  { title: 'Criação', text: 'Desenvolvo e você acompanha e aprova.' },
  { title: 'No ar', text: 'Publico e deixo pronta para seus anúncios.' }
]

export const faq = [
  { q: 'Quanto tempo leva para ficar pronta?', a: 'Em média de 5 a 7 dias, dependendo do plano e da rapidez nas aprovações.' },
  { q: 'Preciso ter domínio?', a: 'Não. Posso te orientar no registro e configurar tudo para você.' },
  { q: 'Posso pedir ajustes?', a: 'Sim. Cada plano inclui rodadas de ajustes até você aprovar.' },
  { q: 'Vai funcionar nos anúncios?', a: 'Sim. A página já sai preparada para Pixel, conversões e campanhas.' },
  { q: 'Você faz só landing pages?', a: 'Não. Também desenvolvo sites institucionais, plataformas EAD, sistemas de gestão e painéis sob medida. Veja exemplos no portfólio e me chame para um orçamento.' }
]

export interface Product {
  ico: string
  title: string
  text: string
  example?: string
}

export const products: Product[] = [
  { ico: '🚀', title: 'Landing pages', text: 'Páginas de alta conversão para anúncios, lançamentos e captação de clientes.' },
  { ico: '🏥', title: 'Sites institucionais', text: 'Presença completa para clínicas, escritórios e negócios locais, com a sua identidade visual.', example: 'Dra. Emile Vitória' },
  { ico: '🎓', title: 'Plataformas EAD', text: 'Cursos online com videoaulas, materiais, simulados e área do aluno.', example: 'Centro de Isoladas' },
  { ico: '🧩', title: 'Sistemas web e SaaS', text: 'Gestão sob medida com login, cadastros, relatórios e pagamentos.', example: 'Attletto Teams' },
  { ico: '📊', title: 'Painéis e dashboards', text: 'Os números do seu negócio organizados em gráficos e relatórios.' },
  { ico: '📲', title: 'Apps web (PWA)', text: 'Instaláveis no celular e funcionando até sem internet.', example: 'Agrovet' }
]

export interface Project {
  name: string
  category: string
  description: string
  url: string
  image: string
  tags: string[]
}

export const projects: Project[] = [
  {
    name: 'Centro de Isoladas',
    category: 'Site + plataforma EAD',
    description: 'Cursinho preparatório de Boa Vista: site das turmas presenciais e plataforma online com videoaulas, banco de questões, simulados no modelo da UFRR e acompanhamento de desempenho.',
    url: 'https://centro-de-isoladas.vercel.app',
    image: '/portfolio/centro-de-isoladas.webp',
    tags: ['EAD', 'Simulados', 'Área do aluno']
  },
  {
    name: 'Dra. Emile Vitória',
    category: 'Site institucional',
    description: 'Site de cirurgiã-dentista com a identidade visual da marca, tratamentos, casos de diagnóstico e resultado e agendamento direto pelo WhatsApp.',
    url: 'https://emilevitoria.vercel.app',
    image: '/portfolio/emile-vitoria.webp',
    tags: ['Saúde', 'WhatsApp', 'SEO']
  },
  {
    name: 'Agrovet',
    category: 'Sistema veterinário',
    description: 'Gestão reprodutiva bovina: fazendas, lotes, animais e protocolos IATF, com sincronização na nuvem e suporte offline.',
    url: 'https://agrovet-xi.vercel.app/welcome',
    image: '/portfolio/agrovet.webp',
    tags: ['Gestão', 'Offline', 'Nuvem']
  },
  {
    name: 'Attletto Teams',
    category: 'Gestão esportiva',
    description: 'Plataforma para clubes e escolinhas: elencos, presenças, treinos, jogos, documentos e pagamentos em um só lugar.',
    url: 'https://attletto.vercel.app',
    image: '/portfolio/attletto.webp',
    tags: ['SaaS', 'Relatórios', 'Pagamentos']
  }
]
