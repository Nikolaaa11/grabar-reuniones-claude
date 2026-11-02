// Botones de copiar
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const el = document.getElementById(btn.dataset.copy);
    const text = el.textContent.trim();
    let ok = true;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      ok = document.execCommand('copy');
    }
    const label = btn.dataset.label || btn.textContent;
    btn.dataset.label = label;
    btn.textContent = ok ? 'Copiado' : 'Selecciona y copia';
    setTimeout(() => { btn.textContent = label; }, 1800);
  });
});

// Aparición discreta al bajar
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}
