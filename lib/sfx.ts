// Tiny Web Audio synth for subtle UI sound effects — no audio files needed.
// Sounds only play when enabled (user opt-in via the navbar speaker toggle).

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = false;
let lastHover = 0;

type Win = Window & { webkitAudioContext?: typeof AudioContext };

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as Win).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
  }
  // Browsers start the context suspended until a user gesture.
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

/** Resume/create the audio context on a user gesture so later sounds can play. */
export function primeAudio() {
  getCtx();
}

export function setSoundEnabled(v: boolean) {
  enabled = v;
  if (v) getCtx();
}

export function isSoundEnabled() {
  return enabled;
}

type BlipOpts = {
  freq: number;
  dur: number;
  gain: number;
  type?: OscillatorType;
  slideTo?: number;
};

function blip({ freq, dur, gain, type = "sine", slideTo }: BlipOpts) {
  const c = getCtx();
  if (!c || !master) return;

  const fire = () => {
    if (!c || !master) return;
    const osc = c.createOscillator();
    const g = c.createGain();
    // Start a hair in the future so nothing is scheduled "in the past" right
    // after the context resumes (which would silently drop the sound).
    const now = c.currentTime + 0.001;

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), now + dur);
    }

    // Quick attack, exponential decay — a soft, short blip.
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(gain, now + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    osc.connect(g).connect(master!);
    osc.start(now);
    osc.stop(now + dur + 0.03);
  };

  // The context can still be suspended on the very first interaction; resume
  // first, then play, so the sound isn't dropped.
  if (c.state === "suspended") {
    c.resume().then(fire).catch(() => {});
  } else {
    fire();
  }
}

// A filtered-noise "swoosh" — a band of noise whose center frequency sweeps,
// used for slide/transition interactions.
function swoosh({
  dur,
  gain,
  from,
  to,
}: {
  dur: number;
  gain: number;
  from: number;
  to: number;
}) {
  const c = getCtx();
  if (!c || !master) return;
  const fire = () => {
    if (!c || !master) return;
    const now = c.currentTime + 0.001;
    const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const src = c.createBufferSource();
    src.buffer = buf;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 1.1;
    bp.frequency.setValueAtTime(from, now);
    bp.frequency.exponentialRampToValueAtTime(to, now + dur);

    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(gain, now + dur * 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    src.connect(bp).connect(g).connect(master);
    src.start(now);
    src.stop(now + dur + 0.02);
  };
  if (c.state === "suspended") c.resume().then(fire).catch(() => {});
  else fire();
}

/** Light "tick" on hover, throttled so fast mouse moves don't spam it. */
export function playHover() {
  if (!enabled) return;
  const now = typeof performance !== "undefined" ? performance.now() : Date.now();
  if (now - lastHover < 70) return;
  lastHover = now;
  blip({ freq: 1900, dur: 0.02, gain: 0.05, type: "sine" });
}

/** Crisp "pop" on click. */
export function playClick() {
  if (!enabled) return;
  blip({ freq: 520, slideTo: 300, dur: 0.055, gain: 0.16, type: "triangle" });
}

/** Short, soft "swish" for the projects filter pill snapping between options. */
export function playSlide() {
  if (!enabled) return;
  swoosh({ dur: 0.13, gain: 0.05, from: 1400, to: 2300 });
}

/** Rising whoosh matching a fill-/underline-sweep button animation. */
export function playSweep() {
  if (!enabled) return;
  swoosh({ dur: 0.22, gain: 0.07, from: 280, to: 2200 });
}

/** Quick up-blip matching a vertical text-swap (nav links). */
export function playFlip() {
  if (!enabled) return;
  blip({ freq: 820, slideTo: 1320, dur: 0.045, gain: 0.07, type: "triangle" });
}

let lastMove = 0;
/**
 * Subtle grain tied to cursor speed — makes the hero's custom pointer feel
 * tactile/draggable as it moves. `speed` is pixels moved since the last event.
 */
export function playMove(speed: number) {
  if (!enabled) return;
  const now = typeof performance !== "undefined" ? performance.now() : Date.now();
  if (now - lastMove < 90) return;
  lastMove = now;
  const s = Math.min(1, speed / 45);
  if (s < 0.08) return; // ignore tiny jitters
  blip({ freq: 320 + s * 680, dur: 0.018, gain: 0.012 + s * 0.028, type: "sine" });
}
