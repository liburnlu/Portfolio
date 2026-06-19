function escapeHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Hamburger ── */
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

/* ── Fade-in observer ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ── Featured projects ── */
function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid || !window.FEATURED_PROJECTS) return;

  grid.innerHTML = window.FEATURED_PROJECTS.map(p => `
    <article class="featured-card fade-in">
      <div class="featured-card-role">${escapeHtml(p.role)}</div>
      <h3 class="featured-card-title">${escapeHtml(p.title)}</h3>
      <p class="featured-card-summary">${escapeHtml(p.summary)}</p>
      <div class="featured-card-tech">
        ${p.tech.map(t => `<span class="skill-chip">${escapeHtml(t)}</span>`).join('')}
      </div>
      <div class="featured-card-actions">
        <a href="projects/${escapeHtml(p.slug)}.html" class="btn-primary btn-sm">View case study →</a>
        <a href="${escapeHtml(p.github)}" target="_blank" rel="noopener noreferrer" class="btn-outline btn-sm">GitHub ↗</a>
        ${p.demo ? `<a href="${escapeHtml(p.demo)}" target="_blank" rel="noopener noreferrer" class="btn-outline btn-sm">Live demo ↗</a>` : ''}
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.featured-card').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 80, 240)}ms`;
    observer.observe(el);
  });
}

/* ── GitHub fetch ── */
const HIDDEN_REPOS = new Set(['Portfolio']);

let allRepos = [];

async function loadGitHub() {
  const grid = document.getElementById('repos-grid');
  if (!grid) return;

  try {
    const [userRes, repoRes] = await Promise.all([
      fetch('https://api.github.com/users/liburnlu'),
      fetch('https://api.github.com/users/liburnlu/repos?per_page=100&sort=updated')
    ]);

    if (!userRes.ok) throw new Error('Rate limited');
    const user = await userRes.json();
    const repos = await repoRes.json();

    if (user.name) {
      const nameEl = document.getElementById('display-name');
      if (nameEl) nameEl.textContent = user.name;
      document.title = 'Liburn Lumani — Software Engineering Portfolio';
    }
    if (user.avatar_url) {
      const img = document.getElementById('about-avatar');
      const placeholder = document.getElementById('about-placeholder');
      if (img) {
        img.src = user.avatar_url;
        img.style.display = '';
      }
      if (placeholder) placeholder.style.display = 'none';
    }
    if (user.location) {
      const aboutP2 = document.getElementById('about-p2');
      if (aboutP2) {
        aboutP2.textContent = `Based in ${user.location}. Open to remote work and collaboration.`;
      }
    }

    allRepos = Array.isArray(repos)
      ? repos.filter(r => r && r.name && !HIDDEN_REPOS.has(r.name))
      : [];
    renderRepos(allRepos);

  } catch (err) {
    grid.innerHTML =
      `<div class="repos-error">
        Could not load repositories — GitHub API may be rate-limited.
        <br><a href="https://github.com/liburnlu?tab=repositories"
          style="color:#6ee7b7;text-decoration:none"
          target="_blank" rel="noopener noreferrer">View directly on GitHub ↗</a>
      </div>`;
  }
}

function renderRepos(repos) {
  const grid = document.getElementById('repos-grid');
  if (!grid) return;

  if (!repos.length) {
    grid.innerHTML = '<div class="repos-loading">No repositories match this filter.</div>';
    return;
  }

  grid.innerHTML = repos.map(r => {
    const featured = window.getFeaturedByRepo ? window.getFeaturedByRepo(r.name) : null;
    const cardHref = featured
      ? `projects/${featured.slug}.html`
      : r.html_url;
    const cardTarget = featured ? '' : ' target="_blank" rel="noopener noreferrer"';

    return `
      <a href="${cardHref}"${cardTarget} class="repo-card">
        <div class="repo-card-top">
          <span class="repo-card-name">${escapeHtml(r.name)}</span>
          ${featured ? '<span class="case-study-badge">Case study</span>' : ''}
          ${r.fork ? '<span class="repo-fork-badge">Fork</span>' : ''}
        </div>
        <p class="repo-desc">${r.description ? escapeHtml(r.description) : '<em style="color:var(--subtle)">No description</em>'}</p>
        <div class="repo-footer">
          ${r.stargazers_count ? `
            <span class="repo-stat">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${r.stargazers_count}
            </span>` : ''}
          ${r.forks_count ? `
            <span class="repo-stat">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><line x1="12" y1="12" x2="12" y2="15"/></svg>
              ${r.forks_count}
            </span>` : ''}
        </div>
      </a>`;
  }).join('');

  grid.querySelectorAll('.repo-card').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 30, 300)}ms`;
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('featured-grid')) renderFeatured();
  if (document.getElementById('repos-grid')) loadGitHub();
});
