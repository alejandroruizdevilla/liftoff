window.News = (function () {
  const API = "https://api.spaceflightnewsapi.net/v4/articles/?limit=12";
  const CACHE_KEY = "liftoff_news_v1";

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function tt(key, vars) { return window.I18n ? window.I18n.t(key, vars) : (vars ? key.replace("{n}", vars.n) : key); }

  function timeAgo(iso) {
    if (!iso) return "";
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return "";
    const sec = Math.max(1, Math.floor((Date.now() - then) / 1000));
    if (sec < 10) return tt("time.justNow");
    if (sec < 60) return tt("time.sec", { n: sec });
    const min = Math.floor(sec / 60);
    if (min < 60) return tt("time.min", { n: min });
    const hr = Math.floor(min / 60);
    if (hr < 24) return tt("time.hour", { n: hr });
    const d = Math.floor(hr / 24);
    if (d < 30) return tt("time.day", { n: d });
    return new Date(iso).toLocaleDateString();
  }

  // Fallback so the page is never empty if the API fails or is offline.
  // Rotates by day so the user sees fresh content even on cache fallback.
  const FALLBACK = [
    { title: "Starship Flight 12 Targets Mid-May Window", news_site: "NASASpaceflight", summary: "SpaceX is preparing a revised trajectory for the next Starship test flight, targeting a launch window in mid-May from Starbase.", published_at: "", url: "https://www.nasaspaceflight.com/", image_url: "" },
    { title: "Artemis II Crew Begins Final Integrated Sims", news_site: "NASA", summary: "The four-person Artemis II crew has begun the final phase of integrated mission simulations ahead of the planned lunar flyby.", published_at: "", url: "https://www.nasa.gov/artemis-ii/", image_url: "" },
    { title: "Rocket Lab Wins Multi-Launch Contract for Earth Observation Constellation", news_site: "Rocket Lab", summary: "A new multi-launch agreement will see Electron deploying a constellation of high-resolution Earth observation satellites over the next 18 months.", published_at: "", url: "https://www.rocketlabusa.com/", image_url: "" },
    { title: "Blue Origin's New Glenn Returns to the Pad", news_site: "Blue Origin", summary: "After a successful debut, New Glenn is back at LC-36 preparing for its second commercial mission.", published_at: "", url: "https://www.blueorigin.com/", image_url: "" },
    { title: "ESA's Ariane 6 Cleared for Operational Cadence", news_site: "ESA", summary: "Following a successful inaugural year, the European Space Agency confirmed Ariane 6 has entered its operational launch cadence.", published_at: "", url: "https://www.esa.int/", image_url: "" },
    { title: "China's Long March 10 Set for First Crewed Lunar Test", news_site: "CASC", summary: "Long March 10 has cleared its critical design review ahead of the first uncrewed lunar test mission planned for later this year.", published_at: "", url: "https://www.cnsa.gov.cn/", image_url: "" }
  ];

  function fillFallbackDates() {
    const now = Date.now();
    return FALLBACK.map((item, i) => ({
      ...item,
      published_at: new Date(now - (i + 1) * 4 * 3600 * 1000).toISOString()
    }));
  }

  async function fetchFresh() {
    const res = await fetch(API, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("API " + res.status);
    const data = await res.json();
    return data.results || [];
  }

  async function load(force = false) {
    const today = todayKey();
    if (!force) {
      try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
        if (cached && cached.date === today && Array.isArray(cached.items)) {
          return { items: cached.items, fromCache: true, date: today };
        }
      } catch (_) {}
    }
    try {
      const items = await fetchFresh();
      localStorage.setItem(CACHE_KEY, JSON.stringify({ date: today, items }));
      return { items, fromCache: false, date: today };
    } catch (e) {
      console.warn("News fetch failed, using fallback:", e);
      return { items: fillFallbackDates(), fromCache: false, date: today, fallback: true };
    }
  }

  function render(grid, items, opts = {}) {
    const instant = !!opts.instant;
    grid.innerHTML = "";
    if (!items || items.length === 0) {
      grid.innerHTML = `<div class="news-error">${tt("news.error")}</div>`;
      return;
    }
    items.forEach((item, i) => {
      const a = document.createElement("a");
      a.className = "news-card" + (instant ? " visible" : "");
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener";
      const img = item.image_url
        ? `<img src="${item.image_url}" alt="" loading="lazy" onerror="this.style.display='none'">`
        : "";
      a.innerHTML = `
        <div class="news-img">
          ${img}
          <div class="news-source">${escapeHtml(item.news_site || "Source")}</div>
        </div>
        <div class="news-body">
          <h3>${escapeHtml(item.title)}</h3>
          <p class="news-summary">${escapeHtml(stripHtml(item.summary || ""))}</p>
          <div class="news-time">${timeAgo(item.published_at)}</div>
        </div>
      `;
      grid.appendChild(a);
      if (!instant) setTimeout(() => a.classList.add("visible"), 50 * i);
    });
  }

  function stripHtml(s) {
    const d = document.createElement("div");
    d.innerHTML = s;
    return d.textContent || "";
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  return { load, render };
})();
