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
    name: 'Landing page',
    goal: 'Seu negócio no ar',
    price: 600,
    tag: 'Uma página personalizada para apresentar seu negócio e receber contatos.',
    features: ['1 página com design personalizado', 'Layout adaptado para celular', 'Botão de contato pelo WhatsApp', 'Configuração de domínio e publicação', 'Entrega em até 5 dias úteis']
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
  { ico: '📈', title: 'Pronta para divulgar', text: 'Uma página para compartilhar nas redes sociais e usar como destino dos seus anúncios.' },
  { ico: '💬', title: 'WhatsApp integrado', text: 'Botão direto que leva o cliente para sua conversa.' },
  { ico: '🌐', title: 'Domínio e publicação', text: 'Coloco no ar com seu domínio próprio e certificado seguro.' }
]

export const steps = [
  { title: 'Conversa', text: 'Você me conta sobre o negócio e o objetivo.' },
  { title: 'Proposta', text: 'Alinhamos o escopo e o prazo do projeto.' },
  { title: 'Criação', text: 'Desenvolvo e você acompanha e aprova.' },
  { title: 'No ar', text: 'Publico e deixo pronta para seus anúncios.' }
]

export const faq = [
  { q: 'Quanto tempo leva para ficar pronta?', a: 'A landing page fica pronta em até 5 dias úteis após o recebimento dos textos, imagens e informações. Para outros projetos, o prazo é definido no orçamento.' },
  { q: 'Preciso ter domínio?', a: 'Não. Posso te orientar no registro e configurar tudo para você.' },
  { q: 'Posso pedir ajustes?', a: 'Sim. Antes da entrega, ajusto até você aprovar. Ajustes e suporte após a entrega são combinados na proposta.' },
  { q: 'Você faz só landing page?', a: 'Não. Também desenvolvo sites institucionais, sistemas web, plataformas de cursos e outros projetos sob medida. Me chama no WhatsApp para conversar sobre a sua ideia.' },
  { q: 'Vai funcionar nos anúncios?', a: 'Sim, a landing page pode receber tráfego dos seus anúncios. Integrações com Pixel e medição de conversões são combinadas no orçamento.' }
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

export interface Testimonial {
  name: string
  role: string
  text: string
}

// Adicione aqui depoimentos reais de clientes. A seção só aparece no site quando houver pelo menos um.
export const testimonials: Testimonial[] = []

export interface Niche {
  slug: string
  label: string
  seoTitle: string
  title: string
  highlight: string
  text: string
  shots: string[]
  projects: string[]
  pointsTitle: string
  points: { ico: string, title: string, text: string }[]
}

// Páginas específicas para anúncios: /para/<slug>
export const niches: Niche[] = [
  {
    slug: 'clinicas',
    label: 'clínicas',
    seoTitle: 'Site para clínicas e consultórios',
    title: 'Um site para a sua clínica que transforma visitas em agendamentos.',
    highlight: 'transforma visitas em agendamentos',
    text: 'Landing pages para clínicas, consultórios e profissionais de saúde: tratamentos explicados com clareza, resultados, dúvidas frequentes e agendamento pelo WhatsApp.',
    shots: ['/portfolio/emile.webp', '/portfolio/isoladas.webp'],
    projects: ['Dra. Emile Vitória'],
    pointsTitle: 'Feito para a rotina de uma clínica',
    points: [
      { ico: '🦷', title: 'Tratamentos bem explicados', text: 'Cada serviço com descrição clara, para o paciente entender antes de marcar.' },
      { ico: '📅', title: 'Agendamento pelo WhatsApp', text: 'Botões de agendamento em toda a página, direto para a sua recepção.' },
      { ico: '📍', title: 'Endereço e horários', text: 'Mapa, horário de atendimento e formas de contato fáceis de achar.' },
      { ico: '⭐', title: 'Confiança', text: 'Espaço para sua formação, registro profissional e depoimentos de pacientes.' },
      { ico: '📱', title: 'Perfeito no celular', text: 'A maioria dos pacientes chega pelo Instagram, então tudo é pensado para o celular.' },
      { ico: '📈', title: 'Pronto para anúncios', text: 'Pixel e medição de contatos para saber quanto custa cada paciente novo.' }
    ]
  },
  {
    slug: 'cursos',
    label: 'cursos',
    seoTitle: 'Site para cursos e escolas',
    title: 'Um site para o seu curso que enche as turmas.',
    highlight: 'enche as turmas',
    text: 'Landing pages para cursinhos, escolas e professores: turmas, matrículas, cursos online e contato pelo WhatsApp em uma página rápida e bonita.',
    shots: ['/portfolio/isoladas.webp', '/portfolio/emile.webp'],
    projects: ['Centro de Isoladas'],
    pointsTitle: 'Feito para quem vende cursos',
    points: [
      { ico: '🎓', title: 'Turmas e matrículas', text: 'Datas, horários e vagas organizados para o aluno decidir rápido.' },
      { ico: '💻', title: 'Cursos online', text: 'Vitrine dos cursos gravados e, se precisar, área do aluno com videoaulas.' },
      { ico: '🏆', title: 'Aprovações e resultados', text: 'Destaque para aprovados e depoimentos de alunos.' },
      { ico: '💬', title: 'Matrícula pelo WhatsApp', text: 'O aluno tira dúvidas e se matricula falando direto com a sua equipe.' },
      { ico: '📱', title: 'Perfeito no celular', text: 'Pensado para quem chega pelo Instagram e pelo TikTok.' },
      { ico: '📈', title: 'Pronto para anúncios', text: 'Ideal para campanhas de matrícula, com medição de contatos.' }
    ]
  },
  {
    slug: 'servicos',
    label: 'prestadores de serviço',
    seoTitle: 'Site para prestadores de serviço',
    title: 'Um site profissional para o seu serviço receber mais pedidos.',
    highlight: 'receber mais pedidos',
    text: 'Landing pages para advogados, salões, oficinas, arquitetos, personal trainers e outros prestadores de serviço, com orçamento pelo WhatsApp.',
    shots: ['/portfolio/emile.webp', '/portfolio/isoladas.webp'],
    projects: [],
    pointsTitle: 'Feito para quem vende serviço',
    points: [
      { ico: '🧰', title: 'Serviços em destaque', text: 'O que você faz, para quem e como funciona, explicado em poucos segundos.' },
      { ico: '💬', title: 'Orçamento pelo WhatsApp', text: 'O cliente chama você com a mensagem já pronta.' },
      { ico: '🖼️', title: 'Seus trabalhos', text: 'Galeria de antes e depois, fotos e resultados.' },
      { ico: '⭐', title: 'Depoimentos', text: 'Avaliações de clientes para quem ainda não conhece o seu trabalho.' },
      { ico: '📱', title: 'Perfeito no celular', text: 'Rápido e fácil de usar em qualquer celular.' },
      { ico: '📈', title: 'Pronto para anúncios', text: 'Medição de contatos para saber o retorno de cada real investido.' }
    ]
  }
]
