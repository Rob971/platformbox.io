"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "platformbox-theme";

/**
 * The `dark` class on <html> is the single source of truth for the theme.
 *
 * It is written by the anti-flash script in layout.tsx before first paint and
 * read back here. Deliberately NOT mirrored into React state: a second copy
 * could disagree with the class, and did — a saved `light` preference left the
 * page dark while the toggle rendered a moon, so the button advertised the
 * mode the visitor was already in.
 */
function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * `persist` is only ever true for a deliberate click. Writing storage on every
 * mount would stamp a preference the visitor never expressed, and from then on
 * their OS setting could never be consulted again.
 */
function applyTheme(theme: Theme, persist: boolean) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }
  updateFavicon(theme);
}

/** An explicit choice, or null while the visitor is still following their OS. */
function storedChoice(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    // ignore
  }
  return null;
}

/** Update every `<link rel="icon">` to point at the correct favicon for `theme`. */
function updateFavicon(theme: Theme) {
  const href = theme === "dark" ? "/favicon.ico" : "/favicon-light.ico";
  document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]').forEach((link) => {
    // Only update the overrideable link (skip ones with a media query —
    // those are the static fallback hints).
    if (!link.media || link.media === "all") {
      link.href = href;
    }
  });
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Re-assert on mount. React renders <html> without the `dark` class, so this
  // restores it if a hydration pass ever clobbers what the script wrote, and
  // points the favicon at the theme actually on screen.
  useEffect(() => {
    applyTheme(currentTheme(), false);

    // Until the visitor picks a side, track their OS so the site changes with
    // the rest of their desktop at sundown rather than staying stuck.
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = () => {
      if (storedChoice()) return;
      applyTheme(mq.matches ? "light" : "dark", false);
    };
    mq.addEventListener("change", onSystemChange);
    return () => mq.removeEventListener("change", onSystemChange);
  }, []);

  const toggle = useCallback(() => {
    applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
  }, []);

  return (
    <ThemeContext.Provider value={{ toggle }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
