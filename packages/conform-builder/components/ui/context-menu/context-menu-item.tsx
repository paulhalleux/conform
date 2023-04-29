import clsx from "clsx";
import Link from "next/link";
import { PropsWithChildren } from "react";

import styles from "./context-menu-item.module.scss";

type ContextMenuItemProps = PropsWithChildren<{
  href?: string;
  onClick?: () => void;
  className?: string;
  "data-test-id"?: string;
}>;

export function ContextMenuItem({
  children,
  href,
  className,
  ...rest
}: ContextMenuItemProps) {
  const Component = href ? Link : "span";
  const props = href ? { href } : ({} as any);

  return (
    <li className={clsx(styles["context-menu-item"], className)} {...rest}>
      <Component className={styles["context-menu-item__label"]} {...props}>
        {children}
      </Component>
    </li>
  );
}
