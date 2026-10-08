const WA = "5595991432677";
const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
document.querySelectorAll("[data-wa]").forEach(el => {
  el.href = wa(el.dataset.wa);
  el.target = "_blank";
  el.rel = "noopener";
});
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const t = `Olá Thierry! Meu nome é ${f.get("nome")}.\nPlano de interesse: ${f.get("plano")}.\n${f.get("msg") || ""}`;
  window.open(wa(t), "_blank", "noopener");
});
document.getElementById("ano").textContent = new Date().getFullYear();
