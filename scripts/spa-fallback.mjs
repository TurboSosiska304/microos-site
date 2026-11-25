// GitHub Pages serves 404.html for a path it does not have. The site is a
// SPA, so a deep link such as /microos-site/kinetic must boot index.html and
// let the page read the path. Copying the built index is the fallback.
// The gallery has a path of its own, so it gets a real directory as well:
// /microos-site/gallery/ answers 200 instead of falling through to 404.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve("dist");
const index = resolve(dist, "index.html");

if (!existsSync(index)) {
  console.error("spa-fallback: dist/index.html is missing; run vite build first");
  process.exit(1);
}

copyFileSync(index, resolve(dist, "404.html"));
console.log("spa-fallback: wrote dist/404.html");

const gallery = resolve(dist, "gallery");
mkdirSync(gallery, { recursive: true });
copyFileSync(index, resolve(gallery, "index.html"));
console.log("spa-fallback: wrote dist/gallery/index.html");
