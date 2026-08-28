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

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore
  }
  updateFavicon(theme);
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
    applyTheme(currentTheme());
  }, []);

  const toggle = useCallback(() => {
    applyTheme(currentTheme() === "dark" ? "light" : "dark");
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
