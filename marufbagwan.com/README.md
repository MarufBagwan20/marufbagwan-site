# marufbagwan.com — unified project

One Git repo, one Cloudflare Pages project, two domains.

```
functions/_middleware.js      routes salesforce.marufbagwan.com -> public/salesforce/
public/                       build output (what Cloudflare serves)
  index.html                  marufbagwan.com/
  about/  updates/            marufbagwan.com/about/, /updates/
  assets/                     shared CSS/JS + updates.js (personal updates feed)
  salesforce/                 salesforce.marufbagwan.com/
    quiz/                     salesforce.marufbagwan.com/quiz/
    news/                     salesforce.marufbagwan.com/news/
    releases/                 salesforce.marufbagwan.com/releases/
    assets/                   hub CSS/JS + news.js, releases.js, quiz.js
```

New hub section = new folder under `public/salesforce/` (e.g. `public/salesforce/cta/`
serves at salesforce.marufbagwan.com/cta/). Add a tab for it in the `<ul class="tabs">` of each hub page.

## Cloudflare Pages settings
- Framework preset: None
- Build command: (empty)
- Build output directory: `public`
- Root directory: (empty / repo root)  — `functions/` must sit at the repo root

## Custom domains (Pages project > Custom domains)
- marufbagwan.com
- www.marufbagwan.com   (middleware redirects it to the apex)
- salesforce.marufbagwan.com

A domain can be attached to only one Pages project. Remove it from any old project first.

## Test before going live
Every push to a non-production branch gets a preview URL like `https://<branch>.<project>.pages.dev`.
There the hub is at `/salesforce/`, `/salesforce/quiz/` and so on, and links between the two
sites switch to local paths automatically.
