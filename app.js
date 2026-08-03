(function () {
  const grid = document.getElementById('manifest-grid');
  const filterBar = document.getElementById('filters');

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

  function cardHTML(p, index) {
    const links = Object.entries(p.links || {})
      .filter(([, url]) => url)
      .map(([key, url]) => `<a href="${url}" target="_blank" rel="noopener">${LINK_LABEL[key] || key}</a>`)
      .join('');

    const stack = (p.stack || [])
      .map((s) => `<span class="stack-tag">${s}</span>`)
      .join('');

    return `
      <article class="card" data-status="${p.status}" style="animation-delay:${Math.min(index * 40, 300)}ms">
        <div class="card-head">
          <div>
            <div class="card-build">BUILD #${String(p.build).padStart(2, '0')}</div>
            <h3 class="card-title">${p.title}</h3>
          </div>
          <span class="status-pill status-${p.status}">${STATUS_LABEL[p.status] || p.status}</span>
        </div>
        <div class="card-body">
          <p class="card-blurb">${p.blurb}</p>
          <div class="card-meta">${p.date || ''}</div>
          <div class="stack-row">${stack}</div>
          <div class="card-links">${links}</div>
        </div>
      </article>
    `;
  }

  function render(filter) {
    const filtered = filter === 'all' ? projects : projects.filter((p) => p.status === filter);
    if (!filtered.length) {
      grid.innerHTML = '<p class="no-results">No projects match this filter yet.</p>';
      return;
    }
    grid.innerHTML = filtered.map(cardHTML).join('');
  }

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    filterBar.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.filter);
  });

  render('all');
})();
