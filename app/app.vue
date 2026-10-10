<template>
  <div>
    <div class="bg-orb orb1" /><div class="bg-orb orb2" />
    <SiteHeader />
    <main id="topo">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <PlansSection />
      <StepsSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </main>
    <footer><p>© {{ new Date().getFullYear() }} Thierry Araújo. Todos os direitos reservados.</p></footer>
    <a class="fab" :href="waLink('Olá Thierry! Vim pelo site.')" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
  </div>
</template>
