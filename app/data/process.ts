export interface ProcessStep {
  number: string
  title: string
  text: string
  output: string
}

export const processSteps: ProcessStep[] = [
  { number: '01', title: 'Diagnóstico', text: 'Entendimento das necessidades, objetivos e contexto do negócio.', output: 'Problema e objetivo descritos com clareza' },
  { number: '02', title: 'Estratégia', text: 'Definição da solução, escopo, arquitetura e direção visual.', output: 'Proposta com escopo, prazo e investimento' },
  { number: '03', title: 'Construção', text: 'Design, implementação, integrações, validações e acompanhamento.', output: 'Versões para revisão e ajustes' },
  { number: '04', title: 'Entrega', text: 'Publicação, documentação, orientações e suporte conforme contratação.', output: 'Projeto no ar e orientações de uso' }
]

export interface Differential {
  title: string
  text: string
}

export const differentials: Differential[] = [
  { title: 'Atendimento direto com o desenvolvedor', text: 'Quem conversa com você é quem projeta e programa. Não há intermediário entre a decisão e a execução.' },
  { title: 'Desenvolvimento personalizado', text: 'Cada projeto parte do problema do negócio, não de um modelo pronto reaproveitado.' },
  { title: 'Design com identidade própria', text: 'Interface desenhada para a marca, com tipografia, cor e ritmo coerentes com o posicionamento.' },
  { title: 'Arquitetura orientada à manutenção', text: 'Código organizado, componentes reutilizáveis e dados centralizados para o projeto continuar evoluindo.' },
  { title: 'Performance e SEO', text: 'Páginas leves, HTML semântico e metadados corretos desde a primeira versão.' },
  { title: 'Soluções de inteligência artificial', text: 'IA aplicada a tarefas concretas: atendimento, registro, leitura de documentos e geração de conteúdo.' },
  { title: 'Suporte e evolução', text: 'Manutenção, ajustes e novas funcionalidades podem ser contratados após a entrega.' }
]
