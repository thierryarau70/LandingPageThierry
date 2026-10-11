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
  { q: 'Você faz só landing page?', a: 'Não. Também desenvolvo sites institucionais, sistemas web, plataformas de cursos e outros projetos sob medida. Me chama no WhatsApp para conversar sobre a sua ideia.' },
  { q: 'Vai funcionar nos anúncios?', a: 'Sim. A página já sai preparada para Pixel, conversões e campanhas.' }
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
    name: 'Dra. Emile Vitória',
    category: 'Site para dentista',
    description: 'Site da cirurgiã-dentista em Boa Vista (RR): tratamentos de clínica geral e harmonização orofacial, resultados, dúvidas e agendamento de avaliação.',
    url: 'https://emilevitoria.vercel.app',
    image: '/portfolio/emile.webp',
    tags: ['Landing page', 'Saúde', 'Agendamento']
  },
  {
    name: 'Centro de Isoladas',
    category: 'Cursinho preparatório',
    description: 'Site do cursinho focado em UFRR e UERR: turmas presenciais, cursos online com videoaulas e área do aluno com acompanhamento de progresso.',
    url: 'https://centro-de-isoladas.vercel.app',
    image: '/portfolio/isoladas.webp',
    tags: ['Educação', 'Cursos online', 'Área do aluno']
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

export const products = [
  { ico: '🏢', title: 'Sites institucionais', text: 'Site completo para empresas, clínicas e profissionais, com várias páginas e visual da sua marca.' },
  { ico: '🛠️', title: 'Sistemas web sob medida', text: 'Sistemas de gestão com login, cadastros, relatórios e painel administrativo para o seu negócio.' },
  { ico: '🎓', title: 'Plataformas de cursos', text: 'Área do aluno com videoaulas, materiais, questões e acompanhamento de progresso.' },
  { ico: '📊', title: 'Painéis e dashboards', text: 'Seus dados organizados em gráficos e indicadores para decidir mais rápido.' },
  { ico: '📅', title: 'Agendamento online', text: 'Seus clientes marcam horário direto pelo site, sem precisar ligar ou esperar resposta.' },
  { ico: '🔌', title: 'Integrações', text: 'Conexão com WhatsApp, pagamentos, planilhas e outras ferramentas que você já usa.' }
]
