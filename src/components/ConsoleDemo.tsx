import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const LINES = [
  "microos> uname",
  "MicroOS 0.9.0-rc1 x86_64 (build ...)",
  "microos> exec hello",
  "PROGRAM: hello from /bin",
  "PROGRAM: cpl 3",
  "PROGRAM: argc 1, argv[0] hello",
  "microos> exec crash",
  "PROGRAM: crash writes to address zero",
  "the program faulted: vector 14 at 0x0000000000000000",
  "the program has finished",
  "microos> ",
];

const FULL = LINES.join("\n");
const TOTAL = FULL.length;

function lineClass(line: string) {
  if (line.startsWith("microos>")) return "console__line console__line--prompt";
  if (line.startsWith("PROGRAM:")) return "console__line console__line--dim";
  if (line.startsWith("the program faulted")) return "console__line console__line--warn";
  if (line.startsWith("the program has finished")) return "console__line console__line--ok";
  return "console__line";
}

type ConsoleDemoProps = {
  animate?: boolean;
  title?: string;
  className?: string;
};

export function ConsoleDemo({
  animate = true,
  title = "microos — x86-64 — serial",
  className = "",
}: ConsoleDemoProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(animate && !reduce ? 0 : TOTAL);

  useEffect(() => {
    if (!animate || reduce || !inView) return;
    if (count >= TOTAL) return;
    const next = FULL[count];
    const delay = next === "\n" ? 110 : count === 0 ? 420 : 9;
    const timer = window.setTimeout(() => setCount((value) => Math.min(value + 1, TOTAL)), delay);
    return () => window.clearTimeout(timer);
  }, [animate, reduce, inView, count]);

  const typed = FULL.slice(0, count);
  const typedLines = typed.split("\n");

  return (
    <div ref={ref} className={`console ${className}`}>
      <div className="console__bar">
        <span className="console__dot" />
        <span className="console__dot" />
        <span className="console__dot" />
        <span className="ml-2 truncate">{title}</span>
        <span className="ml-auto hidden sm:inline">80×24</span>
      </div>
      <div className="console__body" aria-hidden="true">
        {typedLines.map((line, index) => {
          const isLast = index === typedLines.length - 1;
          return (
            <div key={index} className={lineClass(line)}>
              {line}
              {isLast && <span className="console__cursor" />}
            </div>
          );
        })}
      </div>
      <pre className="sr-only">{`${FULL}\n`}</pre>
    </div>
  );
}
