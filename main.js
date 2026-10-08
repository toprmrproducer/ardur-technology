/* Ardur Technology - interactions
   nav state, mobile menu, reveals, counters, service tabs,
   FAQ accordion, flip cards on touch, SLA meter, contact form */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* year */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* nav scrolled state */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  var menuBtn = document.getElementById("menuBtn");
  var navLinks = document.getElementById("navLinks");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* reveals + counters + meters fire once when visible.
     The page is readable without JS; the armed class applies the hidden
     state only now that the observer is taking over. */
  document.documentElement.classList.add("reveal-armed");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var d = parseInt(el.getAttribute("data-d") || "0", 10);
      if (reduceMotion) d = 0;
      el.style.transitionDelay = d + "ms";
      el.classList.add("in");
      el.querySelectorAll("[data-count]").forEach(startCounter);
      if (el.matches("[data-count]")) startCounter(el);
      io.unobserve(el);
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* fail-safe: some embedded webviews never deliver observer callbacks.
     After a beat, reveal anything still hidden and finish the animations. */
  setTimeout(function () {
    document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
      el.classList.add("in");
      el.style.transitionDelay = "0ms";
    });
    document.querySelectorAll("[data-count]").forEach(startCounter);
    var fill = document.getElementById("slaFill");
    if (fill && !fill.style.width) fill.style.width = reduceMotion ? "0%" : "98.7%";
    if (consoleEl) consoleEl.classList.add("in");
    document.querySelectorAll(".panel.is-active").forEach(function (p) { p.classList.add("in"); });
    document.querySelectorAll(".path_viz").forEach(function (p) { p.classList.add("in"); });
  }, reduceMotion ? 0 : 1400);

  /* number counters */
  function startCounter(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = "1";
    var end = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion || !isFinite(end)) { el.textContent = end + suffix; return; }
    var t0 = null, dur = 1200;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* SLA meter fills when console enters view */
  var consoleEl = document.querySelector(".console");
  if (consoleEl) {
    var mio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var fill = document.getElementById("slaFill");
        if (fill) fill.style.width = (reduceMotion ? "0%" : "98.7%");
        consoleEl.classList.add("in");
        mio.disconnect();
      });
    }, { threshold: 0.3 });
    mio.observe(consoleEl);
  }

  /* service tabs */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".panel"));
  function selectTab(i, focus) {
    tabs.forEach(function (tab, n) {
      var active = n === i;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach(function (panel, n) {
      panel.hidden = n !== i;
      panel.classList.toggle("is-active", n === i);
      if (n === i) panel.classList.add("in");
    });
    if (focus && tabs[i]) tabs[i].focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(i); });
    tab.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
      if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); selectTab(next, true); }
    });
  });

  /* footer service links open the matching tab */
  document.querySelectorAll("[data-tab]").forEach(function (link) {
    link.addEventListener("click", function () {
      var i = parseInt(link.getAttribute("data-tab"), 10);
      if (!isNaN(i)) selectTab(i);
    });
  });

  /* FAQ accordion */
  document.querySelectorAll(".faq").forEach(function (item) {
    var btn = item.querySelector(".faq_q");
    var body = item.querySelector(".faq_a");
    if (!btn || !body) return;
    function setOpen(open) {
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      body.style.maxHeight = open ? body.scrollHeight + "px" : "0px";
    }
    setOpen(item.classList.contains("is-open"));
    btn.addEventListener("click", function () {
      setOpen(!item.classList.contains("is-open"));
    });
  });
  window.addEventListener("resize", function () {
    document.querySelectorAll(".faq.is-open .faq_a").forEach(function (body) {
      body.style.maxHeight = body.scrollHeight + "px";
    });
  });

  /* flip cards: tap toggles on touch screens */
  document.querySelectorAll(".flip").forEach(function (card) {
    card.addEventListener("click", function () {
      if (window.matchMedia("(hover: none)").matches) card.classList.toggle("flipped");
    });
  });

  /* contact form: static host has no backend, compose an email instead */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form && note) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var v = function (name) {
        var f = form.elements[name];
        return f ? f.value.trim() : "";
      };
      var subject = "Strategy call request: " + (v("service") || "General enquiry");
      var body =
        "Name: " + v("name") + "\n" +
        "Work email: " + v("email") + "\n" +
        "Company: " + v("company") + "\n" +
        "Phone: " + v("phone") + "\n" +
        "Service: " + v("service") + "\n\n" +
        v("message");
      note.textContent = "Opening your email client. You can also write to info@ardurtechnology.com directly.";
      window.location.href = "mailto:info@ardurtechnology.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
})();
