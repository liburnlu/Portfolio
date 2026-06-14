/**
 * Minimal nav helpers for case-study pages (avoids loading main.js + GitHub fetch).
 */
function toggleMenu(btn) {
  const m = document.getElementById('mobile-menu');
  const open = m.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
}
function closeMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
