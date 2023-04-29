import { PropsWithChildren } from "react";

import styles from "./context-menu.module.scss";
import { ContextMenuItem } from "./context-menu-item";

type ContextMenuProps = PropsWithChildren;

export function ContextMenu({ children }: ContextMenuProps) {
  return (
    <nav className={styles["context-menu"]}>
      <ul>{children}</ul>
    </nav>
  );
}

ContextMenu.Item = ContextMenuItem;
ContextMenu.Divider = () => <hr className={styles.divider} />;
