window.Stats = (function () {
  const tt = (k, v) => (window.I18n ? window.I18n.t(k, v) : k);

  // Curated snapshot (early 2026) of worldwide orbital launch attempts,
  // compiled from public launch logs. Figures are approximate — the exact
  // count varies slightly depending on how failures on the pad are tallied.
  const YEARLY = [
    { year: 2016, attempts: 85,  successes: 82 },
    { year: 2017, attempts: 91,  successes: 85 },
    { year: 2018, attempts: 114, successes: 111 },
    { year: 2019, attempts: 102, successes: 97 },
    { year: 2020, attempts: 114, successes: 104 },
    { year: 2021, attempts: 146, successes: 135 },
    { year: 2022, attempts: 186, successes: 179 },
    { year: 2023, attempts: 223, successes: 211 },
    { year: 2024, attempts: 261, successes: 253 },
    { year: 2025, attempts: 324, successes: 313 }
  ];

  const COUNTRIES = [
    { key: "usa",    attempts: 205 },
    { key: "china",  attempts: 92 },
    { key: "russia", attempts: 14 },
    { key: "india",  attempts: 8 },
    { key: "japan",  attempts: 7 },
    { key: "europe", attempts: 7 },
    { key: "iran",   attempts: 4 },
    { key: "other",  attempts: 4 }
  ];

  // Chart fills validated for the dark surface (contrast + CVD); the brighter
  // brand accents are reserved for the hover state.
  const BAR_CYAN = "#219bbd", BAR_CYAN_HOVER = "#5ae0ff";
  const BAR_ORANGE = "#d1560f", BAR_ORANGE_HOVER = "#ff6a1f";

  const latest = YEARLY[YEARLY.length - 1];
  const first = YEARLY[0];
  const countryTotal = COUNTRIES.reduce((a, c) => a + c.attempts, 0);

  // Live totals from Launch Library 2. `limit=1` queries cost one request each
  // but return the full filtered `count`, so three requests cover everything.
  // The public rate limit is tight (15/hr) — cache aggressively.
  const LIVE_KEY = "liftoff_stats_live_v1";
  const LIVE_TTL = 24 * 60 * 60 * 1000;
  let live = null; // { y2025: {attempts, successes}, ytd: {year, attempts} }

  async function countOf(params) {
    const res = await fetch("https://ll.thespacedevs.com/2.3.0/launches/?limit=1&" + params, {
      headers: { Accept: "application/json" }
    });
    if (!res.ok) throw new Error("LL2 " + res.status);
    return (await res.json()).count;
  }

  async function loadLive() {
    try {
      const cached = JSON.parse(localStorage.getItem(LIVE_KEY) || "null");
      if (cached && cached.ts && Date.now() - cached.ts < LIVE_TTL) return cached.data;
    } catch (_) {}
    const year = new Date().getFullYear();
    const [a25, s25, ytd] = await Promise.all([
      countOf("net__gte=2025-01-01T00:00:00Z&net__lt=2026-01-01T00:00:00Z"),
      countOf("net__gte=2025-01-01T00:00:00Z&net__lt=2026-01-01T00:00:00Z&status=3"),
      countOf(`net__gte=${year}-01-01T00:00:00Z&net__lte=` + new Date().toISOString().slice(0, 19) + "Z")
    ]);
    const data = { y2025: { attempts: a25, successes: s25 }, ytd: { year, attempts: ytd } };
    localStorage.setItem(LIVE_KEY, JSON.stringify({ ts: Date.now(), data }));
    return data;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fmtPct(n) { return n.toFixed(1).replace(/\.0$/, "") + "%"; }

  // ---------- tooltip ----------
  let tip = null;
  function ensureTip() {
    if (tip) return tip;
    tip = document.createElement("div");
    tip.className = "stats-tip";
    tip.hidden = true;
    document.body.appendChild(tip);
    return tip;
  }
  function showTip(html, x, y) {
    const el = ensureTip();
    el.innerHTML = html;
    el.hidden = false;
    const pad = 14;
    const r = el.getBoundingClientRect();
    let left = x + pad, top = y - r.height - pad;
    if (left + r.width > window.innerWidth - 8) left = x - r.width - pad;
    if (top < 8) top = y + pad;
    el.style.left = left + "px";
    el.style.top = top + "px";
  }
  function hideTip() { if (tip) tip.hidden = true; }

  // ---------- stat tiles ----------
  function renderTiles(el) {
    const y25 = live ? live.y2025 : latest;
    const rate = (y25.successes / y25.attempts) * 100;
    const growth = y25.attempts / first.attempts;
    const approx = live ? "" : "~";
    const src = live ? tt("stats.live") : tt("stats.tile.attempts.detail");
    const tiles = [
      { label: tt("stats.tile.attempts"), value: approx + y25.attempts, detail: src },
      { label: tt("stats.tile.rate"), value: fmtPct(rate), detail: y25.successes + " / " + y25.attempts },
      { label: tt("stats.tile.growth"), value: "×" + growth.toFixed(1), detail: first.attempts + " → " + y25.attempts + " · " + first.year + "–" + latest.year },
      { label: tt("stats.tile.vehicle"), value: "Falcon 9", detail: tt("stats.tile.vehicle.detail") }
    ];
    if (live && live.ytd.attempts > 0) {
      tiles.splice(1, 0, { label: tt("stats.tile.ytd", { y: live.ytd.year }), value: String(live.ytd.attempts), detail: tt("stats.live") });
    }
    el.innerHTML = tiles.map(x => `
      <div class="stat-tile">
        <div class="stat-tile-label">${escapeHtml(x.label)}</div>
        <div class="stat-tile-value">${escapeHtml(x.value)}</div>
        <div class="stat-tile-detail">${escapeHtml(x.detail)}</div>
      </div>
    `).join("");
  }

  // rounded-top bar path
  function topRoundRect(x, y, w, h, r) {
    r = Math.min(r, w / 2, h);
    return `M${x},${y + h} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h} Z`;
  }

  // Chart series: the curated decade, plus a live in-progress bar for the
  // current year once the API has answered.
  function chartYears() {
    if (live && live.ytd.attempts > 0 && live.ytd.year > latest.year) {
      return YEARLY.concat([{ year: live.ytd.year, attempts: live.ytd.attempts, successes: null, partial: true }]);
    }
    return YEARLY;
  }

  // ---------- yearly bar chart ----------
  function renderYearChart(host) {
    const data = chartYears();
    const W = 640, H = 300, padL = 46, padR = 12, padT = 26, padB = 30;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const maxV = Math.max(350, Math.ceil(Math.max(...data.map(d => d.attempts)) / 100) * 100);
    const n = data.length;
    const slot = plotW / n;
    const barW = Math.min(34, slot * 0.62);
    const y = v => padT + plotH * (1 - v / maxV);

    let s = `<svg viewBox="0 0 ${W} ${H}" class="stats-svg" role="img" aria-label="${escapeHtml(tt("stats.chart.year.title"))}">`;
    // gridlines + y ticks
    for (let v = 0; v <= maxV - 50; v += 100) {
      const yy = y(v);
      s += `<line x1="${padL}" y1="${yy}" x2="${W - padR}" y2="${yy}" class="stats-grid${v === 0 ? " zero" : ""}"/>`;
      s += `<text x="${padL - 8}" y="${yy + 4}" class="stats-tick" text-anchor="end">${v}</text>`;
    }
    data.forEach((d, i) => {
      const cx = padL + slot * i + slot / 2;
      const bx = cx - barW / 2;
      const by = y(d.attempts);
      s += `<path d="${topRoundRect(bx, by, barW, padT + plotH - by, 4)}" fill="${BAR_CYAN}" ${d.partial ? 'opacity="0.5"' : ""} class="stats-bar" data-i="${i}"/>`;
      // x labels: every other year to stay uncluttered
      if (i % 2 === 1 || i === n - 1) {
        s += `<text x="${cx}" y="${H - 10}" class="stats-tick" text-anchor="middle">’${String(d.year).slice(2)}</text>`;
      }
      // selective direct labels: first and latest bar only
      if (i === 0 || i === n - 1) {
        s += `<text x="${cx}" y="${by - 8}" class="stats-vallabel" text-anchor="middle">${d.attempts}</text>`;
      }
      // oversized invisible hit target (the <title> doubles as the AT/native tooltip)
      s += `<rect x="${padL + slot * i}" y="${padT}" width="${slot}" height="${plotH}" fill="transparent" class="stats-hit" data-i="${i}"><title>${d.year}: ${d.attempts} ${escapeHtml(tt("stats.attempts").toLowerCase())}${d.partial ? " (" + escapeHtml(tt("stats.ytd")) + ")" : ""}</title></rect>`;
    });
    s += `</svg>`;
    host.innerHTML = s;

    const svg = host.querySelector("svg");
    svg.querySelectorAll(".stats-hit").forEach(hit => {
      const i = +hit.dataset.i, d = data[i];
      const bar = svg.querySelector(`.stats-bar[data-i="${i}"]`);
      const move = e => {
        bar.setAttribute("fill", BAR_CYAN_HOVER);
        showTip(
          `<div class="tip-title">${d.year}${d.partial ? " · " + escapeHtml(tt("stats.ytd")) : ""}</div>` +
          `<div><span class="tip-dot" style="background:${BAR_CYAN_HOVER}"></span>${escapeHtml(tt("stats.attempts"))} · <b>${d.attempts}</b></div>` +
          (d.partial ? "" : `<div>${escapeHtml(tt("stats.successes"))} · <b>${d.successes}</b> (${fmtPct(d.successes / d.attempts * 100)})</div>`),
          e.clientX, e.clientY
        );
      };
      hit.addEventListener("mousemove", move);
      hit.addEventListener("mouseleave", () => { bar.setAttribute("fill", BAR_CYAN); hideTip(); });
    });
  }

  // ---------- country horizontal bar chart ----------
  function renderCountryChart(host) {
    const W = 640, rowH = 30, padT = 8, padB = 8, padL = 118, padR = 56;
    const H = padT + padB + rowH * COUNTRIES.length;
    const plotW = W - padL - padR;
    const maxV = COUNTRIES[0].attempts;

    let s = `<svg viewBox="0 0 ${W} ${H}" class="stats-svg" role="img" aria-label="${escapeHtml(tt("stats.chart.country.title"))}">`;
    COUNTRIES.forEach((d, i) => {
      const cy = padT + rowH * i + rowH / 2;
      const bw = Math.max(3, plotW * d.attempts / maxV);
      const bh = 14;
      s += `<text x="${padL - 10}" y="${cy + 4}" class="stats-catlabel" text-anchor="end">${escapeHtml(tt("country." + d.key))}</text>`;
      s += `<path d="M${padL},${cy - bh / 2} L${padL + bw - 4},${cy - bh / 2} Q${padL + bw},${cy - bh / 2} ${padL + bw},${cy - bh / 2 + 4} L${padL + bw},${cy + bh / 2 - 4} Q${padL + bw},${cy + bh / 2} ${padL + bw - 4},${cy + bh / 2} L${padL},${cy + bh / 2} Z" fill="${BAR_ORANGE}" class="stats-bar" data-i="${i}"/>`;
      s += `<text x="${padL + bw + 8}" y="${cy + 4}" class="stats-vallabel side" text-anchor="start">${d.attempts}</text>`;
      s += `<rect x="0" y="${padT + rowH * i}" width="${W}" height="${rowH}" fill="transparent" class="stats-hit" data-i="${i}"><title>${escapeHtml(tt("country." + d.key))}: ${d.attempts}</title></rect>`;
    });
    s += `</svg>`;
    host.innerHTML = s;

    const svg = host.querySelector("svg");
    svg.querySelectorAll(".stats-hit").forEach(hit => {
      const i = +hit.dataset.i, d = COUNTRIES[i];
      const bar = svg.querySelector(`.stats-bar[data-i="${i}"]`);
      const move = e => {
        bar.setAttribute("fill", BAR_ORANGE_HOVER);
        showTip(
          `<div class="tip-title">${escapeHtml(tt("country." + d.key))}</div>` +
          `<div><span class="tip-dot" style="background:${BAR_ORANGE_HOVER}"></span>${escapeHtml(tt("stats.attempts"))} · <b>${d.attempts}</b></div>` +
          `<div>${escapeHtml(tt("stats.share"))} · <b>${fmtPct(d.attempts / countryTotal * 100)}</b></div>`,
          e.clientX, e.clientY
        );
      };
      hit.addEventListener("mousemove", move);
      hit.addEventListener("mouseleave", () => { bar.setAttribute("fill", BAR_ORANGE); hideTip(); });
    });
  }

  // ---------- accessible data tables ----------
  function renderTables(el) {
    el.innerHTML = `
      <div class="stats-table-wrap">
        <table class="stats-table mono">
          <caption>${escapeHtml(tt("stats.chart.year.title"))}</caption>
          <thead><tr><th>${escapeHtml(tt("stats.table.year"))}</th><th>${escapeHtml(tt("stats.attempts"))}</th><th>${escapeHtml(tt("stats.successes"))}</th></tr></thead>
          <tbody>${chartYears().map(d => `<tr><td>${d.year}${d.partial ? " *" : ""}</td><td>${d.attempts}</td><td>${d.partial ? "—" : d.successes}</td></tr>`).join("")}${live && live.ytd.attempts > 0 ? `<tr><td colspan="3" class="stats-table-note">* ${escapeHtml(tt("stats.ytd"))}</td></tr>` : ""}</tbody>
        </table>
        <table class="stats-table mono">
          <caption>${escapeHtml(tt("stats.chart.country.title"))}</caption>
          <thead><tr><th>${escapeHtml(tt("stats.table.country"))}</th><th>${escapeHtml(tt("stats.attempts"))}</th><th>${escapeHtml(tt("stats.share"))}</th></tr></thead>
          <tbody>${COUNTRIES.map(d => `<tr><td>${escapeHtml(tt("country." + d.key))}</td><td>${d.attempts}</td><td>${fmtPct(d.attempts / countryTotal * 100)}</td></tr>`).join("")}</tbody>
        </table>
      </div>
    `;
  }

  let tablesOpen = false;

  function render() {
    const tiles = document.getElementById("statsTiles");
    const charts = document.getElementById("statsCharts");
    const tables = document.getElementById("statsTables");
    const btnLabel = document.getElementById("statsTableBtnLabel");
    if (!tiles || !charts) return;

    renderTiles(tiles);
    charts.innerHTML = `
      <div class="stats-chart-card">
        <div class="stats-chart-title">${escapeHtml(tt("stats.chart.year.title"))}</div>
        <div class="stats-chart-sub">${escapeHtml(tt("stats.chart.year.sub").replace("2016–2025", "2016–" + chartYears()[chartYears().length - 1].year))}</div>
        <div class="stats-chart-plot" data-plot="year"></div>
      </div>
      <div class="stats-chart-card">
        <div class="stats-chart-title">${escapeHtml(tt("stats.chart.country.title"))}</div>
        <div class="stats-chart-sub">${escapeHtml(tt("stats.chart.country.sub"))}</div>
        <div class="stats-chart-plot" data-plot="country"></div>
      </div>
    `;
    renderYearChart(charts.querySelector('[data-plot="year"]'));
    renderCountryChart(charts.querySelector('[data-plot="country"]'));
    renderTables(tables);
    tables.hidden = !tablesOpen;
    if (btnLabel) btnLabel.textContent = tt(tablesOpen ? "stats.table.hide" : "stats.table.show");
  }

  function init() {
    const btn = document.getElementById("statsTableBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        tablesOpen = !tablesOpen;
        if (window.LFAudio) window.LFAudio.click();
        const tables = document.getElementById("statsTables");
        tables.hidden = !tablesOpen;
        document.getElementById("statsTableBtnLabel").textContent = tt(tablesOpen ? "stats.table.hide" : "stats.table.show");
      });
    }
    render();
    document.addEventListener("i18n:change", render);

    loadLive().then(data => {
      if (!data || !data.y2025 || !data.y2025.attempts) return;
      live = data;
      // Fold the live 2025 count into the yearly chart too
      const y = YEARLY[YEARLY.length - 1];
      if (y.year === 2025) { y.attempts = data.y2025.attempts; y.successes = data.y2025.successes; }
      render();
    }).catch(() => { /* static snapshot remains */ });
  }

  init();

  return { render };
})();
