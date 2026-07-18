window.Launch = (function () {
  let running = false;

  function tt(k, vars) { return window.I18n ? window.I18n.t(k, vars) : k; }

  function stages() {
    return [
      { t: 0,    label: tt("launch.tminus", { n: 5 }),     count: "5",                phase: "count" },
      { t: 1000, label: tt("launch.tminus", { n: 4 }),     count: "4",                phase: "count" },
      { t: 2000, label: tt("launch.tminus", { n: 3 }),     count: "3",                phase: "count" },
      { t: 3000, label: tt("launch.tminus", { n: 2 }),     count: "2",                phase: "count" },
      { t: 4000, label: tt("launch.tminus", { n: 1 }),     count: "1",                phase: "count" },
      { t: 5000, label: tt("launch.mainEngine"),           count: tt("launch.ignition"), phase: "ignite" },
      { t: 6500, label: tt("launch.liftoffNominal"),       count: tt("launch.liftoff"),  phase: "liftoff" }
    ];
  }

  function spawnSmoke(stage) {
    const trail = stage.querySelector("#rocketTrail");
    if (!trail) return;
    for (let i = 0; i < 14; i++) {
      const puff = document.createElement("div");
      puff.className = "smoke-puff";
      const dx = (Math.random() - 0.5) * 200 - 50;
      puff.style.setProperty("--dx", dx + "%");
      puff.style.left = "50%";
      puff.style.bottom = "0";
      puff.style.animationDelay = (Math.random() * 0.4) + "s";
      trail.appendChild(puff);
      setTimeout(() => puff.remove(), 3000);
    }
  }

  async function start() {
    if (running) return;
    running = true;

    const overlay = document.getElementById("launchOverlay");
    const status = document.getElementById("launchStatus");
    const count = document.getElementById("launchCount");
    const bar = document.getElementById("launchBar");
    const telemetry = document.getElementById("launchTelemetry");
    const rocket = document.getElementById("rocketSvg");
    const flame = document.getElementById("flame");
    const stage = document.getElementById("rocketStage");

    window.LFAudio.resume();

    overlay.classList.add("active");
    overlay.classList.remove("flash");
    bar.style.width = "0%";

    const STAGES = stages();
    const total = STAGES[STAGES.length - 1].t + 1500;

    // Animate progress bar
    const startedAt = performance.now();
    function tickBar(now) {
      const pct = Math.min(100, ((now - startedAt) / total) * 100);
      bar.style.width = pct + "%";
      if (pct < 100 && running) requestAnimationFrame(tickBar);
    }
    requestAnimationFrame(tickBar);

    // Telemetry text updates
    const telemetryFrames = [
      [tt("launch.stageOk"),     tt("launch.fuel", { pct: 100 }), tt("launch.guidanceInt")],
      [tt("launch.stageOk"),     tt("launch.fuel", { pct: 99 }),  tt("launch.guidanceInt")],
      [tt("launch.stageOk"),     tt("launch.fuel", { pct: 98 }),  tt("launch.guidanceAligned")],
      [tt("launch.stageArmed"),  tt("launch.fuel", { pct: 97 }),  tt("launch.guidanceAligned")],
      [tt("launch.stageArmed"),  tt("launch.fuel", { pct: 96 }),  tt("launch.guidanceLocked")],
      [tt("launch.ignitionGo"),  tt("launch.fuel", { pct: 95 }),  tt("launch.guidanceLocked")],
      [tt("launch.liftoffGo"),   tt("launch.fuel", { pct: 92 }),  tt("launch.trajectory")]
    ];

    function setTelemetry(arr) {
      telemetry.innerHTML = arr.map(t => `<div>${t}</div>`).join("");
    }

    // Schedule each stage
    STAGES.forEach((s, i) => {
      setTimeout(() => {
        if (!running) return;
        status.textContent = s.label;
        count.textContent = s.count;
        count.classList.remove("bump", "ignite");
        // restart animation
        void count.offsetWidth;
        count.classList.add("bump");
        if (s.phase === "ignite") {
          count.classList.add("ignite");
          overlay.classList.add("flash");
          window.LFAudio.beep({ freq: 1320, dur: 0.5, type: "sawtooth", vol: 0.22 });
          window.LFAudio.rumble({ dur: 4 });
          flame.classList.add("intense");
          rocket.classList.add("shaking");
          spawnSmoke(stage);
          document.body.classList.add("shake");
          setTimeout(() => document.body.classList.remove("shake"), 400);
        } else if (s.phase === "liftoff") {
          count.classList.add("ignite");
          overlay.classList.remove("flash");
          rocket.classList.remove("shaking");
          rocket.classList.add("launching");
          spawnSmoke(stage);
          window.LFAudio.chord([523, 659, 784], { dur: 0.8, type: "triangle", vol: 0.12 });
          window.LFAudio.rumble({ dur: 2.5 });
        } else {
          window.LFAudio.beep({ freq: 880, dur: 0.18, type: "sine", vol: 0.18 });
        }
        setTelemetry(telemetryFrames[i] || telemetryFrames[telemetryFrames.length - 1]);
      }, s.t);
    });

    // Wrap up
    setTimeout(() => {
      overlay.classList.remove("active");
      // Reset rocket after the overlay fades
      setTimeout(() => {
        rocket.classList.remove("launching");
        flame.classList.remove("intense");
        running = false;
        // Smooth scroll to manifest
        const target = document.getElementById("index");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    }, total);
  }

  return { start };
})();
