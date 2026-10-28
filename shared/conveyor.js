/* Conveyor-belt tracking demo: bags get YOLO-style boxes with persistent IDs, missing
   tags are flagged, and IDs survive the hand-off between two cameras (re-ID).
   Used by the HUD hero and the Cooper Compass story page. Canvas fills its CSS box. */
(function () {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const BAGS = ["#3b4a5a", "#6e2f33", "#2f4f3a", "#5a4a2f", "#4a3b5a", "#25272b", "#5b6470"];

  function Conveyor(canvas, opts) {
    opts = Object.assign({ ok: "#5ef2d6", bad: "#ff4f6a", ink: "#0c0d0c", belt: "#2b302d", stripe: "#3a403c", rail: "#151816", label: "#8a948c", font: '600 11px monospace', speed: 1.4 }, opts || {});
    const x = canvas.getContext("2d");
    let w = 0, h = 0, bags = [], id = 6, n = 0, off = 0, visible = true;

    function size() {
      const r = canvas.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height; canvas.width = w * d; canvas.height = h * d; x.setTransform(d, 0, 0, d, 0, 0);
    }
    function spawn() {
      const k = Math.min(1, h / 230), bw = (70 + Math.random() * 60) * k;
      bags.push({ x: -bw - 10, w: bw, h: (48 + Math.random() * 30) * k, c: BAGS[Math.random() * BAGS.length | 0], id: id++, tag: Math.random() > .25, conf: .86 + Math.random() * .12 });
    }
    function tick() {
      const belt = h * .55, beltH = h * .36, cut = w * .52;
      if (n % Math.round(150 / opts.speed) === 0) spawn();
      n++; off = (off + opts.speed) % 40;
      x.clearRect(0, 0, w, h);
      x.fillStyle = opts.belt; x.fillRect(0, belt, w, beltH);
      x.strokeStyle = opts.stripe; x.lineWidth = 2;
      for (let i = -40; i < w + 40; i += 40) { x.beginPath(); x.moveTo(i + off, belt); x.lineTo(i + off - 20, belt + beltH); x.stroke(); }
      x.fillStyle = opts.rail; x.fillRect(0, belt + beltH - 4, w, h - belt - beltH + 4);
      x.setLineDash([6, 6]); x.strokeStyle = opts.label; x.lineWidth = 1;
      x.beginPath(); x.moveTo(cut, 8); x.lineTo(cut, h - 8); x.stroke(); x.setLineDash([]);
      x.font = opts.font; x.fillStyle = opts.label;
      x.fillText("CAM 02", cut - 58, 20); x.fillText("CAM 03", cut + 10, 20);
      bags.forEach(b => {
        b.x += opts.speed;
        const y = belt + beltH * .55 - b.h;
        x.fillStyle = b.c; x.beginPath(); x.roundRect ? x.roundRect(b.x, y, b.w, b.h, 8) : x.rect(b.x, y, b.w, b.h); x.fill();
        x.strokeStyle = "rgba(0,0,0,.45)"; x.lineWidth = 4;
        x.beginPath(); x.moveTo(b.x + b.w * .35, y); x.lineTo(b.x + b.w * .35, y - 11); x.lineTo(b.x + b.w * .65, y - 11); x.lineTo(b.x + b.w * .65, y); x.stroke();
        if (b.tag) { x.fillStyle = "#f4d03f"; x.fillRect(b.x + b.w - 12, y + 8, 7, 20); }
        const c = b.tag ? opts.ok : opts.bad;
        x.strokeStyle = c; x.lineWidth = 2; x.strokeRect(b.x - 4, y - 16, b.w + 8, b.h + 18);
        const lab = "id:" + b.id + (b.tag ? " bag " : " no_tag ") + b.conf.toFixed(2) + (b.x > cut ? " re-id ✓" : "");
        const tw = x.measureText(lab).width + 10;
        x.fillStyle = c; x.fillRect(b.x - 5, y - 34, tw, 18); x.fillStyle = opts.ink; x.fillText(lab, b.x, y - 21);
      });
      bags = bags.filter(b => b.x < w + 20);
    }
    function loop() { if (visible) tick(); requestAnimationFrame(loop); }

    size(); addEventListener("resize", size);
    for (let i = 0; i < 700; i++) tick();
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(canvas);
    if (!RM) requestAnimationFrame(loop);
  }
  window.Conveyor = Conveyor;
})();
