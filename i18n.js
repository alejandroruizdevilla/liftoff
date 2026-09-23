window.I18n = (function () {
  const STORAGE = "liftoff_lang";

  const DICT = {
    en: {
      // HUD
      "hud.sys": "SYS · NOMINAL",
      "hud.net": "NET · ONLINE",
      "hud.ctrl": "CTRL · MISSION",
      "hud.loc": "CAPE CANAVERAL",
      "hud.mute.on": "Sound on — click to mute",
      "hud.mute.off": "Sound off — click to enable",
      "hud.lang": "Switch language",

      // Hero
      "hero.eyebrow": "Mission Brief · Vol. 09",
      "hero.title.1": "Liftoff",
      "hero.title.2": "starts on",
      "hero.title.3": "your screen.",
      "hero.lede.html": "Nine rocket simulators, hand-picked. From <strong>kitchen-table model rockets</strong> to <strong>full Apollo cockpits</strong> — the ones worth your time, ranked by an obsessive who has crashed thousands of virtual rockets so you don't have to.",
      "hero.cta.launch": "Launch the Index",
      "hero.cta.briefing": "Today's Briefing",
      "hero.cta.quiz": "Find My Sim",
      "hero.cta.compare": "Compare Sims",

      // Sections
      "news.label": "// LIVE FEED",
      "news.title": "Mission Briefing",
      "news.sub": "Real spaceflight news from around the world, refreshed daily.",
      "news.updated": "Updated",
      "news.cached": "cached",
      "news.live": "live",
      "news.offline": "offline feed",
      "news.allSources": "All Sources",
      "news.refresh": "Force Refresh",
      "news.loading": "Establishing uplink to ground stations...",
      "news.error": "No transmissions received. Check uplink.",

      "launches.label": "// T-MINUS SCHEDULE",
      "launches.title": "Upcoming Launches",
      "launches.sub": "Live countdowns to the next missions on the worldwide pad. Status, vehicle, mission, and orbit pulled from the public Launch Library 2 feed.",
      "launches.refresh": "Refresh Schedule",
      "launches.auto": "Auto-refresh hourly · Source: The Space Devs",
      "launches.loading": "Loading launch schedule...",
      "launches.none": "No upcoming missions on the schedule.",
      "launches.tbd": "DATE TBD",
      "launches.netLbl": "NET",
      "launches.padLbl": "Pad",
      "launches.orbitLbl": "Orbit",
      "launches.recent.title": "Recent Results",
      "launches.recent.success": "SUCCESS",
      "launches.recent.failure": "FAILURE",
      "launches.recent.partial": "PARTIAL",

      "spotlight.label": "// SIM OF THE DAY",

      "dv.label": "// FLIGHT COMPUTER",
      "dv.title": "The Δv Calculator",
      "dv.sub": "Tsiolkovsky's rocket equation, live. Drag the sliders and see how far your rocket could go.",
      "dv.isp": "Specific impulse (Isp)",
      "dv.wet": "Wet mass (m₀)",
      "dv.dry": "Dry mass (m_f)",
      "dv.result": "Total Δv",
      "dv.note": "Idealized single stage in vacuum — no drag, no gravity losses, no staging. Real rockets cheat with staging.",
      "dv.th.leo": "Low Earth orbit",
      "dv.th.gto": "GTO transfer",
      "dv.th.tli": "Trans-lunar injection",
      "dv.th.mars": "Mars transfer",
      "dv.reached": "GO",
      "dv.missing": "{n} m/s short",

      // Launch statistics
      "stats.label": "// FLIGHT RECORDS",
      "stats.title": "Launch Statistics",
      "stats.sub": "How busy is the worldwide pad? A decade of orbital launch attempts, compiled from public launch logs.",
      "stats.note": "Approximate figures · 2016–2025 curated, current year live",
      "stats.ytd": "year to date",
      "stats.tile.attempts": "Orbital attempts · 2025",
      "stats.tile.attempts.detail": "worldwide, all providers",
      "stats.tile.ytd": "Orbital attempts · {y} YTD",
      "stats.live": "live · The Space Devs",
      "stats.tile.rate": "Success rate · 2025",
      "stats.tile.growth": "Traffic growth",
      "stats.tile.vehicle": "Most-flown vehicle · 2025",
      "stats.tile.vehicle.detail": "~140 flights in one year",
      "stats.chart.year.title": "Orbital launch attempts per year",
      "stats.chart.year.sub": "Worldwide · 2016–2025",
      "stats.chart.country.title": "2025 attempts by country",
      "stats.chart.country.sub": "By operator's country of origin",
      "stats.attempts": "Attempts",
      "stats.successes": "Successes",
      "stats.share": "Share",
      "stats.table.show": "View data table",
      "stats.table.hide": "Hide data table",
      "stats.table.year": "Year",
      "stats.table.country": "Country",
      "country.usa": "United States",
      "country.china": "China",
      "country.russia": "Russia",
      "country.india": "India",
      "country.japan": "Japan",
      "country.europe": "Europe",
      "country.iran": "Iran",
      "country.other": "Other",

      "manifest.label": "// 09 ENTRIES",
      "manifest.title": "The Launch Manifest",
      "manifest.sub": "Click any entry to open its full mission file. Filter by category, scan the specs, and dive in. No affiliate links, no sponsorships, no fluff.",
      "manifest.search": "Search by name, tag, or keyword…",
      "manifest.searchClear": "Clear search",
      "manifest.empty": "No matches. Try a different search or filter.",
      "filter.all": "All Systems",
      "filter.model": "Model",
      "filter.space": "Spaceflight",
      "filter.game": "Game",
      "filter.free": "Free",
      "filter.realistic": "Hyper-real",
      "card.open": "Open Mission File",

      // Detail
      "detail.back": "← Return to Manifest",
      "detail.share": "Share",
      "detail.shared": "Link copied!",
      "detail.lbl.developer": "Developer",
      "detail.lbl.released": "Released",
      "detail.lbl.price": "Price",
      "detail.lbl.platforms": "Platforms",
      "detail.lbl.requires": "Requires",
      "detail.lbl.rating": "Rating",
      "detail.cta": "Visit Official Site",
      "detail.section.brief": "Mission Brief",
      "detail.section.bestFor": "Best For",
      "detail.section.profile": "System Profile",
      "detail.section.prosCons": "Strengths & Trade-offs",
      "detail.section.facts": "Quick Facts",
      "detail.section.related": "Related Systems",
      "detail.rating.realism": "Realism",
      "detail.rating.depth": "Depth",
      "detail.rating.accessibility": "Accessibility",
      "detail.rating.learningCurve": "Ease of Entry",
      "detail.rating.community": "Community",
      "detail.pros": "+ Strengths",
      "detail.cons": "− Trade-offs",

      // Quiz
      "quiz.title": "Find Your Sim",
      "quiz.sub": "Three questions. One recommendation.",
      "quiz.q1": "What's your budget?",
      "quiz.q1.free": "Free only",
      "quiz.q1.either": "Free or paid — best tool wins",
      "quiz.q1.paid": "Paid is fine if it's worth it",
      "quiz.q2": "What kind of rockets?",
      "quiz.q2.model": "Real model rockets I can launch",
      "quiz.q2.space": "Spaceflight & orbital mechanics",
      "quiz.q2.both": "Both / not sure",
      "quiz.q3": "Your experience level?",
      "quiz.q3.new": "Newcomer — make it friendly",
      "quiz.q3.some": "Some background — happy to learn",
      "quiz.q3.expert": "Veteran — give me the deep end",
      "quiz.result": "Your match",
      "quiz.why": "Why this one",
      "quiz.runners": "Also consider",
      "quiz.retake": "Retake the quiz",
      "quiz.open": "Open Mission File",
      "quiz.close": "Close",

      // Compare
      "compare.title": "Side by Side",
      "compare.sub": "Pick any two systems and inspect them head-to-head.",
      "compare.swap": "Swap",
      "compare.share": "Share comparison",
      "compare.pickA": "System A",
      "compare.pickB": "System B",

      // Launch overlay
      "launch.armed": "SYSTEMS ARMED",
      "launch.tminus": "T-MINUS · {n}",
      "launch.mainEngine": "MAIN ENGINE START",
      "launch.ignition": "IGNITION",
      "launch.liftoffNominal": "LIFTOFF · ALL ENGINES NOMINAL",
      "launch.liftoff": "LIFTOFF",
      "launch.stageOk": "STAGE 1 · NOMINAL",
      "launch.stageArmed": "STAGE 1 · ARMED",
      "launch.ignitionGo": "IGNITION · GO",
      "launch.liftoffGo": "LIFTOFF · GO",
      "launch.fuel": "FUEL · {pct}%",
      "launch.guidanceInt": "GUIDANCE · INTERNAL",
      "launch.guidanceAligned": "GUIDANCE · ALIGNED",
      "launch.guidanceLocked": "GUIDANCE · LOCKED",
      "launch.trajectory": "TRAJECTORY · NOMINAL",

      // Settings
      "hud.settings": "Settings",
      "settings.title": "Settings",
      "settings.sub": "Tune the experience to your taste. Saved locally.",
      "settings.lang": "Language",
      "settings.sound": "Sound",
      "settings.sound.on": "On",
      "settings.sound.off": "Off",
      "settings.volume": "Volume",
      "settings.motion": "Animations",
      "settings.motion.full": "Full",
      "settings.motion.reduced": "Reduced",
      "settings.density": "Starfield density",
      "settings.density.off": "Off",
      "settings.density.low": "Low",
      "settings.density.med": "Medium",
      "settings.density.high": "High",
      "settings.accent": "Accent color",
      "settings.accent.orange": "Orange",
      "settings.accent.cyan": "Cyan",
      "settings.accent.green": "Green",
      "settings.close": "Close",
      "settings.reset": "Reset to defaults",

      // Time-ago (relative time)
      "time.justNow": "just now",
      "time.sec": "{n}s ago",
      "time.min": "{n}m ago",
      "time.hour": "{n}h ago",
      "time.day": "{n}d ago",

      // Boot loader
      "boot.brand": "LIFTOFF",
      "boot.tagline": "INITIALIZING SYSTEMS",
      "boot.step.1": "BOOT · CHECKING SUBSYSTEMS",
      "boot.step.2": "COMMS · ESTABLISHING UPLINK",
      "boot.step.3": "TELEMETRY · LOCKED",
      "boot.step.4": "NOMINAL · READY",

      // Footer
      "footer.eot": "END OF TRANSMISSION · 2026 · BUILT FOR CURIOUS HUMANS",
      "footer.verify": "verify all prices and availability before purchase"
    },

    es: {
      "hud.sys": "SIS · NOMINAL",
      "hud.net": "RED · ONLINE",
      "hud.ctrl": "CTRL · MISIÓN",
      "hud.loc": "CABO CAÑAVERAL",
      "hud.mute.on": "Sonido activo — clic para silenciar",
      "hud.mute.off": "Sonido apagado — clic para activar",
      "hud.lang": "Cambiar idioma",

      "hero.eyebrow": "Informe de Misión · Vol. 09",
      "hero.title.1": "El despegue",
      "hero.title.2": "empieza en",
      "hero.title.3": "tu pantalla.",
      "hero.lede.html": "Nueve simuladores de cohetes, seleccionados a mano. Desde <strong>cohetes de aficionado caseros</strong> hasta <strong>cabinas completas del Apolo</strong> — los que valen tu tiempo, ordenados por un obsesivo que ha estrellado miles de cohetes virtuales para que tú no tengas que hacerlo.",
      "hero.cta.launch": "Lanzar el Índice",
      "hero.cta.briefing": "Informe del Día",
      "hero.cta.quiz": "Encuentra mi Sim",
      "hero.cta.compare": "Comparar Sims",

      "news.label": "// SEÑAL EN VIVO",
      "news.title": "Informe de Misión",
      "news.sub": "Noticias reales de vuelos espaciales de todo el mundo, actualizadas a diario.",
      "news.updated": "Actualizado",
      "news.cached": "en caché",
      "news.live": "en vivo",
      "news.offline": "feed sin conexión",
      "news.allSources": "Todas las Fuentes",
      "news.refresh": "Forzar Refresco",
      "news.loading": "Estableciendo enlace con las estaciones...",
      "news.error": "No se reciben transmisiones. Verifica el enlace.",

      "launches.label": "// AGENDA T-MENOS",
      "launches.title": "Próximos Lanzamientos",
      "launches.sub": "Cuenta atrás en vivo para las próximas misiones en plataformas de todo el mundo. Estado, vehículo, misión y órbita desde el feed público de Launch Library 2.",
      "launches.refresh": "Refrescar Agenda",
      "launches.auto": "Auto-refresco cada hora · Fuente: The Space Devs",
      "launches.loading": "Cargando agenda de lanzamientos...",
      "launches.none": "No hay misiones próximas en la agenda.",
      "launches.tbd": "FECHA POR DETERMINAR",
      "launches.netLbl": "NET",
      "launches.padLbl": "Plataforma",
      "launches.orbitLbl": "Órbita",
      "launches.recent.title": "Resultados Recientes",
      "launches.recent.success": "ÉXITO",
      "launches.recent.failure": "FALLO",
      "launches.recent.partial": "PARCIAL",

      "spotlight.label": "// SIM DEL DÍA",

      "dv.label": "// ORDENADOR DE VUELO",
      "dv.title": "La Calculadora de Δv",
      "dv.sub": "La ecuación del cohete de Tsiolkovski, en vivo. Mueve los controles y descubre hasta dónde llegaría tu cohete.",
      "dv.isp": "Impulso específico (Isp)",
      "dv.wet": "Masa húmeda (m₀)",
      "dv.dry": "Masa seca (m_f)",
      "dv.result": "Δv total",
      "dv.note": "Etapa única idealizada en vacío — sin resistencia, sin pérdidas por gravedad, sin separación de etapas. Los cohetes reales hacen trampa con etapas.",
      "dv.th.leo": "Órbita baja terrestre",
      "dv.th.gto": "Transferencia GTO",
      "dv.th.tli": "Inyección translunar",
      "dv.th.mars": "Transferencia a Marte",
      "dv.reached": "GO",
      "dv.missing": "faltan {n} m/s",

      // Estadísticas de lanzamiento
      "stats.label": "// REGISTRO DE VUELO",
      "stats.title": "Estadísticas de Lanzamiento",
      "stats.sub": "¿Cuánta actividad hay en las plataformas del mundo? Una década de intentos de lanzamiento orbital, recopilados de registros públicos.",
      "stats.note": "Cifras aproximadas · 2016–2025 curado, año actual en vivo",
      "stats.ytd": "acumulado del año",
      "stats.tile.attempts": "Intentos orbitales · 2025",
      "stats.tile.attempts.detail": "todo el mundo, todos los operadores",
      "stats.tile.ytd": "Intentos orbitales · {y} acumulado",
      "stats.live": "en vivo · The Space Devs",
      "stats.tile.rate": "Tasa de éxito · 2025",
      "stats.tile.growth": "Crecimiento del tráfico",
      "stats.tile.vehicle": "Vehículo más lanzado · 2025",
      "stats.tile.vehicle.detail": "~140 vuelos en un año",
      "stats.chart.year.title": "Intentos de lanzamiento orbital por año",
      "stats.chart.year.sub": "Todo el mundo · 2016–2025",
      "stats.chart.country.title": "Intentos de 2025 por país",
      "stats.chart.country.sub": "Según el país de origen del operador",
      "stats.attempts": "Intentos",
      "stats.successes": "Éxitos",
      "stats.share": "Cuota",
      "stats.table.show": "Ver tabla de datos",
      "stats.table.hide": "Ocultar tabla de datos",
      "stats.table.year": "Año",
      "stats.table.country": "País",
      "country.usa": "Estados Unidos",
      "country.china": "China",
      "country.russia": "Rusia",
      "country.india": "India",
      "country.japan": "Japón",
      "country.europe": "Europa",
      "country.iran": "Irán",
      "country.other": "Otros",

      "manifest.label": "// 09 ENTRADAS",
      "manifest.title": "El Manifiesto de Lanzamiento",
      "manifest.sub": "Haz clic en cualquier entrada para abrir su ficha completa. Filtra por categoría, revisa las especificaciones y sumérgete. Sin enlaces de afiliados, sin patrocinios, sin paja.",
      "manifest.search": "Buscar por nombre, etiqueta o palabra clave…",
      "manifest.searchClear": "Limpiar búsqueda",
      "manifest.empty": "Sin coincidencias. Prueba otra búsqueda o filtro.",
      "filter.all": "Todos los Sistemas",
      "filter.model": "Aficionado",
      "filter.space": "Espacio",
      "filter.game": "Juego",
      "filter.free": "Gratis",
      "filter.realistic": "Hiperrealista",
      "card.open": "Abrir Ficha de Misión",

      "detail.back": "← Volver al Manifiesto",
      "detail.share": "Compartir",
      "detail.shared": "¡Enlace copiado!",
      "detail.lbl.developer": "Desarrollador",
      "detail.lbl.released": "Lanzado",
      "detail.lbl.price": "Precio",
      "detail.lbl.platforms": "Plataformas",
      "detail.lbl.requires": "Requiere",
      "detail.lbl.rating": "Valoración",
      "detail.cta": "Ir al Sitio Oficial",
      "detail.section.brief": "Resumen de Misión",
      "detail.section.bestFor": "Ideal Para",
      "detail.section.profile": "Perfil del Sistema",
      "detail.section.prosCons": "Fortalezas y Compromisos",
      "detail.section.facts": "Datos Rápidos",
      "detail.section.related": "Sistemas Relacionados",
      "detail.rating.realism": "Realismo",
      "detail.rating.depth": "Profundidad",
      "detail.rating.accessibility": "Accesibilidad",
      "detail.rating.learningCurve": "Facilidad",
      "detail.rating.community": "Comunidad",
      "detail.pros": "+ Fortalezas",
      "detail.cons": "− Compromisos",

      "quiz.title": "Encuentra tu Sim",
      "quiz.sub": "Tres preguntas. Una recomendación.",
      "quiz.q1": "¿Cuál es tu presupuesto?",
      "quiz.q1.free": "Solo gratuito",
      "quiz.q1.either": "Gratis o de pago — gana la mejor herramienta",
      "quiz.q1.paid": "Pagar está bien si lo vale",
      "quiz.q2": "¿Qué tipo de cohetes?",
      "quiz.q2.model": "Cohetes reales de aficionado que pueda lanzar",
      "quiz.q2.space": "Vuelo espacial y mecánica orbital",
      "quiz.q2.both": "Ambos / no estoy seguro",
      "quiz.q3": "¿Tu nivel de experiencia?",
      "quiz.q3.new": "Principiante — fácil de entender",
      "quiz.q3.some": "Algo de base — dispuesto a aprender",
      "quiz.q3.expert": "Veterano — al fondo de la piscina",
      "quiz.result": "Tu coincidencia",
      "quiz.why": "Por qué este",
      "quiz.runners": "También considera",
      "quiz.retake": "Repetir el cuestionario",
      "quiz.open": "Abrir Ficha",
      "quiz.close": "Cerrar",

      "compare.title": "Cara a Cara",
      "compare.sub": "Elige dos sistemas y compáralos lado a lado.",
      "compare.swap": "Intercambiar",
      "compare.share": "Compartir comparación",
      "compare.pickA": "Sistema A",
      "compare.pickB": "Sistema B",

      "launch.armed": "SISTEMAS ARMADOS",
      "launch.tminus": "T-MENOS · {n}",
      "launch.mainEngine": "ENCENDIDO DEL MOTOR PRINCIPAL",
      "launch.ignition": "IGNICIÓN",
      "launch.liftoffNominal": "DESPEGUE · TODOS LOS MOTORES NOMINAL",
      "launch.liftoff": "DESPEGUE",
      "launch.stageOk": "ETAPA 1 · NOMINAL",
      "launch.stageArmed": "ETAPA 1 · ARMADA",
      "launch.ignitionGo": "IGNICIÓN · OK",
      "launch.liftoffGo": "DESPEGUE · OK",
      "launch.fuel": "COMBUSTIBLE · {pct}%",
      "launch.guidanceInt": "GUÍA · INTERNA",
      "launch.guidanceAligned": "GUÍA · ALINEADA",
      "launch.guidanceLocked": "GUÍA · BLOQUEADA",
      "launch.trajectory": "TRAYECTORIA · NOMINAL",

      "hud.settings": "Ajustes",
      "settings.title": "Ajustes",
      "settings.sub": "Adapta la experiencia a tu gusto. Se guarda localmente.",
      "settings.lang": "Idioma",
      "settings.sound": "Sonido",
      "settings.sound.on": "Activado",
      "settings.sound.off": "Silenciado",
      "settings.volume": "Volumen",
      "settings.motion": "Animaciones",
      "settings.motion.full": "Completas",
      "settings.motion.reduced": "Reducidas",
      "settings.density": "Densidad de estrellas",
      "settings.density.off": "Apagado",
      "settings.density.low": "Baja",
      "settings.density.med": "Media",
      "settings.density.high": "Alta",
      "settings.accent": "Color de acento",
      "settings.accent.orange": "Naranja",
      "settings.accent.cyan": "Cian",
      "settings.accent.green": "Verde",
      "settings.close": "Cerrar",
      "settings.reset": "Restablecer",

      "time.justNow": "ahora mismo",
      "time.sec": "hace {n}s",
      "time.min": "hace {n}m",
      "time.hour": "hace {n}h",
      "time.day": "hace {n}d",

      "boot.brand": "LIFTOFF",
      "boot.tagline": "INICIANDO SISTEMAS",
      "boot.step.1": "ARRANQUE · VERIFICANDO SUBSISTEMAS",
      "boot.step.2": "COMMS · ESTABLECIENDO ENLACE",
      "boot.step.3": "TELEMETRÍA · BLOQUEADA",
      "boot.step.4": "NOMINAL · LISTO",

      "footer.eot": "FIN DE LA TRANSMISIÓN · 2026 · HECHO PARA CURIOSOS",
      "footer.verify": "verifica precios y disponibilidad antes de comprar"
    }
  };

  // Locales beyond en/es ship as lazy-loaded packs (dict + sim content) that
  // call I18n.registerPack when they arrive; es ships its sim content the same way.
  const KNOWN = ["en", "es", "fr", "de", "pt"];
  const PACKS = { es: "locales/es.js", fr: "locales/fr.js", de: "locales/de.js", pt: "locales/pt.js" };
  const loadedPacks = { en: true };

  let locale = localStorage.getItem(STORAGE);
  if (!locale || !KNOWN.includes(locale)) {
    const nav = (navigator.language || "en").toLowerCase();
    locale = KNOWN.find(l => l !== "en" && nav.startsWith(l)) || "en";
  }
  // ?lang=xx overrides and persists (shareable per-language URLs)
  try {
    const urlLang = new URLSearchParams(location.search).get("lang");
    if (urlLang && KNOWN.includes(urlLang)) {
      locale = urlLang;
      localStorage.setItem(STORAGE, locale);
    }
  } catch (_) {}

  function ensurePack(name) {
    if (loadedPacks[name] || !PACKS[name]) return;
    loadedPacks[name] = "loading";
    const s = document.createElement("script");
    s.src = PACKS[name];
    s.onerror = () => { loadedPacks[name] = false; };
    document.head.appendChild(s);
  }

  function registerPack(name, pack) {
    loadedPacks[name] = true;
    if (pack && pack.dict) DICT[name] = Object.assign(DICT[name] || {}, pack.dict);
    if (pack && pack.sims) {
      window.SIMS_I18N = window.SIMS_I18N || {};
      window.SIMS_I18N[name] = pack.sims;
    }
    if (name === locale) apply();
  }

  ensurePack(locale);

  function t(key, vars) {
    let s = (DICT[locale] && DICT[locale][key]) || DICT.en[key] || key;
    if (vars) {
      for (const k in vars) {
        s = s.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
      }
    }
    return s;
  }

  function apply() {
    document.documentElement.lang = locale;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(el => {
      const pairs = el.dataset.i18nAttr.split(",");
      for (const p of pairs) {
        const [attr, key] = p.split(":");
        if (attr && key) el.setAttribute(attr.trim(), t(key.trim()));
      }
    });
    document.dispatchEvent(new CustomEvent("i18n:change", { detail: { locale } }));
  }

  function set(newLocale) {
    if (!KNOWN.includes(newLocale)) return;
    locale = newLocale;
    localStorage.setItem(STORAGE, locale);
    if (loadedPacks[newLocale] === true || !PACKS[newLocale]) apply();
    else ensurePack(newLocale); // registerPack applies once the pack arrives
  }

  function get() { return locale; }


  // Localized view of a sim entry: editorial fields come from SIMS_I18N when a
  // translation exists for the active locale; everything else falls through.
  function sim(s) {
    const dict = window.SIMS_I18N && window.SIMS_I18N[locale];
    const o = dict && dict[s.id];
    return o ? Object.assign({}, s, o) : s;
  }

  return { t, apply, set, get, sim, registerPack, locales: KNOWN.slice() };
})();
