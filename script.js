(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const mqReduce = matchMedia("(prefers-reduced-motion: reduce)");
  const reduce = () => mqReduce.matches;
  const root = document.documentElement;
  const I = window.I18N;
  const ui = () => I.ui;

  /* ---------- Tema (claro / oscuro, respeta el sistema) ---------- */
  const meta = $('meta[name="theme-color"]');
  const paintTheme = t => { root.dataset.theme = t; meta && (meta.content = t === "light" ? "#f5f8f6" : "#0b0f0d"); };
  const setTheme = (t, x, y) => {
    const go = () => { paintTheme(t); try { localStorage.setItem("theme", t); } catch {} };
    if (document.startViewTransition && !reduce()) {
      root.style.setProperty("--tx", (x ?? innerWidth) + "px"); root.style.setProperty("--ty", (y ?? 0) + "px");
      document.startViewTransition(go);
    } else go();
  };
  const curTheme = () => root.dataset.theme === "light" ? "light" : "dark";
  paintTheme(curTheme());
  $("#theme").addEventListener("click", e => {
    const r = e.currentTarget.getBoundingClientRect();
    setTheme(curTheme() === "light" ? "dark" : "light", r.left + r.width / 2, r.top + r.height / 2);
  });
  matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => {
    let s = null; try { s = localStorage.getItem("theme"); } catch {}
    if (!s) paintTheme(e.matches ? "light" : "dark");
  });
  $("#lang").addEventListener("click", () => I.toggle());

  /* ---------- Nav ---------- */
  const nav = $("#nav"), burger = $("#burger"), links = $("#links"), bar = $("#progress");
  burger.addEventListener("click", () => { const o = links.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
  $$("#links a").forEach(a => a.addEventListener("click", () => { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }));
  const tl = $(".timeline");
  const onScroll = () => {
    nav.classList.toggle("scrolled", scrollY > 10);
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
    if (tl) { const r = tl.getBoundingClientRect(); tl.style.setProperty("--tl", Math.max(0, Math.min(100, ((innerHeight * .65 - r.top) / r.height) * 100)) + "%"); }
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) $$("#links a[href^='#']").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => spy.observe(s));

  /* ---------- Glow que sigue al mouse + spotlight en tarjetas ---------- */
  if (matchMedia("(hover: hover)").matches && !reduce()) {
    const glow = $("#glow");
    addEventListener("pointermove", e => {
      glow.style.setProperty("--gx", e.clientX + "px"); glow.style.setProperty("--gy", e.clientY + "px");
      const c = e.target.closest?.(".project, .col, .c-card");
      if (c) { const r = c.getBoundingClientRect(); c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px"); }
    }, { passive: true });
  }

  /* ---------- Reveal escalonado ---------- */
  $$(".stg").forEach(g => [...g.children].forEach((c, i) => c.style.setProperty("--i", Math.min(i, 14))));
  const rev = new IntersectionObserver((es, o) => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in"); o.unobserve(e.target);
    if (e.target.classList.contains("stg")) setTimeout(() => e.target.classList.add("done"), 1500);
  }), { threshold: 0.08 });
  $$(".reveal, .timeline li").forEach(el => rev.observe(el));

  /* ---------- Typing (se reinicia al cambiar de idioma) ---------- */
  const typed = $("#typed"); let typeTimer, typeRun = 0;
  const startTyping = () => {
    clearTimeout(typeTimer); const id = ++typeRun, roles = ui().roles;
    if (reduce()) { typed.textContent = roles[0]; return; }
    let r = 0, c = 0, del = false;
    const tick = () => {
      if (id !== typeRun) return;
      const w = roles[r]; typed.textContent = w.slice(0, c);
      if (!del && c === w.length) { del = true; return typeTimer = setTimeout(tick, 1600); }
      if (del && c === 0) { del = false; r = (r + 1) % roles.length; return typeTimer = setTimeout(tick, 350); }
      c += del ? -1 : 1; typeTimer = setTimeout(tick, del ? 35 : 75);
    };
    tick();
  };

  /* ---------- Contadores ---------- */
  new IntersectionObserver((es, o) => es.forEach(e => {
    if (!e.isIntersecting) return; o.unobserve(e.target);
    $$("b[data-count]", e.target).forEach(b => {
      const to = parseFloat(b.dataset.count), dec = +(b.dataset.decimals || 0), suf = b.dataset.suffix || "";
      if (reduce()) { b.textContent = to.toFixed(dec) + suf; return; }
      const t0 = performance.now();
      const step = t => { const p = Math.min((t - t0) / 1400, 1); b.textContent = (to * (1 - Math.pow(1 - p, 4))).toFixed(dec) + (p === 1 ? suf : ""); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }), { threshold: 0.5 }).observe($("#stats"));

  /* ---------- Íconos del stack: si el ícono de marca no carga, uso uno genérico ---------- */
  $$("#chips img.ico").forEach(img => {
    const swap = () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "ico"); svg.setAttribute("aria-hidden", "true");
      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttribute("href", "#i-" + (img.dataset.fb || "code"));
      svg.appendChild(use); img.replaceWith(svg);
    };
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) swap();
    else img.addEventListener("error", swap, { once: true });
  });

  /* ---------- Filtro de stack (con animación) ---------- */
  $("#filters").addEventListener("click", e => {
    const btn = e.target.closest(".chip-btn"); if (!btn) return;
    $$(".chip-btn").forEach(b => { const on = b === btn; b.classList.toggle("active", on); b.setAttribute("aria-pressed", on); });
    const f = btn.dataset.f;
    $$("#chips li").forEach((li, i) => {
      const hide = f !== "all" && li.dataset.c !== f;
      if (hide && !li.classList.contains("off")) { li.classList.add("leaving"); setTimeout(() => { li.classList.add("off"); }, reduce() ? 0 : 220); }
      else if (!hide && li.classList.contains("off")) {
        li.classList.remove("off"); li.classList.add("leaving"); li.getBoundingClientRect();
        setTimeout(() => li.classList.remove("leaving"), 20 + i * 12);
      } else if (!hide) li.classList.remove("leaving");
    });
  });

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap"), lbCount = $("#lbCount");
  let group = [], idx = 0, lastFocus = null;
  const show = (i, anim) => {
    idx = (i + group.length) % group.length;
    const btn = group[idx], img = $("img", btn);
    const apply = () => {
      lbImg.src = btn.dataset.full; lbImg.alt = img.alt;
      const cap = btn.closest("figure")?.querySelector("figcaption");
      lbCap.textContent = cap ? cap.textContent : img.alt;
      lbCount.textContent = group.length > 1 ? `${idx + 1} / ${group.length}` : "";
      lbImg.classList.remove("swap");
    };
    if (anim && !reduce()) { lbImg.classList.add("swap"); setTimeout(apply, 180); } else apply();
    $("#lbPrev").style.display = $("#lbNext").style.display = group.length > 1 ? "" : "none";
    const nx = group[(idx + 1) % group.length]; if (nx) new Image().src = nx.dataset.full;
  };
  const open = btn => {
    group = $$(".shot", btn.closest("[data-gallery]") || btn.parentElement);
    lastFocus = btn; lb.hidden = false; document.body.style.overflow = "hidden";
    show(group.indexOf(btn)); $("#lbClose").focus();
  };
  const close = () => { lb.hidden = true; document.body.style.overflow = ""; lastFocus?.focus(); };
  $$(".shot").forEach(b => b.addEventListener("click", () => open(b)));
  $("#lbClose").addEventListener("click", close);
  $("#lbPrev").addEventListener("click", () => show(idx - 1, true));
  $("#lbNext").addEventListener("click", () => show(idx + 1, true));
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1, true);
    if (e.key === "ArrowRight") show(idx + 1, true);
    if (e.key === "Tab") { const f = $$("button", lb).filter(b => b.offsetParent); const i = f.indexOf(document.activeElement); e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus(); }
  });
  let sx = 0;
  lb.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
  lb.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50 && group.length > 1) show(idx + (dx < 0 ? 1 : -1), true); });

  /* ---------- CV según idioma ---------- */
  const cvHref = () => window.I18N.lang === "en" ? "CV-Franco-Ghiossi-EN.pdf" : "CV-Franco-Ghiossi.pdf";
  const setCv = () => $$("[data-cv]").forEach(a => { a.href = cvHref(); });
  setCv(); window.I18N.onChange(setCv);

  /* ---------- Servicios: el contador sale de la lista real ---------- */
  { const n = $$(".svc li").length, b = $("#stats li b"); if (n && b) b.dataset.count = n; }
  /* Con JS el contador arranca en 0 y anima al entrar en pantalla; sin JS (crawlers, vistas previas) el HTML ya trae el valor real */
  $$("#stats b[data-count]").forEach(b => { const to = parseFloat(b.dataset.count), dec = +(b.dataset.decimals || 0); b.textContent = reduce() ? to.toFixed(dec) + (b.dataset.suffix || "") : (0).toFixed(dec); });

  /* ---------- Formulario de contacto (el mail de destino vive en el servicio, no en el sitio) ---------- */
  const cform = $("#contactForm");
  if (cform) {
    const ep = cform.dataset.endpoint, status = $("#formStatus"), btn = cform.querySelector("button[type=submit]");
    if (ep) cform.hidden = false;
    cform.addEventListener("submit", async e => {
      e.preventDefault();
      if (!cform.checkValidity()) { cform.reportValidity(); return; }
      btn.disabled = true; status.className = "c-status"; status.textContent = ui().fSending;
      try {
        const res = await fetch(ep, { method: "POST", body: new FormData(cform), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(res.status);
        cform.reset(); status.classList.add("ok"); status.textContent = ui().fOk;
      } catch { status.classList.add("err"); status.textContent = ui().fErr; }
      finally { btn.disabled = false; }
    });
  }

  /* ---------- GitHub (con caché y fallback silencioso) ---------- */
  const USER = "francostefanodot06", cacheKey = "gh-repos-v1";
  let repos = [];
  const fill = () => $$("a[data-repo]").forEach(a => {
    const r = repos.find(x => x.name === a.dataset.repo); if (!r) return;
    const p = [];
    if (r.language) p.push(r.language);
    p.push("★ " + r.stargazers_count);
    if (r.pushed_at) p.push(ui().act + new Date(r.pushed_at).toLocaleDateString(ui().locale, { month: "short", year: "numeric" }));
    $(".repo-meta", a).textContent = p.join(" · ");
  });
  try { const c = JSON.parse(sessionStorage.getItem(cacheKey)); if (c) { repos = c; fill(); } } catch {}
  fetch(`https://api.github.com/users/${USER}/repos?per_page=100`).then(r => r.ok ? r.json() : Promise.reject())
    .then(r => { repos = r; fill(); try { sessionStorage.setItem(cacheKey, JSON.stringify(r)); } catch {} }).catch(() => {});

  /* ---------- Terminal ---------- */
  const body = $("#termBody"), form = $("#termForm"), input = $("#termCmd");
  const history = []; let hi = 0;
  const esc = s => s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const print = (html = "", cls = "") => { const d = document.createElement("span"); d.className = "ln " + cls; d.innerHTML = html; body.appendChild(d); body.scrollTop = body.scrollHeight; };
  const pad = (s, n) => s + " ".repeat(Math.max(1, n - s.length));
  const L = "https://www.linkedin.com/in/franco-stefano-ghiossi-hrebin-5951b534b/";
  const commands = {
    help: () => [`<span class="hl">${ui().helpTitle}</span>`, ...ui().help.map(([c, d]) => "  " + pad(c, 10) + " " + d)],
    whoami: () => [`<span class="ok">franco</span> · Franco Stefano Ghiossi Hrebin`, ...ui().whoami],
    stack: () => { const s = ui().stackL; return [
      `<span class="wn">${pad(s[0], 10)}</span> Java, Python, Bash, SQL, JS/TS, HTML/CSS, R`,
      `<span class="ok">${pad(s[1], 10)}</span> Linux, Proxmox, Docker, Ansible, Terraform, Tailscale`,
      `<span class="hl">${pad(s[2], 10)}</span> Prometheus, Grafana, Loki, Uptime Kuma, cAdvisor`,
      `<span class="hl">${pad(s[3], 10)}</span> Ollama, Open WebUI, FastAPI, SearXNG`]; },
    homelab: () => { const h = ui().hl; return [
      `<span class="hl">${pad(h[0], 11)}</span>Proxmox VE · Ryzen 7 2700X · 32 GB · RX 9060 XT 16 GB`,
      `<span class="hl">${pad(h[1], 11)}</span>Jellyfin, Immich, Navidrome, Vaultwarden, NPM, Portainer,`,
      `           Uptime Kuma, Excalidraw, Homepage, Ollama + Open WebUI, SearXNG`,
      `<span class="hl">${pad(h[2], 11)}</span>${ui().ups}`,
      `<span class="mu">→ <a href="#homelab">${ui().seeProject}</a></span>`]; },
    puck: () => [`<span class="ok">Puck</span> · SysAdmin middleware + local LLMs (Ollama)`, `Grafana → FastAPI → Ollama → Discord  |  Open WebUI tools → Proxmox API`, `<span class="mu">→ <a href="#puck">${ui().seeProject}</a></span>`],
    uptime: () => [["Proxmox VE", "100%"], ["Jellyfin", "100%"], ["Vaultwarden", "100%"], ["Immich", "99.93%"], ["Puck", "99.79%"]].map(([n, v]) => `<span class="ok">●</span> ${pad(n, 14)}<span class="mu">${v}</span>`).concat(`<span class="mu">${ui().uptimeNote}</span>`),
    fetch: () => [`<span class="ok">franco</span>@<span class="ok">homelab</span>`, `<span class="mu">─────────────────</span>`, `<span class="hl">OS</span>     Debian GNU/Linux 13`, `<span class="hl">Host</span>   Proxmox VE (LXC + Docker)`, `<span class="hl">CPU</span>    AMD Ryzen 7 2700X`, `<span class="hl">GPU</span>    Radeon RX 9060 XT 16 GB`, `<span class="hl">RAM</span>    32 GB DDR4`, `<span class="hl">Shell</span>  bash`],
    contact: () => [`mensaje   <a href="#contacto">${ui().formLine}</a>`, `linkedin  <a href="${L}" target="_blank" rel="noopener">franco-stefano-ghiossi-hrebin</a>`, `github    <a href="https://github.com/${USER}" target="_blank" rel="noopener">${USER}</a>`],
    cv: () => { const a = document.createElement("a"); a.href = cvHref(); a.download = ""; a.click(); return [`<span class="ok">${ui().dl}</span>`]; },
    theme: a => { const t = a === "light" || a === "dark" ? a : (curTheme() === "light" ? "dark" : "light"); setTheme(t); return [`${ui().theme} <span class="hl">${t}</span>`]; },
    lang: a => { I.set(a === "es" || a === "en" ? a : (I.lang === "es" ? "en" : "es")); return [`<span class="hl">${ui().langSet}</span>`]; },
    clear: () => { body.innerHTML = ""; return []; },
    sudo: () => [`<span class="wn">${ui().sudo}</span>`],
    ls: () => [ui().ls],
  };
  const run = raw => {
    const [cmd, arg] = raw.trim().toLowerCase().split(/\s+/);
    print(esc(raw), "cmd");
    if (!cmd) return;
    history.push(raw); hi = history.length;
    const fn = commands[cmd];
    if (fn) fn(arg).forEach(l => print(l));
    else print(`<span class="wn">${ui().notFound}</span> ${esc(cmd)} · ${ui().try} <span class="hl">help</span>`);
  };
  form.addEventListener("submit", e => { e.preventDefault(); run(input.value); input.value = ""; });
  input.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && history.length) { hi = Math.max(0, hi - 1); input.value = history[hi]; e.preventDefault(); }
    if (e.key === "ArrowDown") { hi = Math.min(history.length, hi + 1); input.value = history[hi] || ""; e.preventDefault(); }
    if (e.key === "Tab" && input.value) { const m = Object.keys(commands).filter(c => c.startsWith(input.value.toLowerCase())); if (m.length === 1) { input.value = m[0]; e.preventDefault(); } }
  });
  $("#terminal").addEventListener("click", e => { if (!e.target.closest("a, button")) input.focus({ preventScroll: true }); });
  const chipsBox = $("#termChips");
  ["help", "whoami", "stack", "homelab", "fetch"].forEach(c => { const b = document.createElement("button"); b.type = "button"; b.textContent = c; b.addEventListener("click", () => run(c)); chipsBox.appendChild(b); });

  const bootLine = l => l.startsWith("[ OK ]") ? `<span class="ok">[ OK ]</span>${esc(l.slice(6))}` : l.includes("help") ? esc(l).replace("help", `<span class="hl">help</span>`) : `<span class="mu">${esc(l)}</span>`;
  const boot = () => { ui().boot.forEach((l, i) => reduce() ? print(bootLine(l)) : setTimeout(() => print(bootLine(l)), 350 * i)); };
  boot();

  /* ---------- Cambios de idioma ---------- */
  I.onChange(() => { startTyping(); fill(); });
  I.apply();
  $("#year").textContent = new Date().getFullYear();
})();
