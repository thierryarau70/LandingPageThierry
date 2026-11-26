export interface Service {
  id: string
  number: string
  title: string
  description: string
  examples: string[]
  benefits: string[]
  cta: string
  // nome usado na mensagem do WhatsApp
  topic: string
  // slugs de projetos que mostram o serviço na prática
  related: string[]
}

export const services: Service[] = [
  {
    id: 'landing-pages',
    number: '01',
    title: 'Landing pages',
    description: 'Páginas desenvolvidas para apresentar serviços, fortalecer posicionamento e transformar visitantes em oportunidades comerciais.',
    examples: [
      'Página de serviço para clínicas, consultórios e profissionais liberais',
      'Página de destino para campanhas no Instagram e no Google',
      'Catálogo online com pedido direto pelo WhatsApp'
    ],
    benefits: [
      'Um endereço próprio para receber quem conhece a empresa pelas redes ou por anúncios',
      'Contato a um toque, com a mensagem já iniciada no WhatsApp',
      'Medição de contatos preparada para Meta Pixel e Google Analytics'
    ],
    cta: 'Quero uma landing page',
    topic: 'uma landing page',
    related: ['emile-vitoria', 'romulo-tuan', 'arouche']
  },
  {
    id: 'sites-institucionais',
    number: '02',
    title: 'Sites institucionais',
    description: 'Experiências digitais profissionais que comunicam a identidade, autoridade e diferenciais de uma empresa.',
    examples: [
      'Site de escritório com áreas de atuação, equipe e artigos',
      'Site de clínica com especialidades, exames e convênios',
      'Site de marca pessoal com trajetória, método e contato'
    ],
    benefits: [
      'Conteúdo organizado para o cliente encontrar o que procura sem depender do atendimento',
      'Estrutura, títulos e velocidade preparados para indexação no Google',
      'Identidade visual coerente com o posicionamento da empresa'
    ],
    cta: 'Quero um site institucional',
    topic: 'um site institucional',
    related: ['louise-reis', 'centro-de-isoladas']
  },
  {
    id: 'software-sob-medida',
    number: '03',
    title: 'Software sob medida',
    description: 'Sistemas personalizados, plataformas SaaS, dashboards, ferramentas internas e soluções voltadas à operação empresarial.',
    examples: [
      'Aplicativos de gestão com agenda, finanças e relatórios',
      'Plataformas de estudo com videoaulas, questões e simulados',
      'Plataformas por assinatura com área do cliente'
    ],
    benefits: [
      'O sistema acompanha o processo da empresa, e não o contrário',
      'Informação centralizada no lugar de cadernos, planilhas e prints',
      'Arquitetura preparada para receber novas funcionalidades'
    ],
    cta: 'Quero um sistema sob medida',
    topic: 'um sistema sob medida',
    related: ['agenda-emi', 'centro-de-isoladas', 'prumo']
  },
  {
    id: 'inteligencia-artificial',
    number: '04',
    title: 'Inteligência artificial',
    description: 'Agentes inteligentes, assistentes especializados, interpretação de documentos e aplicações de IA adaptadas a necessidades específicas.',
    examples: [
      'Agentes que atendem, agendam e respondem pelo WhatsApp',
      'Assistentes que registram informações a partir de mensagens ou voz',
      'Geração de conteúdo com revisão humana antes da publicação'
    ],
    benefits: [
      'Atendimento e registro funcionando fora do horário comercial',
      'Menos digitação e menos retrabalho na rotina da equipe',
      'IA aplicada a uma tarefa concreta, com supervisão de quem entende do negócio'
    ],
    cta: 'Quero aplicar IA no meu negócio',
    topic: 'uma solução com inteligência artificial',
    related: ['prumo', 'agenda-emi']
  },
  {
    id: 'automacao-e-integracoes',
    number: '05',
    title: 'Automação e integrações',
    description: 'Integração de sistemas, automatização de tarefas, fluxos operacionais e comunicação entre ferramentas.',
    examples: [
      'Envio automático de e-mails, relatórios e resumos',
      'Lembretes e confirmações automáticas para clientes',
      'Integração entre site, WhatsApp, agenda, planilhas e sistemas'
    ],
    benefits: [
      'Tarefas repetitivas deixam de depender de alguém lembrar',
      'Menos erro de digitação e informação duplicada',
      'Mais tempo da equipe para o que exige decisão'
    ],
    cta: 'Quero automatizar um processo',
    topic: 'automação e integração de processos',
    related: ['prumo', 'agenda-emi']
  }
]
