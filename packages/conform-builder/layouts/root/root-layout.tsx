import { PropsWithChildren } from "react";

import { Header } from "@/layouts/root/header/header";

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
