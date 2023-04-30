"use client";

import { PropsWithChildren } from "react";

import { Header } from "@/layouts/root/header/header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
