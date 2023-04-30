import { PropsWithChildren } from "react";

import { AuthenticationLayout } from "@/layouts/authentication";

export const metadata = {
  title: "Conform | Login",
};

export default function Layout({ children }: PropsWithChildren) {
  return <AuthenticationLayout>{children}</AuthenticationLayout>;
}
