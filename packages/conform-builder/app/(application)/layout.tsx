import { PropsWithChildren } from "react";

import { RootLayout } from "@/layouts";

export const metadata = {
  title: "Conform",
};

export default function Layout({ children }: PropsWithChildren) {
  return <RootLayout>{children}</RootLayout>;
}
