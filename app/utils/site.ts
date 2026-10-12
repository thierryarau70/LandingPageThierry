export const WHATSAPP = '5595991432677'
export const EMAIL = 'thierryaraujo309@gmail.com'
export const EXPERIENCE_YEARS = 4

export const waLink = (text: string): string =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`

export interface Plan {
  name: string
  goal: string
  price: number
  tag: string
  features: string[]
  featured?: boolean
}

export const plans: Plan[] = [
  {
    name: 'Essencial',
    goal: 'Captar contatos',
    price: 600,
    tag: 'Uma página direta para quem quer receber pedidos pelo WhatsApp.',
    features: ['1 página (one-page)', 'Design personalizado', 'Versão para celular', 'Botão de WhatsApp', 'Entrega em até 5 dias úteis']
  },
  {
    name: 'Profissional',
    goal: 'Anunciar',
    price: 900,
    tag: 'Preparada para receber tráfego de anúncios e medir os resultados.',
    featured: true,
    features: ['Tudo do Essencial', 'Formulário de captação', 'Pixel do Meta e Google Analytics', 'SEO básico', 'Configuração de domínio e publicação', '7 dias de ajustes após a entrega']
  },
  {
    name: 'Premium',
    goal: 'Apresentar sua empresa',
    price: 1500,
    tag: 'Mais espaço para mostrar serviços, diferenciais e a história do negócio.',
    features: ['Tudo do Profissional', 'Até 3 seções extras', 'Redação dos textos', 'Animações personalizadas', '30 dias de suporte após a entrega']
  }
]

export const planNotes = [
  { title: 'Prazo', text: 'Os dias úteis contam a partir do recebimento dos textos, imagens e informações do negócio.' },
  { title: 'Domínio e publicação', text: 'Configuro o domínio que você registrar (o custo do registro fica por sua conta) e deixo o site no ar com certificado de segurança.' },
  { title: 'Ajustes e suporte', text: 'Ajustes cobrem mudanças de texto, imagens e cores no que já foi criado. Novas seções ou páginas são orçadas à parte.' }
]

export const services = [
  { ico: '⚡', title: 'Carregamento rápido', text: 'Página otimizada para carregar rápido e facilitar a navegação.' },
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
  { q: 'Quanto tempo leva para ficar pronta?', a: 'De 5 a 7 dias úteis, contados a partir do recebimento dos textos e imagens. O prazo exato depende do plano e da rapidez nas aprovações.' },
  { q: 'Preciso ter domínio?', a: 'Não. Posso te orientar no registro e configurar tudo para você.' },
  { q: 'Posso pedir ajustes?', a: 'Sim. Antes da entrega, ajusto até você aprovar. Depois, cada plano tem um período de ajustes de texto, imagens e cores.' },
  { q: 'Você faz só landing page?', a: 'Não. Também desenvolvo sites institucionais, sistemas web, plataformas de cursos e outros projetos sob medida. Me chama no WhatsApp para conversar sobre a sua ideia.' },
  { q: 'Vai funcionar nos anúncios?', a: 'A página sai pronta para receber anúncios, com Pixel e medição de conversões nos planos Profissional e Premium.' }
]

export interface Project {
  name: string
  category: string
  description: string
  url: string
  image: string
  tags: string[]
  goal: string
  delivery: string
}

export const projects: Project[] = [
  {
    name: 'Dra. Emile Vitória',
    category: 'Site para dentista',
    description: 'Site da cirurgiã-dentista em Boa Vista (RR): tratamentos de clínica geral e harmonização orofacial, resultados, dúvidas e agendamento de avaliação.',
    url: 'https://emilevitoria.vercel.app',
    image: '/portfolio/emile.webp',
    tags: ['Landing page', 'Saúde', 'Agendamento'],
    goal: 'Apresentar os tratamentos e facilitar o agendamento de avaliações.',
    delivery: 'Design, desenvolvimento e integração com WhatsApp.'
  },
  {
    name: 'Centro de Isoladas',
    category: 'Cursinho preparatório',
    description: 'Site do cursinho focado em UFRR e UERR: turmas presenciais, cursos online com videoaulas e área do aluno com acompanhamento de progresso.',
    url: 'https://centro-de-isoladas.vercel.app',
    image: '/portfolio/isoladas.webp',
    tags: ['Educação', 'Cursos online', 'Área do aluno'],
    goal: 'Divulgar as turmas e levar o aluno para os cursos online.',
    delivery: 'Design, desenvolvimento do site e da área do aluno.'
  },
  {
    name: 'Agrovet',
    category: 'Sistema veterinário',
    description: 'Gestão reprodutiva bovina: fazendas, lotes, animais e protocolos IATF, com sincronização na nuvem e suporte offline.',
    url: 'https://agrovet-xi.vercel.app/welcome',
    image: '/portfolio/agrovet.webp',
    tags: ['Gestão', 'Offline', 'Nuvem'],
    goal: 'Organizar o manejo reprodutivo do rebanho, mesmo sem internet no campo.',
    delivery: 'Design e desenvolvimento do sistema completo.'
  },
  {
    name: 'Attletto Teams',
    category: 'Gestão esportiva',
    description: 'Plataforma para clubes e escolinhas: elencos, presenças, treinos, jogos, documentos e pagamentos em um só lugar.',
    url: 'https://attletto.vercel.app',
    image: '/portfolio/attletto.webp',
    tags: ['SaaS', 'Relatórios', 'Pagamentos'],
    goal: 'Centralizar a gestão de times, atletas e pagamentos.',
    delivery: 'Design e desenvolvimento da plataforma.'
  }
]
