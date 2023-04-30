import "@/styles/global.scss";

import { PropsWithChildren } from "react";

import { SettingsLayout } from "@/layouts/settings";

export default function Layout({ children }: PropsWithChildren) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
