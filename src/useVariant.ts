import { useEffect } from "react";

export type Variant = "terminal" | "editorial" | "kinetic" | "index";

const TITLES: Record<Variant, string> = {
  terminal: "Micro OS — a kernel for small machines",
  editorial: "Micro OS — a kernel for small machines",
  kinetic: "Micro OS — a kernel for small machines",
  index: "Micro OS — design directions",
};

/** Marks the document with the direction on screen, for page background and title. */
export function useVariant(variant: Variant) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.variant = variant;
    document.title = TITLES[variant];
    return () => {
      delete root.dataset.variant;
    };
  }, [variant]);
}
