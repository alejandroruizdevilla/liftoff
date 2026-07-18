(function () {
  const t = (k) => window.I18n.t(k);

  // ============ I18N (apply once on load) ============
  window.I18n.apply();
  if (window.Boot) window.Boot.step(1);

  // ============ STARFIELD ============
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let w, h;

  const DENSITY_FACTOR = { off: 0, low: 0.35, med: 1, high: 1.9 };
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = [];
    const density = document.body.dataset.starDensity || "med";
    const factor = DENSITY_FACTOR[density] !== undefined ? DENSITY_FACTOR[density] : 1;
    canvas.style.display = factor === 0 ? "none" : "";
    const count = Math.min(520, Math.floor((w * h) / 6000 * factor));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 3 + 0.3,
        s: Math.random() * 1.4 + 0.2,
        tw: Math.random() * Math.PI * 2,
        twSp: Math.random() * 0.04 + 0.01
      });
    }
  }
  window.addEventListener("resize", resize);
  document.addEventListener("settings:apply", resize);
  resize();

  let mx = 0, my = 0;
  window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });

  function tick() {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;
    const offX = (mx - cx) * 0.008;
    const offY = (my - cy) * 0.008;
    for (const s of stars) {
      s.tw += s.twSp;
      const flick = (Math.sin(s.tw) + 1) / 2;
      const px = s.x + offX * s.z;
      const py = s.y + offY * s.z;
      ctx.beginPath();
      ctx.arc(px, py, s.s * (0.7 + flick * 0.6), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${200 + flick * 55}, ${210 + flick * 45}, 255, ${0.4 + flick * 0.5})`;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();

  // ============ CURSOR GLOW ============
  const glow = document.getElementById("cursorGlow");
  let glowX = 0, glowY = 0, tgtX = 0, tgtY = 0;
  window.addEventListener("mousemove", (e) => { tgtX = e.clientX; tgtY = e.clientY; });
  function updateGlow() {
    glowX += (tgtX - glowX) * 0.12;
    glowY += (tgtY - glowY) * 0.12;
    glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(updateGlow);
  }
  updateGlow();

  // ============ T+ COUNTER ============
  const start = Date.now();
  setInterval(() => {
    const tt = Math.floor((Date.now() - start) / 1000);
    const hh = String(Math.floor(tt / 3600)).padStart(2, "0");
    const mm = String(Math.floor((tt % 3600) / 60)).padStart(2, "0");
    const ss = String(tt % 60).padStart(2, "0");
    document.getElementById("utc").textContent = `T+ ${hh}:${mm}:${ss}`;
  }, 1000);

  // ============ MUTE ============
  const muteBtn = document.getElementById("muteBtn");
  const muteIcon = document.getElementById("muteIcon");
  function refreshMute() {
    const m = window.LFAudio.isMuted();
    muteBtn.classList.toggle("muted", m);
    muteIcon.textContent = m ? "✕" : "♪";
    muteBtn.title = m ? t("hud.mute.off") : t("hud.mute.on");
  }
  muteBtn.addEventListener("click", () => {
    window.LFAudio.resume();
    window.LFAudio.setMuted(!window.LFAudio.isMuted());
    refreshMute();
    if (!window.LFAudio.isMuted()) window.LFAudio.click();
    document.dispatchEvent(new CustomEvent("audio:change"));
  });
  refreshMute();

  // ============ SETTINGS BUTTON ============
  document.getElementById("settingsBtn").addEventListener("click", () => {
    if (window.LFAudio) window.LFAudio.click();
    window.Settings.open();
  });
  // Mute icon must follow any sound change from the settings panel
  document.addEventListener("settings:apply", refreshMute);
  document.addEventListener("i18n:change", refreshMute);
  document.addEventListener("audio:change", refreshMute);

  // ============ MANIFEST CARDS ============
  function star(n) {
    let html = '<span class="stars">';
    for (let i = 0; i < 5; i++) html += i < n ? "★" : '<span class="empty">★</span>';
    html += "</span>";
    return html;
  }

  const grid = document.getElementById("grid");
  const filters = document.getElementById("filters");
  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");
  let activeFilter = "all";
  let activeSearch = "";

  function matchesSearch(sim, q) {
    if (!q) return true;
    const blob = [
      sim.name, sim.tagline, sim.shortDesc, sim.bestFor,
      ...(sim.tags || []), sim.developer, sim.platforms
    ].join(" ").toLowerCase();
    return q.toLowerCase().split(/\s+/).every(part => blob.includes(part));
  }

  // Keep the manifest state shareable: #/manifest?filter=free&q=orbital
  function syncManifestHash() {
    const params = new URLSearchParams();
    if (activeFilter !== "all") params.set("filter", activeFilter);
    if (activeSearch) params.set("q", activeSearch);
    const qs = params.toString();
    const target = qs ? "#/manifest?" + qs : "#";
    if (location.hash !== target && (qs || /^#\/?manifest/.test(location.hash))) {
      history.replaceState(null, "", target);
    }
  }

  function applyManifestParams(qs) {
    const params = new URLSearchParams(qs || "");
    const f = params.get("filter") || "all";
    activeFilter = document.querySelector(`#filters .chip[data-filter="${CSS.escape(f)}"]`) ? f : "all";
    activeSearch = (params.get("q") || "").trim();
    searchInput.value = activeSearch;
    searchClear.hidden = !activeSearch;
    document.querySelectorAll("#filters .chip").forEach(c =>
      c.classList.toggle("active", c.dataset.filter === activeFilter));
    renderCards({ instant: true });
  }

  function renderCards(opts = {}) {
    const instant = !!opts.instant;
    grid.innerHTML = "";
    const filtered = window.SIMS.map(window.I18n.sim).filter(s =>
      (activeFilter === "all" || s.tags.includes(activeFilter)) &&
      matchesSearch(s, activeSearch)
    );
    if (filtered.length === 0) {
      grid.innerHTML = `<div class="grid-empty">${escapeHtml(t("manifest.empty"))}</div>`;
      return;
    }
    filtered.forEach((s, i) => {
      const num = String(i + 1).padStart(2, "0");
      const el = document.createElement("a");
      el.className = "card" + (instant ? " visible" : "");
      el.href = `#/sim/${s.id}`;
      el.innerHTML = `
        <div class="card-num">T-${num}</div>
        <h3>${escapeHtml(s.name)}</h3>
        <div class="tagline">${escapeHtml(s.tagline)}</div>
        <div class="row">
          ${star(s.stars)}
          <span class="price ${s.paid ? "paid" : ""}">${escapeHtml(s.price)}</span>
        </div>
        <div class="platforms">${escapeHtml(s.platforms)}</div>
        <p class="desc">${escapeHtml(s.shortDesc)}</p>
        <div class="tags">${s.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
        <span class="card-link">${escapeHtml(t("card.open"))}</span>
      `;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
      el.addEventListener("click", () => window.LFAudio.click());
      grid.appendChild(el);
      if (!instant) setTimeout(() => el.classList.add("visible"), 40 * i);
    });
  }

  filters.addEventListener("click", (e) => {
    if (!e.target.matches(".chip")) return;
    document.querySelectorAll("#filters .chip").forEach(c => c.classList.remove("active"));
    e.target.classList.add("active");
    activeFilter = e.target.dataset.filter;
    window.LFAudio.click();
    syncManifestHash();
    renderCards();
  });

  searchInput.addEventListener("input", () => {
    activeSearch = searchInput.value.trim();
    searchClear.hidden = !activeSearch;
    syncManifestHash();
    renderCards();
  });
  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    activeSearch = "";
    searchClear.hidden = true;
    searchInput.focus();
    if (window.LFAudio) window.LFAudio.click();
    syncManifestHash();
    renderCards();
  });
  // Cmd-K / Ctrl-K focuses search
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  renderCards();

  // ============ SIM OF THE DAY ============
  function renderSpotlight() {
    const el = document.getElementById("spotlightCard");
    if (!el) return;
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const s = window.I18n.sim(window.SIMS[dayOfYear % window.SIMS.length]);
    el.innerHTML = `
      <div class="spotlight-label">${escapeHtml(t("spotlight.label"))}</div>
      <div class="spotlight-glyph">${s.glyph || "🚀"}</div>
      <div class="spotlight-body">
        <h3 class="spotlight-name">${escapeHtml(s.name)}</h3>
        <div class="spotlight-tag">${escapeHtml(s.tagline)}</div>
        <p class="spotlight-desc">${escapeHtml(s.shortDesc)}</p>
      </div>
      <a class="btn primary spotlight-cta" href="#/sim/${s.id}">
        <span>${escapeHtml(t("card.open"))}</span><span class="arrow">→</span>
      </a>
    `;
  }
  renderSpotlight();

  // ============ NEWS ============
  const newsGrid = document.getElementById("newsGrid");
  const newsDate = document.getElementById("newsDate");
  const refreshBtn = document.getElementById("refreshNews");
  const sourceFilters = document.getElementById("sourceFilters");
  let allNewsItems = [];
  let activeSource = "all";

  function renderSourceFilters() {
    const counts = new Map();
    for (const item of allNewsItems) {
      const src = item.news_site || "Unknown";
      counts.set(src, (counts.get(src) || 0) + 1);
    }
    const sources = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
    sourceFilters.innerHTML = "";
    const all = document.createElement("button");
    all.className = "source-chip" + (activeSource === "all" ? " active" : "");
    all.dataset.source = "all";
    all.innerHTML = `${escapeHtml(t("news.allSources"))} <span class="count">${allNewsItems.length}</span>`;
    sourceFilters.appendChild(all);
    for (const [src, n] of sources) {
      const c = document.createElement("button");
      c.className = "source-chip" + (activeSource === src ? " active" : "");
      c.dataset.source = src;
      c.innerHTML = `${escapeHtml(src)} <span class="count">${n}</span>`;
      sourceFilters.appendChild(c);
    }
  }

  function applyNewsFilter(opts = {}) {
    const filtered = activeSource === "all"
      ? allNewsItems
      : allNewsItems.filter(i => (i.news_site || "Unknown") === activeSource);
    window.News.render(newsGrid, filtered, opts);
  }

  sourceFilters.addEventListener("click", (e) => {
    const chip = e.target.closest(".source-chip");
    if (!chip) return;
    activeSource = chip.dataset.source;
    window.LFAudio.click();
    sourceFilters.querySelectorAll(".source-chip").forEach(c => c.classList.toggle("active", c === chip));
    applyNewsFilter();
  });

  let lastNewsResult = null;

  function refreshNewsMeta() {
    if (!lastNewsResult) return;
    const d = new Date(lastNewsResult.date + "T00:00:00");
    const tag = lastNewsResult.fromCache ? t("news.cached")
              : lastNewsResult.fallback ? t("news.offline")
              : t("news.live");
    newsDate.textContent = d.toLocaleDateString(window.I18n.get(), {
      year: "numeric", month: "long", day: "numeric"
    }) + " · " + tag;
  }

  async function loadNews(force = false) {
    if (force) {
      newsGrid.innerHTML = `<div class="news-loading"><div class="spinner"></div><span>${escapeHtml(t("news.loading"))}</span></div>`;
    }
    const result = await window.News.load(force);
    lastNewsResult = result;
    allNewsItems = result.items || [];
    if (force) activeSource = "all";
    renderSourceFilters();
    applyNewsFilter();
    refreshNewsMeta();
    if (window.Boot && !force) window.Boot.step(2);
  }

  refreshBtn.addEventListener("click", () => {
    window.LFAudio.click();
    loadNews(true);
  });

  // Boot finishes once BOTH news and launches are done
  let _bootNewsDone = false, _bootLaunchesDone = false;
  function tryFinishBoot() {
    if (_bootNewsDone && _bootLaunchesDone && window.Boot) window.Boot.finish();
  }
  Promise.resolve(loadNews()).finally(() => { _bootNewsDone = true; tryFinishBoot(); });
  Promise.resolve(loadLaunches()).finally(() => { _bootLaunchesDone = true; tryFinishBoot(); });

  // ============ LAUNCHES ============
  const launchesGrid = document.getElementById("launchesGrid");
  const refreshLaunchesBtn = document.getElementById("refreshLaunches");

  async function loadLaunches(force = false) {
    if (force) {
      launchesGrid.innerHTML = `<div class="news-loading"><div class="spinner"></div><span>${escapeHtml(t("launches.loading"))}</span></div>`;
    }
    const result = await window.Launches.load(force);
    window.Launches.render(launchesGrid, result.items);
    if (window.Boot && !force) window.Boot.step(3);
  }

  refreshLaunchesBtn.addEventListener("click", () => {
    window.LFAudio.click();
    loadLaunches(true);
  });

  // Recent results strip (non-critical: hidden entirely if the feed fails)
  (async () => {
    try {
      const items = await window.Launches.loadRecent();
      if (items && items.length) {
        document.getElementById("recentWrap").hidden = false;
        window.Launches.renderRecent(document.getElementById("recentStrip"), items);
      }
    } catch (_) {}
  })();

  // ============ LAUNCH BUTTON ============
  document.getElementById("launchBtn").addEventListener("click", () => {
    window.LFAudio.resume();
    window.LFAudio.click();
    window.Launch.start();
  });

  // ============ ROUTER ============
  const homeView = document.getElementById("home");
  const detailView = document.getElementById("detail");
  const compareView = document.getElementById("compare");

  const BASE_TITLE = "LIFTOFF // Rocket Sim Index";
  const BASE_DESC = document.querySelector('meta[name="description"]').getAttribute("content");

  function setMeta(title, description) {
    document.title = title;
    const setAttr = (sel, attr, val) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };
    setAttr('meta[name="description"]', "content", description);
    setAttr('meta[property="og:title"]', "content", title);
    setAttr('meta[property="og:description"]', "content", description);
    setAttr('meta[name="twitter:title"]', "content", title);
    setAttr('meta[name="twitter:description"]', "content", description);
  }

  function renderDetail(sim) {
    sim = window.I18n.sim(sim);
    const r = sim.ratings;
    const ratingItems = [
      { key: "realism", val: r.realism },
      { key: "depth", val: r.depth },
      { key: "accessibility", val: r.accessibility },
      { key: "learningCurve", val: r.learningCurve },
      { key: "community", val: r.community }
    ];

    const related = (sim.related || [])
      .map(id => window.SIM_BY_ID[id])
      .filter(Boolean)
      .map(window.I18n.sim);

    detailView.innerHTML = `
      <div class="detail-topbar">
        <button class="detail-back" id="backBtn">${escapeHtml(t("detail.back"))}</button>
        <div class="detail-tools">
          <button class="detail-share-btn" id="shareBtn">
            <span>${escapeHtml(t("detail.share"))}</span><span>↗</span>
          </button>
          <span class="detail-share-msg" id="shareMsg" hidden>${escapeHtml(t("detail.shared"))}</span>
        </div>
      </div>

      <div class="detail-hero">
        <div>
          <div class="detail-id">// ${sim.id.toUpperCase().replace(/-/g, " · ")}</div>
          <h1 class="detail-name">${escapeHtml(sim.name)}</h1>
          <div class="detail-tagline">${escapeHtml(sim.tagline)}</div>
          <div class="detail-quickrow">
            <div><span class="label">${escapeHtml(t("detail.lbl.developer"))}</span><span class="value">${escapeHtml(sim.developer)}</span></div>
            <div><span class="label">${escapeHtml(t("detail.lbl.released"))}</span><span class="value">${sim.releaseYear}</span></div>
            <div><span class="label">${escapeHtml(t("detail.lbl.price"))}</span><span class="value">${escapeHtml(sim.priceDetail)}</span></div>
            <div><span class="label">${escapeHtml(t("detail.lbl.platforms"))}</span><span class="value">${escapeHtml(sim.platforms)}</span></div>
            <div><span class="label">${escapeHtml(t("detail.lbl.requires"))}</span><span class="value">${escapeHtml(sim.systemReq)}</span></div>
            <div><span class="label">${escapeHtml(t("detail.lbl.rating"))}</span><span class="value">${star(sim.stars)}</span></div>
          </div>
          <a class="detail-cta" href="${sim.link}" target="_blank" rel="noopener">
            <span>${escapeHtml(t("detail.cta"))}</span>
            <span>↗</span>
          </a>
        </div>
        <div class="detail-art">
          <span class="label-tl">FILE · ${sim.id.slice(0, 6).toUpperCase()}</span>
          <span class="label-br">CLASSIFIED · OPEN</span>
          <div class="glyph">${sim.glyph}</div>
        </div>
      </div>

      <section class="detail-section detail-long">
        <div class="detail-section-title">${escapeHtml(t("detail.section.brief"))}</div>
        ${sim.longDesc.map(p => `<p>${escapeHtml(p)}</p>`).join("")}
      </section>

      <section class="detail-section">
        <div class="detail-section-title">${escapeHtml(t("detail.section.bestFor"))}</div>
        <p style="font-size: 1.15rem; color: var(--ink); margin: 0;">${escapeHtml(sim.bestFor)}</p>
      </section>

      <section class="detail-section">
        <div class="detail-section-title">${escapeHtml(t("detail.section.profile"))}</div>
        <div class="rating-grid">
          ${ratingItems.map(it => `
            <div class="rating-item">
              <div class="rating-label">
                <span>${escapeHtml(t("detail.rating." + it.key))}</span>
                <span class="rating-value">${it.val}/5</span>
              </div>
              <div class="rating-bar"><div class="rating-fill" style="width:${it.val * 20}%"></div></div>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="detail-section">
        <div class="detail-section-title">${escapeHtml(t("detail.section.prosCons"))}</div>
        <div class="pros-cons">
          <div class="pc-block pros">
            <h4>${escapeHtml(t("detail.pros"))}</h4>
            <ul>${sim.pros.map(p => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
          </div>
          <div class="pc-block cons">
            <h4>${escapeHtml(t("detail.cons"))}</h4>
            <ul>${sim.cons.map(c => `<li>${escapeHtml(c)}</li>`).join("")}</ul>
          </div>
        </div>
      </section>

      <section class="detail-section">
        <div class="detail-section-title">${escapeHtml(t("detail.section.facts"))}</div>
        <ul class="facts-list">
          ${sim.quickFacts.map(f => `<li>${escapeHtml(f)}</li>`).join("")}
        </ul>
      </section>

      ${related.length ? `
        <section class="detail-section">
          <div class="detail-section-title">${escapeHtml(t("detail.section.related"))}</div>
          <div class="related-grid">
            ${related.map(r => `
              <a class="related-card" href="#/sim/${r.id}">
                <div class="related-name">${escapeHtml(r.name)}</div>
                <div class="related-tag">${escapeHtml(r.tagline)}</div>
              </a>
            `).join("")}
          </div>
        </section>
      ` : ""}
    `;

    setMeta(`${sim.name} // LIFTOFF`, `${sim.tagline}. ${sim.shortDesc}`);

    detailView.querySelector("#backBtn").addEventListener("click", () => {
      window.LFAudio.click();
      history.pushState(null, "", "#");
      route();
    });

    detailView.querySelector("#shareBtn").addEventListener("click", async () => {
      window.LFAudio.click();
      const url = location.href;
      const title = `${sim.name} // LIFTOFF`;
      const msg = detailView.querySelector("#shareMsg");
      try {
        if (navigator.share) {
          await navigator.share({ title, url, text: sim.tagline });
        } else {
          await navigator.clipboard.writeText(url);
        }
        msg.hidden = false;
        setTimeout(() => { msg.hidden = true; }, 1800);
      } catch (_) {}
    });

    detailView.querySelectorAll(".related-card").forEach(c => {
      c.addEventListener("click", () => window.LFAudio.click());
    });

    requestAnimationFrame(() => {
      detailView.querySelectorAll(".rating-fill").forEach(f => {
        const w = f.style.width;
        f.style.width = "0%";
        requestAnimationFrame(() => { f.style.width = w; });
      });
    });
  }

  function showHome() {
    homeView.style.display = "";
    detailView.classList.remove("active");
    detailView.innerHTML = "";
    compareView.classList.remove("active");
    compareView.innerHTML = "";
    setMeta(BASE_TITLE, BASE_DESC);
  }

  function route() {
    const hash = location.hash;
    const stripped = hash.replace(/^#\/?/, "");

    // Quiz route
    if (stripped === "quiz" || stripped === "quiz/") {
      if (!window.Quiz.isOpen()) window.Quiz.open();
      return;
    } else if (window.Quiz && window.Quiz.isOpen()) {
      window.Quiz.close();
    }

    // Sim detail route
    const simMatch = stripped.match(/^sim\/(.+)$/);
    if (simMatch && window.SIM_BY_ID[simMatch[1]]) {
      const sim = window.SIM_BY_ID[simMatch[1]];
      homeView.style.display = "none";
      compareView.classList.remove("active");
      compareView.innerHTML = "";
      detailView.classList.add("active");
      renderDetail(sim);
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // Manifest route with shareable filter/search state
    const manifestMatch = stripped.match(/^manifest(?:\?(.*))?$/);
    if (manifestMatch) {
      showHome();
      applyManifestParams(manifestMatch[1]);
      const target = document.getElementById("index");
      if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }

    // Compare route
    if (/^compare(\/.*)?$/.test(stripped)) {
      homeView.style.display = "none";
      detailView.classList.remove("active");
      detailView.innerHTML = "";
      window.Compare.render();
      setMeta("Compare Sims // LIFTOFF", "Side-by-side comparison of rocket simulators.");
      return;
    }

    // Default: home + optional in-page anchor
    const wasOther = detailView.classList.contains("active") || compareView.classList.contains("active");
    showHome();
    if (wasOther && stripped && !stripped.startsWith("sim/") && !stripped.startsWith("compare") && stripped !== "quiz") {
      const target = document.getElementById(stripped);
      if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }

  window.addEventListener("hashchange", route);
  route();

  // ============ I18N RE-RENDERS (instant — no fade-in stagger) ============
  document.addEventListener("i18n:change", () => {
    renderCards({ instant: true });
    renderSpotlight();
    renderSourceFilters();
    applyNewsFilter({ instant: true });
    refreshNewsMeta();
    refreshMute();
    // If on a detail page, re-render so labels translate
    const m = location.hash.match(/^#\/?sim\/(.+)$/);
    if (m && window.SIM_BY_ID[m[1]]) renderDetail(window.SIM_BY_ID[m[1]]);
  });

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
