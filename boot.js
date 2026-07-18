window.Boot = (function () {
  const STEPS = [
    { pct: 25, key: "boot.step.1" },
    { pct: 55, key: "boot.step.2" },
    { pct: 85, key: "boot.step.3" },
    { pct: 100, key: "boot.step.4" }
  ];

  let current = 0;
  let stepIdx = 0;
  let finished = false;
  let minHoldMs = 700;
  let startedAt = performance.now();

  function el(id) { return document.getElementById(id); }

  function setLabel(key) {
    const lbl = el("bootLabel");
    if (!lbl) return;
    lbl.dataset.i18n = key;
    lbl.textContent = window.I18n ? window.I18n.t(key) : key;
  }

  function setPct(p) {
    current = Math.min(100, Math.max(current, p));
    const bar = el("bootBarFill");
    const txt = el("bootPct");
    if (bar) bar.style.width = current + "%";
    if (txt) txt.textContent = Math.round(current) + "%";
  }

  function step(idx) {
    if (idx <= stepIdx) return;
    stepIdx = idx;
    const s = STEPS[idx - 1];
    if (!s) return;
    setPct(s.pct);
    setLabel(s.key);
  }

  function set(pct, key) {
    setPct(pct);
    if (key) setLabel(key);
    // Auto-advance step index if appropriate
    for (let i = STEPS.length - 1; i >= 0; i--) {
      if (current >= STEPS[i].pct) { stepIdx = Math.max(stepIdx, i + 1); break; }
    }
  }

  function finish() {
    if (finished) return;
    finished = true;
    setPct(100);
    setLabel("boot.step.4");
    const elapsed = performance.now() - startedAt;
    const wait = Math.max(0, minHoldMs - elapsed);
    setTimeout(() => {
      const screen = el("boot");
      if (!screen) return;
      screen.classList.add("done");
      setTimeout(() => { screen.remove(); }, 700);
    }, wait);
  }

  // Safety: never hang forever even if data never resolves
  setTimeout(() => { if (!finished) finish(); }, 9000);

  // Re-translate label when language changes mid-boot
  document.addEventListener("i18n:change", () => {
    const lbl = el("bootLabel");
    if (lbl && lbl.dataset.i18n && window.I18n) {
      lbl.textContent = window.I18n.t(lbl.dataset.i18n);
    }
  });

  return { set, step, finish, isDone: () => finished };
})();
