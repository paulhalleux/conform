import { LaptopIcon, Moon, MoonIcon, Sun, SunIcon } from "lucide-react";
import { useRef } from "react";

import { Popover } from "@/components/ui";
import { ContextMenu } from "@/components/ui/context-menu";
import { ThemeSwitcherItem } from "@/components/ui/theme-switcher/item/theme-switcher-item";
import { ThemeType, useTheme } from "@/contexts/theme-context";

import styles from "./theme-switcher.module.scss";

export function ThemeSwitcher() {
  const transitionTimout = useRef<NodeJS.Timeout>();
  const { theme, setTheme, currentTheme } = useTheme();

  const Trigger = (
    <button className={styles["theme-switcher"]}>
      {currentTheme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  );

  const onThemeChanged = (theme: ThemeType) => {
    if (transitionTimout.current) {
      clearTimeout(transitionTimout.current);
    }

    setTheme(theme);
    document.body.classList.add("no-transition");
    transitionTimout.current = setTimeout(() => {
      document.body.classList.remove("no-transition");
    }, 500);
  };

  return (
    <Popover position="bottom-right" trigger={Trigger}>
      <ContextMenu>
        <ThemeSwitcherItem
          icon={LaptopIcon}
          theme="system"
          selected={theme === "system"}
          onSelected={onThemeChanged}
          label="System"
        />
        <ThemeSwitcherItem
          icon={SunIcon}
          theme="light"
          selected={theme === "light"}
          onSelected={onThemeChanged}
          label="Light"
        />
        <ThemeSwitcherItem
          icon={MoonIcon}
          theme="dark"
          selected={theme === "dark"}
          onSelected={onThemeChanged}
          label="Dark"
        />
      </ContextMenu>
    </Popover>
  );
}
