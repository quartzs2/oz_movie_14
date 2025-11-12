import { THEME } from "@constants";
import { useEffect, useState } from "react";

import { ThemeContext } from "./ThemeContext";

const THEME_LOCAL_STORAGE_KEY = "theme";
const DARK_CLASS_NAME = "dark";
const MEDIA_QUERY_DARK_CLASS_NAME = "(prefers-color-scheme: dark)";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    if (window.matchMedia(MEDIA_QUERY_DARK_CLASS_NAME).matches) {
      return THEME.DARK;
    }
    return THEME.LIGHT;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === THEME.DARK) {
      root.classList.add(DARK_CLASS_NAME);
    } else {
      root.classList.remove(DARK_CLASS_NAME);
    }

    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT,
    );
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};

export default ThemeProvider;
