"use client";

import { Logo } from "@/components/ui";
import { Navigation } from "@/components/ui/navigation";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { NavigationRoutes } from "@/constants/navigation-routes";

import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <Logo className={styles.header__logo} />
      <nav className={styles.header__nav}>
        <Navigation links={NavigationRoutes} />
      </nav>
      <ThemeSwitcher />
    </header>
  );
}
