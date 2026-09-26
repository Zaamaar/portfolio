(function () {
  const tabsEl = document.getElementById('folder-tabs');
  const panelEl = document.getElementById('folder-panel');

  const STATUS_LABEL = { live: 'Live', building: 'Building', archived: 'Archived' };
  const LINK_LABEL = { github: 'github', live: 'live', medium: 'medium', medium2: 'medium (2)' };

  const FOLDER_ICON = `<svg viewBox="0 0 24 24" class="folder-icon" aria-hidden="true"><path d="M3 6.5C3 5.67 3.67 5 4.5 5h5.17c.4 0 .78.16 1.06.44L12.5 7H19.5C20.33 7 21 7.67 21 8.5V17.5C21 18.33 20.33 19 19.5 19H4.5C3.67 19 3 18.33 3 17.5V6.5Z"/></svg>`;

  function countFor(folder) {
    return folder.key === 'writing'
      ? WRITING.length
      : PROJECTS.filter((p) => p.tier === folder.key).length;
  }

  function renderTabs(activeKey) {
    tabsEl.innerHTML = FOLDERS.map((f) => `
      <button class="folder-tab folder-tab-${f.key} ${f.key === activeKey ? 'active' : ''}" data-folder="${f.key}">
        ${FOLDER_ICON}
        <span class="folder-tab-label">${f.label}</span>
        <span class="folder-tab-count">${countFor(f)}</span>
      </button>
    `).join('');
  }

  function projectCardHTML(p, index) {
    const links = Object.entries(p.links || {})
      .filter(([, url]) => url)
      .map(([key, url]) => `<a href="${url}" target="_blank" rel="noopener">${LINK_LABEL[key] || key}</a>`)
      .join('');
    const stack = (p.stack || []).map((s) => `<span class="stack-tag">${s}</span>`).join('');
    return `
      <article class="card tier-${p.tier}" style="animation-delay:${Math.min(index * 30, 240)}ms">
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

  function writingCardHTML(w, index) {
    const related = w.related && PROJECTS.find((p) => p.id === w.related);
    const tag = related ? `<span class="write-tag">→ ${related.title}</span>` : '';
    return `
      <article class="card write-card" style="animation-delay:${Math.min(index * 30, 240)}ms">
        <div class="card-body">
          <h3 class="write-title">${w.title}</h3>
          <p class="card-blurb">${w.blurb}</p>
          ${tag}
          <div class="card-links"><a href="${w.url}" target="_blank" rel="noopener">read on medium</a></div>
        </div>
      </article>
    `;
  }

  function renderPanel(key) {
    const folder = FOLDERS.find((f) => f.key === key);
    if (key === 'writing') {
      const items = WRITING;
      panelEl.innerHTML = `
        <div class="tier-head">
          <div class="tier-head-top">
            <h2 class="tier-label folder-color-${key}">${folder.label}</h2>
            <span class="tier-count">${items.length}</span>
          </div>
          <p class="tier-desc">${folder.desc}</p>
        </div>
        <div class="manifest-grid writing-grid">
          ${items.map((w, i) => writingCardHTML(w, i)).join('')}
        </div>
      `;
      return;
    }
    const items = PROJECTS.filter((p) => p.tier === key).sort((a, b) => b.build - a.build);
    panelEl.innerHTML = `
      <div class="tier-head">
        <div class="tier-head-top">
          <h2 class="tier-label folder-color-${key}">${folder.label}</h2>
          <span class="tier-count">${items.length}</span>
        </div>
        <p class="tier-desc">${folder.desc}</p>
      </div>
      <div class="manifest-grid">
        ${items.map((p, i) => projectCardHTML(p, i)).join('')}
      </div>
    `;
  }

  function open(key) {
    renderTabs(key);
    renderPanel(key);
    panelEl.scrollIntoView({ block: 'nearest' });
  }

  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-folder]');
    if (!btn) return;
    open(btn.dataset.folder);
  });

  open('live');
})();
