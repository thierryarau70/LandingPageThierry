<script setup lang="ts">
import { brandModular } from '~/data/brand.generated'
import { site, waLink, waMessages } from '~/data/site'

withDefaults(defineProps<{ index?: string }>(), { index: '08' })

const contacts = [
  { label: 'WhatsApp', value: site.contact.whatsappLabel, href: waLink(waMessages.start) },
  { label: 'E-mail', value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: 'Instagram', value: site.social[0].handle, href: site.social[0].url },
  { label: 'Base', value: `${site.location.city} — ${site.location.state} / atendimento em todo o Brasil` }
]
</script>

<template>
  <section id="contato" class="theme-carbon contact relative overflow-clip pt-(--section-y) pb-(--section-y)" aria-labelledby="contato-title">
    <svg class="contact-art" viewBox="0 0 100 100" aria-hidden="true" data-reveal="clip"><path :d="brandModular.dark" fill="var(--color-graphite)" /><path :d="brandModular.signal" fill="var(--color-signal)" /></svg>
    <div class="wrap relative">
      <SectionIndex :index="index" label="Contato" meta="Resposta direta do desenvolvedor" />
      <MonumentTitle id="contato-title" class="contact-title mt-8 md:mt-12" :lines="['Vamos', 'construir', 'algo real']" />

      <div class="grid-12 mt-12 gap-y-12 md:mt-20">
        <div class="col-span-4 md:col-span-5 lg:col-span-4">
          <p class="text-lead text-pretty" data-reveal>Tem uma ideia, um problema operacional ou precisa fortalecer a presença digital da sua empresa? Vamos conversar sobre a solução ideal.</p>
          <div class="mt-8 grid gap-3" data-reveal>
            <BrutalistButton href="#briefing" size="lg" block arrow="down">Iniciar um projeto</BrutalistButton>
            <BrutalistButton :href="waLink(waMessages.talk)" size="lg" variant="outline" block arrow="up-right">Entrar em contato pelo WhatsApp</BrutalistButton>
          </div>
          <TitleBlock class="mt-10" :rows="contacts" data-reveal />
        </div>
        <div id="briefing" class="col-span-4 md:col-span-7 lg:col-span-7 lg:col-start-6" data-reveal>
          <BriefingForm />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact { --mega: clamp(2.75rem, 13.4vw, 15.5rem); }
.contact-title { font-size: var(--mega); line-height: 0.88; }
.contact-art { position: absolute; right: var(--gutter); top: calc(var(--section-y) + 5.6rem); width: calc(var(--mega) * 0.8); height: auto; }
@media (width >= 48rem) { .contact-art { top: calc(var(--section-y) + 6.75rem); } }
@media (width < 40rem) { .contact-art { top: calc(var(--section-y) + 5.1rem); } }
</style>
