// Routes one Cloudflare Worker across the site's domains.
//   marufbagwan.com/...                 -> public/...
//   marufbagwan.com/salesforce/...      -> public/salesforce/...
//   salesforce.marufbagwan.com/...      -> redirects to marufbagwan.com/salesforce/...
// A new hub section is just a new folder under public/salesforce/ — no change needed here.

const MAIN = "marufbagwan.com";
const SF = "salesforce." + MAIN;
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

    // Subdomain: old links move to marufbagwan.com/salesforce/...
    if (host === SF) {
      url.hostname = MAIN;
      if (!(url.pathname === PREFIX || url.pathname.startsWith(PREFIX + "/"))) {
        url.pathname = PREFIX + url.pathname;
      }
      return Response.redirect(url.toString(), 301);
    }

    // marufbagwan.com (including /salesforce/) and *.workers.dev previews: serve as-is
    return env.ASSETS.fetch(request);
  }
};
