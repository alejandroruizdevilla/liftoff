window.Quiz = (function () {
  const t = (k) => (window.I18n ? window.I18n.t(k) : k);

  const QUESTIONS = [
    {
      key: "budget",
      i18nKey: "quiz.q1",
      options: [
        { key: "free",   i18n: "quiz.q1.free" },
        { key: "either", i18n: "quiz.q1.either" },
        { key: "paid",   i18n: "quiz.q1.paid" }
      ]
    },
    {
      key: "kind",
      i18nKey: "quiz.q2",
      options: [
        { key: "model", i18n: "quiz.q2.model" },
        { key: "space", i18n: "quiz.q2.space" },
        { key: "both",  i18n: "quiz.q2.both" }
      ]
    },
    {
      key: "level",
      i18nKey: "quiz.q3",
      options: [
        { key: "new",    i18n: "quiz.q3.new" },
        { key: "some",   i18n: "quiz.q3.some" },
        { key: "expert", i18n: "quiz.q3.expert" }
      ]
    }
  ];

  function score(sim, a) {
    let s = 0;
    const reasons = [];

    // Budget
    if (a.budget === "free") {
      if (sim.tags.includes("free")) { s += 4; reasons.push("free"); }
      else s -= 6;
    } else if (a.budget === "paid") {
      if (!sim.tags.includes("free")) { s += 1; }
    } // either: neutral

    // Kind
    if (a.kind === "model") {
      if (sim.tags.includes("model")) { s += 5; reasons.push("model rocketry"); }
      else s -= 2;
    } else if (a.kind === "space") {
      if (sim.tags.includes("space")) { s += 5; reasons.push("spaceflight"); }
      else s -= 2;
    } else { // both
      if (sim.tags.includes("model") || sim.tags.includes("space")) s += 2;
    }

    // Level — favour ease vs. depth
    const easy = sim.ratings.accessibility + sim.ratings.learningCurve;
    const deep = sim.ratings.realism + sim.ratings.depth;
    if (a.level === "new")    s += easy * 0.6 - deep * 0.1;
    if (a.level === "some")   s += (easy + deep) * 0.3;
    if (a.level === "expert") s += deep * 0.6 - easy * 0.1;

    // Quality nudge so high-star sims edge out otherwise-tied options
    s += (sim.stars - 3) * 0.4;

    return { score: s, reasons };
  }

  function recommend(answers) {
    const ranked = window.SIMS
      .map(sim => ({ sim, ...score(sim, answers) }))
      .sort((a, b) => b.score - a.score);
    return ranked;
  }

  const state = {
    open: false,
    step: 0,
    answers: {}
  };

  function reset() {
    state.step = 0;
    state.answers = {};
  }

  function open() {
    state.open = true;
    reset();
    render();
    document.getElementById("quizModal").classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function close() {
    state.open = false;
    document.getElementById("quizModal").classList.remove("active");
    document.body.style.overflow = "";
  }

  function pick(qKey, optKey) {
    state.answers[qKey] = optKey;
    if (window.LFAudio) window.LFAudio.click();
    if (state.step < QUESTIONS.length - 1) {
      state.step++;
      render();
    } else {
      renderResult();
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function render() {
    const modal = document.getElementById("quizModal");
    const q = QUESTIONS[state.step];
    const progress = ((state.step + 1) / QUESTIONS.length) * 100;
    modal.innerHTML = `
      <div class="quiz-backdrop" data-close></div>
      <div class="quiz-panel" role="dialog" aria-modal="true">
        <button class="quiz-close" data-close>${t("quiz.close")} ✕</button>
        <div class="quiz-head">
          <div class="quiz-eyebrow">${t("quiz.title")}</div>
          <div class="quiz-sub">${t("quiz.sub")}</div>
          <div class="quiz-progress"><div class="quiz-progress-fill" style="width:${progress}%"></div></div>
          <div class="quiz-step">Q ${state.step + 1} / ${QUESTIONS.length}</div>
        </div>
        <h3 class="quiz-question">${t(q.i18nKey)}</h3>
        <div class="quiz-options">
          ${q.options.map(o => `
            <button class="quiz-opt" data-pick data-q="${q.key}" data-opt="${o.key}">
              <span class="quiz-opt-dot"></span>
              <span>${t(o.i18n)}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
    wire(modal);
  }

  function renderResult() {
    const modal = document.getElementById("quizModal");
    const ranked = recommend(state.answers);
    const top = ranked[0];
    const runners = ranked.slice(1, 3);
    const sim = top.sim;
    const why = top.reasons.length
      ? top.reasons.join(" · ")
      : "best overall fit";
    modal.innerHTML = `
      <div class="quiz-backdrop" data-close></div>
      <div class="quiz-panel quiz-result" role="dialog" aria-modal="true">
        <button class="quiz-close" data-close>${t("quiz.close")} ✕</button>
        <div class="quiz-head">
          <div class="quiz-eyebrow">${t("quiz.result")}</div>
        </div>
        <div class="quiz-pick">
          <div class="quiz-pick-glyph">${sim.glyph || "🚀"}</div>
          <div class="quiz-pick-body">
            <h3>${escapeHtml(sim.name)}</h3>
            <div class="quiz-pick-tag">${escapeHtml(sim.tagline)}</div>
            <p class="quiz-pick-desc">${escapeHtml(sim.shortDesc)}</p>
            <div class="quiz-pick-why"><strong>${t("quiz.why")}:</strong> ${escapeHtml(why)}</div>
            <div class="quiz-actions">
              <a class="btn primary" href="#/sim/${sim.id}" data-close-after>
                <span>${t("quiz.open")}</span><span class="arrow">→</span>
              </a>
              <button class="btn" data-retake>
                <span>${t("quiz.retake")}</span><span class="arrow">↻</span>
              </button>
            </div>
          </div>
        </div>
        ${runners.length ? `
          <div class="quiz-runners">
            <div class="quiz-runners-label">${t("quiz.runners")}</div>
            ${runners.map(r => `
              <a class="quiz-runner" href="#/sim/${r.sim.id}" data-close-after>
                <span class="quiz-runner-glyph">${r.sim.glyph || "🚀"}</span>
                <span class="quiz-runner-body">
                  <span class="quiz-runner-name">${escapeHtml(r.sim.name)}</span>
                  <span class="quiz-runner-tag">${escapeHtml(r.sim.tagline)}</span>
                </span>
              </a>
            `).join("")}
          </div>
        ` : ""}
      </div>
    `;
    wire(modal);
  }

  function wire(modal) {
    modal.querySelectorAll("[data-close]").forEach(el => {
      el.addEventListener("click", () => {
        // Closing the quiz also clears the #/quiz route
        if (location.hash.startsWith("#/quiz")) history.pushState(null, "", "#");
        close();
      });
    });
    modal.querySelectorAll("[data-pick]").forEach(el => {
      el.addEventListener("click", () => pick(el.dataset.q, el.dataset.opt));
    });
    modal.querySelectorAll("[data-retake]").forEach(el => {
      el.addEventListener("click", () => {
        if (window.LFAudio) window.LFAudio.click();
        reset();
        render();
      });
    });
    modal.querySelectorAll("[data-close-after]").forEach(el => {
      el.addEventListener("click", () => {
        // Allow the link navigation to happen, then close
        setTimeout(close, 50);
      });
    });
  }

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (state.open && e.key === "Escape") {
      if (location.hash.startsWith("#/quiz")) history.pushState(null, "", "#");
      close();
    }
  });

  // Re-render on language change if open
  document.addEventListener("i18n:change", () => {
    if (state.open) render();
  });

  return { open, close, isOpen: () => state.open };
})();
