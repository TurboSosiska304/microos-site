import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { OG_IMAGE_URL, SITE_BASE, SITE_LASTMOD, SITE_URL } from "./src/config.ts";

/** Everything a crawler reads comes from src/config.ts, not from a second copy. */
function siteMeta(): Plugin {
  return {
    name: "microos-site-meta",
    transformIndexHtml(html) {
      return html
        .replaceAll("%SITE_URL%", SITE_URL)
        .replaceAll("%OG_IMAGE_URL%", OG_IMAGE_URL);
    },
    writeBundle(options) {
      const out = options.dir ?? resolve("dist");
      mkdirSync(out, { recursive: true });
      writeFileSync(
        resolve(out, "robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`,
      );
      writeFileSync(
        resolve(out, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url>\n    <loc>${SITE_URL}</loc>\n    <lastmod>${SITE_LASTMOD}</lastmod>\n` +
          `    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n` +
          `</urlset>\n`,
      );
    },
  };
}

// Development stays at "/" so the LAN preview links keep the short paths.
// The production build uses the GitHub Pages project path.
export default defineConfig(({ command, isPreview }) => ({
  base: command === "build" || isPreview ? SITE_BASE : "/",
  plugins: [react(), tailwindcss(), siteMeta()],
  server: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: true,
  },
}));
