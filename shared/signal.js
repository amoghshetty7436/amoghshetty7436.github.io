/* Synthetic rainforest spectrogram: background noise, elephant rumbles (harmonic stacks,
   ~12-25 Hz fundamental) and occasional gunshots (broadband clicks). Optional overlay draws
   detector boxes. Used by the Signal hero, the ELP story page and work-card thumbnails. */
(function () {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MAG = [[0,0,4],[28,16,68],[79,18,123],[129,37,129],[181,54,122],[229,80,100],[251,135,97],[254,194,135],[252,253,191]];
  function cmap(v) {
    v = Math.max(0, Math.min(.999, v)) * (MAG.length - 1);
    const i = v | 0, f = v - i, a = MAG[i], b = MAG[i + 1];
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
  }

  function Spectro(canvas, overlay, opts) {
    opts = Object.assign({ cols: 240, bins: 150, minX: 0, step: 1, onEvent: null, colors: { rumble: "#f7a35c", gunshot: "#ff5d5d", ink: "#120c08" }, font: "600 12px monospace" }, opts || {});
    const W = opts.cols, H = opts.bins;
    canvas.width = W; canvas.height = H;
    const x = canvas.getContext("2d"), col = x.createImageData(1, H);
    const o = overlay ? overlay.getContext("2d") : null;
    let n = 0, ev = [], cur = null, next = 30, visible = true, frame = 0;
    const scale = H / 150; // keep rumble frequencies consistent at any bin count

    function sizeOverlay() {
      if (!overlay) return;
      const r = overlay.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
      overlay.width = Math.max(1, r.width * d); overlay.height = Math.max(1, r.height * d);
      o.setTransform(d, 0, 0, d, 0, 0);
    }

    function tick() {
      x.drawImage(canvas, -1, 0);
      if (!cur && n >= next) {
        const g = Math.random() < .22;
        cur = { s: n, len: g ? 3 : 60 + Math.random() * 50 | 0, g, f0: 9 + Math.random() * 5, top: 0, conf: (g ? .95 : .86) + Math.random() * .05 };
        ev.push(cur); next = n + cur.len + 35 + Math.random() * 70;
        if (opts.onEvent) opts.onEvent(cur);
      }
      for (let y = 0; y < H; y++) {
        const f = (H - 1 - y) / scale;
        let v = .07 + Math.random() * .1 + .22 * Math.exp(-f / 14);
        if (cur) {
          const p = (n - cur.s) / cur.len;
          if (cur.g) v += .75 * Math.exp(-(n - cur.s) * .9) * (.6 + .4 * Math.random());
          else {
            const env = Math.sin(Math.PI * p), f0 = cur.f0 + 5 * Math.sin(Math.PI * p);
            for (let k = 1; k <= 4; k++) v += env * .85 / Math.pow(k, .8) * Math.exp(-((f - k * f0) ** 2) / 4.5);
            cur.top = Math.max(cur.top, 4 * (cur.f0 + 5) + 6);
          }
        }
        const c = cmap(v), i = y * 4;
        col.data[i] = c[0]; col.data[i + 1] = c[1]; col.data[i + 2] = c[2]; col.data[i + 3] = 255;
      }
      x.putImageData(col, W - 1, 0);
      if (cur && n - cur.s >= cur.len) { cur.e = n; cur = null; }
      ev = ev.filter(e => W - 1 - (n - (e.e ?? n)) > -40);
      n++;
    }

    function drawBoxes() {
      if (!o) return;
      const cw = overlay.getBoundingClientRect().width, ch = overlay.getBoundingClientRect().height;
      const sx = cw / W, sy = ch / H;
      o.clearRect(0, 0, cw, ch); o.font = opts.font; o.lineWidth = 2;
      ev.forEach(e => {
        const x1 = (W - 1 - (n - e.s)) * sx, x2 = (W - (n - (e.e ?? n))) * sx;
        if (x2 < cw * (typeof opts.minX === "function" ? opts.minX() : opts.minX)) return;
        const top = e.g ? 8 : ch - (e.top || 10) * scale * sy;
        const c = e.g ? opts.colors.gunshot : opts.colors.rumble;
        o.strokeStyle = c; o.strokeRect(x1, top, x2 - x1, ch - top - 4);
        const lab = (e.g ? "gunshot " : "rumble ") + e.conf.toFixed(2);
        const tw = o.measureText(lab).width + 10;
        o.fillStyle = c; o.fillRect(x1 - 1, Math.max(0, top - 20), tw, 20);
        o.fillStyle = opts.colors.ink; o.fillText(lab, x1 + 4, Math.max(14, top - 6));
      });
    }

    function loop() {
      if (visible && frame++ % opts.step === 0) { tick(); drawBoxes(); }
      requestAnimationFrame(loop);
    }

    x.fillStyle = "#000"; x.fillRect(0, 0, W, H);
    for (let i = 0; i < W; i++) tick();
    sizeOverlay(); drawBoxes();
    if (overlay) addEventListener("resize", () => { sizeOverlay(); drawBoxes(); });
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(canvas);
    if (!RM) requestAnimationFrame(loop);
    this.tick = tick;
  }

  /* Pitched-up audio for rumbles and gunshots. Real rumbles sit around 12-25 Hz, below
     what laptop speakers can play, so they are shifted up 8x. */
  function RumbleAudio() {
    let ctx = null, on = false;
    this.toggle = function () {
      on = !on;
      if (on && !ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx && on) ctx.resume();
      return on;
    };
    this.play = function (e) {
      if (!on || !ctx) return;
      const t = ctx.currentTime, dur = e.len / 60;
      if (e.g) {
        const b = ctx.createBuffer(1, ctx.sampleRate * .4, ctx.sampleRate), d = b.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * .03));
        const s = ctx.createBufferSource(), g = ctx.createGain(); g.gain.value = .5;
        s.buffer = b; s.connect(g).connect(ctx.destination); s.start(t);
        return;
      }
      const osc = ctx.createOscillator(), lp = ctx.createBiquadFilter(), g = ctx.createGain();
      osc.type = "sawtooth"; lp.type = "lowpass"; lp.frequency.value = 520;
      const base = e.f0 * 1.33 * 8, curve = new Float32Array(32);
      for (let i = 0; i < 32; i++) curve[i] = base + 5 * 1.33 * 8 * Math.sin(Math.PI * i / 31);
      osc.frequency.setValueCurveAtTime(curve, t, dur);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.18, t + dur * .3); g.gain.linearRampToValueAtTime(0, t + dur);
      osc.connect(lp).connect(g).connect(ctx.destination); osc.start(t); osc.stop(t + dur + .05);
    };
  }

  window.Spectro = Spectro;
  window.RumbleAudio = RumbleAudio;
})();
