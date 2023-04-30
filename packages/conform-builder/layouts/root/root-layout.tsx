"use client";

import "@/styles/global.scss";

import { QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import Head from "next/head";
import { PropsWithChildren } from "react";

import { SessionProvider } from "@/contexts/session-context";
import { ThemeContext, ThemeProvider } from "@/contexts/theme-context";
import { queryClient } from "@/lib/query";

const inter = Inter({ subsets: ["latin"] });

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <Head>
        <title>Conform Builder</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ThemeProvider>
            <ThemeContext.Consumer>
              {({ currentTheme }) => (
                <body data-theme={currentTheme} className={inter.className}>
                  {children}
                </body>
              )}
            </ThemeContext.Consumer>
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </html>
  );
}
