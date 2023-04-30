import { Navigation } from "@/components/ui/navigation";
import { SettingsNavigationRoutes } from "@/constants/navigation-routes";

import styles from "./settings-header.module.scss";

export function SettingsHeader() {
  return (
    <header className={styles.header}>
      <Navigation size="small" links={SettingsNavigationRoutes} />
    </header>
  );
}
