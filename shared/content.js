/* Single source of content for both versions. Edit text here, not in the pages. */
window.SITE = {
  name: "Amogh Shetty",
  role: "ML / Computer Vision Engineer",
  blurb: "I build vision and audio models that hold up on real sensor data, not just benchmarks.",
  email: "avs97@cornell.edu",
  links: [
    ["GitHub", "https://github.com/amoghshetty7436"],
    ["LinkedIn", "https://linkedin.com/in/amoghv"]
  ],
  about: [
    "I'm an MEng student in Computer Science at <b>Cornell</b> and a research assistant at the <b>Elephant Listening Project</b>, where I'm building detectors for forest-elephant rumbles and poachers' gunshots in rainforest audio.",
    "Before Cornell I spent six months at <b>IIT Bombay</b> turning high-speed boiling footage into measurements. That work became <b>three papers</b>, including two in Elsevier journals. I also built real-time baggage tracking for an airport startup and reviewed an AI platform for <b>Hungama</b>.",
    "The thread through all of it: take a messy physical signal, build the dataset when none exists, and ship a model that someone can actually use."
  ],
  experience: [
    { when: "Oct 2026 to now", role: "Research Assistant", org: "Elephant Listening Project, Cornell", story: "elp",
      text: "Deep-learning acoustic monitoring for endangered forest elephants. Benchmarking rumble detectors and bioacoustic foundation models (AVES) on 24-hour recordings, and building a training pipeline over terabytes of audio.",
      tags: ["PyTorch", "AVES", "Bioacoustics", "Rumble + gunshot detection"] },
    { when: "May to Jul 2026", role: "Intern, AI Team", org: "Hungama Digital Media",
      text: "In-house technical reviewer for an AI creator-intelligence platform built by an outsourced team. Turned SRS requirements into test criteria and validated artist metrics with SQL, BI dashboards and API checks. Reported to the Founder and MD.",
      tags: ["SQL", "BI dashboards", "API testing"] },
    { when: "Jan to Jun 2025", role: "Research Intern", org: "IIT Bombay", story: "iitb",
      text: "Two-stage ML pipeline for vapor-bubble segmentation and regression. Compared 7 segmentation models across 3 loss functions (0.982 IoU), and derived a Divergence-theorem bubble volume with 0.48% error.",
      tags: ["DeepLabV3+", "Segmentation", "Differential Evolution"] },
    { when: "Nov 2024 to Jan 2025", role: "Machine Learning Intern", org: "Cooper Compass", story: "cooper",
      text: "Real-time baggage tracking on airport conveyor video with YOLOv8 + ByteTrack, tag and damage detection, and cross-camera re-identification with TransReID.",
      tags: ["YOLOv8", "ByteTrack", "TransReID"] },
    { when: "Jun to Aug 2024", role: "Frontend Developer Intern", org: "Bristlecone",
      text: "Built the admin site for Mahindra's TMW Rise platform in React end to end, then handed it to a senior developer to extend.",
      tags: ["React", "JavaScript"] }
  ],
  work: [
    { id: "iitb", wide: true, kicker: "IIT Bombay · 2025", title: "Seeing vapor bubbles in boiling flow",
      text: "Automated what researchers used to threshold by hand: segmentation, 3D volume and empirical correlations for flow boiling.",
      stat: "0.982 IoU · 0.48% volume error · 3 papers", thumb: "bubble" },
    { id: "cooper", kicker: "Cooper Compass · 2024", title: "Tracking every bag on the belt",
      text: "YOLOv8 + ByteTrack on existing CCTV, with re-ID across cameras.", stat: "Same ID in every camera", thumb: "bags" },
    { id: "elp", kicker: "Cornell · now", title: "Listening for forest elephants",
      text: "Rumble and gunshot detection in 24-hour rainforest recordings.", stat: "Terabytes of audio", thumb: "spectro" },
    { id: "ftxgb", kicker: "Team project · 2025 to 2026", title: "FTXGB-Net: aerosols from orbit",
      text: "FT-Transformer + XGBoost retrieving four aerosol properties from MODIS.", stat: "R > 0.97 on all 4 targets", thumb: "scatter" },
    { id: "nutriscan", kicker: "IBM Hackathon · 2025", title: "NutriScan",
      text: "Spotting nutritional deficiencies from eye, nail and dental photos.", stat: "95.3% across 12 classes", thumb: "nutri" }
  ],
  papers: [
    { yr: "2026", t: "Data-driven Empirical Correlation Framework for Full-Cycle Vapor Bubble Dynamics in Nucleate Flow Boiling",
      a: "Mohd Moiz, <b>Amogh Shetty</b>, Atul Srivastava", v: "Applied Thermal Engineering (Elsevier)", doi: "10.1016/j.applthermaleng.2026.129873" },
    { yr: "2026", t: "Two-Stage Machine Learning Framework for Investigating Vapor Bubble Dynamics in Nucleate Flow Boiling",
      a: "Mohd Moiz, <b>Amogh Shetty</b>, Atul Srivastava", v: "AI Thermal Fluids (Elsevier)", doi: "10.1016/j.aitf.2026.100031" },
    { yr: "2025", t: "Evaluation of Deep Learning Models for Vapor Bubble Segmentation in Nucleate Flow Boiling",
      a: "<b>Amogh Shetty</b>, Mohd Moiz, Varsha Hole, Atul Srivastava", v: "IHMTC 2025", doi: "10.1615/IHMTC-2025.1600" }
  ],
  education: [
    ["Cornell University", "MEng, Computer Science", "2026 to 2027"],
    ["Sardar Patel Institute of Technology, Mumbai", "BTech, CSE (Data Science) · CGPA 9.20 / 10", "2022 to 2026"]
  ]
};

(function () {
  const S = window.SITE;
  const nav = [["about", "About"], ["experience", "Experience"], ["work", "Work"], ["papers", "Papers"], ["contact", "Contact"]];

  function thumb(kind) {
    if (kind === "bubble") return `<img src="assets/figures/bubble-raw.jpg" alt="High-speed frame of vapor bubbles on a heated wall in upward flow"><img class="swap" src="assets/figures/bubble-mask.jpg" alt="">`;
    if (kind === "spectro") return `<canvas data-spectro width="200" height="110" aria-label="Animated spectrogram"></canvas>`;
    if (kind === "bags") {
      let g = "";
      [[30, 120, 70, 44, 1, 1], [140, 112, 86, 52, 2, 1], [262, 118, 64, 46, 3, 0]].forEach(([x, y, w, h, id, tag]) => {
        const c = tag ? "var(--accent)" : "#ff5d6c";
        g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="#3a3f47"/>` +
             (tag ? `<rect x="${x + w - 10}" y="${y + 6}" width="6" height="16" fill="#f4d03f"/>` : "") +
             `<rect x="${x - 4}" y="${y - 6}" width="${w + 8}" height="${h + 10}" fill="none" stroke="${c}" stroke-width="2"/>` +
             `<rect x="${x - 5}" y="${y - 20}" width="${tag ? 60 : 70}" height="14" fill="${c}"/>` +
             `<text x="${x - 1}" y="${y - 10}" font-family="monospace" font-size="9" fill="#111">id:${id} ${tag ? "bag" : "no_tag"}</text>`;
      });
      return `<svg viewBox="0 0 360 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="360" height="225" fill="#15171b"/><rect y="164" width="360" height="40" fill="#24272c"/><line x1="200" y1="20" x2="200" y2="210" stroke="#555" stroke-dasharray="4 4"/><text x="150" y="30" font-family="monospace" font-size="9" fill="#777">CAM 2</text><text x="206" y="30" font-family="monospace" font-size="9" fill="#777">CAM 3</text>${g}</svg>`;
    }
    if (kind === "scatter") {
      let d = "", r = 7;
      for (let i = 0; i < 140; i++) { r = (r * 9301 + 49297) % 233280; const u = r / 233280; r = (r * 9301 + 49297) % 233280; const v = r / 233280 - .5;
        const x = 30 + u * 300, y = 195 - u * 170 + v * 26; d += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="var(--accent)" opacity=".7"/>`; }
      return `<svg viewBox="0 0 360 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="360" height="225" fill="#14161a"/><line x1="30" y1="195" x2="330" y2="25" stroke="#666" stroke-dasharray="4 4"/>${d}<text x="30" y="214" font-family="monospace" font-size="9" fill="#888">AERONET AOD</text><text x="270" y="40" font-family="monospace" font-size="9" fill="#888">R &gt; 0.97</text></svg>`;
    }
    if (kind === "nutri") {
      return `<svg viewBox="0 0 360 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="360" height="225" fill="#14161a"/>` +
        ["eye", "nail", "teeth"].map((t, i) => `<circle cx="${80 + i * 100}" cy="105" r="34" fill="none" stroke="var(--accent)" stroke-width="1.5" opacity="${1 - i * .2}"/><circle cx="${80 + i * 100}" cy="105" r="${12 + i * 4}" fill="var(--accent)" opacity=".18"/><text x="${80 + i * 100}" y="168" text-anchor="middle" font-family="monospace" font-size="11" fill="#999">${t}</text>`).join("") +
        `<text x="180" y="200" text-anchor="middle" font-family="monospace" font-size="10" fill="#777">MobileNetV2 · 12 categories</text></svg>`;
    }
    return "";
  }

  const html = `
  <div class="container"><div class="split">
    <aside class="rail">
      <h2 class="name">${S.name}</h2>
      <div class="role">${S.role}</div>
      <p class="blurb">${S.blurb}</p>
      <nav aria-label="Sections">${nav.map(([id, l]) => `<a href="#${id}" data-spy="${id}">${l}</a>`).join("")}</nav>
      <div class="soc">${S.links.slice(0, 2).map(([l, h]) => `<a href="${h}" target="_blank" rel="noopener">${l} ↗</a>`).join("")}<a href="#contact">Email</a></div>
    </aside>
    <div class="main">
      <section id="about"><h3 class="sec-label">About</h3><div class="prose">${S.about.map(p => `<p>${p}</p>`).join("")}</div></section>
      <section id="experience"><h3 class="sec-label">Experience</h3><div class="entries">
        ${S.experience.map(e => `<${e.story ? `a href="work/${e.story}.html"` : "div"} class="entry">
          <div class="when">${e.when}</div>
          <div><h4>${e.role} <span class="org">· ${e.org}</span></h4><p>${e.text}</p>
          <div class="tags">${e.tags.map(t => `<span>${t}</span>`).join("")}</div>
          ${e.story ? `<span class="more">Read the story →</span>` : ""}</div>
        </${e.story ? "a" : "div"}>`).join("")}
      </div></section>
      <section id="work"><h3 class="sec-label">Selected work</h3><div class="cards">
        ${S.work.map(w => `<a class="card${w.wide ? " wide" : ""}" href="work/${w.id}.html">
          <div class="thumb">${thumb(w.thumb)}</div>
          <div class="body"><span class="kicker">${w.kicker}</span><h4>${w.title}</h4><p>${w.text}</p><span class="stat">${w.stat}</span></div>
        </a>`).join("")}
      </div></section>
      <section id="papers"><h3 class="sec-label">Publications</h3><ol class="pubs">
        ${S.papers.map(p => `<li><a href="https://doi.org/${p.doi}" target="_blank" rel="noopener"><span class="yr">${p.yr}</span><span><div class="t">${p.t}</div><div class="v">${p.a} · <i>${p.v}</i> · DOI ↗</div></span></a></li>`).join("")}
      </ol>
      <h3 class="sec-label" style="margin-top:64px">Education</h3>
      <div class="edu">${S.education.map(([s, d, y]) => `<div><span><b>${s}</b><br><span>${d}</span></span><span class="yr">${y}</span></div>`).join("")}</div>
      </section>
      <section id="contact" class="contact"><h3 class="sec-label">Contact</h3>
        <h3>Let's build something that sees.</h3>
        <p>I'm looking for ML and computer vision engineering roles starting 2027. The fastest way to reach me is email.</p>
        <div class="mailrow"><span class="mail" id="mail">${S.email}</span><button class="btn" type="button" id="copy">Copy email</button>
        ${S.links.slice(0, 2).map(([l, h]) => `<a class="btn ghost" href="${h}" target="_blank" rel="noopener">${l} ↗</a>`).join("")}</div>
      </section>
      <footer class="foot"><span>© 2026 Amogh Vijay Shetty</span><span>Ithaca, NY</span></footer>
    </div>
  </div></div>`;

  const mount = document.getElementById("body");
  mount.innerHTML = html;

  // card thumb hover: raw frame -> predicted mask
  const style = document.createElement("style");
  style.textContent = ".card .thumb .swap{opacity:0;transition:opacity .5s}.card:hover .thumb .swap,.card:focus-visible .thumb .swap{opacity:1}";
  document.head.appendChild(style);

  // copy email
  const btn = document.getElementById("copy");
  btn.addEventListener("click", () => {
    const done = () => { btn.textContent = "Copied"; setTimeout(() => btn.textContent = "Copy email", 1600); };
    const sel = () => { const r = document.createRange(); r.selectNodeContents(document.getElementById("mail")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = "Selected, press ⌘C"; };
    try { navigator.clipboard.writeText(S.email).then(done, sel); } catch (e) { sel(); }
  });

  // scrollspy
  const links = [...mount.querySelectorAll("[data-spy]")];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("on", a.dataset.spy === e.target.id));
  }), { rootMargin: "-40% 0px -55% 0px" });
  nav.forEach(([id]) => io.observe(document.getElementById(id)));

  // spectrogram thumbs
  if (window.Spectro) mount.querySelectorAll("[data-spectro]").forEach(c => new Spectro(c, null, { cols: 200, bins: 110 }));
})();
