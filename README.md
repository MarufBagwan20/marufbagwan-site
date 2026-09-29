# marufbagwan.com — unified project

One Git repo, one Cloudflare Worker (static assets), two domains.

```
wrangler.jsonc                Cloudflare config (site folder, domains)
src/index.js                  router; salesforce.marufbagwan.com redirects to /salesforce/
public/                       build output (what Cloudflare serves)
  index.html                  marufbagwan.com/
  about/  updates/            marufbagwan.com/about/, /updates/
  assets/                     shared CSS/JS + updates.js (personal updates feed)
  salesforce/                 marufbagwan.com/salesforce
    quiz/                     marufbagwan.com/salesforce/quiz/
    news/                     marufbagwan.com/salesforce/news/
    releases/                 marufbagwan.com/salesforcereleases/
    assets/                   hub CSS/JS + news.js, releases.js, quiz.js
```

New hub section = new folder under `public/salesforce/` (e.g. `public/salesforce/cta/`
serves at marufbagwan.com/salesforce/cta/). Add a tab for it in the `<ul class="tabs">` of each hub page.

## Cloudflare (Worker with static assets, deployed from Git)
- `wrangler.jsonc` tells Cloudflare the site is in `public/` and the router is `src/index.js`.
- Set `"name"` in `wrangler.jsonc` to your Worker's exact name in the dashboard.
- Build settings (Worker > Settings > Build): build command empty, deploy command `npx wrangler deploy`, root directory empty.
- Domains are listed under `routes` in `wrangler.jsonc`; each deploy attaches them.
  A domain already attached elsewhere (an old Pages project, or a DNS A/CNAME record) must be removed first.

## Test before going live
Each deploy is also reachable at `https://<name>.<account>.workers.dev`.
There the hub is at `/salesforce/`, `/salesforce/quiz/` and so on.
