import { createContext, useContext, useEffect, useState } from "react";

import { useSession } from "@/contexts/session-context";
import { usePreferences } from "@/hooks/preferences";
import { getTheme } from "@/utils/theme";

export type ThemeType = "light" | "dark" | "system";
export type ThemeContextValue = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  currentTheme: ThemeType | undefined;
};

export const ThemeContext = createContext({} as ThemeContextValue);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { preferences, user } = useSession();
  const [theme, setTheme] = useState<ThemeType>("system");
  const [currentTheme, setCurrentTheme] = useState<ThemeType>();

  usePreferences(user?.id);

  const onThemeChange = (theme: ThemeType) => {
    setTheme(theme);
  };

  useEffect(() => {
    setCurrentTheme(getTheme(theme));
  }, [theme, preferences]);

  useEffect(() => {
    if (preferences?.theme !== undefined) {
      setTheme(preferences.theme as ThemeType);
    }
  }, [preferences]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: onThemeChange,
        currentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
