"use client";

import { createContext, useContext, useState } from "react";

import { getTheme } from "@/utils/theme";

export type ThemeType = "light" | "dark" | "system";
export type ThemeContextValue = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  currentTheme: ThemeType;
};

export const ThemeContext = createContext({} as ThemeContextValue);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("system");

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, currentTheme: getTheme(theme) }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
