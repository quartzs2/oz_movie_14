import { THEME } from "@constants";
import { useTheme } from "@hooks";
import { Moon as MoonIcon, Sun as SunIcon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      onClick={toggleTheme}
      type="button"
    >
      {theme === THEME.LIGHT ? (
        <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <SunIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
