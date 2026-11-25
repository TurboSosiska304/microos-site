import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  DOWNLOAD_URL,
  DOCS_URL,
  GALLERY_URL,
  LICENSE_URL,
  RELEASES_URL,
  REPO_URL,
  WIKI_DEV_URL,
  WIKI_URL,
  kernelContract,
  version,
} from "../config";
import { useLocale, type Locale } from "../i18n";
import { ThemeToggle } from "./ThemeToggle";

function LangToggle() {
  const { locale, setLocale, t } = useLocale();
  const options: Locale[] = ["en", "ru"];

  return (
    <div
      className="flex items-center rounded-full border border-[var(--line-strong)] bg-[var(--panel)] p-0.5"
      role="group"
      aria-label={t.ui.langLabel}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          aria-pressed={locale === option}
          className={`rounded-full px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] transition-colors ${
            locale === option
              ? "bg-[var(--accent)] text-[var(--accent-ink)]"
              : "text-[var(--muted)] hover:text-[var(--ink)]"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

/**
 * The header, footer and page frame shared by the home page and the gallery.
 * Children are the page's <main>: anchors such as #main stay within that page.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  const reduce = useReducedMotion();

  return (
    <div className="v-kinetic kin-root min-h-screen overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:font-grotesk focus:text-xs focus:text-[var(--accent-ink)]"
      >
        {t.ui.skip}
      </a>

      <header className="relative z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1320px] items-center gap-5 px-5 md:px-10">
          <a href="#main" className="group flex shrink-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className="relative grid h-8 w-8 place-items-center rounded-xl bg-[var(--accent)] font-grotesk text-sm font-bold text-[var(--accent-ink)] transition-transform duration-300 group-hover:rotate-6"
            >
              M
            </span>
            <span className="font-grotesk text-[15px] font-semibold tracking-[-0.02em] text-[var(--ink-strong)]">
              micro<span className="text-[var(--accent)]">/</span>os
            </span>
          </a>

          <nav className="hidden items-center gap-5 lg:flex" aria-label={t.nav.menu}>
            {[
              [t.nav.philosophy, "#philosophy"],
              [t.nav.machines, "#machines"],
              [t.nav.architectures, "#architectures"],
              [t.nav.timeline, "#timeline"],
              [t.nav.release, "#release"],
              [t.nav.gallery, GALLERY_URL],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="kin-nav-link whitespace-nowrap font-grotesk text-[12.5px] font-medium text-[var(--muted)] hover:text-[var(--ink)]"
              >
                {label}
              </a>
            ))}
            <a
              href={WIKI_URL}
              target="_blank"
              rel="noreferrer"
              className="kin-nav-link hidden whitespace-nowrap font-grotesk text-[12.5px] font-medium text-[var(--muted)] hover:text-[var(--ink)] lg:inline"
            >
              {t.nav.wiki} ↗
            </a>
          </nav>

          <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
            <LangToggle />
            <ThemeToggle labels={{ toLight: t.ui.themeToLight, toDark: t.ui.themeToDark }} />
            <div className="hidden sm:block">
              <motion.a
                href={DOWNLOAD_URL}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                className="kin-pill whitespace-nowrap !px-4 !py-2 !text-[12px]"
              >
                {t.nav.download} {version}
              </motion.a>
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-[var(--line)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-[1320px] px-5 py-12 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <a
                href="#main"
                className="font-grotesk text-[clamp(2.2rem,5vw,3.4rem)] font-bold uppercase leading-none tracking-[-0.05em] text-[var(--ink-strong)] transition-colors hover:text-[var(--accent)]"
              >
                Micro<span className="text-[var(--accent)]">/</span>OS
              </a>
              <p className="mt-4 max-w-sm font-grotesk text-[13.5px] leading-relaxed text-[var(--muted)]">
                {t.footer.tagline}
              </p>
              <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]">
                {t.footer.contract} {kernelContract} · MIT · 2026
              </p>
            </div>

            <div className="md:col-span-3 md:col-start-7">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]">
                {t.footer.project}
              </p>
              <ul className="mt-4 space-y-2.5 font-grotesk text-[13.5px]">
                {[
                  [t.footer.github, REPO_URL],
                  [t.footer.releases, RELEASES_URL],
                  [t.footer.docs, DOCS_URL],
                  [t.footer.license, LICENSE_URL],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                    >
                      {label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]">
                {t.footer.read}
              </p>
              <ul className="mt-4 space-y-2.5 font-grotesk text-[13.5px]">
                {[
                  [t.footer.wikiStable, WIKI_URL],
                  [t.footer.wikiDev, WIKI_DEV_URL],
                  [t.footer.github, REPO_URL],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                    >
                      {label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]">
              {t.footer.built} · {t.footer.copyright}
            </p>
            <a
              href="#main"
              className="rounded-full border border-[var(--line)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t.footer.back} ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
