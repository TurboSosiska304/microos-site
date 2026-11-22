import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { BoardGlyph } from "../components/BoardGlyph";
import { ConsoleDemo } from "../components/ConsoleDemo";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  DOWNLOAD_URL,
  DOCS_URL,
  LICENSE_URL,
  RELEASE_TAG,
  RELEASE_URL,
  RELEASES_URL,
  REPO_URL,
  WIKI_DEV_URL,
  WIKI_URL,
  kernelContract,
  stableVersion,
  version,
} from "../config";
import { useLocale, type Locale } from "../i18n";
import { useVariant } from "../useVariant";

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

function Marquee() {
  const { t } = useLocale();

  return (
    <div className="kin-marquee py-4" aria-hidden="true">
      <div className="kin-marquee__track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {t.marquee.map((word) => (
              <span
                key={`${copy}-${word}`}
                className="flex items-center gap-6 whitespace-nowrap px-6 font-grotesk text-[13px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]"
              >
                {word}
                <span className="text-[var(--accent)]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionKicker({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--accent)]">
      {children}
    </p>
  );
}

export default function KineticPage() {
  useVariant("kinetic");
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const stackY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 28]);
  const glowY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -40]);

  return (
    <div className="v-kinetic kin-root min-h-screen overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:font-grotesk focus:text-xs focus:text-[var(--accent-ink)]"
      >
        {t.ui.skip}
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-xl">
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

      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="kin-blob kin-blob--a" />
            <div className="kin-blob kin-blob--b" />
            <div className="kin-blob kin-blob--c" />
            <div className="kin-noise" />
          </div>
          {!reduce && (
            <motion.div
              aria-hidden="true"
              style={{ y: glowY }}
              className="pointer-events-none absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_65%)] opacity-20 blur-[80px]"
            />
          )}

          <div className="relative mx-auto grid max-w-[1320px] gap-12 px-5 pb-16 pt-12 md:px-10 md:pb-24 md:pt-20 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--accent)] sm:px-3 sm:py-1.5 sm:text-[9.5px] sm:tracking-[0.14em]">
                  <span className="term-dot" /> {t.hero.statusPre} {version}
                </span>
                <span className="rounded-full border border-[var(--line)] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--muted)] sm:px-3 sm:py-1.5 sm:text-[9.5px] sm:tracking-[0.14em]">
                  {t.hero.statusStable} {stableVersion}
                </span>
                <span className="rounded-full border border-[var(--line)] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--muted)] sm:px-3 sm:py-1.5 sm:text-[9.5px] sm:tracking-[0.14em]">
                  {t.hero.statusLicense}
                </span>
              </motion.div>

              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 font-grotesk text-[clamp(3.1rem,9vw,7.2rem)] font-bold uppercase leading-[0.84] tracking-[-0.055em] text-[var(--ink-strong)]"
              >
                {t.hero.titleA}{" "}
                <br />
                {t.hero.titlePrefix && <>{t.hero.titlePrefix} </>}
                <span className="kin-gradient-text">{t.hero.titleAccent}</span>{" "}
                <br />
                {t.hero.titleB}
              </motion.h1>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="mt-7 max-w-xl font-grotesk text-[15px] leading-[1.7] text-[var(--muted)] sm:text-[17px]"
              >
                {t.hero.lead}
              </motion.p>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.26 }}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <motion.a
                  href={DOWNLOAD_URL}
                  whileHover={reduce ? undefined : { y: -3 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  className="kin-pill group justify-center"
                >
                  {t.hero.download} {version}
                  <span aria-hidden="true" className="kin-arrow">
                    ↓
                  </span>
                </motion.a>
                <motion.a
                  href={WIKI_URL}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={reduce ? undefined : { y: -3 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  className="kin-pill kin-pill--ghost group justify-center"
                >
                  {t.hero.wiki}
                  <span aria-hidden="true" className="kin-arrow">
                    ↗
                  </span>
                </motion.a>
              </motion.div>

              <motion.dl
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 flex max-w-lg divide-x divide-[var(--line)] border-y border-[var(--line)]"
              >
                {t.hero.facts.map((fact) => (
                  <div key={fact.label} className="flex-1 px-4 py-3 first:pl-0">
                    <dt className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--faint)]">
                      {fact.label}
                    </dt>
                    <dd className="mt-0.5 font-grotesk text-lg font-semibold text-[var(--ink-strong)]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={reduce ? undefined : { y: stackY }}
              className="relative lg:col-span-5"
              role="group"
              aria-label={t.ui.stackLabel}
            >
              <div className="kin-stack">
                <div className="kin-stack__inner">
                  <div className="kin-layer kin-layer--3" aria-hidden="true" />
                  <div className="kin-layer kin-layer--2" aria-hidden="true" />
                  <div className="kin-layer kin-layer--1 flex flex-col justify-between p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
                        {t.hero.stack.kicker}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--accent)]">
                        v{version}
                      </span>
                    </div>
                    <BoardGlyph
                      label={t.ui.boardAlt}
                      className="mx-auto w-[70%] max-w-[250px] sm:w-[64%]"
                    />
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-grotesk text-[15px] font-semibold leading-tight text-[var(--ink-strong)] sm:text-lg">
                          {t.hero.stack.ports}
                        </p>
                        <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--faint)]">
                          {t.hero.stack.sub}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[9px] text-[var(--accent)]">
                        {t.hero.stack.counter}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                {[t.hero.stack.ring, t.hero.stack.exec, t.hero.stack.bare].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-[var(--line-strong)] bg-[var(--panel)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink)]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Marquee />

        {/* Philosophy */}
        <section id="philosophy" className="mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <SectionKicker>{t.philosophy.kicker}</SectionKicker>
              <h2 className="mt-4 font-grotesk text-[clamp(2.3rem,5.6vw,4.8rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em] text-[var(--ink-strong)]">
                {t.philosophy.titleA}{" "}
                <br />
                <span className="kin-gradient-text">{t.philosophy.titleB}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5">
              <p className="max-w-md font-grotesk text-[14.5px] leading-[1.75] text-[var(--muted)]">
                {t.philosophy.lead}
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2" gap={0.08}>
            {t.philosophy.cards.map((card) => (
              <StaggerItem key={card.index}>
                <article className="kin-card group h-full p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--accent)]">
                      {card.index}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] opacity-60 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <h3 className="mt-5 font-grotesk text-[20px] font-semibold leading-tight tracking-[-0.015em] text-[var(--ink-strong)] transition-colors group-hover:text-[var(--accent)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-[1.7] text-[var(--muted)]">{card.body}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* One kernel, two machines, and the host test substrate */}
        <section
          id="machines"
          className="relative border-y border-[var(--line)] bg-[color-mix(in_srgb,var(--bg-soft)_72%,transparent)]"
        >
          <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-14">
            <Reveal className="lg:col-span-6">
              <SectionKicker>{t.claim.kicker}</SectionKicker>
              <h2 className="mt-4 font-grotesk text-[clamp(2.3rem,5.4vw,4.6rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em] text-[var(--ink-strong)]">
                {t.claim.titleA}{" "}
                <br />
                <span className="kin-gradient-text">{t.claim.titleB}</span>
              </h2>
              <p className="mt-6 max-w-lg font-grotesk text-[15px] leading-[1.75] text-[var(--muted)]">
                {t.claim.lead}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-6">
              <div className="kin-card p-5 md:p-7">
                <div className="rounded-xl border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-grotesk text-lg font-semibold text-[var(--ink-strong)]">
                      {t.claim.diagram.kernel}
                    </p>
                    <span className="rounded-full border border-[var(--line)] px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--accent)]">
                      {t.claim.diagram.kernelSub}
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-[9.5px] leading-relaxed tracking-[0.03em] text-[var(--faint)]">
                    {t.claim.diagram.kernelBody}
                  </p>
                </div>

                <div className="my-4 flex items-center gap-3" aria-hidden="true">
                  <span className="h-px flex-1 bg-[var(--line-strong)]" />
                  <span className="rounded-full border border-[var(--line)] px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-[var(--accent)]">
                    {t.claim.diagram.boundary}
                  </span>
                  <span className="h-px flex-1 bg-[var(--line-strong)]" />
                </div>

                <p className="mb-2 font-mono text-[8.5px] uppercase tracking-[0.16em] text-[var(--faint)]">
                  {t.claim.diagram.portsTitle}
                </p>
                <div className="grid gap-1.5">
                  {t.architectures.cards.map((port, index) => (
                    <div
                      key={port.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-[color-mix(in_srgb,var(--panel)_75%,transparent)] px-3 py-2.5"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[8.5px] text-[var(--accent)]">
                          0{index + 1}
                        </span>
                        <span className="font-grotesk text-[13px] font-semibold text-[var(--ink)]">
                          {port.name}
                        </span>
                      </span>
                      <span className="text-right font-mono text-[8px] uppercase tracking-[0.06em] text-[var(--faint)]">
                        {t.claim.diagram.portSubs[index]}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 font-mono text-[8.5px] leading-relaxed tracking-[0.03em] text-[var(--faint)]">
                  {t.claim.diagram.footnote}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Architectures */}
        <section id="architectures" className="mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-3xl">
            <SectionKicker>{t.architectures.kicker}</SectionKicker>
            <h2 className="mt-4 font-grotesk text-[clamp(2.2rem,5.4vw,4.6rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em] text-[var(--ink-strong)]">
              {t.architectures.titleA}{" "}
              <br />
              <span className="kin-gradient-text">{t.architectures.titleB}</span>
            </h2>
            <p className="mt-6 max-w-xl font-grotesk text-[14.5px] leading-[1.75] text-[var(--muted)]">
              {t.architectures.lead}
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 lg:grid-cols-3" gap={0.1}>
            {t.architectures.cards.map((card, index) => (
              <StaggerItem key={card.id}>
                <article className="kin-card group flex h-full flex-col p-6 md:p-7">
                  <div
                    aria-hidden="true"
                    className="h-1 w-14 rounded-full"
                    style={{
                      backgroundImage: [
                        "linear-gradient(90deg, var(--accent), var(--accent-3))",
                        "linear-gradient(90deg, var(--accent-3), var(--accent-2))",
                        "linear-gradient(90deg, var(--violet), var(--accent-2))",
                      ][index],
                    }}
                  />
                  <div className="mt-5 flex items-baseline justify-between gap-3">
                    <h3 className="font-grotesk text-[clamp(1.7rem,2.4vw,2.1rem)] font-bold uppercase tracking-[-0.04em] text-[var(--ink-strong)]">
                      {card.name}
                    </h3>
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--faint)]">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="font-grotesk text-[13px] text-[var(--muted)]">{card.machine}</p>
                  <p className="mt-3 font-mono text-[8.5px] leading-relaxed tracking-[0.03em] text-[var(--faint)]">
                    {card.stack}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {card.specs.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-md border border-[var(--line)] px-2 py-1 font-mono text-[8.5px] text-[var(--muted)]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-[var(--line)] pt-4">
                    <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-[var(--accent)]">
                      {t.architectures.works}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {card.works.map((item) => (
                        <li key={item} className="flex gap-2 text-[12.5px] leading-[1.6] text-[var(--muted)]">
                          <span aria-hidden="true" className="mt-px text-[var(--accent)]">
                            +
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 border-t border-[var(--line)] pt-4">
                    <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-[var(--faint)]">
                      {t.architectures.limits}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {card.limits.map((item) => (
                        <li key={item} className="flex gap-2 text-[12.5px] leading-[1.6] text-[var(--faint)]">
                          <span aria-hidden="true" className="mt-px">
                            −
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Timeline */}
        <section
          id="timeline"
          className="border-y border-[var(--line)] bg-[color-mix(in_srgb,var(--bg-soft)_72%,transparent)]"
        >
          <div className="mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-28">
            <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <SectionKicker>{t.timeline.kicker}</SectionKicker>
                <h2 className="mt-4 font-grotesk text-[clamp(2.2rem,5.4vw,4.6rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em] text-[var(--ink-strong)]">
                  {t.timeline.titleA}{" "}
                  <span className="kin-gradient-text">{t.timeline.titleB}</span>
                </h2>
              </div>
              <p className="max-w-md font-grotesk text-[14px] leading-[1.7] text-[var(--muted)] lg:col-span-5">
                {t.timeline.lead}
              </p>
            </Reveal>

            <Stagger className="mt-12" gap={0.08}>
              <ol className="ml-2 border-l border-[var(--line-strong)] xl:ml-0 xl:grid xl:grid-cols-5 xl:border-l-0">
                {t.timeline.items.map((item) => (
                  <li
                    key={item.version}
                    className="relative border-l-0 pb-8 pl-6 last:pb-0 xl:border-t xl:border-[var(--line-strong)] xl:pb-8 xl:pl-0 xl:pr-5 xl:pt-7"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full xl:-top-[5px] xl:left-0 ${
                        item.planned
                          ? "border border-dashed border-[var(--accent)] bg-[var(--bg)]"
                          : "bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]"
                      }`}
                    />
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
                      {item.version}
                    </p>
                    <h3 className="mt-2 font-grotesk text-[17px] font-semibold leading-tight text-[var(--ink-strong)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-[12.5px] leading-[1.65] text-[var(--muted)]">
                      {item.body}
                    </p>
                    <span className="mt-3 inline-block rounded-full border border-[var(--line)] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--muted)]">
                      {item.tag}
                    </span>
                  </li>
                ))}
              </ol>
            </Stagger>
          </div>
        </section>

        {/* Features */}
        <section id="inside" className="mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-28">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionKicker>{t.features.kicker}</SectionKicker>
              <h2 className="mt-4 max-w-2xl font-grotesk text-[clamp(2.2rem,5.4vw,4.4rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em] text-[var(--ink-strong)]">
                {t.features.titleA}{" "}
                <br />
                <span className="kin-gradient-text">{t.features.titleB}</span>
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[10px] leading-relaxed tracking-[0.03em] text-[var(--faint)]">
              {t.features.note}
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-6" gap={0.06}>
            {t.features.items.map((feature, index) => {
              const wide = index < 2;
              return (
                <StaggerItem key={feature.index} className={wide ? "lg:col-span-3" : "lg:col-span-2"}>
                  <article
                    className={`kin-card group flex h-full flex-col p-6 ${
                      feature.planned ? "border-dashed" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]">
                        {feature.index}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.12em] ${
                          feature.planned
                            ? "border border-dashed border-[var(--line-strong)] text-[var(--faint)]"
                            : feature.tag === "x86-64"
                              ? "bg-[color-mix(in_srgb,var(--accent-3)_14%,transparent)] text-[var(--accent-3)]"
                              : feature.tag === "0.6"
                                ? "bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]"
                                : "border border-[var(--line)] text-[var(--muted)]"
                        }`}
                      >
                        {feature.tag}
                      </span>
                    </div>
                    <h3 className="mt-5 font-grotesk text-[19px] font-semibold leading-tight tracking-[-0.01em] text-[var(--ink-strong)] transition-colors group-hover:text-[var(--accent)]">
                      {feature.title}
                    </h3>
                    <p className="mt-2.5 text-[13px] leading-[1.7] text-[var(--muted)]">
                      {feature.body}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>

        {/* Console */}
        <section className="border-y border-[var(--line)] bg-[color-mix(in_srgb,var(--bg-soft)_55%,transparent)]">
          <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-14">
            <Reveal className="lg:col-span-5">
              <SectionKicker>{t.console.kicker}</SectionKicker>
              <h2 className="mt-4 font-grotesk text-[clamp(2.2rem,4.6vw,3.8rem)] font-bold uppercase leading-[0.92] tracking-[-0.045em] text-[var(--ink-strong)]">
                {t.console.titleA}{" "}
                <br />
                {t.console.titleB}{" "}
                <br />
                <span className="kin-gradient-text">{t.console.titleC}</span>
              </h2>
              <p className="mt-6 max-w-md font-grotesk text-[14.5px] leading-[1.75] text-[var(--muted)]">
                {t.console.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {t.console.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[var(--line)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <p className="mt-4 font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--faint)]">
                {t.console.source}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-[28px] bg-[linear-gradient(120deg,var(--accent),transparent_40%,var(--accent-2))] opacity-15 blur-2xl"
                />
                <ConsoleDemo />
              </div>
            </Reveal>
          </div>
        </section>

        {/* What's next */}
        <section id="next" className="mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-3xl">
            <SectionKicker>{t.next.kicker}</SectionKicker>
            <h2 className="mt-4 font-grotesk text-[clamp(2.2rem,5.4vw,4.6rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em] text-[var(--ink-strong)]">
              {t.next.titleA}{" "}
              <br />
              <span className="kin-gradient-text">{t.next.titleB}</span>
            </h2>
            <p className="mt-6 max-w-xl font-grotesk text-[14.5px] leading-[1.75] text-[var(--muted)]">
              {t.next.lead}
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 lg:grid-cols-3" gap={0.1}>
            {t.next.cards.map((card) => (
              <StaggerItem key={card.title}>
                <article
                  className={`kin-card group flex h-full flex-col p-6 md:p-7 ${
                    card.current
                      ? "border-[color-mix(in_srgb,var(--accent)_55%,transparent)] bg-[color-mix(in_srgb,var(--accent)_6%,var(--panel))]"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--accent)]">
                      {card.phase}
                    </span>
                    <span className="flex items-center gap-2 rounded-full border border-[var(--line)] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--faint)]">
                      {card.current && <span className="term-dot !h-1.5 !w-1.5 text-[var(--accent)]" />}
                      {card.status}
                    </span>
                  </div>
                  <h3 className="mt-5 font-grotesk text-[24px] font-bold tracking-[-0.03em] text-[var(--ink-strong)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.7] text-[var(--muted)]">{card.body}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Docs */}
        <section className="mx-auto max-w-[1320px] px-5 pb-20 md:px-10 md:pb-28">
          <Reveal>
            <div className="rounded-[28px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--panel)_65%,transparent)] p-6 md:p-9">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-6">
                  <SectionKicker>{t.docs.kicker}</SectionKicker>
                  <h2 className="mt-3 font-grotesk text-[clamp(1.8rem,3.4vw,2.7rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-[var(--ink-strong)]">
                    {t.docs.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-[13.5px] leading-[1.7] text-[var(--muted)]">
                    {t.docs.body}
                  </p>
                  <p className="mt-3 font-mono text-[8.5px] leading-relaxed tracking-[0.03em] text-[var(--faint)]">
                    {t.docs.note}
                  </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:col-span-6">
                  {[
                    [t.docs.stable, WIKI_URL],
                    [t.docs.dev, WIKI_DEV_URL],
                    [t.docs.source, DOCS_URL],
                    [t.footer.license, LICENSE_URL],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_45%,transparent)] px-4 py-3.5 transition-colors hover:border-[var(--accent)] hover:bg-[var(--panel-2)]"
                    >
                      <span className="font-grotesk text-[13px] font-medium text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                        {label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-[11px] text-[var(--faint)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                      >
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Release */}
        <section id="release" className="mx-auto max-w-[1320px] px-5 pb-20 md:px-10 md:pb-28">
          <Reveal>
            <div className="rounded-[28px] bg-[linear-gradient(130deg,var(--accent)_0%,var(--violet)_48%,var(--accent-2)_100%)] p-[1px] shadow-[var(--shadow)]">
              <div className="rounded-[27px] bg-[color-mix(in_srgb,var(--bg)_94%,transparent)] px-6 py-8 md:px-10 md:py-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <SectionKicker>{t.release.kicker}</SectionKicker>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent)_40%,transparent)] px-3 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--accent)]">
                      <span className="term-dot" /> {t.release.pre}
                    </span>
                    <span className="rounded-full border border-[var(--line)] px-3 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--muted)]">
                      {t.release.lastStable}: v{stableVersion}
                    </span>
                    <span className="rounded-full border border-[var(--line)] px-3 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--muted)]">
                      {t.release.date}
                    </span>
                  </div>
                </div>

                <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-6">
                    <h2 className="font-grotesk text-[clamp(2.4rem,5.2vw,4.4rem)] font-bold leading-none tracking-[-0.055em] text-[var(--ink-strong)]">
                      v{version}
                    </h2>
                    <p className="mt-4 max-w-md font-grotesk text-[14.5px] leading-[1.7] text-[var(--muted)]">
                      {t.release.lead}
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {t.release.notes.map((note) => (
                        <li key={note} className="flex gap-3 text-[13px] leading-relaxed text-[var(--muted)]">
                          <span aria-hidden="true" className="mt-0.5 text-[var(--accent)]">
                            ▸
                          </span>
                          {note}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <motion.a
                        href={DOWNLOAD_URL}
                        whileHover={reduce ? undefined : { y: -3 }}
                        whileTap={reduce ? undefined : { scale: 0.97 }}
                        className="kin-pill group justify-center"
                      >
                        {t.release.download}
                        <span aria-hidden="true" className="kin-arrow">
                          ↓
                        </span>
                      </motion.a>
                      <motion.a
                        href={RELEASE_URL}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={reduce ? undefined : { y: -3 }}
                        whileTap={reduce ? undefined : { scale: 0.97 }}
                        className="kin-pill kin-pill--ghost group justify-center"
                      >
                        {t.release.github}
                        <span aria-hidden="true" className="kin-arrow">
                          ↗
                        </span>
                      </motion.a>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--panel)_80%,transparent)]">
                      {t.release.assets.map((asset) => (
                        <a
                          key={asset.name}
                          href={`${REPO_URL}/releases/download/${RELEASE_TAG}/${asset.name}`}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-baseline justify-between gap-4 border-b border-[var(--line)] px-4 py-3.5 transition-colors last:border-b-0 hover:bg-[var(--panel-2)]"
                        >
                          <span className="min-w-0">
                            <span className="block break-all font-mono text-[11px] text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                              {asset.name}
                            </span>
                            <span className="mt-0.5 block font-grotesk text-[11px] text-[var(--faint)]">
                              {asset.note}
                            </span>
                          </span>
                          <span className="flex shrink-0 items-center gap-3 font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--faint)]">
                            {asset.size}
                            <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
                              ↓
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                    <p className="mt-4 font-mono text-[9px] leading-relaxed tracking-[0.03em] text-[var(--faint)]">
                      {t.release.flash}
                    </p>
                    <p className="mt-2 font-mono text-[9px] tracking-[0.03em] text-[var(--faint)]">
                      {t.release.license}: MIT ·{" "}
                      {t.footer.contract} {kernelContract} · {t.release.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

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
