// LIFTOFF service worker: offline-capable static shell.
// Same-origin GETs are served stale-while-revalidate; API calls (news,
// launch data) go straight to the network — the app already caches those
// responses in localStorage with its own TTLs.
const CACHE = "liftoff-v1";
const PRECACHE = [
  "./",
  "index.html",
  "styles.css",
  "i18n.js",
  "boot.js",
  "sims.js",
  "news.js",
  "launches.js",
  "stats.js",
  "dv.js",
  "audio.js",
  "launch.js",
  "quiz.js",
  "compare.js",
  "settings.js",
  "app.js",
  "favicon.svg",
  "icon-192.png",
  "icon-512.png",
  "locales/es.js",
  "locales/fr.js",
  "locales/de.js",
  "locales/pt.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      // Best-effort precache: one missing asset must not sink the install
      .then(c => Promise.allSettled(PRECACHE.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fresh = fetch(e.request).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || fresh;
    })
  );
});
