import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ConsoleDemo } from "../components/ConsoleDemo";
import { BoardGlyph } from "../components/BoardGlyph";
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

const nav = [
  { label: "kernel", href: "#kernel" },
  { label: "features", href: "#features" },
  { label: "release", href: "#release" },
];

const tagTone: Record<string, string> = {
  shipped: "text-[var(--muted)] border-[var(--line-strong)]",
  next: "text-[var(--accent-3)] border-[color-mix(in_srgb,var(--accent-3)_45%,transparent)]",
  "0.6": "text-[var(--accent)] border-[color-mix(in_srgb,var(--accent)_45%,transparent)]",
  "x86-64": "text-[var(--accent-2)] border-[color-mix(in_srgb,var(--accent-2)_45%,transparent)]",
};

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
      {down ? "↓" : "→"}
    </span>
  );
}

export default function TerminalPage() {
  useVariant("terminal");
  const reduce = useReducedMotion();

  return (
    <div className="v-terminal term-root min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-[var(--accent-ink)]"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-6 px-5 md:px-10">
          <Link to="/" className="group flex items-center gap-3" aria-label="Micro OS — all design directions">
            <span className="grid h-7 w-7 place-items-center border border-[var(--accent)] font-mono text-[11px] text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]">
              M
            </span>
            <span className="font-mono text-[13px] tracking-[0.22em] text-[var(--ink)]">
              MICRO<span className="text-[var(--accent)]">/</span>OS
            </span>
          </Link>

          <nav className="ml-4 hidden items-center gap-7 md:flex" aria-label="Sections">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              github ↗
            </a>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--faint)] sm:inline">
              v{version}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--line)]">
          <div className="term-grid" aria-hidden="true" />
          <div className="term-scan" aria-hidden="true" />
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-10 h-[30rem] w-[30rem] rounded-full opacity-25 blur-[90px]"
              style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)" }}
              animate={{ x: [0, -24, 0], y: [0, 18, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          <div className="relative mx-auto grid max-w-[1280px] gap-14 px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-7 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]"
              >
                <span className="h-px w-8 bg-[var(--accent)]" />
                portable kernel · C11 · contract {kernelContract}
              </motion.p>

              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.8rem,6.4vw,5.2rem)] font-semibold leading-[0.93] tracking-[-0.045em] text-[var(--ink-strong)]"
              >
                A kernel for
                <br />
                <span className="relative inline-block whitespace-nowrap">
                  small machines.
                  <motion.span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-0 h-[3px] bg-[var(--accent)]"
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left", width: "100%" }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="mt-8 max-w-xl text-[15px] leading-relaxed text-[var(--muted)] sm:text-base"
              >
                {standfirst}
              </motion.p>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.26 }}
                className="mt-7 flex flex-wrap items-center gap-2"
              >
                <span className="term-chip term-chip--live">
                  <span className="term-dot" /> pre-release {version}
                </span>
                <span className="term-chip">stable {stableVersion}</span>
                <span className="term-chip">MIT</span>
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.34 }}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <motion.a
                  href={DOWNLOAD_URL}
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  className="term-button group justify-center"
                >
                  Download {version}
                  <Arrow down />
                </motion.a>
                <motion.a
                  href={WIKI_URL}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  className="term-button term-button--ghost group justify-center"
                >
                  Read the wiki
                  <Arrow />
                </motion.a>
              </motion.div>

              <p className="mt-7 font-mono text-[10px] tracking-[0.08em] text-[var(--faint)]">
                $ make test · make sim · make x86-smoke · make ci
              </p>
            </div>

            <div className="lg:col-span-5 lg:pl-4">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--faint)]">
                  <span>live from the x86-64 port</span>
                  <span className="flex items-center gap-2 text-[var(--accent)]">
                    <span className="term-dot" /> tty
                  </span>
                </div>
                <ConsoleDemo />
                <div className="mt-3 grid grid-cols-3 border border-[var(--line)] font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  {[
                    ["ring", "3"],
                    ["format", "MOX1"],
                    ["fault", "contained"],
                  ].map(([key, value], index) => (
                    <div
                      key={key}
                      className={`px-3 py-2.5 ${index < 2 ? "border-r border-[var(--line)]" : ""}`}
                    >
                      <span className="block text-[9px] text-[var(--faint)]">{key}</span>
                      <span className="text-[var(--ink)]">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Fact strip */}
        <div className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)] md:px-10">
            <span className="text-[var(--accent)]">one tree, four ports</span>
            <span className="text-[var(--faint)]">/</span>
            <span>zero ESP-IDF in the kernel</span>
            <span className="text-[var(--faint)]">/</span>
            <span>4 ports: ESP32 · x86-64 · host · null</span>
            <span className="ml-auto hidden text-[var(--faint)] lg:inline">
              the boundary is checked, not promised
            </span>
          </div>
        </div>

        {/* Ports */}
        <section id="kernel" className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                [ 01 ] the claim
              </p>
              <h2 className="max-w-2xl text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--ink-strong)]">
                One kernel,
                <br />
                three machines.
              </h2>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--muted)]">
                The board is one port, not the project. The same scheduler, VFS, MicroFS, libc
                subset and shell build as an ESP32 firmware, as bare metal on x86-64 and as a Linux
                process. A second machine is what makes a kernel portable — and x86-64 is the
                proof.
              </p>
              <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-[var(--faint)]">
                A fourth port, <span className="text-[var(--muted)]">null</span>, is not a machine
                at all: the checks link against it.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="term-frame p-4 sm:p-6">
                <BoardGlyph className="w-full" />
                <div className="mt-3 flex items-center justify-between border-t border-[var(--line)] pt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--faint)]">
                  <span>fig. 01 — the board, abstracted</span>
                  <span>STICKC PLUS2</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {ports.map((port) => (
              <StaggerItem key={port.id}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="term-frame term-card h-full p-6"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--faint)]">
                    <span>{port.index}</span>
                    <span>{port.kicker}</span>
                  </div>
                  <h3 className="mt-5 font-mono text-2xl tracking-[-0.02em] text-[var(--ink-strong)]">
                    {port.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{port.machine}</p>
                  <p className="mt-4 font-mono text-[10px] leading-relaxed text-[var(--faint)]">
                    {port.stack}
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)]">
                    {port.facts.map((fact) => (
                      <div
                        key={fact}
                        className="bg-[var(--panel)] px-2.5 py-2 font-mono text-[10px] text-[var(--muted)]"
                      >
                        {fact}
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-[13px] leading-relaxed text-[var(--muted)]">{port.body}</p>
                </motion.article>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-y border-[var(--line)] bg-[var(--bg-soft)]"
        >
          <div className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-28">
            <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                  [ 02 ] what is inside
                </p>
                <h2 className="max-w-2xl text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--ink-strong)]">
                  Small, but a whole
                  <br className="hidden sm:block" /> operating system.
                </h2>
              </div>
              <p className="max-w-sm font-mono text-[10px] leading-relaxed tracking-[0.04em] text-[var(--faint)]">
                shipped means it is in the tree and covered by tests. next means it is designed and
                planned — not a promise with a version number.
              </p>
            </Reveal>

            <Stagger className="mt-12 grid border-l border-t border-[var(--line)] sm:grid-cols-2" gap={0.05}>
              {features.map((feature) => (
                <StaggerItem key={feature.index}>
                  <article className="group h-full border-b border-r border-[var(--line)] p-6 transition-colors duration-300 hover:bg-[var(--panel)] md:p-8">
                    <div className="flex items-center justify-between">
                      <span className="term-num">[ {feature.index} ]</span>
                      <span
                        className={`border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] ${tagTone[feature.tag] ?? tagTone.shipped}`}
                      >
                        {feature.tag}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-medium tracking-[-0.01em] text-[var(--ink-strong)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-[var(--muted)]">
                      {feature.body}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Release */}
        <section id="release" className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <div className="term-frame overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-6 py-4 md:px-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                  [ 03 ] latest release
                </p>
                <div className="flex items-center gap-2">
                  <span className="term-chip term-chip--live">
                    <span className="term-dot" /> pre-release
                  </span>
                  <span className="term-chip">{release.date}</span>
                </div>
              </div>

              <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--faint)]">
                    tag {release.tag}
                  </p>
                  <p className="mt-3 font-mono text-[clamp(2rem,5vw,3.4rem)] leading-none tracking-[-0.04em] text-[var(--ink-strong)]">
                    v{release.version}
                  </p>
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
                    The candidate of 0.6. One image for the board, one bundle for QEMU — the kernel
                    is the same in both.
                  </p>

                  <ul className="mt-7 space-y-3 border-t border-[var(--line)] pt-5">
                    {release.notes.map((note) => (
                      <li key={note} className="flex gap-3 text-[13px] leading-relaxed text-[var(--muted)]">
                        <span aria-hidden="true" className="mt-[2px] font-mono text-[var(--accent)]">
                          —
                        </span>
                        {note}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <motion.a
                      href={DOWNLOAD_URL}
                      whileHover={reduce ? undefined : { y: -2 }}
                      whileTap={reduce ? undefined : { scale: 0.98 }}
                      className="term-button group justify-center"
                    >
                      Download .bin <Arrow down />
                    </motion.a>
                    <motion.a
                      href={RELEASE_URL}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={reduce ? undefined : { y: -2 }}
                      whileTap={reduce ? undefined : { scale: 0.98 }}
                      className="term-button term-button--ghost group justify-center"
                    >
                      GitHub release <Arrow />
                    </motion.a>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="border border-[var(--line)]">
                    <div className="hidden grid-cols-12 gap-3 border-b border-[var(--line)] bg-[var(--panel-2)] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--faint)] sm:grid">
                      <span className="col-span-6">asset</span>
                      <span className="col-span-4">what it is</span>
                      <span className="col-span-2 text-right">size</span>
                    </div>
                    {release.assets.map((asset) => (
                      <a
                        key={asset.name}
                        href={`${REPO_URL}/releases/download/${release.tag}/${asset.name}`}
                        target="_blank"
                        rel="noreferrer"
                        className="group grid grid-cols-1 gap-1 border-b border-[var(--line)] px-4 py-3.5 transition-colors last:border-b-0 hover:bg-[var(--panel-2)] sm:grid-cols-12 sm:items-baseline sm:gap-3"
                      >
                        <span className="break-all font-mono text-[11px] text-[var(--ink)] group-hover:text-[var(--accent)] sm:col-span-6">
                          {asset.name}
                        </span>
                        <span className="text-[11px] text-[var(--muted)] sm:col-span-4">
                          {asset.note}
                        </span>
                        <span className="font-mono text-[10px] text-[var(--faint)] sm:col-span-2 sm:text-right">
                          {asset.size}
                        </span>
                      </a>
                    ))}
                  </div>
                  <p className="mt-4 font-mono text-[10px] leading-relaxed text-[var(--faint)]">
                    flash.sh writes the image at 0x0. NVS and MicroFS are not part of it, so a flash
                    keeps the volume. The release keeps no executable bit — chmod +x first.
                  </p>
                  <p className="mt-3 font-mono text-[10px] text-[var(--faint)]">
                    last stable: v{stableVersion} · license: MIT
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-[var(--line)] bg-[var(--bg-soft)]">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-12 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center border border-[var(--accent)] font-mono text-[11px] text-[var(--accent)]">
                M
              </span>
              <span className="font-mono text-[13px] tracking-[0.22em] text-[var(--ink)]">
                MICRO<span className="text-[var(--accent)]">/</span>OS
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[var(--muted)]">
              A Linux-like kernel for small machines. Plain C11 above the port, one port per kind
              of machine.
            </p>
            <p className="mt-5 font-mono text-[10px] text-[var(--faint)]">
              kernel contract {kernelContract} · MIT · 2026
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--faint)]">
              project
            </p>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              <li>
                <a href={footerLinks.github} target="_blank" rel="noreferrer" className="term-link text-[var(--muted)]">
                  GitHub
                </a>
              </li>
              <li>
                <a href={footerLinks.releases} target="_blank" rel="noreferrer" className="term-link text-[var(--muted)]">
                  Releases
                </a>
              </li>
              <li>
                <a href={footerLinks.docs} target="_blank" rel="noreferrer" className="term-link text-[var(--muted)]">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--faint)]">
              read
            </p>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              <li>
                <a href={footerLinks.wiki} target="_blank" rel="noreferrer" className="term-link text-[var(--muted)]">
                  wiki.microos.org
                </a>
              </li>
              <li>
                <a href={footerLinks.license} target="_blank" rel="noreferrer" className="term-link text-[var(--muted)]">
                  MIT license
                </a>
              </li>
              <li>
                <Link to="/editorial" className="term-link text-[var(--muted)]">
                  Editorial direction
                </Link>
              </li>
              <li>
                <Link to="/kinetic" className="term-link text-[var(--muted)]">
                  Kinetic direction
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--line)]">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-2 px-5 py-4 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--faint)] md:px-10">
            <span>micro os — a kernel for small machines</span>
            <span>theme: {`{light | dark}`} · toggle above</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
