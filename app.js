(function () {
  const folderDesk = document.getElementById('folder-desk');
  const scrim = document.getElementById('scrim');
  const win = document.getElementById('window');
  const winTitle = document.getElementById('window-title');
  const winBody = document.getElementById('window-body');
  const winClose = document.getElementById('win-close');
  const clockEl = document.getElementById('clock');

  const STATUS_LABEL = { live: 'Live', building: 'Building', archived: 'Archived' };
  const LINK_LABEL = { github: 'github', live: 'live', medium: 'medium', medium2: 'medium (2)' };

  // ---- live clock in the menu bar ----
  function tick() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s}`;
  }
  tick();
  setInterval(tick, 1000);

  // ---- desktop folder icons ----
  function countFor(folder) {
    return folder.key === 'writing'
      ? WRITING.length
      : PROJECTS.filter((p) => p.tier === folder.key).length;
  }

  function renderFolders() {
    folderDesk.innerHTML = FOLDERS.map((f) => `
      <button class="folder-icon" data-folder="${f.key}" aria-label="Open ${f.label}">
        <span class="folder-glyph">
          <span class="tab"></span><span class="back"></span><span class="front"></span>
        </span>
        <span class="folder-badge">${countFor(f)}</span>
        <span class="folder-icon-label">${f.label}</span>
      </button>
    `).join('');
  }
  renderFolders();

  // ---- file cards inside a window ----
  function fileCardHTML(p) {
    const links = Object.entries(p.links || {})
      .filter(([, url]) => url)
      .map(([key, url]) => `<a href="${url}" target="_blank" rel="noopener">${LINK_LABEL[key] || key}</a>`)
      .join('');
    const stack = (p.stack || []).map((s) => `<span class="file-tag">${s}</span>`).join('');
    return `
      <article class="file-card tier-${p.tier}">
        <div class="file-card-head">
          <div>
            <div class="file-build">Build ${String(p.build).padStart(2, '0')}</div>
            <h3 class="file-title">${p.title}</h3>
          </div>
          <span class="file-status ${p.status}">${STATUS_LABEL[p.status] || p.status}</span>
        </div>
        <div class="file-card-body">
          <p class="file-blurb">${p.blurb}</p>
          <div class="file-meta">${p.date || ''}</div>
          <div class="file-stack">${stack}</div>
          <div class="file-links">${links}</div>
        </div>
      </article>
    `;
  }

  function writingFileHTML(w) {
    const related = w.related && PROJECTS.find((p) => p.id === w.related);
    const tag = related ? `<span class="write-tag">→ ${related.title}</span>` : '';
    return `
      <article class="file-card write-card">
        <div class="file-card-body">
          <h3 class="write-file-title">${w.title}</h3>
          <p class="file-blurb">${w.blurb}</p>
          ${tag}
          <div class="file-links"><a href="${w.url}" target="_blank" rel="noopener">read on medium</a></div>
        </div>
      </article>
    `;
  }

  function openFolder(key, triggerEl) {
    const folder = FOLDERS.find((f) => f.key === key);
    const items = key === 'writing'
      ? WRITING
      : PROJECTS.filter((p) => p.tier === key).sort((a, b) => b.build - a.build);
    const cards = key === 'writing'
      ? items.map(writingFileHTML).join('')
      : items.map(fileCardHTML).join('');

    winTitle.textContent = `${folder.label} — ${items.length} item${items.length === 1 ? '' : 's'}`;
    winBody.innerHTML = `
      <p class="window-desc">${folder.desc}</p>
      <div class="file-grid">${cards}</div>
    `;

    scrim.classList.add('open');
    win.classList.add('open');
    winBody.scrollTop = 0;

    if (triggerEl) {
      triggerEl.classList.remove('bounce');
      void triggerEl.offsetWidth; // restart animation
      triggerEl.classList.add('bounce');
    }
  }

  function closeWindow() {
    scrim.classList.remove('open');
    win.classList.remove('open');
  }

  folderDesk.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-folder]');
    if (!btn) return;
    openFolder(btn.dataset.folder, btn);
  });

  winClose.addEventListener('click', closeWindow);
  scrim.addEventListener('click', closeWindow);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeWindow();
  });
})();
