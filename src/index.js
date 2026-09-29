// Routes one Cloudflare Worker across two domains.
//   marufbagwan.com/...             -> public/...
//   marufbagwan.com/salesforce...  -> public/salesforce/...
// A new hub section is just a new folder under public/salesforce/ — no change needed here.

const MAIN = "marufbagwan.com";
const SF = "salesforce.marufbagwan.com";
const PREFIX = "/salesforce";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname;

    // www -> apex
    if (host === "www." + MAIN) {
      url.hostname = MAIN;
      return Response.redirect(url.toString(), 301);
    }

    // Main domain: old /salesforce/* paths move to the subdomain
    if (host === MAIN && (url.pathname === PREFIX || url.pathname.startsWith(PREFIX + "/"))) {
      url.hostname = SF;
      url.pathname = url.pathname.slice(PREFIX.length) || "/";
      return Response.redirect(url.toString(), 301);
    }

    // Subdomain: serve files from public/salesforce/
    if (host === SF) {
      if (url.pathname === PREFIX || url.pathname.startsWith(PREFIX + "/")) {
        url.pathname = url.pathname.slice(PREFIX.length) || "/";
        return Response.redirect(url.toString(), 301);
      }
      const inner = new URL(url);
      inner.pathname = PREFIX + url.pathname;
      const res = await env.ASSETS.fetch(new Request(inner.toString(), request));
      // Trailing-slash redirects come back as /salesforce/quiz/ — strip the prefix
      const loc = res.headers.get("Location");
      if (loc && res.status >= 300 && res.status < 400) {
        const l = new URL(loc, inner);
        if (l.pathname.startsWith(PREFIX)) {
          const out = new URL(url);
          out.pathname = l.pathname.slice(PREFIX.length) || "/";
          out.search = l.search;
          return Response.redirect(out.toString(), res.status);
        }
      }
      return res;
    }

    // marufbagwan.com and *.workers.dev previews: serve as-is
    return env.ASSETS.fetch(request);
  }
};
