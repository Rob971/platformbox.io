"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "platformbox-theme";

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // ignore
  }
  return "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore
  }
  // Swap favicon to match the theme.
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
  // The anti-flash script in layout.tsx sets the initial class before React
  // hydrates. The lazy initializer reads localStorage to match that class.
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  // On mount, ensure favicon matches the current theme (the anti-flash
  // script already set the class, but the favicon needs a JS update).
  useEffect(() => {
    updateFavicon(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}