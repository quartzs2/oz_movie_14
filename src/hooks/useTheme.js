import { ThemeContext } from "@contexts";
import { useContext } from "react";

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme은 ThemeProvider 내에서 사용해야 합니다.");
  }

  return context;
};

export default useTheme;
