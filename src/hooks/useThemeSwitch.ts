import { useEffect, useState, Dispatch, SetStateAction } from "react";

type ThemeMode = "light" | "dark";

export function useThemeSwitch(): [ThemeMode, Dispatch<SetStateAction<ThemeMode>>] {
  const preferDarkQuery = "(prefers-color-schema: dark)";
  const storageKey = "theme";

  const toggleTheme = (theme: ThemeMode) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem(storageKey, theme);
  };

  const getUserPreference = () => {
    const userPref = window.localStorage.getItem(storageKey);
    if (userPref) {
      return userPref as ThemeMode;
    }
    return window.matchMedia(preferDarkQuery).matches ? "dark" : "light";
  };

  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const handleChange = () => {
      const newMode = getUserPreference();
      setMode(newMode);
      toggleTheme(newMode);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    toggleTheme(mode);
  }, [mode]);

  return [mode, setMode];
}
