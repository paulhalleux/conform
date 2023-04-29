"use client";

import { Logo } from "@/components/ui";
import { Navigation } from "@/components/ui/navigation";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

import styles from "./header.module.scss";

const NavigationLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/templates",
    label: "Templates",
  },
  {
    href: "/forms",
    label: "Forms",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

export function Header() {
  return (
    <header className={styles.header}>
      <Logo className={styles.header__logo} />
      <nav className={styles.header__nav}>
        <Navigation links={NavigationLinks} />
      </nav>
      <ThemeSwitcher />
    </header>
  );
}
