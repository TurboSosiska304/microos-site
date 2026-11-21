import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { BoardGlyph } from "../components/BoardGlyph";
import { ConsoleDemo } from "../components/ConsoleDemo";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  DOWNLOAD_URL,
  RELEASE_URL,
  REPO_URL,
  WIKI_URL,
  features,
  footerLinks,
  kernelContract,
  ports,
  release,
  stableVersion,
  standfirst,
  version,
} from "../content";
import { useVariant } from "../useVariant";

function Scribble({ children }: { children: ReactNode }) {
  return <span className="ed-tag">{children}</span>;
}

export default function EditorialPage() {
  useVariant("editorial");
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const figureY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -26]);

  return (
    <div className="v-editorial ed-root min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-[var(--bg)]"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur-md">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <div className="flex h-[68px] items-center justify-between gap-4">
            <Link to="/" className="group flex items-baseline gap-3" aria-label="Micro OS — all design directions">
              <span className="ed-display text-[28px] leading-none text-[var(--ink-strong)] transition-colors group-hover:text-[var(--accent)] md:text-[32px]">
                Micro OS
              </span>
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--faint)] sm:inline">
                est. 2026
              </span>
            </Link>

            <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted)] lg:block">
              A portable kernel · notes on release {version}
            </p>

            <div className="flex items-center gap-3">
              <a
                href={WIKI_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--accent)] sm:block"
              >
                wiki ↗
              </a>
              <ThemeToggle />
            </div>
          </div>

          <nav
            className="hidden h-9 items-center gap-7 border-t border-[var(--line)] md:flex"
            aria-label="Sections"
          >
            {[
              ["The claim", "#claim"],
              ["The machines", "#machines"],
              ["Features", "#features"],
              ["The release", "#release"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                {label}
              </a>
            ))}
            <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--faint)]">
              No. 06 / Release candidate
            </span>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="mx-auto max-w-[1320px] px-5 pb-12 pt-12 md:px-10 md:pb-16 md:pt-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[var(--line-strong)] pb-4"
              >
                <Scribble>Portable kernel</Scribble>
                <span className="h-3 w-px bg-[var(--line-strong)]" />
                <span className="ed-marginalia">C11 · contract {kernelContract} · MIT</span>
                <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--faint)]">
                  {release.date}
                </span>
              </motion.div>

              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="ed-display mt-8 text-[clamp(3.5rem,8.6vw,7.4rem)] text-[var(--ink-strong)]"
              >
                A kernel for
                <br />
                <em className="italic text-[var(--accent)]">small</em> machines.
              </motion.h1>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-9 grid gap-8 border-t border-[var(--line-strong)] pt-6 sm:grid-cols-[1fr_auto] sm:items-end"
              >
                <p className="ed-dropcap ed-serif max-w-2xl text-[17px] leading-[1.65] text-[var(--ink)]">
                  {standfirst} The board is one port of several, not the project; the x86-64 machine
                  is the proof that the kernel travels.
                </p>

                <div className="flex flex-col gap-2 sm:items-end">
                  <motion.a
                    href={DOWNLOAD_URL}
                    whileHover={reduce ? undefined : { y: -2 }}
                    whileTap={reduce ? undefined : { scale: 0.98 }}
                    className="ed-button group whitespace-nowrap"
                  >
                    Download {version}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
                      ↓
                    </span>
                  </motion.a>
                  <motion.a
                    href={WIKI_URL}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={reduce ? undefined : { y: -2 }}
                    whileTap={reduce ? undefined : { scale: 0.98 }}
                    className="ed-button ed-button--ghost group whitespace-nowrap"
                  >
                    Read the wiki
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </motion.a>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--faint)]">
                    pre-release {version} · stable {stableVersion}
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              style={reduce ? undefined : { y: figureY }}
              className="lg:col-span-4 lg:pt-16"
            >
              <motion.figure
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.24 }}
                className="ed-figure p-4"
              >
                <BoardGlyph className="w-full" />
                <figcaption className="mt-3 border-t border-[var(--line)] pt-3">
                  <span className="ed-marginalia block">
                    Fig. 1 — the StickC Plus2, abstracted. One of four ports; the only one with a
                    battery and a strap.
                  </span>
                </figcaption>
              </motion.figure>

              <div className="mt-5 border-l-2 border-[var(--accent)] pl-4">
                <p className="ed-serif text-[13px] leading-relaxed text-[var(--muted)]">
                  “The board is one port of several, not the project: a kernel is portable when a
                  second machine runs it.”
                </p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--faint)]">
                  — README.md
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* In this issue */}
        <section className="border-y border-[var(--line-strong)]">
          <div className="mx-auto grid max-w-[1320px] divide-y divide-[var(--line)] px-5 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-10">
            {[
              ["01", "The claim", "One kernel, three machines", "#claim"],
              ["02", "What is inside", "Small, but a whole system", "#features"],
              ["03", "The release", "0.6.0-rc1, and what is next", "#release"],
            ].map(([index, title, note, href]) => (
              <a
                key={index}
                href={href}
                className="group flex items-baseline gap-4 py-5 transition-colors hover:bg-[var(--panel-2)] md:px-5 md:first:pl-0 md:last:pr-0"
              >
                <span className="font-mono text-[10px] text-[var(--accent)]">{index}</span>
                <span>
                  <span className="ed-serif block text-[15px] italic text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                    {title}
                  </span>
                  <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--faint)]">
                    {note}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto text-[var(--faint)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Claim / ports */}
        <section id="claim" className="mx-auto max-w-[1320px] px-5 py-16 md:px-10 md:py-24">
          <Reveal>
            <div className="grid gap-8 border-b border-[var(--line-strong)] pb-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="ed-tag">§ 01 — The claim</p>
              </div>
              <div className="md:col-span-8">
                <h2 className="ed-display text-[clamp(2.6rem,5.4vw,4.6rem)] text-[var(--ink-strong)]">
                  One kernel,
                  <br />
                  <em className="italic">three machines.</em>
                </h2>
                <p className="ed-serif mt-5 max-w-2xl text-[16px] leading-[1.7] text-[var(--muted)]">
                  The same scheduler, syscall ABI, VFS, MicroFS, libc subset and shell compile for
                  every port. What differs is the machine: a radio and a battery here, a loader and
                  page tables there, a file volume in a Linux process. Nothing hardware-specific
                  lives above the boundary — and <em>make integrity</em> enforces it.
                </p>
              </div>
            </div>
          </Reveal>

          <div id="machines" className="mt-2">
            <Stagger className="grid md:grid-cols-3">
              {ports.map((port, index) => (
                <StaggerItem key={port.id}>
                  <motion.article
                    whileHover={reduce ? undefined : { y: -4 }}
                    transition={{ duration: 0.3 }}
                    className={`ed-port-card h-full border-b border-[var(--line-strong)] py-8 md:border-b-0 md:pr-8 ${
                      index > 0 ? "md:border-l md:border-l-[var(--line-strong)] md:pl-8" : ""
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
                        {port.index} / {port.kicker}
                      </p>
                      <span className="font-mono text-[9px] text-[var(--faint)]">{port.name}</span>
                    </div>
                    <h3 className="ed-display mt-3 text-[2.1rem] leading-none text-[var(--ink-strong)]">
                      {port.name}
                    </h3>
                    <p className="ed-serif mt-1 text-[14px] italic text-[var(--muted)]">
                      {port.machine}
                    </p>
                    <p className="mt-4 font-mono text-[9px] leading-relaxed tracking-[0.04em] text-[var(--faint)]">
                      {port.stack}
                    </p>
                    <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-y border-[var(--line)] py-3">
                      {port.facts.map((fact) => (
                        <div key={fact} className="font-mono text-[9.5px] text-[var(--muted)]">
                          <dt className="sr-only">Specification</dt>
                          <dd>{fact}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-4 text-[13.5px] leading-[1.65] text-[var(--muted)]">{port.body}</p>
                  </motion.article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Pull quote */}
        <section className="border-y border-[var(--line-strong)] bg-[var(--bg-soft)]">
          <div className="mx-auto max-w-[1100px] px-5 py-16 text-center md:px-10 md:py-24">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--faint)]">
                On portability
              </p>
              <blockquote className="ed-display mt-5 text-[clamp(2.2rem,5.6vw,4.4rem)] leading-[1.02] text-[var(--ink-strong)]">
                “A kernel is portable
                <br className="hidden sm:block" /> when a second machine
                <br className="hidden sm:block" /> runs it.”
              </blockquote>
              <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">
                The project's README — and the reason the x86-64 port exists
              </p>
            </Reveal>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-[1320px] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p className="ed-tag">§ 02 — What is inside</p>
                <h2 className="ed-display mt-4 text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.95] text-[var(--ink-strong)]">
                  Small, but a whole
                  <br />
                  <em className="italic">operating system.</em>
                </h2>
                <p className="ed-serif mt-6 max-w-sm text-[15px] leading-[1.7] text-[var(--muted)]">
                  A scheduler, a filesystem, a shell and a network, written to fit a machine with
                  100 KB of SRAM. The list is honest about what is shipped and what is only
                  planned.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="border border-[var(--line-strong)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    shipped
                  </span>
                  <span className="border border-[var(--accent)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--accent)]">
                    0.6
                  </span>
                  <span className="border border-[var(--accent-2)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--accent-2)]">
                    x86-64
                  </span>
                  <span className="border border-dashed border-[var(--line-strong)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--faint)]">
                    next
                  </span>
                </div>
              </div>
            </Reveal>

            <Stagger className="lg:col-span-8" gap={0.06}>
              {features.map((feature) => (
                <StaggerItem key={feature.index}>
                  <article className="group grid gap-2 border-t border-[var(--line-strong)] py-6 transition-colors hover:border-[var(--accent)] sm:grid-cols-[3rem_1fr_auto] sm:gap-5">
                    <span className="font-mono text-[10px] text-[var(--faint)]">{feature.index}</span>
                    <div>
                      <h3 className="ed-serif text-[21px] leading-tight text-[var(--ink-strong)] transition-colors group-hover:text-[var(--accent)]">
                        {feature.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-[13.5px] leading-[1.7] text-[var(--muted)]">
                        {feature.body}
                      </p>
                    </div>
                    <span
                      className={`mt-1 h-fit whitespace-nowrap font-mono text-[8.5px] uppercase tracking-[0.12em] ${
                        feature.tag === "next" ? "text-[var(--faint)]" : "text-[var(--muted)]"
                      }`}
                    >
                      {feature.tag}
                    </span>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Figure: console */}
        <section className="border-y border-[var(--line-strong)] bg-[var(--bg-soft)]">
          <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="ed-tag">Fig. 2 — at the console</p>
              <h2 className="ed-display mt-3 text-[clamp(2rem,3.4vw,2.8rem)] leading-none text-[var(--ink-strong)]">
                A program is
                <br />
                a file.
              </h2>
              <p className="ed-serif mt-4 max-w-sm text-[14px] leading-[1.7] text-[var(--muted)]">
                On x86-64, <em>execve</em> reads a MOX1 image through the VFS, builds its page
                tables and enters ring 3. The child prints <em>cpl 3</em>; a fault is reported and
                the shell survives. This is the transcript, condensed.
              </p>
              <p className="mt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-[var(--faint)]">
                Source: docs/wiki/programs.md
                <br />
                Machine: x86-64 in QEMU
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-8">
              <div className="ed-figure p-3 sm:p-4">
                <ConsoleDemo animate={false} title="microos — x86-64 — serial" />
                <p className="ed-marginalia mt-3 border-t border-[var(--line)] pt-2">
                  “the program faulted: vector 14” is the kernel containing a ring 3 fault, not
                  losing the machine.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Release */}
        <section id="release" className="mx-auto max-w-[1320px] px-5 py-16 md:px-10 md:py-24">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <p className="ed-tag">§ 03 — The release</p>
                <h2 className="ed-display mt-4 text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.95] text-[var(--ink-strong)]">
                  The candidate
                  <br />
                  of 0.6.
                </h2>
                <div className="mt-7 flex items-baseline gap-4 border-y border-[var(--line-strong)] py-4">
                  <span className="ed-display text-[2.6rem] leading-none text-[var(--accent)]">
                    {version}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--faint)]">
                    pre-release
                    <br />
                    {release.date}
                  </span>
                </div>
                <p className="ed-serif mt-5 max-w-md text-[15px] leading-[1.7] text-[var(--muted)]">
                  One image for the board, one bundle for QEMU. NVS and MicroFS are not part of the
                  image, so a flash keeps the volume. The last stable release is {stableVersion}.
                </p>

                <ul className="mt-6 space-y-3">
                  {release.notes.map((note) => (
                    <li key={note} className="flex gap-3 border-b border-[var(--line)] pb-3 text-[13px] leading-relaxed text-[var(--muted)]">
                      <span aria-hidden="true" className="font-mono text-[10px] text-[var(--accent)]">
                        ✳
                      </span>
                      {note}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  <motion.a
                    href={DOWNLOAD_URL}
                    whileHover={reduce ? undefined : { y: -2 }}
                    whileTap={reduce ? undefined : { scale: 0.98 }}
                    className="ed-button group"
                  >
                    Download .bin
                    <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
                      ↓
                    </span>
                  </motion.a>
                  <motion.a
                    href={RELEASE_URL}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={reduce ? undefined : { y: -2 }}
                    whileTap={reduce ? undefined : { scale: 0.98 }}
                    className="ed-button ed-button--ghost group"
                  >
                    Release notes
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </motion.a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="border border-[var(--line-strong)] bg-[var(--panel)]">
                  <div className="flex items-center justify-between border-b border-[var(--line-strong)] px-5 py-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      Assets — {release.tag}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--faint)]">
                      GitHub Releases
                    </p>
                  </div>
                  {release.assets.map((asset) => (
                    <a
                      key={asset.name}
                      href={`${REPO_URL}/releases/download/${release.tag}/${asset.name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group grid gap-1 border-b border-[var(--line)] px-5 py-4 transition-colors last:border-b-0 hover:bg-[var(--panel-2)] sm:grid-cols-[1fr_auto] sm:items-baseline"
                    >
                      <span className="break-all font-mono text-[11.5px] text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                        {asset.name}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--faint)] sm:text-right">
                        {asset.size}
                      </span>
                      <span className="ed-serif text-[13px] italic text-[var(--muted)]">
                        {asset.note}
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden text-[var(--faint)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)] sm:block sm:text-right"
                      >
                        ↓
                      </span>
                    </a>
                  ))}
                  <div className="border-t border-[var(--line-strong)] px-5 py-3">
                    <p className="font-mono text-[9px] leading-relaxed tracking-[0.04em] text-[var(--faint)]">
                      flash.sh writes at 0x0; the release keeps no executable bit — chmod +x first.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
                  <p className="ed-marginalia">
                    License MIT · kernel contract {kernelContract} · 2026
                  </p>
                  <a
                    href={`${REPO_URL}/releases`}
                    target="_blank"
                    rel="noreferrer"
                    className="ed-link font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]"
                  >
                    all releases
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-[var(--line-strong)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-[1320px] px-5 py-12 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Link to="/" className="ed-display text-[2.4rem] leading-none text-[var(--ink-strong)] transition-colors hover:text-[var(--accent)]">
                Micro OS
              </Link>
              <p className="ed-serif mt-3 max-w-sm text-[14px] leading-[1.7] text-[var(--muted)]">
                A Linux-like kernel for small machines. One portable core, a port per kind of
                machine, and a boundary the build checks.
              </p>
              <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--faint)]">
                Set in Instrument Serif, Newsreader & JetBrains Mono
              </p>
            </div>

            <div className="md:col-span-3 md:col-start-7">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--faint)]">
                The project
              </p>
              <ul className="mt-4 space-y-2 text-[13.5px]">
                {[
                  ["GitHub", footerLinks.github],
                  ["Releases", footerLinks.releases],
                  ["Documentation", footerLinks.docs],
                  ["MIT license", footerLinks.license],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noreferrer" className="ed-link text-[var(--muted)]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--faint)]">
                Read
              </p>
              <ul className="mt-4 space-y-2 text-[13.5px]">
                <li>
                  <a href={footerLinks.wiki} target="_blank" rel="noreferrer" className="ed-link text-[var(--muted)]">
                    wiki.microos.org
                  </a>
                </li>
                <li>
                  <Link to="/terminal" className="ed-link text-[var(--muted)]">
                    Terminal direction
                  </Link>
                </li>
                <li>
                  <Link to="/kinetic" className="ed-link text-[var(--muted)]">
                    Kinetic direction
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line-strong)] pt-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--faint)]">
              © 2026 Micro OS contributors · printed on a screen near you
            </p>
            <a
              href="#main"
              className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
