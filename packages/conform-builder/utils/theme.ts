import { ThemeType } from "@/contexts/theme-context";

export function getTheme(theme: ThemeType) {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
}

export function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
