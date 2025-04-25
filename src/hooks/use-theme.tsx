import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface UseTheme {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export function useTheme(): UseTheme {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    setTheme(storedTheme || "system");
  }, []);

  useEffect(() => {
    if (theme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", theme);
    }
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return { theme, setTheme };
}
