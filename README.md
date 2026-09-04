# Earshot

An interactive demo of Earshot: five agents that listen to your industry's podcasts on a
schedule, discard 99% of what they hear, and hand you the few things that change what you'd
do this week.

The demo walks through three phases — write a standing brief, watch Scout build a source
list from it, then read the briefing the run produced. Three worked briefs are included
(payments product, biotech licensing, hardware procurement) to show the product is
horizontal.

All data in the demo is illustrative.

## Stack

- React 18 + Vite
- Tailwind CSS
- lucide-react for icons

The whole app is one component, `src/EarshotV2.jsx`. To update the demo, replace that file
— `src/main.jsx` renders whatever it default-exports.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Deploy to Cloudflare Pages

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and go to
   **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize GitHub and pick this repository.
3. Configure the build:

   | Setting | Value |
   | --- | --- |
   | Framework preset | Vite |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | *(leave blank)* |
   | Node version | 20 or later (set `NODE_VERSION=20` under Environment variables if the build picks an older one) |

4. Click **Save and Deploy**. Cloudflare gives you a `https://<project>.pages.dev` link to
   share, and rebuilds it automatically on every push to the production branch.

`public/_redirects` sends unknown paths to `index.html`, so deep links keep working.
