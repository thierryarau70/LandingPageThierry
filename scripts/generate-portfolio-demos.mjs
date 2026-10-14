import { writeFileSync } from 'node:fs'

const text = (x, y, value, size = 16, color = '#334155', weight = 400) => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${value}</text>`
const rect = (x, y, w, h, fill = '#fff', r = 12) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`
const pill = (x, y, label) => rect(x, y, 155, 28, '#ccfbf1', 14) + text(x + 12, y + 19, label, 12, '#0f766e', 600)
function frame(title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="616" viewBox="0 0 1200 616"><rect width="1200" height="616" fill="#f1f5f9"/><g font-family="Arial, sans-serif">${rect(0, 0, 1200, 66, '#fff', 0)}${rect(26, 17, 32, 32, '#0f766e', 9)}${text(33, 41, '◎', 25, '#fff')}${text(70, 41, 'Radar de Clientes', 22, '#0f172a', 700)}${text(740, 39, 'Busca     Oportunidades     Funil', 16)}${pill(1010, 20, 'CONTA DEMO')}${text(32, 111, title, 26, '#0f172a', 700)}${body}${rect(0, 578, 1200, 38, '#0f766e', 0)}${text(32, 602, 'DEMONSTRAÇÃO FICTÍCIA · Empresas, pontuações e valores ilustrativos · Layout conceitual para o portfólio', 14, '#fff')}</g></svg>`
}
const businesses = ['Estúdio Aurora · exemplo', 'Oficina Horizonte · exemplo', 'Café Jardim · exemplo']
let search = rect(32, 135, 1136, 66) + text(50, 160, 'Cidade', 12) + text(50, 186, 'Boa Vista, RR', 17, '#0f172a', 600) + text(310, 160, 'Segmento', 12) + text(310, 186, 'Serviços locais', 17, '#0f172a', 600) + rect(920, 148, 228, 40, '#0f766e') + text(950, 174, 'Buscar oportunidades', 17, '#fff', 600)
businesses.forEach((name, i) => { const y = 219 + i * 111; search += rect(32, y, 420, 99) + text(50, y + 29, name, 18, '#0f172a', 600) + text(50, y + 54, 'Boa Vista · Sem site informado na fonte', 14) + pill(50, y + 64, `Prioridade ${[86, 74, 68][i]}/100`) })
search += rect(470, 219, 698, 321, '#e2eee9')
for (let i = 0; i < 8; i++) search += `<path d="M ${480 + i * 100} 220 L ${540 + i * 100} 540" stroke="#fff" stroke-width="16"/>`
for (let i = 0; i < 4; i++) search += `<path d="M 470 ${250 + i * 82} L 1168 ${225 + i * 82}" stroke="#fff" stroke-width="12"/>`
search += `<path d="M1030 219 Q900 350 1080 540" fill="none" stroke="#9dd9ea" stroke-width="54"/>`
;[[650, 300], [840, 395], [960, 270]].forEach(([x, y], i) => { search += `<circle cx="${x}" cy="${y}" r="19" fill="#0f766e" stroke="#fff" stroke-width="4"/>` + text(x - 5, y + 6, `${i + 1}`, 16, '#fff', 700) })
search += rect(490, 490, 255, 32) + text(505, 512, 'Mapa ilustrativo · 3 oportunidades', 13)
writeFileSync('public/portfolio/radar-busca.svg', frame('Encontre sua próxima oportunidade', search))
let analysis = rect(32, 135, 700, 408) + text(56, 173, businesses[0], 24, '#0f172a', 700) + text(56, 205, 'Serviços locais · Boa Vista, RR', 17) + pill(56, 225, 'DADOS FICTÍCIOS') + text(56, 287, 'Presença digital', 19, '#0f172a', 700) + text(56, 319, 'Site: não informado na fonte consultada', 17) + text(56, 350, 'Verificação manual: pendente', 17) + text(56, 381, 'Próximo passo: verificar os canais oficiais do negócio', 17) + rect(56, 413, 650, 58, '#f0fdfa') + text(72, 438, 'Um site ausente na fonte não confirma que a empresa não tenha site.', 15) + text(72, 459, 'Confira antes de iniciar uma conversa.', 15) + rect(56, 489, 240, 36, '#0f766e') + text(75, 513, 'Adicionar ao funil', 16, '#fff', 600)
analysis += rect(750, 135, 418, 408) + text(774, 175, 'Prioridade da oportunidade', 20, '#0f172a', 700) + text(774, 240, '86 / 100', 48, '#0f766e', 700) + text(774, 277, 'Composição ilustrativa do score', 15)
;[['Site não informado', 40], ['Perfil com informações', 26], ['Adequação ao segmento', 20]].forEach(([label, score], i) => { const y = 315 + i * 67; analysis += text(774, y, label, 16) + text(1100, y, `${score}`, 16, '#0f766e', 700) + rect(774, y + 12, 365, 9, '#e2e8f0', 4) + rect(774, y + 12, score * 8, 9, '#14b8a6', 4) })
writeFileSync('public/portfolio/radar-analise.svg', frame('Entenda antes de abordar', analysis))
let funnel = text(32, 143, 'Organize contatos, próximos passos e propostas em um só lugar.', 17)
;['Novas oportunidades', 'Contato iniciado', 'Proposta enviada', 'Fechado'].forEach((label, i) => { const x = 32 + i * 287; funnel += rect(x, 169, 267, 375, '#e2e8f0') + text(x + 16, 201, label, 18, '#0f172a', 700) + rect(x + 12, 221, 243, 165) + text(x + 25, 251, [...businesses, 'Ateliê Solar · exemplo'][i], 15, '#0f172a', 600) + text(x + 25, 281, ['Verificar presença digital', 'Retomar conversa', 'Aguardar retorno', 'Iniciar briefing'][i], 14) + text(x + 25, 313, ['Sem contato registrado', 'Contato fictício registrado', 'Proposta: R$ 900,00', 'Valor: R$ 900,00'][i], 14) + pill(x + 25, 338, ['Verificação pendente', 'Próximo passo salvo', 'Em negociação', 'Exemplo concluído'][i]) })
writeFileSync('public/portfolio/radar-funil.svg', frame('Cada oportunidade no seu momento', funnel))
