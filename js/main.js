/* ==========================================================
   Horizon Unified BPO Corp. (HUB) — shared behaviour
   Website design & branding by Artchelo Design
   ========================================================== */
(function () {
  "use strict";

  /* ---------- CONFIG ----------
     Set FORM_ENDPOINT to a form backend (Formspree, Getform, Web3Forms, your own API...).
     It receives a JSON POST. While empty, the form runs in DEMO mode:
     it validates and shows the success state but does NOT send anything. */
  var CONFIG = {
    FORM_ENDPOINT: "",
    BUSINESS_EMAIL: "",      // e.g. "hello@hub-bpo.com"
    RECRUITMENT_EMAIL: "",   // e.g. "careers@hub-bpo.com"
    TELEPHONE: ""            // e.g. "+63 32 000 0000"
  };

  /* ---------- Icons (stroke icons, 24x24) ---------- */
  var ICONS = {
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    headset: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2z"/><path d="M18 17v1a3 3 0 0 1-3 3h-2"/>',
    outbound: '<path d="M15 3h6v6"/><path d="M21 3l-8 8"/><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M22 7l-10 6L2 7"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    layers: '<path d="M12 2l10 5-10 5L2 7z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>',
    star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    handshake: '<path d="M11 17l2 2a1.4 1.4 0 0 0 2-2"/><path d="M14 14l2.5 2.5a1.4 1.4 0 0 0 2-2L15 11"/><path d="M8 8l-4 4 6 6a1.4 1.4 0 0 0 2-2"/><path d="M21 12l-5-5-4 1a3 3 0 0 0-2.5.8L7 11"/><path d="M2 11l4-4M22 11l-4-4"/>',
    bulb: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    flag: '<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5"/>',
    wallet: '<path d="M20 7H5a2 2 0 0 1 0-4h13v4z"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H5"/><circle cx="17" cy="14" r="1.2"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    infinity: '<path d="M18.2 7.8c-3.3 0-5 4.2-6.2 4.2s-2.900-4.200-6.200-4.200a4.200 4.200 0 0 0 0 8.400c3.300 0 5-4.200 6.200-4.200s2.900 4.200 6.200 4.200a4.200 4.200 0 0 0 0-8.400z"/>',
    trending: '<path d="M23 6l-9.500 9.500-5-5L1 18"/><path d="M17 6h6v6"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function svg(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  /* ---------- Social icons (filled brand-style glyphs, placeholders) ---------- */
  var SOCIAL = {
    instagram: '<path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>',
    tiktok: '<path d="M19.6 6.7a4.800 4.800 0 0 1-3.800-4.200V2h-3.400v13.700a2.900 2.900 0 1 1-2-2.800V9.400a6.300 6.300 0 1 0 5.400 6.300V9a8.200 8.200 0 0 0 4.800 1.500V7.100a4.800 4.800 0 0 1-1-.4z"/>',
    x: '<path d="M18.2 2.2h3.300l-7.200 8.300 8.500 11.300h-6.700l-5.200-6.800-6 6.800H1.600l7.700-8.800L1.200 2.200H8l4.700 6.200zm-1.200 17.600h1.800L7 4.100H5z"/>',
    linkedin: '<path d="M4.900 8.500H1V21h3.900zM3 2.900a2.300 2.300 0 1 0 0 4.600 2.300 2.300 0 0 0 0-4.600zM21 21v-7.100c0-3.400-1.800-5.500-4.800-5.500a4.200 4.200 0 0 0-3.800 2.100V8.500H8.600V21h3.900v-6.900c0-1.800 1-3 2.600-3s2 1.200 2 3V21z"/>'
  };

  /* ---------- Navigation model ---------- */
  var PAGES = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "services.html", label: "Services" },
    { href: "why-hub.html", label: "Why HUB" },
    { href: "careers.html", label: "Careers" },
    { href: "contact.html", label: "Contact" }
  ];

  function currentPage() {
    var p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  var LOGO =
    '<a href="index.html" class="logo" aria-label="Horizon Unified BPO Corp. \u2014 Home">' +
    '<img src="assets/logo/logo-social.png" alt="HUB \u2014 Horizon Unified BPO Corp." width="44" height="44"></a>';

  /* ---------- Header ---------- */
  function renderHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var cur = currentPage();
    var links = PAGES.filter(function (p) { return p.href !== "contact.html"; })
      .map(function (p) {
        return '<a href="' + p.href + '"' + (p.href === cur ? ' class="active" aria-current="page"' : "") + ">" + p.label + "</a>";
      }).join("");
    host.className = "site-header";
    host.innerHTML =
      '<div class="nav">' + LOGO +
      '<button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>' +
      '<nav class="nav-links" id="nav-links" aria-label="Primary">' + links +
      '<a href="contact.html" class="btn btn-primary btn-sm nav-cta" data-open-modal>Let’s Talk Business</a></nav></div>';

    var toggle = host.querySelector(".menu-toggle");
    var nav = host.querySelector(".nav-links");
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { nav.classList.remove("open"); toggle.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
    var onScroll = function () { host.classList.toggle("scrolled", window.scrollY > 20); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    host.className = "site-footer";
    var navLinks = PAGES.map(function (p) { return '<li><a href="' + p.href + '">' + p.label + "</a></li>"; }).join("");
    var socials = [
      ["Instagram"], ["TikTok"], ["Twitter X"], ["LinkedIn"]
    ].map(function (s) {
      return '<a href="#" aria-label="' + s[0] + ' (placeholder)" data-placeholder-link>' + s[0] + "</a>";
    }).join("");
    var pageLinks = PAGES.map(function (p) { return '<a href="' + p.href + '">' + p.label + "</a>"; }).join("");
    host.innerHTML =
      '<div class="glow-foot"></div><div class="container">' +
      '<div class="foot-top"><div><img class="foot-logo" src="assets/logo/logo-horizontal-white.png" alt="Horizon Unified BPO Corp." width="520" height="100"><small>Live Limitless Horizons</small>' +
      '<a class="foot-mail" href="contact.html">Let’s Talk Business</a>' +
      '<p class="foot-addr">Horizon Unified BPO Corp.<br>503B TGU Tower, Cebu IT Park, Apas<br>Cebu, Philippines</p></div>' +
      '<div class="foot-cta"><h4>Your Partner Beyond Boundaries</h4><p>Tell us about your outsourcing requirements.</p>' +
      '<a href="contact.html" class="btn btn-sm" data-open-modal>Send an Inquiry</a></div></div>' +
      '<div class="foot-links">' + socials + "</div>" +
      '<div class="foot-line"></div>' +
      '<div class="foot-links" style="margin:1.6rem 0 0;font-size:1rem">' + pageLinks + "</div>" +
      '<div class="foot-wordmark" aria-hidden="true">HORIZON</div>' +
      '<div class="foot-bottom"><p>© 2026 Horizon Unified BPO Corp. All Rights Reserved.</p>' +
      "<p>Developed by <strong>Artchelo Design</strong></p></div></div>";
    host.querySelectorAll("[data-placeholder-link]").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); });
    });
  }

  /* ---------- Inquiry form (shared by contact page + modal) ---------- */
  var FORM_HTML = function (id) {
    return (
      '<form class="inquiry-form" id="' + id + '" novalidate>' +
      '<div class="form-grid">' +
      field("Full Name", "name", "text", true, "Juan Dela Cruz", "name") +
      field("Company Name", "company", "text", true, "Acme Inc.", "organization") +
      field("Country", "country", "text", true, "United States", "country-name") +
      field("Business Email", "email", "email", true, "you@company.com", "email") +
      field("Contact Number", "phone", "tel", false, "+1 555 000 0000", "tel") +
      '<div class="field"><label for="' + id + '-service">Services Required <span class="req">*</span></label>' +
      '<select id="' + id + '-service" name="service" required>' +
      '<option value="">Select a service…</option><option>Voice</option><option>Non-Voice</option><option>Back-Office</option><option>Virtual Assistance</option><option>Custom</option></select>' +
      '<span class="err">Please choose a service.</span></div>' +
      field("Estimated Staffing Requirements", "staffing", "text", false, "e.g. 10 agents, 2 VAs", "off", id) +
      '<div class="field full"><label for="' + id + '-message">Message / Project Details <span class="req">*</span></label>' +
      '<textarea id="' + id + '-message" name="message" required placeholder="Tell us about your goals, hours of coverage, tools and timeline…"></textarea>' +
      '<span class="err">Please tell us a little about your project.</span></div>' +
      '<input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      "</div>" +
      '<div style="margin-top:1.5rem"><button class="btn btn-primary" type="submit"><span class="btn-label">Submit Inquiry</span></button></div>' +
      '<div class="form-status" role="status" aria-live="polite"></div>' +
      '<p class="form-note">Our team will review your inquiry and respond through the contact details provided.</p></form>'
    );
    function field(label, name, type, req, ph, ac) {
      var fid = id + "-" + name;
      return '<div class="field"><label for="' + fid + '">' + label + (req ? ' <span class="req">*</span>' : ' <span class="opt">(Optional)</span>') + "</label>" +
        '<input id="' + fid + '" name="' + name + '" type="' + type + '" placeholder="' + ph + '" autocomplete="' + ac + '"' + (req ? " required" : "") + ">" +
        (req ? '<span class="err">' + (type === "email" ? "Please enter a valid email address." : "This field is required.") + "</span>" : "") + "</div>";
    }
  };

  function wireForm(form) {
    var status = form.querySelector(".form-status");
    var btn = form.querySelector('button[type="submit"]');
    var label = btn.querySelector(".btn-label");

    function validate() {
      var ok = true;
      form.querySelectorAll(".field").forEach(function (f) {
        var el = f.querySelector("input, select, textarea");
        if (!el || !el.required) return;
        var v = el.value.trim();
        var bad = !v || (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
        f.classList.toggle("invalid", bad);
        if (bad) ok = false;
      });
      return ok;
    }
    form.addEventListener("input", function (e) {
      var f = e.target.closest(".field"); if (f) f.classList.remove("invalid");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      if (!validate()) {
        status.className = "form-status show error";
        status.textContent = "Please check the highlighted fields and try again.";
        var first = form.querySelector(".invalid input, .invalid select, .invalid textarea");
        if (first) first.focus();
        return;
      }
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      if (data.website) return; // honeypot: bots fill this
      delete data.website;
      data.page = location.href;

      btn.disabled = true; label.textContent = "Sending…";

      var send = CONFIG.FORM_ENDPOINT
        ? fetch(CONFIG.FORM_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(data)
          }).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); })
        : new Promise(function (res) { setTimeout(res, 700); }); // DEMO mode: nothing is sent

      send.then(function () {
        status.className = "form-status show success";
        status.textContent = "Thank you, " + (data.name || "there") + "! Your inquiry has been received. Our team will get back to you at " + data.email + ".";
        form.reset();
        if (!CONFIG.FORM_ENDPOINT && window.console) console.info("[HUB] Demo mode: set CONFIG.FORM_ENDPOINT in js/main.js to deliver inquiries.", data);
      }).catch(function () {
        status.className = "form-status show error";
        status.textContent = "Sorry, something went wrong sending your inquiry. Please try again" + (CONFIG.BUSINESS_EMAIL ? " or email us at " + CONFIG.BUSINESS_EMAIL : "") + ".";
      }).then(function () {
        btn.disabled = false; label.textContent = "Submit Inquiry";
      });
    });
  }

  /* ---------- Modal ---------- */
  var lastFocus = null;
  function buildModal() {
    var m = document.createElement("div");
    m.className = "modal"; m.id = "contact-modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-labelledby", "modal-title");
    m.innerHTML =
      '<div class="modal-backdrop" data-close-modal></div><div class="modal-dialog">' +
      '<button class="modal-close" aria-label="Close" data-close-modal>✕</button>' +
      '<span class="eyebrow">Let’s Talk Business</span><h2 id="modal-title">Tell us what you need.</h2>' +
      '<p>Share a few details and our team will respond with a tailored outsourcing proposal.</p>' + FORM_HTML("modal-form") + "</div>";
    document.body.appendChild(m);
    wireForm(m.querySelector("form"));
    m.addEventListener("click", function (e) { if (e.target.closest("[data-close-modal]")) closeModal(); });
    return m;
  }
  function openModal() {
    var m = document.getElementById("contact-modal") || buildModal();
    lastFocus = document.activeElement;
    m.classList.add("open"); document.body.style.overflow = "hidden";
    var f = m.querySelector("input"); if (f) setTimeout(function () { f.focus(); }, 50);
  }
  function closeModal() {
    var m = document.getElementById("contact-modal"); if (!m) return;
    m.classList.remove("open"); document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  // [data-open-modal] opens the modal everywhere except on the contact page, where it scrolls to the form.
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open-modal]"); if (!t) return;
    e.preventDefault();
    var inline = document.getElementById("inquiry-section");
    if (inline) { inline.scrollIntoView({ behavior: "smooth", block: "start" }); var f = inline.querySelector("input"); if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 500); }
    else openModal();
  });

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();

    document.querySelectorAll("[data-icon]").forEach(function (el) { el.innerHTML = svg(el.getAttribute("data-icon")); });

    // Contact-page inline form
    var slot = document.getElementById("inquiry-form-slot");
    if (slot) { slot.innerHTML = FORM_HTML("inquiry"); wireForm(slot.querySelector("form")); }

    // Contact detail placeholders -> real values once configured
    document.querySelectorAll("[data-config]").forEach(function (el) {
      var v = CONFIG[el.getAttribute("data-config")];
      if (v) { el.textContent = v; el.classList.remove("placeholder"); }
    });
    document.querySelectorAll("[data-mailto]").forEach(function (el) {
      var v = CONFIG[el.getAttribute("data-mailto")];
      if (v) { el.href = "mailto:" + v; }
    });

    // Starfield
    document.querySelectorAll(".stars").forEach(function (box) {
      var n = parseInt(box.getAttribute("data-count") || "70", 10), html = "";
      for (var i = 0; i < n; i++) {
        var s = Math.random() < .15 ? 3 : 2;
        html += '<i style="left:' + (Math.random() * 100).toFixed(1) + "%;top:" + (Math.random() * 100).toFixed(1) +
          "%;width:" + s + "px;height:" + s + "px;animation-delay:-" + (Math.random() * 4).toFixed(1) + "s;animation-duration:" + (3 + Math.random() * 4).toFixed(1) + 's"></i>';
      }
      box.innerHTML = html;
    });

    initReveal();
  });

  /* ---------- Scroll-to-top ---------- */
  function initScrollTop() {
    var b = document.createElement("button");
    b.type = "button"; b.className = "to-top"; b.setAttribute("aria-label", "Back to top");
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(b);
    var tick = false;
    function upd() {
      tick = false;
      b.classList.toggle("show", window.scrollY > 600);
    }
    window.addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
    b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    upd();
  }
  initScrollTop();
})();
