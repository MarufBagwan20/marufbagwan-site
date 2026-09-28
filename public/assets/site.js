/*
  Shared script for marufbagwan.com and salesforce.marufbagwan.com.

  Links in the HTML are written for production:
    main site      ->  "/about/", "/updates/"
    salesforce hub ->  "https://salesforce.marufbagwan.com/quiz/"
  When the pages are opened anywhere else (a local folder or a preview host),
  those links are rewritten to relative file paths so the whole site can be
  browsed from one folder. On the real domains nothing is changed.

  <script src="…/assets/site.js" data-root="../" data-site="main|sf">
    data-root = relative path from this page to the preview root
    data-site = which site this page belongs to
*/
(function () {
  var me = document.currentScript;
  var ROOT = (me && me.dataset.root) || "";
  var SITE = (me && me.dataset.site) || "main";
  var PROD = /(^|\.)marufbagwan\.com$/.test(location.hostname);
  var FILE = location.protocol === "file:";

  function localPath(href) {
    var m, host = SITE, path, hash = "";
    m = href.match(/^https?:\/\/(salesforce\.)?marufbagwan\.com(\/[^#?]*)?(#.*)?$/i);
    if (m) { host = m[1] ? "sf" : "main"; path = m[2] || "/"; hash = m[3] || ""; }
    else if (href.charAt(0) === "/" && href.charAt(1) !== "/") {
      var i = href.indexOf("#");
      path = i < 0 ? href : href.slice(0, i);
      hash = i < 0 ? "" : href.slice(i);
    } else return null;
    var rel = path.replace(/^\//, "");
    var base = host === "sf" ? ROOT + "salesforce/" : ROOT;
    var target = base + rel;
    if (target === "" || /\/$/.test(target)) {
      // The preview root itself: a directory URL serves the landing page.
      if (!FILE && host === "main" && rel === "") return (ROOT || "./") + hash;
      target += "index.html";
    }
    return target + hash;
  }

  if (!PROD) {
    document.querySelectorAll("a[href]").forEach(function (a) {
      var p = localPath(a.getAttribute("href"));
      if (p !== null) { a.setAttribute("href", p); a.removeAttribute("target"); }
    });
  }

  // Copy-to-clipboard buttons: <button class="copy" data-copy="text">
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-copy]");
    if (!b) return;
    var text = b.getAttribute("data-copy");
    var done = function () { var t = b.textContent; b.textContent = "Copied"; setTimeout(function () { b.textContent = t; }, 1400); };
    try {
      navigator.clipboard.writeText(text).then(done, function () { selectNear(b); });
    } catch (err) { selectNear(b); }
  });
  function selectNear(b) {
    var el = b.parentNode.querySelector(".email");
    if (!el) return;
    var r = document.createRange(); r.selectNodeContents(el);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }

  // Tiny helpers shared by the pages
  window.MB = {
    fmtDate: function (iso) {
      var d = new Date(iso + "T00:00:00");
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    },
    esc: function (s) {
      return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
    },
    store: {
      get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
      set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
    },
    fixLinks: function (scope) {
      if (PROD) return;
      scope.querySelectorAll("a[href]").forEach(function (a) {
        var p = localPath(a.getAttribute("href"));
        if (p !== null) { a.setAttribute("href", p); a.removeAttribute("target"); }
      });
    }
  };
})();
