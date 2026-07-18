window.Compare = (function () {
  const t = (k) => (window.I18n ? window.I18n.t(k) : k);

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function star(n) {
    let html = '<span class="stars">';
    for (let i = 0; i < 5; i++) html += i < n ? "★" : '<span class="empty">★</span>';
    html += "</span>";
    return html;
  }

  function pickDefaults() {
    // Use first two different sims as default
    return [window.SIMS[0].id, window.SIMS[1].id];
  }

  function parseRoute(hash) {
    // #/compare or #/compare/a/b
    const m = hash.match(/^#\/?compare(?:\/([^\/]+)(?:\/([^\/]+))?)?$/);
    if (!m) return null;
    return { a: m[1], b: m[2] };
  }

  function ensureIds(parsed) {
    const def = pickDefaults();
    let a = parsed && parsed.a && window.SIM_BY_ID[parsed.a] ? parsed.a : def[0];
    let b = parsed && parsed.b && window.SIM_BY_ID[parsed.b] ? parsed.b : def[1];
    if (a === b) b = window.SIMS.find(s => s.id !== a)?.id || def[1];
    return [a, b];
  }

  function setRoute(a, b) {
    history.replaceState(null, "", `#/compare/${a}/${b}`);
  }

  function panel(sim, side) {
    sim = window.I18n.sim(sim);
    const r = sim.ratings;
    const facts = sim.quickFacts.slice(0, 4);
    return `
      <div class="cmp-panel cmp-${side}">
        <div class="cmp-head">
          <div class="cmp-glyph">${sim.glyph || "🚀"}</div>
          <div class="cmp-headinfo">
            <select class="cmp-select" data-side="${side}">
              ${window.SIMS.map(s => `<option value="${s.id}"${s.id === sim.id ? " selected" : ""}>${escapeHtml(s.name)}</option>`).join("")}
            </select>
            <div class="cmp-tag">${escapeHtml(sim.tagline)}</div>
          </div>
        </div>

        <div class="cmp-stat-grid">
          <div><span class="lbl">${t("detail.lbl.developer")}</span><span>${escapeHtml(sim.developer)}</span></div>
          <div><span class="lbl">${t("detail.lbl.released")}</span><span>${sim.releaseYear}</span></div>
          <div><span class="lbl">${t("detail.lbl.price")}</span><span>${escapeHtml(sim.priceDetail)}</span></div>
          <div><span class="lbl">${t("detail.lbl.platforms")}</span><span>${escapeHtml(sim.platforms)}</span></div>
          <div><span class="lbl">${t("detail.lbl.rating")}</span><span>${star(sim.stars)}</span></div>
        </div>

        <div class="cmp-section">
          <div class="cmp-section-title">${t("detail.section.profile")}</div>
          ${["realism","depth","accessibility","learningCurve","community"].map(k => `
            <div class="cmp-rating">
              <div class="cmp-rating-row">
                <span>${t("detail.rating." + k)}</span>
                <span class="cmp-rating-val">${r[k]}/5</span>
              </div>
              <div class="cmp-rating-bar"><div class="cmp-rating-fill" data-val="${r[k]}" style="width:${r[k]*20}%"></div></div>
            </div>
          `).join("")}
        </div>

        <div class="cmp-section">
          <div class="cmp-section-title">${t("detail.pros")}</div>
          <ul class="cmp-list pros">${sim.pros.slice(0,4).map(p => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
        </div>

        <div class="cmp-section">
          <div class="cmp-section-title">${t("detail.cons")}</div>
          <ul class="cmp-list cons">${sim.cons.slice(0,3).map(p => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
        </div>

        <div class="cmp-section">
          <div class="cmp-section-title">${t("detail.section.facts")}</div>
          <ul class="cmp-list facts">${facts.map(f => `<li>${escapeHtml(f)}</li>`).join("")}</ul>
        </div>

        <a class="btn primary cmp-cta" href="#/sim/${sim.id}">
          <span>${t("card.open")}</span><span class="arrow">→</span>
        </a>
      </div>
    `;
  }

  function highlight(view, simA, simB) {
    // Highlight winner of each rating
    const fillsA = view.querySelectorAll(".cmp-a .cmp-rating-fill");
    const fillsB = view.querySelectorAll(".cmp-b .cmp-rating-fill");
    fillsA.forEach((fa, i) => {
      const va = +fa.dataset.val;
      const fb = fillsB[i];
      const vb = fb ? +fb.dataset.val : 0;
      fa.classList.remove("win", "lose", "tie");
      if (fb) fb.classList.remove("win", "lose", "tie");
      if (va > vb) { fa.classList.add("win"); if (fb) fb.classList.add("lose"); }
      else if (va < vb) { fa.classList.add("lose"); if (fb) fb.classList.add("win"); }
      else { fa.classList.add("tie"); if (fb) fb.classList.add("tie"); }
    });
  }

  function render() {
    const view = document.getElementById("compare");
    const parsed = parseRoute(location.hash);
    if (!parsed) {
      view.classList.remove("active");
      view.innerHTML = "";
      return false;
    }
    const [aId, bId] = ensureIds(parsed);
    setRoute(aId, bId);
    const simA = window.SIM_BY_ID[aId];
    const simB = window.SIM_BY_ID[bId];

    view.innerHTML = `
      <button class="detail-back" data-back>${t("detail.back")}</button>

      <div class="cmp-hero">
        <div class="cmp-eyebrow">${t("compare.title")}</div>
        <h1 class="detail-name">${escapeHtml(simA.name)} <span class="cmp-vs">vs</span> ${escapeHtml(simB.name)}</h1>
        <p class="cmp-sub">${t("compare.sub")}</p>
        <div class="cmp-actions">
          <button class="btn" data-swap><span>${t("compare.swap")}</span><span class="arrow">⇄</span></button>
          <button class="btn" data-share><span>${t("compare.share")}</span><span class="arrow">↗</span></button>
          <span class="cmp-share-msg" data-share-msg hidden>${t("detail.shared")}</span>
        </div>
      </div>

      <div class="cmp-grid">
        ${panel(simA, "a")}
        <div class="cmp-divider"><span>VS</span></div>
        ${panel(simB, "b")}
      </div>
    `;
    view.classList.add("active");
    highlight(view, simA, simB);
    wire(view);
    window.scrollTo({ top: 0, behavior: "instant" });
    return true;
  }

  function wire(view) {
    view.querySelector("[data-back]").addEventListener("click", () => {
      if (window.LFAudio) window.LFAudio.click();
      history.pushState(null, "", "#");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    view.querySelector("[data-swap]").addEventListener("click", () => {
      if (window.LFAudio) window.LFAudio.click();
      const parsed = parseRoute(location.hash);
      const [a, b] = ensureIds(parsed);
      history.replaceState(null, "", `#/compare/${b}/${a}`);
      render();
    });
    view.querySelector("[data-share]").addEventListener("click", async () => {
      if (window.LFAudio) window.LFAudio.click();
      const url = location.href;
      const msg = view.querySelector("[data-share-msg]");
      try {
        if (navigator.share) {
          await navigator.share({ title: document.title, url });
        } else {
          await navigator.clipboard.writeText(url);
          msg.hidden = false;
          setTimeout(() => { msg.hidden = true; }, 1800);
        }
      } catch (_) {}
    });
    view.querySelectorAll(".cmp-select").forEach(sel => {
      sel.addEventListener("change", () => {
        if (window.LFAudio) window.LFAudio.click();
        const parsed = parseRoute(location.hash);
        let [a, b] = ensureIds(parsed);
        if (sel.dataset.side === "a") a = sel.value;
        else b = sel.value;
        if (a === b) {
          // Avoid identical pair: bump the other side to a different sim
          const other = window.SIMS.find(s => s.id !== a);
          if (sel.dataset.side === "a") b = other.id;
          else a = other.id;
        }
        history.replaceState(null, "", `#/compare/${a}/${b}`);
        render();
      });
    });
  }

  document.addEventListener("i18n:change", () => {
    if (parseRoute(location.hash)) render();
  });

  return { render, isOpen: () => !!parseRoute(location.hash) };
})();
