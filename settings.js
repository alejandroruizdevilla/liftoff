window.Settings = (function () {
  const KEY = "liftoff_settings_v1";
  const t = (k) => (window.I18n ? window.I18n.t(k) : k);

  const DEFAULTS = {
    // Respect the OS motion preference unless the user overrides it here
    reduceMotion: !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches),
    starDensity: "med",  // off | low | med | high
    accent: "orange"     // orange | cyan | green
  };

  function load() {
    try { return { ...DEFAULTS, ...(JSON.parse(localStorage.getItem(KEY) || "{}")) }; }
    catch { return { ...DEFAULTS }; }
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  let state = load();
  let open = false;

  function apply() {
    document.body.classList.toggle("reduce-motion", !!state.reduceMotion);
    document.body.dataset.starDensity = state.starDensity;
    document.body.dataset.accent = state.accent;
    document.dispatchEvent(new CustomEvent("settings:apply", { detail: state }));
  }

  function set(key, value) {
    state[key] = value;
    save();
    apply();
    if (open) render();
  }

  function reset() {
    state = { ...DEFAULTS };
    save();
    // Also reset language to auto + sound to defaults
    if (window.LFAudio) {
      window.LFAudio.setMuted(false);
      window.LFAudio.setVolume(1);
    }
    if (window.I18n) {
      const nav = (navigator.language || "en").toLowerCase();
      const auto = window.I18n.locales.find(l => l !== "en" && nav.startsWith(l)) || "en";
      window.I18n.set(auto);
    }
    apply();
    if (open) render();
  }

  function get(key) { return state[key]; }

  function show() {
    open = true;
    render();
    document.getElementById("settingsModal").classList.add("active");
    document.body.style.overflow = "hidden";
    if (window.LFAudio) { window.LFAudio.resume(); window.LFAudio.click(); }
  }

  function hide() {
    open = false;
    document.getElementById("settingsModal").classList.remove("active");
    document.body.style.overflow = "";
  }

  function chip(activeKey, currentKey, labelKey, sectionKey) {
    return `<button class="set-chip${activeKey === currentKey ? " active" : ""}" data-section="${sectionKey}" data-value="${activeKey}">${t(labelKey)}</button>`;
  }

  function row(labelKey, html) {
    return `
      <div class="set-row">
        <div class="set-label">${t(labelKey)}</div>
        <div class="set-control">${html}</div>
      </div>`;
  }

  function render() {
    const modal = document.getElementById("settingsModal");
    const lang = window.I18n ? window.I18n.get() : "en";
    const muted = window.LFAudio ? window.LFAudio.isMuted() : false;
    const vol = window.LFAudio ? Math.round(window.LFAudio.getVolume() * 100) : 100;

    modal.innerHTML = `
      <div class="set-backdrop" data-close></div>
      <div class="set-panel" role="dialog" aria-modal="true">
        <button class="quiz-close" data-close>${t("settings.close")} ✕</button>
        <div class="set-head">
          <div class="set-eyebrow">⚙ ${t("settings.title")}</div>
          <div class="set-sub">${t("settings.sub")}</div>
        </div>

        <div class="set-list">
          ${row("settings.lang", `
            <div class="set-chiprow">
              <button class="set-chip${lang === "en" ? " active" : ""}" data-section="lang" data-value="en">English</button>
              <button class="set-chip${lang === "es" ? " active" : ""}" data-section="lang" data-value="es">Español</button>
              <button class="set-chip${lang === "fr" ? " active" : ""}" data-section="lang" data-value="fr">Français</button>
              <button class="set-chip${lang === "de" ? " active" : ""}" data-section="lang" data-value="de">Deutsch</button>
              <button class="set-chip${lang === "pt" ? " active" : ""}" data-section="lang" data-value="pt">Português</button>
            </div>
          `)}

          ${row("settings.sound", `
            <div class="set-chiprow">
              <button class="set-chip${!muted ? " active" : ""}" data-section="sound" data-value="on">${t("settings.sound.on")}</button>
              <button class="set-chip${muted ? " active" : ""}" data-section="sound" data-value="off">${t("settings.sound.off")}</button>
            </div>
          `)}

          ${row("settings.volume", `
            <div class="set-slider-wrap">
              <input class="set-slider" type="range" min="0" max="100" value="${vol}" data-section="volume" ${muted ? "disabled" : ""} />
              <span class="set-slider-val">${vol}%</span>
            </div>
          `)}

          ${row("settings.motion", `
            <div class="set-chiprow">
              <button class="set-chip${!state.reduceMotion ? " active" : ""}" data-section="motion" data-value="full">${t("settings.motion.full")}</button>
              <button class="set-chip${state.reduceMotion ? " active" : ""}" data-section="motion" data-value="reduced">${t("settings.motion.reduced")}</button>
            </div>
          `)}

          ${row("settings.density", `
            <div class="set-chiprow">
              ${chip("off", state.starDensity, "settings.density.off", "density")}
              ${chip("low", state.starDensity, "settings.density.low", "density")}
              ${chip("med", state.starDensity, "settings.density.med", "density")}
              ${chip("high", state.starDensity, "settings.density.high", "density")}
            </div>
          `)}

          ${row("settings.accent", `
            <div class="set-chiprow set-accents">
              <button class="set-chip set-accent-chip accent-orange${state.accent === "orange" ? " active" : ""}" data-section="accent" data-value="orange"><span class="dot"></span>${t("settings.accent.orange")}</button>
              <button class="set-chip set-accent-chip accent-cyan${state.accent === "cyan" ? " active" : ""}" data-section="accent" data-value="cyan"><span class="dot"></span>${t("settings.accent.cyan")}</button>
              <button class="set-chip set-accent-chip accent-green${state.accent === "green" ? " active" : ""}" data-section="accent" data-value="green"><span class="dot"></span>${t("settings.accent.green")}</button>
            </div>
          `)}
        </div>

        <div class="set-footer">
          <button class="btn ghost" data-reset>${t("settings.reset")}</button>
        </div>
      </div>
    `;
    wire(modal);
  }

  function wire(modal) {
    modal.querySelectorAll("[data-close]").forEach(el => {
      el.addEventListener("click", () => {
        if (window.LFAudio) window.LFAudio.click();
        hide();
      });
    });

    modal.querySelectorAll("[data-section]").forEach(el => {
      el.addEventListener("click", () => {
        if (window.LFAudio) window.LFAudio.click();
        const section = el.dataset.section;
        const value = el.dataset.value;
        if (section === "lang") {
          if (window.I18n && value !== window.I18n.get()) window.I18n.set(value);
          render();
        } else if (section === "sound") {
          if (window.LFAudio) {
            window.LFAudio.resume();
            window.LFAudio.setMuted(value === "off");
          }
          document.dispatchEvent(new CustomEvent("audio:change"));
          render();
        } else if (section === "motion") {
          set("reduceMotion", value === "reduced");
        } else if (section === "density") {
          set("starDensity", value);
        } else if (section === "accent") {
          set("accent", value);
        }
      });
    });

    const slider = modal.querySelector(".set-slider");
    if (slider) {
      slider.addEventListener("input", () => {
        const v = Number(slider.value) / 100;
        if (window.LFAudio) {
          window.LFAudio.resume();
          window.LFAudio.setVolume(v);
        }
        modal.querySelector(".set-slider-val").textContent = slider.value + "%";
      });
      slider.addEventListener("change", () => {
        if (window.LFAudio) window.LFAudio.beep({ freq: 880, dur: 0.08, vol: 0.12 });
      });
    }

    modal.querySelectorAll("[data-reset]").forEach(el => {
      el.addEventListener("click", () => {
        if (window.LFAudio) window.LFAudio.click();
        reset();
      });
    });
  }

  document.addEventListener("keydown", (e) => {
    if (open && e.key === "Escape") hide();
  });

  document.addEventListener("i18n:change", () => { if (open) render(); });
  document.addEventListener("audio:change", () => { if (open) render(); });

  apply();

  return { open: show, close: hide, isOpen: () => open, get, set, reset };
})();
