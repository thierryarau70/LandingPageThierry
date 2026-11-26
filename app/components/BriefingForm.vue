<script setup lang="ts">
// Solicitação de orçamento. Não há backend: a mensagem é montada e entregue pelo WhatsApp oficial
// (ou por e-mail, à escolha do visitante). Nada é armazenado no site.
import { mailLink, site, waLink } from '~/data/site'

const solutions = ['Landing page', 'Website institucional', 'Sistema personalizado', 'Inteligência artificial', 'Automação', 'Outro'] as const
const deadlines = ['Sem data definida', 'Até 30 dias', 'De 1 a 3 meses', 'Mais de 3 meses']
const budgets = ['Prefiro conversar antes', 'Até R$ 2 mil', 'De R$ 2 mil a R$ 5 mil', 'De R$ 5 mil a R$ 15 mil', 'Acima de R$ 15 mil']

const form = reactive({ name: '', company: '', contact: '', solution: '', description: '', deadline: deadlines[0]!, budget: '', website: '' })
type Field = 'name' | 'contact' | 'solution' | 'description'
const errors = reactive<Record<Field, string>>({ name: '', contact: '', solution: '', description: '' })
const sent = ref<'' | 'whatsapp' | 'email'>('')
const lastLink = ref('')
const root = ref<HTMLFormElement>()
const startedAt = ref(0)
onMounted(() => { startedAt.value = Date.now() })

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
const isPhone = (v: string) => v.replace(/\D/g, '').length >= 10

function validate(): boolean {
  errors.name = form.name.trim().length >= 2 ? '' : 'Informe seu nome.'
  const c = form.contact.trim()
  errors.contact = isEmail(c) || isPhone(c) ? '' : 'Informe um WhatsApp com DDD ou um e-mail válido.'
  errors.solution = form.solution ? '' : 'Escolha o tipo de solução.'
  errors.description = form.description.trim().length >= 20 ? '' : 'Descreva o projeto em pelo menos uma frase (20 caracteres).'
  return !Object.values(errors).some(Boolean)
}

const message = () => [
  'Olá, Thierry! Quero iniciar um projeto.',
  '',
  `*Nome:* ${form.name.trim()}`,
  form.company.trim() ? `*Empresa:* ${form.company.trim()}` : null,
  `*Contato:* ${form.contact.trim()}`,
  `*Tipo de solução:* ${form.solution}`,
  `*Prazo desejado:* ${form.deadline}`,
  form.budget ? `*Faixa de investimento:* ${form.budget}` : null,
  '',
  '*Sobre o projeto:*',
  form.description.trim()
].filter(line => line !== null).join('\n')

function submit(channel: 'whatsapp' | 'email') {
  sent.value = ''
  if (!validate()) {
    nextTick(() => root.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
    return
  }
  // Proteção básica contra spam: campo-isca preenchido ou envio rápido demais para um humano
  if (form.website || Date.now() - startedAt.value < 2500) return
  const text = message()
  lastLink.value = channel === 'whatsapp' ? waLink(text) : mailLink(`Novo projeto — ${form.solution}`, text.replace(/\*/g, ''))
  trackLead(channel === 'whatsapp' ? 'formulario' : 'formulario-email')
  if (channel === 'whatsapp') window.open(lastLink.value, '_blank', 'noopener')
  else window.location.href = lastLink.value
  sent.value = channel
}
</script>

<template>
  <form ref="root" class="theme-paper briefing" novalidate aria-labelledby="briefing-title" @submit.prevent="submit('whatsapp')">
    <div class="briefing__head">
      <h3 id="briefing-title" class="t-display briefing__title">Briefing<span class="dot" aria-hidden="true" /></h3>
      <p class="t-label text-muted">Campos com * são obrigatórios</p>
    </div>

    <div class="briefing__grid">
      <div class="field">
        <label for="bf-name" class="t-label">Nome *</label>
        <input id="bf-name" v-model="form.name" type="text" autocomplete="name" required :aria-invalid="!!errors.name" :aria-describedby="errors.name ? 'bf-name-err' : undefined">
        <p v-if="errors.name" id="bf-name-err" class="field__error">{{ errors.name }}</p>
      </div>
      <div class="field">
        <label for="bf-company" class="t-label">Empresa</label>
        <input id="bf-company" v-model="form.company" type="text" autocomplete="organization">
      </div>
      <div class="field field--full">
        <label for="bf-contact" class="t-label">WhatsApp ou e-mail *</label>
        <input id="bf-contact" v-model="form.contact" type="text" inputmode="email" autocomplete="email" required :aria-invalid="!!errors.contact" :aria-describedby="errors.contact ? 'bf-contact-err' : undefined">
        <p v-if="errors.contact" id="bf-contact-err" class="field__error">{{ errors.contact }}</p>
      </div>

      <fieldset class="field field--full" :aria-describedby="errors.solution ? 'bf-solution-err' : undefined">
        <legend class="t-label">Tipo de solução *</legend>
        <div class="choices">
          <label v-for="(s, i) in solutions" :key="s" class="choice">
            <input v-model="form.solution" type="radio" name="solution" :value="s" :aria-invalid="i === 0 && !!errors.solution ? 'true' : undefined">
            <span>{{ s }}</span>
          </label>
        </div>
        <p v-if="errors.solution" id="bf-solution-err" class="field__error">{{ errors.solution }}</p>
      </fieldset>

      <div class="field field--full">
        <label for="bf-description" class="t-label">Descrição do projeto *</label>
        <textarea id="bf-description" v-model="form.description" rows="4" required placeholder="O que a empresa faz, qual problema quer resolver e o que já existe hoje." :aria-invalid="!!errors.description" :aria-describedby="errors.description ? 'bf-description-err' : undefined" />
        <p v-if="errors.description" id="bf-description-err" class="field__error">{{ errors.description }}</p>
      </div>

      <div class="field">
        <label for="bf-deadline" class="t-label">Prazo desejado</label>
        <select id="bf-deadline" v-model="form.deadline"><option v-for="d in deadlines" :key="d">{{ d }}</option></select>
      </div>
      <div class="field">
        <label for="bf-budget" class="t-label">Faixa de investimento (opcional)</label>
        <select id="bf-budget" v-model="form.budget"><option value="">Selecionar</option><option v-for="b in budgets" :key="b">{{ b }}</option></select>
      </div>

      <!-- campo-isca: invisível para pessoas, preenchido por robôs -->
      <div class="hp" aria-hidden="true"><label for="bf-website">Não preencha este campo</label><input id="bf-website" v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off"></div>
    </div>

    <div class="briefing__actions">
      <BrutalistButton type="submit" size="lg" block arrow="up-right">Enviar pelo WhatsApp</BrutalistButton>
      <button type="button" class="link-line t-label" @click="submit('email')">Prefiro enviar por e-mail <ArrowIcon dir="right" /></button>
    </div>

    <p class="briefing__status" role="status" aria-live="polite">
      <template v-if="sent === 'whatsapp'">O WhatsApp abriu em outra aba com a mensagem pronta: é só enviar. Não abriu? <a :href="lastLink" target="_blank" rel="noopener noreferrer" class="underline">Abrir o WhatsApp</a>.</template>
      <template v-else-if="sent === 'email'">Seu aplicativo de e-mail abriu com a mensagem pronta: é só enviar. Não abriu? Escreva para <a :href="`mailto:${site.contact.email}`" class="underline">{{ site.contact.email }}</a>.</template>
    </p>
    <p class="text-small text-muted">A mensagem abre no seu WhatsApp ou e-mail para você revisar antes de enviar. Nada é armazenado neste site. <NuxtLink to="/privacidade" class="underline">Política de privacidade</NuxtLink>.</p>
  </form>
</template>

<style scoped>
.briefing { padding: clamp(1.1rem, 2.4vw, 2.5rem); display: grid; gap: clamp(1.25rem, 2vw, 2rem); }
.briefing__head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 0.5rem 1rem; border-bottom: 1px solid var(--rule); padding-bottom: 1rem; }
.briefing__title { font-size: clamp(2rem, 3.6vw, 3.5rem); line-height: 0.85; }
.briefing__grid { display: grid; gap: 1.25rem var(--gap); }
@media (width >= 40rem) { .briefing__grid { grid-template-columns: 1fr 1fr; } .field--full { grid-column: 1 / -1; } }
.field { display: grid; gap: 0.5rem; min-width: 0; border: 0; padding: 0; margin: 0; }
.field legend { margin-bottom: 0.5rem; padding: 0; }
.field input[type="text"], .field textarea, .field select {
  width: 100%; min-height: 3.25rem; padding: 0.8rem 0.9rem; border: 1px solid var(--color-carbon); border-radius: 0;
  background: transparent; color: var(--color-carbon); font: 500 1rem/1.4 var(--font-heading); appearance: none;
  transition: background-color 0.2s, box-shadow 0.2s;
}
.field textarea { resize: vertical; min-height: 7.5rem; }
.field select { background-image: linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%); background-position: calc(100% - 1.3rem) 55%, calc(100% - 0.95rem) 55%; background-size: 0.36rem 0.36rem; background-repeat: no-repeat; padding-right: 2.5rem; }
.field ::placeholder { color: var(--color-ink-soft); opacity: 1; }
.field input:focus-visible, .field textarea:focus-visible, .field select:focus-visible { outline: 0; background: var(--color-white); box-shadow: inset 0 -4px 0 var(--color-signal); }
.field [aria-invalid="true"] { box-shadow: inset 0 -4px 0 var(--color-signal-deep); }
.field__error { color: var(--color-signal-deep); font-size: 0.875rem; font-weight: 600; }
.choices { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.5rem; }
@media (width >= 40rem) { .choices { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.choice { position: relative; display: block; cursor: pointer; }
.choice input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
.choice span { display: flex; align-items: center; min-height: 3.25rem; padding: 0.6rem 0.85rem; border: 1px solid var(--color-carbon); font: 600 0.9375rem/1.2 var(--font-heading); transition: background-color 0.2s, color 0.2s; }
.choice:hover span { background: rgb(13 13 13 / 0.07); }
.choice input:checked + span { background: var(--color-carbon); color: var(--color-paper); box-shadow: inset 0.5rem 0 0 var(--color-signal); padding-left: 1.35rem; }
.choice input:focus-visible + span { outline: 2px solid var(--color-signal-deep); outline-offset: 3px; }
.hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.briefing__actions { display: grid; gap: 1rem; justify-items: start; }
.briefing__status { min-height: 0; font-weight: 600; }
.briefing__status:empty { display: none; }
</style>
