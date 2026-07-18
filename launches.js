window.Launches = (function () {
  const API = "https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=8&mode=detailed";
  const CACHE_KEY = "liftoff_launches_v2";
  const TTL_MS = 60 * 60 * 1000; // 1 hour

  // Curated emoji glyph for well-known providers (used when no logo is supplied).
  const PROVIDER_GLYPHS = {
    "SpaceX": "🛰️",
    "Rocket Lab": "⚡",
    "Blue Origin": "🪶",
    "Arianespace": "🇪🇺",
    "European Space Agency": "🇪🇺",
    "NASA": "🌎",
    "Roscosmos": "☭",
    "CASC": "🇨🇳",
    "China Aerospace Science and Technology Corporation": "🇨🇳",
    "ULA": "🦅",
    "United Launch Alliance": "🦅",
    "JAXA": "🇯🇵",
    "ISRO": "🇮🇳",
    "Northrop Grumman": "✦",
    "Firefly Aerospace": "🪰",
    "Relativity Space": "△",
    "Sierra Space": "▲",
    "Galactic Energy": "✧",
    "iSpace": "✦",
    "ExPace": "✧",
    "LandSpace": "△",
    "Astra": "✦"
  };

  function providerGlyph(name) {
    if (!name) return "🚀";
    if (PROVIDER_GLYPHS[name]) return PROVIDER_GLYPHS[name];
    // Try partial match for long agency names
    for (const k of Object.keys(PROVIDER_GLYPHS)) {
      if (name.includes(k) || k.includes(name)) return PROVIDER_GLYPHS[k];
    }
    return "🚀";
  }

  function statusClass(name = "") {
    const n = name.toLowerCase();
    if (n.includes("go")) return "go";
    if (n.includes("hold")) return "hold";
    if (n.includes("tbd") || n.includes("tbc")) return "tbd";
    if (n.includes("success")) return "go";
    if (n.includes("failure") || n.includes("partial")) return "fail";
    if (n.includes("in flight")) return "live";
    return "tbd";
  }

  function pad2(n) { return String(n).padStart(2, "0"); }

  function tt(k) { return window.I18n ? window.I18n.t(k) : k; }

  function fmtCountdown(ms) {
    if (ms === null || ms === undefined || Number.isNaN(ms)) return tt("launches.tbd");
    if (ms <= 0) {
      const elapsed = -ms;
      if (elapsed < 6 * 3600 * 1000) return "T+ " + fmtClock(elapsed) + " · IN FLIGHT";
      return "LAUNCHED";
    }
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    if (d > 0) return `T-${d}d ${pad2(h)}:${pad2(m)}:${pad2(s)}`;
    return `T-${pad2(h)}:${pad2(m)}:${pad2(s)}`;
  }
  function fmtClock(ms) {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
  }

  function fmtNet(iso) {
    if (!iso) return "TBD";
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
      timeZoneName: "short"
    });
  }

  // Fallback content (dates computed at render time so they sit in the near future).
  const FALLBACK = [
    { rocket: "Starship", mission: "Flight 12 · Suborbital Test", provider: "SpaceX", status: "TBD", offsetDays: 6 },
    { rocket: "Falcon 9 Block 5", mission: "Starlink Group 17-29", provider: "SpaceX", status: "Go for Launch", offsetDays: 1 },
    { rocket: "Electron", mission: "BlackSky Global 26", provider: "Rocket Lab", status: "Go for Launch", offsetDays: 2 },
    { rocket: "Ariane 6", mission: "EUMETSAT MTG-S1", provider: "Arianespace", status: "Go for Launch", offsetDays: 4 },
    { rocket: "New Glenn", mission: "ESCAPADE Mars", provider: "Blue Origin", status: "TBD", offsetDays: 11 },
    { rocket: "Long March 5B", mission: "Tianzhou-9", provider: "CASC", status: "TBD", offsetDays: 8 },
    { rocket: "H3-22S", mission: "GOSAT-GW", provider: "JAXA", status: "Go for Launch", offsetDays: 3 },
    { rocket: "Soyuz 2.1b", mission: "Glonass-K2", provider: "Roscosmos", status: "TBD", offsetDays: 9 }
  ];

  function fillFallback() {
    const now = Date.now();
    return FALLBACK.map(f => ({
      id: f.mission.replace(/\s+/g, "-").toLowerCase(),
      rocket: { configuration: { full_name: f.rocket } },
      mission: { name: f.mission },
      launch_service_provider: { name: f.provider },
      status: { name: f.status },
      net: new Date(now + f.offsetDays * 86400000).toISOString(),
      image: null,
      mission_patches: [],
      pad: { name: "TBD" }
    }));
  }

  async function fetchFresh() {
    const res = await fetch(API, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("LL2 " + res.status);
    const data = await res.json();
    return data.results || [];
  }

  async function load(force = false) {
    if (!force) {
      try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
        if (cached && cached.ts && (Date.now() - cached.ts) < TTL_MS) {
          return { items: cached.items, fromCache: true };
        }
      } catch (_) {}
    }
    try {
      const items = await fetchFresh();
      localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), items }));
      return { items, fromCache: false };
    } catch (e) {
      console.warn("Launches fetch failed, using fallback:", e);
      return { items: fillFallback(), fromCache: false, fallback: true };
    }
  }

  function findPatch(it) {
    const arr = it.mission_patches || it.program?.[0]?.mission_patches || [];
    if (Array.isArray(arr) && arr.length) return arr[0].image_url || arr[0].thumbnail_url || null;
    return null;
  }

  function findAgencyLogo(it) {
    const lsp = it.launch_service_provider || {};
    return lsp.logo?.image_url || lsp.logo?.thumbnail_url || lsp.image?.image_url || lsp.image_url || null;
  }

  let tickHandle = null;

  function render(grid, items, opts = {}) {
    const instant = !!opts.instant;
    if (tickHandle) { clearInterval(tickHandle); tickHandle = null; }
    grid.innerHTML = "";
    if (!items || items.length === 0) {
      grid.innerHTML = `<div class="news-error">${tt("launches.none")}</div>`;
      return;
    }
    items.forEach((it, i) => {
      void instant; // referenced below in visibility branch
      const rocket = it.rocket?.configuration?.full_name || it.name || "Unknown vehicle";
      const mission = it.mission?.name || "Mission TBD";
      const provider = it.launch_service_provider?.name || "Unknown";
      const providerAbbrev = it.launch_service_provider?.abbrev || "";
      const statusName = it.status?.name || "TBD";
      const sc = statusClass(statusName);
      const img = it.image?.image_url;
      const pad = it.pad?.name || it.pad?.location?.name || "";
      const orbit = it.mission?.orbit?.name || "";
      const net = it.net;
      const patch = findPatch(it);
      const agencyLogo = findAgencyLogo(it);
      const glyph = providerGlyph(provider);

      const card = document.createElement("div");
      card.className = "launch-card" + (instant ? " visible" : "");
      card.dataset.net = net || "";
      card.innerHTML = `
        <div class="launch-img">
          ${img ? `<img src="${img}" alt="" loading="lazy" onerror="this.style.display='none'">` : ""}
          <div class="launch-status status-${sc}">${escapeHtml(statusName)}</div>
          ${patch ? `<div class="launch-patch"><img src="${patch}" alt="patch" loading="lazy" onerror="this.parentElement.style.display='none'"></div>` : ""}
        </div>
        <div class="launch-body">
          <div class="launch-provider-row">
            ${agencyLogo
              ? `<span class="launch-agency-logo"><img src="${agencyLogo}" alt="" loading="lazy" onerror="this.parentElement.outerHTML='<span class=\\'launch-agency-glyph\\'>${glyph}</span>'"></span>`
              : `<span class="launch-agency-glyph">${glyph}</span>`}
            <span class="launch-provider">${escapeHtml(providerAbbrev || provider)}</span>
          </div>
          <h3 class="launch-rocket">${escapeHtml(rocket)}</h3>
          <div class="launch-mission">${escapeHtml(mission)}</div>
          <div class="launch-countdown" data-countdown>${fmtCountdown(net ? new Date(net).getTime() - Date.now() : null)}</div>
          <div class="launch-meta">
            <div><span class="lbl">${tt("launches.netLbl")}</span><span>${escapeHtml(fmtNet(net))}</span></div>
            ${pad ? `<div><span class="lbl">${tt("launches.padLbl")}</span><span>${escapeHtml(pad)}</span></div>` : ""}
            ${orbit ? `<div><span class="lbl">${tt("launches.orbitLbl")}</span><span>${escapeHtml(orbit)}</span></div>` : ""}
          </div>
        </div>
      `;
      grid.appendChild(card);
      if (instant) card.classList.add("visible");
      else setTimeout(() => card.classList.add("visible"), 60 * i);
    });

    tickHandle = setInterval(() => {
      const now = Date.now();
      grid.querySelectorAll(".launch-card").forEach(c => {
        const net = c.dataset.net;
        const cd = c.querySelector("[data-countdown]");
        if (!cd) return;
        cd.textContent = fmtCountdown(net ? new Date(net).getTime() - now : null);
      });
    }, 1000);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ---------- Recent results strip ----------
  const RECENT_API = "https://ll.thespacedevs.com/2.3.0/launches/previous/?limit=6";
  const RECENT_KEY = "liftoff_recent_v1";
  const RECENT_TTL = 6 * 60 * 60 * 1000;

  async function loadRecent() {
    try {
      const cached = JSON.parse(localStorage.getItem(RECENT_KEY) || "null");
      if (cached && cached.ts && Date.now() - cached.ts < RECENT_TTL) return cached.items;
    } catch (_) {}
    const res = await fetch(RECENT_API, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("LL2 " + res.status);
    const items = (await res.json()).results || [];
    localStorage.setItem(RECENT_KEY, JSON.stringify({ ts: Date.now(), items }));
    return items;
  }

  function resultInfo(statusName = "") {
    const n = statusName.toLowerCase();
    if (n.includes("partial")) return { cls: "hold", key: "launches.recent.partial" };
    if (n.includes("failure")) return { cls: "fail", key: "launches.recent.failure" };
    if (n.includes("success")) return { cls: "go", key: "launches.recent.success" };
    return { cls: "tbd", key: null };
  }

  function timeAgo(iso) {
    if (!iso) return "";
    const ms = Date.now() - new Date(iso).getTime();
    const d = Math.floor(ms / 86400000);
    if (d >= 1) return tt("time.day").replace("{n}", d);
    const h = Math.floor(ms / 3600000);
    if (h >= 1) return tt("time.hour").replace("{n}", h);
    const m = Math.max(1, Math.floor(ms / 60000));
    return tt("time.min").replace("{n}", m);
  }

  function renderRecent(el, items) {
    window._lastRecent = items;
    el.innerHTML = items.map(it => {
      const ri = resultInfo(it.status?.name);
      const label = ri.key ? tt(ri.key) : escapeHtml(it.status?.abbrev || "—");
      const [rocket, mission] = String(it.name || "").split(" | ");
      const provider = it.launch_service_provider?.abbrev || it.launch_service_provider?.name || "";
      return `
        <div class="recent-row">
          <span class="launch-status status-${ri.cls}">${label}</span>
          <span class="recent-rocket">${escapeHtml(rocket || "")}</span>
          <span class="recent-mission">${escapeHtml(mission || "")}</span>
          <span class="recent-meta">${escapeHtml(provider)} · ${timeAgo(it.net)}</span>
        </div>`;
    }).join("");
  }

  // Re-render labels on language change if currently displayed (instant, no stagger)
  document.addEventListener("i18n:change", () => {
    const grid = document.getElementById("launchesGrid");
    if (grid && window._lastLaunches) render(grid, window._lastLaunches, { instant: true });
    const strip = document.getElementById("recentStrip");
    if (strip && window._lastRecent) renderRecent(strip, window._lastRecent);
  });

  // Wrap render to remember last items for re-render on i18n change
  const _render = render;
  render = function (grid, items, opts) {
    window._lastLaunches = items;
    _render(grid, items, opts);
  };

  return { load, render, loadRecent, renderRecent };
})();
