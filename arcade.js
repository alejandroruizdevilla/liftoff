window.Arcade = (function () {
  const tt = (k, v) => (window.I18n ? window.I18n.t(k, v) : k);

  const BEST_LANDER = "liftoff_arcade_lander_best";
  const BEST_SLING = "liftoff_arcade_sling_best";

  function cssVar(name, fallback) {
    const v = getComputedStyle(document.body).getPropertyValue(name).trim();
    return v || fallback;
  }

  let openId = null;
  let game = null; // { stop() } of the running game

  function best(key) {
    const v = parseInt(localStorage.getItem(key) || "", 10);
    return Number.isFinite(v) ? v : null;
  }
  function saveBest(key, value, lowerIsBetter) {
    const b = best(key);
    if (b === null || (lowerIsBetter ? value < b : value > b)) {
      localStorage.setItem(key, String(value));
      renderCardBests();
      return true;
    }
    return false;
  }

  function renderCardBests() {
    const bl = document.getElementById("bestLander");
    const bs = document.getElementById("bestSling");
    const l = best(BEST_LANDER), s = best(BEST_SLING);
    if (bl) { bl.hidden = l === null; bl.textContent = l === null ? "" : tt("arcade.best") + " · " + l; }
    if (bs) { bs.hidden = s === null; bs.textContent = s === null ? "" : tt("arcade.best") + " · " + s + " 🚀"; }
  }

  // ---------- modal shell ----------
  function open(id) {
    if (openId === id) return;
    if (game) { game.stop(); game = null; }
    openId = id;
    const modal = document.getElementById("arcadeModal");
    modal.innerHTML = `
      <div class="quiz-backdrop" data-close></div>
      <div class="quiz-panel arcade-panel" role="dialog" aria-modal="true">
        <button class="quiz-close" data-close>${tt("game.close")} ✕</button>
        <div class="quiz-head">
          <div class="quiz-eyebrow">${tt(id === "lander" ? "arcade.lander.name" : "arcade.sling.name")}</div>
        </div>
        <canvas class="arcade-canvas" id="arcadeCanvas" width="820" height="520"></canvas>
        <div class="arcade-bar">
          <span class="arcade-hint" data-hint>${tt(id === "lander" ? "game.hint.lander" : "game.hint.sling")}</span>
          <div class="arcade-actions">
            <button class="btn" data-retry hidden><span data-retry-label>${tt("game.retry")}</span> <span class="arrow">↻</span></button>
            <button class="btn primary" data-next hidden><span data-next-label>${tt("game.next")}</span> <span class="arrow">→</span></button>
          </div>
        </div>
        ${id === "lander" ? `
        <div class="lander-controls">
          <button class="lander-btn" data-ctl="left" aria-label="rotate left">◀</button>
          <button class="lander-btn thrust" data-ctl="up" aria-label="thrust">▲</button>
          <button class="lander-btn" data-ctl="right" aria-label="rotate right">▶</button>
        </div>` : ""}
      </div>
    `;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    modal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", () => {
      if (window.LFAudio) window.LFAudio.click();
      if (location.hash.startsWith("#/arcade")) history.pushState(null, "", "#");
      close();
    }));

    const canvas = modal.querySelector("#arcadeCanvas");
    game = (id === "lander" ? startLander : startSling)(canvas, modal);
    if (window.LFAudio) { window.LFAudio.resume(); window.LFAudio.click(); }
  }

  function close() {
    if (!openId) return;
    openId = null;
    if (game) { game.stop(); game = null; }
    const modal = document.getElementById("arcadeModal");
    modal.classList.remove("active");
    modal.innerHTML = "";
    document.body.style.overflow = "";
  }

  // ==================================================================
  // LUNAR LANDER
  // ==================================================================
  function startLander(canvas, modal) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const CYAN = cssVar("--cyan", "#5ae0ff"), ORANGE = cssVar("--orange", "#ff6a1f");
    const GREEN = cssVar("--green", "#6effa8"), RED = cssVar("--red", "#ff5570");
    const INK = cssVar("--ink", "#eef2ff"), DIM = cssVar("--ink-dim", "#8a93c2");

    const G = 24, THRUST = 64, ROT = 2.8, FUEL_BURN = 13;
    const stars = Array.from({ length: 70 }, () => ({ x: Math.random() * W, y: Math.random() * H * 0.7, r: Math.random() * 1.3 + 0.3 }));

    let terrain, padX0, padX1, padY, ship, over, raf = 0, last = 0;
    const keys = { left: false, right: false, up: false };

    function reset() {
      // random-walk terrain with one flat, highlighted pad
      terrain = [];
      const seg = 41, step = W / (seg - 1);
      let y = H * (0.72 + Math.random() * 0.1);
      const padStart = 8 + Math.floor(Math.random() * (seg - 16));
      for (let i = 0; i < seg; i++) {
        if (i > padStart && i <= padStart + 3) { terrain.push({ x: i * step, y: terrain[i - 1].y }); continue; }
        y += (Math.random() - 0.5) * 66;
        y = Math.max(H * 0.55, Math.min(H * 0.93, y));
        terrain.push({ x: i * step, y });
      }
      padX0 = terrain[padStart].x; padX1 = terrain[padStart + 3].x; padY = terrain[padStart].y;
      ship = { x: W * 0.12, y: 64, vx: 26, vy: 0, a: 0, fuel: 100 };
      over = null;
      setButtons();
    }

    function heightAt(x) {
      const step = W / (terrain.length - 1);
      const i = Math.max(0, Math.min(terrain.length - 2, Math.floor(x / step)));
      const t = (x - terrain[i].x) / step;
      return terrain[i].y + (terrain[i + 1].y - terrain[i].y) * t;
    }

    function setButtons() {
      const retry = modal.querySelector("[data-retry]");
      retry.hidden = !over;
      modal.querySelector("[data-next]").hidden = true;
    }

    function finish() {
      const onPad = ship.x >= padX0 + 6 && ship.x <= padX1 - 6;
      const soft = Math.abs(ship.vx) < 16 && ship.vy < 26 && Math.abs(ship.a) < 0.3;
      if (onPad && soft) {
        const score = Math.round(ship.fuel * 8 + 200 + Math.max(0, 26 - ship.vy) * 6);
        const isBest = saveBest(BEST_LANDER, score, false);
        over = { key: "game.landed", good: true, score, isBest };
        if (window.LFAudio) window.LFAudio.beep && window.LFAudio.beep({ freq: 880, dur: 0.15, vol: 0.2 });
      } else {
        over = { key: onPad ? "game.hard" : "game.crash", good: false };
      }
      setButtons();
    }

    function tick(ts) {
      const dt = Math.min(0.04, (ts - last) / 1000 || 0.016);
      last = ts;
      if (!over) {
        if (keys.left) ship.a -= ROT * dt;
        if (keys.right) ship.a += ROT * dt;
        ship.a = Math.max(-1.4, Math.min(1.4, ship.a));
        const thrusting = keys.up && ship.fuel > 0;
        if (thrusting) {
          ship.vx += Math.sin(ship.a) * THRUST * dt;
          ship.vy -= Math.cos(ship.a) * THRUST * dt;
          ship.fuel = Math.max(0, ship.fuel - FUEL_BURN * dt);
        }
        ship.vy += G * dt;
        ship.x += ship.vx * dt;
        ship.y += ship.vy * dt;
        if (ship.x < 8) { ship.x = 8; ship.vx = Math.abs(ship.vx) * 0.4; }
        if (ship.x > W - 8) { ship.x = W - 8; ship.vx = -Math.abs(ship.vx) * 0.4; }
        if (ship.y < 12) { ship.y = 12; ship.vy = Math.max(0, ship.vy); }
        if (ship.y + 13 >= heightAt(ship.x)) { ship.y = heightAt(ship.x) - 13; finish(); }
      }
      draw(keys.up && ship.fuel > 0 && !over);
      raf = requestAnimationFrame(tick);
    }

    function draw(thrusting) {
      ctx.fillStyle = "#04060f";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(238,242,255,0.7)";
      stars.forEach(s => { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill(); });

      // terrain
      ctx.beginPath();
      ctx.moveTo(0, H);
      terrain.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = "#0d1230";
      ctx.fill();
      ctx.strokeStyle = "rgba(140,170,255,0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // pad
      ctx.strokeStyle = GREEN;
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(padX0, padY); ctx.lineTo(padX1, padY); ctx.stroke();
      ctx.fillStyle = GREEN;
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("▼", (padX0 + padX1) / 2, padY - 26 + Math.sin(Date.now() / 300) * 4);

      // ship
      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(ship.a);
      if (thrusting) {
        ctx.fillStyle = ORANGE;
        ctx.beginPath();
        ctx.moveTo(-4, 13);
        ctx.lineTo(0, 24 + Math.random() * 8);
        ctx.lineTo(4, 13);
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillStyle = INK;
      ctx.beginPath(); ctx.moveTo(0, -13); ctx.lineTo(9, 8); ctx.lineTo(-9, 8); ctx.closePath(); ctx.fill();
      ctx.fillStyle = CYAN;
      ctx.beginPath(); ctx.arc(0, -2, 3.4, 0, 7); ctx.fill();
      ctx.strokeStyle = INK; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-7, 8); ctx.lineTo(-11, 13); ctx.moveTo(7, 8); ctx.lineTo(11, 13); ctx.stroke();
      ctx.restore();

      // HUD (drawn in-canvas so it re-translates automatically)
      ctx.textAlign = "left";
      ctx.font = "12px 'JetBrains Mono', monospace";
      const vs = ship.vy * 0.5, hs = ship.vx * 0.5, alt = Math.max(0, (heightAt(ship.x) - ship.y - 13) * 0.5);
      ctx.fillStyle = DIM;
      ctx.fillText(tt("game.fuel"), 16, 24);
      ctx.fillText(tt("game.vspeed"), 16, 44);
      ctx.fillText(tt("game.hspeed"), 16, 64);
      ctx.fillText(tt("game.alt"), 16, 84);
      ctx.fillStyle = ship.fuel < 25 ? RED : INK;
      ctx.fillRect(90, 16, ship.fuel * 1.1, 8);
      ctx.strokeStyle = DIM; ctx.lineWidth = 1; ctx.strokeRect(90, 16, 110, 8);
      ctx.fillStyle = Math.abs(vs) > 13 ? RED : GREEN;
      ctx.fillText(vs.toFixed(1) + " m/s", 90, 44);
      ctx.fillStyle = Math.abs(hs) > 8 ? RED : GREEN;
      ctx.fillText(hs.toFixed(1) + " m/s", 90, 64);
      ctx.fillStyle = INK;
      ctx.fillText(Math.round(alt) + " m", 90, 84);

      if (over) {
        ctx.fillStyle = "rgba(4,6,15,0.72)";
        ctx.fillRect(0, 0, W, H);
        ctx.textAlign = "center";
        ctx.font = "700 26px 'JetBrains Mono', monospace";
        ctx.fillStyle = over.good ? GREEN : RED;
        ctx.fillText(tt(over.key), W / 2, H / 2 - 14);
        if (over.good) {
          ctx.font = "16px 'JetBrains Mono', monospace";
          ctx.fillStyle = INK;
          ctx.fillText(tt("game.score") + " · " + over.score + (over.isBest ? " ★" : ""), W / 2, H / 2 + 22);
        }
      }
    }

    // input
    const onKeyDown = e => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", " ", "Spacebar"].includes(e.key)) e.preventDefault();
      if (e.key === "ArrowLeft") keys.left = true;
      if (e.key === "ArrowRight") keys.right = true;
      if (e.key === "ArrowUp" || e.key === " " || e.key === "Spacebar") keys.up = true;
    };
    const onKeyUp = e => {
      if (e.key === "ArrowLeft") keys.left = false;
      if (e.key === "ArrowRight") keys.right = false;
      if (e.key === "ArrowUp" || e.key === " " || e.key === "Spacebar") keys.up = false;
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    modal.querySelectorAll(".lander-btn").forEach(b => {
      const k = b.dataset.ctl;
      const down = e => { e.preventDefault(); keys[k] = true; };
      const up = () => { keys[k] = false; };
      b.addEventListener("pointerdown", down);
      b.addEventListener("pointerup", up);
      b.addEventListener("pointerleave", up);
      b.addEventListener("pointercancel", up);
    });
    modal.querySelector("[data-retry]").addEventListener("click", () => {
      if (window.LFAudio) window.LFAudio.click();
      reset();
    });

    reset();
    raf = requestAnimationFrame(tick);
    return { stop() { cancelAnimationFrame(raf); document.removeEventListener("keydown", onKeyDown); document.removeEventListener("keyup", onKeyUp); } };
  }

  // ==================================================================
  // GRAVITY SLINGSHOT
  // ==================================================================
  function startSling(canvas, modal) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const CYAN = cssVar("--cyan", "#5ae0ff"), ORANGE = cssVar("--orange", "#ff6a1f");
    const GREEN = cssVar("--green", "#6effa8"), RED = cssVar("--red", "#ff5570");
    const INK = cssVar("--ink", "#eef2ff"), DIM = cssVar("--ink-dim", "#8a93c2");

    const LEVELS = [
      { planets: [{ x: 0.50, y: 0.55, r: 24, m: 360000 }], target: { x: 0.85, y: 0.28, r: 26 }, start: { x: 0.12, y: 0.72 } },
      { planets: [{ x: 0.40, y: 0.30, r: 20, m: 280000 }, { x: 0.62, y: 0.72, r: 24, m: 360000 }], target: { x: 0.88, y: 0.46, r: 24 }, start: { x: 0.10, y: 0.50 } },
      { planets: [{ x: 0.50, y: 0.50, r: 34, m: 680000 }], target: { x: 0.50, y: 0.13, r: 22 }, start: { x: 0.10, y: 0.82 } },
      { planets: [{ x: 0.55, y: 0.26, r: 18, m: 260000 }, { x: 0.55, y: 0.74, r: 18, m: 260000 }], target: { x: 0.90, y: 0.50, r: 22 }, start: { x: 0.08, y: 0.50 } },
      { planets: [{ x: 0.35, y: 0.60, r: 22, m: 340000 }, { x: 0.60, y: 0.28, r: 22, m: 340000 }, { x: 0.78, y: 0.68, r: 18, m: 240000 }], target: { x: 0.92, y: 0.16, r: 20 }, start: { x: 0.08, y: 0.85 } }
    ];
    const stars = Array.from({ length: 80 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + 0.3 }));

    let level = 0, launches = 0, probe = null, dragging = null, over = null, won = false, raf = 0, last = 0;

    function L() {
      const l = LEVELS[level];
      return {
        planets: l.planets.map(p => ({ x: p.x * W, y: p.y * H, r: p.r, m: p.m })),
        target: { x: l.target.x * W, y: l.target.y * H, r: l.target.r },
        start: { x: l.start.x * W, y: l.start.y * H }
      };
    }

    function setButtons() {
      modal.querySelector("[data-retry]").hidden = !(over && !won);
      modal.querySelector("[data-next]").hidden = !(won && level < LEVELS.length - 1);
    }

    function accel(p, planets) {
      let ax = 0, ay = 0;
      for (const pl of planets) {
        const dx = pl.x - p.x, dy = pl.y - p.y;
        const r2 = Math.max(180, dx * dx + dy * dy);
        const a = pl.m / r2, r = Math.sqrt(r2);
        ax += a * dx / r; ay += a * dy / r;
      }
      return [ax, ay];
    }

    function step(p, planets, dt) {
      const sub = 3, h = dt / sub;
      for (let i = 0; i < sub; i++) {
        const [ax, ay] = accel(p, planets);
        p.vx += ax * h; p.vy += ay * h;
        p.x += p.vx * h; p.y += p.vy * h;
      }
    }

    function advance(lv) {
      // one fixed 1/60 s physics step with its own collision checks
      step(probe, lv.planets, 1 / 60);
      probe.trail.push({ x: probe.x, y: probe.y });
      if (probe.trail.length > 240) probe.trail.shift();
      probe.t += 1 / 60;
      const near = (x, y, r) => (probe.x - x) ** 2 + (probe.y - y) ** 2 < r * r;
      if (near(lv.target.x, lv.target.y, lv.target.r)) {
        won = true;
        over = { key: level === LEVELS.length - 1 ? "game.complete" : "game.hit", good: true };
        if (level === LEVELS.length - 1) { over.total = launches; over.isBest = saveBest(BEST_SLING, launches, true); }
        setButtons();
      } else if (lv.planets.some(pl => near(pl.x, pl.y, pl.r + 4)) ||
                 probe.x < -70 || probe.x > W + 70 || probe.y < -70 || probe.y > H + 70 || probe.t > 22) {
        over = { key: "game.lost", good: false };
        setButtons();
      }
    }

    function tick(ts) {
      // fixed-timestep accumulator: physics stays wall-clock even when
      // rAF is throttled, and collisions are checked every substep
      const dt = Math.min(0.5, (ts - last) / 1000 || 1 / 60);
      last = ts;
      const lv = L();
      if (probe && !over) {
        const steps = Math.max(1, Math.round(dt * 60));
        for (let i = 0; i < steps && probe && !over; i++) advance(lv);
      }
      draw(lv);
      raf = requestAnimationFrame(tick);
    }

    function draw(lv) {
      ctx.fillStyle = "#04060f";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(238,242,255,0.65)";
      stars.forEach(s => { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill(); });

      // target ring
      const pulse = 1 + Math.sin(Date.now() / 260) * 0.08;
      ctx.strokeStyle = GREEN; ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.arc(lv.target.x, lv.target.y, lv.target.r * pulse, 0, 7); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = GREEN;
      ctx.beginPath(); ctx.arc(lv.target.x, lv.target.y, 3, 0, 7); ctx.fill();

      // planets
      for (const pl of lv.planets) {
        const g = ctx.createRadialGradient(pl.x - pl.r * 0.3, pl.y - pl.r * 0.3, pl.r * 0.2, pl.x, pl.y, pl.r);
        g.addColorStop(0, "#3a4470"); g.addColorStop(1, "#171d3d");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(pl.x, pl.y, pl.r, 0, 7); ctx.fill();
        ctx.strokeStyle = "rgba(140,170,255,0.4)"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(pl.x, pl.y, pl.r, 0, 7); ctx.stroke();
      }

      // launcher
      ctx.strokeStyle = ORANGE; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(lv.start.x, lv.start.y, 10, 0, 7); ctx.stroke();

      // drag preview: short physics-simulated dotted path
      if (dragging) {
        const vx = (lv.start.x - dragging.x) * 3.1, vy = (lv.start.y - dragging.y) * 3.1;
        const sim = { x: lv.start.x, y: lv.start.y, vx, vy };
        ctx.fillStyle = CYAN;
        for (let i = 0; i < 64; i++) {
          step(sim, lv.planets, 1 / 50);
          if (i % 4 === 0) { ctx.beginPath(); ctx.arc(sim.x, sim.y, 1.6, 0, 7); ctx.fill(); }
        }
        ctx.strokeStyle = "rgba(255,106,31,0.7)"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(lv.start.x, lv.start.y); ctx.lineTo(dragging.x, dragging.y); ctx.stroke();
      }

      // probe + trail
      if (probe) {
        ctx.fillStyle = "rgba(90,224,255,0.5)";
        probe.trail.forEach((p, i) => {
          if (i % 3 === 0) { ctx.globalAlpha = i / probe.trail.length; ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, 7); ctx.fill(); }
        });
        ctx.globalAlpha = 1;
        ctx.fillStyle = CYAN;
        ctx.beginPath(); ctx.arc(probe.x, probe.y, 5, 0, 7); ctx.fill();
      }

      // HUD
      ctx.textAlign = "left";
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.fillStyle = DIM;
      ctx.fillText(tt("game.level"), 16, 24);
      ctx.fillText(tt("game.launches"), 16, 44);
      ctx.fillStyle = INK;
      ctx.fillText((level + 1) + " / " + LEVELS.length, 120, 24);
      ctx.fillText(String(launches), 120, 44);

      if (over) {
        ctx.fillStyle = "rgba(4,6,15,0.6)";
        ctx.fillRect(0, 0, W, H);
        ctx.textAlign = "center";
        ctx.font = "700 26px 'JetBrains Mono', monospace";
        ctx.fillStyle = over.good ? GREEN : RED;
        ctx.fillText(tt(over.key), W / 2, H / 2 - 14);
        if (over.total !== undefined) {
          ctx.font = "16px 'JetBrains Mono', monospace";
          ctx.fillStyle = INK;
          ctx.fillText(tt("game.launches") + " · " + over.total + (over.isBest ? " ★" : ""), W / 2, H / 2 + 22);
        }
      }
    }

    function canvasPoint(e) {
      const r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) };
    }
    const onDown = e => {
      if (won) return;
      const p = canvasPoint(e);
      const s = L().start;
      if ((p.x - s.x) ** 2 + (p.y - s.y) ** 2 < 65 * 65) {
        dragging = p;
        if (over && !won) over = null; // re-aim after a lost probe
        setButtons();
        try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
        e.preventDefault();
      }
    };
    const onMove = e => { if (dragging) dragging = canvasPoint(e); };
    const onUp = e => {
      if (!dragging) return;
      if (e && e.clientX !== undefined) dragging = canvasPoint(e);
      const s = L().start;
      const vx = (s.x - dragging.x) * 3.1, vy = (s.y - dragging.y) * 3.1;
      dragging = null;
      if (Math.hypot(vx, vy) < 24) return; // too weak — treat as cancel
      probe = { x: s.x, y: s.y, vx, vy, trail: [], t: 0 };
      launches++;
      over = null;
      setButtons();
      if (window.LFAudio) window.LFAudio.click();
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.style.touchAction = "none";

    modal.querySelector("[data-retry]").addEventListener("click", () => {
      if (window.LFAudio) window.LFAudio.click();
      probe = null; over = null; setButtons();
    });
    modal.querySelector("[data-next]").addEventListener("click", () => {
      if (window.LFAudio) window.LFAudio.click();
      level++; probe = null; over = null; won = false; setButtons();
    });

    raf = requestAnimationFrame(tick);
    return { stop() { cancelAnimationFrame(raf); } };
  }

  // ---------- wiring ----------
  document.addEventListener("keydown", e => {
    if (openId && e.key === "Escape") {
      if (location.hash.startsWith("#/arcade")) history.pushState(null, "", "#");
      close();
    }
  });

  document.addEventListener("i18n:change", () => {
    renderCardBests();
    const modal = document.getElementById("arcadeModal");
    if (!openId || !modal) return;
    // canvas text re-translates itself each frame; refresh the DOM bits
    const hint = modal.querySelector("[data-hint]");
    if (hint) hint.textContent = tt(openId === "lander" ? "game.hint.lander" : "game.hint.sling");
    const r = modal.querySelector("[data-retry-label]"); if (r) r.textContent = tt("game.retry");
    const n = modal.querySelector("[data-next-label]"); if (n) n.textContent = tt("game.next");
    const c = modal.querySelector(".quiz-close"); if (c) c.textContent = tt("game.close") + " ✕";
    const eye = modal.querySelector(".quiz-eyebrow");
    if (eye) eye.textContent = tt(openId === "lander" ? "arcade.lander.name" : "arcade.sling.name");
  });

  renderCardBests();

  return { open, close, isOpen: () => !!openId };
})();
