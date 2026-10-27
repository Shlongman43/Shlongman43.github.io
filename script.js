(function () {
  var S = window.SITE || {};
  var $ = function (id) { return document.getElementById(id); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Text from the config ----------
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    var v = S[el.getAttribute("data-bind")];
    if (v) el.textContent = v;
  });
  if (S.name) document.title = S.name + " | UGC Creator";

  // A video element, or a placeholder card when there is no file yet.
  function media(item, placeholderText) {
    if (item && item.src) {
      var v = document.createElement("video");
      v.src = item.src;
      if (item.poster) v.poster = item.poster;
      v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = !reduceMotion;
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      v.preload = "metadata";
      return v;
    }
    var d = document.createElement("div");
    d.className = "ph";
    d.innerHTML = "<div><span>▶</span></div>";
    d.firstChild.appendChild(document.createTextNode(placeholderText || "Video coming soon"));
    return d;
  }

  // ---------- Hero phone ----------
  var hero = S.heroVideo || {};
  $("heroScreen").appendChild(media(hero, "Your best video goes here"));
  $("heroCaption").textContent = hero.caption || "";

  // ---------- Work strip ----------
  var track = $("track");
  var vids = (S.videos || []).filter(Boolean);
  function card(item, clone) {
    var c = document.createElement("figure");
    c.className = "vcard";
    c.style.margin = "0";
    if (clone) c.setAttribute("aria-hidden", "true");
    var f = document.createElement("div");
    f.className = "vcard-frame";
    f.appendChild(media(item, "Video coming soon"));
    c.appendChild(f);
    if (item.label) {
      var l = document.createElement("figcaption");
      l.className = "vcard-label";
      l.textContent = item.label;
      c.appendChild(l);
    }
    return c;
  }
  // The list is drawn twice so the loop is seamless.
  vids.forEach(function (v) { track.appendChild(card(v, false)); });
  vids.forEach(function (v) { track.appendChild(card(v, true)); });
  if (!vids.length) $("work").querySelector(".marquee").hidden = true;

  var marquee = $("marquee"), toggle = $("marqueeToggle");
  toggle.addEventListener("click", function () {
    var paused = marquee.classList.toggle("paused");
    toggle.textContent = paused ? "Play" : "Pause";
    track.querySelectorAll("video").forEach(function (v) { paused ? v.pause() : v.play().catch(function () {}); });
  });
  if (reduceMotion) { marquee.classList.add("paused"); toggle.textContent = "Play"; }

  // ---------- Cycling word ----------
  var words = ["SCROLL.", "THUMB.", "SKIP."];
  var wordEl = document.querySelector(".k-word");
  if (wordEl && !reduceMotion) {
    var i = 0;
    setInterval(function () {
      wordEl.classList.remove("in");
      wordEl.classList.add("out");
      setTimeout(function () {
        i = (i + 1) % words.length;
        wordEl.textContent = words[i];
        wordEl.classList.remove("out");
        wordEl.classList.add("in");
      }, 280);
    }, 2200);
  }

  // ---------- Stats (only real numbers from the config) ----------
  var stats = (S.stats || []).filter(function (s) { return s && s.label; });
  var statsEl = $("stats");
  if (stats.length) {
    statsEl.hidden = false;
    stats.forEach(function (s) {
      var w = document.createElement("div");
      w.innerHTML = '<div class="stat-value"></div><div class="stat-label"></div>';
      w.firstChild.dataset.value = s.value;
      w.firstChild.dataset.suffix = s.suffix || "";
      w.firstChild.textContent = s.value + (s.suffix || "");
      w.lastChild.textContent = s.label;
      statsEl.appendChild(w);
    });
  }
  function countUp(el) {
    var target = parseFloat(el.dataset.value), suffix = el.dataset.suffix;
    if (isNaN(target) || reduceMotion) return;
    var dec = (String(el.dataset.value).split(".")[1] || "").length, t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---------- Scroll reveal ----------
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (e.target.id === "stats") e.target.querySelectorAll(".stat-value").forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    if (stats.length) io.observe(statsEl);
  } else {
    document.documentElement.classList.add("no-js");
  }

  // ---------- Contact ----------
  var email = S.email || "";
  var direct = $("directEmail");
  direct.textContent = email;
  direct.href = "mailto:" + email;
  if (S.startingRate) {
    $("rate").hidden = false;
    $("rate").textContent = "Videos start at " + S.startingRate + ".";
  }

  $("inquiry").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var from = $("f-email").value.trim(), msg = $("f-brand").value.trim(), err = $("formError");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) { err.textContent = "Add an email I can reply to."; err.hidden = false; $("f-email").focus(); return; }
    if (!msg) { err.textContent = "Tell me a little about what you're launching."; err.hidden = false; $("f-brand").focus(); return; }
    err.hidden = true;
    var subject = "UGC inquiry from " + from;
    var body = msg + "\n\nReply to: " + from;
    window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });

  // ---------- Footer ----------
  var links = $("footerLinks");
  [["IG", S.instagram], ["TikTok", S.tiktok], ["X", S.x]].forEach(function (p) {
    if (!p[1] || !p[1].url) return;
    var a = document.createElement("a");
    a.href = p[1].url; a.target = "_blank"; a.rel = "noopener";
    a.textContent = p[0] + " " + (p[1].handle || "");
    links.appendChild(a);
  });
  if (email) {
    var m = document.createElement("a");
    m.href = "mailto:" + email; m.textContent = email;
    links.appendChild(m);
  }
})();
