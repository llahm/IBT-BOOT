import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext(null);

const STORAGE_KEY = "campus-connect-theme";

function loadInitial() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // ignore storage failures, fall through to system preference
  }
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

// Bonus requirement: Context API for theme. The navbar's toggle button
// and the <body>-level attribute it drives live far apart in the tree,
// so this is the second Context in the app (see FavoritesContext) —
// exactly the "shared state, multiple components" case Context is for.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(loadInitial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore storage failures
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((current) => (current === "light" ? "dark" : "light")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return ctx;
}
