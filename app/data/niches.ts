// Páginas específicas para anúncios: /para/<slug>
export interface Niche {
  slug: string
  label: string
  seoTitle: string
  title: string
  highlight: string
  text: string
  // slugs dos projetos mais próximos do negócio do visitante
  projects: string[]
  pointsTitle: string
  points: { title: string, text: string }[]
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
    projects: ['emile-vitoria', 'endhos', 'louise-reis'],
    pointsTitle: 'Feito para a rotina de uma clínica',
    points: [
      { title: 'Tratamentos bem explicados', text: 'Cada serviço com descrição clara, para o paciente entender antes de marcar.' },
      { title: 'Agendamento pelo WhatsApp', text: 'Botões de agendamento em toda a página, direto para a sua recepção.' },
      { title: 'Endereço e horários', text: 'Mapa, horário de atendimento e formas de contato fáceis de achar.' },
      { title: 'Confiança', text: 'Espaço para sua formação, registro profissional e depoimentos de pacientes.' },
      { title: 'Perfeito no celular', text: 'A maioria dos pacientes chega pelo Instagram, então tudo é pensado para o celular.' },
      { title: 'Pronto para anúncios', text: 'Pixel e medição de contatos para saber quanto custa cada paciente novo.' }
    ]
  },
  {
    slug: 'cursos',
    label: 'cursos',
    seoTitle: 'Site para cursos e escolas',
    title: 'Um site para o seu curso que enche as turmas.',
    highlight: 'enche as turmas',
    text: 'Landing pages para cursinhos, escolas e professores: turmas, matrículas, cursos online e contato pelo WhatsApp em uma página rápida e bonita.',
    projects: ['centro-de-isoladas'],
    pointsTitle: 'Feito para quem vende cursos',
    points: [
      { title: 'Turmas e matrículas', text: 'Datas, horários e vagas organizados para o aluno decidir rápido.' },
      { title: 'Cursos online', text: 'Vitrine dos cursos gravados e, se precisar, área do aluno com videoaulas.' },
      { title: 'Aprovações e resultados', text: 'Destaque para aprovados e depoimentos de alunos.' },
      { title: 'Matrícula pelo WhatsApp', text: 'O aluno tira dúvidas e se matricula falando direto com a sua equipe.' },
      { title: 'Perfeito no celular', text: 'Pensado para quem chega pelo Instagram e pelo TikTok.' },
      { title: 'Pronto para anúncios', text: 'Ideal para campanhas de matrícula, com medição de contatos.' }
    ]
  },
  {
    slug: 'servicos',
    label: 'prestadores de serviço',
    seoTitle: 'Site para prestadores de serviço',
    title: 'Um site profissional para o seu serviço receber mais pedidos.',
    highlight: 'receber mais pedidos',
    text: 'Landing pages para advogados, salões, oficinas, arquitetos, personal trainers e outros prestadores de serviço, com orçamento pelo WhatsApp.',
    projects: ['solek-morais', 'raphael-solek', 'romulo-tuan'],
    pointsTitle: 'Feito para quem vende serviço',
    points: [
      { title: 'Serviços em destaque', text: 'O que você faz, para quem e como funciona, explicado em poucos segundos.' },
      { title: 'Orçamento pelo WhatsApp', text: 'O cliente chama você com a mensagem já pronta.' },
      { title: 'Seus trabalhos', text: 'Galeria de antes e depois, fotos e resultados.' },
      { title: 'Depoimentos', text: 'Avaliações de clientes para quem ainda não conhece o seu trabalho.' },
      { title: 'Perfeito no celular', text: 'Rápido e fácil de usar em qualquer celular.' },
      { title: 'Pronto para anúncios', text: 'Medição de contatos para saber o retorno de cada real investido.' }
    ]
  }
]
