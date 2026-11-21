# microos-site — three directions for microos.org

Concept landing pages for **Micro OS**, a portable kernel for small machines. This
is a design comparison, not the final site: three single-page directions share
the same facts and differ in voice, palette and motion.

| Route | Direction | Idea |
|---|---|---|
| `/terminal` | Engineering / dark-first | graphite, phosphor green, monospaced labels, a grid, a live console |
| `/editorial` | Editorial / light-first | warm paper, Instrument Serif, asymmetric grid, a calm magazine story |
| `/kinetic` | Kinetic / neon | dark gradients, huge Space Grotesk, a tilted 3D port stack, a marquee |

`/` is a small chooser that links to all three.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Motion (`framer-motion`) for section reveals, staggered grids, hover/tap and
  the hero parallax
- Self-hosted fonts via Fontsource: Inter, Newsreader, Instrument Serif,
  Space Grotesk, JetBrains Mono

## Run

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4173
# http://localhost:4173/terminal
```

```bash
npm run build      # typecheck + production build
npm run typecheck
npm run preview
```

## Themes

Every direction has a working light/dark toggle in its header. The choice is
applied as `data-theme` on `<html>`, saved in `localStorage` under
`microos-theme`, and the first visit follows `prefers-color-scheme`. Each
palette is designed for its own theme rather than inverted: the terminal goes
from phosphor night to a pale workbench; the editorial page from paper to a
lamp-lit ink; the kinetic page from black neon to lavender daylight.

Motion respects `prefers-reduced-motion`: reveals resolve immediately, the
marquee and blobs stop, and hover transforms are disabled.

## Content

All copy is based on the Micro OS tree at `v0.6.0-rc1` (the `Micro_OS_p7`
worktree) and the public GitHub release:

- release: <https://github.com/TurboSosiska304/Micro_OS/releases/tag/v0.6.0-rc1>
- asset names and sizes are the ones published in that release
- the console transcript is condensed from `docs/wiki/programs.md` and shows
  the x86-64 port, the only machine that runs MOX1 programs
- “next” is called out explicitly (many cores / `KERNEL_SMP`) and is not
  presented as shipped

The wiki link points at <https://wiki.microos.org>, still a placeholder.

## Notes

- The board drawing is an SVG abstraction of the StickC Plus2, not a photo.
- The site is static; no backend, no analytics.
- This repository is local-only and has not been pushed.
