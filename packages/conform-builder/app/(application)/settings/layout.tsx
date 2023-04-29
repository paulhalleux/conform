import "@/styles/global.scss";

import { PropsWithChildren } from "react";

import { SettingsLayout } from "@/layouts/settings";

export const metadata = {
  title: "Conform builder",
};

export default function Layout({ children }: PropsWithChildren) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
