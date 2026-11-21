// GitHub Pages serves 404.html for a path it does not have. The site is a
// SPA, so a deep link such as /microos-site/kinetic must boot index.html and
// let the router read the path. Copying the built index is the fallback.
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve("dist");
const index = resolve(dist, "index.html");

if (!existsSync(index)) {
  console.error("spa-fallback: dist/index.html is missing; run vite build first");
  process.exit(1);
}

copyFileSync(index, resolve(dist, "404.html"));
console.log("spa-fallback: wrote dist/404.html");
