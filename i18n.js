/* i18n: el español vive en el HTML (default, SEO). Acá está el inglés y los textos de la UI dinámica. */
(() => {
  "use strict";
  const EN = {
    k0: "Skip to content", k1: "About", k2: "Stack", k3: "Projects", k4: "Journey", k5: "Contact",
    k7: "I study the Programming Technical Degree at UTN and learn by building: I run my own <strong>homelab</strong> with Proxmox and Docker, monitor everything with Prometheus and Grafana, and built <strong>Puck</strong>, a local AI assistant that talks to my infrastructure.",
    k8: "View projects", k9: "Download CV", k10: "Get in touch",
    k11: "self-hosted services", k12: "main projects", k13: "commits across repos", k14: "local AI tokens used",
    k16: "About me",
    k17: "I'm a student of the <strong>University Technical Degree in Programming (UTN)</strong> and my profile points to <strong>Linux infrastructure</strong>, <strong>DevOps</strong> culture and <strong>Backend</strong> development.",
    k18: "I run my own homelab where I practice Infrastructure as Code, virtualization and automation of self-hosted services. I document every technical decision, break things on purpose and fix them: it's the fastest way I've found to understand how real systems work.",
    k19: "Before tech I worked in production and administration (bank transfers, invoicing and cash reconciliation), which gave me discipline, people skills and a lot of care with numbers.",
    k20: "Location", k21: "Buenos Aires, Argentina", k22: "Studies", k23: "TUP · UTN (ongoing, 2nd year)",
    k24: "Looking for", k25: "DevOps · SRE · Backend Trainee/Jr.", k26: "English", k27: "B2: fluent technical reading",
    k28: "Approach", k29: "Self-taught, analytical, proactive",
    k32: "All", k33: "Languages", k34: "Backend & data", k35: "Infrastructure", k36: "Observability", k37: "Local AI", k38: "Learning",
    k40: "Projects", k42: "Repository ↗", k65: "Repository ↗", k85: "Repository ↗",
    k43: "A Python middleware that works as a virtual SRE for my homelab. It unifies telemetry, incident management and task execution in a conversational interface, using language models that run 100% locally (for example <code>qwen3:14b</code>) so my network topology never leaves for third-party services.",
    k44: "🚨 Proactive alerts",
    k45: "A <b>FastAPI</b> endpoint receives Grafana Alertmanager webhooks, hands the technical data to Ollama and posts a natural-language report to Discord, with a butler personality.",
    k46: "🧠 Function Calling",
    k47: "Open WebUI tools that let the model query the <b>Proxmox API</b> and Grafana live: \"how's the server doing?\" returns CPU, RAM and the state of every storage.",
    k48: "🔧 Troubleshooting",
    k49: "Facing an almost-full disk, Puck doesn't just warn: it proposes the exact <code>bash</code> and LVM commands (<code>lvdisplay</code>, <code>lvextend</code>, <code>resize2fs</code>) to fix it.",
    k50: "💻 Desktop automation",
    k51: "Allowlisted app control, playback and volume on Linux/Wayland (<code>wpctl</code>, <code>pactl</code>, <code>playerctl</code>), music from Navidrome and local voice with Piper TTS.",
    k52: "Puck answering about the Proxmox server status in Open WebUI",
    k53: "Server status query through Open WebUI",
    k54: "Puck proposing LVM commands for an almost-full disk",
    k55: "Incident resolution: almost-full disk",
    k56: "Grafana alerts written by Puck in Discord",
    k57: "Grafana alerts delivered to Discord",
    k58: "Grafana alert rules: CPU, RAM, disks, GPU and M.2",
    k59: "Grafana alert rules",
    k60: "Puck startup message in Discord",
    k61: "Puck boot: monitoring protocols",
    k62: "Model usage metrics in Open WebUI",
    k63: "Local model usage (2.8M tokens)",
    k64: "Homelab — self-hosted infrastructure",
    k66: "My personal lab to learn virtualization, Linux, Docker, networking and AI. I'm not just interested in installing services but in understanding how they're deployed, monitored and maintained. Every service is documented with its installation, configuration, networking, persistence, problems found and possible improvements.",
    k70: "Storage", k71: "Hypervisor", k72: "Backup power", k73: "Services I run",
    k74: "Architecture diagram of the homelab on Proxmox: LXC containers with GPU passthrough, Docker, Ollama and services",
    k75: "Architecture: Proxmox orchestrates LXC containers (some with GPU passthrough) that host Docker and the services. Diagram made with Excalidraw.",
    k76: "Uptime Kuma dashboard showing service availability",
    k77: "Service availability in Uptime Kuma",
    k78: "Grafana dashboard with CPU, RAM, temperatures and power supply",
    k79: "Metrics of an LXC: resources and temperatures",
    k80: "CPU and memory usage per container of the monitoring stack",
    k81: "Per-container usage of the monitoring stack",
    k82: "UPS metrics exported with NUT: load, input voltage and battery",
    k83: "UPS monitoring with NUT",
    k84: "Academic projects — TUPaD UTN",
    k86: "Repository that gathers all the practice work and capstone assignments of the program, organized by term. Backend with Object-Oriented Programming and integration with relational and NoSQL databases.",
    k87: "1st term <em>completed</em>", k94: "2nd term <em>completed</em>", k100: "3rd term <em>in progress</em>",
    k88: "Recursion", k89: "Conditionals and control structures", k90: "Functions", k91: "File handling",
    k92: "Math for programming", k93: "Virtualization on a Debian VM",
    k95: "Databases I final project (DDL, DML, triggers, views)", k96: "OOP: encapsulation, inheritance, polymorphism",
    k97: "UML: class diagrams", k98: "Java collections (List, Set, Map)", k99: "Statistical analysis with R",
    k101: "Projects in development",
    k103: "Journey",
    k104: "Aug 2025 — present", k105: "University Technical Degree in Programming", k106: "National Technological University (UTN)",
    k107: "Object-oriented programming, databases, algorithms and version control with Git/GitHub.",
    k108: "Feb 2025 — Sep 2026", k109: "Administrative staff",
    k111: "Bank transfer handling, invoicing, cash handling and cash reconciliation.",
    k113: "Production operator", k115: "Packaging, labeling, sorting and secondary packaging area.",
    k117: "High School Diploma in Natural Sciences", k118: "Apostolado Católico Institute",
    k120: "Contact",
    k121: "Looking for someone who learns fast, documents what they do and isn't afraid of the terminal? Write to me.",
    k124: "Click to copy", k127: "Open profile ↗", k130: "View repositories ↗",
    k131: "Résumé", k132: "Download CV (PDF)", k133: "Updated 2026 · English",
    k134: "Handmade with HTML, CSS and JavaScript · no frameworks",
    k138: "Available for a first job opportunity", k139: "Aspiring", k140: "Portrait of Franco Ghiossi", k152: "🪵 Logs with Loki", k153: "Read-only log queries with LogQL: Puck first discovers which services have logs, then pulls the latest ones. With a single \"check them all\" it ran 12 queries and returned a diagnosis per service.", k154: "🔒 Secure by design", k155: "Application allowlist, validated read-only Loki queries, logs treated as untrusted data (prompt-injection defense) and a read-only Proxmox token. Puck watches and reports: it never changes anything on its own.", k156: "Puck architecture diagram: Grafana alerts, Open WebUI tools, Ollama, Loki, Proxmox and desktop control", k157: "Puck architecture: alerts, read-only queries, desktop control and local voice", k158: "Puck diagnosing logs from several services in Open WebUI", k159: "Log diagnosis: 12 Loki queries from a single request", k150: "Homelab home dashboard: Proxmox, Portainer, Nginx Proxy Manager, Semaphore and Forgejo with their metrics", k151: "Home dashboard: infrastructure", k143: "Homelab home dashboard: status of Grafana, Uptime Kuma, Prometheus and Authentik", k144: "Home dashboard: observability", k145: "Name", k146: "Your email", k147: "Message", k148: "Send message", k149: "Your message reaches me directly and I will reply by email.", k141: "Homepage: quick-access dashboard for the homelab services", k142: "Homepage dashboard with quick access to the self-hosted services of the homelab"
  };

  const UI = {
    es: {
      title: "Franco Ghiossi · DevOps / SRE / Backend Jr.",
      desc: "Portfolio de Franco Stefano Ghiossi Hrebin: infraestructura Linux, homelab con Proxmox y Docker, observabilidad y backend. Estudiante de la Tecnicatura en Programación (UTN).",
      roles: ["DevOps Engineer", "Site Reliability Engineer", "Backend Developer", "SysAdmin Linux"],
      aria: { burger: "Abrir menú", theme: "Cambiar tema", lang: "Cambiar idioma a inglés", close: "Cerrar", prev: "Anterior", next: "Siguiente", viewer: "Visor de imágenes", term: "Terminal interactiva" },
      placeholder: "probá: help", fSending: "Enviando…", fOk: "¡Mensaje enviado! Te respondo pronto.", fErr: "No pude enviarlo. Probá por LinkedIn, por favor.", formLine: "formulario en la sección Contacto", act: "act. ", locale: "es-AR",
      boot: ["Debian GNU/Linux 13 · tty1", "[ OK ] Proxmox VE, Docker y stack de monitoreo en línea", "[ OK ] Puck conectado a Ollama", "", "Bienvenido. Escribí help para ver los comandos."],
      notFound: "comando no encontrado:", try: "probá", sudo: "Buen intento 😄 Este usuario no tiene permisos de sudo.", dl: "Descargando CV…", theme: "Tema:", langSet: "Idioma: español",
      help: [["whoami", "quién soy"], ["stack", "tecnologías que uso"], ["homelab", "resumen de mi infraestructura"], ["puck", "mi asistente de IA local"], ["uptime", "estado de mis servicios"], ["fetch", "info del sistema"], ["contact", "cómo contactarme"], ["cv", "descargar mi CV"], ["theme", "cambiar tema claro/oscuro"], ["lang", "cambiar idioma (es/en)"], ["clear", "limpiar la terminal"]],
      helpTitle: "Comandos disponibles",
      whoami: ["Estudiante de la TUP (UTN) · Buenos Aires, AR", "Busco: DevOps / SRE / Backend Trainee-Jr."],
      stackL: ["lenguajes", "infra", "observab.", "IA local"], seeProject: "ver el proyecto",
      hl: ["Hipervisor", "Servicios", "Respaldo"], ups: "UPS monitoreada con NUT", uptimeNote: "(valores de la captura de Uptime Kuma)",
      ls: "about/  stack/  proyectos/  trayectoria/  contacto/  CV.pdf"
    },
    en: {
      title: "Franco Ghiossi · DevOps / SRE / Backend Jr.",
      desc: "Portfolio of Franco Stefano Ghiossi Hrebin: Linux infrastructure, Proxmox & Docker homelab, observability and backend. Student of the Programming Technical Degree (UTN).",
      roles: ["DevOps Engineer", "Site Reliability Engineer", "Backend Developer", "Linux SysAdmin"],
      aria: { burger: "Open menu", theme: "Toggle theme", lang: "Switch language to Spanish", close: "Close", prev: "Previous", next: "Next", viewer: "Image viewer", term: "Interactive terminal" },
      placeholder: "try: help", fSending: "Sending…", fOk: "Message sent! I will reply soon.", fErr: "Could not send it. Please try LinkedIn.", formLine: "form in the Contact section", act: "upd. ", locale: "en-US",
      boot: ["Debian GNU/Linux 13 · tty1", "[ OK ] Proxmox VE, Docker and monitoring stack online", "[ OK ] Puck connected to Ollama", "", "Welcome. Type help to see the commands."],
      notFound: "command not found:", try: "try", sudo: "Nice try 😄 This user has no sudo privileges.", dl: "Downloading CV…", theme: "Theme:", langSet: "Language: English",
      help: [["whoami", "who I am"], ["stack", "technologies I use"], ["homelab", "my infrastructure at a glance"], ["puck", "my local AI assistant"], ["uptime", "status of my services"], ["fetch", "system info"], ["contact", "how to reach me"], ["cv", "download my CV"], ["theme", "toggle light/dark theme"], ["lang", "switch language (es/en)"], ["clear", "clear the terminal"]],
      helpTitle: "Available commands",
      whoami: ["TUP (UTN) student · Buenos Aires, AR", "Looking for: DevOps / SRE / Backend Trainee-Jr."],
      stackL: ["languages", "infra", "observ.", "local AI"], seeProject: "see the project",
      hl: ["Hypervisor", "Services", "Backup"], ups: "UPS monitored with NUT", uptimeNote: "(values from the Uptime Kuma screenshot)",
      ls: "about/  stack/  projects/  journey/  contact/  CV.pdf"
    }
  };

  const root = document.documentElement;
  const listeners = [];
  const store = new Map();
  let lang = root.lang === "en" ? "en" : "es";

  // guardar el español original una sola vez
  document.querySelectorAll("[data-i18n]").forEach(el => store.set(el, el.innerHTML));
  document.querySelectorAll("[data-i18n-alt]").forEach(el => store.set(el, el.alt));

  const CHIP_EN = { "Redes": "Networking", "Virtualización": "Virtualization" };
  document.querySelectorAll("#chips li span").forEach(el => store.set(el, el.textContent));
  const apply = () => {
    document.querySelectorAll("#chips li span").forEach(el => { const o = store.get(el); el.textContent = lang === "en" && CHIP_EN[o] ? CHIP_EN[o] : o; });
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const en = EN[el.dataset.i18n];
      el.innerHTML = lang === "en" && en != null ? en : store.get(el);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(el => {
      const en = EN[el.dataset.i18nAlt];
      el.alt = lang === "en" && en != null ? en : store.get(el);
    });
    const u = UI[lang];
    root.lang = lang;
    document.title = u.title;
    document.querySelector('meta[name="description"]').content = u.desc;
    const set = (sel, k, attr = "aria-label") => { const e = document.querySelector(sel); if (e) e.setAttribute(attr, k); };
    set("#burger", u.aria.burger); set("#theme", u.aria.theme); set("#lang", u.aria.lang);
    set("#lbClose", u.aria.close); set("#lbPrev", u.aria.prev); set("#lbNext", u.aria.next);
    set("#lightbox", u.aria.viewer); set("#terminal", u.aria.term); set("#termCmd", u.placeholder, "placeholder");
    document.querySelectorAll("#lang b").forEach(b => b.classList.toggle("on", b.textContent.toLowerCase() === lang));
    listeners.forEach(fn => fn(lang));
  };

  window.I18N = {
    get lang() { return lang; },
    get ui() { return UI[lang]; },
    set(l) { if (l !== "es" && l !== "en") return; lang = l; try { localStorage.setItem("lang", l); } catch {} apply(); },
    toggle() { this.set(lang === "es" ? "en" : "es"); },
    onChange(fn) { listeners.push(fn); },
    apply
  };
})();
