window.DvCalc = (function () {
  const tt = (k, v) => (window.I18n ? window.I18n.t(k, v) : k);
  const G0 = 9.80665;

  // Δv budgets from LEO-equivalent sea-level start, rounded teaching values.
  const MILESTONES = [
    { key: "dv.th.leo",  dv: 9400 },
    { key: "dv.th.gto",  dv: 11900 },
    { key: "dv.th.tli",  dv: 12600 },
    { key: "dv.th.mars", dv: 13300 }
  ];
  const METER_MAX = 15000;

  const state = { isp: 350, wet: 550, dry: 55 };

  function dv() {
    return state.isp * G0 * Math.log(state.wet / state.dry);
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function fmt(n) {
    return Math.round(n).toLocaleString(window.I18n ? window.I18n.get() : "en");
  }

  function slider(id, labelKey, min, max, step, value, unit) {
    return `
      <div class="dv-row">
        <label class="dv-label" for="${id}">${escapeHtml(tt(labelKey))}</label>
        <input class="dv-slider" type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${value}" />
        <span class="dv-val mono" data-val="${id}">${fmt(value)} ${unit}</span>
      </div>`;
  }

  function update(host) {
    // Dry mass can never meet or exceed wet mass
    if (state.dry >= state.wet) state.dry = Math.max(1, state.wet * 0.98);
    const v = dv();
    host.querySelector("[data-dv]").textContent = fmt(v);
    const meter = host.querySelector(".dv-meter-fill");
    meter.style.width = Math.min(100, (v / METER_MAX) * 100) + "%";
    host.querySelectorAll("[data-milestone]").forEach(li => {
      const need = +li.dataset.milestone;
      const ok = v >= need;
      li.classList.toggle("ok", ok);
      li.querySelector(".dv-mstatus").textContent = ok ? tt("dv.reached") : tt("dv.missing", { n: fmt(need - v) });
    });
    host.querySelector("[data-val='dvIsp']").textContent = fmt(state.isp) + " s";
    host.querySelector("[data-val='dvWet']").textContent = fmt(state.wet) + " t";
    host.querySelector("[data-val='dvDry']").textContent = fmt(state.dry) + " t";
    const drySlider = host.querySelector("#dvDry");
    if (+drySlider.value !== state.dry) drySlider.value = state.dry;
  }

  function render() {
    const host = document.getElementById("dvCalc");
    if (!host) return;
    host.innerHTML = `
      <div class="dv-controls">
        ${slider("dvIsp", "dv.isp", 200, 460, 5, state.isp, "s")}
        ${slider("dvWet", "dv.wet", 10, 1500, 10, state.wet, "t")}
        ${slider("dvDry", "dv.dry", 1, 500, 1, state.dry, "t")}
        <div class="dv-eq mono">Δv = Isp · g₀ · ln(m₀ / m_f)</div>
      </div>
      <div class="dv-output">
        <div class="dv-result-label">${escapeHtml(tt("dv.result"))}</div>
        <div class="dv-result"><span data-dv>0</span> <span class="dv-unit">m/s</span></div>
        <div class="dv-meter">
          <div class="dv-meter-fill"></div>
          ${MILESTONES.map(m => `<span class="dv-marker" style="left:${(m.dv / METER_MAX) * 100}%" title="${escapeHtml(tt(m.key))}"></span>`).join("")}
        </div>
        <ul class="dv-milestones">
          ${MILESTONES.map(m => `
            <li data-milestone="${m.dv}">
              <span class="dv-mname">${escapeHtml(tt(m.key))} · <span class="mono">${fmt(m.dv)} m/s</span></span>
              <span class="dv-mstatus mono"></span>
            </li>`).join("")}
        </ul>
        <div class="dv-note">${escapeHtml(tt("dv.note"))}</div>
      </div>
    `;
    ["dvIsp", "dvWet", "dvDry"].forEach(id => {
      host.querySelector("#" + id).addEventListener("input", e => {
        const v = +e.target.value;
        if (id === "dvIsp") state.isp = v;
        if (id === "dvWet") state.wet = v;
        if (id === "dvDry") state.dry = v;
        update(host);
      });
    });
    update(host);
  }

  render();
  document.addEventListener("i18n:change", render);

  return { render };
})();
