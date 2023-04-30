"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

import styles from "./navigation.module.scss";

type NavigationProps = PropsWithChildren<{
  size?: "small" | "large";
  className?: string;
  links: Array<{
    href: string;
    label: string;
  }>;
}>;

export function Navigation({
  className,
  links,
  size = "large",
}: NavigationProps) {
  const pathname = usePathname();
  const activeLinks = links.filter(({ href }) =>
    pathname.toLowerCase().startsWith(href.toLowerCase())
  );

  const activeLink = activeLinks[activeLinks.length - 1];

  return (
    <nav
      className={clsx(
        styles.navigation,
        {
          [styles["navigation--small"]]: size === "small",
        },
        className
      )}
    >
      <ul className={styles.links}>
        {links.map(({ href, label }) => (
          <li key={href} className={styles.navigation__item}>
            <Link
              href={href}
              className={clsx(styles.link, {
                [styles["link--active"]]:
                  activeLink?.href.toLowerCase() === href.toLowerCase(),
              })}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
