// Camada de conteúdo dos projetos. Tudo o que aparece nos cards, na lista e nas páginas de case
// vem daqui: não duplique estas informações em componentes.
// Regras: só fatos verificáveis (site do projeto, material publicado ou dados do próprio autor);
// sem métricas inventadas; projeto fora do ar ou não autorizado fica com `hidden: true`.

export type Pillar = 'Design' | 'Software' | 'Inteligência' | 'Automação'

export interface ProjectImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface Project {
  slug: string
  name: string
  category: string
  pillars: Pillar[]
  // frase objetiva usada nos cards e na meta description
  summary: string
  context: string
  problem: string
  solution: string
  features: string[]
  // escopo real da entrega (etapas do desenvolvimento)
  delivery: string[]
  // tecnologias com evidência; vazio quando não houver informação confiável
  stack: string[]
  // resultados verificáveis; a seção só aparece quando houver algum
  results?: string[]
  status: 'No ar' | 'Produto no ar' | 'Em desenvolvimento'
  url?: string
  cover: ProjectImage
  // vídeo curto do site em uso (public/portfolio/*.mp4), tocado no lugar da capa
  video?: string
  desktop: ProjectImage[]
  mobile: ProjectImage[]
  // posição entre os trabalhos selecionados da página inicial (1 = primeiro)
  featured?: number
  hidden?: boolean
}

const shots = (slug: string, name: string) => ({
  cover: { src: `/portfolio/${slug}.webp`, alt: `Primeira dobra de ${name}`, width: 1200, height: 616 },
  desktop: [
    { src: `/projetos/${slug}/desktop.webp`, alt: `${name}: página inicial no computador`, width: 1440, height: 900 },
    { src: `/projetos/${slug}/desktop-2.webp`, alt: `${name}: seção interna no computador`, width: 1440, height: 900 }
  ],
  mobile: [
    { src: `/projetos/${slug}/mobile.webp`, alt: `${name}: página inicial no celular`, width: 780, height: 1688 },
    { src: `/projetos/${slug}/mobile-2.webp`, alt: `${name}: seção interna no celular`, width: 780, height: 1688 }
  ]
})

// Capas e vídeos já existentes usam o nome do arquivo antigo; as novas capturas usam o slug.
const media = (slug: string, name: string, file = slug, video = true) => {
  const s = shots(slug, name)
  return { ...s, cover: { ...s.cover, src: `/portfolio/${file}.webp` }, video: video ? `/portfolio/${file}.mp4` : undefined }
}

export const projects: Project[] = [
  {
    slug: 'prumo',
    name: 'Plataforma Prumo',
    category: 'Newsletter automatizada com IA',
    pillars: ['Software', 'Inteligência', 'Automação'],
    summary: 'Newsletter gratuita de engenharia e arquitetura com edições escritas com apoio de IA, conferência humana e envio automático por e-mail e WhatsApp.',
    context: 'A Prumo é uma newsletter gratuita de engenharia e arquitetura na prática: obra, orçamento, contratos e carreira em cinco minutos de leitura, de segunda a sexta. No site, o profissional também faz o Diagnóstico Prumo e vê onde está em relação ao mercado.',
    problem: 'Publicar uma edição por dia útil exige ler material técnico, separar pautas, escrever no tom da marca, produzir imagens e disparar e-mails e resumos. Feito à mão, esse volume de trabalho repetitivo não se sustenta.',
    solution: 'Uma plataforma que automatiza a produção e a distribuição sem tirar o controle da equipe. Engenheiros conferem cada informação; a IA lê o material, separa as pautas e escreve a edição no tom da Prumo; outra IA cria as imagens. Na véspera, a equipe recebe a prévia e pode segurar o envio. Pela manhã, a edição chega por e-mail e o resumo sai no canal do WhatsApp.',
    features: [
      'Edições escritas com IA a partir de material conferido por engenheiros',
      'Imagens das edições geradas por IA',
      'Prévia enviada à equipe na véspera, com opção de segurar o envio',
      'Envio automático por e-mail nas manhãs de dia útil',
      'Resumo de cada edição no canal do WhatsApp',
      'Diagnóstico Prumo: 15 perguntas, 6 competências e relatório enviado por e-mail',
      'Arquivo público das edições, numeradas e organizadas por categoria'
    ],
    delivery: ['Design da plataforma', 'Desenvolvimento', 'Automação do envio das edições, do diagnóstico e dos resumos', 'Testes e validação com apoio de QA'],
    stack: ['Nuxt', 'Vue', 'Tailwind CSS', 'Supabase'],
    status: 'No ar',
    url: 'https://www.plataformaprumo.com.br',
    ...media('prumo', 'Plataforma Prumo'),
    featured: 1
  },
  {
    slug: 'agenda-emi',
    name: 'Agenda Emi',
    category: 'Aplicativo por assinatura para dentistas',
    pillars: ['Software', 'Inteligência', 'Design'],
    summary: 'Agenda com confirmação pelo WhatsApp e finanças do consultório em um aplicativo só, com assistente de IA que registra consultas e gastos por mensagem.',
    context: 'A Emi é dentista e atende em clínica. A consulta ficava anotada em um lugar, a confirmação no WhatsApp e os pagamentos espalhados entre Pix, cartão e dinheiro.',
    problem: 'Com caderno, prints de Pix e contas de cabeça, o fim do mês nunca fechava: era preciso descontar a taxa da maquininha e a comissão de cada atendimento para saber quanto era, de fato, a parte dela.',
    solution: 'Um aplicativo que reúne a agenda e as finanças do consultório. A consulta é marcada com lembrete e confirmação do paciente pelo WhatsApp, o atendimento é lançado com um toque e a parte do profissional sai calculada na hora, já sem a taxa do cartão e sem a comissão da clínica. Um assistente com IA registra consultas e gastos a partir de uma mensagem.',
    features: [
      'Agenda com lembrete e confirmação do paciente pelo WhatsApp',
      'Atendimento lançado com um toque',
      'Parte do profissional calculada na hora, sem taxa do cartão e sem comissão',
      'Assistente com IA: “marca a Joana amanhã 14h” ou “farmácia 64,50 no débito”',
      'Odontograma com ditado por voz e orçamento que o paciente aprova',
      'Ficha do paciente com anamnese, prontuário e termo assinado no celular',
      'Relatório do mês pronto para o contador',
      'Instala no celular como aplicativo e funciona sem internet'
    ],
    delivery: ['Design do aplicativo', 'Desenvolvimento do aplicativo', 'Página de vendas', 'Assinatura com período de teste gratuito'],
    stack: ['Nuxt', 'Vue', 'PWA (instalável e offline)', 'Claude, da Anthropic (assistente)'],
    status: 'Produto no ar',
    url: 'https://www.agendaemi.com.br',
    ...media('agenda-emi', 'Agenda Emi'),
    featured: 2
  },
  {
    slug: 'romulo-tuan',
    name: 'Rômulo Tuan',
    category: 'Landing page para personal trainer',
    pillars: ['Design', 'Software'],
    summary: 'Landing page do personal trainer em Boa Vista (RR): método, formação, planos e contratação direta pelo WhatsApp.',
    context: 'Rômulo Tuan é personal trainer em Boa Vista (RR), registrado no CREF, com trabalho em treinamento de força, hipertrofia e exercício aplicado à saúde.',
    problem: 'O método, a formação e os planos do profissional precisavam estar em um só lugar, com uma identidade própria, para o aluno entender como o treino funciona antes de contratar.',
    solution: 'Uma landing page com identidade visual própria que apresenta a metodologia em cinco pilares, as capacitações, as áreas de atuação e os planos, responde às dúvidas mais comuns e leva o aluno a começar o treino pelo WhatsApp.',
    features: ['Metodologia de treino em cinco pilares', 'Nove capacitações organizadas em três grupos', 'Oito áreas de atuação', 'Planos de acompanhamento', 'Dúvidas frequentes', 'Contratação direta pelo WhatsApp'],
    delivery: ['Design', 'Identidade visual', 'Desenvolvimento', 'Textos da landing page'],
    stack: ['Nuxt', 'Vue', 'Tailwind CSS', 'Nuxt Image'],
    status: 'No ar',
    url: 'https://personalrt.vercel.app',
    ...media('romulo-tuan', 'Rômulo Tuan'),
    featured: 3
  },
  {
    slug: 'emile-vitoria',
    name: 'Dra. Emile Vitória',
    category: 'Site para cirurgiã-dentista',
    pillars: ['Design', 'Software'],
    summary: 'Site da cirurgiã-dentista em Boa Vista (RR): tratamentos, resultados, dúvidas e agendamento de avaliação pelo WhatsApp.',
    context: 'A Dra. Emile Vitória é cirurgiã-dentista em Boa Vista (RR), com atendimento em clínica geral e harmonização orofacial.',
    problem: 'Ela precisava apresentar os tratamentos com clareza e facilitar o agendamento de avaliações, principalmente para quem pesquisa pelo celular.',
    solution: 'Um site com tratamentos, resultados e dúvidas frequentes, botão de WhatsApp em todas as páginas e domínio próprio registrado no nome da profissional.',
    features: [
      'Tratamentos em duas áreas: clínica geral e harmonização orofacial',
      'Casos reais',
      'Atendimento explicado em quatro etapas',
      'Dúvidas frequentes',
      'Agendamento de avaliação pelo WhatsApp',
      'Layout pensado primeiro para o celular',
      'Domínio próprio no nome da profissional'
    ],
    delivery: ['Design', 'Desenvolvimento', 'Integração com WhatsApp'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Dados estruturados (JSON-LD)'],
    status: 'No ar',
    url: 'https://www.draemilevitoria.com.br',
    ...media('emile-vitoria', 'Dra. Emile Vitória', 'emile'),
    featured: 4
  },
  {
    slug: 'louise-reis',
    name: 'Dra. Louise Reis',
    category: 'Site para dentista',
    pillars: ['Design', 'Software'],
    summary: 'Site da dentista especialista em harmonização orofacial em Boa Vista (RR), com índice de tratamentos e agendamento de avaliação pelo WhatsApp.',
    context: 'A Dra. Louise Reis é dentista em Boa Vista (RR), com atuação em harmonização orofacial.',
    problem: 'Era preciso apresentar os tratamentos de sorriso e rosto com um visual elegante e levar a paciente a agendar a avaliação.',
    solution: 'Um site com índice de tratamentos — facetas, clareamento, toxina botulínica, preenchimentos e rinomodelação — e agendamento de avaliação pelo WhatsApp.',
    features: ['Índice numerado de tratamentos de sorriso, rosto e função', 'Facetas, clareamento, toxina botulínica, preenchimentos e rinomodelação', 'Casos de antes e depois', 'Atendimento explicado em quatro etapas', 'Mapa de localização', 'Agendamento de avaliação pelo WhatsApp'],
    delivery: ['Design', 'Desenvolvimento', 'Integração com WhatsApp'],
    stack: ['Nuxt', 'Vue', 'Nuxt Image'],
    status: 'No ar',
    url: 'https://www.dralouisereis.com.br',
    ...media('louise-reis', 'Dra. Louise Reis'),
    featured: 5
  },
  {
    slug: 'arouche',
    name: 'Arouche Moda Íntima',
    category: 'Catálogo online com pedido pelo WhatsApp',
    pillars: ['Design', 'Software'],
    summary: 'Catálogo da loja de moda íntima em Boa Vista (RR): a cliente escolhe peça, cor e tamanho e o pedido chega pronto no WhatsApp, sem cadastro.',
    context: 'A Arouche Moda Íntima é uma loja de Boa Vista (RR) com conjuntos, sutiãs, calcinhas e linha infantil.',
    problem: 'A loja precisava mostrar as peças e receber pedidos sem exigir cadastro da cliente e sem depender de alguém para atualizar o catálogo.',
    solution: 'Um catálogo em que a cliente escolhe a peça, a cor e o tamanho, toca em “Pedir no WhatsApp” e a mensagem chega pronta para a loja, com tudo o que é preciso para fechar o pedido. A própria loja atualiza o catálogo pelo celular.',
    features: [
      'Catálogo completo com busca e filtros por categoria',
      'Cores e tamanhos de cada peça',
      'Sacola para pedir várias peças de uma vez',
      'Pedido direto no WhatsApp da loja, sem cadastro',
      'Identidade visual da marca no celular e no computador',
      'Atualização do catálogo pela própria loja'
    ],
    delivery: ['Design', 'Desenvolvimento do catálogo', 'Integração com WhatsApp'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
    status: 'No ar',
    url: 'https://www.arouchemodaintima.com.br',
    ...media('arouche', 'Arouche Moda Íntima'),
    featured: 6
  },
  {
    slug: 'endhos',
    name: 'Endhos Medicina Integrada',
    category: 'Site para clínica médica',
    pillars: ['Design', 'Software'],
    summary: 'Site da clínica de endoscopia e especialidades médicas em Boa Vista (RR), com exames, preparo, corpo clínico, convênios e agendamento pelo WhatsApp.',
    context: 'A Endhos Medicina Integrada é uma clínica de endoscopia e especialidades médicas em Boa Vista (RR).',
    problem: 'As informações que o paciente procura antes de marcar — especialidades, exames, preparo, convênios e corpo clínico — precisavam estar reunidas em um só lugar.',
    solution: 'Um site que organiza o conteúdo da clínica e leva o paciente a agendar pelo WhatsApp da recepção, com exames organizados por grupo e orientações de preparo.',
    features: [
      'Onze especialidades, cada uma com página própria',
      'Exames organizados por grupo, com orientações de preparo',
      'Corpo clínico',
      'Convênios',
      'Estrutura da clínica',
      'Agendamento pelo WhatsApp da recepção'
    ],
    delivery: ['Design', 'Desenvolvimento', 'Organização do conteúdo da clínica'],
    stack: ['Nuxt', 'Vue', 'Tailwind CSS'],
    status: 'No ar',
    url: 'https://clinicaendhos.vercel.app',
    ...media('endhos', 'Endhos Medicina Integrada'),
    // aguardando a resposta do cliente: volta a aparecer quando ele autorizar
    hidden: true
  },
  {
    slug: 'raphael-solek',
    name: 'Dr. Raphael Solek',
    category: 'Landing page para advogado',
    pillars: ['Design', 'Software'],
    summary: 'Landing page do advogado em Boa Vista (RR): áreas de atuação, trajetória acadêmica e profissional e contato direto pelo WhatsApp.',
    context: 'O Dr. Raphael Solek é advogado em Boa Vista (RR).',
    problem: 'Era preciso apresentar a trajetória e as áreas de atuação do advogado em uma página de marca pessoal e facilitar o primeiro contato.',
    solution: 'Uma landing page com áreas de atuação, trajetória acadêmica e profissional, princípios de atuação e contato direto pelo WhatsApp.',
    features: ['Áreas de atuação, cada uma com conversa direta pelo WhatsApp', 'Trajetória acadêmica e profissional em linha do tempo', 'Princípios de atuação', 'Contato direto pelo WhatsApp'],
    delivery: ['Design', 'Desenvolvimento', 'Textos da landing page'],
    stack: ['Nuxt', 'Vue', 'Tailwind CSS'],
    status: 'No ar',
    url: 'https://raphaelsolek.vercel.app',
    ...media('raphael-solek', 'Dr. Raphael Solek'),
    // aguardando a resposta do cliente: volta a aparecer quando ele autorizar
    hidden: true
  },
  {
    slug: 'centro-de-isoladas',
    name: 'Centro de Isoladas',
    category: 'Site e plataforma de estudos para cursinho',
    pillars: ['Design', 'Software'],
    summary: 'Site do cursinho preparatório de Boa Vista (RR) com foco em UFRR e UERR: turmas presenciais, cursos online e plataforma de estudos com videoaulas, questões e simulados.',
    context: 'O Centro de Isoladas (CDI) é um cursinho preparatório de Boa Vista (RR) que trabalha com isoladas: aulas por disciplina, com professor especialista em cada área e foco nos vestibulares da UFRR e da UERR.',
    problem: 'O cursinho precisava divulgar as turmas presenciais, do 5º ano ao pré-vestibular, e ao mesmo tempo oferecer um lugar para o aluno estudar fora da sala e acompanhar o próprio progresso.',
    solution: 'Um site que apresenta as turmas, o método, os professores, os aprovados e os aulões, ligado a uma plataforma online com videoaulas, banco de questões com resolução comentada, simulados cronometrados no modelo da UFRR e desempenho por disciplina. A matrícula começa pelo contato do próprio site.',
    features: [
      'Cinco turmas presenciais, do 5º ano ao pré-vestibular',
      'Cursos online com videoaulas e materiais de apoio',
      'Banco de questões com resolução comentada',
      'Simulados cronometrados no modelo da UFRR',
      'Desempenho do aluno por disciplina',
      'Páginas de professores, aprovados, aulões e guias',
      'Área do aluno com login'
    ],
    delivery: ['Design', 'Desenvolvimento do site', 'Desenvolvimento da área do aluno'],
    stack: ['Nuxt', 'Vue', 'Nuxt Image'],
    status: 'No ar',
    url: 'https://www.centrodeisoladas.com.br',
    ...media('centro-de-isoladas', 'Centro de Isoladas', 'isoladas', false)
  },
  {
    slug: 'protocolo-iatf',
    name: 'Protocolo IATF',
    category: 'Aplicativo para veterinários',
    pillars: ['Software', 'Design'],
    summary: 'O protocolo de IATF inteiro pelo celular, do D0 ao D45, com diagnóstico por ditado de voz, relatório em PDF e funcionamento sem internet no curral.',
    context: 'A inseminação artificial em tempo fixo (IATF) segue um protocolo com datas e manejos definidos, do D0 ao D45, repetido em vários lotes e fazendas.',
    problem: 'O aplicativo precisava funcionar onde o trabalho acontece: no curral, com as mãos ocupadas e sem sinal de internet, sem perder o controle da agenda de cada fazenda nem o relatório para o fazendeiro.',
    solution: 'Um aplicativo que cobre o protocolo inteiro pelo celular. O diagnóstico de gestação é registrado por ditado de voz ou pela leitura do brinco com a câmera, a agenda reúne os protocolos de todas as fazendas e o relatório em PDF sai pronto para o fazendeiro. Tudo funciona sem internet.',
    features: [
      'Diagnóstico de gestação por ditado de voz',
      'Leitura do brinco pela câmera',
      'Agenda do protocolo de todas as fazendas',
      'Ranking de touros',
      'Estoque de sêmen e hormônios',
      'Relatório em PDF para o fazendeiro',
      'Uso sem internet no curral'
    ],
    delivery: ['Design do aplicativo', 'Desenvolvimento com uso offline', 'Página de vendas', 'Assinatura'],
    stack: ['Nuxt', 'Vue', 'PWA (instalável e offline)'],
    status: 'Produto no ar',
    url: 'https://protocolo-iatf.vercel.app',
    ...media('protocolo-iatf', 'Protocolo IATF'),
    // fora do portfólio a pedido do autor (26/11/2026); remova a linha abaixo para voltar a exibir
    hidden: true
  },
  {
    slug: 'solek-morais',
    name: 'Solek & Morais Advogados',
    category: 'Site institucional para escritório de advocacia',
    pillars: ['Design', 'Software'],
    summary: 'Site institucional do escritório em Boa Vista (RR), com áreas de atuação, profissionais e artigos, dentro das regras de publicidade da OAB.',
    context: 'O Solek & Morais Advogados Associados é um escritório de advocacia em Boa Vista (RR).',
    problem: 'O escritório precisava apresentar suas áreas de atuação e seus profissionais com sobriedade, respeitando as regras de publicidade da OAB, e trazer o conteúdo do site antigo para uma estrutura nova.',
    solution: 'Um site institucional com visual editorial: o escritório, as áreas de atuação, os profissionais, os artigos e o contato, com conteúdo informativo e o caminho para o WhatsApp sempre à mão.',
    features: [
      'Apresentação do escritório: missão, visão e valores',
      'Oito áreas de atuação, cada uma com página própria',
      'Perfil dos sócios',
      'Publicações jurídicas',
      'Contato direto pelo WhatsApp',
      'Conteúdo migrado do site antigo'
    ],
    delivery: ['Design', 'Desenvolvimento', 'Textos', 'Migração do conteúdo do site antigo'],
    stack: ['Nuxt', 'Vue', 'Tailwind CSS', 'Pré-renderização'],
    status: 'No ar',
    url: 'https://escritoriosolek.vercel.app',
    ...media('solek-morais', 'Solek & Morais Advogados'),
    // aguardando a resposta do cliente: volta a aparecer quando ele autorizar
    hidden: true
  },
  {
    slug: 'cw-imports',
    name: 'CW Imports',
    category: 'Catálogo online com pedido pelo WhatsApp',
    pillars: ['Design', 'Software'],
    summary: 'Catálogo da loja de eletrônicos em Boa Vista (RR): ao tocar no produto, o WhatsApp abre com ele já escrito na conversa.',
    context: 'A CW Imports é uma loja de eletrônicos em Boa Vista (RR), com iPhones, fones, smartwatches e acessórios.',
    problem: 'A loja precisava mostrar os produtos e fechar a venda pelo WhatsApp sem que o cliente tivesse de explicar o que queria.',
    solution: 'Um catálogo com busca, filtro por categoria e preço de/por. Ao tocar no produto, o WhatsApp abre com ele já escrito na conversa.',
    features: ['Busca e filtro por categoria', 'Preço de/por e selo de disponibilidade', '“Chamar no WhatsApp” em cada produto, com ele já escrito na conversa', '“Pedir um modelo” para o que não está no catálogo', 'Como comprar em três passos'],
    delivery: ['Design', 'Desenvolvimento do catálogo', 'Integração com WhatsApp'],
    stack: ['Nuxt', 'Vue'],
    status: 'No ar',
    url: 'https://cw-imports-catalogo.vercel.app',
    ...media('cw-imports', 'CW Imports')
  }
]

export const visibleProjects = projects.filter(p => !p.hidden)
export const featuredProjects = visibleProjects.filter(p => p.featured).sort((a, b) => a.featured! - b.featured!)
export const findProject = (slug: string) => visibleProjects.find(p => p.slug === slug)
export const projectNumber = (slug: string) => String(visibleProjects.findIndex(p => p.slug === slug) + 1).padStart(2, '0')
