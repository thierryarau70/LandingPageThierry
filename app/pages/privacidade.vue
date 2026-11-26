<script setup lang="ts">
import { site } from '~/data/site'

usePageSeo({ title: 'Política de privacidade', description: 'Como este site trata os dados de quem navega e de quem envia uma solicitação de orçamento.' })

const sections = [
  {
    title: 'Quem é o responsável',
    text: [`Este site é mantido por ${site.name}, CNPJ ${site.cnpj}, com base em ${site.location.city}, ${site.location.stateName}. Para qualquer assunto sobre seus dados, escreva para ${site.contact.email}.`]
  },
  {
    title: 'Formulário de briefing',
    text: [
      'O formulário não envia nem armazena dados em servidores deste site. Ao enviar, a mensagem é montada no seu navegador e aberta no seu WhatsApp ou no seu aplicativo de e-mail, para você revisar e decidir se envia.',
      'As informações que você enviar por WhatsApp ou e-mail são usadas apenas para responder ao contato e elaborar a proposta.'
    ]
  },
  {
    title: 'Medição de acessos',
    text: [
      'Quando configurados, o site pode usar o Google Analytics e o Pixel da Meta para medir visitas e contatos iniciados (por exemplo, cliques em links do WhatsApp). Essas ferramentas usam cookies e identificadores do navegador e seguem as políticas de privacidade do Google e da Meta.',
      'Você pode bloquear cookies e rastreadores nas configurações do seu navegador sem perder acesso ao conteúdo do site.'
    ]
  },
  {
    title: 'Links para outros sites',
    text: ['Os projetos apresentados levam a sites de terceiros, que têm políticas próprias.']
  },
  {
    title: 'Seus direitos',
    text: [`Nos termos da Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode pedir acesso, correção ou exclusão dos dados que tiver enviado. Basta escrever para ${site.contact.email}.`]
  }
]
</script>

<template>
  <main id="conteudo" class="theme-paper">
    <div class="wrap pt-10 pb-(--section-y) md:pt-16">
      <nav class="t-label flex items-center gap-3 text-muted" aria-label="Trilha">
        <NuxtLink to="/" class="link-line">Início</NuxtLink><span aria-hidden="true">/</span><span aria-current="page" class="text-ink">Privacidade</span>
      </nav>
      <h1 class="t-display mt-8 text-giant md:mt-12">Política de privacidade<DotEnd /></h1>
      <div class="mt-12 grid gap-y-10 md:mt-20">
        <section v-for="(s, i) in sections" :key="s.title" class="grid-12 gap-y-4 border-t border-line pt-4">
          <h2 class="t-label col-span-4 flex items-center gap-3 md:col-span-4"><span class="tabular-nums">0{{ i + 1 }}</span><span class="text-muted" aria-hidden="true">/</span>{{ s.title }}</h2>
          <div class="col-span-4 grid gap-4 md:col-span-8 lg:col-span-6"><p v-for="p in s.text" :key="p" class="t-prose">{{ p }}</p></div>
        </section>
      </div>
    </div>
  </main>
</template>
