(function () {
  const grid = document.getElementById('manifest-grid');
  const filterBar = document.getElementById('filters');
  const searchInput = document.getElementById('search-input');

  const STATUS_LABEL = {
    live: 'Live',
    building: 'Building',
    archived: 'Archived'
  };

  const LINK_LABEL = {
    github: 'github',
    live: 'live',
    medium: 'medium',
    linkedin: 'linkedin'
  };

  // Sort newest build first
  const projects = [...PROJECTS].sort((a, b) => b.build - a.build);

  let state = { status: 'all', query: '' };

  function archHTML(arch) {
    if (!arch || !arch.length) return '';
    const rows = arch.filter(r => !r.side);
    const side = arch.find(r => r.side);
    const mainCol = rows.map((r, i) => `
      <div class="arch-node">${r.label}</div>
      ${i < rows.length - 1 ? '<div class="arch-arrow">↓</div>' : ''}
    `).join('');
    const sideCol = side ? `
      <div class="arch-side">
        ${side.side.map(s => `<div class="arch-side-item">${s}</div>`).join('')}
      </div>` : '';
    return `
      <div class="arch-diagram">
        <div class="arch-label">Architecture</div>
        <div class="arch-inner">
          <div class="arch-main">${mainCol}</div>
          ${sideCol}
        </div>
      </div>
    `;
  }

  function cardHTML(p, index) {
    const links = Object.entries(p.links || {})
      .filter(([, url]) => url)
      .map(([key, url]) => `<a href="${url}" target="_blank" rel="noopener">${LINK_LABEL[key] || key}</a>`)
      .join('');

    const stack = (p.stack || [])
      .map((s) => `<span class="stack-tag">${s}</span>`)
      .join('');

    const spotlightStyle = p.spotlight
      ? ` style="--spotlight:${p.spotlight};animation-delay:${Math.min(index * 40, 300)}ms"`
      : ` style="animation-delay:${Math.min(index * 40, 300)}ms"`;
    const spotlightClass = p.spotlight ? ' card--spotlight' : '';
    const spotlightDot = p.spotlight ? '<span class="spotlight-dot"></span>' : '';
    const featuredBadge = p.featured ? '<span class="featured-badge">Featured</span>' : '';

    return `
      <article class="card${spotlightClass}" data-status="${p.status}"${spotlightStyle}>
        <div class="card-head">
          <div>
            <div class="card-build">${spotlightDot}BUILD #${String(p.build).padStart(2, '0')} ${featuredBadge}</div>
            <h3 class="card-title">${p.title}</h3>
          </div>
          <span class="status-pill status-${p.status}">${STATUS_LABEL[p.status] || p.status}</span>
        </div>
        <div class="card-body">
          <p class="card-blurb">${p.blurb}</p>
          <div class="card-meta">${p.date || ''}</div>
          <div class="stack-row">${stack}</div>
          ${archHTML(p.arch)}
          <div class="card-links">${links}</div>
        </div>
      </article>
    `;
  }

  function matchesQuery(p, query) {
    if (!query) return true;
    const haystack = [p.title, p.blurb, ...(p.stack || [])]
      .join(' ')
      .toLowerCase();
    return haystack.includes(query.toLowerCase());
  }

  function render() {
    const filtered = projects
      .filter((p) => state.status === 'all' || p.status === state.status)
      .filter((p) => matchesQuery(p, state.query));

    if (!filtered.length) {
      grid.innerHTML = '<p class="no-results">No projects match that search yet.</p>';
      return;
    }
    grid.innerHTML = filtered.map(cardHTML).join('');
  }

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    filterBar.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    state.status = btn.dataset.filter;
    render();
  });

  searchInput.addEventListener('input', (e) => {
    state.query = e.target.value.trim();
    render();
  });

  render();
})();
