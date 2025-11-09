import { createContext } from "react";
import { THEME } from "@constants";

export const ThemeContext = createContext({
  theme: THEME.LIGHT,
  toggleTheme: () => {},
});
