"use client";

import "@/styles/global.scss";

import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";

import { ThemeContext, ThemeProvider } from "@/contexts/theme-context";
import { RootLayout } from "@/layouts";
import { getTheme } from "@/utils/theme";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ currentTheme }) => (
            <body data-theme={currentTheme} className={inter.className}>
              <RootLayout>{children}</RootLayout>
            </body>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </html>
  );
}
