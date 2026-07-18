window.LFAudio = (function () {
  let ctx = null;
  let muted = localStorage.getItem("liftoff_muted") === "1";
  let volume = parseFloat(localStorage.getItem("liftoff_volume"));
  if (Number.isNaN(volume) || volume < 0 || volume > 1) volume = 1;
  let masterGain = null;

  function effective() { return muted ? 0 : volume; }

  function ensure() {
    if (ctx) return ctx;
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    masterGain = ctx.createGain();
    masterGain.gain.value = effective();
    masterGain.connect(ctx.destination);
    return ctx;
  }

  function resume() {
    ensure();
    if (ctx && ctx.state === "suspended") ctx.resume();
  }

  function applyGain() {
    if (!masterGain) return;
    masterGain.gain.cancelScheduledValues(ctx.currentTime);
    masterGain.gain.setValueAtTime(effective(), ctx.currentTime);
  }

  function setMuted(m) {
    muted = !!m;
    localStorage.setItem("liftoff_muted", muted ? "1" : "0");
    applyGain();
  }

  function setVolume(v) {
    volume = Math.max(0, Math.min(1, Number(v) || 0));
    localStorage.setItem("liftoff_volume", String(volume));
    applyGain();
  }

  function isMuted() { return muted; }
  function getVolume() { return volume; }

  function beep({ freq = 880, dur = 0.18, type = "sine", vol = 0.18, attack = 0.005 } = {}) {
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(masterGain);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  function click() {
    beep({ freq: 1400, dur: 0.04, type: "square", vol: 0.05 });
  }

  function chord(freqs, opts = {}) {
    freqs.forEach(f => beep({ ...opts, freq: f }));
  }

  // Big rumble for ignition: low-passed noise, boomy sub bass.
  function rumble({ dur = 4.5 } = {}) {
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;

    // White noise buffer
    const buffer = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1);
    }

    const noise = c.createBufferSource();
    noise.buffer = buffer;

    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(80, t);
    lp.frequency.exponentialRampToValueAtTime(220, t + 0.4);
    lp.frequency.exponentialRampToValueAtTime(140, t + dur);

    const noiseGain = c.createGain();
    noiseGain.gain.setValueAtTime(0.0001, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.7, t + 0.25);
    noiseGain.gain.linearRampToValueAtTime(0.5, t + dur * 0.7);
    noiseGain.gain.linearRampToValueAtTime(0, t + dur);

    noise.connect(lp).connect(noiseGain).connect(masterGain);
    noise.start(t);
    noise.stop(t + dur);

    // Sub bass thump
    const sub = c.createOscillator();
    sub.type = "sine";
    sub.frequency.setValueAtTime(45, t);
    sub.frequency.linearRampToValueAtTime(35, t + dur);
    const subGain = c.createGain();
    subGain.gain.setValueAtTime(0.0001, t);
    subGain.gain.exponentialRampToValueAtTime(0.4, t + 0.4);
    subGain.gain.linearRampToValueAtTime(0, t + dur);
    sub.connect(subGain).connect(masterGain);
    sub.start(t);
    sub.stop(t + dur);
  }

  return { resume, setMuted, setVolume, isMuted, getVolume, beep, click, chord, rumble };
})();
