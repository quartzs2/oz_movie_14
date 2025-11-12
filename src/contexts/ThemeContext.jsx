import { THEME } from "@constants";
import { createContext } from "react";

export const ThemeContext = createContext({
  theme: THEME.LIGHT,
  toggleTheme: () => {},
});
