import { Navigation } from "@/components/ui/navigation";

import styles from "./header.module.scss";

const NavigationLinks = [
  {
    href: "/settings",
    label: "General",
  },
  {
    href: "/settings/administration",
    label: "Administration",
  },
  {
    href: "/settings/resources",
    label: "Resources",
  },
];

export function Header() {
  return (
    <header className={styles.header}>
      <Navigation size="small" links={NavigationLinks} />
    </header>
  );
}
