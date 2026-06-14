function escapeHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderVideo(video) {
  if (!video) return '';

  if (video.type === 'youtube' && video.id) {
    return `<iframe
      src="https://www.youtube-nocookie.com/embed/${escapeHtml(video.id)}"
      title="Project demo video"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
    ></iframe>`;
  }

  if (video.type === 'vimeo' && video.id) {
    return `<iframe
      src="https://player.vimeo.com/video/${escapeHtml(video.id)}"
      title="Project demo video"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
      loading="lazy"
    ></iframe>`;
  }

  if (video.type === 'local' && video.src) {
    return `<video controls preload="metadata">
      <source src="${escapeHtml(video.src)}" type="video/mp4">
      Your browser does not support the video tag.
    </video>`;
  }

  return renderVideoPlaceholder();
}

function renderVideoPlaceholder() {
  return `<div class="video-placeholder" aria-label="Demo video coming soon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
    <span>Demo video coming soon</span>
    <span style="font-size:12px;color:var(--subtle)">Add a YouTube ID or MP4 in js/projects.js</span>
  </div>`;
}

function getHomeHref() {
  const path = window.location.pathname.replace(/\\/g, '/');
  return path.includes('/projects/') ? '../index.html' : 'index.html';
}

function renderBreadcrumb(title) {
  const home = getHomeHref();
  return `
    <ol class="breadcrumb-list">
      <li><a href="${home}">Home</a></li>
      <li class="breadcrumb-sep" aria-hidden="true">/</li>
      <li><a href="${home}#featured">Featured</a></li>
      <li class="breadcrumb-sep" aria-hidden="true">/</li>
      <li class="breadcrumb-current" aria-current="page">${escapeHtml(title)}</li>
    </ol>`;
}

function initCaseStudy() {
  const slug = document.body.dataset.project;
  if (!slug || !window.getFeaturedBySlug) return;

  const project = window.getFeaturedBySlug(slug);
  if (!project) return;

  document.title = project.title + ' — liburnlumani';

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = project.summary;

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = project.title + ' — liburnlumani';

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = project.summary;

  const breadcrumbEl = document.getElementById('breadcrumb');
  if (breadcrumbEl) breadcrumbEl.innerHTML = renderBreadcrumb(project.title);

  const videoWrap = document.getElementById('video-wrap');
  if (videoWrap && project.video) {
    const videoHtml = renderVideo(project.video);
    videoWrap.innerHTML = videoHtml || renderVideoPlaceholder();
  }

  const slugs = window.getFeaturedSlugs();
  const idx = slugs.indexOf(project.slug);
  const prevSlug = idx > 0 ? slugs[idx - 1] : null;
  const nextSlug = idx < slugs.length - 1 ? slugs[idx + 1] : null;

  const navEl = document.getElementById('project-nav');
  if (navEl) {
    let html = '';
    if (prevSlug) {
      const prev = window.getFeaturedBySlug(prevSlug);
      html += `<a href="${prevSlug}.html" class="nav-prev">
        <span class="nav-label">← Previous</span>
        <span>${escapeHtml(prev.title)}</span>
      </a>`;
    }
    if (nextSlug) {
      const next = window.getFeaturedBySlug(nextSlug);
      html += `<a href="${nextSlug}.html" class="nav-next">
        <span class="nav-label">Next →</span>
        <span>${escapeHtml(next.title)}</span>
      </a>`;
    }
    navEl.innerHTML = html;
  }
}

document.addEventListener('DOMContentLoaded', initCaseStudy);
