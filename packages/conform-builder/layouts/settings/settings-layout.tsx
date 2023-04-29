import { PropsWithChildren } from "react";

import { Header } from "@/layouts/settings/header/header";

export function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
