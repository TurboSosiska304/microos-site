import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useVariant } from "../useVariant";

type DirectionId = "A" | "B" | "C";

const directions: Array<{
  id: DirectionId;
  to: string;
  name: string;
  mood: string;
  copy: string;
  tags: string[];
}> = [
  {
    id: "A",
    to: "/terminal",
    name: "Terminal",
    mood: "Engineering / dark",
    copy: "Graphite and phosphor. Monospaced labels, a grid, a live console — a system for people who read the source.",
    tags: ["mono", "phosphor", "grid"],
  },
  {
    id: "B",
    to: "/editorial",
    name: "Editorial",
    mood: "Editorial / light",
    copy: "Warm paper, large serif type, an asymmetric grid. A magazine story about a kernel, told calmly.",
    tags: ["serif", "paper", "asymmetry"],
  },
  {
    id: "C",
    to: "/kinetic",
    name: "Kinetic",
    mood: "Kinetic / neon",
    copy: "Loud gradients, huge sans, a launch-day pulse. Movement with the reading still intact.",
    tags: ["neon", "gradient", "motion"],
  },
];

const previews = {
  A: (
    <div className="flex h-full flex-col justify-between bg-[#07090a] p-4 text-[#86ffb0]">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#86ffb0]" />
        <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-[#53615b]">ttyS0</span>
      </div>
      <div className="space-y-1.5 font-mono text-[8px] leading-none">
        <p className="text-[#53615b]">microos&gt; uname</p>
        <p>MicroOS 0.6.0-rc1</p>
        <p className="text-[#65e7ff]">PROGRAM: cpl 3</p>
        <p className="text-[#53615b]">
          microos&gt; <span className="inline-block h-2 w-1 bg-[#86ffb0] align-middle" />
        </p>
      </div>
      <div className="h-px w-full bg-[#1b2924]" />
    </div>
  ),
  B: (
    <div className="flex h-full flex-col justify-between bg-[#f3ede1] p-4 text-[#1c1915]">
      <div className="flex items-center justify-between border-b border-[#bfb29b] pb-1.5">
        <span className="font-serif text-[11px] italic">Micro OS</span>
        <span className="font-mono text-[6px] uppercase tracking-[0.18em] text-[#8d8474]">No. 06</span>
      </div>
      <p className="font-display text-[26px] leading-[0.9]">
        A kernel for
        <br />
        <em className="text-[#9c3a1f]">small</em> machines.
      </p>
      <div className="flex gap-3 border-t border-[#d8cdba] pt-1.5">
        <span className="font-mono text-[6px] uppercase tracking-[0.14em] text-[#615b50]">C11</span>
        <span className="font-mono text-[6px] uppercase tracking-[0.14em] text-[#615b50]">MIT</span>
        <span className="ml-auto font-mono text-[6px] uppercase tracking-[0.14em] text-[#9c3a1f]">0.6.0-rc1</span>
      </div>
    </div>
  ),
  C: (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[#060509] p-4 text-[#f4f2ff]">
      <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,#ff46e0,transparent_65%)] opacity-60 blur-xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,#7c5cff,transparent_65%)] opacity-70 blur-xl" />
      <span className="relative self-start rounded-full border border-white/20 px-2 py-0.5 font-mono text-[6px] uppercase tracking-[0.16em] text-[#aca6c6]">
        pre-release
      </span>
      <p className="relative font-grotesk text-[22px] font-bold uppercase leading-[0.88] tracking-[-0.05em]">
        A kernel
        <br />
        for <span className="bg-[linear-gradient(100deg,#c9ff3f,#46efff)] bg-clip-text text-transparent">small</span>
        <br />
        machines.
      </p>
      <div className="relative flex gap-2">
        <span className="rounded-full bg-[#c9ff3f] px-2 py-1 font-grotesk text-[7px] font-semibold text-[#0b0a0e]">
          Download
        </span>
        <span className="rounded-full border border-white/20 px-2 py-1 font-grotesk text-[7px] text-[#aca6c6]">
          Wiki
        </span>
      </div>
    </div>
  ),
} as const;

export default function IndexPage() {
  useVariant("index");
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#ededea]">
      <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-10 md:py-20">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8f8f96]">
              microos.org — design directions
            </p>
            <h1 className="mt-4 font-sans text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              Three ways to say
              <br />
              “a kernel for small machines”.
            </h1>
          </div>
          <p className="max-w-xs font-mono text-[10px] leading-relaxed text-[#8f8f96]">
            Same content, same facts. Different voice. Each direction carries a working light/dark
            toggle and its own hover behaviour.
          </p>
        </header>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {directions.map((direction, index) => (
            <motion.div
              key={direction.id}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={direction.to}
                className="pick-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101013] hover:border-white/30"
              >
                <div className="h-44 overflow-hidden border-b border-white/10">
                  {previews[direction.id]}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[10px] text-[#8f8f96]">{direction.id}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#8f8f96]">
                      {direction.mood}
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-medium tracking-[-0.02em]">{direction.name}</h2>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#a8a8ae]">
                    {direction.copy}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#77777e]">
                      {direction.tags.join(" · ")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-sm text-[#77777e] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ededea]"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[9px] uppercase tracking-[0.14em] text-[#77777e]">
          <span>Micro OS · v0.6.0-rc1 · MIT</span>
          <span>
            a / b / c —{" "}
            <a
              href="https://github.com/TurboSosiska304/Micro_OS"
              target="_blank"
              rel="noreferrer"
              className="text-[#a8a8ae] underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
            >
              source ↗
            </a>
          </span>
        </footer>
      </div>
    </div>
  );
}
