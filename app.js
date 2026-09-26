(function () {
  const root = document.getElementById('manifest-root');

  const STATUS_LABEL = { live: 'Live', building: 'Building', archived: 'Archived' };
  const LINK_LABEL = { github: 'github', live: 'live', medium: 'medium' };

  function cardHTML(p, index) {
    const links = Object.entries(p.links || {})
      .filter(([, url]) => url)
      .map(([key, url]) => `<a href="${url}" target="_blank" rel="noopener">${LINK_LABEL[key] || key}</a>`)
      .join('');
    const stack = (p.stack || []).map((s) => `<span class="stack-tag">${s}</span>`).join('');
    return `
      <article class="card tier-${p.tier}" data-status="${p.status}" style="animation-delay:${Math.min(index * 30, 240)}ms">
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

  function sectionHTML(tier, index) {
    const items = [...PROJECTS]
      .filter((p) => p.tier === tier.key)
      .sort((a, b) => b.build - a.build);
    if (!items.length) return '';
    return `
      <section class="tier-section tier-section-${tier.key}" id="tier-${tier.key}">
        <div class="tier-head">
          <div class="tier-head-top">
            <h2 class="tier-label">${tier.label}</h2>
            <span class="tier-count">${items.length}</span>
          </div>
          <p class="tier-desc">${tier.desc}</p>
        </div>
        <div class="manifest-grid">
          ${items.map((p, i) => cardHTML(p, i)).join('')}
        </div>
      </section>
    `;
  }

  function render() {
    root.innerHTML = TIERS.map((t, i) => sectionHTML(t, i)).join('');
  }

  render();
})();
