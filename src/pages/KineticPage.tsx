import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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

const marquee = [
  "one kernel",
  "four ports",
  "MOX1",
  "ring 3",
  "MicroFS",
  "FAT32",
  "copy-on-write fork",
  "C11",
  "telnet :23",
];

export default function KineticPage() {
  useVariant("kinetic");
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const stackY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 60]);
  const glowY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -40]);

  return (
    <div className="v-kinetic kin-root min-h-screen overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:font-grotesk focus:text-xs focus:text-[var(--accent-ink)]"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1320px] items-center gap-8 px-5 md:px-10">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Micro OS — all design directions">
            <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-[var(--accent)] font-grotesk text-sm font-bold text-[var(--accent-ink)] transition-transform duration-300 group-hover:rotate-6">
              M
            </span>
            <span className="font-grotesk text-[15px] font-semibold tracking-[-0.02em] text-[var(--ink-strong)]">
              micro<span className="text-[var(--accent)]">/</span>os
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
            {[
              ["Kernel", "#machines"],
              ["Features", "#features"],
              ["Release", "#release"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="kin-nav-link font-grotesk text-[13px] font-medium text-[var(--muted)] hover:text-[var(--ink)]"
              >
                {label}
              </a>
            ))}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="kin-nav-link font-grotesk text-[13px] font-medium text-[var(--muted)] hover:text-[var(--ink)]"
            >
              GitHub ↗
            </a>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <motion.a
              href={DOWNLOAD_URL}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="kin-pill hidden !px-4 !py-2 !text-[12px] sm:inline-flex"
            >
              Get {version}
            </motion.a>
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

          <div className="relative mx-auto grid max-w-[1320px] gap-14 px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--accent)]">
                  <span className="term-dot" /> pre-release {version}
                </span>
                <span className="rounded-full border border-[var(--line)] px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  stable {stableVersion}
                </span>
                <span className="rounded-full border border-[var(--line)] px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  MIT
                </span>
              </motion.div>

              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 font-grotesk text-[clamp(3.2rem,9.2vw,7.4rem)] font-bold uppercase leading-[0.84] tracking-[-0.055em] text-[var(--ink-strong)]"
              >
                A kernel
                <br />
                for <span className="kin-gradient-text">small</span>
                <br />
                machines.
              </motion.h1>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="mt-7 max-w-xl font-grotesk text-[15px] leading-[1.7] text-[var(--muted)] sm:text-[17px]"
              >
                {standfirst}
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
                  Download {version}
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
                  Read the wiki
                  <span aria-hidden="true" className="kin-arrow">
                    →
                  </span>
                </motion.a>
              </motion.div>

              <motion.dl
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 flex max-w-lg divide-x divide-[var(--line)] border-y border-[var(--line)]"
              >
                {[
                  ["ports", "4"],
                  ["syscall contract", kernelContract],
                  ["language", "C11"],
                ].map(([term, value]) => (
                  <div key={term} className="flex-1 px-4 py-3 first:pl-0">
                    <dt className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--faint)]">
                      {term}
                    </dt>
                    <dd className="mt-0.5 font-grotesk text-lg font-semibold text-[var(--ink-strong)]">
                      {value}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={reduce ? undefined : { y: stackY }}
              className="relative lg:col-span-5"
            >
              <div className="kin-stack relative mx-auto h-[340px] w-full max-w-[520px] sm:h-[380px]">
                <div className="kin-stack__inner absolute left-1/2 top-1/2 h-[250px] w-[350px] -translate-x-1/2 -translate-y-1/2 sm:h-[280px] sm:w-[400px]">
                  <div className="kin-layer kin-layer--3" />
                  <div className="kin-layer kin-layer--2" />
                  <div className="kin-layer kin-layer--1 flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
                        one kernel
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--accent)]">
                        v{version}
                      </span>
                    </div>
                    <BoardGlyph className="mx-auto w-[80%] opacity-90" />
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-grotesk text-lg font-semibold leading-none text-[var(--ink-strong)]">
                          ESP32 · x86-64 · host
                        </p>
                        <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-[var(--faint)]">
                          the same scheduler, VFS and shell
                        </p>
                      </div>
                      <span className="font-mono text-[9px] text-[var(--accent)]">03/04</span>
                    </div>
                  </div>
                </div>

                <motion.span
                  animate={reduce ? undefined : { y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 top-12 rounded-full border border-[var(--line-strong)] bg-[var(--panel-2)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink)] shadow-lg backdrop-blur-md"
                >
                  ring 3
                </motion.span>
                <motion.span
                  animate={reduce ? undefined : { y: [0, 12, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-14 right-0 rounded-full border border-[var(--line-strong)] bg-[var(--panel-2)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink)] shadow-lg backdrop-blur-md"
                >
                  MOX1 · execve
                </motion.span>
                <motion.span
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute bottom-4 left-6 rounded-full border border-[var(--line-strong)] bg-[var(--panel-2)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink)] shadow-lg backdrop-blur-md"
                >
                  C11 · no libc
                </motion.span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Marquee */}
        <div className="kin-marquee py-4" aria-hidden="true">
          <div className="kin-marquee__track">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {marquee.map((word) => (
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

        {/* Machines */}
        <section id="machines" className="relative mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--accent)]">
              01 — the claim
            </p>
            <h2 className="mt-4 font-grotesk text-[clamp(2.4rem,6vw,5rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em] text-[var(--ink-strong)]">
              One kernel.
              <br />
              <span className="kin-gradient-text">Three machines.</span>
            </h2>
            <p className="mt-6 max-w-xl font-grotesk text-[15px] leading-[1.7] text-[var(--muted)]">
              The board is one port, not the project. The same portable core runs as an ESP32
              firmware, as bare metal in QEMU and as a Linux process — a second machine is what
              makes a kernel portable.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 md:grid-cols-3" gap={0.1}>
            {ports.map((port) => (
              <StaggerItem key={port.id}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="kin-card group flex h-full flex-col p-6 md:p-7"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-grotesk text-[clamp(2.6rem,4vw,3.6rem)] font-bold leading-none tracking-[-0.06em] text-[color-mix(in_srgb,var(--ink)_22%,transparent)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                      {port.index}
                    </span>
                    <span className="rounded-full border border-[var(--line)] px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--muted)]">
                      {port.kicker}
                    </span>
                  </div>
                  <h3 className="mt-6 font-grotesk text-2xl font-semibold tracking-[-0.02em] text-[var(--ink-strong)]">
                    {port.name}
                  </h3>
                  <p className="font-grotesk text-[13px] text-[var(--muted)]">{port.machine}</p>
                  <p className="mt-4 font-mono text-[9px] leading-relaxed tracking-[0.03em] text-[var(--faint)]">
                    {port.stack}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {port.facts.map((fact) => (
                      <span
                        key={fact}
                        className="rounded-md border border-[var(--line)] bg-[color-mix(in_srgb,var(--panel)_60%,transparent)] px-2 py-1 font-mono text-[9px] text-[var(--muted)]"
                      >
                        {fact}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 border-t border-[var(--line)] pt-4 text-[13px] leading-[1.65] text-[var(--muted)]">
                    {port.body}
                  </p>
                </motion.article>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Features */}
        <section id="features" className="relative border-y border-[var(--line)] bg-[color-mix(in_srgb,var(--bg-soft)_70%,transparent)]">
          <div className="mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-28">
            <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--accent)]">
                  02 — what is inside
                </p>
                <h2 className="mt-4 max-w-2xl font-grotesk text-[clamp(2.2rem,5.4vw,4.4rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em] text-[var(--ink-strong)]">
                  Small machine.
                  <br />
                  Full system.
                </h2>
              </div>
              <p className="max-w-xs font-mono text-[10px] leading-relaxed tracking-[0.03em] text-[var(--faint)]">
                shipped: in the tree, covered by tests.
                <br />
                next: designed and planned — not shipped.
              </p>
            </Reveal>

            <Stagger className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-6" gap={0.06}>
              {features.map((feature, index) => {
                const wide = index < 2;
                const planned = feature.tag === "next";
                return (
                  <StaggerItem
                    key={feature.index}
                    className={wide ? "lg:col-span-3" : "lg:col-span-2"}
                  >
                    <article
                      className={`kin-card group flex h-full flex-col p-6 ${
                        planned ? "border-dashed" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--faint)]">
                          {feature.index}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.12em] ${
                            planned
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
          </div>
        </section>

        {/* Console */}
        <section className="mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <Reveal className="lg:col-span-5">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--accent)]">
                03 — it prints cpl 3
              </p>
              <h2 className="mt-4 font-grotesk text-[clamp(2.2rem,4.6vw,3.8rem)] font-bold uppercase leading-[0.92] tracking-[-0.045em] text-[var(--ink-strong)]">
                A program
                <br />
                is a file.
                <br />
                <span className="kin-gradient-text">Ring 3 is real.</span>
              </h2>
              <p className="mt-6 max-w-md font-grotesk text-[14.5px] leading-[1.7] text-[var(--muted)]">
                On x86-64, <span className="font-mono text-[12px] text-[var(--ink)]">execve</span>{" "}
                reads a MOX1 image through the VFS, builds page tables and enters ring 3. A bad
                pointer is <span className="font-mono text-[12px] text-[var(--ink)]">EFAULT</span>,
                and a fault kills the program, not the shell.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["MOX1", "32-byte header", "copy-on-write", "vector 14"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[var(--line)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
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

        {/* Release */}
        <section id="release" className="mx-auto max-w-[1320px] px-5 pb-20 md:px-10 md:pb-28">
          <Reveal>
            <div className="rounded-[28px] bg-[linear-gradient(130deg,var(--accent)_0%,var(--violet)_48%,var(--accent-2)_100%)] p-[1px] shadow-[var(--shadow)]">
              <div className="rounded-[27px] bg-[color-mix(in_srgb,var(--bg)_94%,transparent)] px-6 py-8 md:px-10 md:py-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--accent)]">
                    04 — latest release
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent)_40%,transparent)] px-3 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--accent)]">
                      <span className="term-dot" /> pre-release
                    </span>
                    <span className="rounded-full border border-[var(--line)] px-3 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--muted)]">
                      {release.date}
                    </span>
                  </div>
                </div>

                <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-6">
                    <h2 className="font-grotesk text-[clamp(2.4rem,5.2vw,4.4rem)] font-bold leading-none tracking-[-0.055em] text-[var(--ink-strong)]">
                      v{version}
                    </h2>
                    <p className="mt-4 max-w-md font-grotesk text-[14.5px] leading-[1.7] text-[var(--muted)]">
                      One image for the board, one bundle for QEMU. The candidate of 0.6 adds
                      timestamps to MicroFS and takes FAT12/16/32 from read-only to read and write.
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {release.notes.map((note) => (
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
                        Download .bin
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
                        GitHub release
                        <span aria-hidden="true" className="kin-arrow">
                          →
                        </span>
                      </motion.a>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--panel)_80%,transparent)]">
                      {release.assets.map((asset) => (
                        <a
                          key={asset.name}
                          href={`${REPO_URL}/releases/download/${release.tag}/${asset.name}`}
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
                      flash.sh writes the image at 0x0; NVS and MicroFS stay. The release keeps no
                      executable bit — chmod +x first. Last stable: v{stableVersion}.
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
              <Link
                to="/"
                className="font-grotesk text-[clamp(2.2rem,5vw,3.4rem)] font-bold uppercase leading-none tracking-[-0.05em] text-[var(--ink-strong)] transition-colors hover:text-[var(--accent)]"
              >
                Micro<span className="text-[var(--accent)]">/</span>OS
              </Link>
              <p className="mt-4 max-w-sm font-grotesk text-[13.5px] leading-relaxed text-[var(--muted)]">
                A Linux-like kernel for small machines. One portable core, a port per machine, and
                a boundary the build checks.
              </p>
              <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--faint)]">
                contract {kernelContract} · MIT · 2026
              </p>
            </div>

            <div className="md:col-span-3 md:col-start-7">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--faint)]">
                Project
              </p>
              <ul className="mt-4 space-y-2.5 font-grotesk text-[13.5px]">
                {[
                  ["GitHub", footerLinks.github],
                  ["Releases", footerLinks.releases],
                  ["Documentation", footerLinks.docs],
                  ["MIT license", footerLinks.license],
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
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--faint)]">
                Read
              </p>
              <ul className="mt-4 space-y-2.5 font-grotesk text-[13.5px]">
                <li>
                  <a
                    href={footerLinks.wiki}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    wiki.microos.org ↗
                  </a>
                </li>
                <li>
                  <Link to="/terminal" className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]">
                    Terminal direction
                  </Link>
                </li>
                <li>
                  <Link to="/editorial" className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]">
                    Editorial direction
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--faint)]">
              micro os — built for small machines
            </p>
            <a
              href="#main"
              className="rounded-full border border-[var(--line)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
