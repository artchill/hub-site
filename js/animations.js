/* ==========================================================
   HUB — scroll & motion layer (loads after main.js)
   - animated canvas background (flowing ribbons + drifting glows + particles)
   - hero: letter-by-letter intro, scroll-linked shrink / fade / blur
   - parallax on cards, panels, mock-ups, ghost words, rings
   - word-by-word blur reveal on headlines, directional reveals
   - scroll progress marker
   Website design & branding by Artchelo Design
   ========================================================== */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------
     1. Animated canvas background
     --------------------------------------------------------- */
  function initCanvas(host, variant) {
    var c = document.createElement("canvas");
    c.className = "bg-canvas bg-" + variant;
    c.setAttribute("aria-hidden", "true");
    host.insertBefore(c, host.firstChild);
    var ctx = c.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    var w = 0, h = 0, grads = [], running = false, raf = 0;
    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    var hero = variant === "hero";
    var LINES = hero ? 34 : 18;
    var parts = [];
    for (var i = 0; i < (hero ? 70 : 30); i++) {
      parts.push({ x: Math.random(), y: Math.random(), z: Math.random() * .9 + .1, s: Math.random() * 1.6 + .4, v: Math.random() * .00012 + .00003 });
    }

    function resize() {
      var r = host.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width)); h = Math.max(1, Math.round(r.height));
      c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var g = ctx.createLinearGradient(0, 0, w, 0);
      g.addColorStop(0, "rgba(2,42,82,1)"); g.addColorStop(.45, "rgba(10,90,148,1)"); g.addColorStop(.8, "rgba(58,155,213,1)"); g.addColorStop(1, "rgba(142,201,238,1)");
      grads = [g];
    }

    function draw(ts) {
      var t = ts / 1000;
      mouse.x += (mouse.tx - mouse.x) * .04; mouse.y += (mouse.ty - mouse.y) * .04;
      ctx.clearRect(0, 0, w, h);

      // drifting glows
      var glows = [
        [.22 + Math.sin(t * .25) * .08, .62 + Math.cos(t * .2) * .08, .42, "rgba(58,155,213,.22)"],
        [.78 + Math.cos(t * .22) * .08, .5 + Math.sin(t * .27) * .1, .4, "rgba(10,90,148,.16)"],
      ];
      for (var gI = 0; gI < glows.length; gI++) {
        var G = glows[gI], rad = G[2] * Math.max(w, h) * .6;
        var rg = ctx.createRadialGradient(G[0] * w + mouse.x * 30, G[1] * h + mouse.y * 20, 0, G[0] * w + mouse.x * 30, G[1] * h + mouse.y * 20, rad);
        rg.addColorStop(0, G[3]); rg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = rg; ctx.fillRect(0, 0, w, h);
      }

      // flowing ribbons
      ctx.lineCap = "round"; ctx.strokeStyle = grads[0];
      var step = Math.max(8, Math.round(w / 100));
      for (var i = 0; i < LINES; i++) {
        var k = i / (LINES - 1);
        ctx.beginPath();
        for (var x = -10; x <= w + 10; x += step) {
          var nx = x / w;
          var y = h * (hero ? .66 : .7) + (k - .5) * h * (hero ? .5 : .36)
            + Math.sin(nx * 3.1 + t * .5 + k * 2.3) * h * .085 * (.45 + k)
            + Math.sin(nx * 7.4 - t * .75 + k * 5.2) * h * .022
            + mouse.y * 18 * (k + .2) + Math.sin(nx * 2 + t * .3) * mouse.x * 14;
          if (x === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.globalAlpha = (hero ? .12 : .09) + Math.sin(k * Math.PI) * (hero ? .26 : .16);
        ctx.lineWidth = .8 + k * 1.8;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // particles (parallax with mouse)
      ctx.fillStyle = "#1b6fa8";
      for (var p = 0; p < parts.length; p++) {
        var P = parts[p];
        P.y -= P.v; if (P.y < -.02) { P.y = 1.02; P.x = Math.random(); }
        var px = P.x * w + mouse.x * 26 * P.z, py = P.y * h + mouse.y * 16 * P.z;
        ctx.globalAlpha = .2 + .5 * Math.abs(Math.sin(t * .8 + P.x * 12));
        ctx.beginPath(); ctx.arc(px, py, P.s * P.z + .3, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function loop(ts) { if (!running) return; draw(ts); raf = requestAnimationFrame(loop); }
    function start() { if (running || reduce) return; running = true; raf = requestAnimationFrame(loop); }
    function stop() { running = false; cancelAnimationFrame(raf); }

    resize(); draw(performance.now());
    window.addEventListener("resize", function () { resize(); if (!running) draw(performance.now()); });
    host.addEventListener("mousemove", function (e) {
      var r = host.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width - .5; mouse.ty = (e.clientY - r.top) / r.height - .5;
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { en[0].isIntersecting ? start() : stop(); }, { threshold: 0 }).observe(host);
    } else start();
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    return { mouse: mouse, canvas: c };
  }

  /* ---------------------------------------------------------
     2. Text helpers
     --------------------------------------------------------- */
  function splitChars(el) {
    var txt = el.textContent.trim(), html = "";
    for (var i = 0; i < txt.length; i++) html += '<span class="ch" style="--i:' + i + '">' + txt[i] + "</span>";
    el.setAttribute("aria-label", txt);
    el.innerHTML = html;
    el.classList.add("is-split-chars");
  }

  function splitWords(el) {
    var idx = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var parts = n.textContent.split(/(\s+)/), frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
            var s = document.createElement("span"); s.className = "w"; s.style.setProperty("--i", idx++); s.textContent = p; frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
      });
    })(el);
    el.classList.add("is-split");
  }

  /* ---------------------------------------------------------
     3. Boot
     --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var heroEl = document.querySelector(".hero");
    var heroCanvas = null;

    // canvas backgrounds
    if (heroEl) heroCanvas = initCanvas(heroEl, "hero");
    $$(".page-hero").forEach(function (el) { initCanvas(el, "page"); });

    // hero wordmark letter intro
    var wm = document.querySelector(".hero-wordmark");
    if (wm && !reduce) splitChars(wm);

    // headline word-by-word reveal
    var observed = [];
    $$(".section-title, .page-hero h1, .panel h2, .cta-band h2, .modal-dialog h2").forEach(function (el) {
      if (el.closest(".modal")) return;
      splitWords(el);
      if (!el.closest(".reveal")) { el.classList.add("reveal"); observed.push(el); }
    });

    // directional / zoom reveals for extra elements
    $$(".cols3 > *").forEach(function (el, i) { el.classList.add("reveal", "delay-" + ((i % 3) + 1)); observed.push(el); });
    $$(".stagger .card").forEach(function (el, i) { el.classList.add(i % 2 ? "from-right" : "from-left"); });
    $$(".grid-3 > .card, .grid-4 > .card, .grid-2 > .card").forEach(function (el, i) { if (!/from-/.test(el.className)) el.classList.add("zoom"); });
    $$(".panel, .cta-band").forEach(function (el) { el.classList.add("zoom"); });
    $$(".big-line").forEach(function (el, i) { el.classList.add(i % 2 ? "from-right" : "from-left"); });
    $$(".site-footer .foot-top, .site-footer .foot-links, .site-footer .foot-wordmark").forEach(function (el) { el.classList.add("reveal"); observed.push(el); });

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      // footer is injected by main.js: observe after a tick so the nodes exist
      observed.forEach(function (el) { io.observe(el); });
    } else observed.forEach(function (el) { el.classList.add("in"); });

    /* scroll progress marker */
    var rail = document.createElement("div"); rail.className = "scroll-rail"; rail.innerHTML = "<i></i>";
    document.body.appendChild(rail);
    var thumb = rail.firstChild;

    if (reduce) { rail.style.display = "none"; return; }

    /* ---------------- scroll-linked loop ---------------- */
    var vh = window.innerHeight, vw = window.innerWidth;
    var heroCore = document.querySelector(".hero-core"), heroNote = document.querySelector(".hero-note");
    var rings = $$(".hero .rings i");
    var ringSpeeds = [.22, -.12, .3, -.2, .16];
    var stagger = $$(".stagger .card"), staggerSpeeds = [.1, -.07, .15, -.05];
    var ghosts = $$(".ghost-word");
    var panels = $$(".panel, .cta-band");
    var mocks = $$(".panel .mock, .cta-art");
    var bigLines = $$(".big-line");
    var chips = $$(".chip");
    var gridCards = $$(".grid-3 > .card, .grid-4 > .card");
    var foot = document.querySelector(".foot-wordmark");
    var ticking = false;

    function dist(el) { var r = el.getBoundingClientRect(); return { d: r.top + r.height / 2 - vh / 2, r: r }; }

    function update() {
      ticking = false;
      var sy = window.scrollY || 0, docH = Math.max(1, document.documentElement.scrollHeight - vh);
      var p = clamp(sy / docH, 0, 1);

      // progress marker
      var railH = vh - 140, th = Math.max(46, railH * .1);
      thumb.style.height = th + "px"; thumb.style.transform = "translateY(" + (p * (railH - th)) + "px)";

      // hero
      if (heroEl) {
        var hp = clamp(sy / (vh * .85), 0, 1);
        if (heroCore) {
          heroCore.style.scale = String(1 - hp * .32);
          heroCore.style.translate = "0 " + (-hp * 70) + "px";
          heroCore.style.opacity = String(1 - hp * 1.25);
          heroCore.style.filter = hp > .02 ? "blur(" + (hp * 12).toFixed(1) + "px)" : "none";
        }
        if (heroNote) { heroNote.style.opacity = String(1 - hp * 2.2); heroNote.style.translate = "0 " + (hp * 40) + "px"; }
        if (heroCanvas) heroCanvas.canvas.style.translate = "0 " + (sy * .28) + "px";
        rings.forEach(function (r, i) { r.style.translate = ((heroCanvas ? heroCanvas.mouse.x : 0) * 30 * (i % 2 ? -1 : 1)) + "px " + (sy * ringSpeeds[i % 5]) + "px"; });
        var st = heroEl.querySelector(".stars"); if (st) st.style.translate = "0 " + (sy * .12) + "px";
      }

      if (vw < 860) return; // keep mobile light: hero + progress only

      stagger.forEach(function (el, i) { var o = dist(el); if (Math.abs(o.d) < vh * 1.4) el.style.translate = "0 " + (o.d * staggerSpeeds[i % 4]) + "px"; });
      ghosts.forEach(function (el) { var o = dist(el); if (Math.abs(o.d) < vh * 1.6) { el.style.translate = (o.d * -.35) + "px " + (o.d * .12) + "px"; el.style.opacity = String(clamp(1 - Math.abs(o.d) / (vh * 1.1), .15, 1)); } });
      gridCards.forEach(function (el, i) { var o = dist(el); if (Math.abs(o.d) < vh * 1.2) el.style.translate = "0 " + (o.d * (i % 2 ? .035 : -.02)) + "px"; });

      panels.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var e = clamp((vh - r.top) / (vh * .7), 0, 1);
        el.style.scale = String(.9 + .1 * e);
      });
      mocks.forEach(function (el) { var o = dist(el); if (Math.abs(o.d) < vh * 1.3) { el.style.translate = "0 " + (o.d * -.1) + "px"; el.style.rotate = (o.d * -.006).toFixed(2) + "deg"; } });

      bigLines.forEach(function (el, i) { var o = dist(el); if (Math.abs(o.d) < vh * 1.3) el.style.translate = (o.d * (i % 2 ? -.12 : .12)) + "px 0"; });
      chips.forEach(function (el) { var o = dist(el); if (Math.abs(o.d) < vh * 1.3) el.style.rotate = clamp(o.d * .012, -10, 10).toFixed(1) + "deg"; });

    }

    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () { vh = window.innerHeight; vw = window.innerWidth; onScroll(); });
    update();
  });
})();
