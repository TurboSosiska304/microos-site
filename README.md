# microos-site — the Micro OS landing page

The final landing page for **Micro OS**, a portable kernel for small machines.
It is the kinetic direction chosen from the three concepts, now the home page
at `/` and at `/kinetic`. `/terminal` and `/editorial` remain in the repository
as the two losing directions, split out of the main bundle.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Motion (`framer-motion`) for reveals, staggered grids, hover/tap and the hero
  parallax
- Self-hosted fonts: Space Grotesk for Latin, Manrope for Cyrillic, JetBrains
  Mono for code, with Inter, Newsreader and Instrument Serif kept for the two
  reference directions

## Run

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4173
# http://localhost:4173/kinetic
```

```bash
npm run build       # typecheck, Vite build, SPA 404.html
npm run preview -- --port 4174
# http://localhost:4174/microos-site/
```

Development is served from `/`; the production build uses Vite's `base` of
`/microos-site/` because the site lives at
<https://turbososiska304.github.io/microos-site/>.

## Content and languages

Everything on the final page is in `src/i18n.tsx`: two dictionaries with the
same shape, `en` and `ru`, and the RU object is typed as the EN object, so a
missing key is a TypeScript error. The language choice is saved in
`localStorage` under `microos-lang`. The site always opens in English; only an
explicit switch to RU is remembered for the next visit. `<html lang>` and the meta
description, OG title and locale follow the choice.

The theme is separate: every page has a light/dark toggle, saved under
`microos-theme`, starting from `prefers-color-scheme`. Both choices are applied
before the first paint by the inline script in `index.html`.

The architecture copy follows ADR 0004: ESP32 and x86-64 are the two machines; `host` is the Linux-process test substrate, not a third machine or a product target.

Facts come from the `v1.2.0` tree and the published release. “Next” and
“plan” are marked as such; there are no invented dates.

## Addresses

All public links live in `src/config.ts`. There is no custom domain yet,
so the defaults are GitHub Pages:

| What | Default |
|---|---|
| landing | `https://turbososiska304.github.io/microos-site/` |
| wiki, latest stable | `https://turbososiska304.github.io/Micro_OS/` |
| wiki, dev | `https://turbososiska304.github.io/Micro_OS/dev/` |
| kernel repository | `https://github.com/TurboSosiska304/Micro_OS` |
| programs repository | `https://turbososiska304.github.io/microos-progs/` |

When the domain exists, change the constants in `src/config.ts` and Vite's
`SITE_BASE` to `/`; the canonical, OG tags, robots and sitemap are generated
from the same file at build time.

## Deploy

The static build is published from `gh-pages` of this repository. Nothing in
this checkout has been pushed.

```bash
DEPLOY_REPO=git@github.com:TurboSosiska304/microos-site.git ./deploy.sh
```

`deploy.sh` runs `npm ci`, builds, and force-pushes `dist/` to the `gh-pages`
branch. `DEPLOY_BRANCH` overrides the branch. A GitHub Actions workflow in
`.github/workflows/deploy.yml` does the same on pushes to `main` with
`peaceiris/actions-gh-pages`; it has not been run.

The build also writes `dist/404.html` (a copy of the SPA entry) so a deep link
such as `/microos-site/kinetic` boots the router on GitHub Pages.

## What to check

- `npm run build` must pass the type check and the build.
- Widths 360, 390, 640, 768, 1024 and 1440, in both themes and both languages:
  no horizontal overflow, no text under the hero card.
- The hero stack is flat and readable below 1024px; the 3D layers only appear
  on desktop, and the badges sit in a normal flex row under the card.
- `prefers-reduced-motion` disables the marquee, the drifting glow and the
  scroll reveals.
