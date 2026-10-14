<template>
  <section id="contato" class="section contact">
    <h2>Vamos criar sua página?</h2>
    <p class="sub">Preencha e sua mensagem chega direto no meu WhatsApp.</p>
    <form @submit.prevent="send">
      <input aria-label="Seu nome" autocomplete="name" v-model="form.nome" placeholder="Seu nome" required>
      <select aria-label="Projeto de interesse" v-model="form.plano" required>
        <option value="" disabled>Projeto de interesse</option>
        <option v-for="o in options" :key="o">{{ o }}</option>
      </select>
      <textarea aria-label="Conte sobre seu negócio" v-model="form.msg" rows="4" placeholder="Conte rapidamente sobre seu negócio" />
      <button class="btn" type="submit">Enviar pelo WhatsApp</button>
    </form>
    <p class="alt">Ou escreva para <a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a></p>
  </section>
</template>

<script setup lang="ts">
const options = [...plans.map(p => p.name), 'Outro projeto (site, sistema...)', 'Ainda não sei']
const form = reactive({ nome: '', plano: '', msg: '' })

function send() {
  const text = `Olá Thierry! Meu nome é ${form.nome}.\nProjeto de interesse: ${form.plano}.\n${form.msg}`
  trackLead('formulario')
  window.open(waLink(text), '_blank', 'noopener')
}
</script>
