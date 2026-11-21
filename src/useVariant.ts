import { useEffect } from "react";

export type Variant = "terminal" | "editorial" | "kinetic" | "index";

/** Marks the document with the direction on screen. The title belongs to i18n. */
export function useVariant(variant: Variant, title?: string) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.variant = variant;
    if (title) document.title = title;
    return () => {
      delete root.dataset.variant;
    };
  }, [variant, title]);
}
