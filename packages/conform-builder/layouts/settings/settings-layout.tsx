"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

import { SettingsNavigationRoutes } from "@/constants/navigation-routes";
import { Header } from "@/layouts/root/header/header";
import { SettingsHeader } from "@/layouts/settings/header/settings-header";

import styles from "./settings-layout.module.scss";

export function SettingsLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const route = SettingsNavigationRoutes.find(
    (route) => route.href.toLowerCase() === pathname.toLowerCase()
  );

  if (!route) {
    return null;
  }

  return (
    <>
      <Header />
      <section className={styles.layout}>
        <SettingsHeader />
        <section className={styles.layout__content}>
          <header className={styles.title__container}>
            <h2 className={styles.title__main}>{route.label}</h2>
            <h3 className={styles.title__sub}>{route.description}</h3>
          </header>
          {children}
        </section>
      </section>
    </>
  );
}
