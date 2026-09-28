/* Rendering helpers shared by the Salesforce hub pages. Load after site.js. */
window.HUB = (function () {
  var esc = MB.esc;
  var TODAY = new Date(); TODAY.setHours(0, 0, 0, 0);
  var STATUS = {
    "GA": "st-ga", "Beta": "st-beta", "Developer Preview": "st-pilot",
    "Release Update": "st-ru", "Removed": "st-removed", "New": "st-new"
  };
  function shortDate(iso) {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }
  return {
    renderDates: function (el, dates) {
      var nextFound = false;
      el.innerHTML = dates.map(function (d) {
        var when = new Date(d.date + "T00:00:00");
        var cls = "";
        if (when < TODAY) cls = "done";
        else if (!nextFound) { cls = "next"; nextFound = true; }
        return '<li class="' + cls + '"><span class="d">' + shortDate(d.date) + '</span><span class="l">' +
          esc(d.label) + (cls === "next" ? " · next" : "") + '</span></li>';
      }).join("");
    },
    featureRow: function (f) {
      return '<li><h3>' + esc(f.title) + '</h3><span class="st ' + (STATUS[f.status] || "st-new") + '">' + esc(f.status) +
        '</span><p>' + esc(f.text) + '</p><span class="area">' + esc(f.area) + '</span></li>';
    },
    newsRow: function (n) {
      return '<li><span class="date">' + MB.fmtDate(n.date) + '</span><div><h3><a href="' + esc(n.url) +
        '" target="_blank" rel="noopener">' + esc(n.title) + '</a></h3><p>' + esc(n.summary) +
        '</p><div class="meta"><span class="tag">' + esc(n.tag) + '</span><span>' + esc(n.source) + ' ↗</span></div></div></li>';
    }
  };
})();
