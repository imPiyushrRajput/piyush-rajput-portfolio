// Web Audio synth for UI sound effects — no audio files needed.
// Sounds only play when enabled (user opt-in via the navbar speaker toggle).
//
// Signal chain for a richer, "HD" feel:
//   sources -> master gain -> compressor -> [ dry -> destination,
//                                             reverb(convolver) -> wet -> destination ]

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let busReady = false;
let enabled = false;
let lastHover = 0;

type Win = Window & { webkitAudioContext?: typeof AudioContext };

// A short synthesized impulse response (decaying noise) for a plate-like reverb.
function makeImpulse(c: AudioContext, duration: number, decay: number) {
  const rate = c.sampleRate;
  const len = Math.max(1, Math.floor(rate * duration));
  const buf = c.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
  }
  return buf;
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as Win).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();

    master = ctx.createGain();
    master.gain.value = 1.0;

    // Gentle bus compression — evens things out and adds perceived loudness.
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -20;
    comp.knee.value = 24;
    comp.ratio.value = 3;
    comp.attack.value = 0.003;
    comp.release.value = 0.2;

    // Make-up gain after compression (the compressor has no auto-makeup, so it
    // otherwise just lowers the level). This is the main loudness control.
    const makeup = ctx.createGain();
    makeup.gain.value = 3.2;

    const dry = ctx.createGain();
    dry.gain.value = 1.0;

    const reverb = ctx.createConvolver();
    reverb.buffer = makeImpulse(ctx, 0.5, 2.4);
    const wet = ctx.createGain();
    wet.gain.value = 0.3;

    master.connect(comp);
    comp.connect(makeup);
    makeup.connect(dry).connect(ctx.destination);
    makeup.connect(reverb).connect(wet).connect(ctx.destination);
    busReady = true;
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

function whenReady(c: AudioContext, fire: () => void) {
  if (c.state === "suspended") c.resume().then(fire).catch(() => {});
  else fire();
}

type BlipOpts = {
  freq: number;
  dur: number;
  gain: number;
  type?: OscillatorType;
  slideTo?: number;
  /** Add a quieter octave layer for a fuller, "HD" body. */
  rich?: boolean;
};

function blip({ freq, dur, gain, type = "sine", slideTo, rich }: BlipOpts) {
  const c = getCtx();
  if (!c || !master || !busReady) return;

  const fire = () => {
    if (!c || !master) return;
    const now = c.currentTime + 0.001;

    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(gain, now + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    g.connect(master!);

    const voices: Array<[number, OscillatorType, number]> = [[freq, type, 1]];
    if (rich) {
      voices.push([freq * 2, "sine", 0.4]); // octave shimmer
      voices.push([freq * 0.5, "sine", 0.5]); // sub body
    }

    for (const [f, t, mul] of voices) {
      const osc = c.createOscillator();
      const og = c.createGain();
      og.gain.value = mul;
      osc.type = t;
      osc.frequency.setValueAtTime(f, now);
      if (slideTo) {
        osc.frequency.exponentialRampToValueAtTime(
          Math.max(1, slideTo * (f / freq)),
          now + dur
        );
      }
      osc.connect(og).connect(g);
      osc.start(now);
      osc.stop(now + dur + 0.03);
    }
  };

  whenReady(c, fire);
}

// A filtered-noise "swoosh" — a band of noise whose center frequency sweeps.
function swoosh({
  dur,
  gain,
  from,
  to,
  q = 1.1,
}: {
  dur: number;
  gain: number;
  from: number;
  to: number;
  q?: number;
}) {
  const c = getCtx();
  if (!c || !master || !busReady) return;
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
    bp.Q.value = q;
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
  whenReady(c, fire);
}

/** Light "tick" on hover, throttled so fast mouse moves don't spam it. */
export function playHover() {
  if (!enabled) return;
  const now = typeof performance !== "undefined" ? performance.now() : Date.now();
  if (now - lastHover < 70) return;
  lastHover = now;
  blip({ freq: 1900, dur: 0.03, gain: 0.14, type: "sine" });
}

/** Crisp, full "pop" on click. */
export function playClick() {
  if (!enabled) return;
  blip({ freq: 520, slideTo: 300, dur: 0.07, gain: 0.34, type: "triangle", rich: true });
}

/** Short, soft "swish" for the projects filter pill snapping between options. */
export function playSlide() {
  if (!enabled) return;
  swoosh({ dur: 0.14, gain: 0.26, from: 1200, to: 2400, q: 0.9 });
}

/** Rising whoosh matching a fill-/underline-sweep button animation. */
export function playSweep() {
  if (!enabled) return;
  swoosh({ dur: 0.24, gain: 0.3, from: 260, to: 2300 });
}

/** Quick up-blip matching a vertical text-swap (nav links). */
export function playFlip() {
  if (!enabled) return;
  blip({ freq: 820, slideTo: 1320, dur: 0.05, gain: 0.22, type: "triangle", rich: true });
}

/**
 * Expanding, reverberant sweep for the theme-switch circular reveal — rises
 * when brightening (to light), falls when darkening (to dark).
 */
export function playTheme(toLight: boolean) {
  if (!enabled) return;
  if (toLight) {
    swoosh({ dur: 0.36, gain: 0.2, from: 320, to: 2600, q: 0.8 });
    blip({ freq: 330, slideTo: 680, dur: 0.34, gain: 0.14, type: "sine", rich: true });
  } else {
    swoosh({ dur: 0.36, gain: 0.2, from: 2600, to: 320, q: 0.8 });
    blip({ freq: 680, slideTo: 300, dur: 0.34, gain: 0.14, type: "sine", rich: true });
  }
}

let lastMove = 0;
/**
 * Velocity-based "drag" texture — short filtered-noise grains whose pitch and
 * loudness rise with cursor speed, so the hero's custom pointer feels tactile
 * and draggable. `speed` is roughly pixels moved per frame.
 */
export function playMove(speed: number) {
  if (!enabled) return;
  const now = typeof performance !== "undefined" ? performance.now() : Date.now();
  if (now - lastMove < 60) return;
  lastMove = now;
  const s = Math.min(1, speed / 55);
  if (s < 0.1) return; // ignore tiny jitters
  swoosh({
    dur: 0.05,
    gain: 0.05 + s * 0.14,
    from: 400 + s * 900,
    to: 900 + s * 1800,
    q: 2.2,
  });
}
