import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../theme";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      data-mode={theme}
      onClick={toggle}
      aria-label={dark ? "Switch to the light theme" : "Switch to the dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
    >
      <span className="theme-toggle__icon theme-toggle__sun">
        <SunIcon />
      </span>
      <span className="theme-toggle__icon theme-toggle__moon">
        <MoonIcon />
      </span>
      <motion.span
        className="theme-toggle__knob"
        animate={{ x: dark ? 32 : 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 520, damping: 34, mass: 0.6 }
        }
      />
    </button>
  );
}
