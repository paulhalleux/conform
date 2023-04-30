import { ThemeType } from "@/contexts/theme-context";

/**
 * Get the theme to use based on the current theme and the system theme
 * @param theme The theme to use
 * @returns The theme to use
 */
export function getTheme(theme: ThemeType) {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
}

/**
 * Get the system theme
 * @returns The system theme
 */
export function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
