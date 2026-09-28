// Routes one Cloudflare Pages project across two domains.
//   marufbagwan.com/...             -> public/...
//   salesforce.marufbagwan.com/...  -> public/salesforce/...
// Add a new hub section by adding a folder under public/salesforce/ — no change here needed.

const MAIN = "marufbagwan.com";
const SF = "salesforce.marufbagwan.com";
const PREFIX = "/salesforce";

export async function onRequest({ request, env, next }) {
  const url = new URL(request.url);
  const host = url.hostname;

  // www -> apex
  if (host === "www." + MAIN) {
    url.hostname = MAIN;
    return Response.redirect(url.toString(), 301);
  }

  // Main domain: send old /salesforce/* paths to the subdomain
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
    // Pages adds trailing-slash redirects like /salesforce/quiz -> /salesforce/quiz/; strip the prefix
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

  // Everything else (marufbagwan.com, *.pages.dev previews) as normal
  return next();
}
