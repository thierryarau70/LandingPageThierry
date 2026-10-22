import { langOf, messages, switchPath } from '../utils/i18n'

// Idioma vem do caminho: /en/... é inglês, o resto é português
export const useLocale = () => {
  const route = useRoute()
  const lang = computed(() => langOf(route.path))
  const t = computed(() => messages[lang.value])
  const otherPath = computed(() => switchPath(route.path, lang.value === 'pt' ? 'en' : 'pt'))
  return { lang, t, otherPath }
}
