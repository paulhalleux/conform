import { PropsWithChildren } from "react";

import styles from "./authentication-layout.module.scss";

export function AuthenticationLayout({ children }: PropsWithChildren) {
  return <section className={styles.layout}>{children}</section>;
}
