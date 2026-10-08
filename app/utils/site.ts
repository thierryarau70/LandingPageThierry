export const WHATSAPP = '5595991432677'
export const EMAIL = 'thierryaraujo309@gmail.com'

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
  { q: 'Vai funcionar nos anúncios?', a: 'Sim. A página já sai preparada para Pixel, conversões e campanhas.' }
]
